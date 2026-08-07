import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { posterUrl } from "@/lib/tmdb-image";
import { formatRating, formatJalaliYear } from "@/lib/format";
import type { Movie } from "@/lib/tmdb-types";

export function MovieCard({ movie }: { movie: Movie }) {
  const poster = posterUrl(movie.poster_path);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block rounded-md transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.06] focus-visible:z-10 focus-visible:scale-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
    >
      <div className="overflow-hidden rounded-md border border-transparent bg-card shadow-md transition-colors duration-300 group-hover:border-white/15 group-hover:shadow-xl group-hover:shadow-black/60 group-focus-visible:border-white/15 group-focus-visible:shadow-xl group-focus-visible:shadow-black/60">
        <div className="relative aspect-2/3 w-full overflow-hidden bg-muted">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 45vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-focus-visible:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-center text-xs text-muted-foreground p-2">
              بدون تصویر
            </div>
          )}
          {movie.vote_average > 0 && (
            <div className="absolute top-1.5 right-1.5 flex items-center gap-1 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-medium text-white">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              {formatRating(movie.vote_average)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5 p-2">
          <h3 className="line-clamp-1 text-xs font-semibold sm:text-sm">
            {movie.title}
          </h3>
          <p className="text-[0.7rem] text-muted-foreground sm:text-xs">
            {formatJalaliYear(movie.release_date)}
          </p>
        </div>
      </div>
    </Link>
  );
}
