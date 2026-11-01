# GoldenHour correction handoff — 1 November 2026

## Step 1 — scope and confirmed assumptions

The organiser explicitly chose to retain the current facts: confirmed 14 November 2026, ages 13–19 (at least 13 and under 20 on event day), three tracks (Web Development, Game Development, Graphic Designing), and the current team. The attached audit contained stale facts. Existing canonical URLs, 1200×630 event card, Resources and Judging sections, complete server-rendered Code of Conduct, sitemap, robots, legal pages, upload restrictions and authentication were retained. DelhiHacks affiliation or additional organiser names were not reintroduced.

## Step 2 — shared data

src/lib/event.ts owns event facts and registration state. src/lib/team.ts owns team membership and roles. src/lib/registration.ts owns action labels, status copy and destination selection. Open registration links to the form; closed/ended registration links to the community; waitlist sends a request to the organisers without implying acceptance. The current state remains open.

## Step 3 — copy choices and changed copy

Tagline options:
1. BUILD. IMPROVE. REPEAT. (selected: existing brand line, no mismatch with daytime hours)
2. BUILD ALL DAY. SHIP BY EVENING.
3. TWELVE HOURS. ONE BOLD BUILD.

Home: BUILD. IMPROVE. REPEAT. My tickets opens account/profile and private tickets. Both home and event now show the shared organiser roster; the home founder portraits remain a separate founder showcase.

Event: YOUR FIRST BUILD DAY. A 12-hour event with about 6 hours of building. Beginners welcome. Teams of 1–3 participants.
How it works: One team leader completes the form for the team; read the Google Form confirmation; acceptance and response time require confirmation; check venue/travel before leaving; bring laptop and charger; disclose AI and credit third-party work.
Venue: confirmed date, venue still unannounced; request updates by email rather than implying an automated notification service exists.
What to expect: build, present and learn with fellow students; no testimonials or prior-edition claims invented.
Partners: Fueler is portfolio partner; OSEN academic sponsor; CodeCrafters supports prizes. Benefits remain subject to published conditions.
Judging: existing functionality, technical implementation, UX/design and innovation/creativity retained. Weights, tie-break and conflict process require confirmation.
Thank-you: this page opens the form; it does not confirm submission. Read the Google Form confirmation screen. Actual acknowledgement/acceptance process requires confirmation. An external Google Form redirect cannot be configured from this repository.
Parents: consent, supervision/security, pickup, medical provision, food/accessibility, photography, travel and changes. See full copy and source below.
FAQ: age boundary, beginners, mixed-school teams, AI/IP, travel/accommodation, free registration/refunds, certificates and event changes added. Unconfirmed policies are visibly marked.
Legal: explicit pending-confirmation sections added, without inventing retention periods or asserting compliance.

## Step 4 — code changes

Blocking intro overlay removed entirely: no crawler, slow connection or reduced-motion visitor must wait for it. Countdown shows placeholders before hydration and live/finished states after the IST boundaries. Repeated marquee content remains hidden from assistive technology; a separate pause/resume control is exposed. Optional cookie actions use the same visual treatment. External links explicitly use noopener noreferrer. Global skip link and social/policy footer added. Resources filters now use pressed buttons rather than incomplete tab semantics. Baseline CSP restricts base-uri, object-src and framing; it does not claim to enforce script-src/nonces. Per-page generated social cards are 1200×630, while the existing event card is retained. Calendar uses UTC conversion from the configured IST start/end.

### Full code for new files

#### src/lib/team.ts

```tsx
export const team = [
 { num: "01", name: "Abhinav Goyal", role: "Lead organiser / builder", affiliation: "GoldenHour Delhi", founder: true, group: "lead" },
 { num: "02", name: "Divya", role: "Lead organiser / builder", affiliation: "GoldenHour Delhi", founder: true, group: "lead" },
 { num: "03", name: "Anurag", role: "Lead organiser", affiliation: "GoldenHour Delhi", founder: false, group: "lead" },
 { num: "04", name: "Yashpal Yadav", role: "Co-organiser", affiliation: "GoldenHour Delhi", founder: false, group: "co" },
] as const;

```

#### src/lib/registration.ts

```tsx
export type RegistrationStatus = "closed" | "open" | "waitlist" | "ended";
export const registrationCopy = {
 closed: { label: "JOIN WHATSAPP", message: "Registration is closed. Join the community for updates." },
 open: { label: "REGISTER NOW", message: "Registration is open. One form per team." },
 waitlist: { label: "REQUEST WAITLIST", message: "Registration is full. Ask the team about the waitlist; a request does not guarantee a place." },
 ended: { label: "JOIN WHATSAPP", message: "Registration has ended. Join the community for future events." },
} as const;
export function registrationAction(status: RegistrationStatus, urls: { registration: string; community: string; waitlist: string }) {
 return { ...registrationCopy[status], href: status === "open" ? urls.registration : status === "waitlist" ? urls.waitlist : urls.community };
}

```

#### src/lib/participant-guide.ts

```tsx
export const parentGuidance = [
 ["Consent", "Participants under 18 need parent or guardian consent and a signed guardian consent slip at check-in. See the published slip before registering."],
 ["Supervision and venue security", "[CONFIRM: named safeguarding lead, supervision arrangements, staff coverage, venue access controls and check-in/out process]. Please confirm these arrangements with the organisers before making travel plans."],
 ["Pickup", "The event ends at 8:00 PM IST. A parent or guardian must arrange a minor’s journey home. [CONFIRM: pickup point, authorised collection process and late-pickup contact]."],
 ["Medical support", "[CONFIRM: on-site first-aid provision, emergency escalation procedure and named emergency contact]. The general enquiries email is not a monitored emergency service."],
 ["Food and accessibility", "SEWAN FOODS is the refreshment partner. [CONFIRM: meal provision, drinking water, allergens, dietary requests and venue accessibility]. Contact the team before attending if you need an adjustment."],
 ["Photography", "[CONFIRM: photography consent process, guardian consent for minors, opt-out identification and removal requests]. Do not photograph or share another person’s image without permission."],
 ["Travel and changes", "No overnight accommodation is provided. The venue remains unannounced. [CONFIRM: venue announcement deadline and communication process for venue, date or weather changes]."],
] as const;

```

#### src/components/ParticipationGuide.tsx

```tsx
import Link from "next/link";
import { eventConfig, primaryRegistration } from "@/lib/event";
export default function ParticipationGuide() { return <section id="participation" className="bg-offwhite px-5 md:px-10 py-20"><div className="max-w-4xl mx-auto space-y-8"><h2 className="font-archivo text-4xl">YOUR FIRST BUILD DAY.</h2><p className="font-dm text-lg">A 12-hour event with {eventConfig.activeBuildHours.toLowerCase()} of building. Beginners welcome. Teams of {eventConfig.teamSize}.</p><ol className="list-decimal pl-6 space-y-4"><li>One team leader completes the official form for the whole team.</li><li>Keep your submitted details. [CONFIRM: registration acknowledgement, acceptance process and response time]. Submission alone does not guarantee a place.</li><li>Check the published venue and travel details before setting off. Under-18s need guardian consent.</li><li>Bring your laptop, charger and project ideas. Follow the rules, disclose AI tools and credit third-party work.</li></ol><p><Link className="underline" href="/parents">Parents &amp; Guardians: consent, pickup and safety questions</Link></p><p>{eventConfig.dateStatus}: {eventConfig.date}. {eventConfig.venue}. [CONFIRM: venue announcement deadline].</p><div className="flex flex-wrap gap-4"><a className="brutal-btn-orange" href={primaryRegistration.href} target="_blank" rel="noopener noreferrer">{primaryRegistration.label}</a><a className="brutal-btn-outline" href="/event.ics" download>ADD TO CALENDAR</a><a className="underline" href={`mailto:${eventConfig.contactEmail}?subject=Venue%20updates`}>ASK FOR VENUE UPDATES</a></div><h3 className="font-archivo text-2xl">WHAT TO EXPECT</h3><p>Build with other students, present your work and learn through practice. [CONFIRM: any past-edition evidence, participant testimonials or approved photos before publishing them].</p><p>Our partners support different parts of the experience: Fueler is the portfolio partner, OSEN is the academic sponsor and CodeCrafters supports prizes. Individual benefits remain subject to the published prize conditions.</p></div></section>; }

```

#### src/app/parents/page.tsx

```tsx
import Link from "next/link";
import { pageMetadata } from "../metadata";
import { eventConfig } from "@/lib/event";
import { parentGuidance } from "@/lib/participant-guide";
export const metadata = pageMetadata("Parents & Guardians | GoldenHour Delhi", "Consent, pickup, travel and questions to confirm before a minor attends GoldenHour Delhi.", "/parents");
export default function ParentsPage() { return <main id="main-content" className="legal-document min-h-screen bg-offwhite px-5 md:px-12 py-28"><article className="max-w-3xl mx-auto"><Link href="/goldenhour">← EVENT DETAILS</Link><h1 className="font-archivo text-4xl md:text-6xl mt-8">PARENTS &amp; GUARDIANS.</h1><p className="my-8 font-dm text-lg">{eventConfig.date} · 8 AM–8 PM IST · {eventConfig.location}. The points marked CONFIRM are unresolved arrangements, not promises of service.</p>{parentGuidance.map(([title, body]) => <section key={title} className="my-8"><h2 className="font-archivo text-2xl mb-3">{title}</h2><p className="font-dm leading-relaxed">{body}</p></section>)}<p><Link href={eventConfig.guardianConsentUrl} className="underline">Guardian consent slip</Link></p><p className="mt-6">Parent enquiries: <a className="underline" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a></p><p className="mt-6">[CONFIRM: named safeguarding contact]. Please request written clarification of outstanding arrangements before consenting.</p></article></main>; }

```

#### src/app/event.ics/route.ts

```tsx
import { eventConfig } from "@/lib/event";
const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, "\\$&");
const fold = (line: string) => {
 let result = "", width = 0;
 for (const char of line) {
  const size = Buffer.byteLength(char);
  if (width + size > 73) { result += "\r\n "; width = 1; }
  result += char; width += size;
 }
 return result;
};
export function GET() {
 const utc = (s: string) => new Date(s).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
 const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//GoldenHour Delhi//Event//EN", "BEGIN:VEVENT", "UID:goldenhour-v1-2026@goldenhourdelhi.co.in", "DTSTAMP:20261101T000000Z", `DTSTART:${utc(eventConfig.isoDate)}`, `DTEND:${utc(eventConfig.endIsoDate)}`, "SUMMARY:GoldenHour V1", `LOCATION:${escape(eventConfig.venue)}`, `DESCRIPTION:${escape(eventConfig.description)}`, `URL:${eventConfig.siteUrl}/goldenhour`, "END:VEVENT", "END:VCALENDAR"];
 return new Response(lines.map(fold).join("\r\n") + "\r\n", { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="goldenhour-v1.ics"' } });
}

```

#### src/app/social/[slug]/route.ts

```tsx
import { ImageResponse } from "next/og";
import { createElement as h } from "react";
import { eventConfig } from "@/lib/event";
const titles: Record<string, string> = { "404": "THIS PAGE IS OFF THE CLOCK.", home: "BUILD. IMPROVE. REPEAT.", about: "THE PEOPLE BEHIND THE BUILD.", privacy: "YOUR DATA. YOUR QUESTIONS.", terms: "THE RULES OF THE BUILD.", "code-of-conduct": "BUILD BOLDLY. TREAT PEOPLE RESPECTFULLY.", "guardian-consent": "GUARDIAN CONSENT.", parents: "PARENTS & GUARDIANS.", "thank-you": "YOUR NEXT BUILD STARTS HERE.", "empty-state": "MORE TO COME." };
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
 const { slug } = await context.params;
 if (!Object.hasOwn(titles, slug)) return new Response("Not found", { status: 404 });
 return new ImageResponse(h("div", { style: { display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#fff9e9", color: "#171711", borderBottom: "24px solid #ff6938" } }, h("div", { style: { fontSize: 30, color: "#c43d00" } }, eventConfig.siteName.toUpperCase()), h("div", { style: { fontSize: 70, fontWeight: 700, maxWidth: 1050 } }, titles[slug]), h("div", { style: { fontSize: 25 } }, `${eventConfig.date} · ${eventConfig.location} · ${eventConfig.entry}`)), { width: 1200, height: 630 });
}

```

### Edited-file diff

```diff
diff --git a/next.config.ts b/next.config.ts
index 95c6ad7..b136113 100644
--- a/next.config.ts
+++ b/next.config.ts
@@ -1,6 +1,7 @@
 import type { NextConfig } from "next";
 
 const securityHeaders = [
+  { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'" },
   { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
   { key: "X-Content-Type-Options", value: "nosniff" },
   { key: "X-Frame-Options", value: "DENY" },
diff --git a/src/app/about/page.tsx b/src/app/about/page.tsx
index 3d66374..c9c6d61 100644
--- a/src/app/about/page.tsx
+++ b/src/app/about/page.tsx
@@ -1,11 +1,11 @@
 import type { Metadata } from "next";
 import Link from "next/link";
-import { eventConfig } from "@/lib/event";
+import { primaryRegistration, eventConfig } from "@/lib/event";
 import { BreadcrumbStructuredData } from "@/components/StructuredData";
 import { pageMetadata } from "../metadata";
 
 export const metadata: Metadata = pageMetadata("About GoldenHour Delhi — Press and Media Kit", "GoldenHour Delhi is a free student-run 12-hour Build Day for participants aged 13–19 on event day in Delhi NCR. Find official event facts, partners, and contact details.", "/about", { url: "/og/about.png", width: 1200, height: 630, alt: "About GoldenHour Delhi" });
 
 export default function AboutPage() {
-  return <><BreadcrumbStructuredData items={[{ name: "GoldenHour Delhi", path: "/" }, { name: "About", path: "/about" }]} /><main className="min-h-screen gh-document-paper bg-offwhite text-black px-5 md:px-12 py-24"><div className="max-w-[1000px] mx-auto"><Link href="/" className="font-space text-xs text-sunset hover:text-black">← BACK TO GOLDENHOUR DELHI</Link><p className="gh-kicker mt-12">PRESS / MEDIA KIT</p><h1 className="font-archivo text-[clamp(2.35rem,7.8vw,6rem)] leading-[1.08] mt-5">ABOUT<br /><span className="text-sunset">GOLDENHOUR.</span></h1><section className="mt-16 max-w-3xl"><h2 className="font-archivo text-3xl md:text-5xl mb-5">OFFICIAL DESCRIPTION</h2><p className="font-dm text-lg leading-relaxed">{eventConfig.description} GoldenHour is organized by a student-led team and is designed for school and other student builders in Delhi NCR.</p></section><section className="mt-16 grid md:grid-cols-2 gap-6"><div className="brutal-card p-7"><h2 className="font-archivo text-3xl mb-5">FACT SHEET</h2><dl className="space-y-4 font-dm text-sm"><div><dt className="font-space text-[10px] font-bold">DATE</dt><dd>{eventConfig.date} — {eventConfig.dateStatus.toLowerCase()}</dd></div><div><dt className="font-space text-[10px] font-bold">VENUE</dt><dd>{eventConfig.venue}</dd></div><div><dt className="font-space text-[10px] font-bold">ELIGIBILITY</dt><dd>{eventConfig.ageLimit}</dd></div><div><dt className="font-space text-[10px] font-bold">CAPACITY</dt><dd>{eventConfig.participantLimit}</dd></div><div><dt className="font-space text-[10px] font-bold">TRACKS</dt><dd>{eventConfig.tracks.join(" and ")}</dd></div><div><dt className="font-space text-[10px] font-bold">STATUS</dt><dd><a className="underline text-sunset" href={eventConfig.registrationUrl} target="_blank" rel="noreferrer">Registration is open</a></dd></div></dl></div><div className="brutal-card-orange p-7"><h2 className="font-archivo text-3xl mb-5">BRAND USAGE</h2><p className="font-dm text-sm leading-relaxed">Write “GoldenHour Delhi” for the organization and “GoldenHour V1” for the event. “GoldenHour hackathon” is acceptable when describing the event. Do not write “GoldenHacks” or “GOLDEN.HOUR” as the canonical entity name.</p><p className="font-space text-[10px] font-bold mt-6">LAST UPDATED: {eventConfig.lastUpdated}</p></div></section><section className="mt-16"><h2 className="font-archivo text-3xl md:text-5xl mb-5">ORGANIZERS & PARTNERS</h2><p className="font-dm text-lg leading-relaxed">Lead organisers: {eventConfig.leadOrganizers.join(", ")}. Co-organiser: {eventConfig.coOrganizers.join(", ")}. Founders: {eventConfig.founders.join(" and ")}. Prize sponsor: CodeCrafters. Academic sponsor: OSEN. Refreshment partner: {eventConfig.refreshmentPartner}. Gift sponsor: {eventConfig.giftSponsor}.</p></section><section className="mt-16 border-t-2 border-black pt-8"><h2 className="font-archivo text-3xl mb-5">CONTACT</h2><address className="font-dm not-italic"><a className="underline text-sunset" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a><br /><a className="underline text-sunset" href={eventConfig.instagramUrl}>Instagram</a> · <a className="underline text-sunset" href={eventConfig.linkedinUrl}>LinkedIn</a></address></section></div></main></>;
+  return <><BreadcrumbStructuredData items={[{ name: "GoldenHour Delhi", path: "/" }, { name: "About", path: "/about" }]} /><main className="min-h-screen gh-document-paper bg-offwhite text-black px-5 md:px-12 py-24"><div className="max-w-[1000px] mx-auto"><Link href="/" className="font-space text-xs text-sunset hover:text-black">← BACK TO GOLDENHOUR DELHI</Link><p className="gh-kicker mt-12">PRESS / MEDIA KIT</p><h1 className="font-archivo text-[clamp(2.35rem,7.8vw,6rem)] leading-[1.08] mt-5">ABOUT<br /><span className="text-sunset">GOLDENHOUR.</span></h1><section className="mt-16 max-w-3xl"><h2 className="font-archivo text-3xl md:text-5xl mb-5">OFFICIAL DESCRIPTION</h2><p className="font-dm text-lg leading-relaxed">{eventConfig.description} GoldenHour is organized by a student-led team and is designed for school and other student builders in Delhi NCR.</p></section><section className="mt-16 grid md:grid-cols-2 gap-6"><div className="brutal-card p-7"><h2 className="font-archivo text-3xl mb-5">FACT SHEET</h2><dl className="space-y-4 font-dm text-sm"><div><dt className="font-space text-[10px] font-bold">DATE</dt><dd>{eventConfig.date} — {eventConfig.dateStatus.toLowerCase()}</dd></div><div><dt className="font-space text-[10px] font-bold">VENUE</dt><dd>{eventConfig.venue}</dd></div><div><dt className="font-space text-[10px] font-bold">ELIGIBILITY</dt><dd>{eventConfig.ageLimit}</dd></div><div><dt className="font-space text-[10px] font-bold">CAPACITY</dt><dd>{eventConfig.participantLimit}</dd></div><div><dt className="font-space text-[10px] font-bold">TRACKS</dt><dd>{eventConfig.tracks.join(" and ")}</dd></div><div><dt className="font-space text-[10px] font-bold">STATUS</dt><dd><a className="underline text-sunset" href={primaryRegistration.href} target="_blank" rel="noopener noreferrer">{primaryRegistration.message}</a></dd></div></dl></div><div className="brutal-card-orange p-7"><h2 className="font-archivo text-3xl mb-5">BRAND USAGE</h2><p className="font-dm text-sm leading-relaxed">Write “GoldenHour Delhi” for the organization and “GoldenHour V1” for the event. “GoldenHour hackathon” is acceptable when describing the event. Do not write “GoldenHacks” or “GOLDEN.HOUR” as the canonical entity name.</p><p className="font-space text-[10px] font-bold mt-6">LAST UPDATED: {eventConfig.lastUpdated}</p></div></section><section className="mt-16"><h2 className="font-archivo text-3xl md:text-5xl mb-5">ORGANIZERS & PARTNERS</h2><p className="font-dm text-lg leading-relaxed">Lead organisers: {eventConfig.leadOrganizers.join(", ")}. Co-organiser: {eventConfig.coOrganizers.join(", ")}. Founders: {eventConfig.founders.join(" and ")}. Prize sponsor: CodeCrafters. Academic sponsor: OSEN. Refreshment partner: {eventConfig.refreshmentPartner}. Gift sponsor: {eventConfig.giftSponsor}.</p></section><section className="mt-16 border-t-2 border-black pt-8"><h2 className="font-archivo text-3xl mb-5">CONTACT</h2><address className="font-dm not-italic"><a className="underline text-sunset" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a><br /><a className="underline text-sunset" href={eventConfig.instagramUrl}>Instagram</a> · <a className="underline text-sunset" href={eventConfig.linkedinUrl}>LinkedIn</a></address></section></div></main></>;
 }
diff --git a/src/app/code-of-conduct/page.tsx b/src/app/code-of-conduct/page.tsx
index 0b7bc90..49f8a73 100644
--- a/src/app/code-of-conduct/page.tsx
+++ b/src/app/code-of-conduct/page.tsx
@@ -44,7 +44,7 @@ export default function CodeOfConductPage() {
           <p>This Code of Conduct applies to every person participating in or associated with a GoldenHour event, including participants, volunteers, organizers, speakers, sponsors, judges, guests, photographers, and event staff.</p>
           <p>By registering for, attending, volunteering at, or otherwise participating in GoldenHour, you agree to follow this Code of Conduct.</p>
           {sections.map((section) => <section key={section.title} className="border-t-2 border-black/15 pt-8"><h2 className="font-archivo text-2xl md:text-3xl text-black mb-6">{section.title}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph} className="mb-5">{paragraph}</p>)}{section.bullets && <ul className="list-disc pl-6 space-y-3">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
-          <section className="border-t-2 border-black/15 pt-8"><h2 className="font-archivo text-2xl md:text-3xl text-black mb-6">REPORTING CONTACT</h2><p><strong>GoldenHour Organizing Team</strong><br />Email: <a className="underline text-sunset" href="mailto:hello@goldenhourdelhi.co.in">hello@goldenhourdelhi.co.in</a></p><p className="mt-5">For urgent incidents during the event, approach any clearly identified GoldenHour organizer or volunteer and ask for the event lead.</p></section>
+          <section className="border-t-2 border-black/15 pt-8"><h2 className="font-archivo text-2xl md:text-3xl text-black mb-6">REPORTING CONTACT</h2><p><strong>GoldenHour Organising Team</strong><br />[CONFIRM: named safeguarding lead and backup contact]<br />Email: <a className="underline text-sunset" href="mailto:hello@goldenhourdelhi.co.in">hello@goldenhourdelhi.co.in</a></p><p className="mt-5">For urgent incidents during the event, approach any clearly identified GoldenHour organizer or volunteer and ask for the event lead.</p></section>
           <section className="border-t-2 border-black/15 pt-8"><h2 className="font-archivo text-2xl md:text-3xl text-black mb-6">OUR COMMITMENT</h2><p>GoldenHour exists to give people a place to <strong>build, learn, experiment, collaborate, and meet other builders</strong>.</p><p className="mt-5">We want participants to be able to focus on creating great projects without worrying about harassment, intimidation, discrimination, or unsafe behavior.</p><p className="mt-5">By participating in GoldenHour, you help create that environment.</p><p className="mt-8 font-archivo text-2xl text-sunset">Build boldly. Treat people respectfully. Leave the community better than you found it.</p></section>
           <p className="border-t-2 border-black/15 pt-8 font-space text-xs text-black/55">LAST UPDATED: 30 SEPTEMBER 2026<br />GOLDENHOUR<br />CONTACT: <a className="underline text-sunset" href="mailto:hello@goldenhourdelhi.co.in">hello@goldenhourdelhi.co.in</a></p>
         </div>
diff --git a/src/app/goldenhour/layout.tsx b/src/app/goldenhour/layout.tsx
index 08f392b..159d4ff 100644
--- a/src/app/goldenhour/layout.tsx
+++ b/src/app/goldenhour/layout.tsx
@@ -1,9 +1,9 @@
 import type { Metadata } from "next";
-import { eventConfig } from "@/lib/event";
+import { primaryRegistration, eventConfig } from "@/lib/event";
 import { pageMetadata } from "../metadata";
 export const metadata: Metadata = pageMetadata(
   "GoldenHour V1 — Free 12-Hour Student Build Day in Delhi NCR",
-  `Free 12-hour student Build Day in Delhi NCR on ${eventConfig.date}. Open to ages 13–19 (under 20 on event day). Registration is open.`,
+  `Free 12-hour student Build Day in Delhi NCR on ${eventConfig.date}. Open to ages 13–19 (under 20 on event day). ${primaryRegistration.message}`,
   "/goldenhour",
   { url: "/og/goldenhour.png", width: 1200, height: 630, alt: "GoldenHour V1 — free 12-hour student hackathon in Delhi NCR" },
 );
diff --git a/src/app/goldenhour/page.tsx b/src/app/goldenhour/page.tsx
index b8da571..eb594e7 100644
--- a/src/app/goldenhour/page.tsx
+++ b/src/app/goldenhour/page.tsx
@@ -1,3 +1,4 @@
+import ParticipationGuide from "@/components/ParticipationGuide";
 import TechHeading from "@/components/TechHeading";
 import Hero from "@/components/Hero";
 import Marquee from "@/components/Marquee";
@@ -21,7 +22,7 @@ import Resources from "@/components/Resources";
 import EventInfo from "@/components/EventInfo";
 import EventAtAGlance from "@/components/EventAtAGlance";
 import { BreadcrumbStructuredData, EventStructuredData, FAQStructuredData } from "@/components/StructuredData";
-import { eventConfig } from "@/lib/event";
+import { primaryRegistration, eventConfig } from "@/lib/event";
 
 export default function GoldenHourPage() {
   return <>
@@ -34,6 +35,7 @@ export default function GoldenHourPage() {
     <main id="main-content" className="event-page-root">
       <Hero />
       <EventAtAGlance />
+      <ParticipationGuide />
       <section aria-labelledby="what-is-goldenhour" className="bg-offwhite gh-grain-paper px-5 md:px-10 py-16 md:py-24 border-b-4 border-black"><div className="max-w-[900px] mx-auto"><p className="gh-kicker">DEFINITION / GOLDENHOUR DELHI</p><TechHeading id="what-is-goldenhour" className="font-archivo text-4xl md:text-6xl leading-[.85] mt-5 mb-6" lines={["WHAT IS", {"text": "GOLDENHOUR?", "className": "text-sunset"}]} /><p className="font-dm text-lg leading-relaxed">GoldenHour V1 is a free, student-run 12-hour Build Day in Delhi NCR, with Web Development, Game Development and Graphic Designing tracks. Participants must be at least 13 and under 20 on 14 November 2026 (ages 13–19 on event day). The event takes place on 14 November 2026; the venue will be announced.</p></div></section>
       <Marquee />
       <About />
@@ -50,7 +52,7 @@ export default function GoldenHourPage() {
       <EventInfo />
       <FinalCTA />
       <FAQ />
-      <p className="sr-only">Event date: {eventConfig.date} in {eventConfig.location}. Registration is open. Participants must be at least 13 and under 20 on event day.</p>
+      <p className="sr-only">Event date: {eventConfig.date} in {eventConfig.location}. {primaryRegistration.message} Participants must be at least 13 and under 20 on event day.</p>
     </main>
     <Footer />
     <MobileCTA />
diff --git a/src/app/layout.tsx b/src/app/layout.tsx
index 5930551..b5fdc0a 100644
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -1,3 +1,4 @@
+import { eventConfig } from "@/lib/event";
 import type { Metadata } from "next";
 import "./globals.css";
 import "./retro.css";
@@ -25,5 +26,5 @@ export const metadata: Metadata = {
 };
 
 export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
-  return <html lang="en-IN" className="antialiased" data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("gh-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){}})()` }} /></head><body className="min-h-screen crt-page"><SiteStructuredData /><IntroLoader /><SiteChrome />{children}<CookieBanner /><Analytics /></body></html>;
+  return <html lang="en-IN" className="antialiased" data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("gh-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){}})()` }} /></head><body className="min-h-screen crt-page"><a href="#site-content" className="skip-link">SKIP TO MAIN CONTENT</a><SiteStructuredData /><IntroLoader /><SiteChrome /><div id="site-content" tabIndex={-1}>{children}</div><footer className="bg-black text-offwhite px-5 py-6 text-center font-space text-xs flex flex-wrap justify-center gap-6"><a href="/parents">Parents &amp; Guardians</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href={eventConfig.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a><a href={eventConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a></footer><CookieBanner /><Analytics /></body></html>;
 }
diff --git a/src/app/llms.txt/route.ts b/src/app/llms.txt/route.ts
index 08ce597..c7b3003 100644
--- a/src/app/llms.txt/route.ts
+++ b/src/app/llms.txt/route.ts
@@ -1,6 +1,6 @@
-import { eventConfig, eventStatusLine, faqItems } from "@/lib/event";
+import { primaryRegistration, eventConfig, eventStatusLine, faqItems } from "@/lib/event";
 
 export function GET() {
-  const body = `# ${eventConfig.siteName}\n\n> ${eventConfig.description}\n\n## Official facts\n\n- Canonical organization name: ${eventConfig.siteName}.\n- Event: GoldenHour V1, a free 12-hour Build Day.\n- Audience: ${eventConfig.ageLimit}.\n- Cost: ${eventConfig.entry}.\n- Team size: ${eventConfig.teamSize}.\n- Participant capacity: ${eventConfig.participantLimit}.\n- Tracks: ${eventConfig.tracks.join("; ")}.\n- Date: ${eventConfig.date}; confirmed.\n- Venue: ${eventConfig.venue}.\n- Registration: open at ${eventConfig.registrationUrl}.\n- Status: ${eventStatusLine}\n- Submission deadline: 5:00 PM IST sharp on event day.\n- Awards: one trophy per winning team; CodeCrafters VIP memberships per participant; 80 one-month n8n Cloud Pro licenses are available for allocation, valued at 60 USD each; not guaranteed for every participant. Provisional participant offers (subject to final sponsor confirmation and distribution arrangements): Fueler Digital Bundle (sponsor-stated $800 value) and InterviewBuddy 10% discount on expert-driven sessions. First, second and third place depend on the number of eligible teams and the judges' evaluation. A position may remain unawarded if there are too few eligible submissions or judging criteria are not met. Placements and prizes are not guaranteed.\n- Lead organizers: ${eventConfig.leadOrganizers.join(", ")}\n- Co-organizer: ${eventConfig.coOrganizers.join(", ")}\n- Founders: ${eventConfig.founders.join(" and ")}.\n- Prize sponsor: CodeCrafters. Academic sponsor: OSEN. Refreshment partner: ${eventConfig.refreshmentPartner}. Gift sponsor: ${eventConfig.giftSponsor}.\n\n## Definition\n\nGoldenHour Delhi is a student-run technology event in Delhi NCR, distinct from the photography term “golden hour.” Eligible participants are 13–19 on the event date and under 20 on 14 November 2026.\n\n## Registration and safeguarding\n\nOne team leader submits a single registration form and includes every team member. Each listed member must meet the age requirement. Participants under 18 need parent or guardian consent in the form and a signed consent slip at check-in. Organizers may view a school ID, Aadhaar, passport, or birth certificate to verify age but do not copy or store the document. Participants arrange their own travel; no overnight accommodation is provided, and a guardian must arrange travel home for minors. Venue-specific travel instructions will be announced before the event.\n\n## Project rules\n\nAI tools are allowed with disclosure in the project README. Open-source libraries, templates, and participants’ own reusable boilerplate are allowed; the project itself must begin at the event.\n\n## FAQ\n\n${faqItems.map((item) => `### ${item.q}\n\n${item.a} ${item.detail}`).join("\n\n")}\n\n## Canonical URLs\n\n- Home: ${eventConfig.siteUrl}/\n- Event: ${eventConfig.siteUrl}/goldenhour\n- About and media kit: ${eventConfig.siteUrl}/about\n- Code of Conduct: ${eventConfig.siteUrl}/code-of-conduct\n- Privacy: ${eventConfig.siteUrl}/privacy\n- Terms: ${eventConfig.siteUrl}/terms\n- Guardian consent slip: ${eventConfig.siteUrl}/guardian-consent\n- Code of Conduct: ${eventConfig.siteUrl}/code-of-conduct\n- Contact: mailto:${eventConfig.contactEmail}\n\nLast updated: ${eventConfig.lastUpdated}.`;
+  const body = `# ${eventConfig.siteName}\n\n> ${eventConfig.description}\n\n## Official facts\n\n- Canonical organization name: ${eventConfig.siteName}.\n- Event: GoldenHour V1, a free 12-hour Build Day.\n- Audience: ${eventConfig.ageLimit}.\n- Cost: ${eventConfig.entry}.\n- Team size: ${eventConfig.teamSize}.\n- Participant capacity: ${eventConfig.participantLimit}.\n- Tracks: ${eventConfig.tracks.join("; ")}.\n- Date: ${eventConfig.date}; confirmed.\n- Venue: ${eventConfig.venue}.\n- Registration: ${primaryRegistration.message} ${primaryRegistration.href}.\n- Status: ${eventStatusLine}\n- Submission deadline: 5:00 PM IST sharp on event day.\n- Awards: one trophy per winning team; CodeCrafters VIP memberships per participant; 80 one-month n8n Cloud Pro licenses are available for allocation, valued at 60 USD each; not guaranteed for every participant. Provisional participant offers (subject to final sponsor confirmation and distribution arrangements): Fueler Digital Bundle (sponsor-stated $800 value) and InterviewBuddy 10% discount on expert-driven sessions. First, second and third place depend on the number of eligible teams and the judges' evaluation. A position may remain unawarded if there are too few eligible submissions or judging criteria are not met. Placements and prizes are not guaranteed.\n- Lead organizers: ${eventConfig.leadOrganizers.join(", ")}\n- Co-organizer: ${eventConfig.coOrganizers.join(", ")}\n- Founders: ${eventConfig.founders.join(" and ")}.\n- Prize sponsor: CodeCrafters. Academic sponsor: OSEN. Refreshment partner: ${eventConfig.refreshmentPartner}. Gift sponsor: ${eventConfig.giftSponsor}.\n\n## Definition\n\nGoldenHour Delhi is a student-run technology event in Delhi NCR, distinct from the photography term “golden hour.” Eligible participants are 13–19 on the event date and under 20 on 14 November 2026.\n\n## Registration and safeguarding\n\nOne team leader submits a single registration form and includes every team member. Each listed member must meet the age requirement. Participants under 18 need parent or guardian consent in the form and a signed consent slip at check-in. Organizers may view a school ID, Aadhaar, passport, or birth certificate to verify age but do not copy or store the document. Participants arrange their own travel; no overnight accommodation is provided, and a guardian must arrange travel home for minors. Venue-specific travel instructions will be announced before the event.\n\n## Project rules\n\nAI tools are allowed with disclosure in the project README. Open-source libraries, templates, and participants’ own reusable boilerplate are allowed; the project itself must begin at the event.\n\n## FAQ\n\n${faqItems.map((item) => `### ${item.q}\n\n${item.a} ${item.detail}`).join("\n\n")}\n\n## Canonical URLs\n\n- Home: ${eventConfig.siteUrl}/\n- Event: ${eventConfig.siteUrl}/goldenhour\n- About and media kit: ${eventConfig.siteUrl}/about\n- Code of Conduct: ${eventConfig.siteUrl}/code-of-conduct\n- Privacy: ${eventConfig.siteUrl}/privacy\n- Terms: ${eventConfig.siteUrl}/terms\n- Guardian consent slip: ${eventConfig.siteUrl}/guardian-consent\n- Code of Conduct: ${eventConfig.siteUrl}/code-of-conduct\n- Contact: mailto:${eventConfig.contactEmail}\n\nLast updated: ${eventConfig.lastUpdated}.`;
   return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
 }
diff --git a/src/app/metadata.ts b/src/app/metadata.ts
index 888433a..a9ab1ff 100644
--- a/src/app/metadata.ts
+++ b/src/app/metadata.ts
@@ -5,7 +5,8 @@ export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || eventConfig.siteUrl)
 export const baseDescription: string = eventConfig.description;
 export const defaultOgImage = { url: "/og/home.png", width: 1200, height: 630, alt: "GoldenHour Delhi — free 12-hour student hackathon in Delhi NCR" };
 
-export function pageMetadata(title: string, description = baseDescription, path = "/", image = defaultOgImage): Metadata {
+export function pageMetadata(title: string, description = baseDescription, path = "/", image?: typeof defaultOgImage): Metadata {
+  image ??= { ...defaultOgImage, url: `/social/${path === "/" ? "home" : path.slice(1)}`, alt: title };
   const url = `${siteUrl}${path}`;
   return {
     title: { absolute: title },
diff --git a/src/app/page.tsx b/src/app/page.tsx
index f8e2bb2..2103cee 100644
--- a/src/app/page.tsx
+++ b/src/app/page.tsx
@@ -1,3 +1,4 @@
+import Organizers from "@/components/Organizers";
 import Link from "next/link";
 import MobileCTA from "@/components/MobileCTA";
 import { pageMetadata } from "./metadata";
@@ -8,7 +9,7 @@ import { RetroStamp, RetroMeter } from "@/components/RetroStamp";
 import { ArrowUpRight } from "lucide-react";
 import GoldenHacksCursor from "@/components/GoldenHacksCursor";
 import Marquee from "@/components/Marquee";
-import { eventConfig } from "@/lib/event";
+import { primaryRegistration, eventConfig } from "@/lib/event";
 import LoginLink from "@/components/auth/LoginLink";
 import TechHeading from "@/components/TechHeading";
 import authStyles from "@/components/auth/Auth.module.css";
@@ -37,7 +38,7 @@ function SectionTape({ dark = false }: { dark?: boolean }) {
 
 export default function Home() {
   return (
-    <main className="gh-company-page bg-offwhite text-black overflow-hidden"><GoldenHacksCursor /><MobileCTA />
+    <><a href="#home-content" className="skip-link">SKIP TO MAIN CONTENT</a><main id="home-content" className="gh-company-page bg-offwhite text-black overflow-hidden"><GoldenHacksCursor /><MobileCTA />
       <nav className={`gh-company-nav ${navStyles.companyNav}`} aria-label="GoldenHour Delhi navigation">
         <Link href={eventConfig.siteUrl} className="gh-wordmark" aria-label="GoldenHour Delhi home">GOLDEN<span>HOUR</span></Link>
         <div className="gh-company-links hidden lg:flex items-center justify-center gap-6 font-space text-[10px] font-bold uppercase tracking-widest">
@@ -57,7 +58,7 @@ export default function Home() {
           <span className="gh-home-issue mb-6">INDEPENDENT BUILD CULTURE / ISSUE 01</span><p className="font-space text-xs font-bold tracking-[.2em] text-sunset mb-7">GOLDENHOUR DELHI / DELHI NCR / INDIA</p>
           <TechHeading as="h1" inline lines={["GOLDEN", { text: "HOUR", className: "text-sunset" }, { text: ".", className: "text-offwhite" }]} className="font-archivo text-[clamp(4rem,18vw,120px)] sm:text-[clamp(5rem,15vw,140px)] md:text-[clamp(4rem,9vw,130px)] leading-[.76] tracking-[-.08em] max-w-6xl mx-auto" />
           <div className="mt-12 flex flex-col items-center gap-8 max-w-5xl mx-auto">
-            <p className="font-archivo text-2xl md:text-5xl leading-[.9] max-w-2xl mx-auto text-center">BUILD BEFORE SUNRISE.</p>
+            <p className="font-archivo text-2xl md:text-5xl leading-[.9] max-w-2xl mx-auto text-center">BUILD. IMPROVE. REPEAT.</p>
             <Link href="#events" className="brutal-btn-orange px-7 py-4 justify-center">VIEW GOLDENHOUR V1 <ArrowUpRight size={18} /></Link>
           </div>
         </div>
@@ -74,17 +75,18 @@ export default function Home() {
 
       <SectionTape dark />
       <section id="events" className="bg-sunset gh-home-orange px-5 md:px-10 py-20 md:py-28 border-b-4 border-black">
-          <div className="max-w-[1200px] mx-auto"><div className="text-center mb-14"><p className="gh-kicker">02 / UPCOMING HACKATHONS</p><TechHeading lines={["PICK YOUR", { text: "BUILD.", className: "text-offwhite" }]} className="font-archivo text-5xl sm:text-7xl md:text-8xl leading-[.8] mt-6" /></div><div className="grid max-w-2xl mx-auto gap-8">{events.map((event, i) => <RetroStamp key={event.name} edge="all" serial={`SYSTEM 2026 / GH.01 / EVENT 0${i + 1}`} status="REGISTRATION OPEN" contentClassName="text-center flex flex-col items-center">
+          <div className="max-w-[1200px] mx-auto"><div className="text-center mb-14"><p className="gh-kicker">02 / UPCOMING HACKATHONS</p><TechHeading lines={["PICK YOUR", { text: "BUILD.", className: "text-offwhite" }]} className="font-archivo text-5xl sm:text-7xl md:text-8xl leading-[.8] mt-6" /></div><div className="grid max-w-2xl mx-auto gap-8">{events.map((event, i) => <RetroStamp key={event.name} edge="all" serial={`SYSTEM 2026 / GH.01 / EVENT 0${i + 1}`} status="{primaryRegistration.message}" contentClassName="text-center flex flex-col items-center">
             <div className="flex w-full justify-center items-center gap-4 my-8"><span className="font-space text-[10px] font-bold px-3 py-2 bg-black text-sunset">0{i + 1}</span><span className="font-space text-[10px] font-bold uppercase text-black/60">{event.date}</span></div>
             <p className="font-space text-[10px] tracking-widest font-bold mb-4 text-black/60">{event.type}</p>
             <h3 className="font-archivo text-4xl md:text-6xl leading-[.82] mb-7">{event.name}</h3>
             <p className="font-dm text-lg leading-relaxed max-w-lg mb-8 text-black/75">{event.description}</p>
             <div className="w-full mb-8"><RetroMeter label="Free entry" value={100} valueLabel="100% FREE" /></div>
-            {event.internal ? <Link href={event.href} className="brutal-btn-orange">{event.action} <ArrowUpRight size={18} /></Link> : <a href={event.href} target="_blank" rel="noreferrer" className="brutal-btn-outline border-sunset text-sunset bg-black gh-falling-btn">{event.action} <ArrowUpRight size={18} /></a>}
+            {event.internal ? <Link href={event.href} className="brutal-btn-orange">{event.action} <ArrowUpRight size={18} /></Link> : <a href={event.href} target="_blank" rel="noopener noreferrer" className="brutal-btn-outline border-sunset text-sunset bg-black gh-falling-btn">{event.action} <ArrowUpRight size={18} /></a>}
           </RetroStamp>)}</div></div>
       </section>
 
       <SectionTape />
+      <Organizers />
       <section id="founders" className="gh-home-editorial px-5 md:px-10 py-20 md:py-28 border-b-4 border-black">
         <div className="max-w-[1200px] mx-auto">
           <div className="text-center mb-14">
@@ -147,7 +149,7 @@ export default function Home() {
       <SectionTape />
       <section className="bg-black gh-home-dark text-offwhite px-5 md:px-10 py-20 md:py-28 border-b-4 border-sunset"><div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center"><div><p className="gh-kicker text-sunset">04 / THE STANDARD</p><TechHeading lines={["A MOVEMENT", { text: "IN THE MAKING.", className: "text-sunset" }]} className="font-archivo text-5xl md:text-5xl lg:text-6xl leading-[1.08] mt-6" /></div><div className="grid grid-cols-2 gap-3">{principles.map((principle, i) => <div key={principle} className="border border-offwhite/20 p-5 min-h-32 flex items-center justify-center text-center"><p className="font-space text-xs font-bold leading-relaxed">0{i + 1}<br /><span className="text-sunset">{principle}</span></p></div>)}</div></div></section>
 
-      <footer id="contact" className="bg-sunset gh-home-orange px-5 md:px-10 py-16"><div className="max-w-[1200px] mx-auto grid md:grid-cols-[1.15fr_.85fr_1fr] gap-10 items-start text-center"><div><p className="font-space text-xs font-bold tracking-widest mb-5">GOLDENHOUR DELHI / DELHI NCR / INDIA</p><TechHeading lines={["LET'S BUILD", { text: "TOGETHER.", className: "text-offwhite" }]} className="font-archivo text-5xl md:text-7xl leading-[.8]" /><a href="mailto:hello@goldenhourdelhi.co.in" className="inline-block font-archivo text-xl underline underline-offset-4 mt-8">hello@goldenhourdelhi.co.in</a><div className="flex justify-center gap-4 mt-6"><a href="https://www.linkedin.com/company/goldenhourdelhi/" target="_blank" rel="noreferrer" aria-label="GoldenHour on LinkedIn" className="p-3 border-2 border-black hover:bg-black hover:text-sunset transition-colors"><LinkedinMark /></a><a href="https://www.instagram.com/goldenhour.delhi/" target="_blank" rel="noreferrer" aria-label="GoldenHour on Instagram" className="p-3 border-2 border-black hover:bg-black hover:text-sunset transition-colors"><InstagramMark /></a></div></div><div><p className="font-space text-[10px] font-bold tracking-[.16em] mb-5">MAIN WEBSITE</p><nav aria-label="Main website pages" className="flex flex-col gap-3 font-space text-xs"><a href="#about" className="hover:underline">ABOUT</a><a href="#events" className="hover:underline">HACKATHONS</a><a href="#founders" className="hover:underline">FOUNDERS</a><a href="#contact" className="hover:underline">CONTACT</a></nav></div><div><p className="font-space text-[10px] font-bold tracking-[.16em] mb-5">EVENT &amp; LEGAL</p><nav aria-label="Event and legal pages" className="flex flex-col gap-3 font-space text-xs"><a href="/goldenhour" className="hover:underline">GOLDENHOUR V1</a><a href="/goldenhour#faq" className="hover:underline">FAQ</a><a href="/code-of-conduct" className="hover:underline">CODE OF CONDUCT</a><a href="/privacy" className="hover:underline">PRIVACY</a><a href="/terms" className="hover:underline">TERMS</a></nav></div></div><div className="max-w-[1200px] mx-auto mt-16 pt-5 border-t border-black/30 flex flex-col md:flex-row justify-between gap-3 font-space text-[10px] font-bold text-center"><span>GOLDENHOUR DELHI © 2026</span><span>BUILD. IMPROVE. REPEAT.</span></div></footer>
-    </main>
+      <footer id="contact" className="bg-sunset gh-home-orange px-5 md:px-10 py-16"><div className="max-w-[1200px] mx-auto grid md:grid-cols-[1.15fr_.85fr_1fr] gap-10 items-start text-center"><div><p className="font-space text-xs font-bold tracking-widest mb-5">GOLDENHOUR DELHI / DELHI NCR / INDIA</p><TechHeading lines={["LET'S BUILD", { text: "TOGETHER.", className: "text-offwhite" }]} className="font-archivo text-5xl md:text-7xl leading-[.8]" /><a href="mailto:hello@goldenhourdelhi.co.in" className="inline-block font-archivo text-xl underline underline-offset-4 mt-8">hello@goldenhourdelhi.co.in</a><div className="flex justify-center gap-4 mt-6"><a href="https://www.linkedin.com/company/goldenhourdelhi/" target="_blank" rel="noopener noreferrer" aria-label="GoldenHour on LinkedIn" className="p-3 border-2 border-black hover:bg-black hover:text-sunset transition-colors"><LinkedinMark /></a><a href="https://www.instagram.com/goldenhour.delhi/" target="_blank" rel="noopener noreferrer" aria-label="GoldenHour on Instagram" className="p-3 border-2 border-black hover:bg-black hover:text-sunset transition-colors"><InstagramMark /></a></div></div><div><p className="font-space text-[10px] font-bold tracking-[.16em] mb-5">MAIN WEBSITE</p><nav aria-label="Main website pages" className="flex flex-col gap-3 font-space text-xs"><a href="#about" className="hover:underline">ABOUT</a><a href="#events" className="hover:underline">HACKATHONS</a><a href="#founders" className="hover:underline">FOUNDERS</a><a href="#contact" className="hover:underline">CONTACT</a></nav></div><div><p className="font-space text-[10px] font-bold tracking-[.16em] mb-5">EVENT &amp; LEGAL</p><nav aria-label="Event and legal pages" className="flex flex-col gap-3 font-space text-xs"><a href="/goldenhour" className="hover:underline">GOLDENHOUR V1</a><a href="/goldenhour#faq" className="hover:underline">FAQ</a><a href="/code-of-conduct" className="hover:underline">CODE OF CONDUCT</a><a href="/privacy" className="hover:underline">PRIVACY</a><a href="/terms" className="hover:underline">TERMS</a></nav></div></div><div className="max-w-[1200px] mx-auto mt-16 pt-5 border-t border-black/30 flex flex-col md:flex-row justify-between gap-3 font-space text-[10px] font-bold text-center"><span>GOLDENHOUR DELHI © 2026</span><span>BUILD. IMPROVE. REPEAT.</span></div></footer>
+    </main></>
   );
 }
diff --git a/src/app/privacy/page.tsx b/src/app/privacy/page.tsx
index 2825d60..e80fdae 100644
--- a/src/app/privacy/page.tsx
+++ b/src/app/privacy/page.tsx
@@ -14,6 +14,7 @@ export default function PrivacyPage() {
     <section><h2 className="font-archivo text-2xl text-black mb-3">AGE VERIFICATION</h2><p>At check-in, organizers may view a school ID, Aadhaar, passport, or birth certificate solely to verify that a participant is eligible. Organizers will not copy, photograph, or store the identity document. Please do not email us a copy of an identity document.</p></section>
     <section><h2 className="font-archivo text-2xl text-black mb-3">WEBSITE ANALYTICS &amp; COOKIES</h2><p>Optional, privacy-conscious analytics run only if you allow them in the cookie banner. You can choose essential storage only. The site stores your choice so it can honor that preference; essential storage may still be used for site functionality.</p></section>
     <section><h2 className="font-archivo text-2xl text-black mb-3">RETENTION, ACCESS &amp; DELETION</h2><p>We do not publish a fixed retention period for registration responses. To request a copy of registration information, ask for a correction, or request deletion, email <a className="underline text-sunset" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a>. The organizing team aims to respond within 30 days. A request about a participant under 18 may be sent by their parent or legal guardian.</p></section>
+    <section><h2 className="font-archivo text-2xl text-black mb-3">PENDING POLICY CONFIRMATION</h2><p>[CONFIRM: data controller and authorised Google Form processors; retention periods and deletion schedule for accounts, registrations and check-in records; guardian consent and photo/video consent processes]. These operational details require organiser and legal review, including applicable obligations under India’s DPDP framework. This notice does not claim legal compliance.</p></section>
     <section><h2 className="font-archivo text-2xl text-black mb-3">CONTACT</h2><p>For privacy questions, contact the GoldenHour organizing team at <a className="underline text-sunset" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a>.</p></section>
   </div></article></main>;
 }
diff --git a/src/app/sitemap.ts b/src/app/sitemap.ts
index 1f6d6dd..5a088a3 100644
--- a/src/app/sitemap.ts
+++ b/src/app/sitemap.ts
@@ -3,5 +3,5 @@ import { eventConfig } from "@/lib/event";
 import { siteUrl } from "./metadata";
 
 export default function sitemap(): MetadataRoute.Sitemap {
-  return ["/", "/goldenhour", "/about", "/privacy", "/terms", "/code-of-conduct", "/guardian-consent"].map((path) => ({ url: `${siteUrl || eventConfig.siteUrl}${path}`, lastModified: new Date(eventConfig.lastUpdated), changeFrequency: path === "/privacy" || path === "/terms" || path === "/code-of-conduct" ? "yearly" : "weekly", priority: path === "/" || path === "/goldenhour" ? 1 : 0.6 }));
+  return ["/", "/goldenhour", "/about", "/parents", "/privacy", "/terms", "/code-of-conduct", "/guardian-consent"].map((path) => ({ url: `${siteUrl || eventConfig.siteUrl}${path}`, lastModified: new Date(eventConfig.lastUpdated), changeFrequency: path === "/privacy" || path === "/terms" || path === "/code-of-conduct" ? "yearly" : "weekly", priority: path === "/" || path === "/goldenhour" ? 1 : 0.6 }));
 }
diff --git a/src/app/terms/page.tsx b/src/app/terms/page.tsx
index 1974bb1..85693e9 100644
--- a/src/app/terms/page.tsx
+++ b/src/app/terms/page.tsx
@@ -13,6 +13,7 @@ export default function TermsPage() {
     <section><h2 className="font-archivo text-2xl text-black mb-3">SUBMISSION DEADLINE</h2><p>Project submissions close at <strong>5:00 PM IST sharp</strong> on event day. Required submission materials include a public project repository, a README and a working demo link. Late submissions cannot be accepted. The organizing team will publish the submission instructions before the event.</p></section>
     <section><h2 className="font-archivo text-2xl text-black mb-3">AWARDS</h2><p>A winning team receives one GoldenHour trophy per team. CodeCrafters VIP memberships and other participant prizes are awarded per participant as described in the published prize details. First, second and third place depend on the number of eligible teams and the judges’ evaluation. A position may remain unawarded if there are too few eligible submissions or judging criteria are not met. Placements and prizes are not guaranteed. Sponsor benefits may have limited quantities, eligibility requirements, redemption deadlines or pending activation. The n8n Cloud Pro offer is limited to 80 one-month licenses, not guaranteed to all attendees. The Fueler Digital Bundle and InterviewBuddy participant discount are provisional until sponsor confirmation and distribution details are finalized.</p></section>
     <section><h2 className="font-archivo text-2xl text-black mb-3">CODE OF CONDUCT</h2><p>All attendees must follow the <Link className="underline text-sunset" href="/code-of-conduct">GoldenHour Code of Conduct</Link> and reasonable venue and event-safety instructions. The organizers may take proportionate action for rule violations, including removal from an activity or event or disqualification where appropriate.</p></section>
+    <section><h2 className="font-archivo text-2xl text-black mb-3">PENDING LEGAL REVIEW</h2><p>[CONFIRM: participant ownership of projects; limited judging/promotional licence; liability wording; cancellation, weather and venue-change notices; appeals and disqualification process]. These terms require organiser and legal review before relying on them as a complete agreement.</p></section>
     <section><h2 className="font-archivo text-2xl text-black mb-3">CONTACT</h2><p>Questions about these terms can be sent to <a className="underline text-sunset" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a>.</p></section>
   </div></article></main>;
 }
diff --git a/src/app/thank-you/page.tsx b/src/app/thank-you/page.tsx
index b58deee..db9e788 100644
--- a/src/app/thank-you/page.tsx
+++ b/src/app/thank-you/page.tsx
@@ -1,10 +1,10 @@
 import Link from "next/link";
 import { ArrowLeft, ArrowUpRight } from "lucide-react";
-import { eventConfig } from "@/lib/event";
+import { primaryRegistration } from "@/lib/event";
 import { pageMetadata } from "../metadata";
 
 export const metadata = { ...pageMetadata("GoldenHour V1 Registration Form", "Open the official GoldenHour V1 team-registration form.", "/thank-you"), robots: { index: false, follow: true } };
 
 export default function RegistrationPage() {
-  return <main className="min-h-screen gh-grain-sunset px-5 md:px-12 py-24 grid place-items-center"><div className="max-w-[850px] w-full mx-auto text-center"><p className="font-space text-xs font-bold tracking-[.18em] mb-7">TEAM REGISTRATION / OPEN</p><h1 className="font-archivo text-6xl sm:text-8xl md:text-9xl leading-[.78]">BUILD<br />WITH US<span className="text-offwhite">.</span></h1><p className="font-dm text-lg md:text-2xl max-w-2xl mx-auto mt-10">Use the official form to register your team. One team leader submits the form and includes each team member. The event takes place on 14 November 2026; the venue will be announced.</p><div className="flex flex-wrap justify-center gap-3 mt-8"><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn px-6 py-4">OPEN REGISTRATION FORM <ArrowUpRight size={16} /></a><Link href="/goldenhour" className="brutal-btn-outline px-6 py-4">EVENT DETAILS <ArrowLeft size={15} /></Link></div></div></main>;
+  return <main className="min-h-screen gh-grain-sunset px-5 md:px-12 py-24 grid place-items-center"><div className="max-w-[850px] w-full mx-auto text-center"><p className="font-space text-xs font-bold tracking-[.18em] mb-7">{primaryRegistration.message}</p><h1 className="font-archivo text-6xl sm:text-8xl md:text-9xl leading-[.78]">BUILD<br />WITH US<span className="text-offwhite">.</span></h1><p className="font-dm text-lg md:text-2xl max-w-2xl mx-auto mt-10">This page opens the registration form; it does not confirm a submitted registration. After submitting, read the Google Form confirmation screen. [CONFIRM: organiser acknowledgement, acceptance process and response time]. Use the official form to register your team. One team leader submits the form and includes each team member. The event takes place on 14 November 2026; the venue will be announced.</p><div className="flex flex-wrap justify-center gap-3 mt-8"><a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className="brutal-btn px-6 py-4">{primaryRegistration.label} <ArrowUpRight size={16} /></a><Link href="/goldenhour" className="brutal-btn-outline px-6 py-4">EVENT DETAILS <ArrowLeft size={15} /></Link></div></div></main>;
 }
diff --git a/src/components/About.tsx b/src/components/About.tsx
index 28c9824..5d379b6 100644
--- a/src/components/About.tsx
+++ b/src/components/About.tsx
@@ -1,6 +1,6 @@
 import TechHeading from "@/components/TechHeading";
 import { ArrowUpRight } from "lucide-react";
-import { eventConfig } from "@/lib/event";
+import { eventConfig, primaryRegistration } from "@/lib/event";
 
 export default function About() {
   return <section id="about" className="bg-offwhite py-20 md:py-28 px-5 md:px-10 relative overflow-hidden dot-pattern gh-grain-paper"><div className="max-w-[1200px] mx-auto relative z-10">
@@ -9,7 +9,7 @@ export default function About() {
       <div className="space-y-8 reveal-left delay-1"><blockquote className="font-archivo text-2xl sm:text-3xl md:text-4xl text-black leading-snug text-center">&ldquo;We don&apos;t wait for perfect conditions. We build in the dark, break things in the light, and ship before sunrise.&rdquo;</blockquote><p className="font-dm text-base md:text-lg text-black/70 leading-relaxed text-center max-w-2xl mx-auto">GoldenHour Delhi is a gathering point for students who want to build, compete, and create things that push boundaries.</p><div className="flex items-center justify-center gap-4 py-2"><div className="w-16 h-1.5 bg-sunset" aria-hidden="true" /><span className="font-space text-[10px] font-bold uppercase tracking-widest text-black/50">DELHI NCR / INDIA / 2026</span></div>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 max-w-3xl mx-auto text-center">{[[eventConfig.duration, "BUILD DAY"], [eventConfig.teamSize.split(" ")[0], "TEAM SIZE"], ["AGES 13–19", "ON EVENT DAY"]].map(([value, label]) => <div key={label} className="brutal-card gh-ink-card p-4 md:p-5 min-h-[104px] flex flex-col justify-center"><p className="font-archivo text-xl md:text-2xl text-sunset">{value}</p><p className="font-space text-[9px] font-bold uppercase mt-2">{label}</p></div>)}</div>
       </div>
-      <div className="reveal-right delay-2 max-w-[480px] mx-auto w-full"><div className="brutal-card gh-ink-card p-8 md:p-10 bg-offwhite relative"><div className="absolute -top-5 -right-5 w-24 h-24 rounded-full border-2 border-black bg-sunset flex flex-col items-center justify-center shadow-[4px_4px_0_#050505] rotate-12"><span className="font-space text-[9px] font-bold text-black uppercase">STUDENT</span><span className="font-archivo text-xs text-black">POWERED</span></div><div className="space-y-6 text-center">{[["WHO", "STUDENTS / BUILDERS / DESIGNERS / MAKERS"], ["WHERE", eventConfig.location], ["WHEN", eventConfig.date], ["WHY", "BECAUSE WAITING IS BORING."]].map(([label, value]) => <div key={label} className="border-b border-black/10 pb-5 last:border-0 last:pb-0"><p className="font-space text-[10px] text-black/40 uppercase font-bold mb-2">{label}</p><p className="font-space text-xs font-bold text-sunset uppercase leading-relaxed">{value}</p></div>)}</div></div><div className="brutal-card-black gh-ink-card p-7 mt-7 shadow-[7px_7px_0_#ff5a00] text-center"><h3 className="font-archivo text-lg text-offwhite mb-3">YOUR NEXT BUILD STARTS HERE.</h3><p className="font-space text-xs text-offwhite/70 leading-relaxed mb-5">Free entry. Registration is open. 14 November 2026 is confirmed. Venue details will be announced.</p><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange w-full py-3 text-xs justify-center">REGISTER NOW <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
+      <div className="reveal-right delay-2 max-w-[480px] mx-auto w-full"><div className="brutal-card gh-ink-card p-8 md:p-10 bg-offwhite relative"><div className="absolute -top-5 -right-5 w-24 h-24 rounded-full border-2 border-black bg-sunset flex flex-col items-center justify-center shadow-[4px_4px_0_#050505] rotate-12"><span className="font-space text-[9px] font-bold text-black uppercase">STUDENT</span><span className="font-archivo text-xs text-black">POWERED</span></div><div className="space-y-6 text-center">{[["WHO", "STUDENTS / BUILDERS / DESIGNERS / MAKERS"], ["WHERE", eventConfig.location], ["WHEN", eventConfig.date], ["WHY", "BECAUSE WAITING IS BORING."]].map(([label, value]) => <div key={label} className="border-b border-black/10 pb-5 last:border-0 last:pb-0"><p className="font-space text-[10px] text-black/40 uppercase font-bold mb-2">{label}</p><p className="font-space text-xs font-bold text-sunset uppercase leading-relaxed">{value}</p></div>)}</div></div><div className="brutal-card-black gh-ink-card p-7 mt-7 shadow-[7px_7px_0_#ff5a00] text-center"><h3 className="font-archivo text-lg text-offwhite mb-3">YOUR NEXT BUILD STARTS HERE.</h3><p className="font-space text-xs text-offwhite/70 leading-relaxed mb-5">Free entry. {primaryRegistration.message} 14 November 2026 is confirmed. Venue details will be announced.</p><a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className="brutal-btn-orange w-full py-3 text-xs justify-center">{primaryRegistration.label} <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
     </div>
   </div></section>;
 }
diff --git a/src/components/CookieBanner.tsx b/src/components/CookieBanner.tsx
index d0b2710..48c006b 100644
--- a/src/components/CookieBanner.tsx
+++ b/src/components/CookieBanner.tsx
@@ -9,5 +9,5 @@ export default function CookieBanner() {
   const hasConsent = useSyncExternalStore(subscribe, getConsent, getServerConsent);
   const choose = (value: "accepted" | "declined") => { try { window.localStorage.setItem("gh-cookie-consent", value); } catch { /* Optional storage may be blocked by the browser. */ } window.dispatchEvent(new Event("gh-cookie-consent")); };
   if (hasConsent) return null;
-  return <aside className="cookie-banner fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] md:bottom-4 left-3 right-3 md:left-auto md:right-6 md:max-w-[420px] z-[70] bg-black text-offwhite border-2 border-sunset p-4 md:p-5 shadow-[7px_7px_0_#ff5a00]" role="dialog" aria-label="Cookie preferences"><p className="font-space text-[10px] text-sunset tracking-[.14em] mb-3">COOKIE CHECK</p><p className="font-dm text-sm text-offwhite/75 leading-relaxed">We use essential storage for your preferences and optional privacy-conscious analytics to improve the event site.</p><div className="flex flex-wrap justify-center gap-3 mt-4"><button type="button" onClick={() => choose("accepted")} className="brutal-btn-orange px-4 py-3 text-[10px]">ALLOW OPTIONAL</button><button type="button" onClick={() => choose("declined")} className="brutal-btn-outline border-offwhite/40 text-offwhite px-4 py-3 text-[10px] hover:border-black">ESSENTIAL ONLY</button></div></aside>;
+  return <aside className="cookie-banner fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] md:bottom-4 left-3 right-3 md:left-auto md:right-6 md:max-w-[420px] z-[70] bg-black text-offwhite border-2 border-sunset p-4 md:p-5 shadow-[7px_7px_0_#ff5a00]" role="dialog" aria-label="Cookie preferences"><p className="font-space text-[10px] text-sunset tracking-[.14em] mb-3">COOKIE CHECK</p><p className="font-dm text-sm text-offwhite/75 leading-relaxed">We use essential storage for your preferences and optional privacy-conscious analytics to improve the event site.</p><div className="flex flex-wrap justify-center gap-3 mt-4"><button type="button" onClick={() => choose("accepted")} className="brutal-btn-orange px-4 py-3 text-[10px]">ALLOW OPTIONAL</button><button type="button" onClick={() => choose("declined")} className="brutal-btn-orange px-4 py-3 text-[10px]">ESSENTIAL ONLY</button></div></aside>;
 }
diff --git a/src/components/Countdown.tsx b/src/components/Countdown.tsx
index 5208827..0f4a4fb 100644
--- a/src/components/Countdown.tsx
+++ b/src/components/Countdown.tsx
@@ -19,13 +19,16 @@ function remaining(): TimeLeft {
 }
 
 export default function Countdown() {
+  const [now, setNow] = useState<number | null>(null);
   const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
   useEffect(() => {
-    const update = () => setTimeLeft(remaining());
+    const update = () => { setTimeLeft(remaining()); setNow(Date.now()); };
     const first = setTimeout(update, 0);
     const interval = setInterval(update, 1000);
     return () => { clearTimeout(first); clearInterval(interval); };
   }, []);
+  const started = timeLeft !== null && Object.values(timeLeft).every((value) => value === 0);
+  const finished = started && now !== null && now >= new Date(eventConfig.endIsoDate).getTime();
   const units = [
     { value: timeLeft?.days, label: "DAYS" },
     { value: timeLeft?.hours, label: "HOURS" },
@@ -42,14 +45,14 @@ export default function Countdown() {
         <TechHeading className="font-archivo text-4xl md:text-6xl text-offwhite" lines={["THE CLOCK", {"text": "IS RUNNING.", "className": "text-sunset"}]} />
         <p className="font-space text-[10px] text-offwhite/45 uppercase leading-relaxed mt-6"><time dateTime={eventConfig.isoDate}>SATURDAY, {eventConfig.date} / 08:00 AM IST</time> / {eventConfig.location} / <span className="text-offwhite/75">12 HOURS OF MAKING</span></p>
       </div>
-      <div role="timer" aria-label="Time until GoldenHour starts" aria-live="off" className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-5 border-t border-offwhite/15 pt-10 max-w-[1080px] mx-auto">
+      {started ? <p role="status" className="font-archivo text-4xl text-offwhite">{finished ? "THIS EDITION HAS FINISHED." : "THE BUILD DAY IS LIVE."}</p> : <div role="timer" aria-label="Time until GoldenHour starts" aria-live="off" className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-5 border-t border-offwhite/15 pt-10 max-w-[1080px] mx-auto">
         {units.map(item => <div key={item.label} className="text-center">
           <div className="font-archivo text-[18vw] sm:text-[15vw] md:text-[8vw] text-offwhite leading-none">
             {item.value === undefined ? <span aria-label="Loading countdown">--</span> : <Counter value={item.value} minDigits={2} direction="down" duration={0.45} bounce={0.12} fontSize="inherit" fade={0.12} />}
           </div>
           <span className="font-space text-[9px] md:text-[10px] text-offwhite/40 uppercase tracking-widest font-bold block mt-4">{item.label}</span>
         </div>)}
-      </div>
+      </div>}
     </div>
   </section>;
 }
diff --git a/src/components/EventInfo.tsx b/src/components/EventInfo.tsx
index 15dee1e..b1ecc1e 100644
--- a/src/components/EventInfo.tsx
+++ b/src/components/EventInfo.tsx
@@ -6,5 +6,5 @@ const criteria = ["FUNCTIONALITY", "TECHNICAL IMPLEMENTATION", "UX / DESIGN", "I
 const requirements = ["Public GitHub repository", "README.md explaining the project and disclosing AI tools used", "Working deployed or demo link", "Clear project name and team details"];
 
 export default function EventInfo() {
-  return <><section id="judging" className="bg-sunset gh-grain-sunset py-20 md:py-28 px-5 md:px-10"><div className="max-w-[1100px] mx-auto"><header className="text-center max-w-3xl mx-auto mb-14"><div className="inline-block font-space text-[10px] font-bold bg-black text-offwhite px-3 py-1 mb-6 uppercase">08 / JUDGING</div><TechHeading className="font-archivo text-5xl sm:text-6xl md:text-8xl" lines={["WHAT GETS", "NOTICED?"]} /><p className="font-space text-xs md:text-sm text-black/65 max-w-lg mx-auto mt-6">Projects will be reviewed across four clear areas. Exact judging weights are TO BE ANNOUNCED.</p></header><div className="grid sm:grid-cols-2 gap-5">{criteria.map((criterion, index) => <article key={criterion} className="perforated-panel border-2 border-black bg-offwhite p-7 md:p-9 text-center shadow-[6px_6px_0_#050505]"><span className="font-archivo text-4xl text-sunset">0{index + 1}</span><h3 className="font-archivo text-xl md:text-2xl lg:text-3xl text-black mt-5">{criterion}</h3><p className="font-space text-[10px] uppercase text-black/50 tracking-[.12em] mt-5">WEIGHT / TO BE ANNOUNCED</p></article>)}</div></div></section><section id="submission" className="bg-black text-offwhite gh-grain-night py-20 md:py-28 px-5 md:px-10"><div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-8"><article className="brutal-card-black gh-ink-card border-offwhite/30 p-8 md:p-10 text-center flex flex-col items-center"><p className="font-space text-[10px] text-sunset font-bold uppercase tracking-[.16em]">09 / SUBMISSION REQUIREMENTS</p><TechHeading className="font-archivo text-4xl md:text-6xl mt-6" lines={["MAKE IT", {"text": "REVIEWABLE.", "className": "text-sunset"}]} /><ul className="mt-8 text-center space-y-4">{requirements.map((requirement) => <li key={requirement} className="font-dm text-sm text-offwhite/75 flex justify-center gap-3 items-center"><CheckCircle2 size={18} className="text-sunset shrink-0" />{requirement}</li>)}</ul><p className="font-space text-[10px] text-offwhite/45 uppercase tracking-[.12em] mt-8">Submissions close at 5:00 PM IST sharp. No late submissions can be accepted.</p></article><article id="venue" className="brutal-card-black border-offwhite/30 p-8 md:p-10 text-center"><p className="font-space text-[10px] text-sunset font-bold uppercase tracking-[.16em]">10 / VENUE</p><TechHeading className="font-archivo text-4xl md:text-6xl mt-6" lines={["VENUE", {"text": "TBA.", "className": "text-sunset"}]} /><p className="font-dm text-base text-offwhite/70 leading-relaxed mt-8">The GoldenHour V1 venue will be announced separately. We will publish the address, nearest metro, Wi-Fi and power details once confirmed.</p><div className="grid grid-cols-2 gap-3 mt-8">{["ADDRESS / TO BE ANNOUNCED", "NEAREST METRO / TO BE ANNOUNCED", "WI-FI / TO BE ANNOUNCED", "POWER / TO BE ANNOUNCED"].map((item) => <div key={item} className="border border-offwhite/25 p-4 font-space text-[9px] text-offwhite/55 uppercase text-center">{item}</div>)}</div></article></div><div id="help" className="perforated-panel max-w-[900px] mx-auto mt-8 border-2 border-sunset bg-black p-7 text-center"><p className="font-space text-[10px] text-sunset uppercase tracking-[.16em] font-bold">NEED A HAND?</p><h3 className="font-archivo text-3xl md:text-5xl mt-4 text-offwhite">ASK THE TEAM<span className="text-sunset">.</span></h3><div className="flex flex-wrap justify-center gap-3 mt-7"><a className="brutal-btn-outline border-sunset bg-black text-sunset" href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer">WHATSAPP <ArrowUpRight size={15} /></a><a className="brutal-btn-outline border-sunset bg-black text-sunset" href="mailto:hello@goldenhourdelhi.co.in">EMAIL <ArrowUpRight size={15} /></a><a className="brutal-btn-outline border-sunset bg-black text-sunset" href="https://www.instagram.com/goldenhour.delhi/" target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={15} /></a><a className="brutal-btn-outline border-sunset bg-black text-sunset" href="https://www.linkedin.com/company/goldenhourdelhi/" target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={15} /></a></div></div></section></>;
+  return <><section id="judging" className="bg-sunset gh-grain-sunset py-20 md:py-28 px-5 md:px-10"><div className="max-w-[1100px] mx-auto"><header className="text-center max-w-3xl mx-auto mb-14"><div className="inline-block font-space text-[10px] font-bold bg-black text-offwhite px-3 py-1 mb-6 uppercase">08 / JUDGING</div><TechHeading className="font-archivo text-5xl sm:text-6xl md:text-8xl" lines={["WHAT GETS", "NOTICED?"]} /><p className="font-space text-xs md:text-sm text-black/65 max-w-lg mx-auto mt-6">Projects will be reviewed across four clear areas. [CONFIRM: judging weights, tie-break policy and judge conflict-of-interest process].</p></header><div className="grid sm:grid-cols-2 gap-5">{criteria.map((criterion, index) => <article key={criterion} className="perforated-panel border-2 border-black bg-offwhite p-7 md:p-9 text-center shadow-[6px_6px_0_#050505]"><span className="font-archivo text-4xl text-sunset">0{index + 1}</span><h3 className="font-archivo text-xl md:text-2xl lg:text-3xl text-black mt-5">{criterion}</h3><p className="font-space text-[10px] uppercase text-black/50 tracking-[.12em] mt-5">WEIGHT / [CONFIRM: judging weight]</p></article>)}</div></div></section><section id="submission" className="bg-black text-offwhite gh-grain-night py-20 md:py-28 px-5 md:px-10"><div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-8"><article className="brutal-card-black gh-ink-card border-offwhite/30 p-8 md:p-10 text-center flex flex-col items-center"><p className="font-space text-[10px] text-sunset font-bold uppercase tracking-[.16em]">09 / SUBMISSION REQUIREMENTS</p><TechHeading className="font-archivo text-4xl md:text-6xl mt-6" lines={["MAKE IT", {"text": "REVIEWABLE.", "className": "text-sunset"}]} /><ul className="mt-8 text-center space-y-4">{requirements.map((requirement) => <li key={requirement} className="font-dm text-sm text-offwhite/75 flex justify-center gap-3 items-center"><CheckCircle2 size={18} className="text-sunset shrink-0" />{requirement}</li>)}</ul><p className="font-space text-[10px] text-offwhite/45 uppercase tracking-[.12em] mt-8">Submissions close at 5:00 PM IST sharp. No late submissions can be accepted.</p></article><article id="venue" className="brutal-card-black border-offwhite/30 p-8 md:p-10 text-center"><p className="font-space text-[10px] text-sunset font-bold uppercase tracking-[.16em]">10 / VENUE</p><TechHeading className="font-archivo text-4xl md:text-6xl mt-6" lines={["VENUE", {"text": "TBA.", "className": "text-sunset"}]} /><p className="font-dm text-base text-offwhite/70 leading-relaxed mt-8">The GoldenHour V1 venue will be announced separately. We will publish the address, nearest metro, Wi-Fi and power details once confirmed.</p><div className="grid grid-cols-2 gap-3 mt-8">{["ADDRESS / TO BE ANNOUNCED", "NEAREST METRO / TO BE ANNOUNCED", "WI-FI / TO BE ANNOUNCED", "POWER / TO BE ANNOUNCED"].map((item) => <div key={item} className="border border-offwhite/25 p-4 font-space text-[9px] text-offwhite/55 uppercase text-center">{item}</div>)}</div></article></div><div id="help" className="perforated-panel max-w-[900px] mx-auto mt-8 border-2 border-sunset bg-black p-7 text-center"><p className="font-space text-[10px] text-sunset uppercase tracking-[.16em] font-bold">NEED A HAND?</p><h3 className="font-archivo text-3xl md:text-5xl mt-4 text-offwhite">ASK THE TEAM<span className="text-sunset">.</span></h3><div className="flex flex-wrap justify-center gap-3 mt-7"><a className="brutal-btn-outline border-sunset bg-black text-sunset" href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noopener noreferrer">WHATSAPP <ArrowUpRight size={15} /></a><a className="brutal-btn-outline border-sunset bg-black text-sunset" href="mailto:hello@goldenhourdelhi.co.in">EMAIL <ArrowUpRight size={15} /></a><a className="brutal-btn-outline border-sunset bg-black text-sunset" href="https://www.instagram.com/goldenhour.delhi/" target="_blank" rel="noopener noreferrer">INSTAGRAM <ArrowUpRight size={15} /></a><a className="brutal-btn-outline border-sunset bg-black text-sunset" href="https://www.linkedin.com/company/goldenhourdelhi/" target="_blank" rel="noopener noreferrer">LINKEDIN <ArrowUpRight size={15} /></a></div></div></section></>;
 }
diff --git a/src/components/FAQ.tsx b/src/components/FAQ.tsx
index fd34efc..0fe9be7 100644
--- a/src/components/FAQ.tsx
+++ b/src/components/FAQ.tsx
@@ -3,7 +3,7 @@
 import TechHeading from "@/components/TechHeading";
 import { useState } from "react";
 import { ArrowUpRight } from "lucide-react";
-import { faqItems, eventConfig } from "@/lib/event";
+import { primaryRegistration, faqItems, eventConfig } from "@/lib/event";
 
 export default function FAQ() {
   const [openIndex, setOpenIndex] = useState<number | null>(null);
@@ -11,7 +11,7 @@ export default function FAQ() {
     <div className="max-w-[850px] mx-auto relative z-10">
       <div className="text-center mb-10 reveal gh-section-head"><div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-4 uppercase shadow-[2px_2px_0_#050505]">QUESTIONS & ANSWERS</div><TechHeading className="font-archivo text-4xl sm:text-6xl md:text-7xl text-black" lines={["FREQUENTLY", "ASKED."]} /></div>
       <div className="space-y-3">{faqItems.map((faq, index) => { const isOpen = openIndex === index; return <article key={faq.q} className="brutal-card bg-offwhite gh-faq-item"><h3><button id={`faq-question-${index}`} type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} className="w-full min-h-14 p-5 md:p-6 flex items-center justify-between text-left gap-4" onClick={() => setOpenIndex(isOpen ? null : index)}><span className="font-archivo text-sm md:text-base text-black">{faq.q}</span><span className="font-space text-xl md:text-2xl text-sunset shrink-0 w-8 h-8 flex items-center justify-center border border-black/10" aria-hidden="true">{isOpen ? "×" : "+"}</span></button></h3>{isOpen && <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className="px-5 md:px-6 pb-5 md:pb-6 pt-3 border-t border-black/10"><p className="font-dm text-sm text-black/70 leading-relaxed">{faq.a} {faq.detail}</p></div>}</article>; })}</div>
-      <div className="mt-10 text-center"><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange">REGISTER NOW <ArrowUpRight size={16} aria-hidden="true" /></a><p className="font-space text-[10px] text-black/55 mt-4">Questions? <a className="underline underline-offset-4" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a></p></div>
+      <div className="mt-10 text-center"><a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className="brutal-btn-orange">REGISTER NOW <ArrowUpRight size={16} aria-hidden="true" /></a><p className="font-space text-[10px] text-black/55 mt-4">Questions? <a className="underline underline-offset-4" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a></p></div>
     </div>
   </section>;
 }
diff --git a/src/components/FinalCTA.tsx b/src/components/FinalCTA.tsx
index 1094cdf..9b024c5 100644
--- a/src/components/FinalCTA.tsx
+++ b/src/components/FinalCTA.tsx
@@ -1,17 +1,17 @@
 import TechHeading from "@/components/TechHeading";
 import { ArrowUpRight, Mail } from "lucide-react";
-import { eventConfig } from "@/lib/event";
+import { primaryRegistration, eventConfig } from "@/lib/event";
 
 export default function FinalCTA() {
   return <section id="register" className="bg-sunset gh-grain-sunset py-24 md:py-36 px-5 md:px-12 relative overflow-hidden border-t-4 border-black">
     <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true"><div className="absolute -right-16 -top-16 w-72 h-72 rounded-full border-[3px] border-black" /><div className="absolute right-4 top-4 w-56 h-56 rounded-full border border-black" /><div className="absolute left-[8%] bottom-16 w-16 h-16 border-2 border-black rotate-45" /></div>
     <div className="max-w-[980px] mx-auto relative z-10 reveal text-center">
-      <div className="flex items-center justify-center gap-3 mb-7"><span className="w-3 h-3 bg-black" aria-hidden="true" /><p className="font-space text-xs text-black/65 uppercase tracking-[.18em] font-bold">PARTICIPANT REGISTRATION / OPEN</p></div>
+      <div className="flex items-center justify-center gap-3 mb-7"><span className="w-3 h-3 bg-black" aria-hidden="true" /><p className="font-space text-xs text-black/65 uppercase tracking-[.18em] font-bold">{primaryRegistration.message}</p></div>
       <TechHeading className="font-archivo text-[16vw] md:text-[9vw] lg:text-[7.5rem] text-black leading-[.79] mb-8" lines={["REGISTER", "NOW."]} />
       <p className="font-dm text-lg md:text-2xl text-black/70 max-w-2xl mx-auto leading-snug">Register through the official form. Participants must be at least 13 and under 20 on 14 November 2026 (ages 13–19 on event day).</p>
       <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-10 justify-center">
-        <a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn px-8 py-5 text-sm md:text-base">OPEN REGISTRATION FORM <ArrowUpRight size={18} aria-hidden="true" /></a>
-        <a href={eventConfig.volunteerUrl} target="_blank" rel="noreferrer" className="brutal-btn-outline px-8 py-5 text-sm md:text-base">VOLUNTEER WITH US <ArrowUpRight size={18} aria-hidden="true" /></a>
+        <a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className="brutal-btn px-8 py-5 text-sm md:text-base">{primaryRegistration.label} <ArrowUpRight size={18} aria-hidden="true" /></a>
+        <a href={eventConfig.volunteerUrl} target="_blank" rel="noopener noreferrer" className="brutal-btn-outline px-8 py-5 text-sm md:text-base">VOLUNTEER WITH US <ArrowUpRight size={18} aria-hidden="true" /></a>
         <a href={`mailto:${eventConfig.contactEmail}`} className="inline-flex items-center justify-center gap-2 font-space text-xs font-bold uppercase underline underline-offset-4 hover:no-underline">Questions? Email us <Mail size={15} aria-hidden="true" /></a>
       </div>
       <p className="font-space text-[10px] text-black/65 mt-7">One team leader submits one form for the team and includes each member. Under-18s need parent/guardian consent and a signed slip at check-in.</p>
diff --git a/src/components/Footer.tsx b/src/components/Footer.tsx
index 328478c..85be6b4 100644
--- a/src/components/Footer.tsx
+++ b/src/components/Footer.tsx
@@ -1,7 +1,7 @@
 "use client";
 
 import Image from "next/image";
-import { eventConfig } from "@/lib/event";
+import { primaryRegistration, eventConfig } from "@/lib/event";
 
 const explore = [["ABOUT", "#about"], ["TRACKS", "#events"], ["TIMELINE", "#timeline"], ["RULES", "#rules"], ["PRIZES", "#prizes"], ["FAQ", "#faq"]];
 
@@ -15,9 +15,9 @@ export default function Footer() {
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 py-14 md:py-16 text-center">
         <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">THE ORGANIZING TEAM</p><address className="not-italic font-space text-xs text-offwhite/65 leading-loose">GOLDENHOUR DELHI<br />DELHI NCR<br /><a href={`mailto:${eventConfig.contactEmail}`} className="text-offwhite underline underline-offset-4 hover:text-sunset">{eventConfig.contactEmail}</a></address></div>
-        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">EXPLORE THE EVENT</p><ul className="font-space text-xs space-y-3 text-offwhite/65">{explore.map(([label, href]) => <li key={href}><a href={href} className="hover:text-offwhite transition-colors">{label}</a></li>)}</ul></div>
-        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">GET INVOLVED</p><ul className="font-space text-xs space-y-3 text-offwhite/65"><li><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="text-sunset hover:text-offwhite">PARTICIPANT REGISTRATION — OPEN</a></li><li><a href={eventConfig.volunteerUrl} target="_blank" rel="noreferrer" className="hover:text-sunset">VOLUNTEER FORM</a></li><li><a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer" className="hover:text-sunset">WHATSAPP COMMUNITY</a></li><li><a href={eventConfig.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-sunset">INSTAGRAM</a></li><li><a href={eventConfig.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-sunset">LINKEDIN</a></li></ul></div>
-        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">POLICIES</p><ul className="font-space text-xs space-y-3 text-offwhite/65"><li><a href="/code-of-conduct" className="hover:text-offwhite">CODE OF CONDUCT</a></li><li><a href="/privacy" className="hover:text-offwhite">PRIVACY</a></li><li><a href="/terms" className="hover:text-offwhite">TERMS</a></li><li><a href="/guardian-consent" className="hover:text-offwhite">GUARDIAN CONSENT SLIP</a></li></ul></div>
+        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">EXPLORE THE EVENT</p><ul className="font-space text-xs space-y-3 text-offwhite/65">{explore.map(([label, href]) => <li key={href}><a href={`/goldenhour${href}`} className="hover:text-offwhite transition-colors">{label}</a></li>)}</ul></div>
+        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">GET INVOLVED</p><ul className="font-space text-xs space-y-3 text-offwhite/65"><li><a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className="text-sunset hover:text-offwhite">{primaryRegistration.label}</a></li><li><a href={eventConfig.volunteerUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sunset">VOLUNTEER FORM</a></li><li><a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sunset">WHATSAPP COMMUNITY</a></li><li><a href={eventConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sunset">INSTAGRAM</a></li><li><a href={eventConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sunset">LINKEDIN</a></li></ul></div>
+        <div><p className="font-space text-[10px] font-bold text-sunset uppercase tracking-[.16em] mb-5">POLICIES</p><ul className="font-space text-xs space-y-3 text-offwhite/65"><li><a href="/code-of-conduct" className="hover:text-offwhite">CODE OF CONDUCT</a></li><li><a href="/parents" className="hover:text-offwhite">PARENTS &amp; GUARDIANS</a></li><li><a href="/privacy" className="hover:text-offwhite">PRIVACY</a></li><li><a href="/terms" className="hover:text-offwhite">TERMS</a></li><li><a href="/guardian-consent" className="hover:text-offwhite">GUARDIAN CONSENT SLIP</a></li></ul></div>
       </div>
       <div className="pt-7 border-t border-offwhite/15 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 text-center"><p className="font-space text-[10px] text-offwhite/45 tracking-[.08em]">MADE BY TEENS. FOR TEENS.</p><a href="#hero" className="font-space text-[10px] text-offwhite/45 hover:text-offwhite transition-colors">BACK TO TOP ↑</a></div>
     </div>
diff --git a/src/components/Hero.tsx b/src/components/Hero.tsx
index 6961d78..3d15323 100644
--- a/src/components/Hero.tsx
+++ b/src/components/Hero.tsx
@@ -2,7 +2,7 @@ import TechHeading from "@/components/TechHeading";
 import { ArrowDown, ArrowUpRight } from "lucide-react";
 import InteractiveBackground from "@/components/InteractiveBackground";
 import CursorGuides from "@/components/CursorGuides";
-import { eventConfig } from "@/lib/event";
+import { eventConfig, primaryRegistration } from "@/lib/event";
 
 const details = [["WHEN", eventConfig.date], ["WHERE", eventConfig.location], ["DURATION", eventConfig.duration], ["ENTRY", eventConfig.entry]];
 
@@ -12,7 +12,7 @@ export default function Hero() {
       <CursorGuides />
       <div className="gh-edition-stamp" aria-hidden="true"><span>ISSUE NO.</span><strong>01 / 26</strong><span>DELHI NCR</span></div>
       <div className="hero-background absolute inset-0 z-0 pointer-events-none" aria-hidden="true"><InteractiveBackground /></div>
-      <div className="relative z-10 w-full max-w-[1200px] mx-auto pt-32 pb-28 text-center flex flex-col items-center"><div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8 font-space text-[10px] uppercase tracking-[.18em]"><span className="text-offwhite/55">DELHI NCR / INDIA</span><span className="text-sunset">AGES 13–19 ON EVENT DAY</span><span className="flex items-center gap-3 text-offwhite"><span className="h-2.5 w-2.5 bg-sunset animate-[pulse-dot_1.5s_ease-in-out_infinite]" aria-hidden="true" />REGISTRATION OPEN</span></div><TechHeading as="h1" className="font-archivo text-[clamp(2.5rem,7.5vw,7rem)] leading-[.8] tracking-[-.08em] max-w-[1050px] mx-auto gh-hero-type" lines={["GOLDENHOUR", {"text": "V1.", "className": "text-sunset"}]} /><div className="mt-10 max-w-[760px] mx-auto flex flex-col items-center gap-8"><p className="font-dm text-lg md:text-2xl text-offwhite/70 max-w-lg leading-snug">A free 12-hour hackathon for students across Delhi NCR. Pick Web Development, Game Development or Graphic Designing — and build something real.</p><div className="hero-cta w-full flex flex-wrap items-center justify-center gap-x-7 gap-y-4"><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange px-7 py-4 mx-0">REGISTER NOW <ArrowUpRight size={16} /></a><a href={eventConfig.volunteerUrl} target="_blank" rel="noreferrer" className="gh-hero-mini-link">VOLUNTEER WITH US <ArrowUpRight size={16} /></a><a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer" className="gh-hero-mini-link">JOIN WHATSAPP COMMUNITY <ArrowUpRight size={16} /></a></div><p className="font-space text-[10px] text-offwhite/70 uppercase tracking-[.14em] gh-hero-subline">14 NOVEMBER 2026 / 08:00-20:00 IST. Venue details to be announced. One form per team.</p></div><div className="mt-8 md:mt-14 pt-6 border-t border-offwhite/20 w-full max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 text-center max-[400px]:hidden">{details.map(([label, value]) => <div key={label}><p className="font-space text-[9px] text-offwhite/40 uppercase tracking-[.16em] mb-2">{label}</p><p className="font-space text-xs text-offwhite font-bold">{value}</p></div>)}</div></div>
+      <div className="relative z-10 w-full max-w-[1200px] mx-auto pt-32 pb-28 text-center flex flex-col items-center"><div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8 font-space text-[10px] uppercase tracking-[.18em]"><span className="text-offwhite/55">DELHI NCR / INDIA</span><span className="text-sunset">AGES 13–19 ON EVENT DAY</span><span className="flex items-center gap-3 text-offwhite"><span className="h-2.5 w-2.5 bg-sunset animate-[pulse-dot_1.5s_ease-in-out_infinite]" aria-hidden="true" />{primaryRegistration.message}</span></div><TechHeading as="h1" className="font-archivo text-[clamp(2.5rem,7.5vw,7rem)] leading-[.8] tracking-[-.08em] max-w-[1050px] mx-auto gh-hero-type" lines={["GOLDENHOUR", {"text": "V1.", "className": "text-sunset"}]} /><div className="mt-10 max-w-[760px] mx-auto flex flex-col items-center gap-8"><p className="font-dm text-lg md:text-2xl text-offwhite/70 max-w-lg leading-snug">A free 12-hour hackathon for students across Delhi NCR. Pick Web Development, Game Development or Graphic Designing — and build something real.</p><div className="hero-cta w-full flex flex-wrap items-center justify-center gap-x-7 gap-y-4"><a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className="brutal-btn-orange px-7 py-4 mx-0">{primaryRegistration.label} <ArrowUpRight size={16} /></a><a href={eventConfig.volunteerUrl} target="_blank" rel="noopener noreferrer" className="gh-hero-mini-link">VOLUNTEER WITH US <ArrowUpRight size={16} /></a><a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noopener noreferrer" className="gh-hero-mini-link">JOIN WHATSAPP COMMUNITY <ArrowUpRight size={16} /></a></div><p className="font-space text-[10px] text-offwhite/70 uppercase tracking-[.14em] gh-hero-subline">14 NOVEMBER 2026 / 08:00-20:00 IST. Venue details to be announced. One form per team.</p></div><div className="mt-8 md:mt-14 pt-6 border-t border-offwhite/20 w-full max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 text-center max-[400px]:hidden">{details.map(([label, value]) => <div key={label}><p className="font-space text-[9px] text-offwhite/40 uppercase tracking-[.16em] mb-2">{label}</p><p className="font-space text-xs text-offwhite font-bold">{value}</p></div>)}</div></div>
       <a href="#about" className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 font-space text-[10px] uppercase tracking-[.18em] text-offwhite/50 hover:text-sunset" aria-label="Scroll to learn more">SCROLL TO START <ArrowDown size={14} /></a><div className="absolute bottom-0 left-0 w-full h-1 bg-sunset" />
     </section>
   );
diff --git a/src/components/IntroLoader.tsx b/src/components/IntroLoader.tsx
index b15f2e8..98021dd 100644
--- a/src/components/IntroLoader.tsx
+++ b/src/components/IntroLoader.tsx
@@ -1,30 +1 @@
-"use client";
-
-import Image from "next/image";
-import { useEffect, useState } from "react";
-
-export default function IntroLoader() {
-  const [leaving, setLeaving] = useState(false);
-  const [visible, setVisible] = useState(true);
-
-  useEffect(() => {
-    const leaveTimer = window.setTimeout(() => setLeaving(true), 1200);
-    const removeTimer = window.setTimeout(() => setVisible(false), 1750);
-    return () => {
-      window.clearTimeout(leaveTimer);
-      window.clearTimeout(removeTimer);
-    };
-  }, []);
-
-  if (!visible) return null;
-
-  return (
-    <div className={`intro-loader ${leaving ? "is-leaving" : ""}`} aria-hidden="true">
-      <div className="text-center intro-loader-mark">
-        <Image src="/brand/goldenhour-symbol.png" alt="" width={500} height={500} priority className="mx-auto w-28 h-28 md:w-36 md:h-36 object-contain" />
-        <div className="font-archivo text-6xl md:text-8xl tracking-tighter mt-5">GH<span className="text-sunset">.</span></div>
-        <p className="font-space text-[10px] text-offwhite/55 tracking-[.2em] mt-6">LOADING THE HOUR...</p>
-      </div>
-    </div>
-  );
-}
+export default function IntroLoader() { return null; }
diff --git a/src/components/Marquee.tsx b/src/components/Marquee.tsx
index 477d376..bd3277e 100644
--- a/src/components/Marquee.tsx
+++ b/src/components/Marquee.tsx
@@ -1,3 +1,5 @@
+"use client";
+import { useState } from "react";
 interface MarqueeProps {
   reverse?: boolean;
   speed?: number;
@@ -6,6 +8,7 @@ interface MarqueeProps {
 }
 
 export default function Marquee({ reverse = false, speed = 35, bg = "bg-black", borderColor = "border-sunset" }: MarqueeProps) {
+  const [paused, setPaused] = useState(false);
   const items = [
     "GOLDENHOUR",
     "BUILD SOMETHING",
@@ -22,11 +25,12 @@ export default function Marquee({ reverse = false, speed = 35, bg = "bg-black",
   ];
 
   return (
-    <section className={`${bg} gh-marquee-print overflow-hidden border-y-2 ${borderColor} py-4 md:py-5 w-full`} aria-hidden="true">
-      <div className="overflow-hidden whitespace-nowrap">
+    <section className={`${bg} gh-marquee-print overflow-hidden border-y-2 ${borderColor} py-4 md:py-5 w-full`}>
+      <button type="button" className="font-space text-xs min-h-11 px-4 text-offwhite bg-black" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "RESUME MOTION" : "PAUSE MOTION"}</button>
+      <div aria-hidden="true" className="overflow-hidden whitespace-nowrap">
         <div
           className="inline-flex whitespace-nowrap font-archivo text-xl md:text-3xl lg:text-4xl"
-          style={{
+          style={{ animationPlayState: paused ? "paused" : "running",
             animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
           }}
         >
diff --git a/src/components/MobileCTA.tsx b/src/components/MobileCTA.tsx
index ca41e17..6f00a66 100644
--- a/src/components/MobileCTA.tsx
+++ b/src/components/MobileCTA.tsx
@@ -1,11 +1,11 @@
 import { ArrowUpRight } from "lucide-react";
-import { eventConfig } from "@/lib/event";
+import { eventConfig, primaryRegistration } from "@/lib/event";
 
 export default function MobileCTA() {
   return <div className="mobile-cta fixed bottom-0 left-0 right-0 z-40 px-3 pt-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] md:hidden bg-black/95 border-t-2 border-sunset">
     <div className="max-w-[720px] mx-auto grid grid-cols-2 gap-2">
-      <a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange w-full py-3 px-2 text-[10px] text-center" aria-label="Open the GoldenHour participant registration form in a new tab">REGISTER NOW <ArrowUpRight size={13} aria-hidden="true" /></a>
-      <a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer" className="brutal-btn-outline border-sunset text-sunset w-full py-3 px-2 text-[10px]">JOIN COMMUNITY <ArrowUpRight size={13} aria-hidden="true" /></a>
+      <a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className="brutal-btn-orange w-full py-3 px-2 text-[10px] text-center" aria-label="Open the GoldenHour participant registration form in a new tab">{primaryRegistration.label} <ArrowUpRight size={13} aria-hidden="true" /></a>
+      <a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noopener noreferrer" className="brutal-btn-outline border-sunset text-sunset w-full py-3 px-2 text-[10px]">JOIN COMMUNITY <ArrowUpRight size={13} aria-hidden="true" /></a>
     </div>
   </div>;
 }
diff --git a/src/components/Navbar.tsx b/src/components/Navbar.tsx
index 4417610..c587336 100644
--- a/src/components/Navbar.tsx
+++ b/src/components/Navbar.tsx
@@ -5,7 +5,7 @@ import { ArrowUpRight, Menu, X } from "lucide-react";
 import Image from "next/image";
 import Link from "next/link";
 import { usePathname } from "next/navigation";
-import { eventConfig } from "@/lib/event";
+import { eventConfig, primaryRegistration } from "@/lib/event";
 import ThemeToggle from "./ThemeToggle";
 import styles from "./Navigation.module.css";
 
@@ -72,7 +72,7 @@ export default function Navbar() {
         </Link>
         <div className="hidden lg:flex min-w-0 flex-1 items-center justify-center gap-3 xl:gap-5">
           {links.map((link) => <a key={link.hash} href={destination(link.hash)} aria-current={active === link.hash ? "location" : undefined} className={`${styles.eventLink} font-space tracking-[.02em] whitespace-nowrap transition-colors ${active === link.hash ? "text-sunset" : "text-offwhite/70 hover:text-sunset"}`}>{link.label}</a>)}
-          <a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className={`${styles.register} font-space tracking-[.02em] whitespace-nowrap text-black bg-sunset hover:bg-offwhite transition-colors`} aria-label="Open the participant registration form in a new tab">REGISTER <ArrowUpRight size={16} aria-hidden="true" /></a>
+          <a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className={`${styles.register} font-space tracking-[.02em] whitespace-nowrap text-black bg-sunset hover:bg-offwhite transition-colors`} aria-label="Open the participant registration form in a new tab">{primaryRegistration.label} <ArrowUpRight size={16} aria-hidden="true" /></a>
         </div>
         <div className={`${styles.eventActions} text-offwhite`}><ThemeToggle /><button id="mobile-navigation-trigger" type="button" className={`${styles.menuButton} text-offwhite p-2`} onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-navigation"><Menu size={24} aria-hidden="true" /></button></div>
       </div>
@@ -83,9 +83,9 @@ export default function Navbar() {
         <button id="mobile-navigation-close" type="button" className={`${styles.menuButton} text-offwhite hover:text-sunset p-2`} onClick={close} aria-label="Close navigation menu"><X size={28} aria-hidden="true" /></button>
       </div>
       <div className="flex flex-col items-center gap-3 w-full max-w-sm border-y border-offwhite/20 py-6">
-        <p className="font-space text-xs tracking-[.08em] text-sunset text-center">REGISTRATION IS OPEN</p>
-        <a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange w-full px-8 py-4 text-sm justify-center" onClick={close}>REGISTER NOW <ArrowUpRight size={16} aria-hidden="true" /></a>
-        <a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer" className="brutal-btn-outline border-sunset text-sunset bg-black w-full px-8 py-4 text-sm justify-center" onClick={close}>JOIN COMMUNITY <ArrowUpRight size={16} aria-hidden="true" /></a>
+        <p className="font-space text-xs tracking-[.08em] text-sunset text-center">{primaryRegistration.message}</p>
+        <a href={primaryRegistration.href} target="_blank" rel="noopener noreferrer" className="brutal-btn-orange w-full px-8 py-4 text-sm justify-center" onClick={close}>{primaryRegistration.label} <ArrowUpRight size={16} aria-hidden="true" /></a>
+        <a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noopener noreferrer" className="brutal-btn-outline border-sunset text-sunset bg-black w-full px-8 py-4 text-sm justify-center" onClick={close}>JOIN COMMUNITY <ArrowUpRight size={16} aria-hidden="true" /></a>
       </div>
       <div className="flex flex-col items-center gap-5 w-full py-2">
         {links.map((link) => <a key={link.hash} href={destination(link.hash)} className={`font-archivo text-2xl ${active === link.hash ? "text-sunset" : "text-offwhite hover:text-sunset"}`} onClick={close}>{link.label}</a>)}
diff --git a/src/components/Organizers.tsx b/src/components/Organizers.tsx
index acb1de9..4d8f16a 100644
--- a/src/components/Organizers.tsx
+++ b/src/components/Organizers.tsx
@@ -1,27 +1,14 @@
 "use client";
 
+import { team } from "@/lib/team";
 import TechHeading from "@/components/TechHeading";
 import { ArrowUpRight } from "lucide-react";
 
 type Person = { num: string; name: string; role: string };
 
 const groups: Array<{ title: string; people: Person[]; tone: "dark" | "sunset" | "light" }> = [
-  {
-    title: "LEAD ORGANISERS",
-    tone: "dark",
-    people: [
-      { num: "01", name: "ABHINAV GOYAL", role: "LEAD ORGANISER / BUILDER" },
-      { num: "02", name: "DIVYA", role: "LEAD ORGANISER / BUILDER" },
-      { num: "03", name: "ANURAG", role: "LEAD ORGANISER" },
-    ],
-  },
-  {
-    title: "CO-ORGANISERS",
-    tone: "sunset",
-    people: [
-      { num: "04", name: "YASHPAL YADAV", role: "CO-ORGANISER" },
-    ],
-  },
+ { title: "LEAD ORGANISERS", tone: "dark", people: team.filter((person) => person.group === "lead") },
+ { title: "CO-ORGANISERS", tone: "sunset", people: team.filter((person) => person.group === "co") },
 ];
 
 const toneClasses = {
diff --git a/src/components/Prizes.tsx b/src/components/Prizes.tsx
index 769f533..ae7ccb1 100644
--- a/src/components/Prizes.tsx
+++ b/src/components/Prizes.tsx
@@ -65,7 +65,7 @@ export default function Prizes() {
         </div>
       </div>
 
-      <p className="font-space text-[9px]' text-offwhite/40 uppercase mt-8 text-center">Prize sponsor: <a href={eventConfig.codeCraftersUrl} target="_blank" rel="noreferrer" className="underline hover:text-sunset">CodeCrafters</a> · Gift sponsor: {eventConfig.giftSponsor}</p>
+      <p className="font-space text-[9px]' text-offwhite/40 uppercase mt-8 text-center">Prize sponsor: <a href={eventConfig.codeCraftersUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-sunset">CodeCrafters</a> · Gift sponsor: {eventConfig.giftSponsor}</p>
     </div>
   </section>;
 }
diff --git a/src/components/Resources.tsx b/src/components/Resources.tsx
index d406e7d..f1a1394 100644
--- a/src/components/Resources.tsx
+++ b/src/components/Resources.tsx
@@ -29,5 +29,5 @@ export default function Resources() {
     }
   };
 
-    return <section id="resources" className="bg-black text-offwhite py-20 md:py-28 px-5 md:px-10 relative overflow-hidden gh-grain-night"><div className="max-w-[1200px] mx-auto relative z-10"><header className="text-center max-w-3xl mx-auto mb-12 reveal gh-section-head"><div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-6 uppercase">07 / RESOURCES</div><TechHeading className="font-archivo text-5xl sm:text-6xl md:text-8xl" lines={["TOOLS FOR", {"text": "YOUR SPRINT.", "className": "text-sunset"}]} /><p className="font-space text-xs md:text-sm text-offwhite/55 max-w-lg mx-auto mt-6 leading-relaxed">Use the tools that help you build. All open-source frameworks, engines and templates are allowed unless the official rules say otherwise.</p></header><div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filter resources">{filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} onClick={() => changeFilter(item)} className={`font-space text-[10px] font-bold tracking-[.08em] uppercase border-2 px-3 py-2 transition-colors ${filter === item ? "bg-sunset text-black border-sunset" : "bg-black text-offwhite border-offwhite/40 hover:border-sunset hover:text-sunset"}`}>{item}</button>)}</div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{displayed.map((resource) => <article key={resource.id} className="brutal-card-black gh-ink-card border-offwhite/30 p-6 flex flex-col items-center min-h-[300px] text-center"><div className="flex items-center justify-center gap-4 w-full"><span className="font-space text-[9px] text-sunset tracking-[.14em] uppercase font-bold">{resource.category}</span><span className="font-space text-[9px] text-offwhite/45 uppercase">{resource.track.replace(" DEVELOPMENT", "")}</span></div><h3 className="font-archivo text-2xl md:text-3xl text-offwhite mt-8">{resource.title}</h3><p className="font-dm text-sm text-offwhite/60 leading-relaxed mt-4">{resource.description}</p><div className="mt-auto pt-6 w-full"><code className="block text-center bg-black border border-offwhite/20 p-3 text-[10px] leading-relaxed text-sunset break-words">{resource.command}</code><div className="flex flex-wrap justify-center gap-2 mt-4"><button onClick={() => copyCommand(resource)} className="brutal-btn-outline border-sunset text-sunset px-3 py-2 text-[10px]" aria-label={`${copied === resource.id ? "Copied" : "Copy"} ${resource.title} starter command`}>{copied === resource.id ? <><Check size={13} /> COPIED</> : <><Copy size={13} /> COPY</>}</button><a href={resource.url} target={resource.url.startsWith("#") ? undefined : "_blank"} rel={resource.url.startsWith("#") ? undefined : "noreferrer"} className="brutal-btn-orange px-3 py-2 text-[10px]">DOCS <ArrowUpRight size={13} /></a></div></div></article>)}</div>{visible.length > 3 && <div className="flex justify-center mt-8"><button onClick={() => setShowAll((current) => !current)} aria-expanded={showAll} className="brutal-btn-orange px-6 py-4 text-xs">{showAll ? <><EyeOff size={16} /> SHOW LESS</> : <><Eye size={16} /> SHOW ALL ({visible.length})</>}</button></div>}<div className="perforated-panel mt-10 border-2 border-sunset bg-sunset text-black p-6 text-center"><p className="font-space text-xs font-bold uppercase tracking-[.14em]">RULES OF USE</p><p className="font-dm text-sm mt-2 max-w-2xl mx-auto">AI tools and open-source libraries are allowed only if this matches the official rules. If you are unsure, check with the organizers before using them.</p></div></div></section>;
+    return <section id="resources" className="bg-black text-offwhite py-20 md:py-28 px-5 md:px-10 relative overflow-hidden gh-grain-night"><div className="max-w-[1200px] mx-auto relative z-10"><header className="text-center max-w-3xl mx-auto mb-12 reveal gh-section-head"><div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-6 uppercase">07 / RESOURCES</div><TechHeading className="font-archivo text-5xl sm:text-6xl md:text-8xl" lines={["TOOLS FOR", {"text": "YOUR SPRINT.", "className": "text-sunset"}]} /><p className="font-space text-xs md:text-sm text-offwhite/55 max-w-lg mx-auto mt-6 leading-relaxed">Use the tools that help you build. All open-source frameworks, engines and templates are allowed unless the official rules say otherwise.</p></header><div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filter resources">{filters.map((item) => <button key={item} aria-pressed={filter === item} onClick={() => changeFilter(item)} className={`font-space text-[10px] font-bold tracking-[.08em] uppercase border-2 px-3 py-2 transition-colors ${filter === item ? "bg-sunset text-black border-sunset" : "bg-black text-offwhite border-offwhite/40 hover:border-sunset hover:text-sunset"}`}>{item}</button>)}</div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{displayed.map((resource) => <article key={resource.id} className="brutal-card-black gh-ink-card border-offwhite/30 p-6 flex flex-col items-center min-h-[300px] text-center"><div className="flex items-center justify-center gap-4 w-full"><span className="font-space text-[9px] text-sunset tracking-[.14em] uppercase font-bold">{resource.category}</span><span className="font-space text-[9px] text-offwhite/45 uppercase">{resource.track.replace(" DEVELOPMENT", "")}</span></div><h3 className="font-archivo text-2xl md:text-3xl text-offwhite mt-8">{resource.title}</h3><p className="font-dm text-sm text-offwhite/60 leading-relaxed mt-4">{resource.description}</p><div className="mt-auto pt-6 w-full"><code className="block text-center bg-black border border-offwhite/20 p-3 text-[10px] leading-relaxed text-sunset break-words">{resource.command}</code><div className="flex flex-wrap justify-center gap-2 mt-4"><button onClick={() => copyCommand(resource)} className="brutal-btn-outline border-sunset text-sunset px-3 py-2 text-[10px]" aria-label={`${copied === resource.id ? "Copied" : "Copy"} ${resource.title} starter command`}>{copied === resource.id ? <><Check size={13} /> COPIED</> : <><Copy size={13} /> COPY</>}</button><a href={resource.url} target={resource.url.startsWith("#") ? undefined : "_blank"} rel={resource.url.startsWith("#") ? undefined : "noreferrer"} className="brutal-btn-orange px-3 py-2 text-[10px]">DOCS <ArrowUpRight size={13} /></a></div></div></article>)}</div>{visible.length > 3 && <div className="flex justify-center mt-8"><button onClick={() => setShowAll((current) => !current)} aria-expanded={showAll} className="brutal-btn-orange px-6 py-4 text-xs">{showAll ? <><EyeOff size={16} /> SHOW LESS</> : <><Eye size={16} /> SHOW ALL ({visible.length})</>}</button></div>}<div className="perforated-panel mt-10 border-2 border-sunset bg-sunset text-black p-6 text-center"><p className="font-space text-xs font-bold uppercase tracking-[.14em]">RULES OF USE</p><p className="font-dm text-sm mt-2 max-w-2xl mx-auto">AI tools and open-source libraries are allowed only if this matches the official rules. If you are unsure, check with the organizers before using them.</p></div></div></section>;
 }
diff --git a/src/components/Sponsors.tsx b/src/components/Sponsors.tsx
index 4b82dbe..88a9e01 100644
--- a/src/components/Sponsors.tsx
+++ b/src/components/Sponsors.tsx
@@ -54,7 +54,7 @@ export default function Sponsors() {
           const centeredLastCard = sponsors.length % 2 === 1 && index === sponsors.length - 1 ? "sm:col-span-2 sm:max-w-[538px] sm:mx-auto w-full" : "";
           const className = `${cardClass} ${toneClass} ${centeredLastCard}`;
           return sponsor.href
-            ? <a key={sponsor.name} href={sponsor.href} target="_blank" rel="noreferrer" className={className}><SponsorContent sponsor={sponsor} /></a>
+            ? <a key={sponsor.name} href={sponsor.href} target="_blank" rel="noopener noreferrer" className={className}><SponsorContent sponsor={sponsor} /></a>
             : <article key={sponsor.name} className={className}><SponsorContent sponsor={sponsor} /></article>;
         })}
       </div>
@@ -63,7 +63,7 @@ export default function Sponsors() {
         <h3 className="font-archivo text-4xl md:text-6xl leading-[.82]">SPONSOR<br />SLOTS<br /><span className="text-offwhite">OPEN.</span></h3>
         <p className="font-dm text-base md:text-lg mt-8 max-w-md mx-auto leading-relaxed">Want to support student builders or sponsor a future GOLDENHOUR edition? Email the organizing team to start a conversation.</p>
         <a href="mailto:hello@goldenhourdelhi.co.in?subject=GOLDENHOUR%20sponsorship" className="font-space text-xs font-bold uppercase flex items-center justify-center gap-2 mt-8 hover:text-offwhite">CONTACT US TO SPONSOR <ArrowUpRight size={15} aria-hidden="true" /></a>
-        <a href={eventConfig.volunteerUrl} target="_blank" rel="noreferrer" className="font-space text-xs font-bold uppercase flex items-center justify-center gap-2 mt-5 text-black/65 hover:text-offwhite">VOLUNTEER WITH US <ArrowUpRight size={15} aria-hidden="true" /></a>
+        <a href={eventConfig.volunteerUrl} target="_blank" rel="noopener noreferrer" className="font-space text-xs font-bold uppercase flex items-center justify-center gap-2 mt-5 text-black/65 hover:text-offwhite">VOLUNTEER WITH US <ArrowUpRight size={15} aria-hidden="true" /></a>
       </div>
       <p className="font-space text-[10px] text-offwhite/55 uppercase tracking-[.16em] mt-10 text-center reveal">GOLDENHOUR / CODECRAFTERS / INTERVIEW BUDDY / OSEN / SEWAN FOODS / N8N</p>
     </div>
diff --git a/src/components/StructuredData.tsx b/src/components/StructuredData.tsx
index 67c8656..f6a605f 100644
--- a/src/components/StructuredData.tsx
+++ b/src/components/StructuredData.tsx
@@ -1,4 +1,4 @@
-import { eventConfig, faqItems } from "@/lib/event";
+import { primaryRegistration, eventConfig, faqItems } from "@/lib/event";
 
 const organization = {
   "@type": "Organization",
@@ -23,7 +23,7 @@ export function EventStructuredData() {
     "@id": `${eventConfig.siteUrl}/goldenhour#event`,
     name: "GoldenHour V1 — Free 12-Hour Student Build Day",
     alternateName: eventConfig.alternateName,
-    description: `${eventConfig.description} Event date is 14 November 2026; venue is to be announced. Registration is open.`,
+    description: `${eventConfig.description} Event date is 14 November 2026; venue is to be announced. ${primaryRegistration.message}`,
     startDate: eventConfig.isoDate,
     endDate: eventConfig.endIsoDate,
     eventStatus: "https://schema.org/EventScheduled",
@@ -37,7 +37,8 @@ export function EventStructuredData() {
       { "@type": "Organization", name: eventConfig.giftSponsor },
     ],
     isAccessibleForFree: true,
-    offers: { "@type": "Offer", url: eventConfig.registrationUrl, price: 0, priceCurrency: "INR", availability: "https://schema.org/InStock", description: "Free registration is open." },
+    offers: { "@type": "Offer", url: eventConfig.registrationUrl, price: 0, priceCurrency: "INR", availability: eventConfig.registrationOpen ? "https://schema.org/InStock" : "https://schema.org/SoldOut", description: primaryRegistration.message },
+    typicalAgeRange: "13-19",
     audience: { "@type": "Audience", audienceType: "Participants aged 13–19 on the event date (under 20)" },
     image: `${eventConfig.siteUrl}/og/goldenhour.png`,
   };
diff --git a/src/components/admin/AccountEditor.tsx b/src/components/admin/AccountEditor.tsx
index 79578a7..4b563a2 100644
--- a/src/components/admin/AccountEditor.tsx
+++ b/src/components/admin/AccountEditor.tsx
@@ -100,7 +100,7 @@ export default function AccountEditor({ account, onSaved }: { account: AdminAcco
       <h3 className={s.sectionHeading}>Event ticket</h3>
       <p className={s.hint}>Generate a unique QR ticket for this account. Scanning it marks entry for the configured event.</p>
       <button className={s.button} type="button" onClick={generateTicket} disabled={busy}>Generate participant ticket</button>
-      {ticketUrl && <a className={s.link} href={ticketUrl} target="_blank" rel="noreferrer">Open generated ticket</a>}
+      {ticketUrl && <a className={s.link} href={ticketUrl} target="_blank" rel="noopener noreferrer">Open generated ticket</a>}
     </div>
   </section>;
 }
diff --git a/src/components/admin/AccountsDashboard.tsx b/src/components/admin/AccountsDashboard.tsx
index 1e877c3..1041c6a 100644
--- a/src/components/admin/AccountsDashboard.tsx
+++ b/src/components/admin/AccountsDashboard.tsx
@@ -81,7 +81,7 @@ export default function AccountsDashboard({ initial }: { initial: AccountList })
         <AccountEditor key={detail.account.id} account={detail.account} onSaved={updateAccount} />
         <TicketUpload key={`tickets-${detail.account.id}`} userId={detail.account.id} onUploaded={(ticket) => setDetail((current) => current?.account.id === ticket.userId ? { ...current, tickets: [ticket, ...current.tickets] } : current)} />
         <section className={s.section} aria-labelledby="member-tickets-heading"><h3 id="member-tickets-heading" className={s.sectionHeading}>Assigned tickets</h3>
-          {!detail.tickets.length ? <p className={s.hint}>No tickets have been added to this account.</p> : <ul className={s.ticketList}>{detail.tickets.map((ticket) => <li className={`${s.ticket} perforated-panel`} key={ticket.id}><h4>{ticket.eventName}</h4>{ticket.eventDate && <p className={s.hint}>{new Date(`${ticket.eventDate}T00:00:00Z`).toLocaleDateString("en-IN", { dateStyle: "long", timeZone: "UTC" })}</p>}{ticket.venue && <p className={s.hint}>{ticket.venue}</p>}<span className={`${s.status} ${ticket.status === "checked-in" ? s.checkedIn : ""}`}>{ticket.status === "checked-in" ? "Checked in" : "Ready for entry"}</span><div><a href={ticket.imageUrl} target="_blank" rel="noreferrer">Open ticket image ↗</a></div></li>)}</ul>}
+          {!detail.tickets.length ? <p className={s.hint}>No tickets have been added to this account.</p> : <ul className={s.ticketList}>{detail.tickets.map((ticket) => <li className={`${s.ticket} perforated-panel`} key={ticket.id}><h4>{ticket.eventName}</h4>{ticket.eventDate && <p className={s.hint}>{new Date(`${ticket.eventDate}T00:00:00Z`).toLocaleDateString("en-IN", { dateStyle: "long", timeZone: "UTC" })}</p>}{ticket.venue && <p className={s.hint}>{ticket.venue}</p>}<span className={`${s.status} ${ticket.status === "checked-in" ? s.checkedIn : ""}`}>{ticket.status === "checked-in" ? "Checked in" : "Ready for entry"}</span><div><a href={ticket.imageUrl} target="_blank" rel="noopener noreferrer">Open ticket image ↗</a></div></li>)}</ul>}
         </section>
       </>}
     </section>
diff --git a/src/components/auth/LoginLink.tsx b/src/components/auth/LoginLink.tsx
index 1e8b55b..d028abe 100644
--- a/src/components/auth/LoginLink.tsx
+++ b/src/components/auth/LoginLink.tsx
@@ -7,7 +7,7 @@ import s from "./Auth.module.css";
 
 export default function LoginLink() {
   const { data: session } = authClient.useSession();
-  return <Link href="/login" className={s.loginLink}>
-    <UserRound size={15} aria-hidden="true" />{session ? "Account" : "Log in"}
+  return <Link href="/login" className={s.loginLink} title="Manage your profile and view private event tickets">
+    <UserRound size={15} aria-hidden="true" />{session ? "Account" : "My tickets"}
   </Link>;
 }
diff --git a/src/lib/event.ts b/src/lib/event.ts
index 1748a17..d5247f8 100644
--- a/src/lib/event.ts
+++ b/src/lib/event.ts
@@ -1,3 +1,6 @@
+import { team } from "./team";
+import { registrationAction, registrationCopy, type RegistrationStatus } from "./registration";
+export const registrationStatus: RegistrationStatus = "open";
 export const eventConfig = {
   siteName: "GoldenHour Delhi",
   entityName: "GoldenHour",
@@ -18,7 +21,8 @@ export const eventConfig = {
   minimumAge: 13,
   teamSize: "1–3 participants",
   participantLimit: "100+ students",
-  registrationOpen: true,
+  registrationStatus,
+  registrationOpen: registrationStatus === "open",
   tracks: ["Web Development", "Game Development", "Graphic Designing"],
   prizes: ["$100 worth of Fueler Premium per winner", "AI Interview Vouchers worth ₹550 for winners", "90% AI Interview Discount Vouchers for runners-up", "Digital certificates", "Provisional: Fueler Digital Bundle ($800 stated value) for participants", "Provisional: InterviewBuddy 10% expert-driven session discount for participants", "CodeCrafters VIP memberships", "GoldenHour trophies", "80 sponsored one-month n8n Cloud Pro licenses ($60 value each; limited allocation)", "Certificates", "Stickers"],
   registrationUrl: "https://forms.gle/2om1zTVv5FCau56r5",
@@ -32,22 +36,31 @@ export const eventConfig = {
   contactEmail: "hello@goldenhourdelhi.co.in",
   instagramUrl: "https://www.instagram.com/goldenhour.delhi/",
   linkedinUrl: "https://www.linkedin.com/company/goldenhourdelhi/",
-  founders: ["Abhinav Goyal", "Divya"],
-  leadOrganizers: ["Abhinav Goyal", "Divya", "Anurag"],
-  coOrganizers: ["Yashpal Yadav"],
+  founders: team.filter((person) => person.founder).map((person) => person.name),
+  leadOrganizers: team.filter((person) => person.group === "lead").map((person) => person.name),
+  coOrganizers: team.filter((person) => person.group === "co").map((person) => person.name),
   lastUpdated: "2026-10-24",
 } as const;
 
 export const faqItems = [
+ { q: "What if I turn 20 near the event?", a: "Eligibility is measured on 14 November 2026: you must have turned 13 and must not yet have turned 20.", detail: "Participants under 18 need guardian consent." },
+ { q: "Can beginners and friends from different schools form a team?", a: "Beginners are welcome. Teams may have one, two or three eligible participants.", detail: "[CONFIRM: mixed-school team policy]. Contact the organisers before registering if your team needs clarification." },
+ { q: "Can we use AI and who owns our work?", a: "Disclose AI tools in your README, credit third-party work and follow its licences. Start the event project during the event.", detail: "[CONFIRM: participant IP ownership and any licence granted to organisers for judging or promotion]." },
+ { q: "Is accommodation available for visitors?", a: "No overnight accommodation is provided. Arrange your travel and journey home before attending.", detail: "The event ends at 8 PM IST. Guardians must arrange travel home for minors." },
+ { q: "Are there refunds or guaranteed certificates?", a: "Registration is free, so there is no registration fee to refund.", detail: "[CONFIRM: certificate eligibility, delivery method and issue date]. Do not book non-refundable travel on the assumption that event arrangements cannot change." },
+ { q: "What if the venue, date or weather changes?", a: "Check the event page and contact the team before travelling.", detail: "[CONFIRM: cancellation/postponement procedure, notification channels and timing]." },
+
   { q: "What is GoldenHour V1?", a: "A free, student-led 12-hour hackathon in Delhi NCR, scheduled for 14 November 2026.", detail: "The venue will be announced once confirmed." },
   { q: "Who can participate, and how big can teams be?", a: "Participants must be 13–19 years old on event day. Teams can have 1–3 members, including solo participants.", detail: "Participants under 18 need parent or guardian consent." },
   { q: "Which tracks are available?", a: "Web Development, Game Development and Graphic Designing.", detail: "Already registered? To switch to Graphic Designing, ask your team leader to message the organizers; you do not need to submit another form." },
-  { q: "How do we register?", a: "The team leader fills out the official registration form once for their team.", detail: "Registration is free." },
+  { q: "How do we register?", a: "The team leader fills out the official registration form once for their team.", detail: registrationCopy[registrationStatus].message },
   { q: "How are winners selected?", a: "Judges assess eligible submissions for functionality, execution, design and creativity.", detail: "First, second and third place are conditional on the number of eligible teams and judging standards. Some positions may remain unawarded." },
   { q: "What do winners receive?", a: "Each winner receives a digital certificate, $100 worth of Fueler Premium and an AI Interview Voucher worth ₹550.", detail: "Runners-up receive a 90% AI Interview Discount Voucher. Provisional participant offers: Fueler Digital Bundle (stated value $800) and InterviewBuddy 10% expert-driven session discount, subject to sponsor confirmation. There are 80 sponsored n8n Cloud Pro licenses (one month each), subject to allocation." },
   { q: "What must we submit?", a: "A project repository, README and working demonstration by the published submission deadline.", detail: "AI tools may be used if disclosed. The project must be built during the event." },
 ] as const;
 
 export const eventDateLabel = eventConfig.dateShort;
-export const eventStatusLine = `${eventDateLabel}. Venue to be announced. Registration is open.`;
+export const eventStatusLine = `${eventDateLabel}. Venue to be announced. ${registrationCopy[registrationStatus].message}`;
 export const canonicalEventPath = "/goldenhour";
+
+export const primaryRegistration = registrationAction(registrationStatus, { registration: eventConfig.registrationUrl, community: eventConfig.whatsappCommunityUrl, waitlist: `mailto:${eventConfig.contactEmail}?subject=Waitlist%20request` });

```

## Step 5 — conduct, guardians, resources and judging

The existing full Code of Conduct already covers harassment, discrimination, privacy, online conduct, intellectual property, cheating, safety, volunteer duties, reporting, consequences and enforcement. It renders on the server. A named safeguarding lead and backup are now explicitly requested rather than invented. See src/app/code-of-conduct/page.tsx for the complete maintained text. Parents page full text is provided above; Resources and Judging remain in src/components/Resources.tsx and src/components/EventInfo.tsx. Their existence resolves the audit’s missing-anchor concern.

## Step 6 — QA checklist and evidence boundaries

- Confirm each of the four registration states: CTA label, destination, FAQ, navbar, metadata and schema offer status. Unit tests exercise the four action states. End-to-end state toggling remains to be performed.
- Compare current age/date/tracks/team across home, event, FAQ, terms, metadata and structured data.
- Run production build, unit tests, TypeScript, changed-code lint and git diff checks. See delivery for actual results.
- Validate generated calendar with a calendar client: 14 November 2026, 08:00–20:00 IST.
- Verify one h1 per route, skip-link focus, heading order, FAQ controls, filter buttons, marquee pause and equal cookie controls using keyboard only.
- Test 360px, 390px, tablet and desktop; check scrollWidth vs viewport width and sticky CTA/cookie overlap. Physical-device checks have not been performed in this change.
- Test reduced motion, slow 3G, JS disabled, long content, zoom at 200% and 400%, and denied storage access.
- Run axe/WAVE, manual contrast tests, Lighthouse mobile (target >=90 in each category), structured-data validation and a full external link crawl. These scores/results are unmeasured; code changes do not establish conformance.
- Verify optional analytics makes no requests before consent and essential-only choice remains effective.
- Confirm CSP, HTTPS redirect, no-store authenticated endpoints and actual production cookie flags on hosting.

## Step 7 — re-rating

No evidence supports a newly measured overall score above the supplied 7/10 baseline. Editorial assessment: branding is preserved; content clarity improves through shared status/team data and daytime copy; trust/safety improves through visible unknowns but is blocked on operational answers; completeness improves with parents, calendar and registration guidance; SEO implementation improves with page cards and existing schema; performance improves by removing the blocking loader, but Lighthouse is unmeasured; accessibility improves in controls and skip navigation, but WCAG conformance is unverified. Do not publish a numeric upgrade as an audited result.

## Needs human confirmation
- [CONFIRM: any past-edition evidence, participant testimonials or approved photos before publishing them]
- [CONFIRM: cancellation/postponement procedure, notification channels and timing]
- [CONFIRM: certificate eligibility, delivery method and issue date]
- [CONFIRM: data controller and authorised Google Form processors; retention periods and deletion schedule for accounts, registrations and check-in records; guardian consent and photo/video consent processes]
- [CONFIRM: judging weight]
- [CONFIRM: judging weights, tie-break policy and judge conflict-of-interest process]
- [CONFIRM: meal provision, drinking water, allergens, dietary requests and venue accessibility]
- [CONFIRM: mixed-school team policy]
- [CONFIRM: named safeguarding contact]
- [CONFIRM: named safeguarding lead and backup contact]
- [CONFIRM: named safeguarding lead, supervision arrangements, staff coverage, venue access controls and check-in/out process]
- [CONFIRM: on-site first-aid provision, emergency escalation procedure and named emergency contact]
- [CONFIRM: organiser acknowledgement, acceptance process and response time]
- [CONFIRM: participant IP ownership and any licence granted to organisers for judging or promotion]
- [CONFIRM: participant ownership of projects; limited judging/promotional licence; liability wording; cancellation, weather and venue-change notices; appeals and disqualification process]
- [CONFIRM: photography consent process, guardian consent for minors, opt-out identification and removal requests]
- [CONFIRM: pickup point, authorised collection process and late-pickup contact]
- [CONFIRM: registration acknowledgement, acceptance process and response time]
- [CONFIRM: venue announcement deadline and communication process for venue, date or weather changes]
- [CONFIRM: venue announcement deadline]
- Decide whether an actual waitlist service should replace email requests.
- Confirm that Google Form settings and confirmation text match the website; configure any redirect in the form provider if supported.
- Verify team affiliations beyond their published GoldenHour roles; no DelhiHacks partnership was newly assumed.

## Needs legal review

- Minor/guardian consent, safeguarding obligations, photography/video consent and withdrawal.
- Applicable DPDP obligations, controller identity, processors, data access and deletion, retention and cross-service data handling.
- IP ownership, judging/promotional licences, third-party/AI disclosures, disqualification and appeals.
- Liability, cancellations, weather/venue changes and travel notices. No legal compliance or safe staffing claim is made.

## Prioritised launch checklist — next 48 hours

1. First 12 hours: designate safeguarding lead/backup; approve supervision, medical and pickup arrangements; confirm venue announcement date; answer every CONFIRM placeholder. Until then these pages visibly disclose unresolved arrangements.
2. Next 12 hours: organiser/legal review of minors’ consent, privacy, photo/video, retention, IP and terms; reconcile the Google Form and response process.
3. Next 12 hours: test 360/390px and desktop, keyboard/reduced-motion/slow-3G; run axe, Lighthouse and link/schema checks; resolve observed failures.
4. Final 12 hours: verify production headers, HTTPS/cookies, analytics consent and actual form submission/acknowledgement; import calendar; retest primary CTA and tickets; only then announce launch readiness.

## Verified results

Production build and TypeScript passed. All 15 unit tests passed. Changed-code ESLint passed after resolving a countdown purity issue. Runtime public-flow checks passed for home, event, parents and conduct routes; the event calendar has the expected UTC equivalents of 8 AM–8 PM IST; the parents social image is 1200×630. No Lighthouse, axe/WAVE, physical-device or contrast conformance result is claimed. The route loading fallback remains; the separate timed intro overlay was removed.
