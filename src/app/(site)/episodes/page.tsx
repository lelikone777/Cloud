import { FiltersPanel } from "@/components/filters/FiltersPanel";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { layoutStyles } from "@/lib/theme";
import { getParam } from "@/lib/query";
import { getEpisodes } from "@/features/episodes/api";
import { EpisodeCard } from "@/features/episodes/components/EpisodeCard";

export default async function EpisodesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Number(getParam(params, "page") ?? 1);
  const name = getParam(params, "name") ?? "";
  const episode = getParam(params, "episode") ?? "";

  const data = await getEpisodes({
    page,
    name: name || undefined,
    episode: episode || undefined,
  }).catch(() => null);

  const results = data?.results ?? [];
  const totalPages = data?.info.pages ?? 1;

  return (
    <section className={layoutStyles.section}>
      <header className={layoutStyles.sectionHeader}>
        <div>
          <h1 className="text-3xl font-semibold">Episodes</h1>
          <p className="text-slate-400">Track every adventure across seasons.</p>
        </div>
        <p className="text-sm text-slate-500">{data?.info.count ?? 0} total</p>
      </header>

      <FiltersPanel>
        <SearchInput name="name" placeholder="Search by name" defaultValue={name} />
        <SearchInput name="episode" placeholder="Episode code (S01E01)" defaultValue={episode} />
        <div />
        <div />
      </FiltersPanel>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-base-800 bg-base-850 p-10 text-center text-slate-400">
          No episodes found. Try adjusting the filters.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {results.map((episodeItem) => (
            <EpisodeCard key={episodeItem.id} episode={episodeItem} />
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
          if (episode) search.set("episode", episode);
          return `/episodes?${search.toString()}`;
        }}
      />
    </section>
  );
}
