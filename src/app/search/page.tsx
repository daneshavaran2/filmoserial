import type { Metadata } from "next";
import { Search } from "lucide-react";

import { searchMovies } from "@/lib/tmdb";
import { MovieCard } from "@/components/movie-card";
import { PaginationControls } from "@/components/pagination-controls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "جستجوی فیلم",
};

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const sp = await searchParams;
  const query = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.trim() ?? "";
  const pageParam = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const page = Math.min(Math.max(Number(pageParam) || 1, 1), 500);

  const result = query
    ? await searchMovies(query, page)
    : { page: 1, results: [], total_pages: 0, total_results: 0 };

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams({ q: query });
    if (targetPage > 1) params.set("page", String(targetPage));
    return `/search?${params.toString()}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-10 sm:px-8">
      <form action="/search" className="mx-auto mb-8 flex max-w-xl gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="نام فیلم را جستجو کنید…"
            autoFocus
            className="pr-9"
          />
        </div>
        <Button type="submit">جستجو</Button>
      </form>

      {!query && (
        <p className="py-16 text-center text-muted-foreground">
          برای دیدن نتایج، نام یک فیلم را جستجو کنید.
        </p>
      )}

      {query && result.results.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          فیلمی با عنوان «{query}» پیدا نشد.
        </p>
      )}

      {query && result.results.length > 0 && (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            نتایج جستجو برای «{query}»
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {result.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <PaginationControls
            page={result.page}
            totalPages={Math.min(result.total_pages, 500)}
            buildHref={buildHref}
          />
        </>
      )}
    </div>
  );
}
