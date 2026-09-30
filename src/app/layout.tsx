import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import IntroLoader from "@/components/IntroLoader";
import SiteChrome from "@/components/SiteChrome";
import { baseDescription, siteUrl } from "./metadata";
import { SiteStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "GoldenHour Delhi — Student Hackathon", template: "%s" },
  description: baseDescription,
  keywords: ["GoldenHour Delhi", "student hackathon Delhi", "ages 13–19 hackathon", "free hackathon Delhi NCR"],
  applicationName: "GoldenHour Delhi",
  authors: [{ name: "GoldenHour Delhi organizing team" }],
  creator: "GoldenHour Delhi organizing team",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  openGraph: { type: "website", locale: "en_IN", ...(siteUrl ? { url: siteUrl } : {}), siteName: "GoldenHour Delhi", title: "GoldenHour Delhi — Student Hackathon", description: baseDescription, images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "GoldenHour Delhi student hackathon" }] },
  twitter: { card: "summary_large_image", title: "GoldenHour Delhi — Student Hackathon", description: baseDescription, images: ["/og/home.png"] },
  icons: { icon: [{ url: "/favicon.ico" }, { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }, { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" }, { url: "/icon.png", type: "image/png", sizes: "192x192" }], apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN" className="antialiased"><body className="min-h-screen"><SiteStructuredData /><IntroLoader /><SiteChrome />{children}<CookieBanner /><Analytics /></body></html>;
}
