import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { toPersianDigits } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PaginationControls({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <Link
        href={buildHref(page - 1)}
        aria-disabled={!hasPrev}
        tabIndex={hasPrev ? undefined : -1}
        className={cn(
          buttonVariants({ variant: "outline" }),
          !hasPrev && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight className="size-4" />
        قبلی
      </Link>
      <span className="text-sm text-muted-foreground">
        صفحه {toPersianDigits(page)} از {toPersianDigits(totalPages)}
      </span>
      <Link
        href={buildHref(page + 1)}
        aria-disabled={!hasNext}
        tabIndex={hasNext ? undefined : -1}
        className={cn(
          buttonVariants({ variant: "outline" }),
          !hasNext && "pointer-events-none opacity-40"
        )}
      >
        بعدی
        <ChevronLeft className="size-4" />
      </Link>
    </div>
  );
}
