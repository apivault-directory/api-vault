import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, ExternalLink, ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProviderLogo } from "@/components/provider-logo";
import { TrustScore } from "@/components/trust-score";
import { StatusDot } from "@/components/status-dot";
import { ButtonLink } from "@/components/button";
import { getProviderWithMetrics } from "@/lib/metrics";
import { comparisons, comparisonSlug } from "@/lib/comparisons";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Provider } from "@/lib/types";

export function generateStaticParams() {
  // generate both orderings so a-vs-b and b-vs-a both resolve
  return comparisons.flatMap(({ a, b }) => [
    { slug: comparisonSlug(a, b) },
    { slug: comparisonSlug(b, a) },
  ]);
}

function parseSlug(slug: string): [string, string] | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return [parts[0], parts[1]];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const a = getProviderWithMetrics(parsed[0]);
  const b = getProviderWithMetrics(parsed[1]);
  if (!a || !b) return {};
  return {
    title: `${a.name} vs ${b.name} — Free Tier & Trust Score Compared`,
    description: `${a.name} vs ${b.name}: compare free tiers, trust scores, models, rate limits, and credit card requirements. Both verified on APIVault.`,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title: `${a.name} vs ${b.name} — which free AI API is better?`,
      description: `Side-by-side comparison of ${a.name} (${a.apivaultScore}/100) and ${b.name} (${b.apivaultScore}/100).`,
      type: "article",
    },
  };
}

function Cell({ children, win }: { children: React.ReactNode; win?: boolean }) {
  return (
    <div className={`p-4 ${win ? "bg-[rgba(0,255,136,0.05)]" : ""}`}>
      <div className={`text-sm ${win ? "text-accent font-medium" : "text-fg-0"}`}>{children}</div>
    </div>
  );
}

function Row({ label, a, b, aWin, bWin }: { label: string; a: React.ReactNode; b: React.ReactNode; aWin?: boolean; bWin?: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[200px_1fr_1fr] border-b border-line last:border-0">
      <div className="hidden md:flex items-center p-4 text-xs font-mono text-fg-2 uppercase tracking-wider">{label}</div>
      <div className="col-span-2 md:hidden px-4 pt-3 text-[10px] font-mono text-fg-2 uppercase tracking-wider">{label}</div>
      <Cell win={aWin}>{a}</Cell>
      <Cell win={bWin}>{b}</Cell>
    </div>
  );
}

function Bool({ value, goodWhenFalse = true }: { value: boolean; goodWhenFalse?: boolean }) {
  const good = goodWhenFalse ? !value : value;
  return (
    <span className="inline-flex items-center gap-1.5">
      {good ? <Check size={14} className="text-accent" /> : <X size={14} className="text-status-err" />}
      <span>{value ? "Required" : "Not required"}</span>
    </span>
  );
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const a = getProviderWithMetrics(parsed[0]);
  const b = getProviderWithMetrics(parsed[1]);
  if (!a || !b) notFound();

  const winner: Provider | null =
    a.apivaultScore === b.apivaultScore ? null : a.apivaultScore > b.apivaultScore ? a : b;

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: "Home", url: "/" }, { name: "Compare", url: "/compare" }, { name: `${a.name} vs ${b.name}`, url: `/compare/${slug}` },
      ])) }} />

      {/* Hero */}
      <section className="max-w-[1000px] mx-auto px-6 pt-14 pb-8">
        <div className="text-xs font-mono text-fg-2 mb-4">// Comparison</div>
        <h1 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.04em] leading-tight mb-3">
          {a.name} <span className="text-fg-2">vs</span> {b.name}
        </h1>
        <p className="text-fg-1 text-lg max-w-[640px] leading-relaxed">
          Both are free AI APIs verified on APIVault. Here&apos;s how their free tiers, trust scores,
          and requirements stack up side by side.
        </p>
      </section>

      {/* Provider cards */}
      <section className="max-w-[1000px] mx-auto px-6 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {[a, b].map((p) => (
            <div key={p.slug} className="bg-bg-1 border border-line rounded-xl p-5 flex flex-col items-center text-center">
              <ProviderLogo domain={p.domain} text={p.logoText} size="lg" />
              <h2 className="font-display text-lg font-semibold mt-3 mb-1 flex items-center gap-2">
                <StatusDot status={p.status} /> {p.name}
              </h2>
              <div className="my-2"><TrustScore score={p.apivaultScore} size="lg" /></div>
              <Link href={`/providers/${p.slug}`} className="text-xs font-mono text-fg-2 hover:text-accent transition-colors">
                view full profile →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Verdict */}
      {winner && (
        <section className="max-w-[1000px] mx-auto px-6 pb-8">
          <div className="bg-[rgba(0,255,136,0.06)] border border-[rgba(0,255,136,0.2)] rounded-xl p-5 text-center">
            <p className="text-sm text-fg-1">
              By APIVault trust score, <span className="text-accent font-semibold">{winner.name}</span> edges ahead
              ({winner.apivaultScore}/100 vs {(winner.slug === a.slug ? b : a).apivaultScore}/100) — but the right pick
              depends on what you&apos;re building. See the breakdown below.
            </p>
          </div>
        </section>
      )}

      {/* Comparison table */}
      <section className="max-w-[1000px] mx-auto px-6 pb-10">
        <div className="bg-bg-1 border border-line rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[200px_1fr_1fr] bg-bg-2 border-b border-line">
            <div className="hidden md:block p-4" />
            <div className="p-4 font-display font-semibold text-center md:text-left">{a.name}</div>
            <div className="p-4 font-display font-semibold text-center md:text-left">{b.name}</div>
          </div>

          <Row label="Trust Score" a={`${a.apivaultScore}/100`} b={`${b.apivaultScore}/100`}
            aWin={a.apivaultScore > b.apivaultScore} bWin={b.apivaultScore > a.apivaultScore} />
          <Row label="Reliability" a={`${a.reliabilityScore}/100`} b={`${b.reliabilityScore}/100`}
            aWin={a.reliabilityScore > b.reliabilityScore} bWin={b.reliabilityScore > a.reliabilityScore} />
          <Row label="Free Tier" a={`${a.freeTierScore}/100`} b={`${b.freeTierScore}/100`}
            aWin={a.freeTierScore > b.freeTierScore} bWin={b.freeTierScore > a.freeTierScore} />
          <Row label="Documentation" a={`${a.documentationScore}/100`} b={`${b.documentationScore}/100`}
            aWin={a.documentationScore > b.documentationScore} bWin={b.documentationScore > a.documentationScore} />
          <Row label="Popularity" a={`${a.popularityScore}/100`} b={`${b.popularityScore}/100`}
            aWin={a.popularityScore > b.popularityScore} bWin={b.popularityScore > a.popularityScore} />
          <Row label="Category" a={a.category} b={b.category} />
          <Row label="Free tier" a={a.freeTierSummary} b={b.freeTierSummary} />
          <Row label="Credit card" a={<Bool value={a.requiresCreditCard} />} b={<Bool value={b.requiresCreditCard} />}
            aWin={!a.requiresCreditCard && b.requiresCreditCard} bWin={!b.requiresCreditCard && a.requiresCreditCard} />
          <Row label="Phone" a={<Bool value={a.requiresPhone} />} b={<Bool value={b.requiresPhone} />}
            aWin={!a.requiresPhone && b.requiresPhone} bWin={!b.requiresPhone && a.requiresPhone} />
          <Row label="Models"
            a={a.freeTierDetails.models ?? "—"}
            b={b.freeTierDetails.models ?? "—"} />
        </div>
      </section>

      {/* Pros/cons */}
      <section className="max-w-[1000px] mx-auto px-6 pb-10 grid md:grid-cols-2 gap-4">
        {[a, b].map((p) => (
          <div key={p.slug} className="bg-bg-1 border border-line rounded-xl p-5">
            <h3 className="font-display font-semibold mb-3">{p.name}</h3>
            <ul className="space-y-2 mb-4">
              {p.pros.slice(0, 3).map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-fg-0">
                  <Check size={15} className="text-accent shrink-0 mt-0.5" /> {pro}
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {p.cons.slice(0, 2).map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-fg-1">
                  <X size={15} className="text-status-err shrink-0 mt-0.5" /> {con}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* CTAs */}
      <section className="max-w-[1000px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ButtonLink href={a.website} external rightIcon={<ExternalLink size={14} />} className="w-full">Get {a.name} key</ButtonLink>
          <ButtonLink href={b.website} external variant="ghost" rightIcon={<ExternalLink size={14} />} className="w-full">Get {b.name} key</ButtonLink>
        </div>
        <div className="text-center mt-8">
          <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-mono text-fg-2 hover:text-accent transition-colors">
            See all comparisons <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
