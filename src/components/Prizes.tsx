import TechHeading from "@/components/TechHeading";
import { eventConfig } from "@/lib/event";

const prizes = [
  { medal: "🥇", place: "FIRST PLACE", title: "WINNER", trophy: "ONE GOLDENHOUR TROPHY / PER TEAM", reward: "2-YEAR VIP MEMBERSHIP / PER PARTICIPANT", tone: "bg-sunset text-black shadow-[7px_7px_0_#f7f7f2]" },
  { medal: "🥈", place: "SECOND PLACE", title: "RUNNER-UP", trophy: "ONE GOLDENHOUR TROPHY / PER TEAM", reward: "1-YEAR VIP MEMBERSHIP / PER PARTICIPANT", tone: "bg-offwhite text-black shadow-[7px_7px_0_#ff5a00]" },
  { medal: "🥉", place: "THIRD PLACE", title: "2ND RUNNER-UP", trophy: "ONE GOLDENHOUR TROPHY / PER TEAM", reward: "6-MONTH VIP MEMBERSHIP / PER PARTICIPANT", tone: "bg-yellow text-black shadow-[7px_7px_0_#f7f7f2]" },
];

export default function Prizes() {
  return <section id="prizes" className="bg-black text-offwhite py-20 md:py-28 px-5 md:px-10 relative overflow-hidden gh-grain-night">
    <div className="max-w-[1200px] mx-auto relative z-10">
      <header className="text-center max-w-3xl mx-auto mb-16 reveal gh-section-head">
        <div className="inline-block font-space text-[10px] font-bold bg-yellow text-black px-3 py-1 mb-6 uppercase">06 / RECOGNITION</div>
        <TechHeading className="font-archivo text-5xl sm:text-6xl md:text-8xl" lines={["PRIZES."]} />
        <p className="font-space text-xs md:text-sm text-offwhite/55 max-w-lg mx-auto mt-6 leading-relaxed">One GoldenHour trophy per winning team. CodeCrafters VIP memberships are awarded per person. 80 sponsored one-month n8n Cloud Pro licenses are available for allocation (stated value <strong className="font-bold text-offwhite">$60</strong> each); access is not guaranteed for every participant.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-7 max-w-[1100px] mx-auto">
        {prizes.map(({ medal, place, title, trophy, reward, tone }) => <article key={place} className={`gh-prize-ticket p-7 md:p-9 min-h-[320px] border-2 border-black flex flex-col justify-between text-center reveal ${tone}`}>
          <div>
            <div className="text-5xl mb-6" aria-hidden="true">{medal}</div>
            <p className="font-space text-[10px] font-bold tracking-[.16em] mb-4">{place}</p>
            <h3 className="font-archivo text-3xl md:text-4xl leading-[.9]">{title}</h3>
          </div>
          <div className="mt-8 border-t-2 border-black/25 pt-5 space-y-1">
            <p className="font-space text-xs font-bold uppercase tracking-[.08em] leading-relaxed">{trophy}</p>
            <p className="font-archivo text-base md:text-lg uppercase mt-3 leading-relaxed break-normal">{reward}</p>
            <p className="font-space text-[10px] uppercase tracking-[.08em] mt-3 opacity-75 leading-relaxed">CODECRAFTERS VIP MEMBERSHIP</p>
          </div>
        </article>)}
      </div>

      <div className="max-w-[1100px] mx-auto mt-8 grid md:grid-cols-2 gap-6"><div className="border-2 border-sunset gh-grain-night p-7"><h3 className="font-archivo text-2xl text-sunset">WINNERS / PER PERSON</h3><p className="font-dm text-sm text-offwhite/80 mt-4 leading-relaxed">Digital winner certificate · <a href="https://fueler.io/premium" target="_blank" rel="noopener noreferrer" className="underline">Fueler Premium worth $100</a> · AI Interview Voucher worth ₹550.</p></div><div className="border-2 border-offwhite/30 gh-grain-night p-7"><h3 className="font-archivo text-2xl">RUNNERS-UP / PER PERSON</h3><p className="font-dm text-sm text-offwhite/80 mt-4 leading-relaxed">90% AI Interview Discount Voucher to practice and improve.</p></div></div>

      <p className="font-dm text-sm text-offwhite/70 max-w-[850px] mx-auto mt-10 text-center leading-relaxed">First, second and third place depend on the number of eligible teams and the judges&apos; evaluation. A position may remain unawarded if there are too few eligible submissions or judging criteria are not met. Placements and prizes are not guaranteed.</p>

      <div className="mt-16 max-w-[1100px] mx-auto border-t-2 border-offwhite/20 pt-14 text-center reveal">
        <div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-6 uppercase">PARTICIPANT REWARDS</div>
        <h3 className="font-archivo text-4xl sm:text-5xl md:text-6xl">EVERY BUILDER GETS<span className="text-sunset">.</span></h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-[1100px] mx-auto">
          <div className="border-2 border-offwhite/25 p-7">
            <p className="font-archivo text-2xl text-sunset mb-3">GOLDENHOUR STICKERS</p>
            <p className="font-dm text-sm text-offwhite/65 leading-relaxed">Official GoldenHour stickers for every participant.</p>
          </div>
          <div className="border-2 border-offwhite/25 p-7">
            <p className="font-archivo text-2xl text-sunset mb-3">DIGITAL CERTIFICATE</p>
            <p className="font-dm text-sm text-offwhite/65 leading-relaxed">Every participant receives an official digital certificate of participation.</p>
          </div>
          <div className="border-2 border-sunset p-7">
            <p className="font-archivo text-2xl text-sunset mb-3">80 N8N CLOUD PRO LICENSES</p>
            <p className="font-dm text-sm text-offwhite/65 leading-relaxed">80 one-month licenses are available (stated value $60 each). Allocation and redemption details will be shared with eligible participants.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mt-6 text-left">
          <div className="border-2 border-offwhite/25 p-7">
            <p className="font-archivo text-2xl text-sunset mb-3">FUELER DIGITAL BUNDLE</p>
            <p className="font-dm text-sm text-offwhite/70 leading-relaxed">Proposed participant benefit: <a href="https://fueler.io/premium" target="_blank" rel="noopener noreferrer" className="underline">Fueler</a> Digital Bundle (sponsor-stated value $800). Subject to final sponsor confirmation and distribution arrangements.</p>
          </div>
          <div className="border-2 border-offwhite/25 p-7">
            <p className="font-archivo text-2xl text-sunset mb-3">INTERVIEWBUDDY DISCOUNT</p>
            <p className="font-dm text-sm text-offwhite/70 leading-relaxed">Proposed 10% discount coupon for expert-driven interview sessions for participants. Subject to final sponsor confirmation and voucher distribution.</p>
          </div>
        </div>
      </div>

      <p className="font-space text-[9px]' text-offwhite/40 uppercase mt-8 text-center">Prize sponsor: <a href={eventConfig.codeCraftersUrl} target="_blank" rel="noreferrer" className="underline hover:text-sunset">CodeCrafters</a> · Gift sponsor: {eventConfig.giftSponsor}</p>
    </div>
  </section>;
}
