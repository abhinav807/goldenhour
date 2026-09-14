"use client";
import { ArrowDown, ArrowRight } from "lucide-react";
import CursorRingField from "@/components/CursorRingField";

const details = [["WHEN", "NOV 2026"], ["WHERE", "DELHI / INDIA"], ["DURATION", "8 HOURS"], ["ENTRY", "FREE"]];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-black text-offwhite overflow-hidden px-5 md:px-10 hero-grid">
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-screen pointer-events-none" aria-hidden="true"><CursorRingField background="transparent" density={150} dotSize={90} speed={12} cameraDistance={180} ring={{ push: 50, width: 9, radius: 10, turbulence: 100 }} style={{ minWidth: 0, minHeight: 0 }} /></div>
      <div className="absolute inset-0 pointer-events-none opacity-70" aria-hidden="true">
        <div className="hero-sun absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,760px)] aspect-square rounded-full border border-sunset/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(58vw,450px)] aspect-square rounded-full border-2 border-dashed border-offwhite/20 rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(28vw,220px)] aspect-square rounded-full border-[10px] border-sunset/50" />
        <div className="absolute top-[18%] left-[12%] w-20 h-20 md:w-28 md:h-28 border-2 border-sunset/40 rotate-45" />
        <div className="absolute bottom-[18%] right-[12%] w-14 h-14 md:w-16 md:h-16 border border-offwhite/25 rounded-full" />
        <span className="absolute top-[40%] right-[12%] text-sunset text-3xl md:text-4xl">✳</span>
      </div>
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[min(1120px,calc(100%-40px))] text-center font-space text-[10px] text-offwhite/55 uppercase tracking-[.18em]">01 / DELHI</div>
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[min(1120px,calc(100%-40px))] text-center font-space text-[10px] text-sunset uppercase tracking-[.18em]">OPEN TO STUDENTS</div>
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[min(1120px,calc(100%-40px))] text-center font-space text-[10px] text-offwhite/55 uppercase tracking-[.18em]">BUILD. BREAK. REPEAT.</div>
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-[min(1120px,calc(100%-40px))] text-center font-space text-[10px] text-yellow uppercase tracking-[.18em]">EST. 2026</div>
      <div className="relative z-10 w-full max-w-none mx-auto pt-32 pb-28 text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-3 mb-8"><span className="h-2.5 w-2.5 bg-sunset animate-[pulse-dot_1.5s_ease-in-out_infinite]" /><span className="font-space text-[10px] md:text-xs font-bold uppercase tracking-[.16em]">THE CLOCK IS RUNNING // 2026</span></div>
        <h1 className="font-archivo text-[clamp(4.5rem,13vw,11rem)] leading-[.8] tracking-[-.08em] max-w-[1100px] mx-auto">GOLDEN<span className="text-sunset">.</span><br />HOUR</h1>
        <div className="mt-10 max-w-[700px] mx-auto flex flex-col items-center gap-8"><p className="font-dm text-lg md:text-2xl text-offwhite/70 max-w-lg leading-snug">A student-built technology experience for people who refuse to wait for the right moment.</p><div className="flex flex-col sm:flex-row gap-3 justify-center"><a href="#register" className="brutal-btn-orange px-7 py-4">ENTER GOLDENHOUR <ArrowRight size={16} /></a><a href="#events" className="brutal-btn-outline border-offwhite/40 text-offwhite px-7 py-4 hover:border-black">VIEW TRACKS</a></div></div>
        <div className="mt-8 md:mt-14 pt-6 border-t border-offwhite/20 w-full max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 text-center max-[400px]:hidden">{details.map(([label, value]) => <div key={label}><p className="font-space text-[9px] text-offwhite/40 uppercase tracking-[.16em] mb-2">{label}</p><p className="font-space text-xs text-offwhite font-bold">{value}</p></div>)}</div>
      </div>
      <a href="#about" className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 font-space text-[10px] uppercase tracking-[.18em] text-offwhite/50 hover:text-sunset" aria-label="Scroll to learn more">SCROLL TO START <ArrowDown size={14} /></a>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-sunset" />
    </section>
  );
}
