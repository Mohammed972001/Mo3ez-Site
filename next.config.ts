import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Canonical-host enforcement (www vs non-www) is handled at the Vercel domain
     level, NOT in the app. An app-level host redirect fights Vercel's own
     primary-domain redirect and causes an infinite loop. To make non-www
     canonical, set moket-elsuarye.com as the primary domain in Vercel. */
};

export default nextConfig;
