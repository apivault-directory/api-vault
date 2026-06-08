/**
 * components/provider-logo.tsx
 *
 * Renders the real brand logo for a provider using Clearbit's logo API.
 * Falls back to the `text` initials if:
 *   - the image fails to load (404, network error, CORS)
 *   - `domain` is not provided
 *
 * This is a Client Component because we need `onError` state to swap to the fallback.
 * It is safe to import from Server Components — Next.js handles the boundary.
 *
 * Usage:
 *   <ProviderLogo domain="groq.com" text="G" size="md" />
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, { box: string; text: string; img: number; padding: string }> = {
  sm: { box: "w-8 h-8",   text: "text-xs",  img: 20, padding: "p-1" },
  md: { box: "w-10 h-10", text: "text-sm",  img: 24, padding: "p-1.5" },
  lg: { box: "w-14 h-14", text: "text-lg",  img: 36, padding: "p-2" },
  xl: { box: "w-16 h-16", text: "text-2xl", img: 40, padding: "p-2.5" },
};

interface ProviderLogoProps {
  /** Provider's public domain, e.g. "groq.com". Used to fetch logo from Clearbit. */
  domain: string;
  /** 1–3 char fallback shown when the logo can't be loaded. */
  text: string;
  size?: Size;
  className?: string;
}

export function ProviderLogo({ domain, text, size = "md", className }: ProviderLogoProps) {
  const [imgError, setImgError] = useState(false);
  const s = sizeMap[size];

  const showLogo = !imgError && !!domain;

  return (
    <div
      className={cn(
        "rounded-md bg-bg-2 border border-line grid place-items-center relative overflow-hidden shrink-0",
        s.box,
        className,
      )}
    >
      {/* Subtle green glow — always present behind logo/text */}
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,136,0.08),transparent_70%)]" />

      {showLogo ? (
        /*
         * Clearbit Logo API: https://logo.clearbit.com/<domain>
         * Returns a clean transparent PNG/SVG logo at 128px.
         * 404s gracefully when no logo is found → triggers onError → shows text fallback.
         *
         * `unoptimized` is intentional: Clearbit images are already small and optimised.
         * next/image's optimization pipeline adds latency for no quality gain here.
         */
        <Image
          src={`https://logo.clearbit.com/${domain}`}
          alt={text}
          width={s.img}
          height={s.img}
          className={cn("relative z-10 object-contain rounded-sm", s.padding)}
          onError={() => setImgError(true)}
          unoptimized
        />
      ) : (
        <span className={cn("relative z-10 font-mono font-semibold text-fg-0", s.text)}>
          {text}
        </span>
      )}
    </div>
  );
}
