# DEVLOG — Verdict

A daily log of building Verdict, an AI-spend audit tool. One entry per day.

## Day 1 — 2026-05-21
**Hours worked:** 3

**What I did:**
- Named the product **Verdict** and locked the positioning: "paste your AI stack, get a defensible second opinion in 30 seconds, no login." The brand should imply a judgment, since that's what the tool delivers.
- Made the big architecture call early: a **microservice monorepo** instead of one Next.js app. Split it into `web` (Next.js BFF + public share pages), `engine` (audit rules), `summary` (the AI call), `leads` (storage + email), and a shared `@verdict/shared` package that holds the types + Zod schema both sides agree on.
- Scaffolded the web app (Next.js 16, React 19, Tailwind 4, TS strict) and stood up the three backend services with Hono. Confirmed the engine actually boots and the `/health` route responds.
- Built the data model first: the domain types (`Plan`, `Recommendation`, `AuditResult`) and a Zod schema that's the single source of truth for the form, the API bodies, and the engine input.
- Set up CI (lint + typecheck + test on push to main) and got everything green locally.
- Started lining up user interviews — drafting cold-outreach DMs to founders and eng leads to send out. Doing this on Day 1 on purpose since replies have the longest lead time.

**What I learned:**
- Next.js 16 is stricter than I expected: dynamic route `params` is now a `Promise` you have to `await`, which matters for the share pages and `generateMetadata`. Read the bundled docs before writing anything.
- Zod 4 moved the string formats to top-level helpers (`z.email()` instead of `z.string().email()`).
- A nice trick for keeping a Zod enum and a TS union in sync: declare the values `as const satisfies readonly UseCase[]` — if I add a use case to the type and forget the schema, the compiler yells at me.

**Blockers / what I'm stuck on:**
- Still deciding where the pricing catalog should live. If I put it in the shared package, both web and engine can import it directly, but that leaks the engine's data ownership. Leaning toward making the **engine own it** and exposing a `GET /catalog` so the form stays in sync with whatever the engine prices against. Will settle this tomorrow when I start building it.

**Plan for tomorrow:**
- Build the pricing catalog from official vendor pages and cite every single number (with the date pulled) in PRICING_DATA.md.
- Implement the first 3 audit rules — same-vendor downgrade, seat right-sizing, cross-vendor substitution — each as a pure function, with tests.
