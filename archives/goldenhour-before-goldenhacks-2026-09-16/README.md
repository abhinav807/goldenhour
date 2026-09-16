# GOLDENHOUR

Premium brutalist landing page for GOLDENHOUR, a student-led 10-hour technology event in Delhi.

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel deployment

The production domain is `https://www.goldenhourdelhi.co.in`. Add that domain to the Vercel project under **Settings → Domains**, then configure the DNS records at the domain registrar as shown by Vercel. Keep both the apex domain and `www` version configured if Vercel recommends both; the site uses the `www` URL as its canonical origin.

Add these project environment variables in **Vercel → Settings → Environment Variables** for **Production** (and Preview if you want preview builds to emit production-style canonical URLs):

| Variable | Value | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.goldenhourdelhi.co.in` | Recommended; the code also uses this as its default fallback |
| `NEXT_PUBLIC_GA_ID` | Your Google Analytics 4 measurement ID, such as `G-XXXXXXXXXX` | Optional; leave unset to keep analytics disabled |
| `ENABLE_HTTPS_REDIRECT` | `false` on Vercel | Optional; Vercel already handles HTTPS redirects |

After changing environment variables, redeploy so Next.js regenerates canonical metadata, Open Graph URLs, `robots.txt`, and `sitemap.xml`. Do not add private API keys: this site currently has no server-side secrets or backend credentials.

## Validation

```bash
npm run lint
npm run build
```
