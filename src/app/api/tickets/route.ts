import { apiFailure, privateJson, requireSession } from "@/lib/api-access";
import { listUserTickets } from "@/lib/tickets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const session = await requireSession(request);
    return privateJson({ tickets: await listUserTickets(session.user.id) });
  } catch (error) { return apiFailure(error); }
}
