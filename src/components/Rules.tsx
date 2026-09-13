"use client";
import { ArrowUpRight } from "lucide-react";

const rules = [
  { num: "01", text: "MAKE SOMETHING.", note: "Start with the smallest real version." },
  { num: "02", text: "DON'T WAIT FOR PERMISSION.", note: "Your curiosity is enough of a brief." },
  { num: "03", text: "BREAK IT.", note: "A useful mistake is still useful." },
  { num: "04", text: "FIX IT.", note: "Keep the loop moving." },
  { num: "05", text: "SHOW YOUR WORK.", note: "The process is part of the product." },
  { num: "06", text: "HAVE FUN.", note: "Otherwise, why stay up?" },
];

export default function Rules() { return <section id="rules" className="bg-offwhite py-28 md:py-40 px-5 md:px-12 relative overflow-hidden"><div className="max-w-[1100px] mx-auto relative z-10"><div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 reveal"><div><div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-5 uppercase shadow-[2px_2px_0_#050505]">THE CODE</div><h2 className="font-archivo text-6xl sm:text-7xl md:text-8xl text-black">THE<br />RULES<span className="text-sunset">.</span></h2></div><p className="font-space text-xs text-black/55 max-w-[220px] leading-relaxed sm:text-right">Not a rulebook.<br />A reason to keep going.</p></div><div>{rules.map((rule, i) => <div key={rule.num} className={`reveal ${i < 3 ? "delay-1" : "delay-2"}`}><div className="group border-t-2 border-black py-6 md:py-8 flex items-start gap-5 md:gap-10 transition-all duration-150 hover:pl-3 hover:bg-sunset/10"><span className="font-space text-xs text-sunset font-bold shrink-0 w-8 pt-2">{rule.num}</span><div className="flex-1"><div className="flex items-start justify-between gap-4"><span className="font-archivo text-2xl sm:text-3xl md:text-5xl text-black group-hover:text-sunset transition-colors">{rule.text}</span><ArrowUpRight className="shrink-0 mt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sunset" size={22} /></div><p className="font-space text-[10px] text-black/45 mt-3">{rule.note}</p></div></div></div>)}</div><div className="border-t-2 border-black mt-0" /></div></section>; }
