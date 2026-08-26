# CleanConstruct

React + Vite rebuild of the downloaded CleanConstruct WordPress website. The visual language, imagery, typography, colors and content hierarchy are based on the supplied WordPress files; the information architecture, local landing pages, quote flow and metadata also implement the supplied SEO & Local Search Audit.

The original `public_html (3)` directory and the audit PDF are preserved unchanged as source material.

## What is included

- Responsive React frontend with the original navy, white and gold visual system.
- Dedicated service pages, București and Ilfov landing pages, blog, contact and company pages.
- Nine exported WordPress posts in `content/posts`, one JSON file per article.
- Optimized site media in `public/assets`, separate from the posts.
- Supabase schema, private quote-photo storage and post seed in `supabase/sql`.
- A quote form that writes leads to Supabase and accepts up to four private images.
- Vercel Web Analytics integration for first-party page-view measurement after deployment.
- SEO titles, descriptions, canonicals, Open Graph data, JSON-LD, `robots.txt`, a generated `sitemap.xml`, `llms.txt`, `llms-full.txt` and per-route Markdown mirrors.
- Pre-rendered HTML for every public route, plus Vercel redirects, static-asset caching and baseline security headers.

## Project structure

```text
content/posts/          WordPress articles exported as portable JSON
public/assets/          Brand, site, service, post and legal media
public/ai-content/      Build-generated Markdown mirrors for AI-readable discovery
docs/                   SEO implementation map and legitimate backlink plan
scripts/                WordPress export and Supabase import utilities
src/                    React application
supabase/sql/           SQL files to paste into Supabase
public_html (3)/        Untouched downloaded WordPress source
```

## Run locally

Use Node 22 (the version is also recorded in `.nvmrc`):

```bash
nvm use
npm install
cp .env.example .env.local
npm run dev
```

The site still renders all local posts when Supabase is not configured. The quote form intentionally displays a configuration message until valid Supabase browser credentials are present. `npm run build` pre-renders every known route and regenerates the sitemap, AI-readable files and Markdown mirrors.

## Set up Supabase

Create a Supabase project, open **SQL Editor**, and paste/run these files in order:

1. `supabase/sql/01_schema.sql`
2. `supabase/sql/02_quote_storage.sql`
3. `supabase/sql/03_seed_posts.sql`

Then copy the project URL and publishable/anonymous key from Supabase project settings into `.env.local`:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_KEY
```

The browser key is expected to be public; row-level security protects the data. Anonymous visitors can read only published posts and insert a quote request. They cannot read submitted leads or uploaded photos. Keep the service-role key server-side only.

If article JSON is edited later, regenerate the pasteable seed with:

```bash
npm run content:sql
```

Alternatively, import directly using a server-only service-role key:

```bash
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run content:push
```

## Deploy to Vercel

1. Push this directory to a Git repository.
2. Import the repository in Vercel and keep the detected framework as **Vite**.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Project Settings → Environment Variables for Production, Preview and Development.
4. Optionally set `VITE_BUSINESS_PHONE` and `VITE_WHATSAPP_NUMBER`.
5. Deploy. `vercel.json` already defines the build, output folder, redirects, caching and headers. Public routes are emitted as static HTML, so the deployment does not depend on an SPA catch-all for known pages.
6. Open the Vercel project's **Analytics** tab and enable Web Analytics. The React component is already installed and injects `/_vercel/insights/script.js` on the deployed site.
7. Add `cleanconstruct.ro` in Vercel Domains, point DNS as instructed there, then submit `https://cleanconstruct.ro/sitemap.xml` in Google Search Console.

## Verify before publishing

The audit uses București/Ilfov as the proposed local-search target, while the source site does not provide a full postal address or unambiguous service-area proof. Confirm these business facts before making the production deployment:

- Service coverage really is București and Ilfov.
- The current live-site phone `+40 726 631 898` still belongs to the company. The older downloaded snapshot contains a different number and is not used as the frontend default.
- `support@steficlean.com` and Monday–Friday, 08:00–21:00 are current.
- WhatsApp number, if used, belongs to the company and can receive customer enquiries.
- Legal identifiers are current: STEFI CLEAN CONSTRUCT S.R.L., CUI 43678075, J51/101/2021, EUID ROONRC.J51/101/2021.
- Replace any stock/team imagery with verified company photos when available.
- Add a real street address and Google Business Profile link only after they are verified.

Because the public upload policy supports a browser-only form, enable Supabase abuse protection and monitor Storage before a high-traffic launch. A serverless submission endpoint with CAPTCHA/rate limiting is the recommended next hardening step.

## Search visibility and backlinks

The technical implementation is mapped in [`docs/SEO-AUDIT-IMPLEMENTATION.md`](docs/SEO-AUDIT-IMPLEMENTATION.md). The 30/60/90-day acquisition workflow, profile checklist and Romanian outreach template are in [`docs/BACKLINK-AND-AI-SEO-PLAN.md`](docs/BACKLINK-AND-AI-SEO-PLAN.md).

Do not buy ranking links, automate directory submissions or fabricate addresses, memberships, reviews or partnerships. External links must be earned through verified profiles, real work, useful resources and genuine editorial relationships.
