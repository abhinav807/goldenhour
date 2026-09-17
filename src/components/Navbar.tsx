"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { eventConfig } from "@/lib/event";

const links = [{ label: "HOME", hash: "#hero" }, { label: "ABOUT", hash: "#about" }, { label: "TRACKS", hash: "#events" }, { label: "CLOCK", hash: "#countdown" }, { label: "TIMELINE", hash: "#timeline" }, { label: "NOTE", hash: "#dispatch" }, { label: "RULES", hash: "#rules" }, { label: "TEAM", hash: "#organizers" }, { label: "PRIZES", hash: "#prizes" }, { label: "SPONSORS", hash: "#sponsors" }, { label: "REGISTER", hash: "#register" }, { label: "FAQ", hash: "#faq" }];

export default function Navbar() {
  const pathname = usePathname();
  const isEventPage = pathname === "/goldenhour";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const destination = (hash: string) => isEventPage ? hash : `/goldenhour${hash}`;
  const homeHref = isEventPage ? "#hero" : "/goldenhour#hero";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isEventPage) return () => window.removeEventListener("scroll", onScroll);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`)), { rootMargin: "-35% 0px -55% 0px" });
    links.forEach((link) => { const element = document.querySelector(link.hash); if (element) observer.observe(element); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [isEventPage]);

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  const close = () => setMenuOpen(false);
  const navClass = `fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled || !isEventPage ? "bg-black/95 backdrop-blur-sm border-b-2 border-sunset" : "bg-black/30"}`;

  return <>
    <nav className={navClass} aria-label="GoldenHour navigation"><div className="max-w-[1440px] mx-auto px-5 md:px-8 flex items-center justify-between gap-5 h-16 md:h-20"><a href={homeHref} className="flex items-center gap-3 group shrink-0" onClick={close} aria-label="GoldenHour home"><Image src="/brand/goldenhour-symbol.png" alt="GoldenHour symbol" width={48} height={48} className="h-9 w-9 object-contain" priority /><span className="font-archivo text-xl md:text-2xl text-offwhite tracking-tighter group-hover:text-sunset transition-colors">GOLDEN<span className="text-sunset">.</span>HOUR</span></a><div className="hidden md:flex min-w-0 flex-1 items-center justify-end gap-5 lg:gap-6 ml-3 overflow-x-auto">{links.map((link) => <a key={link.hash} href={destination(link.hash)} className={`font-space text-[9px] tracking-[.06em] whitespace-nowrap transition-colors ${active === link.hash ? "text-sunset" : "text-offwhite/70 hover:text-sunset"}`}>{link.label}</a>)}<a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange shrink-0 px-4 py-2.5 text-[10px] ml-1">REGISTER <ArrowUpRight size={14} /></a></div><button className="md:hidden text-offwhite p-2" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}><Menu size={24} /></button></div></nav>
    {menuOpen && <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-start overflow-y-auto gap-7 p-8 pt-24 pb-12 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation"><button className="absolute top-5 right-5 text-offwhite hover:text-sunset" onClick={close} aria-label="Close menu"><X size={28} /></button><Image src="/brand/goldenhour-symbol.png" alt="GoldenHour" width={500} height={500} className="absolute top-7 left-7 w-16 h-16 object-contain" /><div className="flex flex-col items-center gap-3 w-full"><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange w-full max-w-xs px-8 py-4 text-sm justify-center" onClick={close}>REGISTER NOW <ArrowUpRight size={16} /></a><a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer" className="brutal-btn-outline border-sunset text-sunset bg-black w-full max-w-xs px-8 py-4 text-sm justify-center" onClick={close}>JOIN COMMUNITY <ArrowUpRight size={16} /></a></div>{links.map((link) => <a key={link.hash} href={destination(link.hash)} className={`font-archivo text-2xl ${active === link.hash ? "text-sunset" : "text-offwhite hover:text-sunset"}`} onClick={close}>{link.label}</a>)}</div>}
  </>;
}
