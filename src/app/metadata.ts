import type { Metadata } from "next";
import { eventConfig } from "@/lib/event";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || eventConfig.siteUrl).replace(/\/$/, "");
export const baseDescription: string = eventConfig.description;
export const defaultOgImage = { url: "/og/home.png", width: 1200, height: 630, alt: "GoldenHour Delhi — free 12-hour student hackathon in Delhi NCR" };

export function pageMetadata(title: string, description = baseDescription, path = "/", image = defaultOgImage): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: eventConfig.siteName, locale: "en_IN", type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}
