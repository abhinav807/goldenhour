import { eventConfig } from "@/lib/event";

const prizes = [
  { medal: "🥇", place: "FIRST PLACE", title: "WINNER", trophy: "ONE GOLDENHOUR TROPHY / PER TEAM", reward: "2-YEAR VIP MEMBERSHIP / PER PARTICIPANT", tone: "bg-sunset text-black shadow-[7px_7px_0_#f7f7f2]" },
  { medal: "🥈", place: "SECOND PLACE", title: "RUNNER-UP", trophy: "ONE GOLDENHOUR TROPHY / PER TEAM", reward: "1-YEAR VIP MEMBERSHIP / PER PARTICIPANT", tone: "bg-offwhite text-black shadow-[7px_7px_0_#ff5a00]" },
  { medal: "🥉", place: "THIRD PLACE", title: "2ND RUNNER-UP", trophy: "ONE GOLDENHOUR TROPHY / PER TEAM", reward: "6-MONTH VIP MEMBERSHIP / PER PARTICIPANT", tone: "bg-yellow text-black shadow-[7px_7px_0_#f7f7f2]" },
];

export default function Prizes() {
  return <section id="prizes" className="bg-black text-offwhite py-28 md:py-40 px-5 md:px-10 relative overflow-hidden">
    <div className="max-w-[1200px] mx-auto relative z-10">
      <header className="text-center max-w-3xl mx-auto mb-16 reveal">
        <div className="inline-block font-space text-[10px] font-bold bg-yellow text-black px-3 py-1 mb-6 uppercase">06 / RECOGNITION</div>
        <h2 className="font-archivo text-5xl sm:text-6xl md:text-8xl">PRIZES<span className="text-sunset">.</span></h2>
        <p className="font-space text-xs md:text-sm text-offwhite/55 max-w-lg mx-auto mt-6 leading-relaxed">One GoldenHour trophy per winning team. CodeCrafters VIP memberships are awarded per person. Every participant also receives one month of n8n Pro, valued at <strong className="font-bold text-offwhite">60 USD</strong> per month.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-[1100px] mx-auto">
        {prizes.map(({ medal, place, title, trophy, reward, tone }, index) => <article key={place} className={`p-8 md:p-10 min-h-[360px] border-2 border-black flex flex-col justify-between text-center reveal ${index === 0 ? "md:col-span-2 md:max-w-[520px] md:mx-auto w-full" : ""} ${tone}`}>
          <div>
            <div className="text-5xl mb-6" aria-hidden="true">{medal}</div>
            <p className="font-space text-[10px] font-bold tracking-[.16em] mb-4">{place}</p>
            <h3 className="font-archivo text-3xl md:text-4xl leading-[.9]">{title}</h3>
          </div>
          <div className="mt-8 border-t-2 border-black/25 pt-6">
            <p className="font-space text-xs font-bold uppercase tracking-[.12em]">{trophy}</p>
            <p className="font-archivo text-lg md:text-xl uppercase mt-3">{reward}</p>
            <p className="font-space text-[10px] uppercase tracking-[.12em] mt-2 opacity-65">CODECRAFTERS VIP MEMBERSHIP</p>
          </div>
        </article>)}
      </div>

      <div className="mt-24 max-w-[1100px] mx-auto border-t-2 border-offwhite/20 pt-14 text-center reveal">
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
            <p className="font-archivo text-2xl text-sunset mb-3">1 MONTH OF N8N PRO</p>
            <p className="font-dm text-sm text-offwhite/65 leading-relaxed">Every participant receives one month of n8n Pro, valued at <strong className="font-bold text-offwhite">60 USD</strong> per month.</p>
          </div>
        </div>
      </div>

      <p className="font-space text-[9px] text-offwhite/40 uppercase mt-8 text-center">Prize sponsor: <a href={eventConfig.codeCraftersUrl} target="_blank" rel="noreferrer" className="underline hover:text-sunset">CodeCrafters</a> · Gift sponsor: {eventConfig.giftSponsor}</p>
    </div>
  </section>;
}
