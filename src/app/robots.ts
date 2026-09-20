import type { MetadataRoute } from "next";
import { siteUrl } from "./metadata";

export default function robots(): MetadataRoute.Robots {
  const crawlers = ["OAI-SearchBot", "GPTBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "Bingbot"];
  const rule = (userAgent: string) => ({ userAgent, allow: "/", disallow: ["/api/", "/admin/", "/internal/"] });
  return { rules: [rule("*"), ...crawlers.map(rule)], ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}) };
}
