import "server-only";
import { createHash } from "node:crypto";
import { Binary, MongoServerError, ObjectId } from "mongodb";
import { randomUUID } from "node:crypto";
import QRCode from "qrcode";
import { renderTicket } from "./ticket-render";
import { getDatabase } from "./mongodb";
import { ApiError, objectId } from "./api-access";
import { normalizeTicketImage } from "./ticket-image";
import { MAX_QR_LENGTH, normalizeTicketSerial, validateTicketDetails, type Ticket, type TicketEvent } from "./ticket-schema";
import type { ProfileDocument } from "./profiles";

type TicketDocument = {
  _id: ObjectId; userId: string; eventKey: string; eventName: string; eventDate: string | null;
  venue: string; image: Binary; qrHash: string; status: "issued" | "checked-in";
  createdAt: Date; uploadedBy: string; checkedInAt: Date | null; checkedInBy: string | null;
};
const hash = (data: string) => createHash("sha256").update(data).digest("hex");
const publicTicket = (doc: TicketDocument): Ticket => ({
  id: String(doc._id), serialNumber: `GH-${String(doc._id).toUpperCase()}`, userId: doc.userId, eventKey: doc.eventKey, eventName: doc.eventName,
  eventDate: doc.eventDate, venue: doc.venue, status: doc.status,
  createdAt: doc.createdAt.toISOString(), checkedInAt: doc.checkedInAt?.toISOString() ?? null,
  imageUrl: `/api/tickets/${doc._id}/image`,
});

export async function listUserTickets(userId: string) {
  const { db } = await getDatabase();
  return (await db.collection<TicketDocument>("gh_tickets").find({ userId }, { projection: { image: 0, qrHash: 0 } }).sort({ createdAt: -1 }).toArray()).map(publicTicket);
}

export async function getTicketImage(id: string) {
  const { db } = await getDatabase();
  return db.collection<TicketDocument>("gh_tickets").findOne({ _id: objectId(id) }, { projection: { userId: 1, image: 1 } });
}

export async function uploadTicket(userId: string, form: FormData, actorId: string) {
  const { db } = await getDatabase();
  if (!await db.collection("gh_auth_user").findOne({ _id: objectId(userId) }, { projection: { _id: 1 } })) throw new ApiError(404, "This account no longer exists.");
  const { value, fields } = validateTicketDetails({ eventName: form.get("eventName"), eventDate: form.get("eventDate"), venue: form.get("venue") });
  const file = form.get("ticket");
  if (!(file instanceof File) || !file.size) fields.ticket = "Choose a ticket image.";
  if (Object.keys(fields).length) throw new ApiError(400, "Check the ticket details.", fields);
  let decoded: Awaited<ReturnType<typeof normalizeTicketImage>>;
  try { decoded = await normalizeTicketImage(file as File); }
  catch (error) { throw new ApiError(400, error instanceof Error ? error.message : "Choose another ticket image."); }
  const id = new ObjectId();
  const holder = await db.collection("gh_auth_user").findOne({ _id: objectId(userId) });
  const profile = await db.collection<ProfileDocument>("gh_profiles").findOne({ _id: userId });
  const document: TicketDocument = {
    _id: id, userId, ...value,
    eventKey: hash(`${value.eventName.normalize("NFKC").toLowerCase()}\n${value.eventDate ?? ""}`),
    image: new Binary(await renderTicket(await QRCode.toBuffer(decoded.qrData, { width: 480, margin: 4 }), { name: String(profile?.name ?? holder?.name ?? "Participant"), serial: `GH-${String(id).toUpperCase()}`, eventName: value.eventName, date: value.eventDate ?? "Date to be announced", venue: value.venue })), qrHash: hash(decoded.qrData), status: "issued", createdAt: new Date(),
    uploadedBy: actorId, checkedInAt: null, checkedInBy: null,
  };
  try { await db.collection<TicketDocument>("gh_tickets").insertOne(document); }
  catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) throw new ApiError(409, "That QR code is already assigned to a ticket for this event. Use a unique ticket slip.");
    throw error;
  }
  return publicTicket(document);
}

export async function generateAccountTicket(userId: string, actorId: string) {
  const { db } = await getDatabase();
  const user = await db.collection("gh_auth_user").findOne({ _id: objectId(userId) }, { projection: { _id: 1, name: 1 } });
  if (!user) throw new ApiError(404, "This account no longer exists.");
  const event = (await import("./event")).eventConfig;
  const eventName = `${event.entityName} V1`;
  const eventDate = event.isoDate.slice(0, 10);
  const qrData = `goldenhour:${randomUUID()}`;
  const id = new ObjectId();
  const profile = await db.collection<ProfileDocument>("gh_profiles").findOne({ _id: userId });
  const document: TicketDocument = {
    _id: id, userId, eventName, eventDate, venue: event.venue,
    eventKey: hash(`${eventName.normalize("NFKC").toLowerCase()}\\n${eventDate}`),
    image: new Binary(await renderTicket(await QRCode.toBuffer(qrData, { width: 480, margin: 4 }), { name: String(profile?.name ?? user.name ?? "Participant"), serial: `GH-${String(id).toUpperCase()}`, eventName, date: eventDate, venue: event.venue })), qrHash: hash(qrData), status: "issued",
    createdAt: new Date(), uploadedBy: actorId, checkedInAt: null, checkedInBy: null,
  };
  await db.collection<TicketDocument>("gh_tickets").insertOne(document);
  return publicTicket(document);
}

export async function listTicketEvents(): Promise<TicketEvent[]> {
  const { db } = await getDatabase();
  const events = await db.collection<TicketDocument>("gh_tickets").aggregate<{
    _id: string; name: string; date: string | null; venue: string;
  }>([
    { $sort: { createdAt: -1 } },
    { $group: { _id: "$eventKey", name: { $first: "$eventName" }, date: { $first: "$eventDate" }, venue: { $first: "$venue" } } },
    { $sort: { date: -1, name: 1 } },
  ]).toArray();
  return events.map((event) => ({ key: event._id, name: event.name, date: event.date, venue: event.venue }));
}

export async function checkInTicket(eventKey: unknown, qrData: unknown, actorId: string, serialNumber?: unknown) {
  if (typeof eventKey !== "string" || !/^[a-f\d]{64}$/.test(eventKey)) throw new ApiError(400, "Select an event before scanning.");
  let serial: string | undefined;
  if (serialNumber !== undefined) {
    try { serial = normalizeTicketSerial(serialNumber); } catch { throw new ApiError(400, "Enter a valid GH- ticket serial number."); }
  }
  if (!serial && (typeof qrData !== "string" || !qrData.length || qrData.length > MAX_QR_LENGTH)) throw new ApiError(400, "Scan a valid ticket QR code.");
  const { db } = await getDatabase();
  const query = serial ? { eventKey, _id: objectId(serial.slice(3)) } : { eventKey, qrHash: hash(qrData as string) };
  // Matching and consuming the ticket is one database operation: concurrent
  // scanners cannot both admit the same ticket.
  const admitted = await db.collection<TicketDocument>("gh_tickets").findOneAndUpdate(
    { ...query, status: "issued" },
    { $set: { status: "checked-in", checkedInAt: new Date(), checkedInBy: actorId } },
    { returnDocument: "after", projection: { image: 0, qrHash: 0 } },
  );
  const ticket = admitted ?? await db.collection<TicketDocument>("gh_tickets").findOne(query, { projection: { image: 0, qrHash: 0 } });
  if (!ticket) throw new ApiError(404, "This ticket was not found for the selected event.");
  const [user, profile] = await Promise.all([
    db.collection("gh_auth_user").findOne({ _id: objectId(ticket.userId) }, { projection: { name: 1, email: 1 } }),
    db.collection<ProfileDocument>("gh_profiles").findOne({ _id: ticket.userId }, { projection: { name: 1 } }),
  ]);
  return {
    admitted: Boolean(admitted), ticket: publicTicket(ticket),
    holder: { name: String(profile?.name ?? user?.name ?? "Account unavailable"), email: String(user?.email ?? "") },
  };
}
