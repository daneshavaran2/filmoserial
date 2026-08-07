import Link from "next/link";
import { Clapperboard } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Clapperboard className="size-6 text-primary" />
          <span>فیلم‌بین</span>
        </Link>
        <p className="hidden text-sm text-muted-foreground sm:block">
          مرجع فارسی فیلم‌ها
        </p>
      </div>
    </header>
  );
}
