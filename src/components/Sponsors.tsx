"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { eventConfig } from "@/lib/event";

type Sponsor = {
  name: string;
  role: string;
  href?: string;
  logo: string;
  alt: string;
  width: number;
  height: number;
  visit?: string;
  note?: string;
  dark?: boolean;
};

const sponsors: Sponsor[] = [
  { name: "CODECRAFTERS", role: "PRIZE SPONSOR", href: eventConfig.codeCraftersUrl, logo: "/brand/codecrafters-logo.svg", alt: "CodeCrafters logo", width: 220, height: 155, visit: "VISIT CODECRAFTERS" },
  { name: "OSEN", role: "ACADEMIC SPONSOR", href: eventConfig.osenUrl, logo: "/brand/osen-logo.png", alt: "OSEN logo", width: 356, height: 134, visit: "OSEN / ACADEMIC SPONSOR", dark: true },
  { name: "MUMBAI TECH COMMUNITY", role: "COMMUNITY PARTNER", logo: "/brand/mumbai-tech-community.png", alt: "Mumbai Tech Community logo", width: 1254, height: 1254, note: "COMMUNITY PARTNER", dark: true },
  { name: eventConfig.refreshmentPartner, role: "REFRESHMENT PARTNER", logo: "/brand/sewan-foods.png", alt: "SEWAN FOODS logo — Food for Impact", width: 1137, height: 660, note: "FOOD FOR IMPACT" },
  { name: eventConfig.giftSponsor, role: "GIFT SPONSOR", logo: "/brand/n8n-logo.png", alt: "n8n logo", width: 296, height: 80, note: "N8N PRO / PARTICIPANT GIFT", dark: true },
];

const cardClass = "group brutal-card p-7 md:p-8 text-center flex flex-col items-center justify-center min-h-[360px] reveal";

function SponsorContent({ sponsor }: { sponsor: Sponsor }) {
  return <>
    <p className={`font-space text-[10px] uppercase tracking-[.16em] mb-8 ${sponsor.dark ? "text-offwhite" : "text-black/55"}`}>{sponsor.role}</p>
    <div className={`${sponsor.dark ? "bg-black border-offwhite" : "bg-offwhite border-black"} border-2 p-5 w-full max-w-[310px] h-[190px] flex items-center justify-center`}>
      <Image src={sponsor.logo} alt={sponsor.alt} width={sponsor.width} height={sponsor.height} unoptimized className="max-w-[220px] max-h-[150px] w-auto h-auto object-contain" />
    </div>
    <h3 className="font-archivo text-2xl md:text-3xl mt-7">{sponsor.name}</h3>
    {sponsor.href ? <p className={`font-space text-[10px] uppercase tracking-[.14em] mt-4 inline-flex items-center gap-2 group-hover:text-sunset ${sponsor.dark ? "text-offwhite" : ""}`}>{sponsor.visit} <ExternalLink size={14} aria-hidden="true" /></p> : sponsor.note ? <p className={`font-space text-[10px] uppercase tracking-[.14em] mt-4 ${sponsor.dark ? "text-offwhite" : "text-black/60"}`}>{sponsor.note}</p> : null}
  </>;
}

export default function Sponsors() {
  return <section id="sponsors" className="bg-black py-28 md:py-40 px-5 md:px-10 relative overflow-hidden">
    <div className="max-w-[1200px] mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16 border-b-2 border-offwhite/15 pb-10 reveal">
        <div className="inline-block font-space text-[10px] font-bold bg-yellow text-black px-3 py-1 mb-5 uppercase">SPONSORS / PARTNERS</div>
        <h2 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-offwhite">BACK THE<br /><span className="text-sunset">BUILD.</span></h2>
        <p className="font-space text-xs text-offwhite/45 max-w-md leading-relaxed mx-auto mt-7">CodeCrafters powers the prizes. OSEN is the academic sponsor. Mumbai Tech Community is the community partner. SEWAN FOODS is the refreshment partner. n8n is the gift sponsor, providing a Pro month to every participant.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
        {sponsors.map((sponsor, index) => {
          const toneClass = sponsor.dark ? "bg-black text-offwhite border-offwhite/70" : "";
          const centeredLastCard = index === sponsors.length - 1 ? "sm:col-span-2 sm:max-w-[538px] sm:mx-auto w-full" : "";
          const className = `${cardClass} ${toneClass} ${centeredLastCard}`;
          return sponsor.href
            ? <a key={sponsor.name} href={sponsor.href} target="_blank" rel="noreferrer" className={className}><SponsorContent sponsor={sponsor} /></a>
            : <article key={sponsor.name} className={className}><SponsorContent sponsor={sponsor} /></article>;
        })}
      </div>
      <div className="max-w-[760px] mx-auto mt-10 brutal-card-orange p-8 md:p-12 text-center reveal">
        <p className="font-space text-[10px] uppercase tracking-[.16em] mb-5">SPONSOR OPPORTUNITIES / 2026</p>
        <h3 className="font-archivo text-4xl md:text-6xl leading-[.82]">SPONSOR<br />SLOTS<br /><span className="text-offwhite">OPEN.</span></h3>
        <p className="font-dm text-base md:text-lg mt-8 max-w-md mx-auto leading-relaxed">Want to support student builders or sponsor a future GOLDENHOUR edition? Email the organizing team to start a conversation.</p>
        <a href="mailto:hello@goldenhourdelhi.co.in?subject=GOLDENHOUR%20sponsorship" className="font-space text-xs font-bold uppercase flex items-center justify-center gap-2 mt-8 hover:text-offwhite">CONTACT US TO SPONSOR <ArrowUpRight size={15} aria-hidden="true" /></a>
        <a href={eventConfig.volunteerUrl} target="_blank" rel="noreferrer" className="font-space text-xs font-bold uppercase flex items-center justify-center gap-2 mt-5 text-black/65 hover:text-offwhite">VOLUNTEER WITH US <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <p className="font-space text-[10px] text-offwhite/30 uppercase tracking-[.16em] mt-10 text-center reveal">GOLDENHOUR / CODECRAFTERS / OSEN / MUMBAI TECH COMMUNITY / SEWAN FOODS / N8N</p>
    </div>
  </section>;
}
