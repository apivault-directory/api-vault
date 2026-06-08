"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, { box: string; text: string; img: number; padding: string }> = {
  sm: { box: "w-9 h-9",   text: "text-xs",  img: 28, padding: "p-1" },
  md: { box: "w-12 h-12", text: "text-sm",  img: 40, padding: "p-1.5" },
  lg: { box: "w-16 h-16", text: "text-lg",  img: 52, padding: "p-2" },
  xl: { box: "w-20 h-20", text: "text-2xl", img: 64, padding: "p-2.5" },
};

interface ProviderLogoProps {
  domain: string;
  text: string;
  size?: Size;
  className?: string;
}

type Stage = "clearbit" | "google" | "fallback";

export function ProviderLogo({ domain, text, size = "md", className }: ProviderLogoProps) {
  const [stage, setStage] = useState<Stage>(domain ? "clearbit" : "fallback");
  const s = sizeMap[size];

  const src =
    stage === "clearbit"
      ? `https://logo.clearbit.com/${domain}?size=128`
      : stage === "google"
      ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      : null;

  function handleError() {
    if (stage === "clearbit") setStage("google");
    else setStage("fallback");
  }

  return (
    <div className={cn(
      "rounded-md bg-bg-2 border border-line grid place-items-center relative overflow-hidden shrink-0",
      s.box,
      className,
    )}>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,136,0.08),transparent_70%)]" />

      {src ? (
        <Image
          src={src}
          alt={text}
          width={s.img}
          height={s.img}
          className={cn("relative z-10 object-contain rounded-sm w-full h-full", s.padding)}
          onError={handleError}
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
