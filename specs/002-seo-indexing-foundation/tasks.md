# Tasks: SEO & Indexing Foundation

**Input**: Design documents from `/specs/002-seo-indexing-foundation/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md)

**Tests**: Not requested — verification is per-task (build + curl + validators + Playwright screenshots) as defined in plan.md's Verification Plan.

**Organization**: Grouped by user story (US1–US6 from spec.md), dependency-ordered. Story mapping:
US1 = right page ranks for the query · US2 = full discovery/indexation · US3 = owner monitoring (GSC/Bing) · US4 = AI/GEO citability · US5 = dedicated category pages · US6 = article pipeline.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Single sources of truth + guards that every story depends on.

- [x] T001 Finalize brand in `lib/data/business.ts`: mark name «السريع للموكيت والأرضيات» as FINAL (remove "undecided" comments), keep NAP as single source; English comments per repo rule
- [x] T002 [P] Create `lib/data/categories.ts`: typed per-category SEO module — slug, nameAr, H1, title, metaDescription, target keyword, unique 120–180-word Arabic intro, 3–4 category FAQs (from research.md D3 keyword table)
- [x] T003 [P] Add regression guard script `scripts/seo-guard.mjs`: fails if repo contains `mokeet-elsuarye` (competitor domain), a second `const SITE_URL` declaration, or host redirects in `next.config.ts`; wire as `npm run seo:guard`

**Checkpoint**: `npm run seo:guard` passes; build green.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Verification tags + host consolidation docs — unblocks the indexing clock (plan Phase A).

- [x] T004 Add GSC + Bing verification meta tags to `app/layout.tsx` via `metadata.verification` (values from `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_BING_VERIFICATION` env vars; render only when set); document in `.env.example`
- [x] T005 [P] Write `specs/002-seo-indexing-foundation/owner-actions.md` (English): step-by-step for (1) Vercel primary-domain flip to non-www, (2) adding GSC/Bing properties + Verify + sitemap submission, (3) Google Business Profile creation with exact NAP, (4) claude.ai connector authorization for Ahrefs/Similarweb
- [x] T006 Deploy checkpoint: merge Phases 1–2 to develop→main, verify live `<meta name="google-site-verification">` renders when env set, then hand owner-actions.md to owner

**Checkpoint**: Owner can verify + submit sitemap — indexing starts in parallel with everything below.

---

## Phase 3: US5 — Dedicated category landing pages (P1 inventory; serves US1+US2)

**Goal**: One clean, indexable, keyword-targeted URL per category — the ranking inventory (plan Phase B).
**Independent test**: Each `/c/[slug]` returns 200 SSG, unique H1/title/intro, product grid, FAQ, breadcrumb; reachable from nav; `?cat=` canonicalizes to it.

- [x] T007 [US5] Build `app/c/[category]/page.tsx` (SSG via generateStaticParams over `lib/data/categories.ts`): breadcrumb + BreadcrumbList JSON-LD, 40–60-word direct-answer intro block (GEO), unique category copy, product grid (existing ProductCard), category FAQ `<details>` + FAQPage JSON-LD, ItemList JSON-LD, cross-links to sibling categories
- [x] T008 [US5] Add `generateMetadata` per category: unique title «{category} بالرياض | {brand}», meta description with CTA, self canonical `/c/{slug}`
- [x] T009 [US5] Update `app/mokeet/page.tsx`: filtered views (`?cat=…`) emit `rel=canonical` to the matching `/c/[slug]`; unfiltered view keeps self-canonical
- [x] T010 [P] [US5] Update navigation to link `/c/…`: `components/layout/MegaMenu.tsx` category links + `components/layout/Footer.tsx` category column
- [x] T011 [US5] Update `app/sitemap.ts`: replace `?cat=` URLs with `/c/[slug]` URLs (priority 0.8); keep products/statics
- [x] T012 [US5] Verify: `next build` (SSG count grows), Playwright screenshots desktop+mobile of one category page, curl canonical/robots of `/c/…` on preview

**Checkpoint**: Category inventory live and linked — US5 independently delivered.

---

## Phase 4: US1 — Keyword-mapped on-page targeting (P1)

**Goal**: Every money page targets its query from research.md D3 (plan Phases B4+C).
**Independent test**: Titles/descriptions unique site-wide; H1 contains target keyword; installation intent has a dedicated page.

- [x] T013 [US1] Create installation-service page `app/services/tarkeeb/page.tsx` («تركيب موكيت وأرضيات بالرياض»): SSG, hero + direct-answer block, process steps (numbered, HowTo-friendly), Riyadh areas served, FAQs + FAQPage JSON-LD, WhatsApp/call CTAs, links from Footer + relevant categories; add to sitemap
- [x] T014 [US1] Title/H1/copy sweep per D3 mapping: `app/page.tsx` (home), `app/mokeet/page.tsx`, all product pages via `lib/data/products.ts` SEO fields — target keyword in title ≤60 chars, H1, and first 100 words; no duplicate titles/descriptions site-wide
- [x] T015 [P] [US1] Alt-text audit: ensure every gallery/category/hero image gets descriptive Arabic alt from product/category data (`components/product/Gallery.tsx`, `components/home/ProductCard.tsx`, category page media)
- [x] T016 [US1] Verify: build + script check for title/description uniqueness across rendered pages (extend `scripts/seo-guard.mjs`), screenshot service page

**Checkpoint**: Every commercial intent from the keyword table has exactly one targeted page.

---

## Phase 5: US2 — Full discovery & indexation hygiene (P1)

**Goal**: Crawlers reach every real page; zero duplicates/orphans/soft-404s (plan Phase A guards + C).
**Independent test**: All sitemap URLs 200 self-canonical; no orphan pages; 404s return 404.

- [ ] T017 [US2] Internal-linking pass: home «تسوّق حسب النوع» cards → `/c/…`; product pages link their category page; blog empty-state links categories — no orphan among the ~35 URLs
- [ ] T018 [P] [US2] Confirm 404 behavior: unknown `/p/…`, `/c/…`, `/blog/…` slugs call `notFound()`; add `app/not-found.tsx` with helpful Arabic links (still HTTP 404)
- [ ] T019 [US2] Post-deploy verification sweep: script `scripts/verify-live-seo.mjs` — fetch every sitemap `<loc>`, assert 200 + self-canonical + correct host; run against production after merge

**Checkpoint**: Discovery graph complete and verified against production.

---

## Phase 6: US3 — Monitoring live (P2, owner-gated)

**Goal**: GSC + Bing verified, sitemap accepted, coverage visible (plan Phase A.2 completion).
**Independent test**: Properties verified; sitemap "Success"; URL inspection of 5 URLs = indexable.

- [ ] T020 [US3] Support owner through owner-actions.md: confirm env vars set in Vercel, verification passes, sitemap submitted in GSC + Bing
- [ ] T021 [US3] Run URL-inspection checks on 5 representative URLs (home, one category, one product, service page, blog index); log results + fix any coverage errors found

**Checkpoint**: Coverage/performance reports populating — SC-003 clock running.

---

## Phase 7: US4 — Schema & GEO enrichment (P2)

**Goal**: Zero-error structured data + AI-citable structure (plan Phase D).
**Independent test**: Rich Results Test passes per template; llms.txt current; AI engine extracts correct NAP+products.

- [ ] T022 [US4] Validate all JSON-LD templates (home, category, product, service, blog) with Google Rich Results Test; fix every error/warning
- [ ] T023 [P] [US4] Enrich schema: LocalBusiness (geo coordinates, openingHoursSpecification 24/7, areaServed Riyadh emphasis), Product (material + full additionalProperty from specs), Organization (finalized brand; add sameAs when socials exist) in `app/page.tsx` + `app/p/[slug]/page.tsx`
- [ ] T024 [P] [US4] Update `app/llms.txt/route.ts`: add categories `/c/…` + service page + brand differentiation line; keep product list synced
- [ ] T025 [US4] GEO structure pass: visible «آخر تحديث» dates on category/service pages; concrete spec numbers (densities/thicknesses/warranty) in product specs; confirm robots.txt has no AI-bot blocks

**Checkpoint**: US4 deliverable — machine-readable layer complete and validated.

---

## Phase 8: US6 — Article pipeline (P3, owner writes)

**Goal**: 8 ready-to-write briefs + publishing path (plan Phase E.1).
**Independent test**: A brief converted to a post renders indexable with Article schema + internal links.

- [x] T026 [P] [US6] Write `specs/002-seo-indexing-foundation/article-briefs.md`: 8 briefs from research D6 — each with target keyword, Arabic H2 outline phrased as questions, 40–60-word answer-block draft per section, internal links to `/c/`+`/p/`, FAQ slots
- [ ] T027 [US6] Extend `lib/blog/posts.ts` Post type if needed (FAQ field, updatedAt) + ensure `app/blog/[slug]/page.tsx` renders FAQPage schema when FAQs present and visible «آخر تحديث»
- [ ] T028 [US6] Publish article #1 with owner's content (or placeholder-reviewed draft of brief #1 upon owner approval) to prove the pipeline end-to-end

**Checkpoint**: Owner can ship articles by editing one data file.

---

## Phase 9: Polish & Cross-Cutting

- [ ] T029 [P] Lighthouse mobile audit on home/category/product; fix top CWV offenders (LCP image priority/sizes, font loading, CLS reserves) to meet LCP<2.5s / CLS<0.1 / INP<200ms
- [ ] T030 [P] Update `README.md` (English): SEO architecture section — single sources (`lib/seo/site.ts`, `lib/data/business.ts`, `lib/data/categories.ts`), guards, verification env vars
- [ ] T031 Final release: PR feature→develop→main; run `scripts/verify-live-seo.mjs` against production; record SC-001…SC-010 baseline status in `specs/002-seo-indexing-foundation/results.md`

---

## Dependencies

```text
Phase 1 (T001–T003) ──► Phase 2 (T004–T006) ──► [owner: verify+submit] ──► Phase 6 (US3)
        │
        └──► Phase 3 (US5: T007–T012) ──► Phase 4 (US1: T013–T016) ──► Phase 5 (US2: T017–T019) ──► Phase 6/7
                                                                                     Phase 7 (US4: T022–T025) ──► Phase 8 (US6: T026–T028) ──► Phase 9
```

- US5 before US1: the on-page sweep targets the new category URLs.
- US3 is owner-gated but non-blocking: everything else proceeds in parallel once T006 deploys.
- US4 after US5/US1: enriches pages that then exist.

## Parallel Opportunities

- T002 ∥ T003 (different files) · T005 ∥ T004 · T010 ∥ T007-T009 (nav vs page) · T015 ∥ T013–T014 · T018 ∥ T017 · T023 ∥ T024 · T026 ∥ T027 · T029 ∥ T030

## Implementation Strategy

**MVP = Phases 1–3** (guards + verification tags + category inventory): this alone makes the site verifiable, submittable, and gives every commercial intent an indexable page. Ship it as one PR, hand owner-actions to the owner, then iterate Phases 4–9 in priority order — each phase is an independently shippable increment gated by its checkpoint.
