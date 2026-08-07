import "server-only";

import type {
  Genre,
  Movie,
  MovieDetails,
  PaginatedResult,
} from "./tmdb-types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const READ_ACCESS_TOKEN = process.env.TMDB_API_READ_ACCESS_TOKEN;

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const REVALIDATE_SECONDS = 60 * 60;

async function tmdbFetch<T>(
  path: string,
  searchParams: Record<string, string | number | undefined> = {}
): Promise<T> {
  if (!READ_ACCESS_TOKEN) {
    throw new Error(
      "TMDB_API_READ_ACCESS_TOKEN is not set. Add it to your environment variables."
    );
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("language", "fa-IR");
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`خطا در ارتباط با TMDB (${res.status}): ${path}`);
  }

  return res.json() as Promise<T>;
}

export function posterUrl(
  path: string | null,
  size: "w185" | "w342" | "w500" | "original" = "w342"
) {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function backdropUrl(
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280"
) {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function profileUrl(
  path: string | null,
  size: "w185" | "h632" = "w185"
) {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export async function getMovieGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>("/genre/movie/list");
  return data.genres;
}

export async function getMoviesByGenre(
  genreId: number | undefined,
  page = 1
): Promise<PaginatedResult<Movie>> {
  if (!genreId) {
    return tmdbFetch<PaginatedResult<Movie>>("/movie/popular", { page });
  }
  return tmdbFetch<PaginatedResult<Movie>>("/discover/movie", {
    page,
    with_genres: genreId,
    sort_by: "popularity.desc",
  });
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<PaginatedResult<Movie>> {
  return tmdbFetch<PaginatedResult<Movie>>("/search/movie", { query, page });
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(`/movie/${id}`, {
    append_to_response: "credits,videos,similar",
  });
}
