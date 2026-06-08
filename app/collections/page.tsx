import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { collections } from "@/lib/collections";
import { getProvidersBySlugs } from "@/lib/providers";
import { ArrowRight, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Collections",
  description: "Curated lists of AI APIs for specific use cases — hackathons, OpenAI alternatives, no credit card, and more.",
  alternates: { canonical: "/collections" },
};

const ACCENT_COLORS: Record<string, { border: string; glow: string; tag: string }> = {
  "best-for-hackathons":   { border: "border-[rgba(0,255,136,0.3)]",  glow: "shadow-[0_0_40px_rgba(0,255,136,0.08)]",  tag: "bg-[rgba(0,255,136,0.1)] text-accent" },
  "openai-alternatives":   { border: "border-[rgba(99,179,237,0.3)]",  glow: "shadow-[0_0_40px_rgba(99,179,237,0.08)]", tag: "bg-[rgba(99,179,237,0.1)] text-blue-300" },
  "no-credit-card":        { border: "border-[rgba(154,230,180,0.3)]", glow: "shadow-[0_0_40px_rgba(154,230,180,0.08)]",tag: "bg-[rgba(154,230,180,0.1)] text-green-300" },
  "best-image-apis":       { border: "border-[rgba(246,173,85,0.3)]",  glow: "shadow-[0_0_40px_rgba(246,173,85,0.08)]", tag: "bg-[rgba(246,173,85,0.1)] text-orange-300" },
  "speech-stack":          { border: "border-[rgba(183,148,244,0.3)]", glow: "shadow-[0_0_40px_rgba(183,148,244,0.08)]",tag: "bg-[rgba(183,148,244,0.1)] text-purple-300" },
  "hidden-gems":           { border: "border-[rgba(99,179,237,0.3)]",  glow: "shadow-[0_0_40px_rgba(99,179,237,0.08)]", tag: "bg-[rgba(99,179,237,0.1)] text-blue-300" },
  "video-generation":      { border: "border-[rgba(252,129,74,0.3)]",  glow: "shadow-[0_0_40px_rgba(252,129,74,0.08)]", tag: "bg-[rgba(252,129,74,0.1)] text-orange-400" },
  "chinese-ai-apis":       { border: "border-[rgba(252,68,53,0.3)]",   glow: "shadow-[0_0_40px_rgba(252,68,53,0.08)]",  tag: "bg-[rgba(252,68,53,0.1)] text-red-400" },
  "rag-stack":             { border: "border-[rgba(0,255,136,0.3)]",   glow: "shadow-[0_0_40px_rgba(0,255,136,0.08)]",  tag: "bg-[rgba(0,255,136,0.1)] text-accent" },
  "agent-platforms":       { border: "border-[rgba(183,148,244,0.3)]", glow: "shadow-[0_0_40px_rgba(183,148,244,0.08)]",tag: "bg-[rgba(183,148,244,0.1)] text-purple-300" },
};

function ProviderDots({ slugs }: { slugs: string[] }) {
  const providers = getProvidersBySlugs(slugs.slice(0, 6));
  return (
    <div className="flex items-center -space-x-2">
      {providers.map((p) => (
        <div
          key={p.slug}
          title={p.name}
          className="w-7 h-7 rounded-full bg-bg-2 border border-line flex items-center justify-center text-[10px] font-mono font-bold text-fg-1 shrink-0"
        >
          {p.logoText.slice(0, 2)}
        </div>
      ))}
      {slugs.length > 6 && (
        <div className="w-7 h-7 rounded-full bg-bg-2 border border-line flex items-center justify-center text-[9px] font-mono text-fg-2 shrink-0">
          +{slugs.length - 6}
        </div>
      )}
    </div>
  );
}

export default function CollectionsPage() {
  const published = collections.filter((c) => c.isPublished);
  const totalApis  = published.reduce((acc, c) => acc + c.providerSlugs.length, 0);
  const [featured, ...rest] = published;
  const featuredItems = getProvidersBySlugs(featured.providerSlugs);
  const ac = ACCENT_COLORS[featured.slug] ?? ACCENT_COLORS["best-for-hackathons"];

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-fg-2 mb-6">
          <Layers size={13} className="text-accent" />
          <span>{published.length} collections · {totalApis}+ curated API picks</span>
        </div>
        <h1 className="font-display text-[clamp(36px,5vw,60px)] font-semibold tracking-[-0.04em] leading-[1.05] mb-4">
          Curated API collections<br />
          <span className="text-accent">for every use case.</span>
        </h1>
        <p className="text-lg text-fg-1 max-w-[600px] leading-relaxed">
          Hand-picked lists of free AI APIs grouped by what you&apos;re building —
          from hackathon starters to production RAG pipelines.
        </p>
      </section>

      {/* ── FEATURED ── */}
      <section className="max-w-[1280px] mx-auto px-6 pb-8">
        <Link
          href={`/collections/${featured.slug}`}
          className={`group block rounded-xl border ${ac.border} bg-bg-1 p-8 transition-all duration-300 hover:bg-bg-2 hover:-translate-y-0.5 ${ac.glow} relative overflow-hidden`}
        >
          {/* bg shimmer */}
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,136,0.05),transparent_60%)] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full ${ac.tag}`}>
                  Featured collection
                </span>
                <span className="text-fg-2 text-sm font-mono">{featured.subtitle}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{featured.icon}</span>
                <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                  {featured.title}
                </h2>
              </div>
              <p className="text-fg-1 text-base max-w-[560px] leading-relaxed mb-6">
                {featured.description}
              </p>
              <div className="flex items-center gap-4">
                <ProviderDots slugs={featured.providerSlugs} />
                <span className="text-sm font-mono text-fg-2">{featuredItems.length} APIs</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0">
              <div className="font-display text-6xl font-bold text-accent opacity-20 leading-none select-none">
                {featuredItems.length}
              </div>
              <div className="inline-flex items-center gap-2 px-5 h-10 rounded-md bg-accent text-bg-0 text-sm font-medium group-hover:bg-accent-dim transition-colors">
                View collection <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* ── GRID ── */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((c) => {
            const items = getProvidersBySlugs(c.providerSlugs);
            const colors = ACCENT_COLORS[c.slug] ?? ACCENT_COLORS["rag-stack"];
            return (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group relative flex flex-col bg-bg-1 border border-line rounded-xl p-6 transition-all duration-200 hover:border-[rgba(0,255,136,0.2)] hover:bg-bg-2 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] overflow-hidden"
              >
                <span className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(0,255,136,0.04),transparent_70%)] pointer-events-none" />

                {/* icon + subtitle */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{c.icon}</div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${colors.tag}`}>
                    {c.subtitle}
                  </span>
                </div>

                {/* title */}
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {c.title}
                </h3>

                {/* description */}
                <p className="text-sm text-fg-1 leading-relaxed flex-1 mb-5 line-clamp-3">
                  {c.description}
                </p>

                {/* footer */}
                <div className="flex items-center justify-between pt-4 border-t border-line">
                  <ProviderDots slugs={c.providerSlugs} />
                  <span className="text-xs font-mono text-fg-2 group-hover:text-accent transition-colors flex items-center gap-1">
                    {items.length} APIs <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
