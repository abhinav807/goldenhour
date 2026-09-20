import type { MetadataRoute } from "next";
import { siteUrl } from "./metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return ["", "/goldenhour", "/about", "/privacy", "/terms", "/code-of-conduct"].map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date("2026-09-20"), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : path === "/goldenhour" ? 0.9 : 0.4 }));
}
