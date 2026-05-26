import { z } from "zod";
import type { UseCase } from "./types";

/**
 * Zod schemas — the single source of truth for the spend form, the service
 * request bodies, and the audit engine input. TS types are inferred from these
 * so validation and types can never drift apart.
 */

// `satisfies readonly UseCase[]` makes the compiler prove this tuple exactly
// matches the `UseCase` union in types.ts — change one, the other must follow.
const USE_CASES = [
  "coding",
  "writing",
  "data",
  "research",
  "mixed",
] as const satisfies readonly UseCase[];

export const useCaseSchema = z.enum(USE_CASES);

/** A single tool line the user reports paying for. */
export const toolInputSchema = z.object({
  /** References a `Plan.id` in the catalog. */
  planId: z.string().min(1),
  monthlySpend: z.number().nonnegative(),
  seats: z.number().int().positive(),
});

/** The full audit request: the tools, the team, and the primary use case. */
export const auditInputSchema = z.object({
  tools: z.array(toolInputSchema).min(1, "Add at least one tool"),
  teamSize: z.number().int().positive(),
  useCase: useCaseSchema,
});

/** Lead capture — email is required, the rest optional. `website` is a honeypot. */
export const leadSchema = z.object({
  auditSlug: z.string().min(1),
  email: z.email(),
  company: z.string().max(120).optional(),
  role: z.string().max(120).optional(),
  teamSize: z.number().int().positive().optional(),
  /** Honeypot: real users never fill this hidden field; bots do. */
  website: z.string().optional(),
});

export type ToolInput = z.infer<typeof toolInputSchema>;
export type AuditInput = z.infer<typeof auditInputSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
