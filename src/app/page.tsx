import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import GoldenHacksCursor from "@/components/GoldenHacksCursor";
import Marquee from "@/components/Marquee";

const events = [
  {
    name: "GOLDENHOUR V1",
    type: "12-HOUR STUDENT HACKATHON",
    date: "14 NOVEMBER 2026 / TENTATIVE",
    description: "A student-led build sprint for under-19 builders in Delhi NCR. Build, compete, and create things that push boundaries.",
    href: "/goldenhour",
    action: "ENTER GOLDENHOUR V1",
    internal: true,
  },
];

const principles = ["CONTINUOUS INNOVATION", "HANDS-ON ENGINEERING", "RADICAL INCLUSION", "COMMUNITY FIRST"];
const tapeWords = "GOLDENHACKS / BUILD. IMPROVE. REPEAT. / STUDENT INNOVATORS / FREE FOR STUDENTS / ";
function LinkedinMark() { return <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13ZM3.56 20.45H7.1V9H3.56v11.45Z" /></svg>; }
function InstagramMark() { return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>; }
function SectionTape({ dark = false }: { dark?: boolean }) {
  return <Marquee reverse={dark} speed={dark ? 45 : 35} bg={dark ? "bg-black" : "bg-sunset"} borderColor={dark ? "border-sunset" : "border-black"} />;
}

export default function Home() {
  return (
    <main className="gh-company-page bg-offwhite text-black overflow-hidden"><GoldenHacksCursor />
      <nav className="gh-company-nav" aria-label="GoldenHacks navigation">
        <Link href="#top" className="gh-wordmark" aria-label="GoldenHour home">GOLDEN<span>.</span>HOUR</Link>
        <div className="gh-company-links hidden md:flex items-center justify-center gap-6 font-space text-[10px] font-bold uppercase tracking-widest">
          <Link href="#about">ABOUT</Link><Link href="#events">HACKATHONS</Link><Link href="#founders">FOUNDERS</Link><Link href="#contact">CONTACT</Link>
        </div>
        <Link href="#events" className="gh-explore brutal-btn-orange px-4 py-2 text-[10px]">EXPLORE <ArrowUpRight size={14} /></Link>
      </nav>

      <section id="top" className="gh-company-hero dot-pattern">
        <div className="gh-hero-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
        <div className="gh-hero-copy relative z-10 max-w-[1240px] mx-auto px-5 md:px-10 pt-28 pb-24 md:pt-40 md:pb-36 text-center">
          <p className="font-space text-xs font-bold tracking-[.2em] text-sunset mb-7">GOLDENHACKS / DELHI NCR / INDIA</p>
          <h1 className="font-archivo text-[19vw] sm:text-[15vw] md:text-[12vw] leading-[.76] tracking-[-.08em] max-w-6xl mx-auto">GOLDEN<span className="text-sunset">HOUR</span><span className="text-offwhite">.</span></h1>
          <div className="mt-12 flex flex-col items-center gap-8 max-w-5xl mx-auto">
            <p className="font-archivo text-2xl md:text-5xl leading-[.9] max-w-2xl mx-auto text-center">BUILD BEFORE SUNRISE.</p>
            <Link href="#events" className="brutal-btn-orange px-7 py-4 justify-center">VIEW GOLDENHOUR V1 <ArrowUpRight size={18} /></Link>
          </div>
        </div>
        <div className="gh-ticker" aria-hidden="true"><div>{tapeWords}{tapeWords}</div></div>
      </section>
      <SectionTape />

      <section id="about" className="px-5 md:px-10 py-24 md:py-36 border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-24 items-start">
          <div><p className="gh-kicker">01 / THE COMPANY</p><h2 className="font-archivo text-5xl sm:text-7xl md:text-8xl leading-[.8] mt-6">MORE THAN<br /><span className="text-sunset">EVENTS.</span></h2></div>
          <div className="space-y-7 font-dm text-lg md:text-xl leading-relaxed text-center lg:text-left"><p>GoldenHacks creates platforms for students to learn, build, collaborate, and showcase their ideas.</p><p>Hackathons, technical masterclasses, acceleration opportunities, innovation sprints, ideathons, mentorship, and project showcases all point in one direction: the next generation of Indian builders.</p><div className="brutal-card-black p-7 text-offwhite text-center"><p className="font-space text-xs text-sunset uppercase tracking-widest font-bold mb-3">THE PROMISE</p><p className="font-archivo text-2xl">100% FREE FOR ALL STUDENTS.</p><p className="font-space text-xs text-offwhite/60 mt-3">Beginners and experts. Everyone gets a place to start.</p></div></div>
        </div>
      </section>

      <SectionTape dark />
      <section id="events" className="bg-sunset px-5 md:px-10 py-24 md:py-36 border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto"><div className="text-center mb-14"><p className="gh-kicker">02 / UPCOMING HACKATHONS</p><h2 className="font-archivo text-5xl sm:text-7xl md:text-8xl leading-[.8] mt-6">PICK YOUR<br /><span className="text-offwhite">BUILD.</span></h2></div><div className="grid max-w-2xl mx-auto gap-8">{events.map((event, i) => <article key={event.name} className={`p-7 md:p-10 border-2 border-black shadow-[8px_8px_0_#050505] ${i === 0 ? "bg-offwhite" : "bg-black text-offwhite"}`}><div className="flex justify-between items-start gap-4 mb-12"><span className={`font-space text-[10px] font-bold px-3 py-2 ${i === 0 ? "bg-black text-sunset" : "bg-sunset text-black"}`}>0{i + 1}</span><span className={`font-space text-[10px] font-bold uppercase text-right ${i === 0 ? "text-black/55" : "text-offwhite/55"}`}>{event.date}</span></div><p className={`font-space text-[10px] tracking-widest font-bold mb-4 ${i === 0 ? "text-black/55" : "text-sunset"}`}>{event.type}</p><h3 className="font-archivo text-4xl md:text-6xl leading-[.82] mb-7">{event.name}</h3><p className={`font-dm text-lg leading-relaxed max-w-lg mb-10 ${i === 0 ? "text-black/70" : "text-offwhite/70"}`}>{event.description}</p>{event.internal ? <Link href={event.href} className="brutal-btn-orange">{event.action} <ArrowUpRight size={18} /></Link> : <a href={event.href} target="_blank" rel="noreferrer" className="brutal-btn-outline border-sunset text-sunset bg-black gh-falling-btn">{event.action} <ArrowUpRight size={18} /></a>}</article>)}</div></div>
      </section>

      <SectionTape />
      <section id="founders" className="px-5 md:px-10 py-24 md:py-36 border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto"><div className="text-center mb-14"><p className="gh-kicker">03 / THE PEOPLE</p><h2 className="font-archivo text-5xl sm:text-7xl md:text-8xl leading-[.8] mt-6">BUILT BY<br /><span className="text-sunset">BUILDERS.</span></h2></div><div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"><div className="brutal-card p-8 md:p-10 text-center"><p className="font-space text-[10px] text-black/50 tracking-widest mb-4">CO-FOUNDER / 01</p><h3 className="font-archivo text-4xl md:text-5xl">ABHINAV<br />GOYAL<span className="text-sunset">.</span></h3></div><div className="brutal-card-orange p-8 md:p-10 text-center"><p className="font-space text-[10px] text-black/60 tracking-widest mb-4">CO-FOUNDER / 02</p><h3 className="font-archivo text-4xl md:text-5xl">DIVYA<span className="text-offwhite">.</span></h3></div></div></div>
      </section>


      <SectionTape dark />
      <section id="partners" className="bg-offwhite px-5 md:px-10 py-24 md:py-36 border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto text-center"><p className="gh-kicker">04 / THE PARTNERS</p><h2 className="font-archivo text-5xl sm:text-7xl md:text-8xl leading-[.8] mt-6 mb-14">BUILT<br /><span className="text-sunset">TOGETHER.</span></h2><a href="https://www.delhihacks.me" target="_blank" rel="noreferrer" className="gh-partner-tile brutal-card-orange max-w-2xl mx-auto p-8 md:p-12 block text-center"><p className="font-space text-[10px] text-black/60 tracking-widest mb-8">FOUNDING PARTNER / 01</p><div className="bg-offwhite border-2 border-black p-6 md:p-8 mx-auto max-w-sm"><Image src="/brand/delhi-hacks-logo.svg" alt="DelhiHacks logo" width={500} height={500} className="w-full h-auto object-contain" /></div><h3 className="font-archivo text-4xl md:text-6xl mt-8">DELHIHACKS<span className="text-offwhite">.</span></h3><p className="font-space text-xs text-black/70 mt-4">CLICK TO VISIT DELHIHACKS.ME <ArrowUpRight size={16} className="inline-block ml-1" /></p></a></div>
      </section>
      <SectionTape />
      <section className="bg-black text-offwhite px-5 md:px-10 py-24 md:py-36 border-b-4 border-sunset"><div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center"><div><p className="gh-kicker text-sunset">04 / THE STANDARD</p><h2 className="font-archivo text-5xl md:text-7xl leading-[.82] mt-6">A MOVEMENT<br />IN THE <span className="text-sunset">MAKING.</span></h2></div><div className="grid grid-cols-2 gap-3">{principles.map((principle, i) => <div key={principle} className="border border-offwhite/20 p-5 min-h-32 flex items-end"><p className="font-space text-xs font-bold leading-relaxed">0{i + 1}<br /><span className="text-sunset">{principle}</span></p></div>)}</div></div></section>

      <footer id="contact" className="bg-sunset px-5 md:px-10 py-16"><div className="max-w-[1200px] mx-auto grid md:grid-cols-[1.15fr_.85fr_1fr] gap-10 items-start text-center"><div><p className="font-space text-xs font-bold tracking-widest mb-5">GOLDENHACKS / DELHI NCR / INDIA</p><h2 className="font-archivo text-5xl md:text-7xl leading-[.8]">LET&apos;S BUILD<br /><span className="text-offwhite">TOGETHER.</span></h2><a href="mailto:goldenhourdelhi@gmail.com" className="inline-block font-archivo text-xl underline underline-offset-4 mt-8">goldenhourdelhi@gmail.com</a><div className="flex justify-center gap-4 mt-6"><a href="https://www.linkedin.com/company/goldenhourdelhi/" target="_blank" rel="noreferrer" aria-label="GoldenHour on LinkedIn" className="p-3 border-2 border-black hover:bg-black hover:text-sunset transition-colors"><LinkedinMark /></a><a href="https://www.instagram.com/goldenhour.delhi/" target="_blank" rel="noreferrer" aria-label="GoldenHour on Instagram" className="p-3 border-2 border-black hover:bg-black hover:text-sunset transition-colors"><InstagramMark /></a></div></div><div><p className="font-space text-[10px] font-bold tracking-[.16em] mb-5">MAIN WEBSITE</p><nav aria-label="Main website pages" className="flex flex-col gap-3 font-space text-xs"><a href="#about" className="hover:underline">ABOUT</a><a href="#events" className="hover:underline">HACKATHONS</a><a href="#founders" className="hover:underline">FOUNDERS</a><a href="#partners" className="hover:underline">PARTNERS</a><a href="#contact" className="hover:underline">CONTACT</a></nav></div><div><p className="font-space text-[10px] font-bold tracking-[.16em] mb-5">EVENT &amp; LEGAL</p><nav aria-label="Event and legal pages" className="flex flex-col gap-3 font-space text-xs"><a href="/goldenhour" className="hover:underline">GOLDENHOUR V1</a><a href="/goldenhour#faq" className="hover:underline">FAQ</a><a href="/code-of-conduct" className="hover:underline">CODE OF CONDUCT</a><a href="/privacy" className="hover:underline">PRIVACY</a><a href="/terms" className="hover:underline">TERMS</a></nav></div></div><div className="max-w-[1200px] mx-auto mt-16 pt-5 border-t border-black/30 flex flex-col md:flex-row justify-between gap-3 font-space text-[10px] font-bold text-center"><span>GOLDENHACKS © 2026</span><span>BUILD. IMPROVE. REPEAT.</span></div></footer>
    </main>
  );
}
