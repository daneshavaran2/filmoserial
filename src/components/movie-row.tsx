"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Movie } from "@/lib/tmdb-types";
import { MovieCard } from "@/components/movie-card";

export function MovieRow({
  title,
  movies,
  seeAllHref,
}: {
  title: string;
  movies: Movie[];
  seeAllHref?: string;
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
      <div className="mb-2 flex items-center justify-between px-4 sm:px-8">
        <h2 className="text-base font-bold sm:text-lg">{title}</h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
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
          className="absolute inset-y-0 right-0 z-10 hidden w-10 items-center justify-center bg-gradient-to-l from-background/90 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100 sm:flex"
        >
          <ChevronRight className="size-7" />
        </button>

        <div
          ref={scrollerRef}
          className="scrollbar-none flex gap-2.5 overflow-x-auto scroll-smooth px-4 sm:px-8"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="w-32 shrink-0 sm:w-40 md:w-44">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="بعدی"
          onClick={() => scrollByAmount(-1)}
          className="absolute inset-y-0 left-0 z-10 hidden w-10 items-center justify-center bg-gradient-to-r from-background/90 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100 sm:flex"
        >
          <ChevronLeft className="size-7" />
        </button>
      </div>
    </section>
  );
}
