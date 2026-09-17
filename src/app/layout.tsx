import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import IntroLoader from "@/components/IntroLoader";
import SiteChrome from "@/components/SiteChrome";
import { baseDescription, siteUrl } from "./metadata";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "GOLDENHACKS — Build What's Next", template: "%s | GOLDENHACKS" },
  description: baseDescription,
  keywords: ["GOLDENHOUR", "student technology event", "Delhi builders", "student hackathon", "India 2026"],
  applicationName: "GOLDENHACKS",
  authors: [{ name: "GoldenHacks organizing team" }],
  creator: "GoldenHacks organizing team",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  openGraph: { type: "website", locale: "en_IN", ...(siteUrl ? { url: siteUrl } : {}), siteName: "GOLDENHACKS", title: "GOLDENHACKS — Build What's Next", description: baseDescription, images: [{ url: "/og-image.png", width: 286, height: 131, alt: "GOLDENHOUR wordmark logo" }] },
  twitter: { card: "summary_large_image", title: "GOLDENHOUR — Build Before Sunrise", description: baseDescription, images: ["/og-image.png"] },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }, { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" }, { url: "/icon.png", type: "image/png", sizes: "192x192" }], apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="antialiased"><body className="min-h-screen"><IntroLoader /><SiteChrome />{children}<CookieBanner /><Analytics /></body></html>;
}
