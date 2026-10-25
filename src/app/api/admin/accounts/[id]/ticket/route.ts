import { apiFailure, privateJson, requireAdmin, requireSameOrigin } from "@/lib/api-access";
import { generateAccountTicket } from "@/lib/tickets";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request);
    const session = await requireAdmin(request);
    const { id } = await context.params;
    return privateJson({ ticket: await generateAccountTicket(id, session.user.id) }, 201);
  } catch (error) {
    return apiFailure(error);
  }
}
