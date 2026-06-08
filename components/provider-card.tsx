import Link from "next/link";
import type { Provider } from "@/lib/types";
import { StatusDot } from "./status-dot";
import { ProviderLogo } from "./provider-logo";
import { CategoryIcon } from "./category-icon";
import { SocialLinks } from "./social-links";
import { TrustScoreBadge } from "./trust-score-badge";
import { ExternalLink } from "lucide-react";

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="group rounded-lg border border-line bg-bg-1 p-5 transition-all duration-200 hover:border-[rgba(0,255,136,0.25)] hover:bg-bg-2 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <Link href={`/providers/${provider.slug}`} className="flex items-center gap-3 min-w-0 flex-1">
          <ProviderLogo domain={provider.domain} text={provider.logoText} size="lg" />
          <div className="min-w-0">
            <h3 className="text-base font-semibold truncate group-hover:text-accent transition-colors">
              {provider.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-fg-2 font-mono mt-0.5">
              <CategoryIcon category={provider.category} size={11} className="shrink-0" />
              <span>{provider.category}</span>
            </div>
          </div>
        </Link>
        <TrustScoreBadge provider={provider} />
      </div>

      {/* Tagline */}
      <Link href={`/providers/${provider.slug}`} className="block">
        <p className="text-sm text-fg-1 mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem] hover:text-fg-0 transition-colors">
          {provider.tagline}
        </p>
      </Link>

      {/* Free tier badge */}
      <div className="flex items-center gap-2 mb-4 flex-wrap min-h-[28px]">
        <span className="font-mono text-xs text-fg-0 bg-bg-0 border border-line rounded px-2 py-1">
          {provider.freeTierSummary}
        </span>
        {!provider.requiresCreditCard && (
          <span className="text-xs text-accent flex items-center gap-1 font-mono">
            <span>✓</span> no card
          </span>
        )}
      </div>

      {/* Tags */}
      {provider.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[24px]">
          {provider.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] text-fg-1 bg-bg-0 border border-line rounded px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-line text-xs mt-auto">
        <div className="flex items-center gap-3">
          <StatusDot status={provider.status} />
          <SocialLinks social={provider.social} />
        </div>
        {/* Get API button */}
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-mono text-fg-2 hover:text-accent transition-colors"
        >
          Get API <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
