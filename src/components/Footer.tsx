"use client";
import Image from "next/image";

const explore = [["ABOUT", "#about"], ["EVENTS", "#events"], ["RULES", "#rules"], ["FAQ", "#faq"]];

export default function Footer() {
  return <footer className="bg-black text-offwhite px-5 md:px-12 py-20 md:py-28 border-t-2 border-sunset">
    <div className="max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-14 lg:gap-16 pb-16 md:pb-20 border-b border-offwhite/15">
        <div className="max-w-[390px]">
          <div className="inline-block bg-offwhite p-3 mb-7"><Image src="/brand/goldenhour-wordmark.jpg" alt="GoldenHour primary wordmark" width={285} height={76} className="block w-[min(285px,72vw)] h-auto object-cover" /></div>
          <p className="font-dm text-base md:text-lg text-offwhite/65 max-w-sm leading-relaxed mb-7">A student-built experience for people who make things before they feel ready.</p>
          <div className="flex items-center gap-3"><span className="w-8 h-1 bg-sunset" /><p className="font-space text-[10px] text-sunset font-bold uppercase tracking-[.15em]">DELHI / INDIA / 2026</p></div>
          <address className="not-italic font-space text-[10px] text-offwhite/45 mt-6 leading-relaxed">GOLDENHOUR STUDENT COLLECTIVE<br />DELHI, INDIA<br /><a href="mailto:hello@goldenhour.dev" className="text-offwhite/75 hover:text-sunset transition-colors">hello@goldenhour.dev</a></address>
        </div>
        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-6">EXPLORE</p><ul className="font-space text-xs space-y-4 text-offwhite/55">{explore.map(([label, href]) => <li key={href}><a href={href} className="hover:text-offwhite transition-colors">{label}</a></li>)}</ul></div>
        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-6">CONNECT</p><ul className="font-space text-xs space-y-4 text-offwhite/55"><li><a href="mailto:hello@goldenhour.dev" className="hover:text-sunset transition-colors">EMAIL THE TEAM</a></li><li><a href="/empty-state" className="hover:text-sunset transition-colors">COMMUNITY</a></li><li><a href="/privacy" className="hover:text-sunset transition-colors">PRIVACY</a></li><li><a href="/terms" className="hover:text-sunset transition-colors">TERMS</a></li></ul></div>
        <div className="sm:col-span-2 lg:col-span-1"><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-6">THE EVENT</p><p className="font-archivo text-2xl md:text-3xl leading-[.9] mb-5">BUILD<br />BEFORE<br /><span className="text-sunset">SUNRISE.</span></p><a href="#register" className="font-space text-xs text-offwhite hover:text-sunset transition-colors">REGISTER INTEREST →</a></div>
      </div>
      <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"><p className="font-space text-[10px] text-offwhite/35 tracking-[.08em]">MADE BY STUDENTS. FOR STUDENTS.</p><a href="#hero" className="font-space text-[10px] text-offwhite/35 hover:text-offwhite transition-colors">BACK TO TOP ↑</a></div>
    </div>
  </footer>;
}
