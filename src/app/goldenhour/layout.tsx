import type { Metadata } from "next";
import { eventConfig } from "@/lib/event";
import { pageMetadata } from "../metadata";
export const metadata: Metadata = pageMetadata(
  "GoldenHour V1 — Free 12-Hour Student Hackathon in Delhi NCR",
  `${eventConfig.description} Scheduled for ${eventConfig.date}; venue TBA; registration opens ${eventConfig.registrationOpening}.`,
  "/goldenhour",
  { url: "/og/goldenhour.png", width: 1200, height: 630, alt: "GoldenHour V1 — free 12-hour student hackathon in Delhi NCR" },
);
export default function GoldenHourLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
