import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Info, Star } from "lucide-react";

import { getMovieGenres, getMoviesByGenre } from "@/lib/tmdb";
import { backdropUrl } from "@/lib/tmdb-image";
import { formatRating, formatJalaliYear } from "@/lib/format";
import { MovieRow } from "@/components/movie-row";
import { Button } from "@/components/ui/button";
import type { Genre } from "@/lib/tmdb-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "فیلم‌بین | مرجع فیلم‌ها بر اساس ژانر",
};

const PREFERRED_GENRE_ORDER = [
  28, 35, 18, 27, 10749, 878, 16, 80, 14, 53, 12, 10751, 9648, 99, 37,
];

function orderGenres(genres: Genre[]): Genre[] {
  const byId = new Map(genres.map((g) => [g.id, g]));
  const ordered: Genre[] = [];
  for (const id of PREFERRED_GENRE_ORDER) {
    const genre = byId.get(id);
    if (genre) {
      ordered.push(genre);
      byId.delete(id);
    }
  }
  return [...ordered, ...byId.values()];
}

export default async function HomePage() {
  const genres = await getMovieGenres();
  const rowGenres = orderGenres(genres).slice(0, 8);

  const [popular, ...rows] = await Promise.all([
    getMoviesByGenre(undefined, 1),
    ...rowGenres.map((genre) => getMoviesByGenre(genre.id, 1)),
  ]);

  const featured = popular.results[0];
  const featuredBackdrop = featured ? backdropUrl(featured.backdrop_path) : null;

  return (
    <div className="pb-12">
      <section className="relative h-[56vw] max-h-[640px] min-h-[380px] w-full overflow-hidden sm:h-[48vw]">
        {featured && featuredBackdrop ? (
          <Image
            src={featuredBackdrop}
            alt={featured.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/50 via-transparent to-transparent" />

        {featured && (
          <div className="relative flex h-full max-w-7xl flex-col justify-end gap-4 px-4 pb-10 sm:px-8 sm:pb-16">
            <h1 className="max-w-xl text-3xl font-black drop-shadow-md sm:text-5xl">
              {featured.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground sm:text-base">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                {formatRating(featured.vote_average)}
              </span>
              <span>{formatJalaliYear(featured.release_date)}</span>
            </div>
            <p className="line-clamp-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              {featured.overview}
            </p>
            <div>
              <Button asChild size="lg" className="gap-2 font-bold">
                <Link href={`/movie/${featured.id}`}>
                  <Info className="size-5" />
                  اطلاعات بیشتر
                </Link>
              </Button>
            </div>
          </div>
        )}
      </section>

      <div className="flex flex-col gap-8 pt-4 sm:gap-10">
        <MovieRow
          title="پرطرفدار"
          movies={popular.results}
          seeAllHref="/genre/popular"
        />
        {rowGenres.map((genre, i) => (
          <MovieRow
            key={genre.id}
            title={genre.name}
            movies={rows[i].results}
            seeAllHref={`/genre/${genre.id}`}
          />
        ))}
      </div>
    </div>
  );
}
