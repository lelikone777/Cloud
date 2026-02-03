import { fetchApi } from "@/lib/api";
import { buildQuery } from "@/lib/query";
import type { LocationResponse } from "./types";

type LocationQuery = {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
};

export async function getLocations(params: LocationQuery) {
  const query = buildQuery({
    page: params.page,
    name: params.name,
    type: params.type,
    dimension: params.dimension,
  });

  return fetchApi<LocationResponse>(`/location${query}`, { cache: "no-store" });
}
