# Owner Playbook — Authority & Local Presence (spec 003)

These are the actions that only the owner can perform. Research scored our
local presence at **≈29/100**; the missing ~71 points are all here. The site's
code side is done — **this playbook is what actually moves the ranking**.

> **Before you start**: run `npm run business:kit` and keep the output open.
> Every value below must be copy-pasted from it. Retyping introduces NAP
> variants, and a single inconsistent phone or address splits your local
> signals across "different" businesses.

---

## 1. Google Business Profile — the single biggest win (do this first)

Worth ~25% of local ranking weight, and it is the only way into the Map Pack.
We currently score **0** here because no profile exists.

1. Go to <https://business.google.com> → **Manage now** → add your business.
2. Fill **exactly** from `npm run business:kit`:
   - **Name**: `السريع للموكيت والأرضيات` — ⚠️ *verbatim*. Do **not** append
     keywords like "الرياض" or "أفضل موكيت". Keyword-stuffed names are the
     most common cause of profile **suspension**.
   - **Primary category**: `متجر سجاد` (Carpet store) — the primary category is
     the **#1 local-pack ranking factor**; everything else matters less.
   - **Additional categories**: `متجر أرضيات`, `خدمة تركيب أرضيات`, `متجر مفروشات`.
   - **Address**: `الرياض، حي العزيزية، حراج بن قاسم` — then **drag the map pin
     onto the actual shop entrance**. The auto-placed pin is often wrong.
   - **Phone**: `0546465316` · **Website**: `https://moket-elsuarye.com`
   - **Hours**: open 24 hours, every day.
3. **Verify** (video call, postcard, or phone — Google chooses). Do not skip;
   an unverified profile does not rank.
4. Complete the profile fully — completeness is itself a ranking signal:
   - **Services**: add each line (موكيت مساجد · موكيت مكاتب · موكيت تركي ·
     عشب صناعي · فينيل · باركيه · فينيل طبي · أرضيات مستشفيات · أرضيات جيم ·
     أرضيات خيول · أرضيات مانعة للانزلاق · تركيب موكيت وأرضيات).
   - **Description**: paste the long description from the kit.
   - **Photos**: minimum 10 — storefront, interior, rolls/stock, and
     **completed installations**. Real photos only.
   - **Products**: add the main lines with the website links from the kit.
5. Afterwards: post an update every 1–2 weeks (new arrivals, a finished job).
   Answer the Q&A section yourself with real questions customers ask.

**Anti-suspension rules**: real address only, no virtual office, no keywords in
the name, no phone number that forwards to a call centre, and never create a
second profile for the same location.

---

## 2. Bing Places — matters more than it looks (AI search)

ChatGPT, Copilot and other answer engines **do not read Google Business
Profile**. They lean on Bing and third-party directories. With Bing claimed, an
AI engine has an independent source confirming we exist.

1. <https://www.bingplaces.com> → sign in → **Import from Google Business
   Profile** (fastest, keeps data identical), or add manually from the kit.
2. Confirm the same name/address/phone/hours/website. Verify.

---

## 3. Apple Maps — iPhone users in Saudi

1. <https://businessconnect.apple.com> → add your business with the same kit
   values → verify.
2. Without this, iPhone users searching Maps simply will not find you.

---

## 4. Directories & citations (≈15% of local weight)

Create listings on each, **always** pasting from the kit. Do a few per week —
consistency matters far more than speed.

**Priority order:**

1. Bing Places ✅ (section 2) · Apple Maps ✅ (section 3)
2. **Facebook Page** — also becomes a `sameAs` entity signal
3. **Instagram business profile** — high value in the Saudi market for a visual
   product like flooring
4. **X (Twitter)** and **TikTok** if the client will actually post
5. Saudi/GCC business directories — e.g. Daleeli, Yellow Pages Saudi, Sooqe,
   local Riyadh business listings, and any chamber-of-commerce listing the
   business qualifies for
6. **Maroof (معروف)** — the Saudi Ministry of Commerce business registry. This
   is a strong trust signal locally; register if the commercial registration
   allows it.

**Rule**: the name, address and phone must be *byte-identical* everywhere.
Not "السريع للموكيت" in one place and "السريع للموكيت والأرضيات" in another.

Send the maintainer the profile URLs as you create them — they get added to the
site's structured data (`sameAs`) so Google links all of them to one entity.
This is also how we separate ourselves from the **three other «السريع»
businesses** competing in this niche.

---

## 5. Reviews — worth ~20% of local weight, and we have zero

Rankings respond to a **steady flow**, not a one-time burst. The "18-day rule"
says positions slip if roughly three weeks pass with no new review. Target: 10+
reviews at 4.5★ within 12 weeks, then never stop.

**Process — after every completed job:**

1. The installer finishes and confirms the customer is satisfied.
2. Send this WhatsApp message (short link comes from your GBP dashboard):

   > السلام عليكم أستاذ/ة [الاسم]،
   > شكرًا لثقتك في السريع للموكيت والأرضيات 🙏
   > لو التركيب عجبك، تقييمك يساعد ناس كثير تختار صح — دقيقة واحدة بس:
   > [رابط التقييم على جوجل]
   > وإذا فيه أي ملاحظة، قلها لنا مباشرة ونصلّحها فورًا.

3. Or send them the on-site form: <https://moket-elsuarye.com/review>
   (submissions come to you for verification before publishing).
4. **Respond to every review** — positive and negative. Response rate is a
   ranking signal, and a calm reply to a complaint reads better to future
   customers than a wall of perfect scores.

**Never do these** (policy violations with real consequences):
- ❌ Offering discounts/gifts in exchange for reviews.
- ❌ "Review gating" — asking only happy customers, or screening first.
- ❌ Buying reviews or asking staff/family to post them.
- ❌ Deleting or hiding negative reviews.

A handful of genuine reviews outperforms fifty fake ones — and fake ones risk
the profile entirely.

---

## 6. Real photos — replace the AI placeholders

Two products (`فينيل طبي`, `أرضيات مستشفيات`) currently show **AI-generated
illustrative images**. They are copyright-clean and clearly labelled in the
repo, but real photos are stronger for both conversion and Google's
experience signals — and they must not stay indefinitely.

**Ask the client for:**

| Product | Shots needed |
|---|---|
| فينيل طبي | Rolls in the shop · close-up of the surface texture · a welded seam if available |
| أرضيات مستشفيات | Any completed job in a clinic/hospital/lab · corridor or room after installation · coved skirting detail |
| باركيه | ✅ already have real photos — more finished-room shots welcome |
| Everything else | Completed installations, especially mosques and offices |

**Photo guidance**: phone camera is fine. Daylight or good indoor light, hold
steady, capture the whole floor plus one close-up. No filters, no text overlays.
Before/after pairs are excellent.

Send them to the maintainer → dropped into the product folder → one command
(`node scripts/gen-gallery.mjs`) replaces the placeholders. No code change.

---

## 7. Ongoing — every 2 weeks / monthly

- **Weekly**: request reviews from that week's customers; reply to any new ones.
- **Every 1–2 weeks**: one Google Business post (a finished job photo works).
- **Monthly**: export from Search Console (Performance → last 28 days: Queries,
  Pages, Devices; plus Indexing → Pages) and send to the maintainer. There is
  no data connector — these exports are the only way progress gets measured.

---

## Progress checklist

- [ ] 1. Google Business Profile created, **verified**, fully completed
- [ ] 2. Bing Places claimed (AI-search visibility)
- [ ] 3. Apple Maps listing created
- [ ] 4. ≥6 directories/profiles live with identical NAP — URLs sent to maintainer
- [ ] 5. Review request process running after every job; ≥10 genuine reviews
- [ ] 6. Real photos supplied; AI placeholders replaced
- [ ] 7. Monthly GSC exports being sent
