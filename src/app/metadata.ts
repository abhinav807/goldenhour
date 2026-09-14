import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
export const baseDescription = "GOLDENHOUR is a student-led 10-hour technology event in Delhi. The date and venue will be announced soon.";

export function pageMetadata(title: string, description = baseDescription, path = "/"): Metadata {
  const url = siteUrl ? `${siteUrl}${path}` : undefined;
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { title, description, ...(url ? { url } : {}), siteName: "GOLDENHOUR", type: "website", images: [{ url: "/og-image.jpg", width: 1024, height: 559, alt: "GOLDENHOUR brand identity board" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}
