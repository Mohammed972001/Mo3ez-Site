/**
 * Live-SEO verification sweep (spec 002, T019).
 *
 * Fetches the production sitemap, then every <loc> in it, asserting:
 *  - HTTP 200 with zero redirects (canonical URLs must serve directly)
 *  - a self-referential <link rel="canonical"> on the same host+path
 *  - every parsable <script type="application/ld+json"> is valid JSON
 *
 * Usage: node scripts/verify-live-seo.mjs [origin]   (default: production)
 */
const ORIGIN = process.argv[2] ?? "https://moket-elsuarye.com";

const errors = [];
const sm = await (await fetch(`${ORIGIN}/sitemap.xml`, { redirect: "manual" })).text();
const locs = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (!locs.length) {
  console.error(`No <loc> entries found in ${ORIGIN}/sitemap.xml`);
  process.exit(1);
}
console.log(`Checking ${locs.length} sitemap URLs on ${ORIGIN} …`);

for (const url of locs) {
  const res = await fetch(url, { redirect: "manual" });
  if (res.status !== 200) {
    errors.push(`${url} → HTTP ${res.status}${res.headers.get("location") ? " → " + res.headers.get("location") : ""}`);
    continue;
  }
  const html = await res.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  // Compare decoded forms — Arabic paths may differ only in percent-encoding.
  if (!canonical || decodeURI(canonical).replace(/\/$/, "") !== decodeURI(url).replace(/\/$/, "")) {
    errors.push(`${url} → canonical mismatch: ${canonical ?? "MISSING"}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      errors.push(`${url} → invalid JSON-LD block`);
    }
  }
}

if (errors.length) {
  console.error(`FAILED (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`All ${locs.length} URLs OK: 200 direct, self-canonical, valid JSON-LD.`);
