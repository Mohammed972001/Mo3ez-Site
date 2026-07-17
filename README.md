# موكيت السريع — moket-elsuarye.com

Production storefront for **السريع للموكيت والأرضيات**, a Riyadh (KSA) moquette &
flooring business. Arabic-first (RTL), mobile-first, **lead-gen catalog** — no
cart, no checkout, no online prices; every enquiry goes to WhatsApp or a call.
Built with Next.js (App Router, RSC) and deployed on Vercel.

## Tech stack

- **Next.js 16** (App Router, React Server Components, Turbopack) · TypeScript (strict)
- **Tailwind CSS v4** + a ported design system (`app/ds-*.css`)
- **next/image** + `sharp` for image optimization
- Static data modules (no database) · SSG for products & category pages

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also the type + SSG gate)
npm run start      # serve the production build
```

## Project scripts

| Script | What it does |
|--------|--------------|
| `npm run build` | Production build; fails on type errors or SSG failures |
| `npm run seo:guard` | Regression guard — see below (run in CI / before release) |
| `npm run seo:verify-live [origin]` | Post-release sweep of the live sitemap (200 / self-canonical / valid JSON-LD) |

## SEO architecture

SEO is the product's first-order requirement. Key rules and single sources of truth:

- **`lib/seo/site.ts` → `SITE_URL`** is the **only** place the site origin is
  defined (`https://moket-elsuarye.com`, non-www canonical). Never re-declare it
  locally — `metadataBase`, sitemap, robots, `llms.txt`, and every JSON-LD `@id`
  derive from it.
- **`lib/data/business.ts` → `business`** is the single source for NAP (name,
  address, phone, hours, service areas), consumed by the UI **and** LocalBusiness/
  Organization JSON-LD. The brand name is finalized — change it in one place only.
- **`lib/data/categories.ts`** holds per-category SEO copy for the dedicated
  `/c/[category]` landing pages (unique intro, guide copy, FAQs, target keyword).
- **`lib/data/products.ts`** holds the 9 products (folder = product) with galleries,
  specs, FAQs, and keyword lists.

### Routes that matter for SEO

- `/` home · `/mokeet` catalog · `/c/[category]` dedicated category hubs (SSG)
- `/p/[slug]` product pages (SSG ×9) · `/services/tarkeeb` installation service
- `/blog` + `/blog/[slug]` · `/sitemap.xml` · `/robots.txt` · `/llms.txt`
- `/mokeet?cat=…` filtered views **canonicalize** to `/c/[category]` (no duplicate index)

### Canonical host

Non-www is canonical. Host canonicalization (www → non-www) is handled at the
**Vercel domain level** — **never** add an app-level host redirect (it fights
Vercel's redirect and caused an infinite loop once). `next.config.ts` documents this.

### Search-console verification

Verification tags render only when these env vars are set (see `.env.example`),
so set them in Vercel → Settings → Environment Variables and redeploy:

- `NEXT_PUBLIC_GSC_VERIFICATION` — Google Search Console HTML-tag token
- `NEXT_PUBLIC_BING_VERIFICATION` — Bing `msvalidate.01` token

### Regression guard (`npm run seo:guard`)

Fails the build if a known-fatal SEO mistake reappears:

1. The competitor domain string `mokeet-elsuarye` in source (it once leaked in).
2. A duplicated `const SITE_URL` outside `lib/seo/site.ts`.
3. An app-level host redirect in `next.config.ts`.
4. (after a build) duplicate `<title>` or `<meta description>` across pages.

## Spec-kit

Work is planned with spec-kit under `specs/`:

- `specs/001-foundation/` — the initial storefront build.
- `specs/002-seo-indexing-foundation/` — the SEO initiative (spec, research,
  plan, tasks, owner-actions, article-briefs, results).

## Repository conventions

- **English only** for all repository text — commits, PR titles/bodies, code
  comments, docs. Arabic appears only as **user-facing content data**.
- Git flow: feature → `develop` → `main` (protected; PRs required). `main`
  auto-deploys to production on Vercel.
