import { cn, scoreColor } from "@/lib/utils";

export function TrustScore({ score, size = "md", showLabel = true }: { score: number; size?: "sm" | "md" | "lg" | "xl"; showLabel?: boolean }) {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl", xl: "text-6xl" };
  return (
    <div className="flex flex-col items-end">
      <div className={cn("font-display font-semibold leading-none", sizes[size], scoreColor(score))}>{score}</div>
      {showLabel && (
        <div className="font-mono text-[10px] text-fg-2 uppercase tracking-wider mt-1.5">
          / 100 {size === "xl" && "APIVault Score"}
        </div>
      )}
    </div>
  );
}
