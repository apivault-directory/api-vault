import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getAllProvidersWithMetrics } from "@/lib/metrics";

export const metadata: Metadata = {
  title: "API Docs",
  description: "Free REST API for accessing all APIVault provider data — scores, categories, free tier details, and live status.",
  alternates: { canonical: "/api-docs" },
};

function Endpoint({
  method,
  path,
  description,
  params,
  example,
  response,
}: {
  method: "GET";
  path: string;
  description: string;
  params?: { name: string; type: string; required?: boolean; desc: string }[];
  example: string;
  response: string;
}) {
  return (
    <div className="bg-bg-1 border border-line rounded-xl overflow-hidden mb-6">
      {/* header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-line bg-bg-2">
        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[rgba(0,255,136,0.12)] text-accent">
          {method}
        </span>
        <code className="font-mono text-sm text-fg-0">{path}</code>
      </div>

      <div className="p-5 space-y-5">
        <p className="text-fg-1 text-sm">{description}</p>

        {params && params.length > 0 && (
          <div>
            <p className="text-[10px] font-mono text-fg-2 uppercase tracking-wider mb-2">Query Parameters</p>
            <div className="space-y-2">
              {params.map((p) => (
                <div key={p.name} className="flex items-start gap-3 text-sm">
                  <code className="font-mono text-accent shrink-0">{p.name}</code>
                  <span className="text-[10px] font-mono text-fg-2 bg-bg-0 px-1.5 py-0.5 rounded shrink-0">{p.type}</span>
                  {p.required && <span className="text-[10px] font-mono text-status-err shrink-0">required</span>}
                  <span className="text-fg-2 text-xs">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-[10px] font-mono text-fg-2 uppercase tracking-wider mb-2">Example Request</p>
          <pre className="bg-bg-0 border border-line rounded-lg p-4 text-sm font-mono text-fg-0 overflow-x-auto">{example}</pre>
        </div>

        <div>
          <p className="text-[10px] font-mono text-fg-2 uppercase tracking-wider mb-2">Example Response</p>
          <pre className="bg-bg-0 border border-line rounded-lg p-4 text-sm font-mono text-fg-1 overflow-x-auto leading-relaxed">{response}</pre>
        </div>
      </div>
    </div>
  );
}

export default function ApiDocsPage() {
  const providers = getAllProvidersWithMetrics();
  const sample = providers[0];

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-fg-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Free · No auth · CORS enabled</span>
        </div>
        <h1 className="font-display text-[clamp(32px,4vw,52px)] font-semibold tracking-[-0.04em] leading-[1.05] mb-4">
          APIVault REST API
        </h1>
        <p className="text-lg text-fg-1 max-w-[600px] leading-relaxed mb-6">
          Access all APIVault data programmatically. Free, no API key required, open to everyone.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Base URL", value: "https://apivault.directory/api/v1" },
            { label: "Auth", value: "None required" },
            { label: "Rate limit", value: "Unlimited" },
            { label: "Format", value: "JSON" },
          ].map((s) => (
            <div key={s.label} className="bg-bg-1 border border-line rounded-lg px-4 py-3">
              <div className="text-[10px] font-mono text-fg-2 uppercase tracking-wider">{s.label}</div>
              <div className="text-sm font-mono text-fg-0 mt-0.5">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Base URL banner */}
      <section className="max-w-[1280px] mx-auto px-6 pb-10">
        <div className="bg-bg-1 border border-[rgba(0,255,136,0.2)] rounded-xl p-5 flex items-center gap-4">
          <span className="text-xs font-mono text-fg-2 shrink-0">Base URL</span>
          <code className="font-mono text-accent text-sm">https://apivault.directory/api/v1</code>
        </div>
      </section>

      {/* Endpoints */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-6">// Endpoints</h2>

        <Endpoint
          method="GET"
          path="/api/v1/providers"
          description="Returns a list of all AI API providers, sorted by trust score descending. Supports filtering and search."
          params={[
            { name: "category", type: "string", desc: "Filter by category. One of: LLM, Image, Speech, Embeddings, Search, Video, Code, Vision" },
            { name: "noCard", type: "boolean", desc: "If true, only return providers that don't require a credit card" },
            { name: "noPhone", type: "boolean", desc: "If true, only return providers that don't require phone verification" },
            { name: "q", type: "string", desc: "Search by name, tagline, or category" },
            { name: "sort", type: "string", desc: "Sort order. score (default) or name" },
            { name: "limit", type: "number", desc: "Max results to return. Default 200, max 200" },
          ]}
          example={`curl https://apivault.directory/api/v1/providers?category=LLM&noCard=true`}
          response={`{
  "object": "list",
  "count": 12,
  "data": [
    {
      "slug": "${sample?.slug ?? "groq"}",
      "name": "${sample?.name ?? "Groq"}",
      "tagline": "${sample?.tagline ?? "Ultra-fast LLM inference via GroqCloud."}",
      "category": "${sample?.category ?? "LLM"}",
      "website": "${sample?.website ?? "https://groq.com"}",
      "docsUrl": "${sample?.docsUrl ?? "https://console.groq.com/docs"}",
      "status": "${sample?.status ?? "online"}",
      "apivaultScore": ${sample?.apivaultScore ?? 91},
      "freeTierSummary": "${sample?.freeTierSummary ?? "14,400 req/day free"}",
      "requiresCreditCard": ${sample?.requiresCreditCard ?? false},
      "requiresPhone": ${sample?.requiresPhone ?? false},
      "lastVerified": "${sample?.lastVerified ?? "2025-01-01"}"
    },
    ...
  ]
}`}
        />

        <Endpoint
          method="GET"
          path="/api/v1/providers/:slug"
          description="Returns full details for a single provider including score breakdown, free tier details, pros/cons, use cases, and changelog."
          example={`curl https://apivault.directory/api/v1/providers/${sample?.slug ?? "groq"}`}
          response={`{
  "object": "provider",
  "slug": "${sample?.slug ?? "groq"}",
  "name": "${sample?.name ?? "Groq"}",
  "tagline": "${sample?.tagline ?? "Ultra-fast LLM inference via GroqCloud."}",
  "category": "${sample?.category ?? "LLM"}",
  "apivaultScore": ${sample?.apivaultScore ?? 91},
  "scores": {
    "reliability": ${sample?.reliabilityScore ?? 95},
    "freeTier": ${sample?.freeTierScore ?? 90},
    "documentation": ${sample?.documentationScore ?? 85},
    "popularity": ${sample?.popularityScore ?? 80}
  },
  "freeTier": {
    "summary": "${sample?.freeTierSummary ?? "14,400 req/day free"}",
    "requiresCreditCard": ${sample?.requiresCreditCard ?? false},
    "requiresPhone": ${sample?.requiresPhone ?? false}
  },
  "pros": [...],
  "cons": [...],
  "useCases": [...],
  "changelog": [...]
}`}
        />

        <Endpoint
          method="GET"
          path="/api/v1/collections"
          description="Returns all published curated collections with their provider slugs."
          example={`curl https://apivault.directory/api/v1/collections`}
          response={`{
  "object": "list",
  "count": 10,
  "data": [
    {
      "slug": "best-for-hackathons",
      "title": "Best APIs for Hackathons",
      "subtitle": "Ship in 48 hours",
      "description": "APIs with the easiest setup...",
      "providerCount": 10,
      "providerSlugs": ["groq", "openrouter", "deepseek", ...]
    },
    ...
  ]
}`}
        />

        <Endpoint
          method="GET"
          path="/api/v1/status"
          description="Returns live status of all tracked providers. Updated daily via GitHub Actions health checks."
          example={`curl https://apivault.directory/api/v1/status`}
          response={`{
  "object": "status",
  "summary": {
    "online": 48,
    "degraded": 2,
    "down": 1,
    "unknown": 14,
    "total": ${providers.length}
  },
  "data": [
    {
      "slug": "groq",
      "name": "Groq",
      "status": "online",
      "lastVerified": "2025-06-09T06:00:00Z"
    },
    ...
  ]
}`}
        />
      </section>

      {/* Footer notes */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "// CORS",
              body: "All endpoints include CORS headers — works from any frontend, including browser-side fetch.",
            },
            {
              title: "// Caching",
              body: "Responses are cached at the edge for 1 hour (status: 5 min). Use stale-while-revalidate for speed.",
            },
            {
              title: "// Open source",
              body: "The full dataset is open. Star the repo on GitHub or submit a new provider via /submit.",
            },
          ].map((c) => (
            <div key={c.title} className="bg-bg-1 border border-line rounded-xl p-5">
              <p className="font-mono text-xs text-accent mb-2">{c.title}</p>
              <p className="text-sm text-fg-1 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
