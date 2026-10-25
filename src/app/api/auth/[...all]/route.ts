import { getAuth } from "@/lib/auth";
import { BodyTooLargeError, readBoundedBody } from "@/lib/request-body";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(request: Request) {
  try {
    const authRequest = request.method === "POST" ? new Request(request.url, {
      method: "POST", headers: request.headers,
      body: await readBoundedBody(request, 16 * 1024),
    }) : request;
    const auth = await getAuth();
    const response = await auth.handler(authRequest);
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return Response.json({ message: "The request is too large." }, { status: 413 });
    }
    return Response.json({ message: "Login is temporarily unavailable. Please try again shortly." }, {
      status: 503, headers: { "Cache-Control": "no-store" },
    });
  }
}

export const GET = handle;
export const POST = handle;
