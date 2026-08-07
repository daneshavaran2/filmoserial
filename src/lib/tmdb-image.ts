export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

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
