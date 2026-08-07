import Link from "next/link";
import { Clapperboard } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/85 via-black/50 to-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm text-xl font-black text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Clapperboard className="size-7" />
          <span>فیلم‌بین</span>
        </Link>
        <p className="hidden text-sm text-muted-foreground sm:block">
          مرجع فارسی فیلم‌ها
        </p>
      </div>
    </header>
  );
}
