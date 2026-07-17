# Phase 0 Research — SEO & Indexing Foundation

**Feature**: `002-seo-indexing-foundation` · **Date**: 2026-07-17
**Method**: seo-audit skill (skills.sh #1, 163k installs) + programmatic-seo + ai-seo/GEO methodologies, applied to live-site audit data and live SERP validation.

## Executive Summary

The new site (`moket-elsuarye.com`) is technically healthy: fully rendered Arabic RTL, correct canonical/robots/sitemap/llms.txt (fixed 2026-07-17), valid JSON-LD, 9 product pages with galleries. **But the single most important discovery of this research is that the business's OLD website at `www.mokeet-elsuarye.com` is still live on Vercel, still indexed, and currently RANKS in Google for target queries** (verified in live SERPs for "موكيت مساجد الرياض" and "موكيت الرياض تركيب") while the new site has zero index presence. The two sites now compete as duplicates. **Priority #1 is therefore a proper 301 domain migration old → new** to transfer existing equity, ahead of any content work. Overall assessment: **strong foundation, one critical migration blocker, clear content-gap runway**.

## D1 — Critical discovery: live old site (migration scenario)

| Evidence | Old site `www.mokeet-elsuarye.com` | New site `moket-elsuarye.com` |
|---|---|---|
| Status | 200 OK, on Vercel (216.198.79.65) | 200 OK, on Vercel |
| Title | «موكيت ومفروشات السريع \| أفضل موكيت ومفروشات الرياض» | «السريع للموكيت والأرضيات \| موكيت وأرضيات وعشب صناعي وفينيل في الرياض» |
| robots.txt | Different (disallows /api/, /admin/, /private/) — a different, older app | Correct, generated |
| `/mokeet` route | 404 (different information architecture) | 200 |
| Google index | **Indexed & ranking** (appears in SERPs for target queries) | Not yet indexed |

**Implication**: classic site-migration situation. Without 301s the old domain keeps the equity and the new domain starts from zero while duplicating the old one's topic. With page-level 301s (old URLs → closest new equivalents) the accumulated equity transfers.

**Required actions** (owner + code):
1. Owner: in Vercel, point the old project's domains (`mokeet-elsuarye.com`, `www.mokeet-elsuarye.com`) at a redirect configuration → new domain (or attach both domains to the new project and let it 301). Domain-level, permanent (301/308).
2. Page mapping: old-site URLs → new equivalents (home→home; old product/category paths → nearest `/c/…` or `/p/…`; unmatched → home with 301, never 404 for previously-ranking URLs).
3. After redirects live: verify old property in GSC too and submit a Change of Address.

## D2 — Competitor landscape (live SERP, 2026-07-17)

Queries tested: «موكيت مساجد الرياض», «موكيت الرياض تركيب».

| Competitor | Observed strength | Notes for us |
|---|---|---|
| `mafrushat-alriyad.com` («مفروشات الرياض») | **Dominant**: 4 of top-10 results for موكيت مساجد via multiple keyword-variant product pages | Uses programmatic per-keyword product pages («موكيت مساجد بأسعار الجملة», «أفضل أنواع موكيت المساجد») — validates our dedicated category/landing-page strategy |
| `alsourayia.com` («السريع للأرضيات والمفروشات») | Large store, brand nearly identical to ours | **Brand-name collision**: «السريع» is contested in this niche. Brand SERP differentiation needed (consistent NAP, Organization schema, distinct full name) |
| `mafrushat-alsourayia.com` («السريع للمفروشات وللأرضيات») | Ranks #2 for موكيت مساجد الرياض | Same collision; likely related/competing namesake |
| `mokeyat-riyadh.com`, `moket-sa.com`, `alamiyaksa.com`, `sahebalryed.com` | Mid-tail catalog sites | Beatable with better structure + CWV + GEO |
| `ksaldecor.com`, `naseemalriad.com`, `tarkib-athath.com`, `awael-alkhaleg.com` | Rank for «تركيب» (installation) intent with phone-first service pages | **Content gap**: we have no dedicated installation-service page; «تركيب موكيت بالرياض» is a high-intent query we don't target |

**Pattern**: winners use one indexable page per keyword-variant with the keyword in title/H1 + phone CTA. Our lead-gen model matches; we lack the page inventory.

## D3 — Keyword opportunity table

Sources: existing local keyword map (validated), SERP checks. No paid volume tool connected (Ahrefs/Semrush MCP not authorized) — difficulty is relative, from observed SERP strength. Intent: C=commercial, T=transactional-lead, I=informational, L=local.

| # | Keyword (Arabic) | Difficulty | Opportunity | Intent | Target page |
|---|---|---|---|---|---|
| 1 | موكيت مساجد بالرياض | Hard (dominated) | **High** | C/L | `/c/موكيت-مساجد` |
| 2 | موكيت مساجد مقاوم للحريق | Moderate | **High** | C | `/p/موكيت-مساجد` |
| 3 | فرش مساجد / سجاد مساجد | Moderate | **High** | C | `/c/موكيت-مساجد` |
| 4 | موكيت مكاتب بالرياض | Moderate | **High** | C/L | `/c/موكيت-مكاتب` (new) |
| 5 | تركيب موكيت بالرياض | Moderate | **High** | T/L | `/services/تركيب` (new service page) |
| 6 | عشب صناعي للحدائق / للأسطح | Moderate | **High** | C | `/c/عشب-صناعي` |
| 7 | تركيب عشب صناعي بالرياض | Moderate | **High** | T/L | service page + category |
| 8 | أرضيات فينيل / فينيل رول | Moderate | **High** | C | `/c/فينيل-وأرضيات` |
| 9 | أرضيات جيم مطاطية | Easy-Moderate | **High** | C | `/p/أرضيات-جيم` |
| 10 | أرضيات مطاط خيول / إسطبلات | **Easy** (thin SERP) | **High** | C | `/p/أرضيات-خيول` |
| 11 | أرضيات مانعة للانزلاق للحمامات | Easy-Moderate | Medium | C | `/p/أرضيات-مانعة-للانزلاق` |
| 12 | موكيت تركي / موكيت مشجّر | Moderate | Medium | C | `/p/موكيت-تركي` |
| 13 | موكيت الرياض (head) | Hard | Medium | C/L | Home + `/mokeet` |
| 14 | باركيه ضد الماء | Moderate | Medium | C | `/c/فينيل-وأرضيات` |
| 15 | موكيت بالجملة | Moderate | Medium | C | `/mokeet` |
| 16 | كم سعر متر الموكيت في الرياض؟ | Easy | **High** (GEO) | I | Blog #1 |
| 17 | ما أفضل أنواع موكيت المساجد؟ | Easy | **High** (GEO) | I | Blog #2 |
| 18 | الفرق بين الموكيت والفينيل | Easy | Medium | I | Blog #3 |
| 19 | موكيت رول أم بلاط؟ | Easy | Medium | I | Blog #4 |
| 20 | العشب الصناعي للأسطح: المميزات | Easy | Medium | I | Blog #5 |
| 21 | كيف أعتني بالموكيت؟ | Easy | Medium | I | Blog #6 |
| 22 | مواصفات أرضيات الجيم المطاطية | Easy | Medium | I | Blog #7 |
| 23 | موكيت العزيزية / حراج بن قاسم | Easy | Medium | L | Contact/About local blocks |
| 24 | السريع للموكيت (brand) | Collision | **High** (defensive) | Nav | Home + Organization schema |

## D4 — On-page issues (current live site)

| Page | Issue | Severity | Fix |
|---|---|---|---|
| All | Old domain still live & indexed → duplicate site | **Critical** | D1 migration (301s + change of address) |
| Canonical host | Canonical says non-www but non-www 308→www (Vercel primary = www) | **High** | Owner flips Vercel primary domain to non-www |
| `/mokeet?cat=…` | Parameterized category URLs in sitemap; weakly indexable, no dedicated copy | High | Dedicated `/c/[category]` pages; remove params from sitemap; canonical `?cat=` → `/c/` |
| Category intents | No landing page per category with unique intro copy (programmatic-SEO quality bar) | High | Build `/c/…` with unique 120–180-word intros, per-category FAQ, product grid, cross-links |
| «تركيب» intent | No installation-service page though SERP shows dedicated intent | High | New service page (Riyadh, WhatsApp/call CTA) |
| Product pages | Titles good; verify H1 keyword mapping and first-100-words keyword presence per D3 | Medium | Copy pass per keyword map |
| Images | Alt-text coverage unverified across all 150+ gallery images | Medium | Audit + descriptive Arabic alt everywhere |
| Blog | Empty (no articles) — valid but zero informational coverage | Medium | Pipeline in D6 |
| GSC/Bing | Not verified; sitemap never submitted | High | HTML-tag verification + submit |

## D5 — Technical SEO checklist (live, post-hotfix)

| Check | Status | Details |
|---|---|---|
| HTTPS | ✅ Pass | Valid on both hosts |
| Canonical tags | ✅ Pass | Self-referential, correct domain (fixed 2026-07-17) |
| robots.txt | ✅ Pass | Allow all + correct sitemap/host |
| sitemap.xml | ⚠️ Warning | Correct domain (20/20) but includes `?cat=` params → replace with `/c/` URLs |
| Redirect health | ⚠️ Warning | www↔non-www single hop OK; **canonical (non-www) itself redirects** until Vercel primary flipped |
| Old-domain duplication | ❌ Fail | See D1 — migration required |
| Structured data | ✅ Pass (validate) | Org/WebSite/LocalBusiness/Product/Breadcrumb/FAQ present; needs validator run + enrichment |
| Mobile rendering | ✅ Pass | RTL responsive verified previously (Playwright) |
| CWV | ⚠️ Unmeasured | Images optimized (sharp ≤1700px); needs Lighthouse/CrUX measurement pass |
| AI-bot access | ⚠️ Verify | robots allows all UAs (implicit) — keep; do not add AI-bot blocks (GEO requirement) |
| llms.txt | ✅ Pass | Correct domain; keep synced with product set |
| Soft-404s | ✅ Pass | Blog empty-state is a real page; 404s return 404 |

## D6 — Content gaps → article pipeline (owner writes; we deliver briefs)

Format per ai-seo/GEO methodology: lead each section with a **40–60-word direct answer block**, dated, FAQ schema where Q&A, internal links to category/product pages, «آخر تحديث» visible.

| Priority | Article (Arabic working title) | Target keyword | Funnel |
|---|---|---|---|
| 1 | دليل اختيار موكيت المساجد (الكثافة، مقاومة الحريق، خطوط الصفوف) | أفضل موكيت مساجد | I→lead |
| 2 | أسعار الموكيت في الرياض: ما الذي يحدد سعر المتر؟ | كم سعر متر الموكيت | I→lead |
| 3 | الموكيت أم الفينيل؟ مقارنة عملية لكل غرفة | الفرق بين الموكيت والفينيل | I |
| 4 | موكيت رول أم بلاط للمكاتب؟ | موكيت بلاط مكاتب | I→lead |
| 5 | العشب الصناعي للأسطح والحدائق: الاختيار والتركيب | عشب صناعي للأسطح | I→lead |
| 6 | العناية بالموكيت: دليل التنظيف والعمر الافتراضي | كيف أنظف الموكيت | I |
| 7 | أرضيات الجيم المطاطية: السماكات والمواصفات | أرضيات جيم | I→lead |
| 8 | أرضيات الإسطبلات المطاطية: لماذا وكيف | أرضيات خيول | I→lead |

Comparison articles are the highest-citation GEO format (~33% of AI citations) — articles 3 & 4 are comparisons by design.

## D7 — GEO/AI-SEO application (three pillars)

- **Structure**: 40–60-word direct-answer blocks atop each category page & article; FAQ sections (already on products) extended to categories; comparison tables in blog 3/4; H2/H3 phrased as real queries.
- **Authority**: visible «آخر تحديث» dates; concrete numbers (densities, thicknesses, warranty years) in product specs; consistent NAP everywhere.
- **Presence**: Google Business Profile (owner action — largest local lever), keep llms.txt synced, maps embed on contact. Wikipedia/Reddit not applicable for this niche/locale.
- **Bot access**: never block GPTBot/ClaudeBot/PerplexityBot/Google-Extended in robots.

## D8 — Decisions locked (from owner, 2026-07-17)

1. Brand name (final): **السريع للموكيت والأرضيات** — mark `business.name` as finalized; differentiate vs. «السريع» namesakes via full-name consistency + Organization schema.
2. City targeting: **Riyadh only** this phase.
3. GSC/Bing verification: **HTML meta tag** in the site; owner adds property & clicks Verify.
4. Canonical host: **non-www** (pending owner's Vercel primary-domain flip).

## Open items for owner (cannot be done from code)

| # | Action | Where |
|---|---|---|
| 1 | Flip primary domain to `moket-elsuarye.com` (non-www) | Vercel → Settings → Domains |
| 2 | Redirect old `mokeet-elsuarye.com` project/domains → new domain (301) | Vercel (old project) |
| 3 | Add GSC + Bing properties, click Verify (tags will be in the site) | search consoles |
| 4 | Create/claim **Google Business Profile** (Riyadh, العزيزية) with exact NAP | Google Maps |
| 5 | Confirm whether `alsourayia.com` is a related business or a pure competitor | — |
