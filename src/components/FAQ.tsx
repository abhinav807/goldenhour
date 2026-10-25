"use client";

import TechHeading from "@/components/TechHeading";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { faqItems, eventConfig } from "@/lib/event";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return <section id="faq" className="bg-offwhite py-20 md:py-28 px-5 md:px-12 relative overflow-hidden dot-pattern gh-grain-paper">
    <div className="max-w-[850px] mx-auto relative z-10">
      <div className="text-center mb-10 reveal gh-section-head"><div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-4 uppercase shadow-[2px_2px_0_#050505]">QUESTIONS & ANSWERS</div><TechHeading className="font-archivo text-4xl sm:text-6xl md:text-7xl text-black" lines={["FREQUENTLY", "ASKED."]} /></div>
      <div className="space-y-3">{faqItems.map((faq, index) => { const isOpen = openIndex === index; return <article key={faq.q} className="brutal-card bg-offwhite gh-faq-item"><h3><button id={`faq-question-${index}`} type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} className="w-full min-h-14 p-5 md:p-6 flex items-center justify-between text-left gap-4" onClick={() => setOpenIndex(isOpen ? null : index)}><span className="font-archivo text-sm md:text-base text-black">{faq.q}</span><span className="font-space text-xl md:text-2xl text-sunset shrink-0 w-8 h-8 flex items-center justify-center border border-black/10" aria-hidden="true">{isOpen ? "×" : "+"}</span></button></h3>{isOpen && <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className="px-5 md:px-6 pb-5 md:pb-6 pt-3 border-t border-black/10"><p className="font-dm text-sm text-black/70 leading-relaxed">{faq.a} {faq.detail}</p></div>}</article>; })}</div>
      <div className="mt-10 text-center"><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange">REGISTER NOW <ArrowUpRight size={16} aria-hidden="true" /></a><p className="font-space text-[10px] text-black/55 mt-4">Questions? <a className="underline underline-offset-4" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a></p></div>
    </div>
  </section>;
}
