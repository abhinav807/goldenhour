import { eventConfig, eventStatusLine } from "@/lib/event";

const facts = [
  ["WHAT", "GoldenHour V1 is a 12-hour student hackathon."],
  ["WHO", "Participants aged 13–19 on event day (under 20)."],
  ["CAPACITY", eventConfig.participantLimit],
  ["WHEN", `${eventConfig.dateShort} (${eventConfig.dateStatus.toLowerCase()}).`],
  ["WHERE", `${eventConfig.location}; ${eventConfig.venue}.`],
  ["COST", `${eventConfig.entry}.`],
  ["TEAM SIZE", `${eventConfig.teamSize}.`],
  ["TRACKS", `${eventConfig.tracks.join(" and ")}.`],
  ["STATUS", eventStatusLine],
] as const;

export default function EventAtAGlance() {
  return <section aria-labelledby="event-at-a-glance" className="bg-sunset text-black px-5 md:px-10 py-12 border-y-4 border-black"><div className="max-w-[1200px] mx-auto"><p className="gh-kicker">FACTS / V1</p><h2 id="event-at-a-glance" className="font-archivo text-4xl md:text-6xl leading-[.85] mt-5 mb-8">GOLDENHOUR AT A <span className="text-offwhite">GLANCE.</span></h2><p className="font-dm text-base md:text-lg max-w-3xl mb-8">GoldenHour Delhi is the name of a student-run hackathon in Delhi NCR. It is not a reference to the photography term “golden hour.”</p><dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{facts.map(([term, description]) => <div key={term} className="border-2 border-black p-4 min-h-28"><dt className="font-space text-[10px] font-bold tracking-[.16em] mb-3">{term}</dt><dd className="font-dm text-sm leading-relaxed">{description}</dd></div>)}</dl><p className="font-space text-[10px] font-bold mt-6">LAST UPDATED: {eventConfig.lastUpdated}</p></div></section>;
}
