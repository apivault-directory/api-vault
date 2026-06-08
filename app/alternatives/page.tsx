import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { alternatives } from "@/lib/alternatives";

export const metadata: Metadata = {
  title: "Alternatives",
  description: "Find free and cheaper alternatives to popular paid AI APIs. OpenAI, Claude, ElevenLabs, and more.",
  alternates: { canonical: "/alternatives" },
};

export default function AlternativesPage() {
  const published = alternatives.filter((a) => a.isPublished);
  return (
    <>
      <Nav />
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <SectionHeader title="// Alternatives" comment="find a free or cheaper option" />
        <div className="space-y-3">
          {published.map((a) => (
            <Link key={a.slug} href={`/alternatives/${a.slug}`} className="group flex items-center justify-between bg-bg-1 border border-line rounded-lg p-5 hover:border-line-2 hover:bg-bg-2 transition-colors">
              <div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">{a.competitorName} Alternatives</h3>
                <p className="text-sm text-fg-1">{a.metaDescription}</p>
              </div>
              <span className="text-fg-2 group-hover:text-accent transition-colors text-xl">→</span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
