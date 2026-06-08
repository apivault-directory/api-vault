/**
 * scripts/health-check.ts
 *
 * Lightweight health checker for every provider in lib/providers.ts.
 *
 * For each provider it performs a HEAD (or GET fallback) to the public root
 * of the provider's docs site or API host — no API keys required.
 *
 * Results are appended to data/health/<slug>.json (max 90 entries per file).
 *
 * Usage:
 *   npx tsx scripts/health-check.ts
 *   # or a single provider:
 *   npx tsx scripts/health-check.ts groq
 *
 * Environment:
 *   HEALTH_TIMEOUT_MS  — request timeout in ms  (default 8000)
 *   HEALTH_DELAY_MS    — politeness delay between requests (default 400)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { providers } from "../lib/providers";
import type { HealthEntry, HealthHistory } from "../lib/scoring";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const TIMEOUT_MS  = parseInt(process.env.HEALTH_TIMEOUT_MS  ?? "8000", 10);
const DELAY_MS    = parseInt(process.env.HEALTH_DELAY_MS    ?? "400",  10);
const MAX_ENTRIES = 90;
const DATA_DIR    = join(process.cwd(), "data", "health");

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Pick a safe URL to probe (no auth required)
// ---------------------------------------------------------------------------

function probeUrl(p: typeof providers[0]): string {
  // Prefer the docs URL (public, no auth). Fall back to website.
  // We probe only the origin so we never hit an authenticated endpoint.
  const candidates = [p.docsUrl, p.website].filter(Boolean);
  for (const url of candidates) {
    try {
      const { origin } = new URL(url);
      if (origin && origin !== "null") return origin;
    } catch { /* skip malformed URLs */ }
  }
  // Last resort: construct from domain
  return `https://${p.domain}`;
}

// ---------------------------------------------------------------------------
// Single probe (HEAD → GET fallback, 1 retry)
// ---------------------------------------------------------------------------

async function probe(url: string): Promise<{ httpStatus: number | null; responseTimeMs: number; reachable: boolean }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const t0 = Date.now();

  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "APIVault-HealthCheck/1.0 (+https://apivault.dev)" },
    });
    clearTimeout(timer);
    return {
      httpStatus: res.status,
      responseTimeMs: Date.now() - t0,
      reachable: true, // got a response
    };
  } catch (headErr) {
    // HEAD might be disallowed — try GET
    const controller2 = new AbortController();
    const timer2 = setTimeout(() => controller2.abort(), TIMEOUT_MS);
    try {
      const res2 = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller2.signal,
        headers: { "User-Agent": "APIVault-HealthCheck/1.0 (+https://apivault.dev)" },
      });
      clearTimeout(timer2);
      return {
        httpStatus: res2.status,
        responseTimeMs: Date.now() - t0,
        reachable: true,
      };
    } catch {
      clearTimeout(timer2);
      return { httpStatus: null, responseTimeMs: Date.now() - t0, reachable: false };
    }
  }
}

// Status classification
function classify(result: Awaited<ReturnType<typeof probe>>): "online" | "degraded" | "down" {
  if (!result.reachable) return "down";
  const s = result.httpStatus ?? 0;
  if (s >= 500) return "down";
  if (s === 429 || (s >= 400 && s !== 404 && s !== 401 && s !== 403)) return "degraded";
  if (result.responseTimeMs > 1500) return "degraded";
  return "online";
}

// ---------------------------------------------------------------------------
// Read / write history
// ---------------------------------------------------------------------------

function loadHistory(slug: string): HealthHistory {
  const path = join(DATA_DIR, `${slug}.json`);
  if (!existsSync(path)) return { slug, entries: [] };
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as HealthHistory;
  } catch {
    return { slug, entries: [] };
  }
}

function saveHistory(history: HealthHistory) {
  // Keep only the most recent MAX_ENTRIES
  if (history.entries.length > MAX_ENTRIES) {
    history.entries = history.entries.slice(-MAX_ENTRIES);
  }
  writeFileSync(
    join(DATA_DIR, `${history.slug}.json`),
    JSON.stringify(history, null, 2),
    "utf-8",
  );
}

// ---------------------------------------------------------------------------
// Sleep helper
// ---------------------------------------------------------------------------

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const slugFilter = process.argv[2]; // optional: only run for one slug
  const targets = slugFilter
    ? providers.filter((p) => p.slug === slugFilter)
    : providers;

  if (slugFilter && targets.length === 0) {
    console.error(`No provider found with slug "${slugFilter}"`);
    process.exit(1);
  }

  console.log(`[health-check] Checking ${targets.length} provider(s) — timeout ${TIMEOUT_MS}ms, delay ${DELAY_MS}ms\n`);

  let ok = 0, degraded = 0, down = 0;

  for (const p of targets) {
    const url = probeUrl(p);
    process.stdout.write(`  ${p.slug.padEnd(30)} → ${url.padEnd(50)}`);

    // First attempt
    let result = await probe(url);

    // Single retry on failure
    if (!result.reachable) {
      await sleep(1000);
      result = await probe(url);
    }

    const s = classify(result);
    const entry: HealthEntry = {
      timestamp:     new Date().toISOString(),
      httpStatus:    result.httpStatus,
      responseTimeMs: result.responseTimeMs,
      reachable:     result.reachable,
    };

    const history = loadHistory(p.slug);
    history.entries.push(entry);
    saveHistory(history);

    const icon = s === "online" ? "✓" : s === "degraded" ? "⚠" : "✗";
    const statusStr = `${icon} ${s.toUpperCase().padEnd(8)} ${result.responseTimeMs}ms`;
    if (result.httpStatus) process.stdout.write(`[${result.httpStatus}] `);
    console.log(statusStr);

    if (s === "online") ok++;
    else if (s === "degraded") degraded++;
    else down++;

    if (DELAY_MS > 0) await sleep(DELAY_MS);
  }

  console.log(`\n[health-check] Done — online: ${ok}  degraded: ${degraded}  down: ${down}`);
}

main().catch((err) => {
  console.error("[health-check] Fatal error:", err);
  process.exit(1);
});
