"use client";
import { useState } from "react";

const faqs = [
  {
    q: "WHO CAN PARTICIPATE?",
    a: "Any student currently enrolled in a college or university in India. We welcome freshmen through final-year students. You don't need to be a CS major — designers, PMs, and anyone who wants to build is in.",
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
    <section id="faq" className="bg-offwhite py-28 md:py-40 px-5 md:px-12 relative overflow-hidden dot-pattern">
      <div className="max-w-[800px] mx-auto relative z-10">
        <div className="text-center mb-16 reveal active">
          <div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-3 uppercase shadow-[2px_2px_0_#050505]">
            CLARITY
          </div>
          <h2 className="font-archivo text-4xl sm:text-6xl md:text-7xl text-black">
            FREQUENTLY
            <br />
            ASKED<span className="text-sunset">.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`brutal-card bg-offwhite reveal ${i < 3 ? "delay-1" : "delay-2"} active`}
            >
              <button
                className="w-full p-6 flex justify-between items-center text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-archivo text-sm md:text-base text-black">
                  {faq.q}
                </span>
                <span className="faq-icon font-space text-2xl text-sunset transition-transform duration-200 shrink-0 ml-4">
                  {openIdx === i ? "×" : "+"}
                </span>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 pt-4 border-t border-black/10">
                  <p className="font-dm text-sm text-black/70 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
