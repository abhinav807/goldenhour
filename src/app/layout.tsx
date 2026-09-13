import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GOLDENHOUR — A Student-Built Technology Experience",
  description: "GOLDENHOUR is a student-led space for people who build, experiment, compete and make things that probably shouldn't exist yet. Delhi / India / 2026.",
  keywords: "GOLDENHOUR, student hackathon, technology event, Delhi, India, 2026, builder community",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
