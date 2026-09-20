# GoldenHour Delhi SEO, GEO and AEO Audit

**Audit date:** 20 September 2026  
**Site:** https://www.goldenhourdelhi.co.in  
**Source repository:** `abhinav807/goldenhour`

## Executive summary

The site is already server-rendering the substantive event content, and the existing brutalist visual system is strong. The highest-impact defects were route-level metadata duplication, an undersized social image, weak entity disambiguation, incomplete sitemap coverage, missing AI-readable content, and structured data that did not describe the confirmed organization and event facts consistently.

This change set addresses those defects without changing the brand direction. Event facts now live in `src/lib/event.ts` and feed the event page, answer-first FAQ, metadata, JSON-LD, `llms.txt`, the press/about page, and the fact block. The event page now has a self-referencing canonical and unique Open Graph content. New OG PNGs are 1200×630. A build-time validation still needs to run with dependencies installed before merge.

## Baseline findings

| Area | Finding | Severity | Status |
|---|---|---:|---|
| Event metadata | `/goldenhour` used the homepage title, description, canonical, and OG URL. | High | Fixed in source |
| Canonicals | `/goldenhour` canonical pointed to the homepage. | High | Fixed in source |
| Social previews | `og-image.png` was 286×131. | High | Fixed in source with 1200×630 page assets |
| Entity naming | Live copy used `GoldenHour`, `GOLDENHOUR`, `GoldenHacks`, and `GOLDEN.HOUR`; the footer also said `10H BUILD SPRINT` while the event facts said 12 hours. | Medium | Canonical usage documented; legacy copy remains for owner review |
| Disambiguation | The site did not plainly distinguish GoldenHour Delhi from the photography term. | High | Fixed on `/goldenhour` and `/about` |
| Server-rendered content | Main event headings and body sections were present in the initial HTML. | Positive | Preserved |
| FAQ crawlability | FAQ answers existed in server output but were hidden by an accordion state. | Medium | Answers remain in initial HTML and now start with direct sentences |
| Structured data | Only a minimal Event block was present; no Organization, WebSite, FAQPage, or BreadcrumbList graph. | High | Added in source |
| Sitemap | Published sitemap included utility pages such as `/thank-you` and `/empty-state` but omitted `/about` and legal breadcrumbs. | Medium | Fixed in source |
| Robots | Sitemap existed, but reputable AI/search crawler rules were not explicit. | Medium | Fixed in source |
| `llms.txt` | Route returned the 404 page. | High | Fixed in source |
| Press/entity page | No focused public media kit or fact sheet existed. | Medium | Added `/about` |
| HTTPS/canonical host | HTTPS and the non-`www` canonical host were served successfully. | Positive | Preserved |
| 404 | A branded 404 page existed and returned the 404 route content. | Positive | Preserved; keep `noindex` only |

## Lighthouse baseline

The baseline was captured against the live site with Lighthouse 12.8.2. These are lab measurements, not field Core Web Vitals.

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS | FCP |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | Mobile | 77 | 95 | 100 | 100 | 3.7 s | 0.00 | 2.5 s |
| `/goldenhour` | Mobile | 75 | 95 | 100 | 92 | 3.7 s | 0.00 | 2.6 s |
| `/` | Desktop | 59 | 95 | 100 | 100 | 3.9 s | 0.04 | 2.8 s |
| `/goldenhour` | Desktop | 57 | 95 | 100 | 92 | 4.0 s | 0.036 | 2.9 s |

The key performance gap is LCP above the 2.5-second target in this lab run. CLS is already good. The next performance pass should focus on the loader/hero image path, font loading, and non-critical client scripts; this change set avoids adding heavy client-side JavaScript.

## Implemented changes

### Technical SEO

`src/app/metadata.ts` now generates page-specific canonical, Open Graph, Twitter, robots, and 1200×630 image metadata. `/goldenhour` has a unique title under 60 characters, a description that states the date is tentative and the venue is TBA, and a self-referencing canonical. The root layout now uses `lang="en-IN"` and a consistent GoldenHour Delhi entity name.

`src/app/sitemap.ts` now publishes the home, event, about, privacy, terms, and code-of-conduct pages. Utility and thank-you routes are excluded. `src/app/robots.ts` keeps private route exclusions and explicitly allows reputable search and answer crawlers. This is a policy choice: allowing search crawlers improves discovery, while allowing training crawlers can increase reuse of public content. Revisit the named crawler list if the organizers prefer a narrower policy.

### Structured data

`src/components/StructuredData.tsx` adds Organization, WebSite, Event, FAQPage, and BreadcrumbList JSON-LD. Event values are drawn from the central config. The event description explicitly says the date is tentative, the venue is to be announced, and registration opens in November 2026. No live registration URL is emitted while registration is closed.

### Answer-first content

`EventAtAGlance.tsx` adds a plain-language fact block near the top of `/goldenhour`. The event page also contains a direct definition paragraph. The FAQ now covers the confirmed questions from the brief, including the “AI use allowed?” item as **NEEDS OWNER ANSWER** rather than inventing a policy.

### Generative-engine surface

`src/app/llms.txt/route.ts` generates a concise, current Markdown summary from the same event config. `/about` provides an official description, fact sheet, founders, partners, canonical brand usage, contact, and social links.

### Social assets

The following 1200×630 PNGs were generated in `public/og/` using the existing black/off-white/sunset design language: `home.png`, `goldenhour.png`, `about.png`, and `legal.png`. The original `public/og-image.png` is retained for backward compatibility but is no longer the preferred metadata asset.

## Remaining owner input

The following decisions are not safe to fabricate:

1. Confirm the venue and replace `venue` in `src/lib/event.ts` when known.
2. Confirm whether 14 November 2026 remains the intended date, then change `dateStatus` from `TENTATIVE` only when formally approved.
3. Decide the AI-use policy and replace the FAQ placeholder with the approved wording.
4. Confirm whether the participant checklist can promise Wi-Fi, power, food, or hardware support; the new FAQ avoids those unconfirmed promises.
5. Confirm OSEN’s canonical public URL before using it in partner backlinks or schema if `https://www.osen.co.in` is not correct.
6. Decide whether the existing `GoldenHacks` and `GOLDEN.HOUR` legacy wording should be rewritten. The canonical recommendation is “GoldenHour Delhi” for the organization and “GoldenHour V1” for the event.
7. Provide Google Search Console and Bing Webmaster verification values if the team wants them encoded as metadata.
8. Decide whether to allow the named training crawlers in `robots.txt`; the current implementation allows them because the brief asked for explicit allowance.
9. Confirm the public WhatsApp community description and add its URL to `sameAs` only if the community is intended as a public entity profile.

## Validation and deployment

The OG PNG renderer completed successfully and produced 1200×630 assets. The first lint/build attempt stopped because the cloned repository had no installed `node_modules`; run `npm ci`, then `npm run lint` and `npm run build` before merging. After deployment, rerun the live checks below.

1. Fetch `/goldenhour`, `/about`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt`.
2. Confirm the event title, description, canonical, OG URL, and 1200×630 dimensions.
3. Run Google’s [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).
4. Submit the sitemap in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters/about).
5. Run Lighthouse mobile and desktop again. Treat LCP under 2.5 s, CLS under 0.1, and INP under 200 ms as the performance targets.

## GEO test baseline

A cross-engine 15–20-query test was not executed in this sandbox because authenticated ChatGPT, Gemini, Perplexity, Claude, and Google AI Overview result surfaces were not available as deterministic test endpoints. Record this honestly rather than claiming appearances or citations. The recommended sheet columns are: date, engine, query, GoldenHour appears, facts accurate, cited source, incorrect fact, and remediation.

Use these initial queries monthly after indexing:

- student hackathons in Delhi 2026
- free hackathon for under 19 in Delhi
- what is GoldenHour hackathon
- who organizes GoldenHour Delhi
- 12-hour hackathon Delhi students
- web development hackathon Delhi under 19
- game development hackathon India students
- how do I register for GoldenHour Delhi
- where is GoldenHour V1 happening
- is GoldenHour hackathon free

## Off-page checklist

| Priority | Action | Owner guidance |
|---|---|---|
| P0 | Verify the site in Google Search Console and Bing Webmaster Tools, then submit `/sitemap.xml`. | Requires owner account access. |
| P0 | Add descriptive backlinks from DelhiHacks, CodeCrafters, and OSEN partner pages to `/goldenhour`. | Use anchors such as “GoldenHour V1 student hackathon in Delhi NCR.” |
| P0 | Update Instagram and LinkedIn bios to use “GoldenHour Delhi” and link to `/goldenhour`. | Align the displayed description and event status. |
| P1 | List the event on Unstop. | Unstop currently exposes an India hackathon directory and organizer/partner pages. Confirm current terms during submission. |
| P1 | Request a student-run hackathon listing on Devfolio. | Devfolio’s public materials state that student-run hackathons can request the platform for free; confirm eligibility and current terms. |
| P1 | List on Devpost if the event accepts the platform’s format. | Devpost has an active hackathon directory; confirm whether an in-person Delhi event and under-19 audience fit current rules. |
| P2 | Consider Luma or Eventbrite only after venue and registration details are confirmed. | Do not create duplicate stale event pages while the date and venue are tentative. |
| P2 | Ask schools, coding clubs, and teachers for genuine event mentions. | Provide the fact sheet and Code of Conduct; do not mass-submit or keyword-stuff. |
| P2 | Share useful, non-promotional answers on Reddit, Quora, and YouTube. | Answer relevant questions with the canonical link only where it genuinely helps. |

## External entity alignment checklist

Use the exact same name, description, founders, event status, and links on Instagram, LinkedIn, WhatsApp community description, DelhiHacks partner pages, CodeCrafters sponsor pages, OSEN pages, school outreach material, and any event listing. Avoid claiming the venue, confirmed date, open registration, prize values, or AI policy until the owner approves them.

## References

[1]: https://www.goldenhourdelhi.co.in/ "GoldenHour Delhi live site"
[2]: https://www.goldenhourdelhi.co.in/goldenhour "GoldenHour V1 live event page"
[3]: https://unstop.com/hackathons "Unstop India hackathon directory"
[4]: https://devfolio.co/ "Devfolio hackathon platform"
[5]: https://devpost.com/hackathons "Devpost hackathon directory"
[6]: https://search.google.com/search-console "Google Search Console"
[7]: https://www.bing.com/webmasters/about "Bing Webmaster Tools"
[8]: https://search.google.com/test/rich-results "Google Rich Results Test"
[9]: https://validator.schema.org/ "Schema Markup Validator"
