"use client";

import TechHeading from "@/components/TechHeading";
import { useEffect, useState } from "react";
import Counter from "./Counter";
import { eventConfig } from "@/lib/event";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
const target = new Date(eventConfig.isoDate).getTime();

function remaining(): TimeLeft {
  const seconds = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  useEffect(() => {
    const update = () => setTimeLeft(remaining());
    const first = setTimeout(update, 0);
    const interval = setInterval(update, 1000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);
  const units = [
    { value: timeLeft?.days, label: "DAYS" },
    { value: timeLeft?.hours, label: "HOURS" },
    { value: timeLeft?.minutes, label: "MINUTES" },
    { value: timeLeft?.seconds, label: "SECONDS" },
  ];

  return <section id="countdown" className="bg-black py-20 md:py-28 px-5 md:px-10 relative overflow-hidden border-y-4 border-sunset gh-grain-night">
    <div className="absolute top-8 left-8 w-6 h-6 border-2 border-sunset/30 rotate-45" />
    <div className="absolute bottom-10 right-16 w-12 h-12 border border-sunset/20 rounded-full" />
    <div className="max-w-[1200px] mx-auto relative z-10 reveal text-center">
      <div className="mb-14">
        <p className="font-space text-xs text-sunset uppercase tracking-[.18em] mb-5 font-bold">UNTIL THE HOUR</p>
        <TechHeading className="font-archivo text-4xl md:text-6xl text-offwhite" lines={["THE CLOCK", {"text": "IS RUNNING.", "className": "text-sunset"}]} />
        <p className="font-space text-[10px] text-offwhite/45 uppercase leading-relaxed mt-6"><time dateTime={eventConfig.isoDate}>SATURDAY, {eventConfig.date} / 08:00 AM IST</time> / {eventConfig.location} / <span className="text-offwhite/75">12 HOURS OF MAKING</span></p>
      </div>
      <div role="timer" aria-label="Time until GoldenHour starts" aria-live="off" className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-5 border-t border-offwhite/15 pt-10 max-w-[1080px] mx-auto">
        {units.map(item => <div key={item.label} className="text-center">
          <div className="font-archivo text-[18vw] sm:text-[15vw] md:text-[8vw] text-offwhite leading-none">
            {item.value === undefined ? <span aria-label="Loading countdown">--</span> : <Counter value={item.value} minDigits={2} direction="down" duration={0.45} bounce={0.12} fontSize="inherit" fade={0.12} />}
          </div>
          <span className="font-space text-[9px] md:text-[10px] text-offwhite/40 uppercase tracking-widest font-bold block mt-4">{item.label}</span>
        </div>)}
      </div>
    </div>
  </section>;
}
