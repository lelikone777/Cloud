import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacter, getCharacters } from "@/features/characters/api";
import { getEpisodesByIds } from "@/features/episodes/api";
import { StatusBadge } from "@/components/ui/Badge";
import { buttonStyles, cardStyles, layoutStyles } from "@/lib/theme";
import { cn } from "@/lib/classnames";

const statusColors: Record<string, string> = {
  Alive: "bg-emerald-400",
  Dead: "bg-rose-500",
  unknown: "bg-slate-500",
};

type CharacterPageProps = {
  params: { id: string };
};

export default async function CharacterPage({ params }: CharacterPageProps) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    notFound();
  }

  const character = await getCharacter(id).catch(() => null);
  if (!character) {
    notFound();
  }

  const episodeIds = character.episode
    .map((url) => Number(url.split("/").pop()))
    .filter((value) => Number.isFinite(value)) as number[];
  const episodes = await getEpisodesByIds(episodeIds);

  return (
    <section className={layoutStyles.section}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/characters" className={cn(buttonStyles.base, buttonStyles.ghost)}>
          ← Back to characters
        </Link>
        <StatusBadge
          label={`${character.status} - ${character.species}`}
          colorClass={statusColors[character.status] ?? statusColors.unknown}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className={cardStyles.shell}>
          <Image
            src={character.image}
            alt={character.name}
            width={480}
            height={360}
            className={cardStyles.image}
            priority
          />
          <div className={cardStyles.body}>
            <h1 className={cardStyles.title}>{character.name}</h1>
            <p className={cardStyles.subtitle}>{character.type || "No type specified"}</p>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-base-800 bg-base-900/60 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className={cardStyles.metaLabel}>Gender</p>
              <p className={cardStyles.metaValue}>{character.gender}</p>
            </div>
            <div>
              <p className={cardStyles.metaLabel}>Origin</p>
              <p className={cardStyles.metaValue}>{character.origin.name}</p>
            </div>
            <div>
              <p className={cardStyles.metaLabel}>Last known location</p>
              <p className={cardStyles.metaValue}>{character.location.name}</p>
            </div>
            <div>
              <p className={cardStyles.metaLabel}>Episodes</p>
              <p className={cardStyles.metaValue}>{episodes.length}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Episodes list</h2>
            {episodes.length === 0 ? (
              <p className="text-sm text-slate-400">No episode data available.</p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {episodes.map((episode) => (
                  <li
                    key={episode.id}
                    className="rounded-2xl border border-base-800 bg-base-950/80 px-4 py-3"
                  >
                    <p className="text-sm text-slate-400">{episode.episode}</p>
                    <p className="text-base font-semibold text-white">{episode.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const firstPage = await getCharacters({ page: 1 });
  const totalPages = firstPage.info.pages;
  const allResults = [...firstPage.results];

  if (totalPages > 1) {
    const pages = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) => getCharacters({ page: index + 2 }))
    );
    pages.forEach((page) => allResults.push(...page.results));
  }

  return allResults.map((character) => ({ id: String(character.id) }));
}
