"use client";

import { ArrowUpRight } from "lucide-react";

type Person = { num: string; name: string; role: string };

const groups: Array<{ title: string; people: Person[]; tone: "dark" | "sunset" | "light" }> = [
  {
    title: "LEAD ORGANISERS",
    tone: "dark",
    people: [
      { num: "01", name: "ABHINAV GOYAL", role: "LEAD ORGANISER / BUILDER" },
      { num: "02", name: "DIVYA", role: "LEAD ORGANISER / BUILDER" },
    ],
  },
  {
    title: "CO-ORGANISERS",
    tone: "sunset",
    people: [
      { num: "03", name: "YASHPAL YADAV", role: "CO-ORGANISER" },
      { num: "04", name: "ANURAG", role: "CO-ORGANISER" },
      { num: "05", name: "HARSH", role: "CO-ORGANISER" },
    ],
  },
  {
    title: "MENTORS",
    tone: "light",
    people: [
      { num: "05", name: "ARYAN BRITE", role: "MENTOR / JUDGE" },
      { num: "06", name: "SUKHDEV", role: "MENTOR" },
    ],
  },
];

const toneClasses = {
  dark: { card: "bg-black text-offwhite", number: "border-offwhite bg-offwhite text-black", name: "text-offwhite", role: "text-offwhite/55", arrow: "text-sunset" },
  sunset: { card: "bg-sunset text-black", number: "border-black bg-black text-sunset", name: "text-black", role: "text-black/65", arrow: "text-black" },
  light: { card: "bg-offwhite text-black", number: "border-black bg-yellow text-black", name: "text-black", role: "text-black/60", arrow: "text-sunset" },
};

function PersonCard({ person, tone, delay }: { person: Person; tone: "dark" | "sunset" | "light"; delay: string }) {
  const styles = toneClasses[tone];
  return (
    <article className={`brutal-card p-6 md:p-8 min-h-[220px] flex flex-col justify-between items-center text-center reveal ${delay} ${styles.card}`}>
      <div className="flex justify-between items-start w-full">
        <span className={`w-11 h-11 border-2 flex items-center justify-center font-archivo text-base ${styles.number}`}>{person.num}</span>
        <ArrowUpRight className={styles.arrow} size={21} aria-hidden="true" />
      </div>
      <div>
        <h3 className={`font-archivo text-2xl md:text-3xl ${styles.name}`}>{person.name}</h3>
        <p className={`font-space text-[10px] uppercase tracking-[.12em] mt-3 ${styles.role}`}>{person.role}</p>
      </div>
    </article>
  );
}

export default function Organizers() {
  return (
    <section id="organizers" className="bg-offwhite py-28 md:py-40 px-5 md:px-10 relative overflow-hidden dot-pattern">
      <div className="max-w-[1240px] mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-14 md:mb-16 reveal">
          <div className="inline-block font-space text-[10px] font-bold bg-yellow text-black px-3 py-1 mb-6 uppercase shadow-[2px_2px_0_#050505]">04 / PEOPLE BEHIND THE CLOCK</div>
          <h2 className="font-archivo text-5xl sm:text-6xl md:text-8xl">THE<br />TEAM<span className="text-sunset">.</span></h2>
          <p className="font-space text-xs md:text-sm text-black/55 mt-6 leading-relaxed">The people holding the thread from first idea to final build.</p>
        </div>
        <div className="space-y-14 max-w-[1120px] mx-auto">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="flex items-center justify-center gap-4 mb-6"><span className="h-px w-10 bg-sunset" /><h3 className="font-space text-[10px] font-bold tracking-[.16em] text-sunset uppercase">{group.title}</h3><span className="h-px w-10 bg-sunset" /></div>
              <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
                {group.people.map((person, index) => <PersonCard key={person.name} person={person} tone={group.tone} delay={`delay-${index + 1}`} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
