import type { Location } from "../types";
import { cardStyles } from "@/lib/theme";

export function LocationCard({ location }: { location: Location }) {
  return (
    <article className={cardStyles.shell}>
      <div className="h-44 w-full bg-gradient-to-br from-base-700 via-base-800 to-base-900" />
      <div className={cardStyles.body}>
        <h3 className={cardStyles.title}>{location.name}</h3>
        <div className="space-y-3">
          <div>
            <p className={cardStyles.metaLabel}>Type:</p>
            <p className={cardStyles.metaValue}>{location.type || "Unknown"}</p>
          </div>
          <div>
            <p className={cardStyles.metaLabel}>Dimension:</p>
            <p className={cardStyles.metaValue}>{location.dimension || "Unknown"}</p>
          </div>
          <div>
            <p className={cardStyles.metaLabel}>Residents:</p>
            <p className={cardStyles.metaValue}>{location.residents.length}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
