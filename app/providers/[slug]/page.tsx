import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X, ExternalLink, BookOpen } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StatusDot } from "@/components/status-dot";
import { CodeBlock } from "@/components/code-block";
import { ButtonLink } from "@/components/button";
import { TrustScore } from "@/components/trust-score";
import { GlanceCard } from "@/components/glance-card";
import { ScoreBar } from "@/components/score-bar";
import { ProviderLogo } from "@/components/provider-logo";
import { providers } from "@/lib/providers";
import { getProviderWithMetrics } from "@/lib/metrics";
import { timeAgo, formatDate } from "@/lib/utils";
import { providerJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderWithMetrics(slug);
  if (!provider) return {};
  return {
    title: `${provider.name} — Free API, ${provider.category}`,
    description: provider.tagline,
    alternates: { canonical: `/providers/${provider.slug}` },
    openGraph: { title: `${provider.name} — APIVault Score ${provider.apivaultScore}/100`, description: provider.tagline, type: "article" },
  };
}

export default async function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getProviderWithMetrics(slug);
  if (!provider) notFound();

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(providerJsonLd(provider)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: "Home", url: "/" }, { name: "Providers", url: "/providers" }, { name: provider.name, url: `/providers/${provider.slug}` },
      ])) }} />

      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="flex items-start justify-between gap-8 mb-8 flex-wrap">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <ProviderLogo domain={provider.domain} text={provider.logoText} size="xl" />
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="font-display text-3xl font-semibold tracking-tight">{provider.name}</h1>
                <div className="flex items-center gap-1.5 text-sm">
                  <StatusDot status={provider.status} />
                  <span className="text-fg-1 capitalize">{provider.status}</span>
                </div>
              </div>
              <p className="text-fg-1 text-base max-w-2xl">{provider.tagline}</p>
              {provider.headquarters && (
                <p className="text-xs text-fg-2 font-mono mt-2">
                  {provider.foundedYear && `est. ${provider.foundedYear} · `}{provider.headquarters}
                </p>
              )}
            </div>
          </div>
          <TrustScore score={provider.apivaultScore} size="xl" />
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={provider.website} external rightIcon={<ExternalLink size={14} />}>Get API Key</ButtonLink>
          <ButtonLink href={provider.docsUrl} external variant="ghost" rightIcon={<BookOpen size={14} />}>Read Docs</ButtonLink>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pb-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">// At a glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <GlanceCard label="Free Tier" value={provider.freeTierSummary} mono />
          <GlanceCard label="Category" value={provider.category} />
          <GlanceCard label="Credit Card" value={provider.requiresCreditCard ? "Required" : "Not required"} success={!provider.requiresCreditCard} />
          <GlanceCard label="Last Verified" value={timeAgo(provider.lastVerified)} />
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pb-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">// Free tier details</h2>
        <div className="bg-bg-1 border border-line rounded-lg p-6 space-y-4">
          {provider.freeTierDetails.models && (
            <div>
              <p className="text-xs font-mono text-fg-2 uppercase tracking-wider mb-2">Available Models</p>
              <div className="flex flex-wrap gap-2">
                {provider.freeTierDetails.models.split(",").map((model) => (
                  <span key={model.trim()} className="px-2.5 py-1 bg-bg-0 border border-line rounded text-sm font-mono text-fg-0">
                    {model.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {provider.freeTierDetails.monthlyRequests && (
              <div className="bg-bg-0 border border-line rounded-md p-3">
                <p className="text-[10px] font-mono text-fg-2 uppercase tracking-wider mb-1">Monthly Requests</p>
                <p className="text-sm text-fg-0 font-mono">{provider.freeTierDetails.monthlyRequests}</p>
              </div>
            )}
            {provider.freeTierDetails.monthlyTokens && (
              <div className="bg-bg-0 border border-line rounded-md p-3">
                <p className="text-[10px] font-mono text-fg-2 uppercase tracking-wider mb-1">Monthly Tokens</p>
                <p className="text-sm text-fg-0 font-mono">{provider.freeTierDetails.monthlyTokens}</p>
              </div>
            )}
            {provider.freeTierDetails.rateLimit && (
              <div className="bg-bg-0 border border-line rounded-md p-3">
                <p className="text-[10px] font-mono text-fg-2 uppercase tracking-wider mb-1">Rate Limit</p>
                <p className="text-sm text-fg-0 font-mono">{provider.freeTierDetails.rateLimit}</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <div className="flex items-center gap-2 text-sm">
              {provider.requiresCreditCard
                ? <X size={14} className="text-status-err" />
                : <Check size={14} className="text-accent" />}
              <span className="text-fg-1">{provider.requiresCreditCard ? "Credit card required" : "No credit card needed"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {provider.requiresPhone
                ? <X size={14} className="text-status-warn" />
                : <Check size={14} className="text-accent" />}
              <span className="text-fg-1">{provider.requiresPhone ? "Phone verification required" : "No phone verification"}</span>
            </div>
          </div>
        </div>
      </section>

      {provider.snippets.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-6 pb-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">// Quick start</h2>
          <CodeBlock snippets={provider.snippets} />
        </section>
      )}

      <section className="max-w-[1280px] mx-auto px-6 pb-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">// Overview</h2>
        <p className="text-fg-1 leading-relaxed text-lg max-w-3xl">{provider.description}</p>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pb-12 grid md:grid-cols-2 gap-4">
        <div className="bg-bg-1 border border-line rounded-lg p-6">
          <h3 className="font-mono text-sm text-accent uppercase tracking-wider mb-4">// Pros</h3>
          <ul className="space-y-2.5">
            {provider.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2.5 text-sm text-fg-0">
                <Check size={16} className="text-accent shrink-0 mt-0.5" /><span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-bg-1 border border-line rounded-lg p-6">
          <h3 className="font-mono text-sm text-status-err uppercase tracking-wider mb-4">// Cons</h3>
          <ul className="space-y-2.5">
            {provider.cons.map((con) => (
              <li key={con} className="flex items-start gap-2.5 text-sm text-fg-0">
                <X size={16} className="text-status-err shrink-0 mt-0.5" /><span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pb-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">// Score breakdown</h2>
        <div className="bg-bg-1 border border-line rounded-lg p-6 space-y-5">
          <ScoreBar label="Reliability (35%)" value={provider.reliabilityScore} weight={provider.lastVerified === "never" ? "manual baseline — run health-check to update" : `from ${timeAgo(provider.lastVerified)} health check`} />
          <ScoreBar label="Free Tier Generosity (30%)" value={provider.freeTierScore} weight="computed from quota, no-CC, no-phone fields" />
          <ScoreBar label="Documentation (20%)" value={provider.documentationScore} weight="human rating" />
          <ScoreBar label="Popularity (15%)" value={provider.popularityScore} weight="GitHub stars (log-normalised), or manual baseline" />
        </div>
        <p className="text-xs text-fg-3 font-mono mt-3">
          Methodology: <a href="/methodology" className="text-fg-2 underline underline-offset-2 hover:text-accent">apivault.dev/methodology</a>
        </p>
      </section>

      {provider.useCases.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-6 pb-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">// Best for</h2>
          <div className="flex flex-wrap gap-2">
            {provider.useCases.map((uc) => (
              <span key={uc} className="px-3 py-1.5 bg-bg-1 border border-line rounded-md text-sm text-fg-0 font-mono">{uc}</span>
            ))}
          </div>
        </section>
      )}

      {provider.changelog.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-6 pb-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">// Recent changes</h2>
          <div className="space-y-2">
            {provider.changelog.map((c, i) => (
              <div key={i} className="flex items-center gap-3 bg-bg-1 border border-line rounded-md p-3 flex-wrap">
                <span className="text-xs font-mono text-fg-2 w-24 shrink-0">{formatDate(c.date)}</span>
                <span className="text-sm text-fg-0 flex-1 min-w-0">{c.title}</span>
                <span className="text-[10px] font-mono text-accent uppercase shrink-0">{c.type.replace(/_/g, " ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
