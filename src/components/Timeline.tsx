"use client";

const schedule = [
  ["08:00 AM – 09:00 AM", "📝 REGISTRATION & CHECK-IN", "Participant check-in, verification, badge collection, venue orientation, team settling and brief introductions before the event begins."],
  ["09:00 AM – 09:20 AM", "🎤 INTRODUCTION TO GOLDENHOUR & SPONSORS", "Welcome address, introduction to GoldenHour V1, sponsor introductions, hackathon format, rules, judging criteria and submission requirements."],
  ["09:20 AM – 09:40 AM", "🎙️ GUEST SPEAKER SESSION", "A focused guest speaker session to share perspective, practical insight and inspiration before the build begins."],
  ["09:40 AM – 10:00 AM", "💻 TEAM FORMATION, SETUP & HACKATHON BRIEFING", "Teams form, finalize their ideas, set up repositories and get the complete briefing before the first sprint."],
  ["10:00 AM – 01:30 PM", "🚀 HACKING SPRINT 1", "The first major build session. Teams design, build and test their projects with mentors and organizers available for support."],
  ["01:30 PM – 02:00 PM", "🍕 LUNCH BREAK", "Lunch served for participants, with time to recharge before the afternoon sprint."],
  ["02:00 PM – 04:30 PM", "🚀 HACKING SPRINT 2", "The second development sprint. Teams continue building, integrate features, test their projects and prepare everything for submission."],
  ["04:30 PM – 05:00 PM", "📦 FINAL TESTING & SUBMISSION PREPARATION", "Teams complete final testing, polish their demos and prepare the required submission materials."],
  ["05:00 PM – 05:30 PM", "📤 PROJECT SUBMISSIONS", "Final submission window. Teams submit their repository, deployed project or demo link and required project information."],
  ["05:30 PM – 07:00 PM", "🧑‍⚖️ JUDGING & PROJECT EVALUATION", "Submitted projects are evaluated by the judging panel according to the official judging criteria."],
  ["07:00 PM – 07:20 PM", "🎉 RESULTS & WINNER ANNOUNCEMENT", "The judging results are announced and the winning projects are celebrated."],
  ["07:20 PM – 07:40 PM", "🏆 PRIZE DISTRIBUTION", "Prizes, acknowledgements and certificates are distributed to the winning teams."],
  ["07:40 PM – 08:00 PM", "📸 CLOSING, PHOTOS & NETWORKING", "Closing remarks, group photographs and final networking before the 12-hour hackathon concludes."],
];

export default function Timeline() {
  return <section id="timeline" className="bg-offwhite py-28 md:py-40 px-5 md:px-10 relative overflow-hidden grid-pattern"><div className="max-w-[1100px] mx-auto relative z-10"><header className="text-center max-w-3xl mx-auto mb-16 reveal"><div className="inline-block font-space text-[10px] font-bold bg-black text-offwhite px-3 py-1 mb-6 uppercase">03 / EVENT TIMELINE</div><h2 className="font-archivo text-5xl sm:text-6xl md:text-8xl text-black">THE BUILD<br />DAY<span className="text-sunset">.</span></h2><p className="font-space text-xs md:text-sm text-black/55 max-w-lg mx-auto mt-6 leading-relaxed">A complete 12-hour build day from registration and team formation through judging, prizes, closing photos and networking.</p></header><div className="space-y-4">{schedule.map(([time, title, description], index) => <article key={time} className={`brutal-card bg-offwhite p-6 md:p-8 grid md:grid-cols-[220px_1fr] gap-5 md:gap-10 items-start reveal ${index % 2 ? "delay-2" : "delay-1"}`}><div className="font-space text-xs md:text-sm text-sunset font-bold leading-relaxed">{time}</div><div><h3 className="font-archivo text-xl md:text-2xl text-black mb-3">{title}</h3><p className="font-dm text-sm md:text-base text-black/65 leading-relaxed">{description}</p></div></article>)}</div><div className="mt-8 border-2 border-black bg-sunset p-6 text-center shadow-[7px_7px_0_#050505]"><p className="font-space text-xs font-bold uppercase tracking-[.14em]">HARD SUBMISSION DEADLINE / 05:00 PM</p><p className="font-space text-[10px] mt-2">Development closes when submissions close.</p></div></div></section>;
}
