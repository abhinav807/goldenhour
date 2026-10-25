export const MAX_TICKET_BYTES = 4 * 1024 * 1024;
export const MAX_STORED_TICKET_BYTES = 12 * 1024 * 1024;
export const MAX_TICKET_PIXELS = 20_000_000;
export const QR_DECODE_SIZE = 2400;
export const MAX_QR_LENGTH = 4096;

export type Ticket = {
  id: string;
  userId: string;
  eventKey: string;
  eventName: string;
  eventDate: string | null;
  venue: string;
  status: "issued" | "checked-in";
  checkedInAt: string | null;
  createdAt: string;
  imageUrl: string;
};

export type TicketEvent = { key: string; name: string; date: string | null; venue: string };

export function validateTicketDetails(input: Record<string, unknown>) {
  const eventName = typeof input.eventName === "string" ? input.eventName.trim().replace(/\s+/g, " ") : "";
  const eventDate = typeof input.eventDate === "string" ? input.eventDate.trim() : "";
  const venue = typeof input.venue === "string" ? input.venue.trim() : "";
  const fields: Record<string, string> = {};
  if (eventName.length < 2 || eventName.length > 120 || /[\p{Cc}\p{Cf}]/u.test(eventName)) fields.eventName = "Enter an event name between 2 and 120 characters.";
  if (venue.length > 200 || /[\p{Cc}\p{Cf}]/u.test(venue)) fields.venue = "Enter a venue of at most 200 characters.";
  if (eventDate) {
    const date = new Date(`${eventDate}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== eventDate || eventDate < "1900-01-01") {
      fields.eventDate = "Enter a valid event date.";
    }
  }
  return { fields, value: { eventName, eventDate: eventDate || null, venue } };
}

export function canViewTicket(ticket: { userId: string }, viewerId: string, admin: boolean) {
  return admin || ticket.userId === viewerId;
}
