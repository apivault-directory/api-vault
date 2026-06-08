import { cn } from "@/lib/utils";
import type { ProviderStatus } from "@/lib/types";

const colorMap: Record<ProviderStatus, string> = {
  online: "bg-status-ok shadow-[0_0_8px_rgba(0,255,136,0.6)]",
  degraded: "bg-status-warn shadow-[0_0_8px_rgba(255,176,32,0.6)]",
  down: "bg-status-err shadow-[0_0_8px_rgba(255,77,77,0.6)]",
  unknown: "bg-fg-3",
};

export function StatusDot({ status, size = "sm" }: { status: ProviderStatus; size?: "sm" | "md" }) {
  return (
    <span
      className={cn("inline-block rounded-full", size === "md" ? "w-2 h-2" : "w-1.5 h-1.5", colorMap[status])}
      aria-label={status}
    />
  );
}
