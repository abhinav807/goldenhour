import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.goldenhourdelhi.co.in").replace(/\/$/, "");
export const baseDescription = "GOLDENHOUR is a student-led 10-hour technology event in Delhi. The date and venue will be announced soon.";

export function pageMetadata(title: string, description = baseDescription, path = "/"): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "GOLDENHOUR", type: "website", images: [{ url: "/og-image.png", width: 286, height: 131, alt: "GOLDENHOUR wordmark logo" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}
