"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { eventConfig } from "@/lib/event";

const links = [
  { label: "ABOUT", hash: "#about" },
  { label: "TRACKS", hash: "#events" },
  { label: "TIMELINE", hash: "#timeline" },
  { label: "RULES", hash: "#rules" },
  { label: "PRIZES", hash: "#prizes" },
  { label: "FAQ", hash: "#faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isEventPage = pathname === "/goldenhour";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const destination = (hash: string) => isEventPage ? hash : `/goldenhour${hash}`;
  const homeHref = isEventPage ? "#hero" : "/goldenhour#hero";
  const navClass = `fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled || !isEventPage ? "bg-black/95 backdrop-blur-sm border-b-2 border-sunset" : "bg-black/30"}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isEventPage) return () => window.removeEventListener("scroll", onScroll);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`)), { rootMargin: "-35% 0px -55% 0px" });
    links.forEach((link) => { const element = document.querySelector(link.hash); if (element) observer.observe(element); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [isEventPage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = document.getElementById("mobile-navigation");
    const closeButton = document.getElementById("mobile-navigation-close");
    closeButton?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setMenuOpen(false); }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable[focusable.length - 1].focus(); }
      else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) { event.preventDefault(); focusable[0].focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return <>
    <nav className={navClass} aria-label="GoldenHour V1 navigation">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex items-center justify-between gap-5 h-16 md:h-20">
        <Link href={homeHref} className="flex items-center gap-3 group shrink-0" onClick={close} aria-label="GoldenHour V1 home">
          <Image src="/brand/goldenhour-symbol.png" alt="" width={48} height={48} className="h-9 w-9 object-contain" priority />
          <span className="font-archivo text-xl md:text-2xl text-offwhite tracking-tighter group-hover:text-sunset transition-colors">GOLDEN<span className="text-sunset">.</span>HOUR</span>
        </Link>
        <div className="hidden lg:flex min-w-0 flex-1 items-center justify-center gap-5 xl:gap-6 ml-3">
          {links.map((link) => <a key={link.hash} href={destination(link.hash)} className={`font-space text-[9px] tracking-[.06em] whitespace-nowrap transition-colors ${active === link.hash ? "text-sunset" : "text-offwhite/70 hover:text-sunset"}`}>{link.label}</a>)}
          <a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="font-space text-[9px] font-bold tracking-[.06em] whitespace-nowrap text-black bg-sunset px-3 py-2 hover:bg-offwhite transition-colors" aria-label="Open the participant registration form in a new tab">REGISTER <ArrowUpRight size={12} className="inline" aria-hidden="true" /></a>
        </div>
        <button id="mobile-navigation-trigger" type="button" className="lg:hidden text-offwhite p-2" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-navigation"><Menu size={24} aria-hidden="true" /></button>
      </div>
    </nav>
    {menuOpen && <div id="mobile-navigation" className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-start overflow-y-auto gap-6 p-6 pt-6 pb-12 md:hidden" role="dialog" aria-modal="true" aria-label="GoldenHour V1 navigation">
      <div className="w-full max-w-sm flex items-center justify-between">
        <Link href={homeHref} className="flex items-center gap-2" aria-label="GoldenHour V1 home" onClick={close}><Image src="/brand/goldenhour-symbol.png" alt="" width={40} height={40} className="w-10 h-10 object-contain" /><span className="font-archivo text-lg text-offwhite">GOLDEN<span className="text-sunset">.</span>HOUR</span></Link>
        <button id="mobile-navigation-close" type="button" className="text-offwhite hover:text-sunset p-2" onClick={close} aria-label="Close navigation menu"><X size={28} aria-hidden="true" /></button>
      </div>
      <div className="flex flex-col items-center gap-3 w-full max-w-sm border-y border-offwhite/20 py-6">
        <p className="font-space text-xs tracking-[.08em] text-sunset text-center">REGISTRATION IS OPEN</p>
        <a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange w-full px-8 py-4 text-sm justify-center" onClick={close}>REGISTER NOW <ArrowUpRight size={16} aria-hidden="true" /></a>
        <a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer" className="brutal-btn-outline border-sunset text-sunset bg-black w-full px-8 py-4 text-sm justify-center" onClick={close}>JOIN COMMUNITY <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <div className="flex flex-col items-center gap-5 w-full py-2">
        {links.map((link) => <a key={link.hash} href={destination(link.hash)} className={`font-archivo text-2xl ${active === link.hash ? "text-sunset" : "text-offwhite hover:text-sunset"}`} onClick={close}>{link.label}</a>)}
      </div>
      <p className="font-space text-center text-[10px] text-offwhite/55 uppercase tracking-wider">Ages 13–19 on event day · 14 Nov 2026 (tentative)</p>
    </div>}
  </>;
}
