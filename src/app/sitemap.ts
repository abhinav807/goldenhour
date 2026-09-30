import type { MetadataRoute } from "next";
import { eventConfig } from "@/lib/event";
import { siteUrl } from "./metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/goldenhour", "/about", "/privacy", "/terms", "/code-of-conduct", "/guardian-consent"].map((path) => ({ url: `${siteUrl || eventConfig.siteUrl}${path}`, lastModified: new Date(eventConfig.lastUpdated), changeFrequency: path === "/privacy" || path === "/terms" || path === "/code-of-conduct" ? "yearly" : "weekly", priority: path === "/" || path === "/goldenhour" ? 1 : 0.6 }));
}
