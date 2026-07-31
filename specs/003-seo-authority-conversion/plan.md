# Implementation Plan: SEO Authority & Conversion

**Branch**: `003-seo-authority-conversion` | **Date**: 2026-07-31 | **Spec**: [spec.md](./spec.md)
**Input**: [spec.md](./spec.md) + [research.md](./research.md) (local-SEO scoring model applied to real GSC data)

## Summary

Spec 002 made the site findable; this phase makes it **rank and convert**. Research scored our local presence at **≈29/100**, with the missing 71 points almost entirely off-site (no business profile, no reviews, no citations, no links). The plan therefore splits cleanly into two tracks running in parallel:

- **Owner track (highest impact)** — business profile, reviews, directory listings. Code can't do these, so the deliverable is an exact, copy-paste-ready operations kit generated *from the site's own data* so nothing drifts.
- **Code track** — the things that make the owner track work and pay off: a reviews system (display + honest schema), a quote/RFQ form for institutional buyers, analytics with conversion events, real-photo swap-in, content expansion for proven-demand queries, and re-verification of the CWV fix.

Riyadh-only, lead-gen (no prices), brand «السريع للموكيت والأرضيات».

## Technical Context

**Language/Version**: TypeScript (strict), Next.js 16.2.9 (App Router, RSC), React 19.2.4
**Primary Dependencies**: existing design system; **new**: a form submission path and an analytics script — both must be lightweight
**Storage**: static data modules; reviews stored as a typed data module (same pattern as products/posts) — no database
**Testing**: `next build` gate, `npm run seo:guard`, `npm run seo:verify-live`, Playwright screenshots, manual form-delivery test, PageSpeed re-measure
**Target Platform**: Vercel, `moket-elsuarye.com` (non-www canonical)
**Project Type**: Web application (extends the existing storefront)
**Performance Goals**: keep CLS 0 and LCP < 2.5s **after** adding analytics + form (FR-014)
**Constraints**: Arabic-only RTL; lead-gen (no prices/cart); English-only repo text; no app-level host redirects; **no fabricated reviews/ratings/offers**; no scraped imagery
**Scale/Scope**: 12 products, 5 categories, 8 articles, ~33 URLs today; +reviews, +quote form, +analytics, +new articles

## Constitution Check

| Gate | Status | Notes |
|---|---|---|
| SEO is rule #1 | ✅ | This phase targets the measured ranking blocker |
| Mobile-first | ✅ | Form and reviews built on existing responsive DS components |
| Lead-gen, no prices | ✅ | Quote form asks for requirements, returns no prices; WhatsApp/call stay primary |
| Faithful design system | ✅ | Reuses `.faq-item`/`.info-card`/`.chips`/`.btn` patterns; no new visual language |
| Spec-kit flow | ✅ | spec → research → plan (this) → tasks → implement |
| Git-flow + English repo | ✅ | Feature branch `003-…`, English commits/PRs, Arabic only as content data |
| Honesty/no manipulation | ✅ | Explicit out-of-scope: fake reviews, bought links, fake offers |

## Project Structure

### Documentation (this feature)

```text
specs/003-seo-authority-conversion/
├── spec.md            # Done
├── research.md        # Done (local-SEO gap analysis on real GSC data)
├── plan.md            # This file
├── owner-playbook.md  # Phase A: exact values + step-by-step for profile/citations/reviews
└── tasks.md           # /speckit-tasks output
```

### Source Code (repository root)

```text
app/
├── quote/page.tsx              # NEW quote/RFQ page (institutional buyers)
├── api/quote/route.ts          # NEW submission endpoint (server-side delivery)
├── layout.tsx                  # + analytics (lightweight, non-blocking)
├── p/[slug]/page.tsx           # + reviews block; aggregateRating ONLY when real
├── c/[category]/page.tsx       # + quote CTA
└── about/page.tsx              # + credentials/trust proof

components/
├── quote/QuoteForm.tsx         # NEW client form (Arabic, validated, mobile-first)
├── reviews/ReviewList.tsx      # NEW genuine-reviews display
└── analytics/Events.tsx        # NEW enquiry-event wiring (WhatsApp/call/form)

lib/
├── data/reviews.ts             # NEW typed reviews (empty until real ones exist)
└── data/business.ts            # unchanged single source — feeds the facts kit

scripts/
└── business-kit.mjs            # NEW: prints the canonical NAP kit for listings
```

**Structure Decision**: keep the static-data pattern (reviews as a typed module like products/posts) so the owner-supplied content is reviewable in git and needs no backend. The only server surface added is the quote endpoint.

## Execution Phases

### Phase A — Owner operations kit (P1, unblocks the 71 missing points)
1. `scripts/business-kit.mjs` generates the canonical NAP/hours/areas/categories text **from `lib/data/business.ts`**, so every external listing is created from one source and can be re-verified later.
2. `owner-playbook.md`: exact step-by-step for (a) creating & verifying the business profile with the correct primary category, (b) claiming the non-Google map/search platforms, (c) regional directory list, (d) a review-request script the team can send after each job, (e) the photo brief for the client.
3. Hand off; owner executes. **Gate: FR-001…FR-005.**

### Phase B — Reviews & trust on-site (P1)
1. `lib/data/reviews.ts` typed module (author, rating, date, text, source) — starts empty by design.
2. `ReviewList` component + placement on product/category/home; visible dates.
3. `aggregateRating` emitted **only** when ≥1 genuine review exists — this is also the honest path to clearing the Product-snippets report.
4. Real-photo swap: documented one-command replacement (`gen-gallery.mjs`) for the AI placeholders. **Gate: FR-006…FR-008, SC-006.**

### Phase C — Conversion paths (P2)
1. `/quote` page + `QuoteForm` (product/type, area m², city/district, name, phone, optional notes) — Arabic, mobile-first, accessible validation.
2. `api/quote` route delivering the submission reliably, with a WhatsApp/call fallback shown on failure; minimal data collection; simple bot protection (honeypot + timing) that never blocks real users.
3. Quote CTA added alongside (never replacing) WhatsApp/call on product & category pages. **Gate: FR-009…FR-012.**

### Phase D — Measurement (P2)
1. Lightweight analytics in `layout.tsx` (deferred/non-blocking) + enquiry events for WhatsApp tap, call tap, form submit — each carrying its source page.
2. Verify no CWV regression after adding it. **Gate: FR-013/FR-014, SC-007.**

### Phase E — Content & indexation continuation (P3)
1. Articles for queries with observed impressions («فني تركيب موكيت بالرياض» support piece, «موكيت تركي مشجر», «فينيل خشبي», «سعر العشب الصناعي») + the new lines (فينيل طبي / أرضيات مستشفيات / باركيه HDF-vs-SPC).
2. Request indexing for the new products/category; confirm full indexation.
3. Re-measure PageSpeed field data to confirm the LCP fix. **Gate: FR-016…FR-018, SC-008/SC-009.**

## Verification Plan

- Every phase: `next build` + `npm run seo:guard` + Playwright screenshots of changed pages; `npm run seo:verify-live` after each release.
- Form: end-to-end submission test from a mobile viewport, plus a deliberate failure test to confirm the fallback.
- Schema: Rich Results test on a product page **before and after** the first real review (no ratings emitted while none exist).
- CWV: PageSpeed mobile re-run after analytics lands (must stay within thresholds).
- Progress: owner CSV exports at weeks 4, 8, 12 → update `results.md` against SC-001…SC-010.

## Risks

| Risk | Mitigation |
|---|---|
| Owner-track items slip (profile/reviews) | Code track ships independently; playbook is copy-paste to minimise friction |
| Profile suspension from wrong category/name | Playbook mandates exact real-world facts, no keyword stuffing in the name |
| Zero reviews for a long period | Review request built into job completion; no gating/incentives so it stays policy-clean |
| Form spam | Honeypot + timing check first; escalate only if abuse appears (avoid CAPTCHA friction) |
| Analytics hurting CWV | Load deferred; re-measure as an explicit gate |
| Ranking timeline expectations | SC targets stated as 4/8/12-week trajectories, not instant results |

## Complexity Tracking

One new server route (quote submission) is the only architectural addition; everything else follows existing static-data and component patterns. No new project, no database.
