import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { pageMetadata } from "../metadata";

export const metadata = pageMetadata("Nothing Here Yet", undefined, "/empty-state");

export default function EmptyStatePage() { return <main className="min-h-screen bg-black text-offwhite px-5 md:px-12 py-24 grid place-items-center"><div className="max-w-[760px] w-full"><p className="font-space text-xs text-sunset tracking-[.18em] mb-7">NO SIGNAL / EMPTY STATE</p><h1 className="font-archivo text-6xl md:text-9xl leading-[.78]">QUIET<br /><span className="text-sunset">FOR NOW.</span></h1><p className="font-dm text-lg md:text-xl text-offwhite/65 max-w-md mt-10">There&apos;s nothing published in this corner yet. The next useful thing is probably still being built.</p><div className="flex flex-wrap gap-3 mt-8"><Link href="/" className="brutal-btn-orange">BACK HOME <ArrowLeft size={15} /></Link><a href="mailto:hello@goldenhour.dev" className="brutal-btn-outline border-offwhite/40 text-offwhite hover:border-black">CONTACT US <Mail size={15} /></a></div></div></main>; }
