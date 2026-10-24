# GoldenHour Delhi redesign

Development branch: `feat/goldenhour-astral-redesign`. Base: `00d339b`, matching fetched `origin/main` at the start of work. Implementation is on the feature branch. The owner subsequently authorized pushing all changes. No merge, form submission, or production deployment was performed.

## Design summary

The homepage is now an editorial cover: a large “Build before sunrise” headline, a cut-band orange sun, an event poster, genuine team portraits styled as crew passes, and four asymmetric principles. The event page follows the participant's decision: what it is, tracks, schedule, rules, people, rewards, partners, tools, practical details, answers, registration.

Both pages share navigation, typography, team data, foil treatment, buttons and footer. The palette remains orange `#FF5A00`, ink `#050505`, paper `#F7F7F2` and yellow `#FFD400`. Archivo Black, DM Sans and Space Mono are self-hosted with their licenses. Fine static grain and dashed ticket rules supply texture without animated noise.

Removed the blocking introduction, custom cursor, repeated marquees, duplicated event summaries and continuously rendered WebGL portraits from the active experience. The sun moves at most eight pixels in response to a mouse pointer. Foil and spotlights respond only to pointer movement; essential content never depends on them. Touch and reduced-motion users receive the static composition. Registration buttons stay easy to target.

## Before and after

The initial browser inspection used the actual production pages. The current production content agreed with the repository: the previously reported tentative date/two-track mismatch was no longer present. All five genuine team photos and sponsor assets were retained.

| Page | Before, 1440 × 1000 | After, 1440 × 1000 |
| --- | --- | --- |
| Homepage | [Before](redesign/before-home.png) | [After](redesign/after-home.png) |
| Event | [Before](redesign/before-event.png) | [After](redesign/after-event.png) |

Mobile final covers: [homepage](redesign/home-mobile.png), [event](redesign/event-mobile.png). Screenshots are rendering evidence; the interaction assertions below are separate evidence of behavior.

Refinement included reducing the final CTA headline, moving the date above the event CTA, tightening oversized hero metadata, correcting the smallest poster headline, and making the tablet judging layout one column. The full-page and section screenshots were reviewed after implementation, rather than accepting the first layout.

## React Bits adoption report

Reviewed the official index, installation guide and all fifteen requested component pages. Exact TS-TW registry JSON and source were retrieved for HoloCard, MagicBento and SpotlightCard. No bulk installation, shadcn setup, new animation library or runtime dependency was added.

| Candidate | Decision and location |
| --- | --- |
| [Holo Card](https://reactbits.dev/components/holo-card) | Refactored the existing semantic `HoloCard`; did not install a second image-only implementation. Shared team portraits on both pages now use subtle CSS tilt and gold/shard foil borders, preserving real HTML names and roles. No canvas or GPU context required. |
| [Magic Bento](https://reactbits.dev/components/magic-bento) | Inspected its registry implementation. Kept a bespoke asymmetric four-principle layout on the homepage and reused the small Spotlight primitive; omitted the large demo, animated border system and unrelated effects. Not represented as an installed MagicBento. |
| [Split Text](https://reactbits.dev/text-animations/split-text) | Rejected per-character animation/dependency overhead. Hero copy has a single 500ms transform entrance, always-visible text and reduced-motion fallback. |
| [Scroll Stack](https://reactbits.dev/components/scroll-stack) | Rejected scroll interception and sticky card stacking for long event information. Reading remains in normal document flow. |
| [Spotlight Card](https://reactbits.dev/components/spotlight-card) | Adapted the official `SpotlightCard-TS-TW` softened radial falloff and DOM-ref paint approach. Used on homepage principles and event tracks. Removed ambient RAF, global proximity listeners, flares and theme machinery. |
| [Noise](https://reactbits.dev/animations/noise) | Replaced the proposed animated surface with static optimized PNG grain derived from the repository's textures. |
| [Card Nav](https://reactbits.dev/components/card-nav) | Rejected for the main navigation: the compact persistent section links are clearer. |
| [Staggered Menu](https://reactbits.dev/components/staggered-menu) | Rejected animation machinery. Used a native modal dialog with direct links, focus containment, Escape and focus return. |
| Dot Field | Rejected another moving background. The branded SVG sunrise is the single hero motif. |
| [Logo Loop](https://reactbits.dev/animations/logo-loop) | Rejected duplicated/moving partner logos. Static categorized partner cards preserve names, real assets and links. |
| [Count Up](https://reactbits.dev/text-animations/count-up) | Rejected animated or invented attendance statistics. Date, duration, team size and rewards are factual text. |
| [Click Spark](https://reactbits.dev/animations/click-spark) | Rejected decorative click particles; actions provide direct state feedback instead. |
| [Magnet](https://reactbits.dev/animations/magnet) | Rejected moving registration targets. Buttons retain only slight, motion-aware hover feedback. |
| [Sticker Peel](https://reactbits.dev/components/sticker-peel) | Rejected an additional interaction without a participant task. |
| [Pixel Transition](https://reactbits.dev/animations/pixel-transition) | Rejected obscuring portraits or information during state changes. |

Registry-derived code attribution and the complete license are in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md). Custom layout, menu, sun and schedule are not claimed as copied React Bits components.

## Important file changes

- `src/app/page.tsx`, `src/app/goldenhour/page.tsx`: both landing-page compositions rebuilt with server-rendered content and small client interaction boundaries.
- `src/components/Editorial.module.css`, `EventDetails.module.css`, `Navbar.module.css`: coherent responsive layouts; `globals.css` and `print-design.css` reduced to shared primitives and static surfaces.
- `Sunrise.tsx`, `SpotlightCard.tsx`, `HoloCard.tsx`: restrained pointer effects with static fallbacks. `Team.tsx` and `src/lib/team.ts` replace divergent team layouts; the obsolete `Organizers.tsx` wrapper was removed.
- `Navbar.tsx`, `SiteChrome.tsx`, `Footer.tsx`, `MobileCTA.tsx`: shared navigation, keyboard modal, skip link, meaningful footer and safe-area mobile registration.
- `Timeline.tsx`, `FAQ.tsx`, `Resources.tsx`, `Countdown.tsx`: native disclosures, searchable answers, correctly labelled filters, explicit clipboard failure, a static date before hydration and factual post-deadline messaging.
- `Rules.tsx`, `Prizes.tsx`, `Sponsors.tsx`, `EventInfo.tsx`, `FinalCTA.tsx`: readable event information, preserved real links and distinct reward conditions.
- `src/lib/event.ts`: centralized reward wording, shared FAQ terms; preserved confirmed 14 November 2026, 08:00–20:00 IST, ages 13–19, teams 1–3, free entry, three tracks and venue TBA.
- `src/app/layout.tsx`, `src/app/fonts/`: removed the intro overlay and external font fetches. Removed `src/app/loading.tsx`: its streaming boundary left essential page content hidden without JavaScript.
- Policy/consent pages retain their substantive text, with skip-link targets and contrast fixes. Existing routes and structured data remain. README duration and event Open Graph assets corrected.
- `package.json` / lockfile: Next and eslint-config-next updated from 16.3.5 to 16.4.3 after the dependency audit; refreshed vulnerable transitive packages. No new production package added. Next's generated AGENTS.md heading update is retained.

## Functional and responsive QA

50 functional check groups passed against the production server in headless Microsoft Edge. No browser runtime errors were recorded. The suite covered:

- HTTP 200 for `/`, `/goldenhour`, `/about`, `/code-of-conduct`, `/privacy`, `/terms`, `/guardian-consent`, `/thank-you`, `/empty-state`, `/robots.txt`, `/sitemap.xml` and `/llms.txt`; a genuine 404 for an unknown route. One H1 and skip-link target on every HTML route.
- All local in-page anchor targets; home → event → browser Back; registration destinations; event JSON-LD start/end/timezone/free price; every event portrait and partner image decoded successfully.
- Mobile/tablet menu at 390px and 768px on both pages: opening, initial focus, 18 forward Tab moves, Escape, focus return, restored body scrolling and navigation. Supplemental tests covered reverse Tab and closing on desktop resize. Final smoke tests verified active navigation clears when returning to either cover.
- All 11 schedule stages through keyboard-operated native disclosure; FAQ search, guardian answer, no-results state and reset to all seven answers.
- Resource category filter, show all/collapse, every copy command, and a simulated clipboard denial with visible feedback.
- Reduced-motion foil, no canvas on the homepage, no-JavaScript schedule/FAQ/resources/date, post-deadline countdown wording, essential-only cookies, blocked localStorage and touch fallback.
- Guardian-consent print rendering with navigation hidden. Registration and volunteer form GET requests both returned 200 after redirecting to their existing Google Forms. No form was submitted; no claim is made about downstream submissions or availability of every third-party social site.

Both pages were captured and checked at **320, 360, 390, 430, 768, 1024, 1440 and 1728px**. No document overflow or clipped text remained in the automated reflow checks. The sunrise intentionally extends beyond its cropped decorative container at 320/768px; it does not expand the document. This distinction is recorded in the raw render report. Final 320/390px smoke checks passed after the last metadata typography refinement.

Evidence: [functional report](redesign/functional-report.json), [supplemental report](redesign/supplemental-report.json), [final smoke](redesign/final-smoke.json), [render report](redesign/render-report.json).

## Accessibility

Axe-core WCAG 2 A/AA, 2.1 A/AA and 2.2 AA scans reported **zero violations in 20 runs**: ten routes at 390px and 1440px. Additional scans of the open mobile menu and expanded schedule/FAQ/resources also reported zero violations. Nine pages passed a further color-contrast scan with texture images temporarily disabled to expose underlying color pairs.

Evidence: [accessibility report](redesign/accessibility-report.json) and [supplemental report](redesign/supplemental-report.json).

Keyboard tests cover forward Tab containment, Escape/focus return, keyboard schedule disclosure, semantic resource filter state and the skip-link target. Menu layout uses one consistent 1024px breakpoint. Portrait names and roles remain real text; decorative sun/foil are hidden from assistive technology. No information requires hover, WebGL or motion. The no-JavaScript experience provides direct mobile navigation, full resources and native FAQ/schedule disclosures, without inert search/filter controls or a blocking cookie overlay.

Manual contrast review complements axe: texture backgrounds can make automated color checks inconclusive. Small paper text uses ink or `#595950`; dark-page secondary text uses `#B8B8AD` or lighter. Policy links and secondary text were corrected explicitly. Orange is primarily a surface or text on ink; it is not used for small text on paper.

Limitations: automated checks and browser keyboard testing are not a screen-reader certification. No physical iOS/Android device, VoiceOver/NVDA or Safari/Firefox run is claimed. Reduced-motion and JavaScript-disabled states were emulated in Chromium.

## Performance

Lighthouse 13.5.0 produced a valid pre-refinement homepage run: performance 87, accessibility 100, best practices 100, SEO 100; LCP 3.1s, TBT 300ms and CLS 0 under simulated mobile throttling (4x CPU, 150ms RTT). Subsequent final-build attempts in Edge and Chrome failed with NO_NAVSTART, so final Lighthouse performance scores are unavailable. These failed traces are not passing results. The final refinement restricts entrance motion to the headline; no measured improvement is claimed. The independent runtime measurements below remain valid.

A separate, sequential idle sample compared the live homepage with the local production redesign, using the same Edge 155 browser and 1440 × 1000 viewport. Both showed five team cards. After settling, each was sampled for approximately five seconds:

| Page-wide measurement | Live baseline | Redesign |
| --- | ---: | ---: |
| Animation-frame callbacks | 1,505 | 0 |
| Canvas elements / visible canvases | 5 / 5 | 0 / 0 |
| Main-thread task time in sample | 445.0 ms | 1.8 ms |
| Script time in sample | 58.1 ms | 0 ms |

This is page-wide idle work, including any other effects on the baseline, not an isolated GPU benchmark of HoloCard. No physical-device FPS, GPU power or battery result is claimed. [Raw runtime evidence](redesign/runtime-report.json).

Self-hosted fonts, server components, lazy portrait images, static grain and removal of idle WebGL work reduce avoidable overhead. Countdown work pauses when the tab is hidden. Measurements are local lab results, not field Core Web Vitals or an INP claim.

## Build and dependencies

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 359 packages installed. Registry/filesystem work took about nine minutes on this Windows host. |
| `npm run lint` | Passed, exit 0. |
| `npm run build` | Passed, exit 0; Next 16.4.3, TypeScript checks complete, all 15 static-generation entries produced. |
| `npm audit --omit=dev` | Passed; zero vulnerabilities. |
| `npm audit` | Passed; zero vulnerabilities after refreshing the three dev-only brace-expansion/zod lockfile entries. |
| `git diff --check` | Passed; only ordinary Windows LF/CRLF normalization notices. |
| Production browser verification | 50 functional groups, 20 route/viewport accessibility scans, 18 supplemental groups and four final smoke assertions. |

The initial clean install reported development-only advisories and an ESLint 9 support/deprecation notice. The advisories were fixed with compatible transitive updates, followed by successful lint/build/audit runs. ESLint's major version was retained to avoid an unrelated tooling migration. No pending package install scripts were approved globally. There was no existing unit-test command in the repository.

Raw results: [build](redesign/build.txt), [lint](redesign/lint.txt), [production audit](redesign/audit-production.json), [full audit](redesign/audit-all.json).

## Owner decisions and preview

The venue/address, transport/accessibility arrangements, exact judging weights and provisional Fueler/InterviewBuddy offers remain explicitly pending in the UI. Update them when the organizers have confirmed them; no facts were invented to fill those gaps. The original registration and volunteer forms remain external; no test registration was submitted.

Local production preview: [homepage](http://127.0.0.1:3100) and [GoldenHour V1](http://127.0.0.1:3100/goldenhour), started with `npm run start -- --port 3100 --hostname 127.0.0.1`. This address is available on this computer while the process is running; no public preview deployment was created.

Changes are committed on `feat/goldenhour-astral-redesign` for review. The local evidence workspace also contains complete before/after captures at all tested widths, section captures, the QA scripts and exact fetched React Bits registry files.

Before publication, review the feature branch and authorize the deployment separately. Production and main remain unchanged.
