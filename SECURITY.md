# Security notes

GOLDENHOUR is currently a static Next.js event site. It has no application API, user account system, database, file-upload endpoint, password flow, or server-side session store. As a result, database row-level security, query parameterization, password hashing, server-side authorization, session-cookie hardening, upload restrictions, and login rate limiting are not active surfaces in this repository.

The registration-interest form is deliberately client-side only and does not persist personal data. It validates name and email format, shows explicit error/loading/success states, and provides a direct email fallback. If a backend is added later, it must validate and authorize on the server, use parameterized queries, apply rate limiting and bot protection, and store secrets outside the repository.

The site currently includes security response headers, HSTS, HTTPS redirect middleware for production proxies, no committed secret-pattern matches, and no production dependency vulnerabilities at the time of the latest audit. Analytics is disabled unless `NEXT_PUBLIC_GA_ID` is configured and the visitor accepts optional cookies.
