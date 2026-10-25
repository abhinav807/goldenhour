import "server-only";
import { ObjectId } from "mongodb";
import { getSession } from "./auth";
import { getAuthEnvironment } from "./auth-env";
import { isMasterAdmin } from "./admin-policy";
import { BodyTooLargeError, readBoundedBody } from "./request-body";

export class ApiError extends Error {
  constructor(public status: number, message: string, public fields?: Record<string, string>) { super(message); }
}

export const PRIVATE_HEADERS = { "Cache-Control": "private, no-store" };
export const privateJson = (value: unknown, status = 200) => Response.json(value, { status, headers: PRIVATE_HEADERS });

export function apiFailure(error: unknown) {
  if (error instanceof ApiError) return privateJson({ error: error.message, ...(error.fields ? { fields: error.fields } : {}) }, error.status);
  if (error instanceof BodyTooLargeError) return privateJson({ error: "The upload is too large. Choose a smaller file." }, 413);
  return privateJson({ error: "The request could not be completed. Please try again." }, 503);
}

export async function requireSession(request: Request) {
  const session = await getSession(request.headers);
  if (!session) throw new ApiError(401, "Log in to continue.");
  return session;
}

export async function requireAdmin(request: Request) {
  const session = await requireSession(request);
  if (!isMasterAdmin(session.user)) throw new ApiError(403, "This action is available to verified master admins only.");
  return session;
}

export async function requireCheckInStaff(request: Request) {
  const session = await requireSession(request);
  if (isMasterAdmin(session.user)) return session;
  const { getDatabase } = await import("./mongodb");
  const { db } = await getDatabase();
  const role = (await db.collection("gh_auth_user").findOne({ _id: new ObjectId(session.user.id) }, { projection: { role: 1 } }))?.role;
  if (role !== "volunteer") throw new ApiError(403, "Only admins and volunteers can scan tickets.");
  return session;
}

export function requireSameOrigin(request: Request) {
  if (request.headers.get("origin") !== getAuthEnvironment().baseURL || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new ApiError(403, "Reload this page and try again.");
  }
}

export function objectId(value: string) {
  if (!/^[a-f\d]{24}$/i.test(value)) throw new ApiError(404, "This account or ticket was not found.");
  return new ObjectId(value);
}

export async function readMultipart(request: Request, limit: number) {
  const type = request.headers.get("content-type");
  if (!type?.startsWith("multipart/form-data;")) throw new ApiError(415, "Submit the form with an image.");
  const body = await readBoundedBody(request, limit);
  try { return await new Response(body, { headers: { "Content-Type": type } }).formData(); }
  catch { throw new ApiError(400, "The form could not be read. Please try again."); }
}
