import type { Metadata } from "next";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = {
  ...pageMetadata(
    "GoldenHour V1 — Postponed for 2027",
    "GoldenHour V1 is postponed for 2027. The event page is currently unavailable. Join our WhatsApp community for updates.",
    "/goldenhour",
    { url: "/social/goldenhour", width: 1200, height: 630, alt: "GoldenHour V1 — Postponed for 2027" },
  ),
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function GoldenHourLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
