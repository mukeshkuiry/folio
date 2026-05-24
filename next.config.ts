import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "gsap", "lenis"],
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["three", "gsap"],
  },
};

export default nextConfig;
