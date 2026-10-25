import { apiFailure, privateJson, requireAdmin } from "@/lib/api-access";
import { listAccounts } from "@/lib/admin-accounts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const params = new URL(request.url).searchParams;
    return privateJson(await listAccounts({ q: params.get("q") ?? "", page: Number(params.get("page") ?? 1) }));
  } catch (error) { return apiFailure(error); }
}
