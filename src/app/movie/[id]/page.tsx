import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Clock, CalendarDays, Film } from "lucide-react";

import { getMovieDetails } from "@/lib/tmdb";
import { posterUrl, backdropUrl } from "@/lib/tmdb-image";
import {
  formatRating,
  formatJalaliDate,
  formatRuntime,
  toPersianDigits,
} from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CastList } from "@/components/cast-list";
import { VideoList } from "@/components/video-list";
import { MovieCard } from "@/components/movie-card";

async function loadMovie(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) return null;
  try {
    return await getMovieDetails(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]">): Promise<Metadata> {
  const { id } = await params;
  const movie = await loadMovie(id);
  if (!movie) return { title: "فیلم یافت نشد" };
  return {
    title: movie.title,
    description: movie.overview || undefined,
  };
}

export default async function MovieDetailsPage({
  params,
}: PageProps<"/movie/[id]">) {
  const { id } = await params;
  const movie = await loadMovie(id);
  if (!movie) notFound();

  const poster = posterUrl(movie.poster_path, "w500");
  const backdrop = backdropUrl(movie.backdrop_path);
  const cast = movie.credits?.cast ?? [];
  const videos = movie.videos?.results ?? [];
  const similar = movie.similar?.results ?? [];

  return (
    <div>
      <section className="relative isolate h-64 w-full overflow-hidden sm:h-80">
        {backdrop ? (
          <Image
            src={backdrop}
            alt={movie.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
      </section>

      <div className="relative mx-auto -mt-24 max-w-7xl px-4 pb-12 sm:-mt-32 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="relative mx-auto h-64 w-44 shrink-0 overflow-hidden rounded-xl border bg-muted shadow-lg sm:mx-0 sm:h-72 sm:w-48">
            {poster ? (
              <Image
                src={poster}
                alt={movie.title}
                fill
                sizes="192px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                بدون تصویر
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3 text-center sm:pt-8 sm:text-right">
            <h1 className="text-2xl font-bold sm:text-3xl">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-sm italic text-muted-foreground">
                {movie.tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                {formatRating(movie.vote_average)}
                <span className="text-xs">
                  ({toPersianDigits(movie.vote_count)} رأی)
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {formatJalaliDate(movie.release_date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {formatRuntime(movie.runtime)}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-10">
          <section>
            <h2 className="mb-3 text-lg font-bold">خلاصه داستان</h2>
            <p className="leading-8 text-muted-foreground">
              {movie.overview || "خلاصه‌ای برای این فیلم ثبت نشده است."}
            </p>
          </section>

          {cast.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="mb-4 text-lg font-bold">بازیگران</h2>
                <CastList cast={cast} />
              </section>
            </>
          )}

          {videos.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Film className="size-5" />
                  ویدیوهای مرتبط
                </h2>
                <p className="mb-4 text-xs text-muted-foreground">
                  با کلیک روی هر مورد، ویدیو در یوتیوب باز می‌شود.
                </p>
                <VideoList videos={videos} />
              </section>
            </>
          )}

          {similar.length > 0 && (
            <>
              <Separator />
              <section>
                <h2 className="mb-4 text-lg font-bold">فیلم‌های مشابه</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {similar.slice(0, 10).map((item) => (
                    <MovieCard key={item.id} movie={item} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
