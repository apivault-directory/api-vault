import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How we calculate the APIVault Trust Score. Transparent, reproducible, fair.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <>
      <Nav />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] mb-4">// Methodology</h1>
        <p className="text-fg-1 text-lg mb-10">How we calculate the APIVault Trust Score. Every weight, every signal — laid out.</p>
        <div className="prose">
          <h2>Trust Score Formula</h2>
          <p>Every API gets a score from 0 to 100, calculated as a weighted average of four dimensions:</p>
          <pre><code>{`score = reliability * 0.35
      + free_tier * 0.30
      + documentation * 0.20
      + popularity * 0.15`}</code></pre>
          <h2>The Four Dimensions</h2>
          <h3>1. Reliability (35%)</h3>
          <p>We hit each provider&apos;s API endpoint every 6 hours and record:</p>
          <ul>
            <li>HTTP status (online / degraded / down)</li>
            <li>Response time (p50, p95)</li>
            <li>Time-to-first-token for streaming endpoints</li>
          </ul>
          <p>Score is the percentage of successful checks in the last 30 days, with the last 7 days weighted 2× more than the prior 23.</p>
          <h3>2. Free Tier Generosity (30%)</h3>
          <p>We score based on what the free tier actually gives you:</p>
          <ul>
            <li>Monthly request/token quota (0-50 points)</li>
            <li>Rate limits (0-20 points)</li>
            <li>No credit card required (0-15 points)</li>
            <li>Commercial use allowed (0-10 points)</li>
            <li>Generosity ceiling (0-5 bonus points for top tier)</li>
          </ul>
          <h3>3. Documentation (20%)</h3>
          <p>We check:</p>
          <ul>
            <li>Has dedicated docs site (vs buried in main site)</li>
            <li>Has quickstart guide</li>
            <li>Has working code examples in 2+ languages</li>
            <li>Has OpenAPI/Postman collection</li>
            <li>Has interactive playground</li>
          </ul>
          <h3>4. Popularity (15%)</h3>
          <p>We aggregate from public sources:</p>
          <ul>
            <li>GitHub stars of official SDKs</li>
            <li>Monthly npm/pip downloads</li>
            <li>Mention volume on HN, Reddit, X</li>
          </ul>
          <h2>Verification Cadence</h2>
          <p>Every provider is automatically checked every 6 hours. If status changes (online → degraded, free tier removed, etc.), the changelog updates within 1 hour. A human re-verifies weekly.</p>
          <h2>What We Don&apos;t Do</h2>
          <ul>
            <li>We don&apos;t accept payment to boost scores</li>
            <li>We don&apos;t de-rank competitors of paying partners</li>
            <li>We don&apos;t remove providers for being bad — we just rank them lower</li>
          </ul>
        </div>
      </article>
      <Footer />
    </>
  );
}
