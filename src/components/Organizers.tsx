"use client";

import { ArrowUpRight } from "lucide-react";

const organizers = [
  { num: "01", name: "ABHINAV GOYAL", role: "ORGANIZER / BUILDER" },
  { num: "02", name: "DIVYA", role: "ORGANIZER / BUILDER" },
  { num: "03", name: "ARYAN BRITE", role: "JUDGE / MENTOR" },
  { num: "04", name: "PRANAB SAINI", role: "FOUNDER / DELHIHACKS" },
  { num: "05", name: "YASHPAL YADAV", role: "CO-FOUNDER / DELHIHACKS" },
];

export default function Organizers() {
  return (
    <section id="organizers" className="bg-offwhite py-28 md:py-40 px-5 md:px-10 relative overflow-hidden dot-pattern">
      <div className="max-w-[1240px] mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-14 md:mb-16 reveal">
          <div className="inline-block font-space text-[10px] font-bold bg-yellow text-black px-3 py-1 mb-6 uppercase shadow-[2px_2px_0_#050505]">04 / PEOPLE BEHIND THE CLOCK</div>
          <h2 className="font-archivo text-5xl sm:text-6xl md:text-8xl">THE<br />ORGANIZERS<span className="text-sunset">.</span></h2>
          <p className="font-space text-xs md:text-sm text-black/55 mt-6 leading-relaxed">The people holding the thread from first idea to final build.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1120px] mx-auto text-center">
          {organizers.map((organizer, index) => {
            const isAryan = organizer.name === "ARYAN BRITE";
            const isFirst = index === 0;
            const isPranab = organizer.name === "PRANAB SAINI";
            const isYashpal = organizer.name === "YASHPAL YADAV";
            return (
              <article key={organizer.name} className={`brutal-card p-8 md:p-10 min-h-[280px] flex flex-col justify-between items-center text-center reveal ${index === 0 ? "delay-1" : "delay-2"} ${index === 1 || isPranab || isYashpal ? "bg-sunset" : "bg-black"}`}>
                <div className="flex justify-between items-start w-full">
                  <span className={`w-14 h-14 border-2 flex items-center justify-center font-archivo text-xl ${isFirst ? "border-offwhite bg-offwhite text-black" : isAryan ? "border-sunset bg-black text-sunset" : isYashpal ? "border-black bg-black text-sunset" : "border-black bg-black text-offwhite"}`}>{organizer.num}</span>
                  <ArrowUpRight className={isFirst || isAryan || isPranab ? "text-black" : "text-black"} size={24} />
                </div>
                <div>
                  <h3 className={`font-archivo text-3xl md:text-4xl ${isFirst ? "text-offwhite" : isAryan ? "text-sunset" : "text-black"}`}>{organizer.name}</h3>
                  <p className={`font-space text-[10px] uppercase tracking-[.12em] mt-3 ${isFirst ? "text-offwhite/55" : isAryan ? "text-sunset/80" : "text-black/65"}`}>{organizer.role}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
