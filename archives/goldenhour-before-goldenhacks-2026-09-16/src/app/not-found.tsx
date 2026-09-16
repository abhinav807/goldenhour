import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pageMetadata } from "./metadata";

export const metadata = pageMetadata("404 — Page Not Found", "This GOLDENHOUR page could not be found. Return to the build sprint, tracks, and registration details.", "/404");

export default function NotFound() {
  return <main className="min-h-screen bg-offwhite grid-pattern flex items-center px-5 md:px-12 py-24"><div className="max-w-[900px] mx-auto w-full"><p className="font-space text-xs text-sunset font-bold tracking-[.18em] mb-6">ERROR / 404</p><h1 className="font-archivo text-[22vw] md:text-[15vw] leading-[.75]">NOT<br /><span className="text-sunset">FOUND.</span></h1><div className="mt-10 max-w-md"><p className="font-dm text-lg text-black/65">This page took a wrong turn somewhere between the last commit and sunrise.</p><div className="flex flex-wrap gap-3 mt-7"><Link href="/" className="brutal-btn">BACK HOME <ArrowLeft size={15} /></Link><Link href="/#events" className="brutal-btn-outline">SEE EVENTS <ArrowRight size={15} /></Link></div></div></div></main>;
}
