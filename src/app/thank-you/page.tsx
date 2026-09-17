import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { pageMetadata } from "../metadata";
import { eventConfig } from "@/lib/event";

export const metadata = pageMetadata("Registration Confirmed", "Participant registration for GoldenHour V1 is open now through the registration form. Volunteer applications are available too.", "/thank-you");

export default function ThankYouPage() { return <main className="min-h-screen bg-sunset px-5 md:px-12 py-24 grid place-items-center"><div className="max-w-[850px] w-full"><p className="font-space text-xs font-bold tracking-[.18em] mb-7">PARTICIPANT REGISTRATION / OPENS NOVEMBER 2026</p><h1 className="font-archivo text-[17vw] md:text-[10vw] leading-[.78]">SEE<br />YOU<span className="text-offwhite">.</span></h1><p className="font-dm text-lg md:text-2xl max-w-lg mt-10">GoldenHour V1 registration is currently closed and will open in November 2026. Volunteer applications are available in the meantime.</p><div className="flex flex-wrap gap-3 mt-8"><Link href="/" className="brutal-btn">BACK TO HOME <ArrowLeft size={15} /></Link><span className="brutal-btn-outline">REGISTRATION OPENS {eventConfig.registrationOpening}</span></div></div></main>; }
