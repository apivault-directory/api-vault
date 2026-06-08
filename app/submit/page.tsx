import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CheckCircle2, Search, ClipboardList, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Submit an API",
  description: "Know a free AI API we should track? Submit it for review — we verify every API manually.",
  alternates: { canonical: "/submit" },
};

const steps = [
  {
    icon: Search,
    title: "Check it's not listed",
    desc: 'Search apivault.directory/providers first — it might already be there.',
  },
  {
    icon: ClipboardList,
    title: "Fill the form below",
    desc: "Takes ~2 minutes. Tell us the name, category, free tier details, and docs URL.",
  },
  {
    icon: CheckCircle2,
    title: "We verify within 7 days",
    desc: "We manually test the free tier and API before adding it to the directory.",
  },
  {
    icon: Zap,
    title: "Goes live on next deploy",
    desc: "Once verified it's added to providers.ts and deployed automatically.",
  },
];

const criteria = [
  "Has a real free tier (not just a trial or credit card required to start)",
  "Public API with documented endpoints",
  "Working as of submission date",
  "Not already listed on APIVault",
];

export default function SubmitPage() {
  return (
    <>
      <Nav />

      <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        {/* header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-1 border border-line rounded-full text-xs font-mono text-fg-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Open submissions
          </div>
          <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold tracking-[-0.03em] leading-tight mb-4">
            Submit a free API<br />
            <span className="text-accent">for review.</span>
          </h1>
          <p className="text-fg-1 text-lg leading-relaxed">
            Know a free AI API we haven&apos;t listed? We review every submission manually
            and add qualifying APIs within 7 days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* left: steps */}
          <div>
            <p className="text-xs font-mono text-fg-2 uppercase tracking-wider mb-6">How it works</p>
            <ol className="space-y-6">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-bg-1 border border-line shrink-0 mt-0.5">
                    <step.icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-fg-0 mb-0.5">
                      <span className="font-mono text-accent mr-2">{String(i + 1).padStart(2, "0")}.</span>
                      {step.title}
                    </p>
                    <p className="text-sm text-fg-1 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* right: criteria */}
          <div className="space-y-6">
            <div className="bg-bg-1 border border-line rounded-xl p-6">
              <p className="text-xs font-mono text-fg-2 uppercase tracking-wider mb-4">
                Acceptance criteria
              </p>
              <ul className="space-y-3">
                {criteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-fg-1">
                    <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg-1 border border-line rounded-xl p-6">
              <p className="text-xs font-mono text-fg-2 uppercase tracking-wider mb-4">
                What to include
              </p>
              <div className="space-y-2 font-mono text-sm text-fg-1">
                {[
                  "API Name & website URL",
                  "Category (LLM, Image, Speech…)",
                  "Free tier details (req/day, tokens, etc.)",
                  "Credit card required? Phone required?",
                  "API docs URL",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-accent text-xs">→</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-bg-1 p-6">
              <p className="text-xs font-mono text-fg-2 uppercase tracking-wider mb-2">
                Response time
              </p>
              <p className="text-sm text-fg-1">
                We review submissions within <span className="text-fg-0 font-medium">7 days</span>.
                Once verified, the API goes live on the next deploy.
              </p>
            </div>
          </div>
        </div>

        {/* ── Tally form embed ── */}
        <div className="border-t border-line pt-12 pb-8">
          <p className="text-xs font-mono text-fg-2 uppercase tracking-wider mb-6">Submission form</p>
          <div className="rounded-xl border border-line overflow-hidden bg-bg-1">
            <iframe
              src="https://tally.so/embed/0Qk5kB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="500"
              title="Submit an API to APIVault"
              className="block"
              style={{ border: "none", background: "transparent" }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
