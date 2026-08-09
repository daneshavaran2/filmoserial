"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Movie } from "@/lib/tmdb-types";
import { MovieCard } from "@/components/movie-card";
import { toPersianDigits } from "@/lib/format";

export function MovieRow({
  title,
  movies,
  seeAllHref,
  ranked = false,
}: {
  title: string;
  movies: Movie[];
  seeAllHref?: string;
  ranked?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  }

  if (movies.length === 0) return null;

  return (
    <section className="group/row relative">
      <div className="mb-3 flex items-center justify-between px-4 sm:px-8">
        <h2 className="text-base font-bold sm:text-lg">{title}</h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="rounded-sm text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            مشاهده همه
          </Link>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="قبلی"
          onClick={() => scrollByAmount(1)}
          className="absolute inset-y-0 right-0 z-10 hidden w-10 items-center justify-center bg-gradient-to-l from-background/90 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100 hover:[&_svg]:scale-125 focus-visible:opacity-100 focus-visible:outline-none sm:flex"
        >
          <ChevronRight className="size-7 transition-transform duration-200" />
        </button>

        <div
          ref={scrollerRef}
          className="scrollbar-none flex gap-2.5 overflow-x-auto scroll-smooth px-4 sm:px-8"
        >
          {movies.map((movie, i) =>
            ranked && i < 10 ? (
              <div key={movie.id} className="flex shrink-0 items-end">
                <span
                  aria-hidden
                  className="select-none pb-1 text-[5rem] leading-none font-black text-transparent [-webkit-text-stroke:2px_var(--muted-foreground)] sm:text-[6.5rem]"
                >
                  {toPersianDigits(i + 1)}
                </span>
                <div className="mr-[-0.5rem] w-28 shrink-0 sm:mr-[-0.75rem] sm:w-36 md:w-40">
                  <MovieCard movie={movie} />
                </div>
              </div>
            ) : (
              <div key={movie.id} className="w-32 shrink-0 sm:w-40 md:w-44">
                <MovieCard movie={movie} />
              </div>
            )
          )}
        </div>

        <button
          type="button"
          aria-label="بعدی"
          onClick={() => scrollByAmount(-1)}
          className="absolute inset-y-0 left-0 z-10 hidden w-10 items-center justify-center bg-gradient-to-r from-background/90 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100 hover:[&_svg]:scale-125 focus-visible:opacity-100 focus-visible:outline-none sm:flex"
        >
          <ChevronLeft className="size-7 transition-transform duration-200" />
        </button>
      </div>
    </section>
  );
}
