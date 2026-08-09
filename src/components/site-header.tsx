"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clapperboard, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/95 backdrop-blur"
          : "bg-gradient-to-b from-black/85 via-black/50 to-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-sm text-xl font-black text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Clapperboard className="size-7" />
          <span>فیلم‌بین</span>
        </Link>

        <form
          action="/search"
          className="relative hidden max-w-xs flex-1 sm:block"
        >
          <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            name="q"
            placeholder="جستجوی فیلم…"
            className="h-9 border-white/15 bg-black/30 pr-9 placeholder:text-muted-foreground"
          />
        </form>

        <Link
          href="/search"
          aria-label="جستجو"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
        >
          <Search className="size-5" />
        </Link>
      </div>
    </header>
  );
}
