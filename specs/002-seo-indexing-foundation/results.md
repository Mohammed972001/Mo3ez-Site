# Results — SEO & Indexing Foundation (spec 002)

**Baseline recorded**: 2026-07-18 (day 0 of indexing). Success criteria from
[spec.md](./spec.md). Field-ranking criteria (SC-003/SC-006/SC-009) are
time-based and re-measured over the following weeks from GSC/CrUX.

## Success-criteria status

| ID | Criterion | Status (2026-07-18) | Evidence |
|----|-----------|---------------------|----------|
| SC-001 | 100% of sitemap URLs 200 on the single canonical host, 0 wrong-domain | ✅ **Met** | `seo:verify-live`: 21/21 URLs 200 direct, self-canonical; sitemap has 0 `mokeet-elsuarye`, 0 `?cat=` |
| SC-002 | All real pages indexable, self-canonical, no duplicate/wrong-domain canonical | ✅ **Met** | Live verifier per-URL canonical check passes; `?cat=` canonicalizes to `/c/` |
| SC-003 | ≥90% of submitted URLs indexed within 4 weeks | ⏳ **Pending** (clock started 2026-07-18) | GSC domain property verified, sitemap submitted (20 pages discovered) |
| SC-004 | Every title & meta description unique | ✅ **Met** | `seo:guard` uniqueness check: 22/22 unique titles, 0 duplicate descriptions |
| SC-005 | Structured data validates with 0 errors (home/product/category) | ✅ **Met (lab)** | `seo:verify-live` asserts valid JSON-LD on every URL; templates: Org/WebSite/LocalBusiness, Product, BreadcrumbList, FAQPage, ItemList, Service |
| SC-006 | CWV pass on mobile (LCP<2.5s, CLS<0.1, INP<200ms) | 🟢 **On track (lab)** | Preview measurement: **CLS = 0** on home & category; TTFB 33ms, load <500ms; hero + first grid card use `priority`. Field p75 tracked in CrUX/GSC over ~28 days |
| SC-007 | Every category intent has a dedicated indexable page | ✅ **Met** | 4 `/c/[category]` SSG pages live; no intent served only by `?cat=` |
| SC-008 | Business facts identical across all surfaces | ✅ **Met** | Single `business` source feeds UI + JSON-LD + llms.txt; verified in build |
| SC-009 | Impressions for target queries within 8 weeks | ⏳ **Pending** | Re-measure in GSC Search Performance (owner exports CSV) |
| SC-010 | AI engine extracts name + phone + city + ≥3 products from a page | ✅ **Met (spot-check)** | `llms.txt` + JSON-LD carry NAP + 9 products + brand-differentiation line |

## What shipped (T001–T031, code-side)

- Single sources locked: `SITE_URL` (non-www), `business` NAP (brand finalized).
- `scripts/seo-guard.mjs` (`npm run seo:guard`) + `scripts/verify-live-seo.mjs`
  (`npm run seo:verify-live`).
- Dedicated `/c/[category]` landing pages (×4) with unique copy, FAQ, JSON-LD.
- `/services/tarkeeb` installation-service page (SERP-gap intent).
- `?cat=` → `/c/` canonicalization; sitemap lists `/c/` (no params).
- GSC/Bing verification via env-driven meta tags.
- Real 404 page; internal-linking pass (no orphans); enriched `llms.txt`.
- CWV: `priority` on hero + first above-the-fold grid card; images `sharp`-optimized.
- 8 article briefs; README SEO architecture section; owner-actions handbook.

## Owner-completed (verified)

- Vercel primary domain → non-www (live: non-www 200 direct, www 308). ✅
- GSC domain property verified (DNS TXT); `sitemap.xml` submitted. ✅
- Bing Webmaster imported from GSC; processing (≤48h). ✅

## Open / owner-gated tail

- **T021** — URL-inspection of 5 URLs in GSC (owner; or CSV to maintainer once data accrues).
- **T027–T028** — publish blog article #1 from `article-briefs.md` (owner writes; priority order 1→2→3→5→7→4→6→8).
- **SC-003/009** — re-measure indexation & impressions at weeks 4 and 8.
- **GBP** — create/verify Google Business Profile (largest local lever; owner-actions.md #4).

## Note on data access

There is **no Google Search Console connector** in this environment. GSC data
(coverage, queries, URL inspection) is supplied by the owner as **CSV exports**
when needed — do not wait for or suggest a GSC MCP/connector.
