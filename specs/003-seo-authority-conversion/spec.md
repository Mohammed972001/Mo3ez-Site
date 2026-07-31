# Feature Specification: SEO Authority & Conversion

**Feature Branch**: `003-seo-authority-conversion`
**Created**: 2026-07-31
**Status**: Draft
**Input**: Turn the indexed-but-invisible site into one that ranks on page 1 for Riyadh flooring intent and converts the traffic — by building the off-page authority, local presence, trust proof, conversion paths and measurement that spec 002 (technical foundation) deliberately left out.

## Context

Spec 002 delivered a technically excellent, fully-indexed site: 33 canonical URLs, 12 products, 5 category hubs, a service page, 8 articles, valid schema, CLS 0. Real GSC data after 13 days shows **84 impressions, 0 clicks, average position ~30**, with the *right* pages matching the *right* commercial queries. The blocker is not code — it is a **~71/100 deficit in local/off-page authority**: no Google Business Profile, no reviews, no citations, no backlinks, no social profiles, and no analytics to measure any of it. This feature closes that gap and prepares the site to convert the clicks it will start earning.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A Riyadh searcher finds the business in the Map Pack (Priority: P1)

Someone searches "موكيت الرياض" or "تركيب موكيت قريب مني" on their phone. The business appears in the local map results with correct category, hours, phone, photos and reviews, and they tap to call or get directions.

**Why this priority**: The Map Pack is the largest single source of local commercial intent and is currently forfeited entirely. It is also the fastest available win — it does not depend on domain age.

**Independent Test**: Search the target queries from a Riyadh location; confirm the business appears in map results with complete, accurate information matching the website exactly.

**Acceptance Scenarios**:

1. **Given** a verified business profile, **When** a user searches a core service query near Riyadh, **Then** the business appears in local results with correct name, primary category, phone, hours and photos.
2. **Given** the profile and the website, **When** the business facts are compared, **Then** name, address, phone, hours and service areas match **exactly** in both places.
3. **Given** a user viewing the profile, **When** they choose to contact, **Then** call, WhatsApp and website paths all work and land on the correct page.

---

### User Story 2 - Prospects see real proof before they enquire (Priority: P1)

A prospective customer researching flooring sees genuine reviews, real photos of completed work, and clear business credentials — enough trust to contact a supplier they have never heard of.

**Why this priority**: Trust proof drives both ranking (reviews are ~20% of local weight) and conversion. Zero reviews and placeholder imagery are the two weakest points of the current site.

**Independent Test**: A first-time visitor can find, on the site, at least: genuine customer reviews with dates, photographs of real completed projects, and unambiguous business identity/contact details.

**Acceptance Scenarios**:

1. **Given** collected customer reviews, **When** a visitor opens a key page, **Then** genuine reviews are visible with rating and date, and are represented in structured data accurately (never fabricated).
2. **Given** real project photos are supplied, **When** they replace the placeholder imagery, **Then** every product gallery shows the business's own work.
3. **Given** a visitor wants to verify the business, **When** they look for identity signals, **Then** consistent name, location, hours and contact information are immediately visible.

---

### User Story 3 - The business is discoverable outside Google (Priority: P2)

The business is listed accurately on other platforms — Bing Places, Apple Maps, and reputable Saudi business directories — so it is found by non-Google search, map apps, and AI answer engines.

**Why this priority**: Citations are ~15% of local weight, and independent corroboration is decisive for AI answer engines (which do not read Google's profile). It also builds the first external links.

**Independent Test**: Search the business name on non-Google engines and in map apps; confirm accurate, consistent listings. Ask an AI answer engine about flooring suppliers in Riyadh and confirm the business can be described accurately.

**Acceptance Scenarios**:

1. **Given** listings are created, **When** business facts are audited across every platform, **Then** name, address and phone are identical everywhere (no variants).
2. **Given** an AI answer engine is asked about the business, **When** it responds, **Then** it states the correct name, phone, city and product range.

---

### User Story 4 - Institutional buyers can request a quote without WhatsApp (Priority: P2)

A hospital procurement officer, mosque committee member, or office manager needs a written quotation with specifications. They submit a structured request (area, type, location, contact) and receive a response, without needing to start a WhatsApp chat.

**Why this priority**: The new medical/institutional product line targets buyers whose process requires written RFQs. WhatsApp-only excludes them, and these are the highest-value orders.

**Independent Test**: Complete and submit a quote request from a mobile device; confirm it reaches the business with all details and the user gets clear confirmation.

**Acceptance Scenarios**:

1. **Given** a visitor on any product or category page, **When** they choose to request a quote, **Then** a form collects the essentials (product/area/city/contact) with clear validation and Arabic labels.
2. **Given** a submitted request, **When** it is processed, **Then** the business receives it reliably and the visitor sees an unambiguous success confirmation.
3. **Given** a visitor prefers instant contact, **When** they view the same page, **Then** WhatsApp and call options remain equally prominent.

---

### User Story 5 - The business can measure what produces enquiries (Priority: P2)

The owner can see which pages and channels generate enquiries (WhatsApp taps, calls, form submissions), and how organic performance changes over time.

**Why this priority**: Without measurement, every later decision is guesswork, and the effect of this entire phase would be unprovable.

**Independent Test**: Trigger each enquiry action and confirm it is recorded and attributable to the originating page.

**Acceptance Scenarios**:

1. **Given** analytics are live, **When** a visitor taps WhatsApp, calls, or submits the quote form, **Then** each action is recorded as a distinct conversion event with its source page.
2. **Given** a reporting period, **When** the owner reviews results, **Then** enquiries can be attributed to pages and channels.

---

### User Story 6 - Content keeps compounding on proven demand (Priority: P3)

New articles and page copy target the queries the site is *already* being shown for, plus the new medical/parquet lines, deepening topical coverage.

**Why this priority**: Compounding but slower; it strengthens pages that are already matching, rather than chasing new ground.

**Independent Test**: Each new article targets a query with observed impressions, is indexable, and links to the relevant product/category page.

**Acceptance Scenarios**:

1. **Given** GSC query data, **When** new content is planned, **Then** each piece maps to a query with demonstrated impressions or a documented gap in the new product lines.
2. **Given** a published piece, **When** it is inspected, **Then** it is indexable with valid article structured data and internal links to the money pages.

### Edge Cases

- **Profile suspension risk**: an inaccurate category, keyword-stuffed business name, or address mismatch can get a local profile suspended — facts must match reality and the website exactly.
- **Review policy**: incentivised reviews, review gating (soliciting only happy customers), or fabricated ratings breach platform policy and consumer-protection norms; only genuine, unfiltered solicitation is acceptable.
- **Structured-data honesty**: aggregate ratings may only be published when real reviews exist; the invalid Product-snippet items must never be "fixed" with fake offers or ratings.
- **Placeholder imagery**: AI-generated product images are interim only; they must be replaced with the client's real photos and never described as photographs of the business's own work.
- **Form abuse**: a public quote form invites spam; it needs protection that does not block genuine Arabic-speaking mobile users.
- **Privacy**: analytics and form data involve personal contact details — collection must be disclosed and minimal.
- **Thin local pages**: district/area pages whose content is interchangeable ("swap test" failure) risk being treated as doorway pages.

## Requirements *(mandatory)*

### Local presence & citations

- **FR-001**: The business MUST have a verified local business profile whose name, address, phone, hours, service areas and website exactly match the website's single source of truth.
- **FR-002**: The primary business category MUST accurately describe the core service, since it is the dominant local-pack ranking factor; secondary categories MUST cover the other product lines.
- **FR-003**: The business MUST be listed on the major non-Google map/search platforms and on reputable regional business directories, with byte-identical contact facts.
- **FR-004**: A single canonical "business facts kit" MUST exist so every listing is created from the same values, and MUST be derived from the site's existing source of truth.

### Reviews & trust

- **FR-005**: A repeatable process MUST exist for requesting reviews from real customers after completed jobs, without incentives and without filtering by expected sentiment.
- **FR-006**: Genuine reviews MUST be displayable on the site with author, rating and date, and MUST be reflected in structured data **only** when real and verifiable.
- **FR-007**: Placeholder product imagery MUST be replaceable by the client's real photographs without code changes, and the site MUST NOT present generated imagery as photographs of completed work.
- **FR-008**: Key pages MUST show verifiable business identity and credentials (who, where, hours, contact, service coverage).

### Conversion

- **FR-009**: Visitors MUST be able to request a quotation through a structured form (product/type, approximate area, city/district, name, contact) in Arabic, usable on mobile, without leaving the site.
- **FR-010**: Quote submissions MUST reach the business reliably and give the visitor a clear success or failure outcome; failures MUST offer the WhatsApp/call fallback.
- **FR-011**: The form MUST resist automated spam without blocking legitimate users, and MUST collect only the data needed to prepare a quotation.
- **FR-012**: Instant contact options (WhatsApp, call) MUST remain at least as prominent as the form.

### Measurement

- **FR-013**: Site analytics MUST record enquiry actions (WhatsApp tap, call tap, form submission) as distinct events attributable to the originating page.
- **FR-014**: Analytics MUST not measurably degrade page-experience metrics.
- **FR-015**: A recurring review of search performance (positions, queries, indexation) MUST be possible from exported reports, since no direct data connector is available.

### Content & on-page continuation

- **FR-016**: New content MUST target queries with demonstrated impressions or documented gaps in the new product lines, and MUST link to the corresponding money pages.
- **FR-017**: The newly added products and category MUST be submitted for indexing and confirmed indexed.
- **FR-018**: Page-experience improvements shipped at the end of spec 002 MUST be re-measured and confirmed in field data.

## Key Entities

- **Business profile listing**: an external record of the business (platform, category, NAP, hours, photos, status).
- **Business facts kit**: the canonical values used to create every listing, derived from the site's source of truth.
- **Review**: a genuine customer rating with author, date, text and platform of origin.
- **Quote request**: a structured enquiry (product/type, area, city, contact details, message).
- **Conversion event**: a recorded enquiry action tied to its page and channel.
- **Performance snapshot**: a periodic export of positions/queries/indexation used to track progress.

## Success Criteria *(mandatory)*

- **SC-001**: The business appears in local map results for at least 3 core Riyadh service queries within 6 weeks of profile verification.
- **SC-002**: Average search position improves from ~30 to **≤15** within 8 weeks, and at least one core commercial query reaches page 1 (≤10) within 12 weeks.
- **SC-003**: The site records its **first organic clicks** within 4 weeks, and ≥25 clicks in a 28-day window by week 12.
- **SC-004**: At least **10 genuine reviews** with a ≥4.5 average are collected within 12 weeks, with no gap longer than ~3 weeks between new reviews.
- **SC-005**: The business is accurately listed on **≥6 external platforms** with 100% identical contact facts (zero NAP variants found in an audit).
- **SC-006**: 100% of product galleries show the client's real photographs (zero placeholders remaining).
- **SC-007**: Quote-form submissions are delivered successfully in 100% of tests, and every enquiry action is captured in analytics with its source page.
- **SC-008**: All 33+ canonical URLs (including the new medical line) are reported indexed.
- **SC-009**: Mobile page-experience metrics pass their thresholds in field data (LCP < 2.5s, CLS < 0.1, INP < 200ms).
- **SC-010**: An AI answer engine asked about Riyadh flooring suppliers can state the business's correct name, phone, city and at least three product lines.

## Assumptions

- The owner performs all account-level actions (profile creation/verification, directory sign-ups, review requests) — the maintainer supplies exact values, copy and instructions.
- The client can supply real project photographs and, later, social profile links.
- Riyadh remains the sole ranking target this phase; district-level pages are deferred until the local profile exists.
- The lead-gen model stands: no prices, no cart; enquiries via WhatsApp, call, or the new quote form.
- Search Console data continues to arrive as manual CSV exports (no connector available).
- Domain age and authority accrue over months; ranking criteria are stated as trajectories, not instant outcomes.

## Out of Scope

- Paid advertising of any kind (this is organic + local only).
- Buying links, link exchanges, PBNs, or any manipulative link acquisition.
- Incentivised, gated, or fabricated reviews.
- E-commerce transactions, pricing, or checkout.
- Expansion to cities beyond Riyadh.
- Non-Arabic language versions.
