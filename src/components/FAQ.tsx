"use client";
import { useState } from "react";

const faqs = [
  {
    q: "WHO CAN PARTICIPATE?",
    a: "Any student currently enrolled in a college or university in India, strictly under 19 years of age. We welcome freshmen through final-year students. You don't need to be a CS major — designers, PMs, and anyone who wants to build is in.",
  },
  {
    q: "DO I NEED TO BE A CODER?",
    a: "No. GOLDENHOUR is for builders of all kinds. If you can design, write, plan, or think — there's a place for you. Teams thrive on diverse skills.",
  },
  {
    q: "IS IT FREE?",
    a: "Yes. 100% free. No registration fees. No hidden costs. We cover the venue, food, and infrastructure. You bring the ambition.",
  },
  {
    q: "WHAT SHOULD I BRING?",
    a: "Your laptop, charger, any hardware you want to hack with, and your best ideas. We'll provide Wi-Fi, power, food, and an environment built for shipping.",
  },
  {
    q: "HOW DO TEAMS WORK?",
    a: "Teams of 2–4. You can form one before the event or find teammates at our pre-event mixer. Solo builders are welcome too — you'll find your crew.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-offwhite py-24 md:py-36 px-5 md:px-12 relative overflow-hidden dot-pattern">
      <div className="max-w-[750px] mx-auto relative z-10">
        {/* Header — centered */}
        <div className="text-center mb-14 reveal">
          <div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-4 uppercase shadow-[2px_2px_0_#050505]">
            CLARITY
          </div>
          <h2 className="font-archivo text-4xl sm:text-6xl md:text-7xl text-black">
            FREQUENTLY
            <br />
            ASKED<span className="text-sunset">.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`brutal-card bg-offwhite reveal ${i < 3 ? "delay-1" : "delay-2"}`}
            >
              <button
                className="w-full p-5 md:p-6 flex justify-between items-center text-left gap-4"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-archivo text-sm md:text-base text-black">
                  {faq.q}
                </span>
                <span className="font-space text-xl md:text-2xl text-sunset transition-transform duration-200 shrink-0 w-8 h-8 flex items-center justify-center border border-black/10">
                  {openIdx === i ? "×" : "+"}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIdx === i ? "200px" : "0",
                  opacity: openIdx === i ? 1 : 0,
                }}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6 pt-3 border-t border-black/10">
                  <p className="font-dm text-sm text-black/70 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
