"use client";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-black text-offwhite overflow-hidden px-5 md:px-12 hero-grid">
      <div className="absolute inset-0 pointer-events-none opacity-70" aria-hidden="true">
        <div className="hero-sun absolute top-[46%] left-[58%] md:left-[56%] -translate-x-1/2 -translate-y-1/2 w-[min(82vw,760px)] aspect-square rounded-full border border-sunset/40" />
        <div className="absolute top-[46%] left-[58%] md:left-[56%] -translate-x-1/2 -translate-y-1/2 w-[min(50vw,420px)] aspect-square rounded-full border-2 border-dashed border-offwhite/20 rotate-12" />
        <div className="absolute top-[46%] left-[58%] md:left-[56%] -translate-x-1/2 -translate-y-1/2 w-[min(25vw,210px)] aspect-square rounded-full border-[10px] border-sunset/50" />
        <div className="absolute top-[18%] left-[16%] w-28 h-28 border-2 border-sunset/40 rotate-45" />
        <div className="absolute bottom-[18%] right-[14%] w-16 h-16 border border-offwhite/25 rounded-full" />
        <span className="absolute top-[35%] right-[13%] text-sunset font-space text-4xl">✳</span>
      </div>
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[min(1120px,calc(100%-40px))] font-space text-[10px] text-offwhite/55 uppercase tracking-[.18em] -rotate-3">01 / DELHI</div>
      <div className="absolute top-40 left-1/2 translate-x-[10%] w-[min(1120px,calc(100%-40px))] text-right font-space text-[10px] text-sunset uppercase tracking-[.18em] rotate-3">OPEN TO STUDENTS</div>
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[min(1120px,calc(100%-40px))] font-space text-[10px] text-offwhite/55 uppercase tracking-[.18em] -rotate-2">BUILD. BREAK. REPEAT.</div>
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-[min(1120px,calc(100%-40px))] text-right font-space text-[10px] text-yellow uppercase tracking-[.18em] rotate-3">EST. 2026</div>

      <div className="relative z-10 w-full max-w-[1120px] mx-auto pt-28 pb-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-2.5 w-2.5 bg-sunset animate-[pulse-dot_1.5s_ease-in-out_infinite]" />
          <span className="font-space text-[10px] md:text-xs font-bold uppercase tracking-[.16em] text-offwhite">THE CLOCK IS RUNNING // 2026</span>
        </div>
        <h1 className="font-archivo text-[clamp(4.75rem,12vw,10.75rem)] leading-[.8] tracking-[-.08em] max-w-[980px] mx-auto">
          GOLDEN<span className="text-sunset">.</span><br />HOUR
        </h1>
        <div className="mt-10 max-w-[900px] mx-auto flex flex-col items-center gap-8">
          <p className="font-dm text-lg md:text-2xl text-offwhite/70 max-w-md leading-snug">A student-built technology experience for people who refuse to wait for the right moment.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#register" className="brutal-btn-orange px-7 py-4">ENTER GOLDENHOUR <ArrowRight size={16} /></a>
            <a href="#events" className="brutal-btn-outline border-offwhite/40 text-offwhite px-7 py-4 hover:border-black">VIEW EVENTS</a>
          </div>
        </div>
        <div className="mt-12 pt-5 border-t border-offwhite/20 max-w-[900px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5 text-left">
          {[['WHEN', 'NOV 2026'], ['WHERE', 'DELHI / INDIA'], ['DURATION', '48 HOURS'], ['ENTRY', 'FREE']].map(([label, value]) => <div key={label}><p className="font-space text-[9px] text-offwhite/40 uppercase tracking-[.16em] mb-2">{label}</p><p className="font-space text-xs text-offwhite font-bold">{value}</p></div>)}
        </div>
      </div>
      <a href="#about" className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 font-space text-[10px] uppercase tracking-[.18em] text-offwhite/50 hover:text-sunset" aria-label="Scroll to learn more">SCROLL TO START <ArrowDown size={14} /></a>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-sunset" />
    </section>
  );
}
