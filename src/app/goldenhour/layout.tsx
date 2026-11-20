import type { Metadata } from "next";
import { pageMetadata } from "../metadata";
import { eventConfig } from "@/lib/event";

export const metadata: Metadata = {
  ...pageMetadata(
    "GoldenHour V1 — Postponed to 2027",
    `${eventConfig.postponementNotice} Join our WhatsApp community for updates.`,
    "/goldenhour",
    { url: "/social/goldenhour", width: 1200, height: 630, alt: "GoldenHour V1 — Postponed to 2027" },
  ),
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function GoldenHourLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
