import { getSession } from "@/lib/auth";
import { getProfilePhoto } from "@/lib/profiles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
  try {
    const session = await getSession(request.headers);
    if (!session) return new Response(null, { status: 401, headers });
    const photo = await getProfilePhoto(session.user.id);
    if (!photo) return new Response(null, { status: 404, headers });
    return new Response(new Uint8Array(photo.buffer), {
      headers: { ...headers, "Content-Type": "image/webp", "Content-Disposition": 'inline; filename="profile.webp"' },
    });
  } catch { return new Response(null, { status: 503, headers }); }
}
