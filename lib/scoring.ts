/**
 * lib/scoring.ts
 *
 * Pure functions for computing APIVault trust scores from real data.
 *
 * DIMENSIONS:
 *   reliability   (35%) — automated: % of health checks that succeeded in last 30 days
 *   freeTier      (30%) — rule-based: computed from factual Provider fields (quota, no-CC, etc.)
 *   documentation (20%) — MANUAL: `docManualScore` field (1–5) set by a human reviewer
 *   popularity    (15%) — automated: GitHub stars, log-normalised to 0–100
 *
 * When automated data is missing for a dimension, that dimension falls back to the
 * manual baseline stored in providers.ts — but `hasRealMetrics` will be false so the
 * UI can show "not yet verified" instead of pretending the data is fresh.
 */

import type { Provider, ProviderStatus } from "./types";

// ---------------------------------------------------------------------------
// Data shapes written by scripts/health-check.ts and scripts/fetch-popularity.ts
// ---------------------------------------------------------------------------

export interface HealthEntry {
  /** ISO timestamp of the check */
  timestamp: string;
  /** HTTP status code returned, or null if the request timed out / threw */
  httpStatus: number | null;
  /** Round-trip time in milliseconds, or null on timeout */
  responseTimeMs: number | null;
  /** true = got any HTTP response (even 4xx); false = network error / timeout */
  reachable: boolean;
}

export interface HealthHistory {
  slug: string;
  entries: HealthEntry[]; // oldest first; capped at 90 entries by the script
}

export interface PopularityEntry {
  stars: number;
  fetchedAt: string; // ISO
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

export interface ComputedScores {
  apivaultScore: number;
  reliabilityScore: number;
  freeTierScore: number;
  documentationScore: number;
  popularityScore: number;
  status: ProviderStatus;
  /** ISO string of most recent successful check, or null if never checked */
  lastVerified: string | null;
  /** true if at least one automated data source contributed to the score */
  hasRealMetrics: boolean;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function computeTrustScore(
  provider: Provider,
  health: HealthHistory | null,
  popularity: PopularityEntry | null,
): ComputedScores {
  const hasHealth = health !== null && health.entries.length > 0;
  const hasPopularity = popularity !== null;

  // ------------------------------------------------------------------
  // 1. Reliability (35%) — from health-check history
  // ------------------------------------------------------------------
  let reliabilityScore: number;
  let status: ProviderStatus;
  let lastVerified: string | null = null;

  if (hasHealth) {
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    const sevenDaysAgo  = now - 7  * 24 * 60 * 60 * 1000;

    const all30 = health.entries.filter(
      (e) => new Date(e.timestamp).getTime() > thirtyDaysAgo,
    );
    const last7  = all30.filter((e) => new Date(e.timestamp).getTime() > sevenDaysAgo);
    const prior23 = all30.filter((e) => new Date(e.timestamp).getTime() <= sevenDaysAgo);

    // Last 7 days are weighted 2× more than prior 23 days
    const weightedOk    = last7.filter((e) => e.reachable).length * 2
                        + prior23.filter((e) => e.reachable).length;
    const weightedTotal = last7.length * 2 + prior23.length;

    reliabilityScore = weightedTotal > 0
      ? Math.round((weightedOk / weightedTotal) * 100)
      : 100; // no data in window → assume healthy (will correct next check)

    // Status from the most recent entry
    const latest = health.entries[health.entries.length - 1];
    lastVerified = latest.timestamp;

    if (!latest.reachable) {
      status = "down";
    } else if (
      (latest.responseTimeMs !== null && latest.responseTimeMs > 1500) ||
      (latest.httpStatus !== null && latest.httpStatus >= 400 && latest.httpStatus !== 404)
    ) {
      status = "degraded";
    } else {
      status = "online";
    }
  } else {
    // No automated data — fall back to manual baseline, mark unknown
    reliabilityScore = provider.reliabilityScore;
    status = "unknown";
    lastVerified = null;
  }

  // ------------------------------------------------------------------
  // 2. Free tier (30%) — computed from factual fields
  //    Rubric is explicit and stable (not auto-generated from text parsing)
  // ------------------------------------------------------------------
  const freeTierScore = computeFreeTierScore(provider);

  // ------------------------------------------------------------------
  // 3. Documentation (20%) — MANUAL score (1–5) set by a human
  //    If docManualScore is not set, fall back to the baseline in providers.ts.
  // ------------------------------------------------------------------
  const documentationScore =
    provider.docManualScore !== undefined
      ? Math.round((provider.docManualScore / 5) * 100)
      : provider.documentationScore;

  // ------------------------------------------------------------------
  // 4. Popularity (15%) — GitHub stars, log-normalised
  //    If no star data, fall back to baseline popularityScore.
  // ------------------------------------------------------------------
  const popularityScore = hasPopularity
    ? normalizeStars(popularity.stars)
    : provider.popularityScore;

  // ------------------------------------------------------------------
  // Weighted composite
  // ------------------------------------------------------------------
  const apivaultScore = Math.round(
    reliabilityScore  * 0.35 +
    freeTierScore     * 0.30 +
    documentationScore * 0.20 +
    popularityScore   * 0.15,
  );

  return {
    apivaultScore,
    reliabilityScore,
    freeTierScore,
    documentationScore,
    popularityScore,
    status,
    lastVerified,
    hasRealMetrics: hasHealth || hasPopularity,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Free tier rubric (max 100 points).
 * Every signal maps to a factual field — nothing is inferred from text.
 *
 * Points:
 *   +30  No credit card required
 *   +10  No phone required
 *   +35  Has monthly request or token quota (proves a real free tier exists)
 *   +10  Rate limit info documented (shows transparency)
 *   +10  Models listed (useful for comparison)
 *   +5   Both monthly AND rate-limit info present (completeness bonus)
 */
function computeFreeTierScore(provider: Provider): number {
  let score = 0;

  if (!provider.requiresCreditCard) score += 30;
  if (!provider.requiresPhone)       score += 10;

  const d = provider.freeTierDetails;
  const hasQuota = !!(d.monthlyRequests || d.monthlyTokens);
  const hasRate  = !!d.rateLimit;
  const hasModels = !!d.models;

  if (hasQuota)   score += 35;
  if (hasRate)    score += 10;
  if (hasModels)  score += 10;
  if (hasQuota && hasRate) score += 5; // completeness bonus

  return Math.min(100, score);
}

/**
 * Log-normalise GitHub stars to 0–100.
 * Reference points:
 *   0 stars    →   0
 *   100 stars  →  ~33
 *   1 000      →  ~50
 *   10 000     →  ~67
 *   100 000    →  ~83
 *   1 000 000  → 100
 */
function normalizeStars(stars: number): number {
  if (stars <= 0) return 0;
  const max = Math.log10(1_000_000 + 1);
  const val = Math.log10(stars + 1);
  return Math.min(100, Math.round((val / max) * 100));
}
