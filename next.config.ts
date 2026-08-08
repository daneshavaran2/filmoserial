import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows the dev server to be opened from a LAN address (e.g. viewing
  // it from a phone, or via 172.x/192.168.x, on the same Wi-Fi) instead
  // of only localhost. Next.js matches these as dot-separated segments,
  // not CIDR ranges, so wildcards must be per-octet.
  allowedDevOrigins: [
    "172.19.48.1",
    "172.19.*.*",
    "192.168.*.*",
    "10.*.*.*",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
