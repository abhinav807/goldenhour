"use client";
import { useMemo, useState } from "react";

type Category = "ALL" | "ELIGIBILITY" | "TEAMS" | "LOGISTICS" | "SUBMISSION";
const filters: Category[] = ["ALL", "ELIGIBILITY", "TEAMS", "LOGISTICS", "SUBMISSION"];
const faqs: Array<{ q: string; a: string; category: Exclude<Category, "ALL"> }> = [
  { q: "WHO CAN PARTICIPATE?", a: "Students from school, college, or any educational background can participate, as long as they are strictly under 19 years of age. You don't need to be a CS major — designers, PMs, and anyone who wants to build is in.", category: "ELIGIBILITY" },
  { q: "DO I NEED TO BE A CODER?", a: "No. GOLDENHOUR is for builders of all kinds. If you can design, write, plan, or think — there's a place for you. Teams thrive on diverse skills.", category: "ELIGIBILITY" },
  { q: "IS IT FREE?", a: "Yes. 100% free. No registration fees. No hidden costs. We cover the venue, food, and infrastructure. You bring the ambition.", category: "LOGISTICS" },
  { q: "WHAT SHOULD I BRING?", a: "Your laptop, charger, any hardware you want to hack with, and your best ideas. We'll provide Wi-Fi, power, food, and an environment built for shipping.", category: "LOGISTICS" },
  { q: "HOW DO TEAMS WORK?", a: "Teams can have 1–3 participants. You can form one before the event or find teammates through the GOLDENHOUR community. Solo builders are welcome too.", category: "TEAMS" },
  { q: "IS THE VENUE CONFIRMED?", a: "The event is planned for Delhi, and the venue will be announced separately. The date is currently marked tentative.", category: "LOGISTICS" },
  { q: "HOW DO I REGISTER?", a: "Registration is currently closed and will open in November 2026. Check the registration section for the live form when it opens.", category: "SUBMISSION" },
];

export default function FAQ() {
  const [filter, setFilter] = useState<Category>("ALL");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const visible = useMemo(() => filter === "ALL" ? faqs : faqs.filter((faq) => faq.category === filter), [filter]);
  return <section id="faq" className="bg-offwhite py-24 md:py-36 px-5 md:px-12 relative overflow-hidden dot-pattern"><div className="max-w-[750px] mx-auto relative z-10"><div className="text-center mb-10 reveal"><div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-4 uppercase shadow-[2px_2px_0_#050505]">CLARITY</div><h2 className="font-archivo text-4xl sm:text-6xl md:text-7xl text-black">FREQUENTLY<br />ASKED<span className="text-sunset">.</span></h2></div><div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filter frequently asked questions">{filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} onClick={() => { setFilter(item); setOpenIdx(null); }} className={`font-space text-[10px] font-bold uppercase border-2 px-3 py-2 ${filter === item ? "bg-black text-offwhite border-black" : "bg-offwhite text-black border-black/30 hover:border-black"}`}>{item}</button>)}</div><div className="space-y-3">{visible.map((faq, i) => <div key={faq.q} className="brutal-card bg-offwhite reveal"><button id={`faq-question-${i}`} aria-expanded={openIdx === i} aria-controls={`faq-answer-${i}`} className="w-full p-5 md:p-6 flex justify-center items-center text-center gap-4" onClick={() => setOpenIdx(openIdx === i ? null : i)}><span className="font-archivo text-sm md:text-base text-black text-center">{faq.q}</span><span className="font-space text-xl md:text-2xl text-sunset shrink-0 w-8 h-8 flex items-center justify-center border border-black/10">{openIdx === i ? "×" : "+"}</span></button><div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={openIdx !== i}><div className="px-5 md:px-6 pb-5 md:pb-6 pt-3 border-t border-black/10"><p className="font-dm text-sm text-black/70 leading-relaxed">{faq.a}</p></div></div></div>)}</div></div></section>;
}
