/**
 * Shared domain model for Verdict — the contract between the web BFF and the
 * audit/summary/leads services.
 *
 * Input types (`ToolInput`, `AuditInput`) are defined in `schema.ts` and inferred
 * from Zod so validation and types stay in sync. This file holds the vocabulary
 * (enums), the pricing-catalog shape, and the engine's output shape.
 */

/** What a tool can do. Used to match user need → plan capability. */
export type Capability =
  | "code_autocomplete"
  | "agent"
  | "chat"
  | "data"
  | "research";

/** How heavily a plan can be used before limits/throttling bite. */
export type UsageTier = "light" | "medium" | "heavy" | "unlimited";

/** How a plan is billed. */
export type Billing = "per_seat" | "flat" | "usage";

/** The user's primary reason for buying AI tools. Drives required capabilities. */
export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

/** Confidence the engine has in a given recommendation. */
export type Confidence = "high" | "medium" | "low";

/** Which rule produced a recommendation (used for conflict resolution + UI). */
export type RuleType =
  | "downgrade"
  | "seat_rightsizing"
  | "substitution"
  | "redundancy"
  | "credits";

/**
 * A single, citable plan in the pricing catalog. Every number here must trace
 * to an official pricing page (`source`) on the date it was pulled (`verifiedOn`).
 */
export interface Plan {
  /** Stable identifier, e.g. "cursor-pro". */
  id: string;
  vendor: string;
  product: string;
  planName: string;
  /** Human-friendly label, e.g. "Cursor Pro". */
  displayName: string;
  billing: Billing;
  /** Present when billing is "per_seat". */
  pricePerSeat?: number;
  /** Present when billing is "flat". */
  flatMonthly?: number;
  /** Minimum seats the plan requires, if any. */
  minSeats?: number;
  capabilities: Capability[];
  usageTier: UsageTier;
  /** Official pricing-page URL. */
  source: string;
  /** Date the price was verified, YYYY-MM-DD. */
  verifiedOn: string;
}

/** One side of a recommendation's arithmetic, rendered inline on the results page. */
export interface CostLine {
  /** e.g. "Business @ $40 × 5 seats". */
  planLabel: string;
  pricePerUnit: number;
  seats: number;
  monthlyTotal: number;
}

/** A single, auditable recommendation for one tool. */
export interface Recommendation {
  rule: RuleType;
  /** Display name of the tool the recommendation applies to. */
  tool: string;
  currentCost: number;
  recommendedCost: number;
  monthlySavings: number;
  /** Short imperative, e.g. "Downgrade to Pro". */
  action: string;
  /** One sentence, with numbers — the defensible reason. */
  reason: string;
  confidence: Confidence;
  /** Official pricing-page URL backing the numbers. */
  sourceUrl: string;
  /** Arithmetic for inline display: current cost. */
  from?: CostLine;
  /** Arithmetic for inline display: recommended cost. */
  to?: CostLine;
}

/** Overall verdict, which drives the results-page CTA and tone. */
export type Verdict =
  /** > $500/mo of savings — surface Credex consult prominently. */
  | "big_savings"
  /** Some savings, below the Credex threshold. */
  | "some_savings"
  /** < $100/mo or already optimal — "you're spending well", be honest. */
  | "spending_well";

/** The complete result object returned by the engine. */
export interface AuditResult {
  recommendations: Recommendation[];
  currentMonthlyTotal: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  verdict: Verdict;
  /** Monthly AI spend per developer, for benchmark mode. */
  perDevMonthly: number;
}
