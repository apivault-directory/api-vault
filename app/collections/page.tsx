import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { collections } from "@/lib/collections";
import { getProvidersBySlugs } from "@/lib/providers";

export const metadata: Metadata = {
  title: "Collections",
  description: "Curated lists of AI APIs for specific use cases — hackathons, OpenAI alternatives, no credit card, and more.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  const published = collections.filter((c) => c.isPublished);
  return (
    <>
      <Nav />
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <SectionHeader title="// Collections" comment="curated lists for specific use cases" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {published.map((c) => {
            const items = getProvidersBySlugs(c.providerSlugs);
            return (
              <Link key={c.slug} href={`/collections/${c.slug}`} className="group block bg-bg-1 border border-line rounded-lg p-6 transition-all hover:border-line-2 hover:bg-bg-2 hover:-translate-y-0.5">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{c.title}</h3>
                <p className="text-sm text-fg-1 mb-4">{c.description}</p>
                <div className="text-xs font-mono text-fg-2">{items.length} APIs →</div>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
