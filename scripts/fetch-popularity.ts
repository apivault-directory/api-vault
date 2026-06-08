/**
 * scripts/fetch-popularity.ts
 *
 * Fetches GitHub star counts for providers that have a `githubRepo` field
 * and writes results to data/popularity.json.
 *
 * Usage:
 *   npx tsx scripts/fetch-popularity.ts
 *
 * Environment:
 *   GITHUB_TOKEN  — optional, but strongly recommended to avoid 60 req/hr limit
 *                   Create at: github.com/settings/tokens (no scopes needed for public repos)
 *
 * Note: providers without a `githubRepo` field are skipped — their popularity
 * score falls back to the manual baseline in providers.ts.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { providers } from "../lib/providers";
import type { PopularityEntry } from "../lib/scoring";

const DATA_DIR  = join(process.cwd(), "data");
const OUT_FILE  = join(DATA_DIR, "popularity.json");
const DELAY_MS  = 300; // politeness delay between GitHub API calls

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadExisting(): Record<string, PopularityEntry> {
  if (!existsSync(OUT_FILE)) return {};
  try {
    return JSON.parse(readFileSync(OUT_FILE, "utf-8")) as Record<string, PopularityEntry>;
  } catch {
    return {};
  }
}

async function fetchStars(repo: string): Promise<number | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "APIVault-PopularityFetch/1.0 (+https://www.apivault.directory)",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const url = `https://api.github.com/repos/${repo}`;

  try {
    const res = await fetch(url, { headers });

    if (res.status === 404) {
      console.warn(`  [warn] ${repo} → 404 Not Found — check the repo name`);
      return null;
    }
    if (res.status === 403 || res.status === 429) {
      const reset = res.headers.get("x-ratelimit-reset");
      console.error(`  [error] Rate limited! Reset at ${reset ? new Date(parseInt(reset, 10) * 1000).toISOString() : "unknown"}`);
      console.error("  Set GITHUB_TOKEN env var to raise the limit to 5,000 req/hr.");
      return null;
    }
    if (!res.ok) {
      console.warn(`  [warn] ${repo} → HTTP ${res.status}`);
      return null;
    }

    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? null;
  } catch (err) {
    console.warn(`  [warn] ${repo} → fetch error:`, err);
    return null;
  }
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("[popularity] No GITHUB_TOKEN set — using unauthenticated requests (60 req/hr limit).");
    console.warn("[popularity] Set GITHUB_TOKEN to a fine-grained token with no extra scopes.\n");
  } else {
    console.log("[popularity] GITHUB_TOKEN detected — using authenticated requests (5,000 req/hr).\n");
  }

  const withRepo = providers.filter((p) => p.githubRepo);
  console.log(`[popularity] ${withRepo.length} provider(s) have githubRepo set.\n`);

  if (withRepo.length === 0) {
    console.log("[popularity] Nothing to fetch. Add `githubRepo: \"owner/repo\"` to providers in lib/providers.ts.");
    return;
  }

  const existing = loadExisting();
  const updated: Record<string, PopularityEntry> = { ...existing };

  for (const p of withRepo) {
    const repo = p.githubRepo!;
    process.stdout.write(`  ${p.slug.padEnd(30)} (${repo.padEnd(45)}) → `);

    const stars = await fetchStars(repo);
    if (stars !== null) {
      updated[p.slug] = { stars, fetchedAt: new Date().toISOString() };
      console.log(`⭐ ${stars.toLocaleString()} stars`);
    } else {
      console.log("skipped");
    }

    await sleep(DELAY_MS);
  }

  writeFileSync(OUT_FILE, JSON.stringify(updated, null, 2), "utf-8");
  console.log(`\n[popularity] Written to ${OUT_FILE}`);

  // Summary of providers WITHOUT githubRepo
  const missing = providers.filter((p) => !p.githubRepo);
  if (missing.length > 0) {
    console.log(`\n[popularity] ${missing.length} provider(s) have no githubRepo — popularity falls back to manual baseline:`);
    for (const p of missing) {
      console.log(`  - ${p.slug} (popularityScore baseline: ${p.popularityScore})`);
    }
  }
}

main().catch((err) => {
  console.error("[popularity] Fatal error:", err);
  process.exit(1);
});
