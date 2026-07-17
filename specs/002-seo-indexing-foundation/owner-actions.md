# Owner Actions — SEO & Indexing Foundation (spec 002)

These steps require account access that only the owner has. Everything code-side
is already shipped; each item below unblocks a gate in [tasks.md](./tasks.md).

## 1. Vercel — make non-www the primary domain (unblocks FR-001)

1. Open Vercel → project `mo3ez-site` → **Settings → Domains**.
2. Next to `moket-elsuarye.com` (WITHOUT `www`) choose **Set as Primary** (or
   edit `www.moket-elsuarye.com` and set it to **Redirect to** the non-www domain, 308).
3. Verify: visiting `https://moket-elsuarye.com/` must return the page directly
   (no redirect), and `https://www.moket-elsuarye.com/` must redirect to it.

## 2. Google Search Console — verify + submit sitemap (unblocks US3)

1. Open https://search.google.com/search-console → **Add property** →
   **URL prefix** → `https://moket-elsuarye.com`.
2. Choose the **HTML tag** verification method. Copy ONLY the value inside
   `content="…"` of the shown `<meta name="google-site-verification" …>` tag.
3. In Vercel → **Settings → Environment Variables** add:
   - Name: `NEXT_PUBLIC_GSC_VERIFICATION` · Value: the copied token · All environments.
4. **Redeploy** (Deployments → ⋯ → Redeploy), then back in Search Console click **Verify**.
5. After verification: **Sitemaps** (left menu) → enter `sitemap.xml` → **Submit**.
   Expected: Status "Success", ~20+ discovered URLs.

## 3. Bing Webmaster Tools — verify + submit (unblocks US3)

1. Open https://www.bing.com/webmasters → **Add site** → `https://moket-elsuarye.com`.
   (Fastest path: "Import from Google Search Console" after step 2 — then skip 3.2–3.3.)
2. If verifying manually: choose the **Meta tag** method, copy the
   `msvalidate.01` content value.
3. Add it in Vercel as `NEXT_PUBLIC_BING_VERIFICATION`, redeploy, click **Verify**.
4. Submit `sitemap.xml` under **Sitemaps**.

## 4. Google Business Profile — the biggest local-SEO lever (supports US1/US4)

1. Open https://business.google.com → create the profile with EXACTLY these
   facts (they must match the site letter-for-letter):
   - Name: **السريع للموكيت والأرضيات**
   - Category: متجر سجاد / متجر أرضيات
   - Address: الرياض، حي العزيزية، حراج بن قاسم
   - Phone: 0546465316 · Hours: 24 ساعة · Website: `https://moket-elsuarye.com`
2. Complete phone/postcard verification when prompted.
3. Add real photos of products/installations — profiles with photos get
   dramatically more calls.

## 5. claude.ai connectors — precise keyword data (optional, improves Phase 4/8)

1. Open claude.ai → **Settings → Connectors**.
2. Authorize **Ahrefs** (and **Similarweb** if available on your plan).
3. Once authorized, future sessions can pull real volume/difficulty numbers to
   sharpen the keyword table in research.md.

## Status checklist

- [ ] 1. Vercel primary domain flipped to non-www
- [ ] 2. GSC verified + sitemap submitted
- [ ] 3. Bing verified + sitemap submitted
- [ ] 4. Google Business Profile created & verified
- [ ] 5. Connectors authorized (optional)
