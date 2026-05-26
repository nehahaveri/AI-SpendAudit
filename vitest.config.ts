import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // The audit engine is pure TS, so a Node environment is all we need.
    environment: "node",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/lib/engine/**/*.ts", "src/lib/summary.ts"],
    },
  },
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
