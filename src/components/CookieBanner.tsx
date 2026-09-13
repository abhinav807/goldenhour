"use client";
import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => { window.addEventListener("gh-cookie-consent", callback); return () => window.removeEventListener("gh-cookie-consent", callback); };
const getConsent = () => window.localStorage.getItem("gh-cookie-consent") !== null;
const getServerConsent = () => false;

export default function CookieBanner() {
  const hasConsent = useSyncExternalStore(subscribe, getConsent, getServerConsent);
  const choose = (value: "accepted" | "declined") => { window.localStorage.setItem("gh-cookie-consent", value); window.dispatchEvent(new Event("gh-cookie-consent")); };
  if (hasConsent) return null;
  return <aside className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-[420px] z-[70] bg-black text-offwhite border-2 border-sunset p-5 shadow-[7px_7px_0_#ff5a00]" role="dialog" aria-label="Cookie preferences"><p className="font-space text-[10px] text-sunset tracking-[.14em] mb-3">COOKIE CHECK</p><p className="font-dm text-sm text-offwhite/75 leading-relaxed">We use essential storage for your preferences and optional privacy-conscious analytics to improve the event site.</p><div className="flex gap-3 mt-4"><button onClick={() => choose("accepted")} className="brutal-btn-orange px-4 py-3 text-[10px]">ALLOW OPTIONAL</button><button onClick={() => choose("declined")} className="brutal-btn-outline border-offwhite/40 text-offwhite px-4 py-3 text-[10px] hover:border-black">ESSENTIAL ONLY</button></div></aside>;
}
