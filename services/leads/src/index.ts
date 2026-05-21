import { serve } from "@hono/node-server";
import app from "./app";

const port = Number(process.env.PORT ?? 4003);
serve({ fetch: app.fetch, port });
console.log(`[leads] listening on http://localhost:${port}`);
