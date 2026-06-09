import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap, RefreshCw, CreditCard, ImageIcon, Mic, Gem,
  Clapperboard, Globe, Search, Bot, Layers, ArrowRight,
  type LucideProps,
} from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProviderLogo } from "@/components/provider-logo";
import { collections } from "@/lib/collections";
import { getProvidersBySlugs } from "@/lib/providers";

export const metadata: Metadata = {
  title: "Collections",
  description: "Curated lists of AI APIs for specific use cases — hackathons, OpenAI alternatives, no credit card, and more.",
  alternates: { canonical: "/collections" },
};

// ── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType<LucideProps>> = {
  Zap, RefreshCw, CreditCard, ImageIcon, Mic, Gem,
  Clapperboard, Globe, Search, Bot,
};

function CollectionIcon({ name, size = 22, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

// ── Accent colours per collection ────────────────────────────────────────────
const ACCENT: Record<string, { border: string; tag: string; iconBg: string; iconColor: string }> = {
  "best-for-hackathons":  { border: "border-[rgba(0,255,136,0.3)]",  tag: "bg-[rgba(0,255,136,0.12)] text-accent",       iconBg: "bg-[rgba(0,255,136,0.1)]",  iconColor: "text-accent" },
  "openai-alternatives":  { border: "border-[rgba(99,179,237,0.3)]",  tag: "bg-[rgba(99,179,237,0.12)] text-blue-300",    iconBg: "bg-[rgba(99,179,237,0.1)]",  iconColor: "text-blue-300" },
  "no-credit-card":       { border: "border-[rgba(154,230,180,0.3)]", tag: "bg-[rgba(154,230,180,0.12)] text-green-300",  iconBg: "bg-[rgba(154,230,180,0.1)]", iconColor: "text-green-300" },
  "best-image-apis":      { border: "border-[rgba(246,173,85,0.3)]",  tag: "bg-[rgba(246,173,85,0.12)] text-orange-300",  iconBg: "bg-[rgba(246,173,85,0.1)]",  iconColor: "text-orange-300" },
  "speech-stack":         { border: "border-[rgba(183,148,244,0.3)]", tag: "bg-[rgba(183,148,244,0.12)] text-purple-300", iconBg: "bg-[rgba(183,148,244,0.1)]", iconColor: "text-purple-300" },
  "hidden-gems":          { border: "border-[rgba(99,179,237,0.3)]",  tag: "bg-[rgba(99,179,237,0.12)] text-blue-300",    iconBg: "bg-[rgba(99,179,237,0.1)]",  iconColor: "text-blue-300" },
  "video-generation":     { border: "border-[rgba(252,129,74,0.3)]",  tag: "bg-[rgba(252,129,74,0.12)] text-orange-400",  iconBg: "bg-[rgba(252,129,74,0.1)]",  iconColor: "text-orange-400" },
  "chinese-ai-apis":      { border: "border-[rgba(252,68,53,0.3)]",   tag: "bg-[rgba(252,68,53,0.12)] text-red-400",      iconBg: "bg-[rgba(252,68,53,0.1)]",   iconColor: "text-red-400" },
  "rag-stack":            { border: "border-[rgba(0,255,136,0.3)]",   tag: "bg-[rgba(0,255,136,0.12)] text-accent",       iconBg: "bg-[rgba(0,255,136,0.1)]",   iconColor: "text-accent" },
  "agent-platforms":      { border: "border-[rgba(183,148,244,0.3)]", tag: "bg-[rgba(183,148,244,0.12)] text-purple-300", iconBg: "bg-[rgba(183,148,244,0.1)]", iconColor: "text-purple-300" },
};

const DEFAULT_ACCENT = ACCENT["best-for-hackathons"];

// ── Provider logo row ─────────────────────────────────────────────────────────
function ProviderAvatars({ slugs }: { slugs: string[] }) {
  const providers = getProvidersBySlugs(slugs.slice(0, 5));
  const extra = slugs.length - 5;
  return (
    <div className="flex items-center -space-x-2">
      {providers.map((p) => (
        <div key={p.slug} className="ring-2 ring-bg-1 rounded-full shrink-0">
          <ProviderLogo domain={p.domain} text={p.logoText} size="sm" />
        </div>
      ))}
      {extra > 0 && (
        <div className="w-9 h-9 rounded-full ring-2 ring-bg-1 bg-bg-2 border border-line flex items-center justify-center text-[10px] font-mono text-fg-2 shrink-0">
          +{extra}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CollectionsPage() {
  const published = collections.filter((c) => c.isPublished);
  const totalApis = published.reduce((acc, c) => acc + c.providerSlugs.length, 0);
  const [featured, ...rest] = published;
  const featuredItems = getProvidersBySlugs(featured.providerSlugs);
  const fac = ACCENT[featured.slug] ?? DEFAULT_ACCENT;

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
          className={`group block rounded-xl border ${fac.border} bg-bg-1 p-5 md:p-8 transition-all duration-300 hover:bg-bg-2 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] relative overflow-hidden`}
        >
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,136,0.05),transparent_60%)] pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
            <div className="flex-1 min-w-0">
              {/* tags row */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${fac.tag}`}>Featured</span>
                <span className="text-fg-2 text-xs font-mono">{featured.subtitle}</span>
              </div>
              {/* icon + title */}
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl ${fac.iconBg} flex items-center justify-center shrink-0`}>
                  <CollectionIcon name={featured.icon} size={20} className={fac.iconColor} />
                </div>
                <h2 className="font-display text-xl md:text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                  {featured.title}
                </h2>
              </div>
              {/* description */}
              <p className="text-fg-1 text-sm md:text-base max-w-[560px] leading-relaxed mb-4 ml-[52px]">
                {featured.description}
              </p>
              {/* avatars + count + button (mobile: inline) */}
              <div className="flex items-center justify-between ml-[52px]">
                <div className="flex items-center gap-3">
                  <ProviderAvatars slugs={featured.providerSlugs} />
                  <span className="text-sm font-mono text-fg-2">{featuredItems.length} APIs</span>
                </div>
                {/* button shown inline on mobile */}
                <div className="md:hidden inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-accent text-bg-0 text-xs font-medium">
                  View <ArrowRight size={12} />
                </div>
              </div>
            </div>
            {/* right side — hidden on mobile */}
            <div className="hidden md:flex flex-col items-end gap-4 shrink-0">
              <div className="font-display text-7xl font-bold text-accent opacity-10 leading-none select-none">
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
            const ac = ACCENT[c.slug] ?? DEFAULT_ACCENT;
            return (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group relative flex flex-col bg-bg-1 border border-line rounded-xl p-6 transition-all duration-200 hover:border-[rgba(0,255,136,0.2)] hover:bg-bg-2 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] overflow-hidden"
              >
                <span className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,rgba(0,255,136,0.03),transparent_70%)] pointer-events-none" />

                {/* icon + subtitle */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl ${ac.iconBg} flex items-center justify-center`}>
                    <CollectionIcon name={c.icon} size={20} className={ac.iconColor} />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${ac.tag}`}>
                    {c.subtitle}
                  </span>
                </div>

                {/* title + desc */}
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-fg-1 leading-relaxed flex-1 mb-5 line-clamp-3">
                  {c.description}
                </p>

                {/* footer: logos + count */}
                <div className="flex items-center justify-between pt-4 border-t border-line">
                  <ProviderAvatars slugs={c.providerSlugs} />
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
