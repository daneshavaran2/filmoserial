import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Genre } from "@/lib/tmdb-types";

export function GenreNav({
  genres,
  activeGenreId,
}: {
  genres: Genre[];
  activeGenreId?: number;
}) {
  return (
    <nav className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      <Link
        href="/genre/popular"
        className={cn(
          "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
          !activeGenreId
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
        )}
      >
        همه فیلم‌ها
      </Link>
      {genres.map((genre) => (
        <Link
          key={genre.id}
          href={`/genre/${genre.id}`}
          className={cn(
            "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            activeGenreId === genre.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {genre.name}
        </Link>
      ))}
    </nav>
  );
}
