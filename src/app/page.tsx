import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { getMovieGenres, getMoviesByGenre, backdropUrl } from "@/lib/tmdb";
import { formatRating, formatJalaliYear } from "@/lib/format";
import { GenreNav } from "@/components/genre-nav";
import { MovieCard } from "@/components/movie-card";
import { PaginationControls } from "@/components/pagination-controls";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "فیلم‌بین | مرجع فیلم‌ها بر اساس ژانر",
};

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const genreId = Array.isArray(params.genre)
    ? Number(params.genre[0])
    : params.genre
      ? Number(params.genre)
      : undefined;
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const page = Math.min(Math.max(Number(pageParam) || 1, 1), 500);

  const [genres, movieResult] = await Promise.all([
    getMovieGenres(),
    getMoviesByGenre(genreId, page),
  ]);

  const activeGenre = genres.find((g) => g.id === genreId);
  const featured = page === 1 ? movieResult.results[0] : undefined;
  const featuredBackdrop = featured
    ? backdropUrl(featured.backdrop_path)
    : null;

  const buildHref = (targetPage: number) => {
    const sp = new URLSearchParams();
    if (genreId) sp.set("genre", String(genreId));
    if (targetPage > 1) sp.set("page", String(targetPage));
    const qs = sp.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {featured && featuredBackdrop && (
        <section className="relative mb-8 -mt-2 h-56 overflow-hidden rounded-xl sm:h-72">
          <Image
            src={featuredBackdrop}
            alt={featured.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
            <h2 className="text-xl font-bold drop-shadow-sm sm:text-2xl">
              {featured.title}
            </h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                {formatRating(featured.vote_average)}
              </span>
              <span>{formatJalaliYear(featured.release_date)}</span>
            </div>
            <Button asChild size="sm" className="mt-1 w-fit">
              <Link href={`/movie/${featured.id}`}>مشاهده جزئیات</Link>
            </Button>
          </div>
        </section>
      )}

      <div className="mb-6 flex flex-col gap-4">
        <h1 className="text-lg font-bold">
          {activeGenre ? `فیلم‌های ژانر ${activeGenre.name}` : "فیلم‌های پرطرفدار"}
        </h1>
        <GenreNav genres={genres} activeGenreId={genreId} />
      </div>

      {movieResult.results.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          فیلمی برای نمایش یافت نشد.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movieResult.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <PaginationControls
        page={movieResult.page}
        totalPages={Math.min(movieResult.total_pages, 500)}
        buildHref={buildHref}
      />
    </div>
  );
}
