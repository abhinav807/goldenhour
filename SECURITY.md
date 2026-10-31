# Security and deployment

Updated 31 October 2026. GoldenHour is a Next.js application with Better Auth, server-only MongoDB access, private profiles, uploads, and event tickets.

## Implemented controls

- Protected API routes require a server-validated session; account management requires a verified master admin; check-in requires an admin or volunteer role.
- Participant photo, profile, and ticket reads are scoped to the authenticated account. Admin permissions are checked on the server, never accepted from form fields.
- Input validators allow supported fields only. MongoDB query objects are constructed by the application; user-supplied query operators are not accepted. Search text is escaped before regex use.
- Password handling is delegated to Better Auth's password hashing. OAuth tokens are encrypted. Login/signup rate limits use database storage, including five email attempts per minute.
- Secrets stay in server environment variables. No database URI belongs in NEXT_PUBLIC variables or browser bundles. MongoDB has no public browser key or SQL row-level security; use restricted database credentials, network restrictions, and application authorization.
- File uploads have bounded request sizes, image type/dimension validation, decoding and normalization. APIs return safe error messages and explicit public data shapes.
- HSTS, anti-framing, MIME-sniffing protection, referrer policy, and restrictive camera/microphone permissions are configured. Production HTTPS redirects are on by default when the trusted hosting proxy reports HTTP. Set ENABLE_HTTPS_REDIRECT=false only when another verified layer enforces HTTPS.

## Deployment work still required

- Configure MongoDB TLS, encryption at rest, backups, database roles and network access in the database provider. These cannot be verified from repository code. Personal profile fields are not separately encrypted by this application.
- Set production AUTH_URL to HTTPS and provide a strong private AUTH_SECRET and Google OAuth credentials. Better Auth selects secure cookies for HTTPS origins. Verify actual Set-Cookie headers on the deployed origin.
- The hosting proxy must overwrite client IP and forwarded-protocol headers before forwarding requests; otherwise IP-based rate limits and redirects cannot be trusted.
- CAPTCHA/bot challenge requires a configured provider and both server verification and a browser challenge. Rate limiting is present; a CAPTCHA challenge is not enabled.
- Optional GA4 needs a real NEXT_PUBLIC_GA_ID. It loads only after optional consent. A missing ID deliberately disables tracking.
- Publish a real postal contact address only after the organizer supplies one. The existing contact email remains clickable.
- If a secret is found in Git history, rotate/revoke it first. Coordinate any history rewrite with repository collaborators; removing text cannot revoke credentials.

## Verification boundaries

A successful local build or static scan is not proof of hosting settings, database encryption, real-device behavior, or exhaustive security. See docs/launch-checklist.md for the status of each requested launch item.
