import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitCompare } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProviderLogo } from "@/components/provider-logo";
import { comparisons, comparisonSlug } from "@/lib/comparisons";
import { getProviderBySlug } from "@/lib/providers";
import type { Provider } from "@/lib/types";

export const metadata: Metadata = {
  title: "Compare Free AI APIs",
  description: "Side-by-side comparisons of free AI APIs — trust scores, free tiers, models, and credit card requirements. Groq vs OpenRouter, DeepSeek vs Mistral, and more.",
  alternates: { canonical: "/compare" },
};

export default function CompareIndexPage() {
  const pairs: { a: Provider; b: Provider }[] = [];
  for (const { a, b } of comparisons) {
    const pa = getProviderBySlug(a);
    const pb = getProviderBySlug(b);
    if (pa && pb) pairs.push({ a: pa, b: pb });
  }

  return (
    <>
      <Nav />

      <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-fg-2 mb-6">
          <GitCompare size={13} className="text-accent" />
          <span>{pairs.length} head-to-head comparisons</span>
        </div>
        <h1 className="font-display text-[clamp(36px,5vw,60px)] font-semibold tracking-[-0.04em] leading-[1.05] mb-4">
          Compare free AI APIs<br />
          <span className="text-accent">side by side.</span>
        </h1>
        <p className="text-lg text-fg-1 max-w-[600px] leading-relaxed">
          Trust scores, free tiers, models, and requirements — compared head to head so you can
          pick the right API in 30 seconds.
        </p>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pairs.map(({ a, b }) => (
            <Link
              key={`${a.slug}-${b.slug}`}
              href={`/compare/${comparisonSlug(a.slug, b.slug)}`}
              className="group bg-bg-1 border border-line rounded-xl p-5 hover:border-[rgba(0,255,136,0.3)] hover:bg-bg-2 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex flex-col items-center gap-2">
                  <ProviderLogo domain={a.domain} text={a.logoText} size="md" />
                  <span className="text-xs font-mono text-fg-1">{a.name}</span>
                </div>
                <span className="font-mono text-sm text-fg-2">vs</span>
                <div className="flex flex-col items-center gap-2">
                  <ProviderLogo domain={b.domain} text={b.logoText} size="md" />
                  <span className="text-xs font-mono text-fg-1">{b.name}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-fg-2 group-hover:text-accent transition-colors pt-3 border-t border-line">
                Compare <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
