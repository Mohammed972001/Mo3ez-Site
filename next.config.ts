import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Canonical-host enforcement (www vs non-www) is handled at the Vercel domain
     level, NOT in the app. An app-level host redirect fights Vercel's own
     primary-domain redirect and causes an infinite loop. To make non-www
     canonical, set moket-elsuarye.com as the primary domain in Vercel. */

  experimental: {
    /* Inline CSS into the HTML instead of render-blocking <link> tags.
       PageSpeed (2026-07-31) attributed ~600ms of mobile LCP delay to
       render-blocking CSS requests (spec 002, CWV follow-up). */
    inlineCss: true,
  },

  images: {
    /* Next 16 only serves whitelisted qualities. 55 = hero/background under
       scrims, 60 = card thumbnails, 75 = default (galleries). */
    qualities: [55, 60, 75],
  },
};

export default nextConfig;
