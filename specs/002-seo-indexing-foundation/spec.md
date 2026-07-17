# Feature Specification: SEO & Indexing Foundation

**Feature Branch**: `002-seo-indexing-foundation`
**Created**: 2026-07-17
**Status**: Draft
**Input**: SEO & indexing foundation for the live moket-elsuarye.com storefront — get every real page correctly indexed and ranking for Arabic موكيت/سجاد/أرضيات + local Riyadh intent, and citable by AI answer engines (GEO). Lead-gen catalog, no prices.

## Context (from live-site audit, 2026-07-17)

The site is live at `moket-elsuarye.com` (Arabic, RTL, mobile-first, lead-gen via WhatsApp/call — no cart or prices). A prior audit found and fixed a critical defect where every SEO surface (canonical, `og:url`, `metadataBase`, robots `Host`/`Sitemap`, all sitemap entries, `llms.txt` links) pointed at a non-resolving domain, and a redirect loop that briefly took the site down. Those are resolved. This feature covers the remaining work to make the site fully discoverable, correctly indexed, competitive for target queries, and AI-citable — plus the monitoring needed to prove it.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A Riyadh buyer finds the right page in search (Priority: P1)

A person in Riyadh searches Arabic intent queries such as "موكيت مساجد الرياض", "عشب صناعي أسطح", or "أرضيات مطاطية جيم". A relevant page from the site appears in results with an accurate, compelling Arabic title and description, and clicking it lands them directly on the correct, canonical page for that need — where they can immediately request a quote via WhatsApp/call.

**Why this priority**: This is the entire commercial purpose of the site. Without correct indexing + relevant on-page targeting, no organic leads arrive.

**Independent Test**: For a sample of target queries, verify the intended page is the one indexed (single canonical, correct domain), its title/description are unique and query-relevant, and its primary call-to-action (WhatsApp/call) is reachable within one interaction on mobile.

**Acceptance Scenarios**:

1. **Given** a target product/category query, **When** the page is inspected in a search engine's URL inspection tool, **Then** it reports as indexable, canonical to itself on the chosen host, with no duplicate/wrong-domain canonical.
2. **Given** any indexed page, **When** its title and meta description are read, **Then** they are unique across the site and describe that page's specific offering and location intent.
3. **Given** a mobile searcher lands on a product page, **When** they choose to enquire, **Then** a pre-filled WhatsApp/call action is available without scrolling past the primary content.

---

### User Story 2 - Search engines discover and index every real page (Priority: P1)

Search-engine crawlers can find, fetch, and index every genuine page (home, catalog, all products, all categories, content, blog) with no wrong-domain links, no duplicate hosts, no redirect loops, and no orphan pages.

**Why this priority**: Coverage is the precondition for ranking. Broken discovery silently caps the entire site's potential regardless of content quality.

**Independent Test**: Crawl the sitemap and site; confirm every listed URL resolves 200 on the canonical host, every real page is reachable by internal links, and the crawl surfaces zero wrong-domain or looping URLs.

**Acceptance Scenarios**:

1. **Given** the published sitemap, **When** each `<loc>` is fetched, **Then** 100% return 200 on the single canonical host with zero references to any other host.
2. **Given** the site is crawled from the home page, **When** link graph is analyzed, **Then** every product and category page is reachable within a small number of clicks (no orphans).
3. **Given** the non-canonical host or a non-existent path is requested, **When** the response is checked, **Then** it returns a single correct redirect (to canonical) or a proper 404 — never a loop or soft-404.

---

### User Story 3 - The owner can monitor coverage and search performance (Priority: P2)

The business owner (or maintainer) has verified ownership in Google Search Console and Bing Webmaster Tools, has submitted the sitemap, and can see which pages are indexed, which queries bring impressions/clicks, and any coverage errors.

**Why this priority**: Without monitoring, SEO work is unverifiable and regressions go unnoticed. It enables the measurable outcomes below.

**Independent Test**: Confirm the property is verified, the sitemap is submitted and read successfully, and coverage/query reports are populating.

**Acceptance Scenarios**:

1. **Given** the search-console property, **When** its status is checked, **Then** ownership is verified and the sitemap is accepted with a discovered-URL count matching the real page count.
2. **Given** a few weeks of data, **When** the performance report is opened, **Then** target Arabic queries appear with impressions for the intended pages.

---

### User Story 4 - AI answer engines cite the business accurately (Priority: P2)

When an AI answer engine is asked about moquette/flooring suppliers in Riyadh, it can accurately represent the business — name, contact (NAP), service areas, and product range — using the site's structured data and `llms.txt`.

**Why this priority**: Generative engines are a growing discovery channel; accurate machine-readable facts make the business citable and prevent misrepresentation.

**Independent Test**: Validate structured data and `llms.txt` reflect current, consistent business facts and product set; confirm an AI engine given the page can extract correct NAP and products.

**Acceptance Scenarios**:

1. **Given** any page, **When** its structured data is validated, **Then** it passes with no errors and NAP matches the site's single source of truth.
2. **Given** `llms.txt`, **When** it is fetched, **Then** it lists the current products and correct contact/service-area facts on the canonical host.

---

### User Story 5 - Category browsers land on dedicated, indexable category pages (Priority: P3)

A searcher or browser reaches a dedicated landing page per category (e.g., موكيت مساجد, عشب صناعي, أرضيات مطاطية) with category-specific copy, the products in that category, and internal links — instead of a filtered query-string view.

**Why this priority**: Dedicated category pages are far more indexable and rankable than parameterized URLs and strengthen internal linking, but they build on the P1 indexing foundation.

**Independent Test**: Each category has a stable, clean URL that is indexable, canonical to itself, keyword-targeted, and linked from navigation and related products.

**Acceptance Scenarios**:

1. **Given** a category, **When** its landing page is opened, **Then** it has a unique keyword-mapped H1/title, lists that category's products, and is reachable from the main navigation.
2. **Given** the old parameterized filter view, **When** it is requested, **Then** it either canonicalizes to the dedicated category page or is consolidated so no duplicate competes for the same intent.

---

### User Story 6 - Owner publishes keyword-targeted articles (Priority: P3)

The owner can publish Arabic blog articles mapped to informational keywords (buying guides, care tips) that become indexed and attract top-of-funnel traffic which is then routed toward enquiries.

**Why this priority**: Content compounds over time but depends on the indexing + technical foundation being solid first.

**Independent Test**: A published article is indexable, has article structured data, targets a mapped keyword in its title/headings, and links to relevant product/category pages.

**Acceptance Scenarios**:

1. **Given** a published article, **When** inspected, **Then** it is indexable, canonical to itself, and carries valid article structured data.
2. **Given** an article, **When** its internal links are checked, **Then** it links to at least one relevant product or category page.

### Edge Cases

- **Host mismatch**: The chosen canonical host is non-www, but the hosting platform's primary domain must be aligned so the canonical URL itself serves `200` rather than redirecting. Until aligned, canonical points to a redirecting host (works, but suboptimal) — this must be closed.
- **Arabic URL encoding**: Product/category slugs are Arabic; encoded and decoded forms must resolve to one canonical form to avoid duplicates.
- **Query-string duplicates**: Sort/filter parameters must not create indexable duplicate pages competing with canonical pages.
- **Empty states**: The blog currently has no articles; the blog index must remain indexable and not present as a soft-404 while empty.
- **Missing images/alt**: Product gallery images must have descriptive Arabic alt text; missing alt weakens image search and accessibility.
- **Undecided brand name**: Titles, structured data, and `llms.txt` all depend on a single finalized business name; an unfinalized name causes inconsistent brand signals.

## Requirements *(mandatory)*

### Functional Requirements

**Technical indexing & canonicalization**

- **FR-001**: The site MUST expose exactly one canonical host; the non-canonical host MUST redirect to it with a single permanent redirect, and the canonical URL MUST itself return `200` (no canonical-to-redirect).
- **FR-002**: Every SEO surface (page canonical, social URLs, sitemap entries, robots directives, machine-readable summary) MUST reference only the canonical host and correct domain, sourced from a single definition.
- **FR-003**: Every real page MUST have a unique, descriptive, Arabic title and meta description, and a self-referential canonical.
- **FR-004**: The sitemap MUST list only canonical, indexable URLs (200 on the canonical host) and MUST exclude parameterized duplicates and non-canonical hosts.
- **FR-005**: Requests to non-existent paths MUST return a proper 404 (not a soft-404 or loop); the blog index MUST remain a valid indexable page even when it contains no articles.
- **FR-006**: All meaningful images (product galleries, category/hero imagery) MUST have descriptive Arabic alt text.

**On-page & structured data**

- **FR-007**: Each product and category page MUST have keyword-mapped headings and copy aligned to the target Arabic query for that offering and location intent.
- **FR-008**: Structured data MUST be present and valid for organization/local-business, product, breadcrumb, FAQ, and item-list contexts, and MUST pass validation with no errors.
- **FR-009**: The site MUST provide a dedicated, cleanly-addressed, indexable landing page per product category, reachable from primary navigation, replacing reliance on parameterized filter URLs for indexing.

**Local SEO & GEO**

- **FR-010**: Business contact facts (name, address, phone, service areas, hours) MUST be consistent everywhere they appear and derive from a single source of truth.
- **FR-011**: The machine-readable summary for AI engines MUST stay current with the live product set and correct business facts on the canonical host.
- **FR-012**: The site MUST focus ranking effort on **Riyadh** as the sole primary city for this phase; broader-KSA service-area expansion is deferred to a later phase and is out of scope here.

**Monitoring**

- **FR-013**: Ownership MUST be verified in Google Search Console and Bing Webmaster Tools via an **HTML verification tag/token embedded in the site** (the maintainer adds the tag; the owner adds the property and clicks Verify), and the canonical sitemap MUST be submitted to both.
- **FR-014**: The site MUST expose whatever verification token/file each webmaster tool requires without harming performance or duplicating brand signals.

**Performance / CWV (ranking hygiene)**

- **FR-015**: Core page-experience metrics MUST meet: Largest Contentful Paint under 2.5s, Cumulative Layout Shift under 0.1, Interaction to Next Paint under 200ms, on mobile, for key templates (home, category, product).

**Brand consistency**

- **FR-016**: The finalized official business/brand name **"السريع للموكيت والأرضيات"** MUST be used consistently across titles, structured data, and machine-readable summaries, and the code's single source of truth MUST be marked as finalized (no longer provisional).

### Key Entities

- **Canonical URL**: The single authoritative address for a page (host + path), used in canonical tags, sitemap, and structured-data identifiers.
- **Page metadata**: Per-page title, description, canonical, and social sharing fields.
- **Category**: A grouping of products (e.g., موكيت مساجد, عشب صناعي) with its own landing page, keyword target, and product membership.
- **Business profile (NAP)**: Single source of truth for name, address, phone, hours, service areas — consumed by UI and structured data.
- **Structured-data record**: Machine-readable descriptions (organization/local-business, product, breadcrumb, FAQ, item-list, article) attached to pages.
- **Search-console property**: The verified site ownership record used to submit sitemaps and monitor coverage/performance.
- **Keyword map**: The mapping of target Arabic queries to the specific page intended to rank for each.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of sitemap URLs resolve `200` on the single canonical host, with **zero** references to any other host or the previous wrong domain.
- **SC-002**: 100% of real pages (home, catalog, every product, every category, content, published articles) are reported indexable, each canonical to itself, with no duplicate-host or wrong-domain canonicals.
- **SC-003**: Within 4 weeks of verification + submission, at least 90% of submitted URLs are reported indexed by the primary search engine, with no unresolved coverage errors on core pages.
- **SC-004**: Every page's title and meta description are unique (no duplicates across the site).
- **SC-005**: Structured data on home, product, and category pages validates with zero errors and is eligible for the relevant rich results.
- **SC-006**: Core Web Vitals pass thresholds (LCP < 2.5s, CLS < 0.1, INP < 200ms) on mobile for home, category, and product templates.
- **SC-007**: Every product-category intent has a dedicated, indexable landing page (no category intent served only by a parameterized URL).
- **SC-008**: Business contact facts are identical across all on-page and machine-readable surfaces (single source verified).
- **SC-009**: Within 8 weeks, the site appears (has impressions) for a defined set of target Arabic queries for the primary city in the search-performance report.
- **SC-010**: An AI answer engine, given a page, can correctly extract the business name, phone, city, and at least three products.

## Assumptions

- The canonical host is **non-www** (`moket-elsuarye.com`), per the owner's decision; aligning the hosting platform's primary domain to non-www is an owner action tracked as an edge case to close.
- The site remains a **lead-gen catalog with no prices, cart, or checkout**; all conversion is via WhatsApp/call. Anything e-commerce-transactional is out of scope.
- Content language is **Arabic**, targeting Saudi Arabia with **Riyadh as the sole primary city** for this phase (confirmed); broader-KSA expansion is a later phase.
- The official brand name is **"السريع للموكيت والأرضيات"** (confirmed).
- Search-console/webmaster verification uses an **HTML tag embedded in the site** (confirmed); the owner adds the property and clicks Verify.
- Blog **articles are authored by the owner**; this feature delivers the pipeline/structure and keyword mapping, not the finished articles.
- **Keyword research** proceeds with freely available methods and on-site/competitor analysis unless a paid research tool is provided; lack of paid tooling does not block the work.
- The existing product model (each folder = one product, 9 products with galleries) and existing page set are the basis; no product data model overhaul is assumed.
- Search-console and webmaster-tool **account creation and settings changes are performed by the owner** (the maintainer supplies verification artifacts and instructions but does not create accounts or change hosting/account settings).

## Out of Scope

- Cart, checkout, pricing, payments, or any transactional e-commerce.
- Paid search / advertising campaigns (this is organic SEO + GEO only).
- Redesign of the visual design system or page layouts beyond what SEO requires (headings, metadata, alt text, category pages).
- Multi-language / non-Arabic versions.
