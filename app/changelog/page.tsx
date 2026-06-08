import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { changelog } from "@/lib/changelog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What changed in APIVault. New features, providers, and fixes.",
  alternates: { canonical: "/changelog" },
};

export default function ChangelogPage() {
  return (
    <>
      <Nav />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-3">// Changelog</h1>
        <p className="text-fg-1 text-lg mb-10">What changed in APIVault.</p>
        <div className="space-y-8">
          {changelog.map((entry) => (
            <div key={entry.date} className="border-l-2 border-line pl-6 relative">
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-accent" />
              <div className="font-mono text-xs text-fg-2 mb-2">{formatDate(entry.date)}</div>
              <h2 className="font-display text-lg font-semibold mb-1">{entry.title}</h2>
              <p className="text-sm text-fg-1">{entry.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
