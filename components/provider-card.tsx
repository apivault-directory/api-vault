import Link from "next/link";
import type { Provider } from "@/lib/types";
import { StatusDot } from "./status-dot";
import { ProviderLogo } from "./provider-logo";
import { CategoryIcon } from "./category-icon";
import { SocialLinks } from "./social-links";
import { timeAgo } from "@/lib/utils";

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link
      href={`/providers/${provider.slug}`}
      className="group block rounded-lg border border-line bg-bg-1 p-5 transition-all duration-200 hover:border-[rgba(0,255,136,0.25)] hover:bg-bg-2 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <ProviderLogo domain={provider.domain} text={provider.logoText} size="md" />
          <div className="min-w-0">
            <h3 className="text-base font-semibold truncate group-hover:text-accent transition-colors">
              {provider.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-fg-2 font-mono mt-0.5">
              <CategoryIcon category={provider.category} size={11} className="shrink-0" />
              <span>{provider.category}</span>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold font-display text-accent leading-none">
            {provider.apivaultScore}
          </div>
          <div className="text-[10px] text-fg-2 uppercase tracking-wider mt-1">/ 100</div>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm text-fg-1 mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
        {provider.tagline}
      </p>

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

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-line text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <StatusDot status={provider.status} />
            <span className="text-fg-1 capitalize">{provider.status}</span>
          </div>
          {/* Social links — only show verified ones */}
          <SocialLinks social={provider.social} />
        </div>
        <span className="text-fg-2">{timeAgo(provider.lastVerified)}</span>
      </div>
    </Link>
  );
}
