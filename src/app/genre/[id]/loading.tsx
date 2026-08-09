import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-48 w-full rounded-none sm:h-64" />
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-8">
        <div className="mb-6 flex gap-2 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <Skeleton key={i} className="aspect-2/3 w-full rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
