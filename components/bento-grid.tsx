import { cn } from "@/lib/utils";

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-12 gap-4">{children}</div>;
}

export function BentoItem({ tag, title, children, className, stat }: { tag: string; title: string; children: React.ReactNode; className?: string; stat?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-bg-1 border border-line rounded-lg p-6 relative overflow-hidden transition-all duration-300 hover:border-line-2 hover:-translate-y-0.5",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_0%_0%,rgba(0,255,136,0.08),transparent_50%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none",
        className
      )}
    >
      <div className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3 relative">{tag}</div>
      <div className="font-display text-xl font-semibold tracking-tight mb-2 relative">{title}</div>
      <div className="text-sm text-fg-1 leading-relaxed relative">{children}</div>
      {stat && <div className="relative mt-4">{stat}</div>}
    </div>
  );
}
