# GoldenHour production audit remediation tracker

Audit source: user-supplied 24 October 2026 report, 13-row issue CSV and fix plan. Base commit: `00e8ab7d5df18847f76d8ce657c23a483f365ce3`. Branch: `fix/goldenhour-production-audit-2026-10`.

This register intentionally distinguishes code changes from verified outcomes. The supplied measurements reflect the deployed site before this branch and **must not** be interpreted as post-fix results.

| ID | Priority | Audit evidence | Source investigation | Change / verification | Status |
|---|---|---|---|---|---|
| GH-001 | P1 | Uncaught exception on /goldenhour at 12 viewports, minified chunk `17nh36ovcgwtl.js` | Event page imports many interactive components; no exception message or source stack supplied. Root cause unproven. | No suppression or speculative patch. Requires production/local browser stack capture and regression assertion. | UNRESOLVED |
| GH-002 | P2 | /goldenhour body scrollWidth 342px at viewport 320px, while documentElement is 320px | Exact overflowing child not identified. | No unsafe blanket `overflow-x:hidden` substitution; DOM geometry and manual accessibility check needed. | UNRESOLVED |
| GH-003 | P2 | /about body scrollWidth 480px at 390px; no document-level scroll | `src/app/about/page.tsx` renders long `GOLDENHOUR.` heading at fixed `text-6xl` on mobile. | Changed mobile heading to responsive clamp and `break-words`. Awaiting viewport rendering check. | FIXED — VERIFICATION LIMITED |
| GH-004 | P2 | /terms body scrollWidth 430px at 390px; no document-level scroll | `src/app/terms/page.tsx` renders `CONDITIONS.` at `text-6xl` on mobile. | Changed mobile heading to responsive clamp and `break-words`. Awaiting viewport rendering check. | FIXED — VERIFICATION LIMITED |
| GH-005 | P2 | Date tentative, venue TBA | `src/lib/event.ts` centralizes date, venue, eligibility and registration details. | Unconfirmed facts remain explicitly tentative; organizer must approve any new venue/date. | BLOCKED — REQUIRES ORGANIZER DECISION |
| GH-006 | P2 | SEO scanner 403 but independent crawls 200 | No proof Cloudflare/WAF caused scanner failure. | No security rule relaxed; WAF event diagnostic required. | BLOCKED — EXTERNAL DEPENDENCY |
| GH-007 | P3 | Hero has multiple competing CTAs | `src/components/Hero.tsx` renders registration, volunteer and community CTAs. | No subjective redesign undertaken without visual validation. | UNRESOLVED |
| GH-008 | P3 | GEO direct-answer heuristic 12/25 | `src/app/goldenhour/page.tsx` already includes explicit What is GoldenHour explanation; `src/lib/event.ts` provides central facts. | Score not a demonstrated defect; no keyword-stuffing. | UNRESOLVED |
| GH-009 | P3 | Specialist crawler fails to recognize FAQ | `src/components/FAQ.tsx` contains semantic h2, h3, buttons and labelled regions, but collapsed answers are `hidden`. | Needs initial-HTML and crawl semantics verification before FAQ/schema changes. | UNRESOLVED |
| GH-010 | P3 | CSP absent from one sampled response | CSP not a proven exploit. | Future report-only policy requires script and third-party validation. | UNRESOLVED |
| GH-011 | P3 | Organizer roles overlapping | `src/lib/event.ts` contains founders, leadOrganizers and coOrganizers arrays. | No unilateral role edits; organizer verification required. | BLOCKED — REQUIRES ORGANIZER DECISION |
| GH-012 | P3 | External Google Form not submitted/tested | `src/lib/event.ts` points to `https://forms.gle/2om1zTVv5FCau56r5`. | No fake registration; authorized end-to-end form check outstanding. | BLOCKED — EXTERNAL DEPENDENCY |
| GH-013 | P3 | No axe / keyboard / screen-reader pass | Site styles include focus-visible and reduced-motion rules; this does not establish WCAG compliance. | Full assisted technology, zoom and axe testing outstanding. | UNRESOLVED |

## Current limitations

- Previous audit is not itself proof of source root cause, visible clipping, or compliance.
- Local Edge CDP automated browser session failed to start (connection refused on port 9333). No local screenshots, visual pass or exception stack are claimed.
- Run `npm ci`, `npx tsc --noEmit`, `npm run lint`, `npm run build` and browser assertions after changes. Record actual results separately.
- No deploy, merge, production configuration change or registration submission was performed.

## Executed local quality gates (24 October 2026)
- npm ci --no-audit --no-fund: PASS (359 packages added).
- node_modules/.bin/tsc.cmd --noEmit: PASS (exit 0).
- npm run lint: PASS (exit 0).
- npm run build: PASS (exit 0; Next.js 16.3.5; 15/15 static pages generated).
- git diff --check: PASS prior to staging.
- Browser viewport measurements after the patch: NOT RUN; screenshot verification is required.

