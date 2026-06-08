"use client";

import type { Provider } from "@/lib/types";

interface TrustScoreBadgeProps {
  provider: Provider;
  size?: "sm" | "lg";
}

function ScoreRow({ label, weight, score }: { label: string; weight: string; score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[11px] text-fg-1">{label}</span>
          <span className="text-[11px] font-mono text-fg-2">{weight}</span>
        </div>
        <div className="h-1 bg-bg-0 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${score}%`, opacity: 0.7 + score / 333 }}
          />
        </div>
      </div>
      <span className="text-[11px] font-mono text-fg-0 w-7 text-right shrink-0">{score}</span>
    </div>
  );
}

export function TrustScoreBadge({ provider, size = "sm" }: TrustScoreBadgeProps) {
  const score = provider.apivaultScore;
  const color =
    score >= 90 ? "text-accent" :
    score >= 75 ? "text-yellow-400" :
    score >= 60 ? "text-orange-400" :
    "text-red-400";

  return (
    <div className="relative group/tooltip shrink-0">
      {/* Score display */}
      <div className={`text-right cursor-help ${size === "lg" ? "pl-3" : ""}`}>
        <div className={`font-bold font-display leading-none ${color} ${size === "lg" ? "text-4xl" : "text-2xl"}`}>
          {score}
        </div>
        <div className="text-[10px] text-fg-2 uppercase tracking-wider mt-0.5">/ 100</div>
      </div>

      {/* Tooltip — appears on hover */}
      <div className="absolute right-0 top-full mt-2 z-50 w-56 invisible opacity-0 group-hover/tooltip:visible group-hover/tooltip:opacity-100 transition-all duration-150 pointer-events-none">
        <div className="bg-bg-2 border border-line rounded-lg p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="text-[11px] font-mono text-fg-2 uppercase tracking-wider mb-2.5">
            Trust score breakdown
          </div>
          <div className="space-y-2">
            <ScoreRow label="Reliability"    weight="35%" score={provider.reliabilityScore} />
            <ScoreRow label="Free Tier"      weight="30%" score={provider.freeTierScore} />
            <ScoreRow label="Documentation"  weight="20%" score={provider.documentationScore} />
            <ScoreRow label="Popularity"     weight="15%" score={provider.popularityScore} />
          </div>
          <div className="mt-2.5 pt-2 border-t border-line flex items-center justify-between">
            <span className="text-[10px] text-fg-2">composite</span>
            <span className={`text-sm font-bold font-mono ${color}`}>{score}/100</span>
          </div>
        </div>
        {/* Arrow */}
        <div className="absolute right-3 -top-1 w-2 h-2 bg-bg-2 border-l border-t border-line rotate-45" />
      </div>
    </div>
  );
}
