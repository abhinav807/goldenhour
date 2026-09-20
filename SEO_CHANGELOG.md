# SEO/GEO/AEO Change Log

## Central facts file

Edit [`src/lib/event.ts`](src/lib/event.ts) first. This is the source of truth for the organization name, event date and status, venue, eligibility, team size, tracks, prizes, registration opening, partner links, contact details, founders, and last-updated date. The event page, metadata, JSON-LD, FAQ, `/about`, and `/llms.txt` consume this file.

## Files changed

| File | Change |
|---|---|
| `src/lib/event.ts` | Expanded central config and added canonical FAQ facts. |
| `src/app/metadata.ts` | Added page-specific canonical, OG, Twitter, robots, and 1200×630 image support. |
| `src/app/layout.tsx` | Updated entity naming, `en-IN`, metadata, and site-wide Organization/WebSite JSON-LD. |
| `src/app/goldenhour/layout.tsx` | Added unique event title, description, canonical, and OG image. |
| `src/app/goldenhour/page.tsx` | Added fact block, definition, FAQ/Event/Breadcrumb schema, and event status text. |
| `src/components/EventAtAGlance.tsx` | Added plain fact-first event summary. |
| `src/components/FAQ.tsx` | Switched to config-driven answer-first FAQ copy with crawlable initial HTML. |
| `src/components/StructuredData.tsx` | Added Organization, WebSite, Event, FAQPage, and BreadcrumbList JSON-LD. |
| `src/app/about/page.tsx` | Added press/media kit and fact sheet. |
| `src/app/llms.txt/route.ts` | Added generated AI-readable Markdown endpoint. |
| `src/app/robots.ts` | Added explicit search and answer crawler rules. |
| `src/app/sitemap.ts` | Added `/about`, removed utility pages, and stabilized `lastModified`. |
| `public/og/*.png` | Added 1200×630 branded social images for home, event, about, and legal pages. |

## Owner update procedure

When the date or venue is confirmed, change only `eventConfig.date`, `eventConfig.isoDate`, `eventConfig.endIsoDate`, `eventConfig.dateStatus`, and `eventConfig.venue` in `src/lib/event.ts`. If registration opens, change `registrationOpen`, `registrationOpening`, and add the approved live URL handling in the event CTA. Then run `npm ci`, `npm run lint`, `npm run build`, and the live validation checklist in `SEO_GEO_AEO_AUDIT.md`.
