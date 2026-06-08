import { providers } from "@/lib/providers";

export function TerminalDemo() {
  const featured = providers.filter((p) => p.isFeatured).slice(0, 4);
  const noCardCount = providers.filter((p) => !p.requiresCreditCard).length;

  return (
    <div className="max-w-[980px] mx-auto mt-16 px-6">
      <div className="bg-bg-1 border border-line rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-bg-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="font-mono text-xs text-fg-2 ml-3">apivault — zsh</span>
        </div>
        <div className="p-6 font-mono text-[13.5px] leading-[1.7] text-fg-1 overflow-x-auto">
          <div>
            <span className="text-accent">$</span> npx apivault search &quot;free llm&quot;
          </div>
          <br />
          <div className="text-fg-2">
            → Scanning <span className="text-fg-0">{providers.length}</span> providers across 8 categories…
          </div>
          <br />
          {featured.map((p) => (
            <div key={p.slug} className="mb-1 whitespace-nowrap">
              <span className="text-accent">●</span>{" "}
              <span className="text-fg-0">{p.name.padEnd(14)}</span>{" "}
              <span className="text-fg-2">—</span>{" "}
              <span>{p.freeTierSummary.padEnd(34)}</span>{" "}
              <span className="text-accent">[{p.apivaultScore}]</span>
            </div>
          ))}
          <br />
          <div className="text-fg-2">
            → Showing {featured.length} of {providers.length}.{" "}
            <span className="text-status-warn">--filter</span>{" "}
            <span className="text-[#A8E5A0]">&quot;no-card,vision,streaming&quot;</span>{" "}
            <span className="text-fg-2">({noCardCount} no-card available)</span>
            <span className="inline-block w-[7px] h-3.5 bg-accent ml-1 animate-blink align-[-2px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
