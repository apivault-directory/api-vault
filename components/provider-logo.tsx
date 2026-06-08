import { cn } from "@/lib/utils";

export function ProviderLogo({ text, size = "md", className }: { text: string; size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg", xl: "w-16 h-16 text-2xl" };
  return (
    <div className={cn("rounded-md bg-bg-2 border border-line grid place-items-center font-mono font-semibold relative overflow-hidden shrink-0", sizes[size], className)}>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,136,0.1),transparent_70%)]" />
      <span className="relative">{text}</span>
    </div>
  );
}
