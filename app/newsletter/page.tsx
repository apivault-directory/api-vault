import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Weekly digest of free AI API changes. New providers, free tier changes, deprecations.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <>
      <Nav />
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-3">// Newsletter</h1>
        <p className="text-fg-1 text-lg mb-8">Weekly digest. New providers, free tier changes, deprecations, and notable launches.</p>
        <div className="bg-bg-1 border border-line rounded-lg p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">What you get:</h2>
          <ul className="space-y-2 text-sm text-fg-1">
            <li>✓ 1 email per week, every Tuesday</li>
            <li>✓ New AI APIs that launched</li>
            <li>✓ Free tier changes (added, expanded, removed)</li>
            <li>✓ Notable updates from existing providers</li>
            <li>✓ No spam, no promotions</li>
          </ul>
        </div>
        <NewsletterForm />
        <p className="text-xs text-fg-2 mt-4">By subscribing, you agree to receive a weekly email. Unsubscribe anytime.</p>
      </section>
      <Footer />
    </>
  );
}
