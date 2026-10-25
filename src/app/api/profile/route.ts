import { MongoServerError } from "mongodb";
import { getSession } from "@/lib/auth";
import { getAuthEnvironment } from "@/lib/auth-env";
import { createProfile, getProfile } from "@/lib/profiles";
import { MAX_PHOTO_BYTES, validateProfileFields } from "@/lib/profile-schema";
import { normalizeProfilePhoto } from "@/lib/profile-photo";
import { BodyTooLargeError, readBoundedBody } from "@/lib/request-body";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store" };
const failure = (error: string, status: number) => Response.json({ error }, { status, headers });

export async function GET(request: Request) {
  try {
    const session = await getSession(request.headers);
    if (!session) return failure("Log in to see your profile.", 401);
    return Response.json({ profile: await getProfile(session.user.id) }, { headers });
  } catch { return failure("Your profile could not be loaded. Please try again.", 503); }
}

export async function POST(request: Request) {
  try {
    if (request.headers.get("origin") !== getAuthEnvironment().baseURL || request.headers.get("sec-fetch-site") === "cross-site") {
      return failure("This request could not be verified. Reload the page and try again.", 403);
    }
    const session = await getSession(request.headers);
    if (!session) return failure("Your session ended. Log in again to finish your profile.", 401);
    if (await getProfile(session.user.id)) return failure("Your profile has already been created.", 409);
    if (!request.headers.get("content-type")?.startsWith("multipart/form-data;")) {
      return failure("Submit the profile form with a photo.", 415);
    }
    const body = await readBoundedBody(request, MAX_PHOTO_BYTES + 32 * 1024);
    let form: FormData;
    try { form = await new Response(body, { headers: { "Content-Type": request.headers.get("content-type")! } }).formData(); }
    catch { return failure("The form could not be read. Reload and try again.", 400); }
    const { fields, value } = validateProfileFields({ name: form.get("name"), dateOfBirth: form.get("dateOfBirth"), gender: form.get("gender") });
    const photo = form.get("photo");
    if (!(photo instanceof File) || !photo.size) fields.photo = "Choose a profile photo.";
    if (Object.keys(fields).length) return Response.json({ error: "Check the highlighted fields.", fields }, { status: 400, headers });
    let normalized: Buffer;
    try { normalized = await normalizeProfilePhoto(photo as File); }
    catch (error) {
      const message = error instanceof Error ? error.message : "Choose another photo.";
      return Response.json({ error: message, fields: { photo: message } }, { status: 400, headers });
    }
    const profile = await createProfile(session.user.id, value, normalized);
    return Response.json({ profile }, { status: 201, headers });
  } catch (error) {
    if (error instanceof BodyTooLargeError) return failure("Choose a photo no larger than 2 MB.", 413);
    if (error instanceof MongoServerError && error.code === 11000) return failure("Your profile has already been created.", 409);
    return failure("Your profile could not be saved. Please try again.", 503);
  }
}
