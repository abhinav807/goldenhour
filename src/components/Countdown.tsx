"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set target to a future date for demo purposes
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

  return (
    <section className="bg-black py-24 md:py-32 px-5 md:px-12 relative overflow-hidden border-y-4 border-sunset">
      {/* Orange geometric marks */}
      <div className="absolute top-8 left-8 w-6 h-6 border-2 border-sunset/30 rotate-45" />
      <div className="absolute top-12 right-12 w-4 h-4 bg-sunset/20 rounded-full" />
      <div className="absolute bottom-10 left-16 w-3 h-3 bg-yellow/30" />
      <div className="absolute bottom-8 right-20 w-8 h-8 border border-sunset/20 rounded-full" />

      <div className="max-w-[900px] mx-auto text-center relative z-10 reveal active">
        <p className="font-space text-xs text-sunset uppercase tracking-widest mb-6 font-bold">
          UNTIL THE HOUR
        </p>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          {[
            { value: pad(timeLeft.days), label: "DAYS" },
            { value: pad(timeLeft.hours), label: "HOURS" },
            { value: pad(timeLeft.minutes), label: "MINUTES" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-4 md:gap-8">
              <div className="text-center">
                <span className="font-archivo text-[18vw] md:text-[10vw] lg:text-[8vw] text-offwhite leading-none block">
                  {item.value}
                </span>
                <span className="font-space text-[10px] text-offwhite/40 uppercase tracking-widest font-bold">
                  {item.label}
                </span>
              </div>
              {i < 2 && (
                <span className="font-archivo text-4xl md:text-6xl text-sunset/40 self-start mt-2 md:mt-4">
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
