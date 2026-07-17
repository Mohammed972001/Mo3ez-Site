/**
 * SEO regression guard (spec 002, T003).
 *
 * Fails the build/CI when a known-fatal SEO mistake re-enters the SOURCE code:
 *  1. The competitor domain "mokeet-elsuarye" (leaked once, fixed 2026-07-17).
 *     Checked in source dirs only — specs/ may legitimately mention it as research.
 *  2. A duplicated `const SITE_URL` declaration outside lib/seo/site.ts
 *     (the single source of truth).
 *  3. App-level host redirects in next.config.ts (fought Vercel's domain
 *     redirect and produced an infinite 308 loop on 2026-07-17).
 *
 * Usage: node scripts/seo-guard.mjs   (wired as `npm run seo:guard`)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SOURCE_DIRS = ["app", "components", "lib", "public"];
const SOURCE_EXT = /\.(ts|tsx|js|mjs|css|json|txt|xml|md)$/;

const errors = [];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

// -- Check 1 & 2: scan source files -----------------------------------------
const siteUrlDecl = /const\s+SITE_URL\s*=/;
for (const dir of SOURCE_DIRS) {
  let entries;
  try {
    entries = [...walk(join(ROOT, dir))];
  } catch {
    continue; // dir absent
  }
  for (const file of entries) {
    if (!SOURCE_EXT.test(file)) continue;
    const rel = relative(ROOT, file).replaceAll("\\", "/");
    const text = readFileSync(file, "utf8");

    if (text.includes("mokeet-elsuarye")) {
      errors.push(`${rel}: contains the competitor domain "mokeet-elsuarye"`);
    }
    if (siteUrlDecl.test(text) && rel !== "lib/seo/site.ts") {
      errors.push(`${rel}: declares its own SITE_URL — import it from lib/seo/site.ts instead`);
    }
  }
}

// -- Check 3: no host redirects in next.config.ts ---------------------------
try {
  const cfg = readFileSync(join(ROOT, "next.config.ts"), "utf8");
  if (/redirects\s*\(/.test(cfg) && /type:\s*["']host["']/.test(cfg)) {
    errors.push(
      "next.config.ts: app-level host redirect detected — host canonicalization belongs to Vercel domains (see 2026-07-17 outage)",
    );
  }
} catch {
  errors.push("next.config.ts: missing");
}

// -- Report -----------------------------------------------------------------
if (errors.length) {
  console.error("SEO guard FAILED:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log("SEO guard passed: no competitor domain, single SITE_URL, no host redirects.");
