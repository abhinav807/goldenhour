"use client";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) el.classList.add("active");
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-offwhite overflow-hidden reveal active"
    >
      {/* Brutalist Sun Graphic — centered behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="relative">
          {/* Outermost ring */}
          <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[620px] lg:h-[620px] rounded-full border-[2px] border-offwhite/15 relative">
            {/* Sun rays */}
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: "2px",
                  height: i % 3 === 0 ? "50%" : i % 2 === 0 ? "42%" : "35%",
                  background: i % 3 === 0 ? "rgba(255,90,0,0.25)" : "rgba(247,247,242,0.08)",
                  transformOrigin: "0 0",
                  transform: `rotate(${i * 15}deg)`,
                }}
              />
            ))}

            {/* Middle ring */}
            <div className="absolute inset-[50px] md:inset-[80px] lg:inset-[100px] rounded-full border-[2px] border-dashed border-sunset/30" />

            {/* Inner filled */}
            <div className="absolute inset-[100px] md:inset-[160px] lg:inset-[200px] rounded-full bg-sunset/15 border border-sunset/25" />

            {/* Core */}
            <div className="absolute inset-[150px] md:inset-[220px] lg:inset-[270px] rounded-full bg-sunset/30" />

            {/* Offset geometry accents */}
            <div className="absolute top-[8%] left-[5%] w-16 h-16 md:w-28 md:h-28 rounded-full border border-sunset/20" />
            <div className="absolute bottom-[12%] right-[3%] w-12 h-12 md:w-20 md:h-20 border border-offwhite/10 rotate-45" />
            <div className="absolute top-[60%] left-[2%] w-3 h-3 md:w-4 md:h-4 bg-yellow/40 rounded-full" />
            <div className="absolute top-[15%] right-[10%] w-2 h-2 bg-sunset rounded-full" />
            <div className="absolute bottom-[20%] left-[12%] w-2 h-2 bg-offwhite/30 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating labels — positioned around edges */}
      <div className="absolute top-28 left-5 md:left-12 font-space text-[10px] text-offwhite/50 uppercase tracking-widest z-10 -rotate-3">
        01 / DELHI
      </div>
      <div className="absolute top-40 right-5 md:right-12 font-space text-[10px] text-sunset uppercase tracking-widest z-10 rotate-4">
        OPEN TO STUDENTS
      </div>
      <div className="absolute bottom-32 left-5 md:left-16 font-space text-[10px] text-offwhite/50 uppercase tracking-widest z-10 -rotate-2">
        BUILD. BREAK. REPEAT.
      </div>
      <div className="absolute bottom-44 right-5 md:right-16 font-space text-[10px] text-yellow uppercase tracking-widest z-10 rotate-3">
        EST. 2026
      </div>

      {/* Rotating stamp — top right */}
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

      {/* Content — centered */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-5 md:px-12">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-offwhite border-2 border-offwhite/20 mb-8">
          <span className="w-2 h-2 bg-sunset rounded-full animate-pulse" />
          <span className="font-space text-[10px] font-bold uppercase tracking-widest text-black">
            THE CLOCK IS RUNNING // 2026
          </span>
        </div>

        {/* Headline — centered */}
        <h1 className="font-archivo text-[22vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] tracking-tighter mb-8 text-center">
          GOLDEN
          <br />
          HOUR
        </h1>

        {/* Subheading — centered */}
        <p className="font-dm text-lg md:text-2xl text-offwhite/60 mb-12 max-w-xl mx-auto text-center leading-relaxed">
          A student-built technology experience.
        </p>

        {/* CTAs — centered */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#register" className="brutal-btn-orange px-10 py-4 text-xs md:text-sm">
            ENTER GOLDENHOUR <ArrowRight size={16} />
          </a>
          <a href="#events" className="brutal-btn-outline px-10 py-4 text-xs md:text-sm border-offwhite/30 text-offwhite hover:bg-offwhite hover:text-black hover:border-offwhite">
            VIEW EVENTS
          </a>
        </div>
      </div>

      {/* Bottom edge accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-sunset" />
    </section>
  );
}
