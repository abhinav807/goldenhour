"use client";
import { useState } from "react";
interface MarqueeProps {
  reverse?: boolean;
  speed?: number;
  bg?: string;
  borderColor?: string;
}

export default function Marquee({ reverse = false, speed = 35, bg = "bg-black", borderColor = "border-sunset" }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const items = [
    "GOLDENHOUR",
    "BUILD SOMETHING",
    "BREAK SOMETHING",
    "LEARN SOMETHING",
    "GOLDENHOUR",
    "BUILD SOMETHING",
    "BREAK SOMETHING",
    "LEARN SOMETHING",
    "GOLDENHOUR",
    "BUILD SOMETHING",
    "BREAK SOMETHING",
    "LEARN SOMETHING",
  ];

  return (
    <section className={`${bg} gh-marquee-print overflow-hidden border-y-2 ${borderColor} py-4 md:py-5 w-full`}>
      <button type="button" className="font-space text-xs min-h-11 px-4 text-offwhite bg-black" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "RESUME MOTION" : "PAUSE MOTION"}</button>
      <div aria-hidden="true" className="overflow-hidden whitespace-nowrap">
        <div
          className="inline-flex whitespace-nowrap font-archivo text-xl md:text-3xl lg:text-4xl"
          style={{ animationPlayState: paused ? "paused" : "running",
            animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          }}
        >
          {[...items, ...items].map((item, i) => (
            <span key={i} className="mr-6 md:mr-10 inline-flex items-center">
              <span className={
                i % 6 === 0 ? "text-sunset" :
                i % 6 === 2 ? "text-yellow" :
                i % 6 === 4 ? "text-sunset/60" :
                "text-offwhite"
              }>
                {item}
              </span>
              <span className="text-sunset ml-6 md:ml-10 text-lg md:text-2xl">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
