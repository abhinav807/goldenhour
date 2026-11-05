import "server-only";
import { randomBytes, createHash } from "node:crypto";
import { Binary, ObjectId } from "mongodb";
import QRCode from "qrcode";
import { getDatabase } from "./mongodb";
import { ApiError, objectId } from "./api-access";
import { eventConfig } from "./event";
import { renderTicket } from "./ticket-render";
import { normalizePhone } from "./ticket-phone";
import { ticketRecipient } from "./ticket-manager-schema";

export async function createManagedTicket(input: Record<string, unknown>, actor: string, requestId: string) {
  let value: ReturnType<typeof ticketRecipient>;
  try { value=ticketRecipient(input); } catch(e) { throw new ApiError(400,(e as Error).message); }
  const { db }=await getDatabase();
  const existing=await db.collection("gh_tickets").findOne({creationKey:requestId},{projection:{_id:1}});
  if(existing) return String(existing._id);
  const user=value.email ? await db.collection("gh_auth_user").findOne({email:value.email},{projection:{_id:1}}) : null;
  if(value.email && !user) throw new ApiError(400,"No account matches this email. Leave email blank to create a guest ticket.");
  const id=new ObjectId(); const qr=`goldenhour:${randomBytes(24).toString("base64url")}`;
  const eventName=`${eventConfig.entityName} V1`;
  const hash=(text:string)=>createHash("sha256").update(text).digest("hex");
  const image=await renderTicket(await QRCode.toBuffer(qr,{width:480,margin:4}),{name:value.name,serial:`GH-${String(id).toUpperCase()}`,eventName,date:value.date,venue:eventConfig.venue});
  try {
    await db.collection("gh_tickets").insertOne({_id:id,userId:user?String(user._id):"",holderName:value.name,phone:value.phone,eventName,eventDate:value.date,venue:eventConfig.venue,eventKey:hash(`${eventName.normalize("NFKC").toLowerCase()}\n${value.date}`),image:new Binary(image),qrHash:hash(qr),status:"issued",createdAt:new Date(),uploadedBy:actor,checkedInAt:null,checkedInBy:null,creationKey:requestId,sendStatus:"pending"});
  } catch(e) {
    if(e && typeof e==="object" && "code" in e && e.code===11000) {
      const retry=await db.collection("gh_tickets").findOne({creationKey:requestId},{projection:{_id:1}});
      if(retry) return String(retry._id);
    }
    throw e;
  }
  return String(id);
}

export async function listManagedTickets(params: URLSearchParams) {
  const { db }=await getDatabase();
  const q=(params.get("q")||"").trim().slice(0,120);
  const date=params.get("date"); const status=params.get("status"); const send=params.get("send");
  const page=Math.max(1,Math.min(10000,Number(params.get("page"))||1));
  const match: Record<string,unknown>={archived:{$ne:true}};
  if(date) match.eventDate=date;
  if(status==="issued"||status==="checked-in") match.status=status;
  if(send==="sent") match.sendStatus="sent";
  if(send==="pending") match.sendStatus={$ne:"sent"};
  const pipeline: object[]=[{$match:match},{$project:{image:0,qrHash:0,shareToken:0}},
    {$lookup:{from:"gh_auth_user",let:{uid:"$userId"},pipeline:[{$match:{$expr:{$eq:[{$toString:"$_id"},"$$uid"]}}},{$project:{name:1,email:1}}],as:"account"}},
    {$set:{name:{$ifNull:["$holderName",{$ifNull:[{$arrayElemAt:["$account.name",0]},"Participant"]}]},email:{$ifNull:[{$arrayElemAt:["$account.email",0]},""]},serial:{$concat:["GH-",{$toUpper:{$toString:"$_id"}}]}}}];
  if(q) {const regex=q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");pipeline.push({$match:{$or:[{name:{$regex:regex,$options:"i"}},{email:{$regex:regex,$options:"i"}},{serial:{$regex:regex,$options:"i"}}]}});}
  pipeline.push({ $facet: {
    rows: [{$sort:{createdAt:-1}}, {$skip:(page-1)*30}, {$limit:30}, {$project:{_id:1,name:1,email:1,phone:1,serial:1,eventDate:1,eventName:1,status:1,sendStatus:1,checkedInAt:1,sentAt:1}}],
    counts: [{$group:{_id:null,total:{$sum:1},present:{$sum:{$cond:[{$eq:["$status","checked-in"]},1,0]}},sent:{$sum:{$cond:[{$eq:["$sendStatus","sent"]},1,0]}}}}]
  }});
  const [result]=await db.collection("gh_tickets").aggregate(pipeline).toArray();
  return {rows:result.rows.map((row:Record<string,unknown>)=>({...row,id:String(row._id),_id:undefined})),counts:result.counts[0]||{total:0,present:0,sent:0},page};
}

export async function manageTicket(id: string, action: unknown, actor: string, phone?: unknown) {
  const {db}=await getDatabase(); const collection=db.collection<{ _id: ObjectId; archived?: boolean; shareToken?: string; audit: { action: unknown; actor: string; at: Date }[] }>("gh_tickets"); const _id=objectId(id);
  const current=await collection.findOne({_id,archived:{$ne:true}},{projection:{_id:1,shareToken:1}});
  if(!current) throw new ApiError(404,"Ticket not found.");
  if(action==="share") {
    const token=randomBytes(24).toString("base64url");
    await collection.updateOne({_id,shareToken:{$exists:false}},{$set:{shareToken:token}});
    const ticket=await collection.findOne({_id},{projection:{shareToken:1}});
    return {url:`${eventConfig.siteUrl.replace(/\/$/,"")}/t/${ticket!.shareToken}`};
  }
  if(action==="phone") {
    const normalized=typeof phone==="string" && phone.trim() ? normalizePhone(phone) : null;
    if(typeof phone!=="string" || (phone.trim()&&!normalized)) throw new ApiError(400,"Enter a valid phone number.");
    await db.collection("gh_tickets").updateOne({_id},{$set:{phone:normalized}});return {ok:true};
  }
  const changes:Record<string,unknown>= action==="sent"?{sendStatus:"sent",sentAt:new Date()}:action==="pending"?{sendStatus:"pending",sentAt:null}:action==="present"?{status:"checked-in",checkedInAt:new Date(),checkedInBy:actor}:action==="absent"?{status:"issued",checkedInAt:null,checkedInBy:null}:action==="archive"?{archived:true}:{};
  if(!Object.keys(changes).length) throw new ApiError(400,"Choose a supported ticket action.");
  await collection.updateOne({_id},{$set:changes,$push:{audit:{$each:[{action,actor,at:new Date()}],$slice:-100}}});
  return {ok:true};
}

export async function sharedTicket(token:string) {
  if(!/^[A-Za-z0-9_-]{32}$/.test(token)) return null;
  const {db}=await getDatabase();
  return db.collection("gh_tickets").findOne({shareToken:token,archived:{$ne:true}},{projection:{image:1}});
}
