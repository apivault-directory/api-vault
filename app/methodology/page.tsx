import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How we calculate the APIVault Trust Score — what's automated, what's manual, and what we don't claim to measure.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <>
      <Nav />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] mb-4">// Methodology</h1>
        <p className="text-fg-1 text-lg mb-3">
          How the APIVault Trust Score is calculated. What&apos;s automated, what&apos;s manual, and what we don&apos;t claim.
        </p>
        <p className="text-sm text-fg-2 font-mono mb-10 bg-bg-1 border border-line rounded px-4 py-3">
          ⚠ We value honesty over the appearance of sophistication. This page describes exactly what signals we
          collect and which ones come from a human rather than a machine.
        </p>

        <div className="prose">
          <h2>The Formula</h2>
          <pre><code>{`score = reliability   × 0.35   (automated when health checks have run)
      + free_tier     × 0.30   (rule-based, from factual provider fields)
      + documentation × 0.20   (MANUAL — human rating 1–5)
      + popularity    × 0.15   (automated when GitHub stars are fetched)`}</code></pre>

          <h2>Dimension 1 — Reliability (35%)</h2>
          <p><strong>Source:</strong> <code>scripts/health-check.ts</code>, run via GitHub Actions on a daily schedule.</p>
          <p>
            For each provider we send a HEAD request (falling back to GET) to the public root of their docs site
            or API host — no API key required, so we never call a paid endpoint. We record:
          </p>
          <ul>
            <li>HTTP status code (or null on timeout)</li>
            <li>Round-trip response time in ms</li>
            <li>Whether the host was reachable at all</li>
          </ul>
          <p>
            Status classification: <strong>online</strong> if reachable and &lt;1 500 ms, <strong>degraded</strong> if
            reachable but slow or returning an unexpected 4xx, <strong>down</strong> if unreachable or 5xx.
          </p>
          <p>
            Score: percentage of successful checks in the last 30 days, with the most recent 7 days weighted 2×
            heavier than the prior 23.
          </p>
          <p className="text-status-warn font-mono text-sm">
            If health checks have never run for a provider, the score falls back to the manual
            baseline in <code>lib/providers.ts</code> and the UI shows &quot;not yet verified&quot;.
          </p>

          <h2>Dimension 2 — Free Tier Generosity (30%)</h2>
          <p><strong>Source:</strong> factual fields in <code>lib/providers.ts</code>, verified manually.</p>
          <p>Scoring rubric (max 100 points):</p>
          <table>
            <thead><tr><th>Signal</th><th>Points</th></tr></thead>
            <tbody>
              <tr><td>No credit card required</td><td>+30</td></tr>
              <tr><td>No phone required</td><td>+10</td></tr>
              <tr><td>Monthly request or token quota documented</td><td>+35</td></tr>
              <tr><td>Rate limit documented</td><td>+10</td></tr>
              <tr><td>Available models listed</td><td>+10</td></tr>
              <tr><td>Both quota AND rate limit documented (completeness bonus)</td><td>+5</td></tr>
            </tbody>
          </table>
          <p>
            This is rule-based, not machine-learned. We update the rubric when we discover new meaningful signals.
          </p>

          <h2>Dimension 3 — Documentation (20%)</h2>
          <p><strong>Source:</strong> human. Stored as <code>docManualScore</code> (1–5) in <code>lib/providers.ts</code>.</p>
          <p>Rating guide:</p>
          <ul>
            <li><strong>5</strong> — Dedicated docs site, quickstart, multi-language examples, interactive playground or Postman collection</li>
            <li><strong>4</strong> — Good docs site, quickstart, 2+ language examples</li>
            <li><strong>3</strong> — Adequate docs, at least curl examples and endpoint reference</li>
            <li><strong>2</strong> — Sparse docs, hard to find rate limits or model names</li>
            <li><strong>1</strong> — Minimal or machine-translated docs</li>
          </ul>
          <p>
            We don&apos;t automate this dimension. Docs quality requires reading, not fetching. If a provider doesn&apos;t
            have a <code>docManualScore</code> set yet, the field falls back to the historical baseline.
          </p>

          <h2>Dimension 4 — Popularity (15%)</h2>
          <p><strong>Source:</strong> <code>scripts/fetch-popularity.ts</code>, pulling GitHub star counts for providers with a <code>githubRepo</code> field.</p>
          <p>
            Stars are log-normalised to 0–100 (1 M stars = 100, 10 k stars ≈ 67, 100 stars ≈ 33).
            We use log scale because star counts span several orders of magnitude.
          </p>
          <p>
            Providers without a clear official GitHub repo are scored using the manual baseline.
            We don&apos;t guess at repo names.
          </p>

          <h2>What We Don&apos;t Claim</h2>
          <ul>
            <li>We do not measure latency of the actual inference endpoint (that requires an API key)</li>
            <li>We do not track npm/pip download counts — too easy to inflate</li>
            <li>We do not monitor HN/Reddit/X sentiment</li>
            <li>We do not verify free tier limits programmatically — those are manually checked during provider onboarding</li>
          </ul>

          <h2>Verification Cadence</h2>
          <p>
            Health checks run daily via GitHub Actions (<code>.github/workflows/verify.yml</code>). Results are committed
            to <code>data/health/</code> and the site rebuilds with updated scores. Human review of free tier details
            and docManualScore happens on a best-effort basis — typically when a provider announces changes.
          </p>

          <h2>Integrity</h2>
          <ul>
            <li>We don&apos;t accept payment to boost scores</li>
            <li>We don&apos;t remove providers for being competitors</li>
            <li>Providers with low scores stay listed — users need to know</li>
            <li>All scoring code is open-source in <code>lib/scoring.ts</code></li>
          </ul>
        </div>
      </article>
      <Footer />
    </>
  );
}
