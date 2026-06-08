import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Submit an API",
  description: "Know a free AI API we should track? Submit it for review.",
  alternates: { canonical: "/submit" },
};

export default function SubmitPage() {
  return (
    <>
      <Nav />
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-3">// Submit an API</h1>
        <p className="text-fg-1 text-lg mb-2">
          Know a free AI API we should track? Tell us. We review submissions weekly.
        </p>
        <p className="text-sm text-fg-2 font-mono mb-8">
          → Submissions are reviewed within 7 days. We verify every API manually before adding it.
        </p>
        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="space-y-5"
        >
          <Field label="API Name" name="api_name" placeholder="e.g. Groq" required />
          <Field label="Website URL" name="website_url" placeholder="https://" type="url" required />
          <Field
            label="Category"
            name="category"
            placeholder="LLM, Image, Speech, Embeddings, Search, Video…"
            required
          />
          <Field
            label="Free tier details"
            name="free_tier"
            placeholder="What does the free tier include? Rate limits, models, quota, credit card required?"
            required
            textarea
          />
          <Field
            label="Your email (optional)"
            name="email"
            placeholder="For follow-up questions"
            type="email"
          />
          {/* Honeypot */}
          <input type="text" name="_gotcha" className="hidden" />
          <input type="hidden" name="_subject" value="New APIVault submission" />

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center h-11 rounded-md bg-accent text-bg-0 text-sm font-medium hover:bg-accent-dim transition-colors"
          >
            Submit for review →
          </button>
          <p className="text-xs text-fg-3 text-center font-mono">
            No account needed. We don&apos;t spam.
          </p>
        </form>
      </section>
      <Footer />
    </>
  );
}

function Field({
  label, name, placeholder, type = "text", required, textarea,
}: {
  label: string; name: string; placeholder: string;
  type?: string; required?: boolean; textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-mono text-fg-2 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          className="w-full px-3 py-2.5 bg-bg-1 border border-line rounded-md text-sm text-fg-0 placeholder:text-fg-3 focus:outline-none focus:border-accent transition-colors font-mono resize-y"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className="w-full h-10 px-3 bg-bg-1 border border-line rounded-md text-sm text-fg-0 placeholder:text-fg-3 focus:outline-none focus:border-accent transition-colors font-mono"
        />
      )}
    </div>
  );
}
