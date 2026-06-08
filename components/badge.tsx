import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "green" | "amber";

const variants: Record<Variant, string> = {
  default: "bg-bg-1 border border-line text-fg-1",
  outline: "border border-line-2 text-fg-1 bg-transparent",
  green: "border border-[rgba(0,255,136,0.3)] text-accent bg-[rgba(0,255,136,0.05)]",
  amber: "border border-[rgba(255,176,32,0.3)] text-status-warn bg-[rgba(255,176,32,0.05)]",
};

export function Badge({ children, variant = "default", className }: { children: React.ReactNode; variant?: Variant; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono", variants[variant], className)}>
      {children}
    </span>
  );
}
