import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProviderCard } from "@/components/provider-card";
import { alternatives } from "@/lib/alternatives";
import { getProvidersBySlugs } from "@/lib/providers";

export function generateStaticParams() {
  return alternatives.filter((a) => a.isPublished).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const alt = alternatives.find((a) => a.slug === slug);
  if (!alt) return {};
  return { title: `${alt.competitorName} Alternatives`, description: alt.metaDescription, alternates: { canonical: `/alternatives/${slug}` } };
}

export default async function AlternativePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const alt = alternatives.find((a) => a.slug === slug);
  if (!alt || !alt.isPublished) notFound();
  const items = getProvidersBySlugs(alt.providerSlugs);
  return (
    <>
      <Nav />
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="font-mono text-xs text-fg-2 mb-3">// alternatives to</div>
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-3">{alt.competitorName} Alternatives</h1>
        <p className="text-fg-1 text-lg max-w-2xl mb-10">{alt.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (<ProviderCard key={p.slug} provider={p} />))}
        </div>
      </section>
      <Footer />
    </>
  );
}
