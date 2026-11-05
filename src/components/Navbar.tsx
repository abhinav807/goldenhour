"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { eventConfig, primaryRegistration } from "@/lib/event";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navigation.module.css";

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
  const [active, setActive] = useState("");
  const destination = (hash: string) => isEventPage ? hash : `/goldenhour${hash}`;
  const homeHref = eventConfig.siteUrl;
  const navClass = `gh-site-nav fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled || !isEventPage ? "bg-black/95 backdrop-blur-sm border-b-2 border-sunset" : "bg-black/30"}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isEventPage) return () => window.removeEventListener("scroll", onScroll);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`)), { rootMargin: "-35% 0px -55% 0px" });
    links.forEach((link) => { const element = document.querySelector(link.hash); if (element) observer.observe(element); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [isEventPage]);

  return <>
    <nav className={navClass} aria-label="GoldenHour V1 navigation">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between gap-3 h-16 md:h-20">
        <Link href={homeHref} className="flex items-center gap-3 group shrink-0" aria-label="GoldenHour Delhi home">
          <Image src="/brand/goldenhour-symbol.png" alt="" width={48} height={48} className="hidden min-[400px]:block h-9 w-9 object-contain" priority />
          <span className="font-archivo text-xl md:text-2xl text-offwhite tracking-tighter group-hover:text-sunset transition-colors">GOLDEN<span className="text-sunset">.</span>HOUR</span>
        </Link>
        <div className="hidden lg:flex min-w-0 flex-1 items-center justify-center gap-3 xl:gap-5">
          {links.map((link) => <a key={link.hash} href={destination(link.hash)} aria-current={active === link.hash ? "location" : undefined} className={`${styles.eventLink} font-space tracking-[.02em] whitespace-nowrap transition-colors ${active === link.hash ? "text-sunset" : "text-offwhite/70 hover:text-sunset"}`}>{link.label}</a>)}
          <a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className={`${styles.register} font-space tracking-[.02em] whitespace-nowrap text-black bg-sunset hover:bg-offwhite transition-colors`} aria-label="Open the participant registration form in a new tab">{primaryRegistration.label} <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className={`${styles.eventActions} text-offwhite`}><ThemeToggle /><MobileMenu links={[...links.map(link => ({ label: link.label, href: destination(link.hash) })), { label: "EVENT TEAM", href: destination("#organizers") }, { label: "JOIN COMMUNITY", href: eventConfig.whatsappCommunityUrl }]} /></div>
      </div>
    </nav>

  </>;
}
