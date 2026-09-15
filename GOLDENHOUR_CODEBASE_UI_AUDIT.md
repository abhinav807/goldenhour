# GOLDENHOUR Codebase and UI Audit

**Repository:** `abhinav807/goldenhour`  
**Revision reviewed:** `6cc3b1b` (`feat: add navigation for every section`)  
**Review date:** 15 September 2026  
**Scope:** Repository structure, build quality, runtime behavior, accessibility structure, responsive layout, content consistency, SEO/deployment configuration, and visual interaction patterns.

## Executive assessment

GOLDENHOUR is a polished, intentionally art-directed static Next.js event landing page. The implementation is small and easy to deploy: the entire site is statically prerendered, the production build and TypeScript checks pass, ESLint passes, and the production dependency audit reports no high-severity vulnerabilities. The design system is coherent and distinctive, with a strong brutalist identity, repeated visual motifs, clear section hierarchy, sponsor presentation, legal pages, and a responsive navigation model.

The main weaknesses are not basic correctness. They are **content readiness, mobile ergonomics, accessibility depth, and maintainability of the visual effects**. The site currently communicates a firm event date and runs a live countdown while several other places still say “DATE TBA” and “VENUE TBA”. On mobile, the long-form page is usable and has no horizontal document overflow, but several interactive/visual layers extend beyond their parent boxes and the persistent volunteer CTA and cookie banner compete heavily for limited screen space. The UI also relies on several very large client-side visual components, while there are no repository-level automated tests.

## Verification performed

| Check | Result |
|---|---|
| `npm ci` | Passed |
| `npm run lint` | Passed with no reported errors or warnings |
| `npm run build` | Passed; static routes prerendered successfully |
| TypeScript validation | Passed during `next build` |
| `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities reported |
| Desktop runtime review at 1366px | Passed; no console errors or warnings |
| Mobile runtime review at 390px | Passed; no console errors and no horizontal document overflow |
| Accessibility snapshot | Landmarks, headings, named navigation, buttons, links, dialog, and FAQ controls are present |
| Automated test suite | No test/spec/config files found |

## Architecture and implementation

The app uses the Next.js App Router with a single statically rendered home page composed from focused section components. The page composition is clear and readable: `Hero`, `About`, `Events`, `Timeline`, `Countdown`, `Dispatch`, `Rules`, `Organizers`, `Prizes`, `Sponsors`, `FinalCTA`, `FAQ`, and `Footer` are assembled in a predictable order. Supporting pages cover privacy, terms, not-found, empty state, and the registration-not-open state.

The dependency footprint is appropriately small: Next.js, React, Lucide icons, Tailwind CSS 4, TypeScript, and the Next ESLint configuration. There is no backend, database, authentication, form persistence, or secret-bearing server integration in this repository. The current security model is therefore simple and appropriate for a static promotional site.

The main maintainability concern is that `InteractiveBackground.tsx` and especially `CursorRingField.tsx` contain large inline shader/simulation implementations. The effects are visually valuable, but they are high-complexity client-side code relative to the rest of the app. They should be isolated behind a small, documented API and tested at least for capability detection, resize behavior, reduced-motion behavior, and cleanup on unmount.

## UI and UX review

### Strengths

- **Strong visual identity:** black, off-white, and sunset orange form a consistent palette; typography and borders reinforce the event’s “build before sunrise” concept.
- **Clear content narrative:** the page moves from promise, to tracks, to schedule, to rules, people, prizes, sponsors, registration status, and FAQ.
- **Good responsive structure:** the desktop navigation collapses into a named mobile menu, cards stack on small screens, and the live page reports `scrollWidth === innerWidth` at 390px.
- **Useful interaction affordances:** the FAQ uses buttons, the mobile menu exposes open/close labels and `aria-expanded`, sponsor cards are linked, and the cookie banner has explicit accept/decline actions.
- **Good fallback and trust surfaces:** privacy and terms pages exist, registration is explicitly marked as unavailable, and the footer provides email and volunteer paths.
- **No runtime noise:** the desktop and mobile checks produced no console errors or warnings.

### Issues and recommendations

#### 1. Resolve event-date and venue messaging before launch

The page states `15 NOVEMBER 2026` in the countdown, hero metadata, registration details, and metadata description, while the footer still says `DELHI / DATE TBA / VENUE TBA` and the hero says `DELHI / VENUE TBA`. This creates avoidable uncertainty, especially because a live countdown implies the date is confirmed.

**Recommendation:** decide whether the date is confirmed. If confirmed, replace every “DATE TBA” occurrence and make the venue wording consistent. If the date is not confirmed, remove or pause the countdown and use one consistent “date and venue pending” state across metadata, hero, footer, FAQ, and legal copy.

#### 2. Improve mobile CTA and cookie-banner competition

At 390px, the fixed volunteer CTA occupies the full width near the bottom of the viewport, while the cookie dialog occupies a large lower-screen area with two wide buttons. Together they substantially reduce visible content and can cover the page’s lower controls.

**Recommendation:** give the cookie banner precedence over the mobile CTA, hide or reduce the CTA while the consent dialog is open, use a compact stacked consent layout, and ensure the fixed CTA does not overlap focused FAQ or registration controls. Consider moving the mobile CTA to a non-fixed inline placement after the consent decision.

#### 3. Fix off-canvas visual layers on mobile

The accessibility snapshot shows some decorative/illustrative content with negative x-coordinates and widths larger than their parent on mobile, for example the About visual layer beginning at `x=-18` and other section content extending to roughly `x=403` in a 390px viewport. The document itself does not horizontally scroll, so this is currently clipped rather than a page-level overflow bug, but it can cut off meaningful content or create inconsistent touch/hit areas.

**Recommendation:** distinguish decorative overflow from semantic content. Keep decorative artwork clipped deliberately with `aria-hidden`, but constrain any text, cards, or controls to `max-width: 100%`; inspect each negative-positioned child at 320px, 360px, and 390px widths.

#### 4. Add reduced-motion and low-power fallbacks

The site uses a shader-based interactive background, cursor effects, ripple/field animation, marquee animation, reveal animation, and countdown updates. The audit did not find a clear end-to-end `prefers-reduced-motion` strategy.

**Recommendation:** add a global reduced-motion mode that disables or substantially simplifies the cursor field, shader animation, marquee motion, and reveal transitions. Also provide a static background fallback when WebGL is unavailable or when the device is low-power. This will improve accessibility, battery use, and resilience on mobile browsers.

#### 5. Strengthen focus states and keyboard interaction validation

The accessibility tree is structurally good, but source-level review should be complemented with a keyboard pass. The mobile menu exposes accessible labels, yet the review did not establish a complete focus trap, focus return to the menu button, or Escape-key close behavior. The cookie banner is labeled as a dialog but is not clearly modal, and focus management is not evident.

**Recommendation:** verify and, if needed, implement: focus moves into the menu on open; Tab remains within the open menu; Escape closes it; focus returns to the opener; consent controls are reachable without background focus confusion; all custom buttons and links have visible `:focus-visible` styles.

#### 6. Add automated coverage for the highest-risk interactions

There are no tests in the repository. The most important behaviors are deterministic and suitable for lightweight browser/component coverage.

**Recommended minimum suite:** homepage renders key landmarks; all navigation anchors target existing IDs; mobile menu opens/closes and supports Escape; FAQ expands/collapses; cookie choice persists and removes the banner; countdown handles the event-date boundary; reduced-motion and no-WebGL fallbacks render; all external links have the intended target/rel behavior.

#### 7. Improve social-preview asset dimensions

`public/og-image.png` is reported as `286x131`, which is unusually small for a social preview and may render soft or be cropped inconsistently by social platforms. The metadata correctly references Open Graph and Twitter images, but the asset itself should be upgraded.

**Recommendation:** generate a larger 1200x630 preview with safe margins, then update the declared dimensions in metadata. Keep the visual identity simple enough to remain legible in a small card.

#### 8. Reduce duplicated content literals

Event date, venue, duration, sponsor names, URLs, and registration status are repeated across components and metadata. This increases the chance of the exact inconsistency currently visible between “DATE TBA” and the countdown date.

**Recommendation:** create a typed event configuration module for date, location, duration, registration state, sponsor data, and external URLs. Derive the hero details, countdown target, footer status, metadata description, sitemap behavior, and FAQ copy from that source.

## SEO, security, and deployment

The repository includes canonical metadata, Open Graph/Twitter metadata, `robots.txt`, and a sitemap route. Security headers are configured in `next.config.ts`, including HSTS, `nosniff`, frame denial, referrer policy, permissions policy, and COOP. The optional HTTPS redirect proxy is configurable and correctly disabled for the documented Vercel setup.

The sitemap currently includes `/empty-state`, which appears to be an internal/demo route rather than a page intended for search discovery. The `/thank-you` route is also a “registration not open” state and may not be valuable as an indexed landing page. Consider excluding both from the sitemap, and decide whether the privacy and terms pages should be indexed based on the event’s goals.

The metadata description and page title are strong and consistent with the brand, but the Open Graph image should be enlarged. Since the page is a static event site with no server-side personal-data processing, the current dependency and security posture is sound; the main future risk is adding a registration backend without moving validation, rate limiting, bot protection, and authorization server-side.

## Prioritized action plan

### Before public launch

1. Resolve the date/venue truth and remove contradictory “TBA” copy.
2. Correct the mobile fixed-CTA/cookie-banner overlap and validate at 320px, 360px, and 390px.
3. Add reduced-motion and no-WebGL/low-power fallbacks for the visual effects.
4. Perform a full keyboard/focus pass for the menu, cookie dialog, FAQ, and all CTA states.
5. Replace the small social-preview asset with a 1200x630 image.

### Next iteration

1. Centralize event and sponsor configuration.
2. Add browser tests for navigation, FAQ, consent, menu behavior, and countdown boundary states.
3. Exclude non-public/demo routes from the sitemap.
4. Add performance budgets and measure mobile LCP, CLS, JS transfer, and animation frame rate.
5. Extract and document the shader/cursor effects as isolated modules with explicit cleanup and capability fallbacks.

### Overall rating

**Current state: strong visual prototype / near-launch static site, but not fully launch-ready.** The core implementation is healthy and the visual system is unusually coherent. The release blockers are primarily the contradictory event-status messaging, mobile fixed-layer ergonomics, and missing accessibility/performance fallbacks rather than build or security defects.
