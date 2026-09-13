"use client";
import { Compass, Moon, Zap, ArrowUpRight } from "lucide-react";

const events = [
  { num: "01", label: "THE MAIN EVENT", title: "GOLDENHOUR", description: "A 48-hour student build sprint for ideas with nowhere else to go. Find a crew, pick a problem, ship the first version.", icon: <Zap size={34} />, cardBg: "bg-offwhite", labelBg: "bg-sunset", rotation: "-rotate-1", meta: "48 HOURS / 2–4 PEOPLE" },
  { num: "02", label: "NIGHT MODE", title: "AFTER DARK", description: "When the campus goes quiet, the real work begins. Midnight-to-sunrise sessions, honest feedback, and the best kind of tired.", icon: <Moon size={34} />, cardBg: "bg-black text-offwhite", labelBg: "bg-offwhite", labelColor: "text-black", titleColor: "text-offwhite", descColor: "text-offwhite/70", iconColor: "text-offwhite/20", rotation: "rotate-[.5deg]", meta: "00:00 / UNTIL SUNRISE" },
  { num: "03", label: "EXPERIMENTAL", title: "SIDE QUEST", description: "Tiny prompts, strange tools, unexpected outcomes. Five minutes or five hours — the only rule is to make it real.", icon: <Compass size={34} />, cardBg: "bg-offwhite", labelBg: "bg-yellow", rotation: "-rotate-[.5deg]", meta: "OPEN FORMAT / ZERO PRESSURE" },
];

export default function Events() {
  return <section id="events" className="bg-offwhite py-24 md:py-36 px-5 md:px-12 relative overflow-hidden grid-pattern">
    <div className="max-w-[1200px] mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14 border-b-2 border-black pb-8 reveal">
        <div><div className="inline-block font-space text-[10px] font-bold bg-black text-offwhite px-3 py-1 mb-4">02 / EXPERIENCES</div><h2 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl">WHAT&apos;S<br />HAPPENING<span className="text-sunset">?</span></h2></div>
        <p className="font-space text-xs md:text-sm max-w-sm font-bold text-black/60 md:text-right">Three ways to participate.<br />One reason to show up.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-7 lg:gap-9">
        {events.map((ev, i) => <div key={ev.num} className={`reveal ${i === 0 ? "delay-1" : i === 1 ? "delay-2" : "delay-3"}`}>
          <article className={`brutal-card p-6 md:p-8 min-h-[430px] flex flex-col justify-between relative overflow-hidden ${ev.rotation} ${ev.cardBg}`}>
            <div><div className="flex justify-between items-start mb-9"><div className="w-14 h-14 border-2 border-black bg-black text-offwhite flex items-center justify-center text-xl font-archivo">{ev.num}</div><div className={ev.iconColor || "text-sunset/40"}>{ev.icon}</div></div>
              <div className={`font-space text-[10px] font-bold ${ev.labelBg} ${ev.labelColor || "text-black"} px-2 py-1 uppercase inline-block mb-4 border border-black`}>{ev.label}</div>
              <h3 className={`font-archivo text-3xl md:text-4xl mb-4 ${ev.titleColor || "text-black"}`}>{ev.title}</h3>
              <p className={`font-space text-xs leading-relaxed ${ev.descColor || "text-black/70"}`}>{ev.description}</p>
            </div>
            <div><div className={`flex items-center justify-between border-t ${ev.titleColor ? "border-offwhite/20" : "border-black/15"} pt-4 mb-5`}><span className="font-space text-[9px] uppercase opacity-55">{ev.meta}</span><ArrowUpRight size={17} className={ev.titleColor || "text-sunset"} /></div><a href="#register" className={`brutal-btn w-full py-3.5 text-xs ${ev.titleColor ? "bg-offwhite text-black hover:bg-sunset" : ""}`}>ENTER EXPERIENCE <ArrowUpRight size={14} /></a></div>
          </article>
        </div>)}
      </div>
    </div>
  </section>;
}
