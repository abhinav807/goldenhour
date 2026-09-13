"use client";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      id="register"
      className="bg-sunset py-24 md:py-36 px-5 md:px-12 relative overflow-hidden border-t-4 border-black"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-16 h-16 md:w-20 md:h-20 border-2 border-black/20 rotate-45" />
      <div className="absolute top-16 right-16 w-4 h-4 bg-black/10 rounded-full" />
      <div className="absolute bottom-16 left-20 w-3 h-3 bg-yellow/40" />
      <div className="absolute bottom-10 right-24 w-10 h-10 md:w-12 md:h-12 border border-black/15 rounded-full" />
      <div className="absolute top-1/2 left-[8%] w-2 h-2 bg-black/20 rotate-45" />
      <div className="absolute top-[30%] right-[5%] w-3 h-3 border border-black/20 rotate-12" />

      <div className="max-w-[1000px] mx-auto text-center relative z-10 reveal">
        <p className="font-space text-xs text-black/60 uppercase tracking-widest mb-6 font-bold">
          DON&apos;T WATCH. BUILD.
        </p>

        <h2 className="font-archivo text-[14vw] md:text-[8vw] lg:text-[7vw] text-black leading-[0.85] mb-8">
          YOUR HOUR
          <br />
          STARTS NOW.
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="#" className="brutal-btn px-10 py-5 text-sm md:text-base">
            REGISTER <ArrowRight size={18} />
          </a>
        </div>

        {/* Small meta info */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <div className="text-center">
            <p className="font-space text-[10px] text-black/40 uppercase font-bold">DATE</p>
            <p className="font-space text-xs font-bold text-black">NOV 2026</p>
          </div>
          <div className="text-center">
            <p className="font-space text-[10px] text-black/40 uppercase font-bold">LOCATION</p>
            <p className="font-space text-xs font-bold text-black">DELHI, INDIA</p>
          </div>
          <div className="text-center">
            <p className="font-space text-[10px] text-black/40 uppercase font-bold">DURATION</p>
            <p className="font-space text-xs font-bold text-black">48 HOURS</p>
          </div>
          <div className="text-center">
            <p className="font-space text-[10px] text-black/40 uppercase font-bold">COST</p>
            <p className="font-space text-xs font-bold text-black">FREE</p>
          </div>
        </div>
      </div>
    </section>
  );
}
