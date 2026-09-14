"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-11-15T09:00:00+05:30").getTime();

    function update() {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { value: pad(timeLeft.days), label: "DAYS" },
    { value: pad(timeLeft.hours), label: "HOURS" },
    { value: pad(timeLeft.minutes), label: "MINUTES" },
    { value: pad(timeLeft.seconds), label: "SECONDS" },
  ];

  return (
    <section className="bg-black py-20 md:py-28 px-5 md:px-12 relative overflow-hidden border-y-4 border-sunset">
      {/* Orange geometric marks */}
      <div className="absolute top-8 left-8 w-6 h-6 border-2 border-sunset/30 rotate-45" />
      <div className="absolute top-12 right-12 w-4 h-4 bg-sunset/20 rounded-full" />
      <div className="absolute bottom-10 left-16 w-3 h-3 bg-yellow/30" />
      <div className="absolute bottom-8 right-20 w-8 h-8 border border-sunset/20 rounded-full" />

      <div className="max-w-[900px] mx-auto text-center relative z-10 reveal">
        <p className="font-space text-xs text-sunset uppercase tracking-widest mb-8 font-bold">
          UNTIL THE HOUR
        </p>

        {/* 4 units — centered, no overlap */}
        <div className="flex items-start justify-center gap-1 sm:gap-3 md:gap-6">
          {units.map((item, i) => (
            <div key={item.label} className="flex items-start gap-1 sm:gap-3 md:gap-6">
              <div className="text-center min-w-[60px] sm:min-w-[80px] md:min-w-[120px]">
                <span className="font-archivo text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] text-offwhite leading-none block">
                  {item.value}
                </span>
                <span className="font-space text-[8px] sm:text-[9px] md:text-[10px] text-offwhite/40 uppercase tracking-widest font-bold block mt-1">
                  {item.label}
                </span>
              </div>
              {i < 3 && (
                <span className="font-archivo text-2xl sm:text-3xl md:text-5xl text-sunset/40 mt-4 md:mt-6">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
