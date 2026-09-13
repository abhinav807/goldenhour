import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://goldenhour.dev";
export const baseDescription = "GOLDENHOUR is a student-led technology experience in Delhi for people who build, experiment, compete, and ship before sunrise.";

export function pageMetadata(title: string, description = baseDescription, path = "/"): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "GOLDENHOUR", type: "website", images: [{ url: "/og-image.jpg", width: 1024, height: 559, alt: "GOLDENHOUR brand identity board" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}
