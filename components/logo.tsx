/**
 * components/logo.tsx
 *
 * APIVault brand mark + wordmark.
 *
 * The icon box uses /apivault-icon.svg when the file exists in public/.
 * Place your files at:
 *   public/apivault-icon.svg        (vector master — shown in the nav)
 *   public/apivault-icon-192.png    (raster — used for PWA / apple-touch-icon)
 *   public/apivault-icon-512.png    (raster — used for PWA splash)
 *   public/apivault-og.png          (1200×630 — Open Graph preview image)
 *
 * If the SVG file isn't placed yet, the fallback code-bracket icon renders instead.
 */

"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const [iconError, setIconError] = useState(false);

  return (
    <span className={cn("flex items-center gap-2.5 font-mono text-[17px] font-semibold tracking-tight", className)}>
      <span className="w-7 h-7 rounded-md bg-bg-2 border border-line-2 grid place-items-center relative overflow-hidden shrink-0">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,136,0.2),transparent_70%)]" />
        {!iconError ? (
          <Image
            src="/apivault-icon.svg"
            alt="APIVault"
            width={20}
            height={20}
            className="relative z-10 object-contain"
            onError={() => setIconError(true)}
            priority
          />
        ) : (
          /* Fallback: code-brackets icon drawn inline */
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00FF88"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10"
          >
            <path d="M8 8L4 12L8 16" />
            <path d="M16 8L20 12L16 16" />
            <path d="M14 6L10 18" />
          </svg>
        )}
      </span>
      <span>
        API<span className="text-accent">Vault</span>
      </span>
      <span className="inline-block w-[7px] h-4 bg-accent ml-0.5 animate-blink align-[-3px]" />
    </span>
  );
}
