import { sharedTicket } from "@/lib/ticket-manager";
export async function GET(request:Request,{params}:{params:Promise<{token:string}>}) {
 const {token}=await params;const ticket=await sharedTicket(token);
 if(!ticket)return new Response("Not found",{status:404,headers:{"Cache-Control":"no-store"}});
 return new Response(new Uint8Array(ticket.image.buffer),{headers:{"Content-Type":"image/png","Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow","Referrer-Policy":"no-referrer","Content-Disposition":`${new URL(request.url).searchParams.has("download")?"attachment":"inline"}; filename="goldenhour-ticket.png"`}});
}
