import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-*.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.cloudflare.com",
      },
      {
        protocol: "https",
        hostname: "media.infotrie.com",
      },
      {
        protocol: "https",
        hostname: "infotrie.com",
      },
    ],
  },
};

export default nextConfig;
