"use client";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.classList.add("active");
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center bg-black text-offwhite overflow-hidden px-5 md:px-12 pt-24 pb-12 reveal active"
    >
      {/* Brutalist Sun Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] pointer-events-none select-none">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-[3px] border-offwhite/20" />
        {/* Halftone ring */}
        <div className="absolute inset-[30px] rounded-full border-[2px] border-dashed border-sunset/40" />
        {/* Inner circle */}
        <div className="absolute inset-[60px] md:inset-[80px] rounded-full bg-sunset/10" />
        {/* Core */}
        <div className="absolute inset-[120px] md:inset-[160px] rounded-full bg-sunset/20 border-2 border-sunset/30" />
        {/* Sun rays */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[2px] bg-offwhite/10"
            style={{
              height: i % 2 === 0 ? "45%" : "35%",
              transformOrigin: "0 0",
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
        {/* Offset geometry */}
        <div className="absolute top-[15%] left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-sunset/30" />
        <div className="absolute bottom-[10%] right-[8%] w-24 h-24 md:w-36 md:h-36 border-2 border-offwhite/15 rotate-45" />
        {/* Dotted accent */}
        <div className="absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-sunset" />
        <div className="absolute bottom-[25%] left-[18%] w-3 h-3 rounded-full bg-yellow" />
        <div className="absolute top-[60%] right-[12%] w-2 h-2 rounded-full bg-offwhite/40" />
      </div>

      {/* Floating labels */}
      <div className="absolute top-28 left-5 md:left-12 font-space text-[10px] text-offwhite/50 uppercase tracking-widest z-10" style={{ transform: "rotate(-3deg)" }}>
        01 / DELHI
      </div>
      <div className="absolute top-40 right-5 md:right-12 font-space text-[10px] text-sunset uppercase tracking-widest z-10" style={{ transform: "rotate(4deg)" }}>
        OPEN TO STUDENTS
      </div>
      <div className="absolute bottom-32 left-5 md:left-16 font-space text-[10px] text-offwhite/50 uppercase tracking-widest z-10" style={{ transform: "rotate(-2deg)" }}>
        BUILD. BREAK. REPEAT.
      </div>
      <div className="absolute bottom-44 right-5 md:right-16 font-space text-[10px] text-yellow uppercase tracking-widest z-10" style={{ transform: "rotate(3deg)" }}>
        EST. 2026
      </div>

      {/* Rotating stamp */}
      <div className="absolute top-28 right-8 md:right-20 z-10 circle-badge hidden md:flex">
        <svg className="circle-badge-text" viewBox="0 0 100 100">
          <defs>
            <path id="cp" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text>
            <textPath href="#cp">★ STUDENT-LED ★ BUILT FOR STUDENTS ★ BY STUDENTS ★ </textPath>
          </text>
        </svg>
        <span className="font-archivo text-sunset text-lg">GH</span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-offwhite border-2 border-offwhite/20 mb-6">
          <span className="w-2 h-2 bg-sunset rounded-full animate-pulse" />
          <span className="font-space text-[10px] font-bold uppercase tracking-widest text-black">
            THE CLOCK IS RUNNING // 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-archivo text-[20vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] tracking-tighter mb-6">
          GOLDEN
          <br />
          HOUR
        </h1>

        {/* Subheading */}
        <p className="font-dm text-lg md:text-2xl text-offwhite/70 mb-10 max-w-xl mx-auto">
          A student-built technology experience.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#register" className="brutal-btn-orange px-8 py-4 text-xs md:text-sm">
            ENTER GOLDENHOUR <ArrowRight size={16} />
          </a>
          <a href="#events" className="brutal-btn-outline px-8 py-4 text-xs md:text-sm border-offwhite/30 text-offwhite hover:bg-offwhite hover:text-black hover:border-offwhite">
            VIEW EVENTS
          </a>
        </div>
      </div>

      {/* Bottom edge accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-sunset" />
    </section>
  );
}
