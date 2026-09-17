import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.goldenhourdelhi.co.in").replace(/\/$/, "");
export const baseDescription = "GoldenHour creates platforms for students to learn, build, collaborate, and showcase ideas through hackathons, masterclasses, mentorship, and innovation programs.";

export function pageMetadata(title: string, description = baseDescription, path = "/"): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "GoldenHour", type: "website", images: [{ url: "/og-image.png", width: 286, height: 131, alt: "GoldenHour wordmark logo" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}
