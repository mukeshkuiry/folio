import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Three.js and GSAP to be bundled client-side without issues
  transpilePackages: ["three", "gsap", "lenis"],
  // Ensure GLSL/shader strings don't cause issues in strict mode
  reactStrictMode: false,
};

export default nextConfig;
