# Login, profiles and event tickets

This feature uses Better Auth with MongoDB for Google OAuth, email/password accounts, and persistent sessions. The landing page links to `/login`. New member accounts continue to `/onboarding`; complete profiles are available at `/profile`. Signed-in members can open `/tickets` even before completing their profile. Master admins land at `/admin`. Creating a profile does not register someone for an event or issue a ticket.

## Environment

Keep these values in `.env.local` locally and Vercel's project environment settings on deployment. Never commit the real values or use `NEXT_PUBLIC_` for secrets.

Admin access, ticket storage and check-in use the existing auth and MongoDB configuration below; there are no additional environment variables for these features.

```dotenv
GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
MONGODB_URI=mongodb+srv://username:encoded-password@cluster.example.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=goldenhour
AUTH_SECRET=your-random-secret-at-least-32-characters
AUTH_URL=http://localhost:3000
```

`MONGODB_DB` explicitly selects the database even if the connection URI has no database path. The MongoDB user needs read/write and index-creation permissions for that database. Use an Atlas replica set; auth account creation uses transactions. Add the application's server egress IPs to Atlas Network Access. For Vercel, configure networking appropriate to the deployment rather than assuming your laptop's allowed IP also permits the deployed app.

Set `AUTH_URL` to the exact HTTPS production origin in Vercel (no path). Scope deployment secrets to the intended environment and redeploy when changing them. Google OAuth needs this exact authorized redirect URI:

```text
http://localhost:3000/api/auth/callback/google
https://YOUR-PRODUCTION-HOST/api/auth/callback/google
```

Use an External Google audience for personal Gmail accounts. Configure the app's branding, homepage and privacy-policy URLs in Google Auth Platform. A changing Vercel preview URL needs its own allowed origin/callback and matching `AUTH_URL`; use a stable preview domain for OAuth testing. Keep development/preview and production databases separate.

## Behavior and limits

- Email signup uses a password of 12–128 characters. Better Auth hashes passwords and handles session cookies, CSRF checks, OAuth state and database-backed auth rate limits.
- Email delivery, verification messages and password recovery are not configured in this iteration. Email accounts remain unverified. Automatic account linking is disabled, so Google cannot merge with an existing password account merely because the email matches; return using the original login method.
- Profile fields are required. Gender includes “Prefer not to say.” DOB must be a real date from 1900 and before today; account creation does not establish event age eligibility or guardian consent.
- Pictures accept still JPEG, PNG or WebP, at most 2 MB and 16 megapixels. The server decodes, strips metadata and re-encodes the image to WebP up to 512×512. Images and profile details are stored in `gh_profiles`, keyed by the authenticated account, and served privately without caching.
- Each account creates one profile. Repeat saves return 409 and the UI opens the saved profile. Master admins can edit account names, email addresses and profile details, including replacing profile pictures. Members cannot edit their own saved profiles in this iteration. Account deletion is not implemented.
- Auth collections use the `gh_auth_` prefix; initialization creates unique email, session-token, account-provider and rate-limit indexes plus expiry indexes. Profiles use a unique account ID as the MongoDB primary key.

## Master admins

`abhinavgoyal300@gmail.com` and `yadivya070909@gmail.com` are the fixed master-admin email addresses. Use **Continue with Google** with one of those accounts. Admin authorization requires an allowlisted address and a verified identity; typing an admin address into email/password signup does not grant access and is rejected. Email verification and automatic account linking remain disabled for password accounts. If a master address already belongs to an older unverified password account, Google cannot automatically merge it; review that account before changing its data.

The admin area lists all accounts, including incomplete profiles, with search and pagination. Admins can edit member information and assign tickets. Changing a password account's email clears its verified status and ends its existing sessions. Google-linked accounts keep their Google email so the original identity cannot retain access to a reassigned address. The UI cannot add admins, edit roles, transfer a master-admin address to another account or change a master-admin email. Administrative account edits are recorded in `gh_admin_audit` with the actor, target and time.

## Tickets and venue check-in

1. In `/admin`, choose a member and upload their ticket slip. Enter the event name, optional event date and optional venue. Use the same event name and date for tickets belonging to the same event. Each slip must contain a readable QR unique to that event.
2. Ticket images accept still PNG, JPEG or WebP, up to 4 MB and 20 megapixels. The server decodes the QR, strips image metadata and stores a lossless PNG without cropping or resizing the stored slip. Images that exceed 12 MB after normalization are rejected. The slip and event assignment are stored in `gh_tickets` with the member ID and uploading admin; the extracted QR is stored as a hash.
3. The member opens **My tickets** at `/tickets` to view the event, full slip and entry status, or open/download the image. Ticket images are served privately without caching, only to the assigned member or a master admin. Other members cannot read them.
4. At the venue, an admin opens `/admin/check-in`, selects the event and starts the camera, or chooses a QR image. Camera use requires permission and HTTPS (localhost is also supported). QR decoding happens in the browser; only the QR value and selected event are sent for check-in. Scanned links are not opened.
5. The first valid scan atomically changes the ticket to checked in and records the time and scanning admin. A repeated or concurrent scan cannot admit the ticket again. A QR for another event is rejected. The result shows the ticket holder so the venue team can confirm the entry.

## Local checks

```sh
npm run dev
npm run test
npm run lint
npm run build
```

Use an isolated test database for integration tests. Test signup, profile save, reload, logout, returning login, two-user isolation, invalid uploads, unauthorized requests, and cancelled Google consent. Also test unverified admin denial, admin edits, ticket assignment and private image access, event selection, first check-in, repeat and concurrent scan rejection. A live Google login requires the owner's registered OAuth configuration and interactive consent.

`tests/admin-tickets-flow.mjs` runs those admin/ticket HTTP and browser checks against a newly generated temporary database, then removes that database. It requires Playwright (optionally located through `PLAYWRIGHT_MODULE_PATH`), Microsoft Edge, and `ADMIN_TEST_OUTPUT` pointing to an evidence folder outside the repository. The MongoDB credential must be allowed to create and remove the temporary `gh_admin_test_*` database. The test uses a verified admin fixture and a simulated camera; it does not perform real Google consent or validate a physical camera.

References: [Better Auth Next.js](https://better-auth.com/docs/integrations/next), [MongoDB adapter](https://better-auth.com/docs/adapters/mongo), [Google provider](https://better-auth.com/docs/authentication/google).
