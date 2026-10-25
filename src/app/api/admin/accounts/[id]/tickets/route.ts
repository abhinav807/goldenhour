import { apiFailure, privateJson, readMultipart, requireAdmin, requireSameOrigin } from "@/lib/api-access";
import { uploadTicket } from "@/lib/tickets";
import { MAX_TICKET_BYTES } from "@/lib/ticket-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request);
    const session = await requireAdmin(request);
    const { id } = await context.params;
    const form = await readMultipart(request, MAX_TICKET_BYTES + 32 * 1024);
    return privateJson({ ticket: await uploadTicket(id, form, session.user.id) }, 201);
  } catch (error) { return apiFailure(error); }
}
