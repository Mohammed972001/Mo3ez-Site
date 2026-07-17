import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Canonical host is non-www (moket-elsuarye.com). Permanently redirect the
    // www host to it so search engines consolidate signals on a single origin.
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
