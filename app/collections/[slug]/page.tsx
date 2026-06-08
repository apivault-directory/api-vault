import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProviderCard } from "@/components/provider-card";
import { collections } from "@/lib/collections";
import { getProvidersBySlugs } from "@/lib/providers";
import { ArrowLeft, Layers } from "lucide-react";

export function generateStaticParams() {
  return collections.filter((c) => c.isPublished).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${slug}` },
    openGraph: {
      title: `${collection.title} — APIVault`,
      description: collection.description,
      type: "article",
    },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection || !collection.isPublished) notFound();

  const items = getProvidersBySlugs(collection.providerSlugs);
  const noCardCount = items.filter((p) => !p.requiresCreditCard).length;
  const avgScore = items.length
    ? Math.round(items.reduce((a, p) => a + p.apivaultScore, 0) / items.length)
    : 0;

  return (
    <>
      <Nav />

      {/* ── HEADER ── */}
      <section className="max-w-[1280px] mx-auto px-6 pt-10 pb-12">
        {/* breadcrumb */}
        <Link
          href="/collections"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-fg-2 hover:text-fg-0 transition-colors mb-8"
        >
          <ArrowLeft size={12} /> Collections
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* left */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{collection.icon}</span>
              <span className="text-xs font-mono text-fg-2 px-2.5 py-1 bg-bg-1 border border-line rounded-full">
                {collection.subtitle}
              </span>
            </div>
            <h1 className="font-display text-[clamp(28px,4vw,48px)] font-semibold tracking-[-0.03em] leading-tight mb-4">
              {collection.title}
            </h1>
            <p className="text-fg-1 text-base md:text-lg leading-relaxed max-w-[600px]">
              {collection.description}
            </p>
          </div>

          {/* stats */}
          <div className="flex gap-6 md:gap-8 shrink-0">
            <Stat num={String(items.length)} label="APIs" />
            <Stat num={String(noCardCount)} label="No card" />
            <Stat num={String(avgScore)} suffix="/100" label="Avg score" accent />
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="border-t border-line mb-10" />
      </div>

      {/* ── GRID ── */}
      <section className="max-w-[1280px] mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-mono text-fg-2 flex items-center gap-1.5">
            <Layers size={12} className="text-accent" />
            {items.length} {items.length === 1 ? "provider" : "providers"} in this collection
          </p>
          <Link
            href="/providers"
            className="text-xs font-mono text-fg-2 hover:text-accent transition-colors"
          >
            Browse all APIs →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <ProviderCard key={p.slug} provider={p} />
          ))}
        </div>
      </section>

      {/* ── MORE COLLECTIONS ── */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="border-t border-line pt-10 mb-6">
          <p className="text-xs font-mono text-fg-2 uppercase tracking-wider mb-4">More collections</p>
          <div className="flex flex-wrap gap-2">
            {collections
              .filter((c) => c.isPublished && c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-1 border border-line rounded-full text-sm text-fg-1 hover:border-accent hover:text-accent transition-colors"
                >
                  <span>{c.icon}</span>
                  {c.title}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Stat({
  num, suffix, label, accent,
}: { num: string; suffix?: string; label: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className={`font-display text-3xl font-bold leading-none ${accent ? "text-accent" : "text-fg-0"}`}>
        {num}{suffix && <span className="text-fg-2 text-lg">{suffix}</span>}
      </div>
      <div className="text-[10px] font-mono text-fg-2 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}
