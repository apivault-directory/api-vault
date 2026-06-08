/**
 * lib/metrics.ts
 *
 * Reads automated data from data/health/ and data/popularity.json,
 * computes trust scores via lib/scoring.ts, and returns Provider objects
 * with scores overridden by real measurements where available.
 *
 * Called at build time (Next.js SSG). All reads are synchronous — safe for
 * server components and generateStaticParams.
 *
 * When data/ is empty (first deploy, before scripts run):
 *   - Manual baseline scores from providers.ts are preserved
 *   - status → "unknown"
 *   - lastVerified → "never" (UI shows "not yet verified")
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { Provider } from "./types";
import { providers as rawProviders, getProviderBySlug as rawGetBySlug } from "./providers";
import {
  computeTrustScore,
  type HealthHistory,
  type PopularityEntry,
} from "./scoring";

const DATA_DIR = join(process.cwd(), "data");

// ---------------------------------------------------------------------------
// Loaders
// ---------------------------------------------------------------------------

function loadHealth(slug: string): HealthHistory | null {
  const path = join(DATA_DIR, "health", `${slug}.json`);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as HealthHistory;
  } catch {
    return null;
  }
}

let _popularityCache: Record<string, PopularityEntry> | null = null;
function loadPopularity(): Record<string, PopularityEntry> {
  if (_popularityCache) return _popularityCache;
  const path = join(DATA_DIR, "popularity.json");
  if (!existsSync(path)) return (_popularityCache = {});
  try {
    _popularityCache = JSON.parse(readFileSync(path, "utf-8")) as Record<string, PopularityEntry>;
    return _popularityCache;
  } catch {
    return (_popularityCache = {});
  }
}

// ---------------------------------------------------------------------------
// Enrichment
// ---------------------------------------------------------------------------

function enrich(provider: Provider): Provider {
  const health = loadHealth(provider.slug);
  const pop    = loadPopularity()[provider.slug] ?? null;
  const scores = computeTrustScore(provider, health, pop);

  return {
    ...provider,
    apivaultScore:      scores.apivaultScore,
    reliabilityScore:   scores.reliabilityScore,
    documentationScore: scores.documentationScore,
    freeTierScore:      scores.freeTierScore,
    popularityScore:    scores.popularityScore,
    status:             scores.status,
    // "never" is a sentinel — timeAgo() handles it and shows "not yet verified"
    lastVerified:       scores.lastVerified ?? "never",
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Return a single provider with computed metrics, or null if slug not found. */
export function getProviderWithMetrics(slug: string): Provider | null {
  const provider = rawGetBySlug(slug);
  if (!provider) return null;
  return enrich(provider);
}

/** Return all providers with computed metrics, sorted by apivaultScore desc. */
export function getAllProvidersWithMetrics(): Provider[] {
  return rawProviders.map(enrich);
}

/** Return a subset of providers by slug, with computed metrics. */
export function getProvidersBySlugWithMetrics(slugs: string[]): Provider[] {
  return rawProviders
    .filter((p) => slugs.includes(p.slug))
    .map(enrich);
}
