"use client";

import { useState } from "react";
import { ChevronDown, ClipboardCheck } from "lucide-react";
import { eventConfig } from "@/lib/event";

type Phase = {
  start: string;
  end: string;
  title: string;
  description: string;
  objectives?: string[];
  tip?: string;
  review?: boolean;
  submission?: boolean;
};

const phases: Phase[] = [
  { start: "08:00", end: "09:00", title: "REGISTRATION & CHECK-IN", description: "Participant check-in, age verification, badge collection, venue orientation and workstation setup.", objectives: ["Complete check-in and verification", "Confirm team details", "Settle in and prepare your workstation"], tip: "Bring an acceptable age-verification document. Organizers view it only; they do not copy or store it." },
  { start: "09:00", end: "09:20", title: "WELCOME & EVENT BRIEFING", description: "Welcome address, GoldenHour V1 overview, event rules, judging criteria and submission requirements.", review: true },
  { start: "09:20", end: "09:40", title: "GUEST SPEAKER SESSION", description: "A focused guest speaker session before the build begins.", review: true },
  { start: "09:40", end: "10:00", title: "TEAM SETUP & HACKATHON BRIEFING", description: "Teams finalize their ideas and receive the complete project and event briefing before building begins.", review: true },
  { start: "10:00", end: "13:30", title: "BUILD SPRINT 1", description: "The first major build session. Teams design, build and test their projects, with mentors and organizers available for support.", objectives: ["Define a small, shippable first version", "Set up the core project structure", "Build the most important user flow"], tip: "Ship the smallest useful version before adding extra features." },
  { start: "13:30", end: "14:00", title: "LUNCH BREAK", description: "A scheduled break to recharge before the afternoon build sprint.", objectives: ["Save your work before stepping away", "Take a proper break", "Return ready for the second sprint"] },
  { start: "14:00", end: "16:30", title: "BUILD SPRINT 2", description: "Teams continue building, integrate features, test their projects and prepare the final submission.", objectives: ["Finish the core experience", "Test the demo path from start to finish", "Ask for help before the final window"], tip: "Protect time for testing; a reliable demo beats an unfinished wishlist." },
  { start: "16:30", end: "17:00", title: "FINAL TESTING & SUBMISSION — HARD CUTOFF AT 5 PM", description: "Complete final testing and submit all required project materials. The submission deadline is 5:00 PM IST sharp; late submissions cannot be accepted.", objectives: ["Submit the public project repository", "Include a README with any AI-tool disclosures", "Provide a working demo link", "Check all links before 5:00 PM IST"], tip: "Submit as early as possible. The submission form closes at 5:00 PM IST.", submission: true },
  { start: "17:00", end: "18:30", title: "JUDGING & PROJECT EVALUATION", description: "The judging panel evaluates eligible submissions against the published event criteria.", review: true },
  { start: "18:30", end: "19:00", title: "RESULTS & PRIZE DISTRIBUTION", description: "Results are announced and winning teams receive their team trophy and participant prizes.", objectives: ["Be present for the announcement", "Celebrate all teams", "Listen for organizer updates"] },
  { start: "19:00", end: "20:00", title: "CLOSING & COMMUNITY", description: "Closing remarks, photographs and final networking before the 12-hour Build Day concludes.", review: true },
];

function phaseStatus(phase: Phase) {
  const eventDay = eventConfig.isoDate.slice(0, 10);
  const start = new Date(`${eventDay}T${phase.start}:00+05:30`).getTime();
  const end = new Date(`${eventDay}T${phase.end}:00+05:30`).getTime();
  const now = Date.now();
  if (now < start) return "UPCOMING";
  if (now < end) return "ACTIVE";
  return "COMPLETED";
}

export default function Timeline() {
  const [open, setOpen] = useState<number[]>([0]);
  const allOpen = open.length === phases.length;
  const toggle = (index: number) => setOpen((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  const toggleAll = () => setOpen(allOpen ? [] : phases.map((_, index) => index));

  return (
    <section id="timeline" className="bg-offwhite py-28 md:py-40 px-5 md:px-10 relative overflow-hidden grid-pattern">
      <div className="max-w-[1100px] mx-auto relative z-10">
        <header className="text-center max-w-3xl mx-auto mb-12 reveal">
          <div className="inline-block font-space text-[10px] font-bold bg-black text-offwhite px-3 py-1 mb-6 uppercase">03 / EVENT TIMELINE</div>
          <h2 className="font-archivo text-5xl sm:text-6xl md:text-8xl text-black">THE BUILD<br />DAY<span className="text-sunset">.</span></h2>
          <p className="font-space text-xs md:text-sm text-black/55 max-w-lg mx-auto mt-6 leading-relaxed">A 12-hour Build Day from 8:00 AM to 8:00 PM IST. Project submissions close at 5:00 PM IST sharp. The date is tentative; venue details will follow.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 text-center">
            <div className="border-2 border-black p-4"><p className="font-space text-[9px] uppercase text-black/50">DURATION</p><p className="font-archivo text-xl mt-2">08:00–20:00 / 12H</p></div>
            <div className="border-2 border-black p-4"><p className="font-space text-[9px] uppercase text-black/50">SUBMISSIONS CLOSE</p><p className="font-archivo text-xl mt-2">17:00 / IST</p></div>
            <div className="border-2 border-black p-4"><p className="font-space text-[9px] uppercase text-black/50">VENUE</p><p className="font-archivo text-xl mt-2">{eventConfig.venue}</p></div>
          </div>
          <p className="font-space text-[9px] uppercase text-black/45 mt-4">{eventConfig.date} / {eventConfig.dateStatus}</p>
        </header>
        <div className="flex justify-center gap-3 mb-8"><button type="button" onClick={toggleAll} className="brutal-btn bg-black text-offwhite px-4 py-3 text-[10px]" aria-label={allOpen ? "Collapse all timeline phases" : "Expand all timeline phases"}>{allOpen ? "COLLAPSE ALL" : "EXPAND ALL"}</button></div>
        <div className="relative space-y-4 before:absolute before:left-5 md:before:left-8 before:top-5 before:bottom-5 before:w-1 before:bg-black">
          {phases.map((phase, index) => {
            const isOpen = open.includes(index);
            const status = phaseStatus(phase);
            const startLabel = new Date(`2000-01-01T${phase.start}:00Z`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC" });
            const endLabel = new Date(`2000-01-01T${phase.end}:00Z`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC" });
            const panelId = `phase-panel-${index}`;
            const buttonId = `phase-button-${index}`;
            return <article key={phase.start} className={`relative ml-0 border-2 border-black bg-offwhite shadow-[6px_6px_0_#050505] ${phase.submission ? "ring-4 ring-sunset" : ""}`}>
              <button id={buttonId} type="button" className="relative w-full text-left p-5 md:p-7 pl-14 md:pl-20" onClick={() => toggle(index)} aria-expanded={isOpen} aria-controls={panelId}>
                <span className="absolute left-2 md:left-5 top-5 w-8 h-8 md:w-10 md:h-10 bg-black text-sunset border-2 border-sunset flex items-center justify-center font-archivo text-sm md:text-base" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex flex-wrap justify-between items-center gap-3"><span className="font-space text-[10px] md:text-xs font-bold text-sunset">{startLabel} – {endLabel} IST</span><span className={`font-space text-[9px] font-bold px-2 py-1 border border-black ${status === "UPCOMING" ? "bg-yellow text-black" : "bg-black text-offwhite"}`}>{status}</span></span>
                <span className="block font-archivo text-xl md:text-2xl text-black mt-3 pr-8">{phase.title}</span>
                <ChevronDown size={20} className={`absolute right-5 md:right-7 bottom-6 text-black transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isOpen && <div id={panelId} role="region" aria-labelledby={buttonId} className="border-t-2 border-black p-5 md:p-7 md:pl-20">
                <p className="font-dm text-sm md:text-base text-black/70 leading-relaxed">{phase.description}</p>
                {phase.objectives && <div className="mt-6 border-2 border-black p-5"><h3 className="font-space text-[10px] font-bold uppercase tracking-[.14em] mb-3">PHASE OBJECTIVES &amp; ACTIONS</h3><ul className="font-dm text-sm text-black/70 space-y-2 list-disc list-inside">{phase.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>}
                {phase.tip && <p className="font-space text-xs text-black mt-5 border-l-4 border-sunset pl-4"><strong>NOTE:</strong> {phase.tip}</p>}
                {phase.review && <p className="font-space text-[10px] text-black/50 uppercase mt-5">Detailed arrangements to be confirmed by organizers.</p>}
                {phase.submission && <div className="mt-6 border-2 border-black bg-sunset p-5 text-center"><p className="font-space text-xs font-bold uppercase tracking-[.14em] flex items-center justify-center gap-2"><ClipboardCheck size={16} aria-hidden="true" /> HARD SUBMISSION DEADLINE / 05:00 PM IST</p><p className="font-space text-[10px] mt-2">Submissions close at 5:00 PM IST sharp. Late work cannot be accepted.</p></div>}
              </div>}
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
