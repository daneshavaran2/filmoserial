import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { posterUrl } from "@/lib/tmdb";
import { formatRating, formatJalaliYear } from "@/lib/format";
import type { Movie } from "@/lib/tmdb-types";
import { Card } from "@/components/ui/card";

export function MovieCard({ movie }: { movie: Movie }) {
  const poster = posterUrl(movie.poster_path);

  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <Card className="gap-0 overflow-hidden py-0 transition-shadow group-hover:shadow-lg">
        <div className="relative aspect-2/3 w-full overflow-hidden bg-muted">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 45vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-center text-xs text-muted-foreground p-2">
              بدون تصویر
            </div>
          )}
          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              {formatRating(movie.vote_average)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5 p-3">
          <h3 className="line-clamp-1 text-sm font-semibold">{movie.title}</h3>
          <p className="text-xs text-muted-foreground">
            {formatJalaliYear(movie.release_date)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
