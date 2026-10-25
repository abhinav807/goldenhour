import { ApiError, apiFailure, privateJson, readMultipart, requireAdmin, requireSameOrigin } from "@/lib/api-access";
import { editAccount, getAccount } from "@/lib/admin-accounts";
import { listUserTickets } from "@/lib/tickets";
import { MAX_PHOTO_BYTES } from "@/lib/profile-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, context: Context) {
  try {
    await requireAdmin(request);
    const { id } = await context.params;
    const account = await getAccount(id);
    if (!account) throw new ApiError(404, "This account no longer exists.");
    return privateJson({ account, tickets: await listUserTickets(id) });
  } catch (error) { return apiFailure(error); }
}

export async function PATCH(request: Request, context: Context) {
  try {
    requireSameOrigin(request);
    const session = await requireAdmin(request);
    const { id } = await context.params;
    const form = await readMultipart(request, MAX_PHOTO_BYTES + 32 * 1024);
    return privateJson({ account: await editAccount(id, form, session.user.id) });
  } catch (error) { return apiFailure(error); }
}
