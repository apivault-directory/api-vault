import Link from "next/link";
import type { Provider } from "@/lib/types";
import { StatusDot } from "./status-dot";
import { ProviderLogo } from "./provider-logo";
import { TrustScoreBadge } from "./trust-score-badge";

export function ProviderRow({ provider }: { provider: Provider }) {
  return (
    <Link
      href={`/providers/${provider.slug}`}
      className="group grid grid-cols-[56px_1fr_auto] gap-4 p-4 bg-bg-1 border border-line rounded-md transition-all duration-200 hover:border-[rgba(0,255,136,0.3)] hover:bg-bg-2 hover:translate-x-0.5 items-center"
    >
      <ProviderLogo domain={provider.domain} text={provider.logoText} size="lg" />
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold mb-0.5 flex items-center gap-2">
          <StatusDot status={provider.status} />
          {provider.name}
        </h3>
        <div className="text-xs text-fg-2 font-mono mb-1.5">{provider.category}</div>
        <span className="inline-block px-2 py-0.5 bg-bg-0 border border-line rounded text-[11px] font-mono text-fg-1">
          {provider.freeTierSummary}
        </span>
      </div>
      <TrustScoreBadge provider={provider} />
    </Link>
  );
}
