import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 font-mono text-[17px] font-semibold tracking-tight", className)}>
      <span className="w-7 h-7 rounded-md bg-bg-2 border border-line-2 grid place-items-center relative overflow-hidden">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,136,0.2),transparent_70%)]" />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
          <path d="M8 8L4 12L8 16" />
          <path d="M16 8L20 12L16 16" />
          <path d="M14 6L10 18" />
        </svg>
      </span>
      <span>API<span className="text-accent">Vault</span></span>
      <span className="inline-block w-[7px] h-4 bg-accent ml-0.5 animate-blink align-[-3px]" />
    </span>
  );
}
