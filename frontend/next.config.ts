import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The shared package ships TypeScript source; let Next transpile it.
  transpilePackages: ["@verdict/shared"],
};

export default nextConfig;
