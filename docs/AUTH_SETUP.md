# Login and profile setup

This feature uses Better Auth with MongoDB for Google OAuth, email/password accounts, and persistent sessions. The landing page links to `/login`. New accounts continue to `/onboarding`; complete profiles are available at `/profile`. Creating a profile does not register someone for an event.

## Environment

Keep these values in `.env.local` locally and Vercel's project environment settings on deployment. Never commit the real values or use `NEXT_PUBLIC_` for secrets.

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
- Each account creates one profile. Repeat saves return 409 and the UI opens the saved profile. Editing/deleting accounts and profile data is not part of this iteration.
- Auth collections use the `gh_auth_` prefix; initialization creates unique email, session-token, account-provider and rate-limit indexes plus expiry indexes. Profiles use a unique account ID as the MongoDB primary key.

## Local checks

```sh
npm run dev
npm run test
npm run lint
npm run build
```

Use an isolated test database for integration tests. Test signup, profile save, reload, logout, returning login, two-user isolation, invalid uploads, unauthorized requests, and cancelled Google consent. A live Google login requires the owner's registered OAuth configuration and interactive consent.

References: [Better Auth Next.js](https://better-auth.com/docs/integrations/next), [MongoDB adapter](https://better-auth.com/docs/adapters/mongo), [Google provider](https://better-auth.com/docs/authentication/google).
