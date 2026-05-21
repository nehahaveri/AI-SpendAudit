import { serve } from "@hono/node-server";
import app from "./app";

const port = Number(process.env.PORT ?? 4002);
serve({ fetch: app.fetch, port });
console.log(`[summary] listening on http://localhost:${port}`);
