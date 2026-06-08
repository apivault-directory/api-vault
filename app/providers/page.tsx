import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { ProvidersClient } from "@/components/providers-client";
import { providers } from "@/lib/providers";

export const metadata: Metadata = {
  title: "All Providers",
  description: "Browse verified AI APIs with real free tiers. Filter by category, credit card requirement, and trust score.",
  alternates: { canonical: "/providers" },
};

export default function ProvidersPage() {
  const sorted = [...providers].sort((a, b) => b.apivaultScore - a.apivaultScore);
  return (
    <>
      <Nav />
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <SectionHeader
          title="// All Providers"
          comment={`${providers.length} verified AI APIs · filter, search, sort`}
        />
        <Suspense fallback={<div className="text-fg-2 font-mono text-sm py-8">Loading providers…</div>}>
          <ProvidersClient providers={sorted} />
        </Suspense>
      </section>
      <Footer />
    </>
  );
}
