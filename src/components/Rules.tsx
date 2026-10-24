import { ArrowUpRight } from "lucide-react";

const principles = [
  { num: "01", text: "MAKE SOMETHING.", note: "Start with the smallest real version." },
  { num: "02", text: "BUILD IT HERE.", note: "The project itself must start at the event." },
  { num: "03", text: "CREDIT YOUR TOOLS.", note: "Disclose AI tools in your project README." },
  { num: "04", text: "RESPECT THE ROOM.", note: "Follow the Code of Conduct and venue rules." },
  { num: "05", text: "TEST YOUR DEMO.", note: "Make sure the project is ready for review." },
  { num: "06", text: "HAVE FUN.", note: "Otherwise, why stay up?" },
];
const policy = [
  ["ELIGIBILITY", "Participants must be 13–19 on event day (under 20 on 14 November 2026)."],
  ["TEAM SIZE", "Teams of 1–3 participants. Solo builders are welcome."],
  ["UNDER 18", "Parent/guardian consent is required; bring a signed slip to check-in."],
  ["ORIGINALITY", "Open-source libraries, templates and your own reusable boilerplate are allowed."],
  ["AI TOOLS", "Allowed when disclosed in the project README."],
  ["SUBMISSION", "Submit repository, README and working demo by 5:00 PM IST sharp."],
  ["AWARD POSITIONS", "First, second and third place depend on the number of eligible teams and the judges’ evaluation. A position may remain unawarded if there are too few eligible submissions or judging criteria are not met. Placements and prizes are not guaranteed."],
];

export default function Rules() {
  return <section id="rules" className="bg-offwhite py-20 md:py-28 px-5 md:px-12 relative overflow-hidden gh-grain-paper"><div className="max-w-[1000px] mx-auto relative z-10"><div className="text-center mb-16 reveal gh-section-head"><div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-5 uppercase shadow-[2px_2px_0_#050505]">04 / THE CODE</div><h2 className="font-archivo text-6xl sm:text-7xl md:text-8xl text-black">THE RULES<span className="text-sunset">.</span></h2><p className="font-space text-xs text-black/55 max-w-md leading-relaxed mx-auto mt-6">Build boldly. Build fairly. Be ready to demo by 5 PM.</p></div><div>{principles.map((rule, i) => <div key={rule.num} className={`reveal ${i < 3 ? "delay-1" : "delay-2"}`}><div className="group border-t-2 border-black py-4 md:py-5 flex flex-col items-center text-center gap-3 transition-all duration-150 hover:bg-sunset/10"><span className="font-space text-xs text-sunset font-bold">{rule.num}</span><div className="flex flex-col items-center"><span className="font-archivo text-2xl sm:text-3xl md:text-4xl text-black group-hover:text-sunset transition-colors">{rule.text}</span><ArrowUpRight className="mt-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-sunset" size={22} aria-hidden="true" /><p className="font-space text-[10px] text-black/55 mt-3">{rule.note}</p></div></div></div>)}</div><div className="border-t-2 border-black" /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">{policy.map(([title, copy]) => <article key={title} className="border-2 border-black bg-yellow gh-ink-card p-6 text-center"><h3 className="font-archivo text-xl md:text-2xl text-black">{title}</h3><p className="font-dm text-sm text-black/75 mt-3">{copy}</p></article>)}</div><div className="mt-6 border-2 border-black bg-black text-offwhite gh-grain-night p-6 text-center"><p className="font-space text-[10px] text-sunset uppercase tracking-[.15em] font-bold">CODE OF CONDUCT</p><p className="font-dm text-sm text-offwhite/70 mt-3">Respect the room, the people and the work. Read the full policy before event day.</p><a href="/code-of-conduct" className="brutal-btn-orange inline-flex mt-5 text-xs">READ CODE OF CONDUCT <ArrowUpRight size={14} aria-hidden="true" /></a></div></div></section>;
}
