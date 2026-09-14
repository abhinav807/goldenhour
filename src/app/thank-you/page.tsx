import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pageMetadata } from "../metadata";

export const metadata = pageMetadata("Registration Not Open", "Participant registration for GOLDENHOUR is not open yet. Volunteer applications are available now.", "/thank-you");

export default function ThankYouPage() { return <main className="min-h-screen bg-sunset px-5 md:px-12 py-24 grid place-items-center"><div className="max-w-[850px] w-full"><p className="font-space text-xs font-bold tracking-[.18em] mb-7">PARTICIPANT REGISTRATION / NOT OPEN</p><h1 className="font-archivo text-[17vw] md:text-[10vw] leading-[.78]">NOT<br />YET<span className="text-offwhite">.</span></h1><p className="font-dm text-lg md:text-2xl max-w-lg mt-10">Participant registration will open after the event date and venue are confirmed. Volunteer applications are available now.</p><div className="flex flex-wrap gap-3 mt-8"><Link href="/" className="brutal-btn">BACK TO HOME <ArrowLeft size={15} /></Link><Link href="/#faq" className="brutal-btn-outline">READ THE FAQ <ArrowRight size={15} /></Link></div></div></main>; }
