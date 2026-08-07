import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pb-12">
      <Skeleton className="h-[56vw] max-h-[640px] min-h-[380px] w-full rounded-none sm:h-[48vw]" />
      <div className="flex flex-col gap-8 pt-6 sm:gap-10">
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row} className="flex flex-col gap-2 px-4 sm:px-8">
            <Skeleton className="h-5 w-32" />
            <div className="flex gap-2.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-2/3 w-32 shrink-0 rounded-md sm:w-40 md:w-44"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
