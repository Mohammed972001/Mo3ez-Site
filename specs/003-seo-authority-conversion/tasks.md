# Tasks: SEO Authority & Conversion

**Input**: Design documents from `/specs/003-seo-authority-conversion/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md)

**Tests**: Not requested — verification is per-task (build + guard + live sweep + screenshots + manual form/schema checks) per plan.md's Verification Plan.

**Organization**: Grouped by user story (US1–US6). Story mapping:
US1 = Map Pack presence · US2 = trust proof (reviews/photos) · US3 = external citations & AI discoverability · US4 = quote/RFQ path · US5 = measurement · US6 = compounding content.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Create `scripts/business-kit.mjs` (`npm run business:kit`): prints the canonical listing kit — exact name, address, phone (local + international), hours, service areas, website, suggested primary/secondary categories, and the short/long Arabic descriptions — all derived from `lib/data/business.ts` so every external listing uses one source
- [x] T002 [P] Create `lib/data/reviews.ts`: typed `Review` module (author, rating 1–5, date ISO, text, source platform, optional productSlug) exported as an **empty** array with a header comment forbidding fabricated entries

**Checkpoint**: kit prints correct values; build green.

---

## Phase 2: Foundational — Owner operations kit (blocks the biggest wins)

- [ ] T003 Write `specs/003-seo-authority-conversion/owner-playbook.md` (English) covering: (1) business-profile creation + verification with the exact category choice and the anti-suspension rules (real facts, no keyword-stuffed name), (2) claiming the non-Google map/search platforms — including the one that feeds AI answer engines, (3) a prioritized regional/business directory list with the identical NAP, (4) a review-request message the team sends after each completed job (no incentives, no gating), (5) a photo brief telling the client exactly which shots to send to replace the AI placeholders
- [ ] T004 Deploy checkpoint: ship Phases 1–2, hand `owner-playbook.md` + `npm run business:kit` output to the owner

**Checkpoint**: owner can execute US1/US3 without further input from the maintainer.

---

## Phase 3: US2 — Reviews & trust proof on-site (P1)

**Goal**: genuine social proof visible on the money pages, with honest structured data.
**Independent test**: with reviews present they render with author/rating/date and appear in schema; with none present, no rating markup is emitted anywhere.

- [x] T005 [US2] Build `components/reviews/ReviewList.tsx`: renders genuine reviews (author, star rating, visible date, text, source) using existing DS patterns; renders nothing when the list is empty
- [x] T006 [US2] Place reviews on `app/p/[slug]/page.tsx` (product-specific first, else general) and `app/page.tsx` (home trust section)
- [x] T007 [US2] Emit `aggregateRating`/`review` in Product JSON-LD **only** when real reviews exist for that product — guard the emission behind a non-empty check (this is the honest fix for the 3 invalid Product-snippet items)
- [ ] T008 [P] [US2] Add a credentials/trust block to `app/about/page.tsx` (who we are, where, coverage, hours, contact) strengthening E-E-A-T
- [ ] T009 [US2] Document the real-photo swap in `README.md`: drop client photos into the product folder → run `node scripts/gen-gallery.mjs` → placeholders gone, no code change
- [ ] T010 [US2] Verify: build, Rich Results check on a product page confirming **no** rating markup while reviews are empty, screenshots

**Checkpoint**: US2 shippable; schema stays honest at zero reviews and upgrades automatically when real ones land.

---

## Phase 4: US4 — Quote/RFQ conversion path (P2)

**Goal**: institutional buyers (hospitals, mosques, offices) can request a written quotation without WhatsApp.
**Independent test**: submit from mobile → business receives it with all fields → user sees clear confirmation; failure shows the WhatsApp/call fallback.

- [ ] T011 [US4] Build `components/quote/QuoteForm.tsx` (client): Arabic labels, fields = product/type, approximate area (m²), city/district, name, phone, optional notes; accessible inline validation; mobile-first; honeypot + submit-timing bot check
- [ ] T012 [US4] Build `app/api/quote/route.ts`: validate server-side, deliver the submission reliably, return explicit success/failure; collect only the fields needed for a quotation
- [ ] T013 [US4] Build `app/quote/page.tsx`: page hero + form + reassurance copy (response time, no obligation) + WhatsApp/call kept equally prominent; unique title/description/canonical; add to sitemap
- [ ] T014 [P] [US4] Add a "اطلب عرض سعر" CTA to `app/p/[slug]/page.tsx` and `app/c/[category]/page.tsx` **alongside** (never replacing) WhatsApp/call
- [ ] T015 [US4] Verify: end-to-end submission test + deliberate failure test (fallback shown), mobile screenshot, build + guard

**Checkpoint**: a second, non-WhatsApp conversion path is live for high-value buyers.

---

## Phase 5: US5 — Measurement (P2)

**Goal**: know which pages produce enquiries; prove the phase worked.
**Independent test**: each enquiry action fires a distinct event carrying its source page, with no CWV regression.

- [ ] T016 [US5] Add lightweight, deferred analytics in `app/layout.tsx` (env-gated so it stays out of local/dev), documented in `.env.example`
- [ ] T017 [US5] Build `components/analytics/Events.tsx` and wire enquiry events: WhatsApp tap, call tap, quote submit — each with the originating page
- [ ] T018 [US5] Verify: trigger all three actions and confirm capture; re-run PageSpeed mobile to confirm LCP/CLS/INP still pass after analytics (FR-014)

**Checkpoint**: conversions attributable; SC-007 measurable.

---

## Phase 6: US1/US3 — Local presence execution (P1/P2, owner-gated)

**Goal**: Map Pack presence + external citations.
**Independent test**: profile verified and appearing for core queries; NAP identical across every platform.

- [ ] T019 [US1] Support the owner through profile creation/verification; then audit the live profile against `npm run business:kit` output and fix any mismatch
- [ ] T020 [P] [US3] Audit every external listing created by the owner for NAP variants (name/address/phone byte-identical); log results and corrections
- [ ] T021 [US3] Once social profiles exist, add them to `sameAs` in Organization/LocalBusiness JSON-LD and to `llms.txt` (entity disambiguation vs the three «السريع» namesakes)

**Checkpoint**: SC-001/SC-005 measurable.

---

## Phase 7: US6 — Content & indexation continuation (P3)

- [ ] T022 [US6] Write 3 articles for queries with observed impressions: «فني تركيب موكيت بالرياض» (how installation works / what to ask), «موكيت تركي مشجر» (choosing patterns/colors), «سعر العشب الصناعي» (cost factors) — same GEO structure as the existing 8
- [ ] T023 [P] [US6] Write 2 articles for the new lines: «فينيل طبي vs فينيل عادي» and «باركيه HDF أم SPC» (comparison tables — highest AI-citation format)
- [ ] T024 [US6] Request indexing for the new products/category (`/p/باركيه`, `/p/فينيل-طبي`, `/p/أرضيات-مستشفيات`, `/c/أرضيات-طبية`) and confirm indexation from the next GSC export
- [ ] T025 [US6] Link the new articles from their product/category pages (topic clusters) and update `llms.txt`

**Checkpoint**: proven-demand queries have supporting content; new line fully indexed.

---

## Phase 8: Polish & Reporting

- [ ] T026 [P] Re-measure PageSpeed mobile and record field CWV (confirms the spec-002 LCP fix, SC-009)
- [ ] T027 [P] Update `README.md` with the new surfaces (quote flow, reviews module, analytics env vars, business kit script)
- [ ] T028 Create `specs/003-seo-authority-conversion/results.md` and record the week-4 / week-8 / week-12 checkpoints from owner CSV exports against SC-001…SC-010

---

## Dependencies

```text
Phase 1 (T001-T002) ──► Phase 2 (T003-T004) ──► [OWNER: profile, citations, reviews, photos] ──► Phase 6 (US1/US3)
        │                                                    │
        ├──► Phase 3 (US2 reviews UI) ◄──────────────────────┘ (content arrives)
        ├──► Phase 4 (US4 quote form) ──► Phase 5 (US5 analytics: needs form to instrument)
        └──► Phase 7 (US6 content) ──► Phase 8 (reporting)
```

- Phase 3's UI ships **before** reviews exist (renders empty, schema stays honest) so nothing blocks on the owner.
- Phase 5 needs Phase 4's form to instrument the submit event.
- Phase 6 is owner-gated but blocks nothing on the code track.

## Parallel Opportunities

T001 ∥ T002 · T008 ∥ T005–T007 · T014 ∥ T011–T013 · T020 ∥ T019 · T023 ∥ T022 · T026 ∥ T027

## Implementation Strategy

**MVP = Phases 1–2 + Phase 3** — the owner kit (which unlocks the ~71 missing authority points) plus the on-site trust surface that will hold the reviews. Ship as one PR, hand the playbook over, then continue with the quote form (Phase 4) and analytics (Phase 5) while the owner executes the local track in parallel.
