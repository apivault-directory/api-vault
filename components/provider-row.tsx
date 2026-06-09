import Link from "next/link";
import type { Provider } from "@/lib/types";
import { StatusDot } from "./status-dot";
import { ProviderLogo } from "./provider-logo";
import { TrustScoreBadge } from "./trust-score-badge";

export function ProviderRow({ provider }: { provider: Provider }) {
  return (
    <Link
      href={`/providers/${provider.slug}`}
      className="group grid grid-cols-[40px_1fr_auto] sm:grid-cols-[56px_1fr_auto] gap-3 sm:gap-4 p-3 sm:p-4 bg-bg-1 border border-line rounded-md transition-all duration-200 hover:border-[rgba(0,255,136,0.3)] hover:bg-bg-2 hover:translate-x-0.5 items-center"
    >
      <ProviderLogo domain={provider.domain} text={provider.logoText} size="md" />
      <div className="min-w-0">
        <h3 className="text-[14px] sm:text-[15px] font-semibold mb-0.5 flex items-center gap-2 truncate">
          <StatusDot status={provider.status} />
          <span className="truncate">{provider.name}</span>
        </h3>
        <div className="text-xs text-fg-2 font-mono mb-1">{provider.category}</div>
        <span className="inline-block px-2 py-0.5 bg-bg-0 border border-line rounded text-[10px] sm:text-[11px] font-mono text-fg-1 truncate max-w-full">
          {provider.freeTierSummary}
        </span>
      </div>
      <TrustScoreBadge provider={provider} size="sm" />
    </Link>
  );
}
