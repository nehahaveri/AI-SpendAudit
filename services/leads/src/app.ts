import { Hono } from "hono";

/**
 * Lead capture service.
 *
 * Owns all PII (email, company). Persists the lead to Supabase, fires a Resend
 * transactional email, and applies abuse protection (honeypot + per-IP rate
 * limit). The public share page never reads from here. Real route
 * (`POST /lead`) lands on Day 5.
 */
export const app = new Hono();

app.get("/health", (c) => c.json({ service: "leads", ok: true }));

export default app;
