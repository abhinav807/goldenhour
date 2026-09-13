"use client";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  const links = [{ label: "ABOUT", href: "#about" }, { label: "EVENTS", href: "#events" }, { label: "RULES", href: "#rules" }, { label: "FAQ", href: "#faq" }];
  const close = () => setMenuOpen(false);
  return <>
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled ? "bg-black/95 backdrop-blur-sm border-b-2 border-sunset" : "bg-black/30"}`} aria-label="Primary navigation">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20"><a href="#hero" className="flex items-center gap-3 group" onClick={close} aria-label="GoldenHour home"><Image src="/brand/goldenhour-symbol.jpg" alt="" width={42} height={32} className="h-7 w-9 object-cover object-center mix-blend-screen" priority /><span className="font-archivo text-xl md:text-2xl text-offwhite tracking-tighter group-hover:text-sunset transition-colors">GOLDEN<span className="text-sunset">.</span>HOUR</span></a>
        <div className="hidden md:flex items-center gap-7">{links.map(l => <a key={l.href} href={l.href} className="font-space text-[11px] text-offwhite/70 hover:text-sunset transition-colors">{l.label}</a>)}<a href="#register" className="brutal-btn-orange px-5 py-2.5 text-[11px]">REGISTER <ArrowUpRight size={14} /></a></div>
        <button className="md:hidden text-offwhite p-2" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}><Menu size={24} /></button>
      </div>
    </nav>
    {menuOpen && <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-8 p-8 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation"><button className="absolute top-5 right-5 text-offwhite hover:text-sunset" onClick={close} aria-label="Close menu"><X size={28} /></button><Image src="/brand/goldenhour-wordmark.jpg" alt="GoldenHour" width={285} height={76} className="absolute top-7 left-7 w-48 h-auto object-cover" />{links.map(l => <a key={l.href} href={l.href} className="font-archivo text-3xl text-offwhite hover:text-sunset" onClick={close}>{l.label}</a>)}<a href="#register" className="brutal-btn-orange px-10 py-4 text-sm" onClick={close}>REGISTER <ArrowUpRight size={16} /></a></div>}
  </>;
}
