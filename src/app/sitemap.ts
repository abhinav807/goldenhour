import type { MetadataRoute } from "next";
import { siteUrl } from "./metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return ["", "/goldenhour", "/thank-you", "/privacy", "/terms", "/code-of-conduct", "/empty-state"].map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "yearly", priority: path === "" ? 1 : 0.4 }));
}
