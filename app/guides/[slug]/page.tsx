import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { guides } from "@/lib/guides";
import { getProvidersBySlugs } from "@/lib/providers";
import { formatDate } from "@/lib/utils";
import { breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return guides.filter((g) => g.isPublished).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title, description: guide.metaDescription,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: { title: guide.title, description: guide.metaDescription, type: "article", publishedTime: guide.publishedAt },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide || !guide.isPublished) notFound();
  const related = getProvidersBySlugs(guide.relatedProviderSlugs);
  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: "Home", url: "/" }, { name: "Guides", url: "/guides" }, { name: guide.title, url: `/guides/${guide.slug}` },
      ])) }} />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-xs font-mono text-fg-2 mb-4">
          <span>{formatDate(guide.publishedAt)}</span><span>·</span><span>{guide.readingTime} min read</span>
        </div>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] mb-4">{guide.title}</h1>
        <p className="text-fg-1 text-lg mb-10">{guide.excerpt}</p>
        <div className="prose" dangerouslySetInnerHTML={{ __html: guide.content }} />
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-line">
            <h2 className="font-display text-2xl font-semibold tracking-tight mb-6">// APIs mentioned</h2>
            <div className="space-y-2">
              {related.map((p) => (
                <a key={p.slug} href={`/providers/${p.slug}`} className="flex items-center justify-between bg-bg-1 border border-line rounded-md p-3 hover:border-line-2 hover:bg-bg-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold w-8 text-center">{p.logoText}</span>
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                  <span className="font-mono text-sm text-accent">{p.apivaultScore}/100</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </>
  );
}
