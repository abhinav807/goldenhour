import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";
import { pageMetadata } from "../metadata";

export const metadata = { ...pageMetadata("GoldenHour V1 Registration Form", "Open the official GoldenHour V1 team-registration form.", "/thank-you"), robots: { index: false, follow: true } };

export default function RegistrationPage() {
  return <main className="min-h-screen bg-sunset px-5 md:px-12 py-24 grid place-items-center"><div className="max-w-[850px] w-full mx-auto text-center"><p className="font-space text-xs font-bold tracking-[.18em] mb-7">TEAM REGISTRATION / OPEN</p><h1 className="font-archivo text-6xl sm:text-8xl md:text-9xl leading-[.78]">BUILD<br />WITH US<span className="text-offwhite">.</span></h1><p className="font-dm text-lg md:text-2xl max-w-2xl mx-auto mt-10">Use the official form to register your team. One team leader submits the form and includes each team member. The event date is tentative and the venue is to be announced.</p><div className="flex flex-wrap justify-center gap-3 mt-8"><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn px-6 py-4">OPEN REGISTRATION FORM <ArrowUpRight size={16} /></a><Link href="/goldenhour" className="brutal-btn-outline px-6 py-4">EVENT DETAILS <ArrowLeft size={15} /></Link></div></div></main>;
}
