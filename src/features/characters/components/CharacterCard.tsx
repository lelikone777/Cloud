import Image from "next/image";
import Link from "next/link";
import type { Character } from "../types";
import { StatusBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/classnames";
import { cardStyles } from "@/lib/theme";

const statusColors: Record<string, string> = {
  Alive: "bg-emerald-400",
  Dead: "bg-rose-500",
  unknown: "bg-slate-500",
};

export function CharacterCard({ character, firstEpisode }: { character: Character; firstEpisode?: string }) {
  return (
    <Link href={`/characters/${character.id}`} className="group block focus-visible:outline-none">
      <article
        className={cn(
          cardStyles.shell,
          "transition duration-200 group-hover:-translate-y-1 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-accent-500"
        )}
      >
        <Image
          src={character.image}
          alt={character.name}
          width={400}
          height={300}
          className={cardStyles.image}
        />
        <div className={cardStyles.body}>
          <div className="space-y-1">
            <h3 className={cardStyles.title}>{character.name}</h3>
            <StatusBadge
              label={`${character.status} - ${character.species}`}
              colorClass={statusColors[character.status] ?? statusColors.unknown}
            />
          </div>
          <div className="space-y-3">
            <div>
              <p className={cardStyles.metaLabel}>Last known location:</p>
              <p className={cardStyles.metaValue}>{character.location.name}</p>
            </div>
            <div>
              <p className={cardStyles.metaLabel}>First seen in:</p>
              <p className={cardStyles.metaValue}>{firstEpisode ?? "—"}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
