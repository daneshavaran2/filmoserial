import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";

import type { VideoItem } from "@/lib/tmdb-types";
import { Badge } from "@/components/ui/badge";

const TYPE_LABELS: Record<string, string> = {
  Trailer: "تریلر",
  Teaser: "تیزر",
  Clip: "کلیپ",
  Featurette: "ویژه‌برنامه",
  "Behind the Scenes": "پشت‌صحنه",
  Bloopers: "لحظات خنده‌دار",
  Opening: "آغازین",
};

export function VideoList({ videos }: { videos: VideoItem[] }) {
  const youtubeVideos = videos.filter((video) => video.site === "YouTube");
  if (youtubeVideos.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {youtubeVideos.map((video) => (
        <li key={video.id}>
          <a
            href={`https://www.youtube.com/watch?v=${video.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border p-2 transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt={video.name}
                fill
                sizes="112px"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Play className="size-6 fill-white text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium">{video.name}</p>
              <Badge variant="secondary" className="mt-1">
                {TYPE_LABELS[video.type] ?? video.type}
              </Badge>
            </div>
            <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
          </a>
        </li>
      ))}
    </ul>
  );
}
