import { Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-16">
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-5 w-96 mb-10" />
      <div className="flex gap-2 mb-8">
        {[...Array(6)].map((_, i) => (<Skeleton key={i} className="h-8 w-20" />))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (<Skeleton key={i} className="h-64" />))}
      </div>
    </div>
  );
}
