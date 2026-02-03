import { FiltersPanel } from "@/components/filters/FiltersPanel";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { getParam } from "@/lib/query";
import { layoutStyles } from "@/lib/theme";
import { getCharacters } from "@/features/characters/api";
import { CharacterCard } from "@/features/characters/components/CharacterCard";
import { getEpisodesByIds } from "@/features/episodes/api";

const statusOptions = [
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
];

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Number(getParam(params, "page") ?? 1);
  const name = getParam(params, "name") ?? "";
  const status = getParam(params, "status") ?? "";
  const species = getParam(params, "species") ?? "";
  const gender = getParam(params, "gender") ?? "";

  const data = await getCharacters({
    page,
    name: name || undefined,
    status: status || undefined,
    species: species || undefined,
    gender: gender || undefined,
  }).catch(() => null);

  const results = data?.results ?? [];
  const totalPages = data?.info.pages ?? 1;

  const episodeIds = results
    .map((character) => character.episode[0])
    .filter(Boolean)
    .map((url) => Number(url.split("/").pop()))
    .filter((id) => !Number.isNaN(id));

  const uniqueEpisodeIds = Array.from(new Set(episodeIds));
  const episodes = await getEpisodesByIds(uniqueEpisodeIds).catch(() => []);
  const episodeLookup = new Map(episodes.map((episode) => [episode.id, episode.name]));

  return (
    <section className={layoutStyles.section}>
      <header className={layoutStyles.sectionHeader}>
        <div>
          <h1 className="text-3xl font-semibold">Characters</h1>
          <p className="text-slate-400">Search, filter, and explore every character.</p>
        </div>
        <p className="text-sm text-slate-500">{data?.info.count ?? 0} total</p>
      </header>

      <FiltersPanel>
        <SearchInput name="name" placeholder="Search by name" defaultValue={name} />
        <SearchInput name="species" placeholder="Species" defaultValue={species} />
        <Select name="status" options={statusOptions} defaultValue={status} />
        <Select name="gender" options={genderOptions} defaultValue={gender} />
      </FiltersPanel>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-base-800 bg-base-850 p-10 text-center text-slate-400">
          No characters found. Try adjusting the filters.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {results.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              firstEpisode={episodeLookup.get(Number(character.episode[0]?.split("/").pop()))}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        buildHref={(targetPage) => {
          const search = new URLSearchParams();
          search.set("page", String(targetPage));
          if (name) search.set("name", name);
          if (status) search.set("status", status);
          if (species) search.set("species", species);
          if (gender) search.set("gender", gender);
          return `/characters?${search.toString()}`;
        }}
      />
    </section>
  );
}
