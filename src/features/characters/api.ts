import { fetchApi } from "@/lib/api";
import { buildQuery } from "@/lib/query";
import type { Character, CharacterResponse } from "./types";

type CharacterQuery = {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
};

export async function getCharacters(params: CharacterQuery) {
  const query = buildQuery({
    page: params.page,
    name: params.name,
    status: params.status,
    species: params.species,
    gender: params.gender,
  });

  return fetchApi<CharacterResponse>(`/character${query}`, { cache: "no-store" });
}

export async function getCharacter(id: number, init?: RequestInit) {
  return fetchApi<Character>(`/character/${id}`, { cache: "force-cache", ...init });
}
