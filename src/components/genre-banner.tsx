import Image from "next/image";

import { toPersianDigits } from "@/lib/format";

export function GenreBanner({
  title,
  movieCount,
  backdrop,
}: {
  title: string;
  movieCount: number;
  backdrop: string | null;
}) {
  return (
    <section className="relative h-48 w-full overflow-hidden sm:h-64">
      {backdrop ? (
        <Image
          src={backdrop}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
      ) : (
        <div className="h-full w-full bg-muted" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
      <div className="relative flex h-full max-w-7xl flex-col justify-end gap-1 px-4 pb-6 sm:px-8">
        <h1 className="text-balance text-3xl font-black drop-shadow-md sm:text-4xl">
          {title}
        </h1>
        {movieCount > 0 && (
          <p className="text-sm text-muted-foreground">
            {toPersianDigits(movieCount)} فیلم
          </p>
        )}
      </div>
    </section>
  );
}
