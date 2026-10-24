# GoldenHour V1 — Production Audit Remediation Register

**Audit date:** 24 October 2026  
**Starting commit:** `00e8ab7d5df18847f76d8ce657c23a483f365ce3` (`main`)  
**Repair branch:** `fix/goldenhour-production-audit-2026-10`  
**Inputs:** `goldenhour-audit-report.md`, `goldenhour-issues.csv`, `goldenhour-fix-plan.md` (user-supplied)

## Executive summary

This branch addresses the reproducible runtime exception, mobile headings, event-page copy/FAQ semantics, the staging of CSP, tentative metadata, and automated accessibility defects. It introduces a repeatable Chromium browser smoke suite. It does **not** change the deployed website, Cloudflare rules, production registration data, or unconfirmed event details.

**All "verified" claims below refer to the local production build, not the deployed domain.** The original live release still needs to be replaced through a separately authorized deployment.

## Issue register

| ID | Original priority | Original evidence | Investigated source and likely cause | Implemented changes / test evidence | Status |
|---|---|---|---|---|---|
| GH-001 | P1 | Live /goldenhour threw an uncaught exception in every tested viewport | CDP captured **React #418 text hydration mismatch**. `src/components/Timeline.tsx` rendered locale-formatted clock strings and `Date.now()`-dependent status during SSR and client hydration; these are real mismatch hazards, although the exact production text diff was unavailable. | Converted timeline times to deterministic string formatting; initial phase state now stable, switching to live status in `useEffect`. Local Next production build: **0 uncaught exceptions** on /goldenhour at all 12 tested widths. | FIXED AND VERIFIED (local build) |
| GH-002 | P2 | Body scrollWidth 342px at 320px but documentElement did not scroll | Decorative hero SVG and continuously moving marquee can exceed their local boxes; meaningful page content is contained. A body scrollWidth alone is not proof of a visible issue. | Removed extra mobile background scaling. Full 320–2560px browser matrix shows document scrollWidth = clientWidth, no document-level overflow. Do not globally hide new content. Body metric may still exceed the viewport due to intentionally clipped decoration. | FALSE POSITIVE (as a functional defect) |
| GH-003 | P2 | /about at 390px body scrollWidth 480px | Oversized, non-wrapping `GOLDENHOUR.` heading in `src/app/about/page.tsx` | Responsive heading clamp/wrapping; local 390px body/document width 375px with 15px scrollbar; 390/1440px smoke tests pass. | FIXED AND VERIFIED |
| GH-004 | P2 | /terms at 390px body scrollWidth 430px | Oversized `CONDITIONS.` heading in `src/app/terms/page.tsx` | Responsive heading clamp/wrapping; 390/1440px smoke tests pass without document overflow. | FIXED AND VERIFIED |
| GH-005 | P2 | Event date tentative; venue not announced | `src/lib/event.ts` centralizes facts; Event JSON-LD previously emitted `EventScheduled` and a `Place` named "Venue to be announced". | `src/components/StructuredData.tsx` omits confirmed event status and physical Place until date/venue confirmed; visible copy remains tentative. Actual booking of date/venue is not a code task. | BLOCKED — REQUIRES ORGANIZER DECISION |
| GH-006 | P2 | Grow My Website returned 403; other scanners 200 | Cloudflare/WAF or scanner-specific bot classification remains unproven. | No unsafe global WAF bypass. Requires read-only Cloudflare security event correlation with scanner's request identifier/IP. | BLOCKED — EXTERNAL DEPENDENCY |
| GH-007 | P3 | Too many equally prominent hero CTAs | `src/components/Hero.tsx` had three competing outlined/filled actions | Registration CTA made dominant; volunteer/community links converted to simpler secondary navigation. Browser smoke validates links/controls; editorial impact is subjective. | FIXED — VERIFICATION LIMITED |
| GH-008 | P3 | GEO direct-answer heuristic 12/25 | Short hero summary omitted tracks/team size; direct-answer content exists elsewhere | Expanded hero summary with who, what, two tracks, team size, price, and tentative date. No artificial score or keyword stuffing; external GEO rescan not performed. | FIXED — VERIFICATION LIMITED |
| GH-009 | P3 | GEO scanner missed FAQ, while FAQ exists | `src/components/FAQ.tsx` had heading "Frequently Asked." without explicit "Questions"; FAQ questions/answers already in server HTML and structured data | Heading now explicitly "Frequently Asked Questions"; accordions, aria-expanded, visible answer expansion verified in local Edge. External crawler's heuristic not rerun. | FIXED — VERIFICATION LIMITED |
| GH-010 | P3 | No CSP response header | `next.config.ts` had other protective headers but no CSP | Added **Content-Security-Policy-Report-Only**, with trusted resource allowances. Header verified in browser suite. No enforcement deployed: must evaluate real violation telemetry before enforcing. | FIXED — VERIFICATION LIMITED |
| GH-011 | P3 | Overlapping organizer roles on /about | `src/lib/event.ts` declares multiple roles; approving official titles is editorial | Preserved public names/roles rather than inventing or changing positions. Requires organizer sign-off. | BLOCKED — REQUIRES ORGANIZER DECISION |
| GH-012 | P3 | Registration was not submitted end-to-end | External `forms.gle/2om1zTVv5FCau56r5` | Non-destructive HTTP GET returned **200** and redirected to `docs.google.com`. CTA and guardian-consent route passed browser smoke. No fake submissions or response mutations. | BLOCKED — EXTERNAL DEPENDENCY |
| GH-013 | P3 | No full axe/keyboard/screen reader testing in prior audit | Multiple low-contrast opacity utilities and pale/yellow letters on orange surfaces | Adjusted contrast in scoped CSS and text utility classes across source. **axe-core: zero detected violations in 8 route/viewport runs** after repairs; 34-browser-sweep checks names, images, document overflow, and FAQ/timeline interactions. Incomplete axe checks and manual assistive-tech tests remain. | FIXED — VERIFICATION LIMITED |

## Additional defects discovered and corrected

- Contrast failures previously appeared on home, event, About, and Terms in axe-core. These included low-opacity labels and accent text below WCAG contrast thresholds; automated results now show zero detected violations on eight audited combinations.
- Event structured metadata could imply a confirmed status or place even though public facts mark both unconfirmed. The technical representation now avoids these assertions.
- Browser-dependent timeline formatting could differ across Node and browser runtimes; the initial markup is now deterministic.

## Actually executed quality gates (local Windows Edge / Next.js 16.3.5)

- `npm ci --no-audit --no-fund`: PASS (359 installed packages, initial baseline).
- `node_modules/.bin/tsc.cmd --noEmit`: PASS.
- `npm run lint`: PASS after browser test converted to ESM.
- `npm run build`: PASS (15/15 statically generated pages, production build).
- `npm run qa:browser -- http://127.0.0.1:3334`: 34 route/viewport cases, zero exceptions, zero document overflow, interaction and endpoint checks. Verify latest completion log before merging.
- `axe-core` via Edge CDP: 8 scans across /, /goldenhour, /about, /terms at 390 and 1440px; zero **detected** violations. Some rules reported incomplete, including color-contrast and aria-prohibited-attr.
- Non-destructive registration Google Form GET: HTTP 200, redirected to docs.google.com.
- `git diff --check`: executed. Re-run before final push.

## Remaining human and external work

1. Approve event date, venue, current sponsor claims, prize inventory, and official organizer titles.
2. Correlate the third-party SEO scanner's 403 with Cloudflare WAF/Bot events; do not disable protections globally.
3. Perform authorized registration/guardian-consent end-to-end testing in a staging or approved test response.
4. Complete manual screen-reader, keyboard, 200% text zoom and touch-device testing; do not interpret axe zero as comprehensive WCAG certification.
5. Evaluate CSP Report-Only telemetry before considering enforcement; re-run independent GEO/SEO crawlers after deployment.
6. Review and explicitly deploy this branch only after approval. **Nothing has been merged or deployed automatically.**
