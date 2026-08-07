import Image from "next/image";
import { User } from "lucide-react";

import { profileUrl } from "@/lib/tmdb-image";
import type { CastMember } from "@/lib/tmdb-types";

export function CastList({ cast }: { cast: CastMember[] }) {
  if (cast.length === 0) return null;

  return (
    <div className="scrollbar-none -mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
      {cast.slice(0, 15).map((member) => {
        const photo = profileUrl(member.profile_path);
        return (
          <div key={member.id} className="w-24 shrink-0 text-center">
            <div className="relative mx-auto mb-2 size-24 overflow-hidden rounded-full bg-muted">
              {photo ? (
                <Image
                  src={photo}
                  alt={member.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="size-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <p className="line-clamp-1 text-xs font-medium">{member.name}</p>
            <p className="line-clamp-1 text-xs text-muted-foreground">
              {member.character}
            </p>
          </div>
        );
      })}
    </div>
  );
}
