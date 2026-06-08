import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProviderCard } from "@/components/provider-card";
import { collections } from "@/lib/collections";
import { getProvidersBySlugs } from "@/lib/providers";

export function generateStaticParams() {
  return collections.filter((c) => c.isPublished).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return { title: collection.title, description: collection.description, alternates: { canonical: `/collections/${slug}` } };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection || !collection.isPublished) notFound();
  const items = getProvidersBySlugs(collection.providerSlugs);
  return (
    <>
      <Nav />
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="text-3xl mb-3">{collection.icon}</div>
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-3">{collection.title}</h1>
        <p className="text-fg-1 text-lg max-w-2xl mb-10">{collection.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (<ProviderCard key={p.slug} provider={p} />))}
        </div>
      </section>
      <Footer />
    </>
  );
}
