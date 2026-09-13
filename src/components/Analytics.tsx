"use client";
import Script from "next/script";
import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => { window.addEventListener("gh-cookie-consent", callback); return () => window.removeEventListener("gh-cookie-consent", callback); };
const getConsent = () => window.localStorage.getItem("gh-cookie-consent") === "accepted";
const getServerConsent = () => false;

export default function Analytics() {
  const consented = useSyncExternalStore(subscribe, getConsent, getServerConsent);
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !consented) return null;
  return <><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${id}', { anonymize_ip: true });`}</Script></>;
}
