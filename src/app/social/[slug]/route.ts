import { ImageResponse } from "next/og";
import { createElement as h } from "react";
import { eventConfig } from "@/lib/event";
const titles: Record<string, string> = { "404": "THIS PAGE IS OFF THE CLOCK.", home: "BUILD. IMPROVE. REPEAT.", about: "THE PEOPLE BEHIND THE BUILD.", privacy: "YOUR DATA. YOUR QUESTIONS.", terms: "THE RULES OF THE BUILD.", "code-of-conduct": "BUILD BOLDLY. TREAT PEOPLE RESPECTFULLY.", "guardian-consent": "GUARDIAN CONSENT.", parents: "PARENTS & GUARDIANS.", "thank-you": "YOUR NEXT BUILD STARTS HERE.", "empty-state": "MORE TO COME." };
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
 const { slug } = await context.params;
 if (!Object.hasOwn(titles, slug)) return new Response("Not found", { status: 404 });
 return new ImageResponse(h("div", { style: { display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#fff9e9", color: "#171711", borderBottom: "24px solid #ff6938" } }, h("div", { style: { fontSize: 30, color: "#c43d00" } }, eventConfig.siteName.toUpperCase()), h("div", { style: { fontSize: 70, fontWeight: 700, maxWidth: 1050 } }, titles[slug]), h("div", { style: { fontSize: 25 } }, `${eventConfig.date} · ${eventConfig.location} · ${eventConfig.entry}`)), { width: 1200, height: 630 });
}
