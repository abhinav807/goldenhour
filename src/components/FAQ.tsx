"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { faqItems, eventConfig } from "@/lib/event";

type Category = "ALL" | "ABOUT" | "ELIGIBILITY" | "TEAMS" | "LOGISTICS" | "REGISTRATION" | "RULES" | "PRIZES" | "SAFETY";
const filters: Category[] = ["ALL", "ABOUT", "ELIGIBILITY", "TEAMS", "LOGISTICS", "REGISTRATION", "RULES", "PRIZES", "SAFETY"];
const faqId = (question: string) => question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function FAQ() {
  const [filter, setFilter] = useState<Category>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);
  const visible = useMemo(() => filter === "ALL" ? faqItems : faqItems.filter((faq) => faq.category === filter), [filter]);
  return <section id="faq" className="bg-offwhite py-24 md:py-36 px-5 md:px-12 relative overflow-hidden dot-pattern">
    <div className="max-w-[850px] mx-auto relative z-10">
      <div className="text-center mb-10 reveal"><div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-4 uppercase shadow-[2px_2px_0_#050505]">CLARITY</div><h2 className="font-archivo text-4xl sm:text-6xl md:text-7xl text-black">FREQUENTLY<br />ASKED<span className="text-sunset">.</span></h2></div>
      <div className="flex flex-wrap justify-center gap-2 mb-10" aria-label="Filter frequently asked questions">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => { setFilter(item); setOpenId(null); }} className={`font-space text-[10px] font-bold uppercase border-2 px-3 py-2 ${filter === item ? "bg-black text-offwhite border-black" : "bg-offwhite text-black border-black/30 hover:border-black"}`}>{item}</button>)}</div>
      <div className="space-y-3">{visible.map((faq) => { const id = faqId(faq.q); const isOpen = openId === id; return <article key={faq.q} className="brutal-card bg-offwhite reveal"><h3><button id={`faq-question-${id}`} type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${id}`} className="w-full min-h-14 p-5 md:p-6 flex justify-center items-center text-center gap-4" onClick={() => setOpenId(isOpen ? null : id)}><span className="font-archivo text-sm md:text-base text-black">{faq.q}</span><span className="font-space text-xl md:text-2xl text-sunset shrink-0 w-8 h-8 flex items-center justify-center border border-black/10" aria-hidden="true">{isOpen ? "×" : "+"}</span></button></h3><div id={`faq-answer-${id}`} role="region" aria-labelledby={`faq-question-${id}`} hidden={!isOpen}><div className="px-5 md:px-6 pb-5 md:pb-6 pt-3 border-t border-black/10"><p className="font-dm text-sm text-black/70 leading-relaxed">{faq.a} {faq.detail}</p></div></div></article>; })}</div>
      <div className="mt-10 text-center"><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange">REGISTER NOW <ArrowUpRight size={16} aria-hidden="true" /></a><p className="font-space text-[10px] text-black/55 mt-4">Questions? <a className="underline underline-offset-4" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a></p></div>
    </div>
  </section>;
}
