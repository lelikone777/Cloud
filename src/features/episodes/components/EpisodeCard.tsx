import type { Episode } from "../types";
import { cardStyles } from "@/lib/theme";

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <article className={cardStyles.shell}>
      <div className="h-44 w-full bg-gradient-to-br from-base-700 via-base-800 to-base-900" />
      <div className={cardStyles.body}>
        <h3 className={cardStyles.title}>{episode.name}</h3>
        <div className="space-y-3">
          <div>
            <p className={cardStyles.metaLabel}>Episode:</p>
            <p className={cardStyles.metaValue}>{episode.episode}</p>
          </div>
          <div>
            <p className={cardStyles.metaLabel}>Air date:</p>
            <p className={cardStyles.metaValue}>{episode.air_date}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
