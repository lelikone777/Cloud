import { fetchApi } from "@/lib/api";
import { buildQuery } from "@/lib/query";
import type { Episode, EpisodeResponse } from "./types";

type EpisodeQuery = {
  page?: number;
  name?: string;
  episode?: string;
};

export async function getEpisodes(params: EpisodeQuery) {
  const query = buildQuery({
    page: params.page,
    name: params.name,
    episode: params.episode,
  });

  return fetchApi<EpisodeResponse>(`/episode${query}`, { cache: "no-store" });
}

export async function getEpisodesByIds(ids: number[]) {
  if (ids.length === 0) return [] as Episode[];
  const joined = ids.join(",");
  const response = await fetchApi<Episode | Episode[]>(`/episode/${joined}`, { cache: "no-store" });
  return Array.isArray(response) ? response : [response];
}
