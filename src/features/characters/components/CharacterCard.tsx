import Image from "next/image";
import type { Character } from "../types";
import { StatusBadge } from "@/components/ui/Badge";
import { cardStyles } from "@/lib/theme";

const statusColors: Record<string, string> = {
  Alive: "bg-emerald-400",
  Dead: "bg-rose-500",
  unknown: "bg-slate-500",
};

export function CharacterCard({ character, firstEpisode }: { character: Character; firstEpisode?: string }) {
  return (
    <article className={cardStyles.shell}>
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
  );
}
