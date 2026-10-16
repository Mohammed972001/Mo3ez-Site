import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

  async redirects() {
    /* One canonical host: www answers with a permanent redirect to the apex.
       On Vercel this was a domain setting; on Cloudflare Workers the app owns it. */
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.moket-elsuarye.com" }],
        destination: "https://moket-elsuarye.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// Lets `next dev` reach the Cloudflare bindings declared in wrangler.jsonc.
initOpenNextCloudflareForDev();
