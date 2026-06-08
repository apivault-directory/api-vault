import { StatusDot } from "./status-dot";
import type { Provider } from "@/lib/types";

interface TickerProps {
  providers: Provider[];
}

export function Ticker({ providers }: TickerProps) {
  // Show all providers, doubled for seamless loop
  const items = [...providers].sort((a, b) => b.apivaultScore - a.apivaultScore);
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-line bg-bg-1 overflow-hidden py-3.5 mt-16">
      <div
        className="flex gap-12 whitespace-nowrap w-max"
        style={{ animation: `scroll ${Math.max(items.length * 3, 60)}s linear infinite` }}
      >
        {doubled.map((p, i) => (
          <span key={`${p.slug}-${i}`} className="inline-flex items-center gap-2 font-mono text-[13px] text-fg-1">
            <StatusDot status={p.status} />
            <span className="text-fg-0 font-medium">{p.name}</span>
            <span
              className={
                p.status === "online"   ? "text-accent"
                : p.status === "degraded" ? "text-status-warn"
                : p.status === "down"     ? "text-status-err"
                : "text-fg-2"
              }
            >
              {p.status === "online"   && "↑ online"}
              {p.status === "degraded" && "~ degraded"}
              {p.status === "down"     && "↓ down"}
              {p.status === "unknown"  && "? unknown"}
            </span>
            <span className="text-fg-3 font-mono text-[11px]">[{p.apivaultScore}]</span>
          </span>
        ))}
      </div>
    </div>
  );
}
