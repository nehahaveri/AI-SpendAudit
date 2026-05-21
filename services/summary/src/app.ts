import { Hono } from "hono";

/**
 * AI summary service.
 *
 * Generates the ~100-word personalized summary via the Anthropic API, with a
 * deterministic templated fallback on any failure (e.g. HTTP 429). This is the
 * only place AI is used — the audit math stays in the engine. Real route
 * (`POST /summary`) lands on Day 5.
 */
export const app = new Hono();

app.get("/health", (c) => c.json({ service: "summary", ok: true }));

export default app;
