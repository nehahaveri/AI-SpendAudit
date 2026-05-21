import { Hono } from "hono";

/**
 * Audit engine service.
 *
 * Owns the pricing catalog and the pure-function rules (5 rules + conflict
 * resolution). Stateless by design, so it scales horizontally. Real routes
 * (`GET /catalog`, `POST /audit`) land on Day 2.
 */
export const app = new Hono();

app.get("/health", (c) => c.json({ service: "engine", ok: true }));

export default app;
