import { apiFailure, privateJson, requireAdmin } from "@/lib/api-access";
import { listTicketEvents } from "@/lib/tickets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    return privateJson({ events: await listTicketEvents() });
  } catch (error) { return apiFailure(error); }
}
