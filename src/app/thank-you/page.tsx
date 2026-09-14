import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pageMetadata } from "../metadata";

export const metadata = pageMetadata("Registration Received", "Your GOLDENHOUR registration interest has been received. Learn what happens next before the build sprint.", "/thank-you");

export default function ThankYouPage() { return <main className="min-h-screen bg-sunset px-5 md:px-12 py-24 grid place-items-center"><div className="max-w-[850px] w-full"><p className="font-space text-xs font-bold tracking-[.18em] mb-7">TRANSMISSION RECEIVED / 2026</p><h1 className="font-archivo text-[17vw] md:text-[10vw] leading-[.78]">YOU&apos;RE<br />IN<span className="text-offwhite">.</span></h1><p className="font-dm text-lg md:text-2xl max-w-lg mt-10">Your signal made it through. We&apos;ll send the next coordinates to your inbox.</p><div className="flex flex-wrap gap-3 mt-8"><Link href="/" className="brutal-btn">BACK TO HOME <ArrowLeft size={15} /></Link><Link href="/#faq" className="brutal-btn-outline">READ THE FAQ <ArrowRight size={15} /></Link></div></div></main>; }
