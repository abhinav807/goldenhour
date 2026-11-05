import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const enforceHttps = process.env.ENABLE_HTTPS_REDIRECT === "true" || (process.env.NODE_ENV === "production" && process.env.ENABLE_HTTPS_REDIRECT !== "false");
  if (enforceHttps && forwardedProto === "http") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  if(request.nextUrl.pathname.startsWith("/t/")) {
    const { getDatabase } = await import("./lib/mongodb");
    const { createHash } = await import("node:crypto");
    try {
      const {db}=await getDatabase();
      const ip=request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
      const key=createHash("sha256").update(ip).digest("hex")+":"+Math.floor(Date.now()/60000);
      const count=await db.collection<{_id:string;count:number;expiresAt:Date}>("gh_ticket_link_limits").findOneAndUpdate({_id:key},{$inc:{count:1},$setOnInsert:{expiresAt:new Date(Date.now()+120000)}},{upsert:true,returnDocument:"after"});
      if(count && count.count>60)return new NextResponse("Too many requests. Try again shortly.",{status:429,headers:{"Retry-After":"60","Cache-Control":"no-store"}});
    } catch {return new NextResponse("Ticket service temporarily unavailable.",{status:503,headers:{"Cache-Control":"no-store"}});}
    const response=NextResponse.next();response.headers.set("Cache-Control","private, no-store");response.headers.set("Referrer-Policy","no-referrer");response.headers.set("X-Robots-Tag","noindex, nofollow");return response;
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
