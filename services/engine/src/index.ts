import { serve } from "@hono/node-server";
import app from "./app";

const port = Number(process.env.PORT ?? 4001);
serve({ fetch: app.fetch, port });
console.log(`[engine] listening on http://localhost:${port}`);
