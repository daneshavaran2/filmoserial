import type { Metadata } from "next";

import { getMovieGenres, getMoviesByGenre } from "@/lib/tmdb";
import { backdropUrl } from "@/lib/tmdb-image";
import { MovieRow } from "@/components/movie-row";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import type { Genre } from "@/lib/tmdb-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "فیلم‌بین | مرجع فیلم‌ها بر اساس ژانر",
};

const PREFERRED_GENRE_ORDER = [
  28, 35, 18, 27, 10749, 878, 16, 80, 14, 53, 12, 10751, 9648, 99, 37,
];

const HERO_SLIDE_COUNT = 5;

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

  const heroSlides: HeroSlide[] = popular.results
    .filter((movie) => movie.backdrop_path)
    .slice(0, HERO_SLIDE_COUNT)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
      backdrop: backdropUrl(movie.backdrop_path)!,
      genreNames: genres
        .filter((g) => movie.genre_ids.includes(g.id))
        .slice(0, 3)
        .map((g) => g.name),
    }));

  return (
    <div className="pb-12">
      <HeroCarousel slides={heroSlides} />

      <div className="flex flex-col gap-8 pt-4 sm:gap-10">
        <MovieRow
          title="۱۰ فیلم برتر امروز"
          movies={popular.results}
          seeAllHref="/genre/popular"
          ranked
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
