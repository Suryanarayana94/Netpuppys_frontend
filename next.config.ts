import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Every asset in public/images is already resized and encoded as WebP, so
    // the optimizer only has to negotiate a modern format and build a srcset.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
