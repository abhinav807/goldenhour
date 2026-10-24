"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";
import s from "./Navbar.module.css";

const homeLinks = [
  ["About", "#about"],
  ["The event", "#events"],
  ["The people", "#founders"],
  ["Contact", "#contact"],
];
const eventLinks = [
  ["About", "#about"],
  ["Tracks", "#events"],
  ["Schedule", "#timeline"],
  ["Prizes", "#prizes"],
  ["FAQ", "#faq"],
];

export default function Navbar() {
  const pathname = usePathname();
  const home = pathname === "/";
  const event = pathname === "/goldenhour";
  const links = home ? homeLinks : eventLinks;
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const href = (hash: string) => (home || event ? hash : `/goldenhour${hash}`);
  const close = () => dialog.current?.close();
  useEffect(() => {
    const list = home ? homeLinks : eventLinks;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(
              ["top", "hero"].includes(entry.target.id)
                ? ""
                : `#${entry.target.id}`,
            );
          }
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    list.forEach(([, hash]) => {
      const section = document.querySelector(hash);
      if (section) observer.observe(section);
    });
    const cover = document.querySelector(home ? "#top" : "#hero");
    if (cover) observer.observe(cover);
    return () => observer.disconnect();
  }, [home, event]);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (media.matches) dialog.current?.close();
    };
    media.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      media.removeEventListener("change", onResize);
    };
  }, [menuOpen]);
  const brand = (
    <>
      <span className={s.symbol} aria-hidden="true" />
      GOLDEN<span>HOUR.</span>
    </>
  );
  return (
    <>
      <nav className={s.nav} aria-label="Main navigation">
        <div className={s.inner}>
          <Link href="/" className={s.brand} aria-label="GoldenHour Delhi home">
            {brand}
          </Link>
          <div className={s.links}>
            {links.map(([label, hash]) => (
              <a
                href={href(hash)}
                key={hash}
                aria-current={
                  (home || event) && active === hash ? "location" : undefined
                }
              >
                {label}
              </a>
            ))}
            <a
              href={home ? "/goldenhour" : eventConfig.registrationUrl}
              target={home ? undefined : "_blank"}
              rel={home ? undefined : "noreferrer"}
              className={s.register}
            >
              {home ? "GOLDENHOUR V1" : "REGISTER FREE"} ↗
            </a>
          </div>
          <button
            ref={trigger}
            className={s.trigger}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              dialog.current?.showModal();
              setMenuOpen(true);
            }}
          >
            <Menu size={22} />
          </button>
          <noscript>
            <style>{`.${s.trigger} { display: none; }`}</style>
            <a
              className={s.staticLink}
              href={home ? "/goldenhour" : href("#register")}
            >
              {home ? "Event ↗" : "Register ↗"}
            </a>
          </noscript>
        </div>
      </nav>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className={s.dialog}
        aria-label="GoldenHour navigation"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href], button:not([disabled])",
            ),
          );
          const first = controls[0],
            last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClose={() => {
          setMenuOpen(false);
          trigger.current?.focus();
        }}
      >
        <div className={s.dialogHeader}>
          <Link
            href="/"
            onClick={close}
            className={s.brand}
            aria-label="GoldenHour Delhi home"
          >
            {brand}
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            autoFocus
          >
            <X size={24} />
          </button>
        </div>
        <nav className={s.dialogLinks} aria-label="Mobile navigation">
          {links.map(([label, hash]) => (
            <a key={hash} href={href(hash)} onClick={close}>
              {label}
            </a>
          ))}
        </nav>
        <div className={s.dialogFooter}>
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noreferrer"
            onClick={close}
          >
            REGISTER FOR FREE <ArrowUpRight size={15} className="inline" />
          </a>
          <a
            href={eventConfig.whatsappCommunityUrl}
            target="_blank"
            rel="noreferrer"
            onClick={close}
          >
            Join the WhatsApp community ↗
          </a>
          <Link href={home ? "/goldenhour" : "/"} onClick={close}>
            {home ? "Explore GoldenHour V1" : "Back to GoldenHour Delhi"}
          </Link>
          <p>
            {eventConfig.date} · {eventConfig.ageLimit}
          </p>
        </div>
      </dialog>
    </>
  );
}
