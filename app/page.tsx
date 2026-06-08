import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProviderRow } from "@/components/provider-row";
import { ButtonLink } from "@/components/button";
import { TerminalDemo } from "@/components/terminal-demo";
import { BentoGrid, BentoItem } from "@/components/bento-grid";
import { SectionHeader } from "@/components/section-header";
import { CategoryIcon } from "@/components/category-icon";
import { getAllProvidersWithMetrics } from "@/lib/metrics";
import type { Category } from "@/lib/types";
import Link from "next/link";

export default function Home() {
  const providers = getAllProvidersWithMetrics();
  const top = [...providers].sort((a, b) => b.apivaultScore - a.apivaultScore).slice(0, 8);
  const avg = Math.round(providers.reduce((a, p) => a + p.apivaultScore, 0) / providers.length);
  const noCardCount = providers.filter((p) => !p.requiresCreditCard).length;

  const allCategories: Category[] = ["LLM", "Image", "Speech", "Embeddings", "Search", "Video", "Code", "Vision"];
  const categoryStats = allCategories
    .map((label) => ({ label, count: providers.filter((p) => p.category === label).length }))
    .filter((c) => c.count >= 2); // hide categories with only 1 provider — feels incomplete

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="max-w-[1280px] mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-line-2 rounded-full text-xs font-mono text-fg-1 bg-bg-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#00FF88] animate-pulse-slow" />
          <span>{providers.length} APIs · curated &amp; ranked transparently</span>
        </div>

        <h1 className="font-display text-[clamp(40px,6vw,72px)] font-semibold leading-[1.05] tracking-[-0.04em] mb-5">
          Stop wasting hours
          <br />
          searching for{" "}
          <span className="text-accent relative inline-block">
            free APIs
            <span className="absolute left-0 right-0 bottom-1 h-2 bg-accent-glow -z-10" />
          </span>
          .
        </h1>

        <p className="text-lg text-fg-1 leading-relaxed max-w-[640px] mx-auto mb-8">
          Every API on APIVault is curated, ranked by a transparent trust score, and ships with copy-paste code.
          No broken links. No fake free tiers.
        </p>

        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          <ButtonLink href="/providers" rightIcon={<span>→</span>}>
            Explore {providers.length} APIs
          </ButtonLink>
          <ButtonLink href="/methodology" variant="ghost">How we rank</ButtonLink>
        </div>

        <div className="flex gap-8 sm:gap-10 justify-center pt-8 border-t border-line max-w-[720px] mx-auto flex-wrap">
          <Stat num={String(providers.length)} label="APIs tracked" />
          <Stat num={String(noCardCount)} label="No credit card" />
          <Stat num={String(avg)} suffix="/100" label="Avg. trust score" />
          <Stat num={String(categoryStats.length)} label="Categories" />
        </div>
      </section>

      <TerminalDemo />

      {/* ── FEATURES ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <SectionHeader title="// What makes it different" comment="not another list of links" />
        <BentoGrid>
          <BentoItem tag="// 01 curation" title="Every API is hand-checked." className="md:col-span-4">
            Each provider is manually reviewed: we sign up, test the free tier, and document what actually works — not what their marketing page claims.
          </BentoItem>
          <BentoItem tag="// 02 trust score" title="A 0–100 score, with the math shown." className="md:col-span-5">
            Reliability (35%) + documentation (20%) + free-tier generosity (30%) + popularity (15%). No black-box rankings.
            <div className="font-display text-5xl font-semibold text-accent tracking-[-0.04em] leading-none mt-3">
              {avg}<span className="text-fg-2 text-2xl">/100</span>
            </div>
          </BentoItem>
          <BentoItem tag="// 03 code" title="Copy. Paste. Ship." className="md:col-span-3">
            Python, JS, cURL on every provider page. No hunting for examples.
          </BentoItem>
          <BentoItem tag="// 04 comparison" title="Pick the right API in 30 seconds." className="md:col-span-7">
            Filter by category, credit card requirement, phone verification, rate limits, and model availability. Works instantly.
          </BentoItem>
          <BentoItem tag="// 05 changelog" title="The free-tier landscape changes. We track it." className="md:col-span-5">
            Historical record of pricing changes, deprecated endpoints, and new launches. Subscribe for alerts.
          </BentoItem>
        </BentoGrid>
      </section>

      {/* ── TOP APIS ── */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <SectionHeader
          title="// Top APIs by trust score"
          action={{ label: `view all ${providers.length}`, href: "/providers" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {top.map((p) => (<ProviderRow key={p.slug} provider={p} />))}
        </div>
        <div className="text-center">
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 px-5 h-10 rounded-md border border-line bg-bg-1 text-sm text-fg-1 hover:border-accent hover:text-accent transition-colors font-mono"
          >
            View all {providers.length} providers →
          </Link>
        </div>
      </section>

      {/* ── CATEGORY QUICK LINKS ── */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <SectionHeader title="// Browse by category" comment={`${categoryStats.length} categories`} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categoryStats.map((cat) => (
            <Link
              key={cat.label}
              href={`/providers?category=${cat.label}`}
              className="group flex items-center gap-3 p-4 bg-bg-1 border border-line rounded-lg hover:border-accent hover:bg-bg-2 transition-all"
            >
              <span className="text-accent shrink-0">
                <CategoryIcon category={cat.label as Category} size={22} />
              </span>
              <div>
                <div className="text-sm font-semibold group-hover:text-accent transition-colors">{cat.label}</div>
                <div className="text-xs text-fg-2 font-mono">
                  {cat.count} {cat.count === 1 ? "API" : "APIs"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

function Stat({ num, suffix, label }: { num: string; suffix?: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[28px] font-semibold tracking-tight">
        <span>{num}</span>
        {suffix && <span className="text-accent">{suffix}</span>}
      </div>
      <div className="text-xs text-fg-2 uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}
