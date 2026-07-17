# Implementation Plan: SEO & Indexing Foundation

**Branch**: `002-seo-indexing-foundation` | **Date**: 2026-07-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification + [research.md](./research.md) (Phase 0 senior-SEO audit: seo-audit / programmatic-seo / ai-seo methodologies)

## Summary

Get every real page of `moket-elsuarye.com` indexed, ranking for Arabic موكيت/أرضيات + Riyadh intent, and citable by AI engines. The site starts from **zero index presence in a SERP crowded with three near-identical «السريع» namesake competitors** (including `mokeet-elsuarye.com` — an unrelated competitor whose domain once leaked into this codebase; no redirect/cross-link is ever permissible). Strategy: (A) consolidate the canonical host + get verified and submitted fast, (B) build the dedicated category/service landing-page inventory that the winning competitor pattern proves out, (C) metadata uniqueness + alt coverage, (D) schema + GEO enrichment for brand-entity differentiation, (E) owner-authored article pipeline + CWV. Riyadh-only, lead-gen (no prices), brand «السريع للموكيت والأرضيات» finalized.

## Technical Context

**Language/Version**: TypeScript (strict), Next.js 16.2.9 (App Router, RSC, Turbopack), React 19.2.4
**Primary Dependencies**: next/image + sharp, Tailwind CSS v4, existing design system (`app/ds-storefront.css`)
**Storage**: N/A — static data modules (`lib/data/products.ts`, `lib/data/business.ts`, `lib/blog/posts.ts`); SEO single source `lib/seo/site.ts`
**Testing**: `next build` (type + SSG gate), Playwright screenshot verification, curl checks of live surfaces, Google Rich Results / Schema validator, Lighthouse (mobile)
**Target Platform**: Vercel (deploys `main`), production domain `moket-elsuarye.com` (canonical non-www, pending owner flip)
**Project Type**: Web application (existing storefront — this feature adds pages/metadata/config only)
**Performance Goals**: CWV pass on mobile for home/category/product: LCP < 2.5s, CLS < 0.1, INP < 200ms
**Constraints**: Arabic-only RTL; lead-gen (no prices/cart); English-only repo text; no app-level host redirects (Vercel handles hosts — regression guard from 2026-07-17 outage)
**Scale/Scope**: 9 products, 4→5 categories, ~8 planned articles; ~35 indexable URLs end-state

## Constitution Check

| Gate | Status | Notes |
|---|---|---|
| SEO is rule #1 | ✅ | This feature is the SEO initiative itself |
| Mobile-first | ✅ | New pages reuse existing responsive DS components |
| Lead-gen, no prices | ✅ | All new pages CTA to WhatsApp/call; price questions answered qualitatively («حسب الكمية والخامة») |
| Faithful design system | ✅ | Category/service pages compose existing `.ccard`/`.pcard`/`.page-hero`/`.faq-item` patterns — no new visual language |
| Spec-kit flow | ✅ | spec → plan (this) → tasks → implement |
| Git-flow + English repo | ✅ | Feature branch `002-…`, English commits/PRs, Arabic only as content data |

## Project Structure

### Documentation (this feature)

```text
specs/002-seo-indexing-foundation/
├── spec.md              # Done
├── research.md          # Done (Phase 0 audit)
├── plan.md              # This file
├── keyword-map.md       # Phase 1: canonical keyword→page mapping (EN doc, AR data)
└── tasks.md             # /speckit-tasks output (next)
```

### Source Code (repository root)

```text
app/
├── c/[category]/page.tsx        # NEW dedicated category landing pages (SSG ×4-5)
├── services/tarkeeb/page.tsx    # NEW installation-service page («تركيب موكيت بالرياض»)
├── layout.tsx                   # + GSC/Bing verification meta tags; brand finalized
├── sitemap.ts                   # swap ?cat= URLs → /c/ URLs; add service page
├── mokeet/page.tsx              # ?cat= views canonicalize to /c/[category]
├── p/[slug]/page.tsx            # keyword-mapped H1/copy pass; alt-text audit
└── llms.txt/route.ts            # + categories/service links; keep synced

lib/
├── seo/site.ts                  # unchanged (single source) — guard: no local copies
├── data/business.ts             # brand marked FINAL; NAP source of truth
└── data/categories.ts           # NEW: per-category SEO copy (intro, FAQ, keyword)

```

**Structure Decision**: extend the existing single Next.js app; all SEO copy lives in typed data modules (`lib/data/categories.ts`) so pages stay thin and copy is reviewable in one place.

## Execution Phases

### Phase A — Host consolidation & fast verification (P1, unblocks indexing)
1. Owner action (documented, hand-held): flip Vercel primary domain → non-www so the canonical URL serves 200 directly.
2. GSC + Bing verification meta tags in `layout.tsx` (env-var driven); owner adds properties, verifies, submits sitemap immediately — indexing clock starts now, in parallel with all later phases.
3. Regression guards in place: grep that the competitor domain string and duplicate `SITE_URL` consts never re-enter the repo; no app-level host redirects.
   **Gate: SC-001/003 start, FR-001/002/013/014.**

### Phase B — Category & service landing pages (P1, the ranking inventory)
1. `lib/data/categories.ts`: per category — slug, H1, title/description, unique 120–180-word intro (programmatic-SEO quality bar: no template-swapping), 3–4 category FAQs, target keyword.
2. `/c/[category]` (SSG): breadcrumb + Breadcrumb schema, intro block (40–60-word direct answer first — GEO), product grid (existing ProductCard), FAQ (FAQPage schema), ItemList schema, cross-links to sibling categories + related articles.
3. `/mokeet?cat=…` → `rel=canonical` to `/c/[category]`; navigation/mega-menu links point to `/c/`.
4. Installation-service page «تركيب موكيت وأرضيات بالرياض»: process steps (HowTo-style blocks), areas served (Riyadh districts), FAQs, WhatsApp/call CTAs.
5. `sitemap.ts`: replace param URLs with `/c/` + service page.
   **Gate: SC-007, FR-004/007/009.**

### Phase C — Metadata uniqueness & alt coverage (P1→P2)
1. Title/description uniqueness sweep (all pages vs. D3 keyword map); H1 keyword presence; first-100-words check.
2. Alt-text audit across all gallery images → descriptive Arabic alt from product data.
3. Brand consistency sweep: finalized «السريع للموكيت والأرضيات» everywhere (titles, schema, llms.txt) for namesake differentiation.
   **Gate: SC-002/004/008, FR-003/006/016.**

### Phase D — Schema & GEO enrichment (P2)
1. Validate all existing JSON-LD (Rich Results test); fix errors.
2. Enrich: LocalBusiness (geo, hours, areaServed=Riyadh focus), Product (material/additionalProperty complete), Organization (finalized brand, sameAs when socials exist).
3. GEO passes: direct-answer blocks on categories/products, visible «آخر تحديث», concrete spec numbers; llms.txt updated with categories + service page; confirm robots never blocks AI bots.
   **Gate: SC-005/008/010, FR-008/010/011.**

### Phase E — Content pipeline & CWV (P3)
1. 8 article briefs (from D6) as ready-to-write outlines: keyword, H2 structure as questions, answer-block drafts, internal links, FAQ schema slots. Owner writes; publishing = adding to `lib/blog/posts.ts`.
2. Lighthouse mobile pass on home/category/product; fix top offenders (image priority/sizes, font loading).
   **Gate: SC-006/009, FR-005/007/015.**

## Verification Plan

- Every phase ends with: `next build` + curl of affected live URLs post-deploy + screenshot check for new pages.
- Schema: Google Rich Results Test on one URL per template.
- Coverage: GSC URL-inspection on 5 representative URLs after submission; weekly coverage check during rollout.
- Regression guards: grep-check that no file re-declares `SITE_URL` or the old domain; no host redirects in `next.config.ts`.

## Risks

| Risk | Mitigation |
|---|---|
| Namesake competitors already rank (incl. near-identical domain `mokeet-elsuarye.com`) | Don't fight the shared brand term first; win distinct keyword-page inventory (Phase B) + entity differentiation (Phase D); never link/redirect between the sites |
| Owner actions delayed (Vercel flip, GSC verify) | Tags shipped code-side regardless; phases B–E proceed in parallel |
| Brand-name collision («السريع» namesakes) | Full-name consistency + Organization schema + GBP; monitor brand SERP |
| Arabic-slug encoding duplicates | Canonicals always emit one encoded form; sitemap is the reference form |
| Over-generating thin pages | Only 4–5 categories + 1 service page, each with unique researched copy (programmatic-SEO quality bar) |

## Complexity Tracking

No constitution violations — no new projects, no new dependencies, no design-system changes.
