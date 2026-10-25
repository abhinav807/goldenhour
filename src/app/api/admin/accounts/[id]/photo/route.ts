import { apiFailure, objectId, PRIVATE_HEADERS, requireAdmin } from "@/lib/api-access";
import { getProfilePhoto } from "@/lib/profiles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(request);
    const { id } = await context.params;
    objectId(id);
    const image = await getProfilePhoto(id);
    if (!image) return new Response(null, { status: 404, headers: PRIVATE_HEADERS });
    return new Response(new Uint8Array(image.buffer), { headers: { ...PRIVATE_HEADERS, "Content-Type": "image/webp", "X-Content-Type-Options": "nosniff" } });
  } catch (error) { return apiFailure(error); }
}
