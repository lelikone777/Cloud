"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiltersPanel } from "@/components/filters/FiltersPanel";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { layoutStyles } from "@/lib/theme";
import { getCharacters } from "@/features/characters/api";
import { CharacterCard } from "@/features/characters/components/CharacterCard";
import { getEpisodesByIds } from "@/features/episodes/api";
import type { CharacterResponse } from "@/features/characters/types";
import type { Episode } from "@/features/episodes/types";

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

export default function CharactersPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<CharacterResponse | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  const page = Number(searchParams.get("page") ?? 1);
  const name = searchParams.get("name") ?? "";
  const status = searchParams.get("status") ?? "";
  const species = searchParams.get("species") ?? "";
  const gender = searchParams.get("gender") ?? "";

  useEffect(() => {
    let active = true;
    setLoading(true);
    getCharacters({
      page,
      name: name || undefined,
      status: status || undefined,
      species: species || undefined,
      gender: gender || undefined,
    })
      .then((response) => {
        if (!active) return;
        setData(response);
      })
      .catch(() => {
        if (!active) return;
        setData(null);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, name, status, species, gender]);

  const results = data?.results ?? [];
  const totalPages = data?.info.pages ?? 1;

  const episodeIds = useMemo(
    () =>
      results
        .map((character) => character.episode[0])
        .filter(Boolean)
        .map((url) => Number(url.split("/").pop()))
        .filter((id) => !Number.isNaN(id)),
    [results]
  );

  useEffect(() => {
    let active = true;
    if (episodeIds.length === 0) {
      setEpisodes([]);
      return;
    }

    const uniqueEpisodeIds = Array.from(new Set(episodeIds));
    getEpisodesByIds(uniqueEpisodeIds)
      .then((response) => {
        if (!active) return;
        setEpisodes(response);
      })
      .catch(() => {
        if (!active) return;
        setEpisodes([]);
      });

    return () => {
      active = false;
    };
  }, [episodeIds]);

  const episodeLookup = useMemo(
    () => new Map(episodes.map((episodeItem) => [episodeItem.id, episodeItem.name])),
    [episodes]
  );

  return (
    <section className={layoutStyles.section}>
      <header className={layoutStyles.sectionHeader}>
        <div>
          <h1 className="text-3xl font-semibold">Characters</h1>
          <p className="text-slate-400">Search, filter, and explore every character.</p>
        </div>
        <p className="text-sm text-slate-500">{data?.info.count ?? 0} total</p>
      </header>

      <FiltersPanel key={`${name}-${status}-${species}-${gender}`}>
        <SearchInput name="name" placeholder="Search by name" defaultValue={name} />
        <SearchInput name="species" placeholder="Species" defaultValue={species} />
        <Select name="status" options={statusOptions} defaultValue={status} />
        <Select name="gender" options={genderOptions} defaultValue={gender} />
      </FiltersPanel>

      {loading ? (
        <div className="rounded-3xl border border-base-800 bg-base-850 p-10 text-center text-slate-400">
          Loading characters...
        </div>
      ) : results.length === 0 ? (
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
