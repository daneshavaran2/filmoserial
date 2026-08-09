"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Info, Star } from "lucide-react";

import { formatRating, formatJalaliYear } from "@/lib/format";
import { Button } from "@/components/ui/button";

export interface HeroSlide {
  id: number;
  title: string;
  overview: string;
  voteAverage: number;
  releaseDate: string;
  backdrop: string;
  genreNames: string[];
}

const AUTO_ADVANCE_MS = 7000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  function goTo(index: number) {
    setActive(((index % slides.length) + slides.length) % slides.length);
  }

  return (
    <section className="group/hero relative h-[62vw] max-h-[680px] min-h-[420px] w-full overflow-hidden sm:h-[52vw]">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <Image
            src={slide.backdrop}
            alt={slide.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-[center_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/55 via-transparent to-transparent" />

          <div className="relative flex h-full max-w-7xl flex-col justify-end gap-4 px-4 pb-16 sm:px-8 sm:pb-20">
            <h1 className="max-w-xl text-balance text-3xl font-black drop-shadow-md sm:text-5xl">
              {slide.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground sm:text-base">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                {formatRating(slide.voteAverage)}
              </span>
              <span>{formatJalaliYear(slide.releaseDate)}</span>
              {slide.genreNames.map((name) => (
                <span
                  key={name}
                  className="rounded border border-white/25 px-2 py-0.5 text-xs text-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="line-clamp-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              {slide.overview}
            </p>
            <div>
              <Button asChild size="lg" className="gap-2 font-bold">
                <Link href={`/movie/${slide.id}`}>
                  <Info className="size-5" />
                  اطلاعات بیشتر
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="اسلاید قبلی"
            onClick={() => goTo(active - 1)}
            className="absolute inset-y-0 right-0 z-10 hidden w-14 items-center justify-center opacity-0 transition-opacity group-hover/hero:opacity-100 hover:[&_svg]:scale-125 focus-visible:opacity-100 focus-visible:outline-none sm:flex"
          >
            <ChevronRight className="size-8 drop-shadow-md transition-transform duration-200" />
          </button>
          <button
            type="button"
            aria-label="اسلاید بعدی"
            onClick={() => goTo(active + 1)}
            className="absolute inset-y-0 left-0 z-10 hidden w-14 items-center justify-center opacity-0 transition-opacity group-hover/hero:opacity-100 hover:[&_svg]:scale-125 focus-visible:opacity-100 focus-visible:outline-none sm:flex"
          >
            <ChevronLeft className="size-8 drop-shadow-md transition-transform duration-200" />
          </button>

          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`نمایش ${slide.title}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className="rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-primary" : "w-1.5 bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
