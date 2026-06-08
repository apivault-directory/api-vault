import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { guides } from "@/lib/guides";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Guides",
  description: "In-depth comparisons and recommendations for choosing the right AI API.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const published = guides.filter((g) => g.isPublished).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return (
    <>
      <Nav />
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <SectionHeader title="// Guides" comment="in-depth comparisons & recommendations" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {published.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group block bg-bg-1 border border-line rounded-lg p-6 hover:border-line-2 hover:bg-bg-2 transition-all">
              <div className="flex items-center gap-2 text-xs font-mono text-fg-2 mb-3">
                <span>{formatDate(g.publishedAt)}</span><span>·</span><span>{g.readingTime} min read</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{g.title}</h3>
              <p className="text-sm text-fg-1 line-clamp-2">{g.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
