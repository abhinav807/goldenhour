import { ApiError, apiFailure, privateJson, requireAdmin, requireSameOrigin } from "@/lib/api-access";
import { readBoundedBody } from "@/lib/request-body";
import { createManagedTicket, listManagedTickets, manageTicket } from "@/lib/ticket-manager";
export const runtime="nodejs";
export async function GET(request:Request) {
  try {await requireAdmin(request);return privateJson(await listManagedTickets(new URL(request.url).searchParams));} catch(e){return apiFailure(e);}
}
export async function POST(request:Request) {
  try {
    requireSameOrigin(request); const session=await requireAdmin(request);
    let body;try{body=JSON.parse(new TextDecoder().decode(await readBoundedBody(request,128*1024)));}catch{throw new ApiError(400,"Invalid request.");}
    if(!body || typeof body!=="object") throw new ApiError(400,"Invalid request.");
    if(body.action) return privateJson(await manageTicket(String(body.id),body.action,session.user.id,body.phone));
    if(!Array.isArray(body.rows)||!body.rows.length||body.rows.length>100||typeof body.batchId!=="string"||!/^[a-f\d-]{36}$/i.test(body.batchId)) throw new ApiError(400,"Provide 1–100 rows and a valid batch identifier.");
    const results=[];
    for(let i=0;i<body.rows.length;i++) {
      try { const row=body.rows[i];if(!row||typeof row!=="object"||Array.isArray(row)) throw new ApiError(400,"Invalid participant row.");results.push({row:i+1,id:await createManagedTicket(row,session.user.id,`${session.user.id}:${body.batchId}:${i}`)}); }
      catch(e){results.push({row:i+1,error:e instanceof ApiError?e.message:"Could not create this ticket. Retry the same batch."});}
    }
    return privateJson({results});
  } catch(e){return apiFailure(e);}
}
