"use client";

import Image from "next/image";
import { eventConfig } from "@/lib/event";

const explore = [["ABOUT", "#about"], ["TRACKS", "#events"], ["TIMELINE", "#timeline"], ["RULES", "#rules"], ["PRIZES", "#prizes"], ["FAQ", "#faq"]];

export default function Footer() {
  return <footer className="bg-black text-offwhite px-5 md:px-10 py-24 md:py-32 border-t-4 border-sunset">
    <div className="max-w-[1200px] mx-auto">
      <div className="text-center pb-14 md:pb-16 border-b border-offwhite/15">
        <Image src="/brand/goldenhour-symbol-transparent.png" alt="" width={500} height={500} className="block w-24 h-24 md:w-32 md:h-32 object-contain mx-auto" />
        <p className="font-dm text-lg md:text-xl text-offwhite/65 max-w-xl mx-auto mt-6 leading-relaxed">A student-built experience for people who make things before they feel ready.</p>
        <p className="font-space text-[10px] text-sunset font-bold uppercase tracking-[.15em] mt-6">DELHI NCR / {eventConfig.date.toUpperCase()} (TENTATIVE) / VENUE TBA</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 py-14 md:py-16 text-center">
        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">THE ORGANIZING TEAM</p><address className="not-italic font-space text-xs text-offwhite/65 leading-loose">GOLDENHOUR DELHI<br />DELHI NCR<br /><a href={`mailto:${eventConfig.contactEmail}`} className="text-offwhite underline underline-offset-4 hover:text-sunset">{eventConfig.contactEmail}</a></address></div>
        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">EXPLORE THE EVENT</p><ul className="font-space text-xs space-y-3 text-offwhite/65">{explore.map(([label, href]) => <li key={href}><a href={href} className="hover:text-offwhite transition-colors">{label}</a></li>)}</ul></div>
        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">GET INVOLVED</p><ul className="font-space text-xs space-y-3 text-offwhite/65"><li><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="text-sunset hover:text-offwhite">PARTICIPANT REGISTRATION — OPEN</a></li><li><a href={eventConfig.volunteerUrl} target="_blank" rel="noreferrer" className="hover:text-sunset">VOLUNTEER FORM</a></li><li><a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer" className="hover:text-sunset">WHATSAPP COMMUNITY</a></li><li><a href={eventConfig.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-sunset">INSTAGRAM</a></li><li><a href={eventConfig.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-sunset">LINKEDIN</a></li></ul></div>
        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">POLICIES</p><ul className="font-space text-xs space-y-3 text-offwhite/65"><li><a href="/code-of-conduct" className="hover:text-offwhite">CODE OF CONDUCT</a></li><li><a href="/privacy" className="hover:text-offwhite">PRIVACY</a></li><li><a href="/terms" className="hover:text-offwhite">TERMS</a></li><li><a href="/guardian-consent" className="hover:text-offwhite">GUARDIAN CONSENT SLIP</a></li></ul></div>
      </div>
      <div className="pt-7 border-t border-offwhite/15 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 text-center"><p className="font-space text-[10px] text-offwhite/45 tracking-[.08em]">MADE BY TEENS. FOR TEENS.</p><a href="#hero" className="font-space text-[10px] text-offwhite/45 hover:text-offwhite transition-colors">BACK TO TOP ↑</a></div>
    </div>
  </footer>;
}
