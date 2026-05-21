import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle for a lean Docker runtime image.
  output: "standalone",
  // Monorepo: trace files from the repo root so the workspace `@verdict/shared`
  // package is included in the standalone output. `next build` runs with cwd =
  // the frontend dir, so the repo root is one level up.
  outputFileTracingRoot: path.join(process.cwd(), ".."),
  transpilePackages: ["@verdict/shared"],
};

export default nextConfig;
