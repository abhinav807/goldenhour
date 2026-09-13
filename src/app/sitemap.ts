import type { MetadataRoute } from "next";
import { siteUrl } from "./metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/thank-you", "/privacy", "/terms", "/empty-state"].map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "yearly", priority: path === "" ? 1 : 0.4 }));
}
