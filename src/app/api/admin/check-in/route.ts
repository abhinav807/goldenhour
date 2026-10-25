import { ApiError, apiFailure, privateJson, requireCheckInStaff, requireSameOrigin } from "@/lib/api-access";
import { readBoundedBody } from "@/lib/request-body";
import { checkInTicket } from "@/lib/tickets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const session = await requireCheckInStaff(request);
    const raw = await readBoundedBody(request, 32 * 1024);
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(new TextDecoder().decode(raw));
      if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
    } catch { throw new ApiError(400, "The scan could not be read. Try scanning again."); }
    const result = await checkInTicket(body.eventKey, body.qrData, session.user.id);
    return privateJson({ ticket: result.ticket, holder: result.holder, ...(!result.admitted ? { error: "Already checked in. This ticket cannot be used again." } : {}) }, result.admitted ? 200 : 409);
  } catch (error) { return apiFailure(error); }
}
