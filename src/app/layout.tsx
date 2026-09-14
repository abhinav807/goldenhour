import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import { baseDescription, siteUrl } from "./metadata";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "GOLDENHOUR — Build Before Sunrise", template: "%s | GOLDENHOUR" },
  description: baseDescription,
  keywords: ["GOLDENHOUR", "student technology event", "Delhi builders", "student hackathon", "India 2026"],
  applicationName: "GOLDENHOUR",
  authors: [{ name: "GOLDENHOUR organizing team" }],
  creator: "GOLDENHOUR organizing team",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  openGraph: { type: "website", locale: "en_IN", ...(siteUrl ? { url: siteUrl } : {}), siteName: "GOLDENHOUR", title: "GOLDENHOUR — Build Before Sunrise", description: baseDescription, images: [{ url: "/og-image.jpg", width: 1024, height: 559, alt: "GOLDENHOUR brand identity board" }] },
  twitter: { card: "summary_large_image", title: "GOLDENHOUR — Build Before Sunrise", description: baseDescription, images: ["/og-image.jpg"] },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }, { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" }, { url: "/icon.png", type: "image/png", sizes: "192x192" }], apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="antialiased"><body className="min-h-screen">{children}<CookieBanner /><Analytics /></body></html>;
}
