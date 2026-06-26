import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArrowRight, ShieldCheck, Layers, Coins } from "lucide-react";

export const metadata: Metadata = {
  title: "$API Token",
  description: "The $API token powers the APIVault mission — a transparent directory of free AI APIs. Verify the official contract address here.",
  alternates: { canonical: "/token" },
};

const CA = "TNvdFyzgXmw1mb2rYhjWuXTxFoZucssDUkn5bEkEASY";
const TOKEN_URL = `https://kickstart.easya.io/token/${CA}`;

export default function TokenPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="max-w-[840px] mx-auto px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,255,136,0.25)] bg-[rgba(0,255,136,0.06)] text-xs font-mono text-accent mb-6">
          <Coins size={13} /> $API · live on EasyA Kickstart
        </div>
        <h1 className="font-display text-[clamp(34px,5vw,56px)] font-semibold tracking-[-0.04em] leading-[1.05] mb-5">
          The <span className="text-accent">$API</span> token
        </h1>
        <p className="text-lg text-fg-1 leading-relaxed max-w-[620px]">
          $API backs a single mission: kill the time developers waste hunting for free AI APIs.
          APIVault stays free and open — the token aligns the people who want to see it grow.
        </p>
      </section>

      {/* Contract address — verify */}
      <section className="max-w-[840px] mx-auto px-6 pb-10">
        <div className="bg-bg-1 border border-[rgba(0,255,136,0.2)] rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-fg-2 uppercase tracking-wider mb-3">
            <ShieldCheck size={14} className="text-accent" />
            Official contract address
          </div>
          <code className="block font-mono text-sm sm:text-base text-fg-0 break-all bg-bg-0 border border-line rounded-lg p-4 mb-4">
            {CA}
          </code>
          <p className="text-xs text-fg-2 leading-relaxed mb-4">
            Always verify the contract from this page (apivault.directory) before interacting.
            Anyone can create a fake token with a similar name — this is the only official one.
          </p>
          <a
            href={TOKEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 h-10 rounded-md bg-accent text-bg-0 text-sm font-medium hover:bg-accent-dim transition-colors"
          >
            View on EasyA Kickstart <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* What it funds */}
      <section className="max-w-[840px] mx-auto px-6 pb-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">// What it supports</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Layers, title: "More coverage", body: "Researching and verifying more free AI APIs across every category — LLM, image, voice, code, and more." },
            { icon: ShieldCheck, title: "Honest data", body: "Every provider is hand-checked. No fake free tiers, no broken links, no pay-to-rank. The token doesn't change that." },
            { icon: Coins, title: "Open & free", body: "The directory and its REST API stay free for developers. Always." },
          ].map((c) => (
            <div key={c.title} className="bg-bg-1 border border-line rounded-xl p-5">
              <c.icon size={20} className="text-accent mb-3" />
              <h3 className="font-display text-base font-semibold mb-1.5">{c.title}</h3>
              <p className="text-sm text-fg-1 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Honest disclaimer */}
      <section className="max-w-[840px] mx-auto px-6 pb-20">
        <div className="bg-bg-1 border border-line rounded-xl p-5">
          <p className="font-mono text-xs text-fg-2 uppercase tracking-wider mb-2">// Be careful</p>
          <p className="text-sm text-fg-1 leading-relaxed">
            $API is a community token. It is not an investment, and nothing here is financial advice.
            Crypto is volatile and you can lose money — only ever risk what you can afford to lose, and
            do your own research. APIVault makes no promises about price or returns.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
