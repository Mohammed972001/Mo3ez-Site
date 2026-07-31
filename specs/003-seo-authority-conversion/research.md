# Phase 0 Research — SEO Authority & Conversion

**Feature**: `003-seo-authority-conversion` · **Date**: 2026-07-31
**Method**: seo-audit + local-SEO/maps methodologies (skills.sh) applied to **real GSC data** (owner CSV exports, day 13) and PageSpeed field data. Spec 002 delivered the technical foundation; this phase attacks the reason it has **impressions but zero clicks**.

## Executive summary

The site is technically excellent and indexed, yet earns **0 clicks from 84 impressions at avg position ~30 (page 3)**. Nothing in the *code* explains this — the on-page work is done. The diagnosis is **missing off-page authority and local presence**: no Google Business Profile, zero backlinks, zero citations, zero reviews, no social profiles. In a market where three near-identical «السريع» brands compete and incumbents have years of history, a 2-week-old domain with no trust signals cannot reach page 1 on code quality alone. **Priority: local dominance + entity trust, not more on-page tweaks.**

## D1 — What the GSC data actually says (day 13)

| Signal | Value | Reading |
|---|---|---|
| Indexed | 18/29 → rising | Discovery works; queue is normal for a new site |
| Impressions (3 wks) | 84 | Google is *testing* the site in results |
| Clicks | 0 | Position ~30 = page 3; CTR at that depth is ≈0 by definition |
| Avg position | ~30 | The single number that matters. Page 1 (≤10) is the target |
| Query mix | mostly «السريع …» brand variants | Google knows the brand string but not the *business entity* |
| Commercial queries appearing | «فني تركيب موكيت بالرياض», «موكيت تركي مشجر», «فينيل خشبي», «سعر العشب الصناعي» | **The service/product pages are being matched correctly** — targeting works, authority doesn't |

**Conclusion**: this is not a CTR problem (you cannot improve CTR on page 3), and not a targeting problem (the right pages surface for the right queries). It is a **ranking-position problem caused by authority deficit**.

## D2 — Local SEO gap analysis (methodology weights vs. our state)

Applying the local-SEO scoring model (GBP 25% · Reviews 20% · Local on-page 20% · NAP/citations 15% · Schema 10% · Local links 10%):

| Dimension | Weight | Our state | Score |
|---|---|---|---|
| **GBP signals** | 25% | **No profile at all** — primary category is documented as the *#1 local-pack ranking factor*; we forfeit the entire Map Pack | **0/25** ❌ |
| **Reviews** | 20% | Zero reviews anywhere. The "18-day rule" (rankings slip if no new review in ~3 weeks) can't even start | **0/20** ❌ |
| **Local on-page** | 20% | Strong: dedicated service page, localized titles/H1s, visible NAP, click-to-call, category hubs. Missing: embedded map only on /contact, no district-level service pages | **16/20** ✅ |
| **NAP & citations** | 15% | NAP consistent **on our own site** but present on **zero external directories**. Bing Places unclaimed — and it feeds ChatGPT/Copilot | **3/15** ❌ |
| **Local schema** | 10% | LocalBusiness + geo + hours + areaServed all valid | **10/10** ✅ |
| **Local links/authority** | 10% | Zero backlinks, zero mentions, no "best of" listings (documented as the *#1 AI-visibility citation factor*) | **0/10** ❌ |
| **Total** | | | **≈29/100** |

**The 71 missing points are almost entirely off-site.** That is the whole story of the zero clicks.

## D3 — Why AI search makes citations urgent (GEO)

The methodology notes ChatGPT-sourced traffic converts at ~**15.9%** vs ~**1.76%** for Google organic, and that **3 of the top 5 AI-visibility factors are citation-related**. Critically, **ChatGPT/Copilot do not read Google Business Profile** — they lean on **Bing Places** and third-party directories. Our llms.txt and schema are done (spec 002), but with no external citations an AI engine has only one source (us) and no corroboration → low citation confidence.

## D4 — Brand entity problem (three-way namesake collision)

Confirmed competitors sharing the «السريع» name: `alsourayia.com`, `mafrushat-alsourayia.com`, and `mokeet-elsuarye.com` (a different client's site). GSC shows our impressions are dominated by brand-ish queries («السريع للموكيت», «السريع فينيل», «ارضيات السريع») — meaning searchers *are* looking for a «السريع» and Google must choose among four. Without external corroboration (GBP, directories, social, reviews) Google has no basis to pick us. Entity signals are therefore both a ranking and a *disambiguation* fix.

## D5 — Conversion readiness (what happens when clicks arrive)

The site is lead-gen only. Current conversion paths: WhatsApp deep links (pre-filled per product) and click-to-call. Gaps found:
- **No quote form** — some B2B buyers (hospitals, mosque committees, offices) will not open WhatsApp; they expect an RFQ form or email. This was T11 in spec 001, never built.
- **No trust proof on page** — no reviews block, no project gallery with real work, no "who we are" faces. E-E-A-T for a lead-gen local business rests on exactly these.
- **No tracking** — GA4/analytics absent, so we cannot measure which pages produce WhatsApp clicks. We are flying blind on conversion.

## D6 — Content/technical residue from spec 002

- **CWV**: PageSpeed mobile 84 with LCP 4.1s → fixed 2026-07-31 (inlineCss + image quality tiers). **Re-measure required** to confirm the field improvement.
- **Product snippets**: 3 items invalid («offers/review/aggregateRating required»). Structurally unfixable without prices; the legitimate path is **real reviews → aggregateRating**, which this phase enables via GBP.
- **New catalog** (spec 002 tail): 12 products / 5 categories now live including the medical line — these need indexing requests and their own article support.
- **Images**: medical products use AI placeholders pending the client's real photos (also an E-E-A-T upgrade when replaced).

## D6b — Owner-supplied facts (2026-07-31)

- Google Business Profile: **not created yet** — owner ready to do it now.
- Social accounts: none yet — owner can request them from the client.
- Real photos: none yet — owner can request them from the client.
- Business is **not listed in any directory** anywhere.
- **No GSC connector exists** — all Search Console data arrives as owner CSV exports.

## D7 — Prioritized levers (impact × effort)

| Rank | Lever | Impact | Owner/Code |
|---|---|---|---|
| 1 | **Google Business Profile** — create, verify, correct primary category, hours, photos, service areas | Unlocks Map Pack (25% of local weight) — the single biggest available gain | Owner (code: consistency + linking) |
| 2 | **Review engine** — request flow after every job, respond to all, keep <18-day cadence | 20% of local weight + fixes Product-snippets + raises CTR with stars | Owner + code (review UI/schema) |
| 3 | **Citations/directories** — Bing Places (AI!), Apple Maps, Saudi business directories, consistent NAP | 15% weight + AI-engine corroboration | Owner (code: NAP export/kit) |
| 4 | **Analytics** — GA4 + WhatsApp click events | Without it we can't prove or optimize anything | Code |
| 5 | **Quote/RFQ form** — B2B path that isn't WhatsApp | Captures institutional leads (hospitals, mosques, offices) | Code |
| 6 | **Real photos + team/about proof** | E-E-A-T, replaces AI placeholders, feeds GBP too | Owner + code |
| 7 | **Content expansion** — articles for the queries already surfacing + the new medical line | Compounding; supports the pages already being matched | Code |
| 8 | **District/service-area pages** — «موكيت شمال الرياض» etc. | Local long-tail, but only after GBP exists (else thin) | Code (later) |

## D8 — What we explicitly will NOT do

- No paid link buying, PBNs, or link exchanges (manual-action risk).
- No fake/incentivized reviews, no review gating (violates Google policy and Saudi consumer norms).
- No fake `offers`/prices or self-serving review markup to clear the Product-snippets report.
- No scraped or stock imagery presented as the client's own work.
- No doorway-style city pages that pass the "swap test" (interchangeable city names = spam).
