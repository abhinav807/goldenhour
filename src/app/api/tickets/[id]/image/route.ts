import { ApiError, apiFailure, PRIVATE_HEADERS, requireSession } from "@/lib/api-access";
import { isMasterAdmin } from "@/lib/admin-policy";
import { getTicketImage } from "@/lib/tickets";
import { canViewTicket } from "@/lib/ticket-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireSession(request);
    const { id } = await context.params;
    const ticket = await getTicketImage(id);
    if (!ticket || !canViewTicket(ticket, session.user.id, isMasterAdmin(session.user))) throw new ApiError(404, "This ticket was not found.");
    const disposition = new URL(request.url).searchParams.get("download") === "1" ? "attachment" : "inline";
    return new Response(new Uint8Array(ticket.image.buffer), {
      headers: { ...PRIVATE_HEADERS, "Content-Type": "image/png", "X-Content-Type-Options": "nosniff", "Content-Disposition": `${disposition}; filename="goldenhour-ticket.png"` },
    });
  } catch (error) { return apiFailure(error); }
}
