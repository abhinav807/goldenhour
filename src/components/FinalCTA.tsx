"use client";
import { ArrowRight, Mail } from "lucide-react";

export default function FinalCTA() {
  return <section id="register" className="bg-sunset py-24 md:py-36 px-5 md:px-12 relative overflow-hidden border-t-4 border-black">
    <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true"><div className="absolute -right-16 -top-16 w-72 h-72 rounded-full border-[3px] border-black" /><div className="absolute right-4 top-4 w-56 h-56 rounded-full border border-black" /><div className="absolute left-[8%] bottom-16 w-16 h-16 border-2 border-black rotate-45" /><span className="absolute left-[15%] top-24 font-space text-4xl">✳</span></div>
    <div className="max-w-[1100px] mx-auto relative z-10 reveal"><div className="flex items-center gap-3 mb-7"><span className="w-3 h-3 bg-black" /><p className="font-space text-xs text-black/65 uppercase tracking-[.18em] font-bold">DON&apos;T WATCH. BUILD.</p></div>
      <h2 className="font-archivo text-[16vw] md:text-[9vw] lg:text-[7.5rem] text-black leading-[.79] mb-10">YOUR HOUR<br />STARTS NOW<span className="text-offwhite">.</span></h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-14"><a href="mailto:hello@goldenhour.dev?subject=GoldenHour%20registration" className="brutal-btn px-8 py-5 text-sm md:text-base">REGISTER <ArrowRight size={18} /></a><a href="mailto:hello@goldenhour.dev" className="inline-flex items-center justify-center gap-2 font-space text-xs font-bold uppercase underline underline-offset-4 hover:no-underline">Questions? Say hello <Mail size={15} /></a></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 border-t-2 border-black/20 pt-6">{[["DATE", "NOV 2026"], ["LOCATION", "DELHI, INDIA"], ["DURATION", "48 HOURS"], ["COST", "FREE"]].map(([label, value]) => <div key={label}><p className="font-space text-[10px] text-black/45 uppercase font-bold mb-1">{label}</p><p className="font-space text-xs font-bold text-black">{value}</p></div>)}</div>
    </div>
  </section>;
}
