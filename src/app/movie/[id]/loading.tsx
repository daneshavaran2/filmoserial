import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-64 w-full rounded-none sm:h-80" />
      <div className="mx-auto -mt-24 max-w-6xl px-4 pb-12 sm:-mt-32">
        <div className="flex flex-col gap-6 sm:flex-row">
          <Skeleton className="mx-auto h-64 w-44 shrink-0 rounded-xl sm:mx-0 sm:h-72 sm:w-48" />
          <div className="flex flex-1 flex-col gap-3 sm:pt-8">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
