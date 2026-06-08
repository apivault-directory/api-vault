import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-md bg-gradient-to-r from-bg-1 via-bg-2 to-bg-1 bg-[length:200%_100%] animate-shimmer", className)} />
  );
}

export function ProviderCardSkeleton() {
  return (
    <div className="rounded-lg border border-line bg-bg-1 p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10" />
          <div>
            <Skeleton className="h-4 w-24 mb-1.5" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-8 w-12" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-7 w-32 mb-4" />
      <div className="flex gap-1.5 mb-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="pt-3 border-t border-line">
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}
