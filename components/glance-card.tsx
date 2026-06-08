import { cn } from "@/lib/utils";

export function GlanceCard({ label, value, success, mono = false }: { label: string; value: string; success?: boolean; mono?: boolean }) {
  return (
    <div className="bg-bg-1 border border-line rounded-md p-4 transition-colors hover:border-line-2">
      <div className="text-[11px] font-mono text-fg-2 uppercase tracking-wider mb-1.5">{label}</div>
      <div className={cn("text-sm font-medium break-words", success ? "text-accent" : "text-fg-0", mono && "font-mono")}>{value}</div>
    </div>
  );
}
