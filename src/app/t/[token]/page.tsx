import { notFound } from "next/navigation";
import { sharedTicket } from "@/lib/ticket-manager";
export const dynamic="force-dynamic";
export const metadata={title:"Your GoldenHour ticket",robots:{index:false,follow:false},referrer:"no-referrer"};
export default async function PublicTicket({params}:{params:Promise<{token:string}>}) {
  const {token}=await params;if(!await sharedTicket(token)) notFound();
  return <main className="min-h-screen bg-black text-offwhite px-5 py-12 text-center"><h1 className="font-archivo text-3xl mb-8">YOUR GOLDENHOUR TICKET</h1>
    {/* The image is private bearer-link content and must bypass image optimization caches. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`/t/${token}/image`} alt="GoldenHour admission ticket with QR code, participant name and GH serial" className="w-full max-w-sm mx-auto" />
    <a href={`/t/${token}/image?download=1`} className="brutal-btn-orange my-6">DOWNLOAD TICKET</a>
    <p className="max-w-md mx-auto">Keep this link private. Bring your ticket and signed guardian consent slip to check-in.</p><a className="underline inline-block mt-4" href="/guardian-consent">Guardian consent instructions</a>
  </main>;
}
