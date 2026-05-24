import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "gsap", "lenis"],
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["three", "gsap"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Handle blog subdomain in development
        {
          source: "/:path*",
          has: [{ type: "host", value: "blog.localhost:3000" }],
          destination: "/blog/:path*",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "blog.mukeshkuiry.com" }],
          destination: "/blog/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
