# Launch checklist — 31 October 2026

Status describes repository implementation, not certification of the deployed site.

| # | Requirement | Status / evidence |
|---|---|---|
| 1 | Custom 404 | Existing app/not-found.tsx |
| 2 | Page titles | Public metadata helper; explicit home and private page metadata |
| 3 | Above-fold CTA | Hero actions and header Explore; viewport verification pending |
| 4 | Page descriptions | Added distinct descriptions to private pages and home; existing public pages use metadata helper |
| 5 | Favicon | Existing app/favicon.ico and icon variants |
| 6 | robots.txt | Existing generated robots.ts |
| 7 | sitemap.xml | Existing sitemap.ts includes public routes only |
| 8 | Open Graph | Existing 1200x630 social images and metadata |
| 9 | Image alt text | Source scan; decorative images intentionally use empty alt |
| 10 | Sticky mobile CTA | Existing event CTA; added to homepage |
| 11 | Mobile breakpoints | Existing responsive styles; homepage menu added |
| 12 | Loading states | Existing route loading boundaries and form busy states |
| 13 | Form errors | Existing inline validation and API errors |
| 14 | Thank-you | Existing /thank-you registration destination; external Google Form controls actual submission |
| 15 | Privacy | Existing /privacy; organizer should review policy for actual practices |
| 16 | Terms | Existing /terms; organizer review required |
| 17 | Cookie banner | Existing optional/essential choice; protected storage access from exceptions |
| 18 | Analytics | Consent-gated GA4 implementation; not active without real measurement ID |
| 19 | Real contact address | Existing contact email; postal address awaits organizer |
| 20 | Compressed images | Existing Next Image and upload resizing; enabled AVIF/WebP negotiation |
| 21 | Horizontal scroll | Existing overflow rules; added intrinsic-size and long-content constraints; browser verification pending |
| 22 | Clickable email | Existing mailto links |
| 23 | Broken links | Local asset/source checks; third-party link availability not exhaustively verified |
| 24 | Mobile menu | Existing event menu; added homepage navigation |
| 25 | Placeholder text | No invented address/analytics values; input examples and honest unannounced venue retained |
| 26 | Physical mobile device | Not performed; requires actual device access |
| 27 | Empty states | Existing /empty-state plus contextual no-ticket/no-account results |
| 28 | Mobile/desktop | Responsive implementation present; full viewport/device QA still needed |
| 29 | Mobile overflow | Added min-width, media sizing, long address handling; visual QA pending |
| 30 | Error messages | Existing route error boundaries and safe API errors |
| 31 | Success messages | Existing profile saves and ticket check-in confirmation |
| 32 | Hide API keys | Server-only database/auth modules; env files ignored |
| 33 | Purge Git secrets | History scan is pattern-based; no history rewrite without confirmed findings and coordination |
| 34 | Public DB key | Not applicable: MongoDB stays server-only; never expose a public DB credential |
| 35 | Row-level security | SQL RLS not applicable; owner-scoped routes and admin authorization implement record access |
| 36 | Encryption | Password hashing and encrypted OAuth tokens; provider TLS/at-rest encryption requires deployment verification; profile fields not separately encrypted |
| 37 | Server auth | Existing requireSession/requireAdmin/requireCheckInStaff guards |
| 38 | Record access | Existing owner/admin checks for tickets/photos/profiles |
| 39 | Field tampering | Existing validators and server role checks; fixed missing role in admin account projection |
| 40 | Session cookies | Better Auth with HTTPS auth origin; deployed flags need inspection |
| 41 | Hash passwords | Better Auth manages password hashing |
| 42 | Login rate limit | Database-backed Better Auth limits |
| 43 | Bot protection | Rate limits present; CAPTCHA provider setup outstanding |
| 44 | Parameterized queries | MongoDB typed query objects; escaped search expressions; no SQL |
| 45 | Input validation | Existing auth, profile, ticket and admin validators; bounded request readers |
| 46 | Escape user content | React text escaping; ticket SVG XML escaping; analytics ID validation added |
| 47 | Upload restrictions | Existing byte, MIME, pixel and decode limits plus normalized output |
| 48 | API responses | Existing explicit public DTOs, projections, no-store headers and safe errors |
| 49 | Security headers | Existing headers in next.config.ts |
| 50 | Force HTTPS | Enabled production proxy redirect by default; trusted proxy and hosting TLS verification required |
| 51 | Dependencies | npm audit run; fix/check results recorded in delivery message |

## Recorded checks

- Production build passed; all 12 unit tests passed; TypeScript passed.
- Public route HTTP checks: home, event, about, privacy, terms, robots and sitemap return 200; unknown route returns custom 404. Production HTTP redirect returns 308 to HTTPS.
- Source scan found no image tags missing alt attributes or missing literal local asset links. External links and physical-device layout were not exhaustively tested.
- Pattern scan covered 178 Git commits; one documentation URI used username/password placeholders, with no confirmed secret found. Pattern scans are not exhaustive.
- Updated npm lock to source-map-js 1.2.2 and zod 4.6.7, matching versions already in the pnpm lock. Production npm audit reports zero vulnerabilities. Full dependency audit still reports 17 findings (16 moderate, 1 high); development-toolchain remediation remains outstanding. No forced breaking upgrades were applied.
