import type { Metadata } from "next";

import { getMovieGenres, getMoviesByGenre } from "@/lib/tmdb";
import { backdropUrl } from "@/lib/tmdb-image";
import { GenreNav } from "@/components/genre-nav";
import { GenreBanner } from "@/components/genre-banner";
import { MovieCard } from "@/components/movie-card";
import { PaginationControls } from "@/components/pagination-controls";

function parseGenreId(idParam: string): number | undefined {
  if (idParam === "popular") return undefined;
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : undefined;
}

export async function generateMetadata({
  params,
}: PageProps<"/genre/[id]">): Promise<Metadata> {
  const { id } = await params;
  if (id === "popular") return { title: "فیلم‌های پرطرفدار" };
  const genreId = parseGenreId(id);
  const genres = await getMovieGenres();
  const genre = genres.find((g) => g.id === genreId);
  return { title: genre ? `فیلم‌های ژانر ${genre.name}` : "فیلم‌ها" };
}

export default async function GenrePage({
  params,
  searchParams,
}: PageProps<"/genre/[id]">) {
  const { id } = await params;
  const sp = await searchParams;
  const pageParam = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const page = Math.min(Math.max(Number(pageParam) || 1, 1), 500);
  const genreId = parseGenreId(id);

  const [genres, movieResult] = await Promise.all([
    getMovieGenres(),
    getMoviesByGenre(genreId, page),
  ]);

  const activeGenre = genres.find((g) => g.id === genreId);
  const basePath = id === "popular" ? "/genre/popular" : `/genre/${id}`;
  const buildHref = (targetPage: number) =>
    targetPage > 1 ? `${basePath}?page=${targetPage}` : basePath;

  const bannerTitle = activeGenre
    ? `ژانر ${activeGenre.name}`
    : "فیلم‌های پرطرفدار";
  const bannerBackdrop = backdropUrl(
    movieResult.results[0]?.backdrop_path ?? null
  );

  return (
    <div>
      <GenreBanner
        title={bannerTitle}
        movieCount={movieResult.total_results}
        backdrop={bannerBackdrop}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-8">
        <GenreNav genres={genres} activeGenreId={genreId} />

        {movieResult.results.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            فیلمی برای نمایش یافت نشد.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
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
    </div>
  );
}
