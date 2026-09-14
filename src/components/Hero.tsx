"use client";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import CursorRingField from "@/components/CursorRingField";

const volunteerUrl = "https://forms.gle/R8cuBKNLj1ftXKfJ8";
const details = [["WHEN", "LATE OCT / EARLY NOV"], ["WHERE", "DELHI / VENUE TBA"], ["DURATION", "10 HOURS"], ["ENTRY", "FREE"]];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      hero.style.setProperty("--ripple-x", x.toFixed(3));
      hero.style.setProperty("--ripple-y", y.toFixed(3));
      hero.style.setProperty("--ripple-strength", "1");
    };
    const onPointerLeave = () => hero.style.setProperty("--ripple-strength", "0");
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col justify-center bg-black text-offwhite overflow-hidden px-5 md:px-10 hero-grid" style={{ "--ripple-x": "0", "--ripple-y": "0", "--ripple-strength": "0" } as React.CSSProperties}>
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-screen pointer-events-none" aria-hidden="true"><CursorRingField background="transparent" density={150} dotSize={90} speed={12} cameraDistance={180} ring={{ push: 50, width: 9, radius: 10, turbulence: 100 }} style={{ minWidth: 0, minHeight: 0 }} /></div>
      <div className="absolute inset-0 pointer-events-none opacity-70" aria-hidden="true">
        <div className="hero-ripple hero-ripple-outer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,760px)] aspect-square rounded-full border border-sunset/40" />
        <div className="hero-ripple hero-ripple-middle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(58vw,450px)] aspect-square rounded-full border-2 border-dashed border-offwhite/20 rotate-12" />
        <div className="hero-ripple hero-ripple-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(28vw,220px)] aspect-square rounded-full border-[10px] border-sunset/50" />
        <div className="absolute top-[18%] left-[12%] w-20 h-20 md:w-28 md:h-28 border-2 border-sunset/40 rotate-45" />
        <div className="absolute bottom-[18%] right-[12%] w-14 h-14 md:w-16 md:h-16 border border-offwhite/25 rounded-full" />
        <span className="absolute top-[40%] right-[12%] text-sunset text-3xl md:text-4xl">✳</span>
      </div>
      <div className="relative z-10 w-full max-w-none mx-auto pt-32 pb-28 text-center flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8 font-space text-[10px] uppercase tracking-[.18em]"><span className="text-offwhite/55">01 / DELHI</span><span className="text-sunset">OPEN TO STUDENTS</span><span className="flex items-center gap-3 text-offwhite"><span className="h-2.5 w-2.5 bg-sunset animate-[pulse-dot_1.5s_ease-in-out_infinite]" />THE CLOCK IS RUNNING // 2026</span></div>
        <h1 className="font-archivo text-[clamp(4.5rem,13vw,11rem)] leading-[.8] tracking-[-.08em] max-w-[1100px] mx-auto">GOLDEN<span className="text-sunset">.</span><br />HOUR</h1>
        <div className="mt-10 max-w-[760px] mx-auto flex flex-col items-center gap-8"><p className="font-dm text-lg md:text-2xl text-offwhite/70 max-w-lg leading-snug">A student-built technology experience for people who refuse to wait for the right moment.</p><div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3"><a href={volunteerUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange px-7 py-4 mx-auto sm:mx-0">VOLUNTEER WITH US <ArrowRight size={16} /></a><a href="#events" className="brutal-btn-outline border-offwhite/40 text-offwhite px-7 py-4 hover:border-black mx-auto sm:mx-0">VIEW TRACKS</a></div><p className="font-space text-[10px] text-offwhite/45 uppercase tracking-[.14em]">Participant registration is not open yet.</p></div>
        <div className="mt-8 md:mt-14 pt-6 border-t border-offwhite/20 w-full max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 text-center max-[400px]:hidden">{details.map(([label, value]) => <div key={label}><p className="font-space text-[9px] text-offwhite/40 uppercase tracking-[.16em] mb-2">{label}</p><p className="font-space text-xs text-offwhite font-bold">{value}</p></div>)}</div>
      </div>
      <a href="#about" className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 font-space text-[10px] uppercase tracking-[.18em] text-offwhite/50 hover:text-sunset" aria-label="Scroll to learn more">SCROLL TO START <ArrowDown size={14} /></a>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-sunset" />
    </section>
  );
}
