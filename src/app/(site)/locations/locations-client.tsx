"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiltersPanel } from "@/components/filters/FiltersPanel";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { layoutStyles } from "@/lib/theme";
import { getLocations } from "@/features/locations/api";
import { LocationCard } from "@/features/locations/components/LocationCard";
import type { LocationResponse } from "@/features/locations/types";

export function LocationsClient() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<LocationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const page = Number(searchParams.get("page") ?? 1);
  const name = searchParams.get("name") ?? "";
  const type = searchParams.get("type") ?? "";
  const dimension = searchParams.get("dimension") ?? "";

  useEffect(() => {
    let active = true;
    setLoading(true);
    getLocations({
      page,
      name: name || undefined,
      type: type || undefined,
      dimension: dimension || undefined,
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
  }, [page, name, type, dimension]);

  const results = data?.results ?? [];
  const totalPages = data?.info.pages ?? 1;

  return (
    <section className={layoutStyles.section}>
      <header className={layoutStyles.sectionHeader}>
        <div>
          <h1 className="text-3xl font-semibold">Locations</h1>
          <p className="text-slate-400">Discover planets, dimensions, and landmarks.</p>
        </div>
        <p className="text-sm text-slate-500">{data?.info.count ?? 0} total</p>
      </header>

      <FiltersPanel key={`${name}-${type}-${dimension}`}>
        <SearchInput name="name" placeholder="Search by name" defaultValue={name} />
        <SearchInput name="type" placeholder="Type" defaultValue={type} />
        <SearchInput name="dimension" placeholder="Dimension" defaultValue={dimension} />
        <div />
      </FiltersPanel>

      {loading ? (
        <div className="rounded-3xl border border-base-800 bg-base-850 p-10 text-center text-slate-400">
          Loading locations...
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-3xl border border-base-800 bg-base-850 p-10 text-center text-slate-400">
          No locations found. Try adjusting the filters.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {results.map((location) => (
            <LocationCard key={location.id} location={location} />
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
          if (type) search.set("type", type);
          if (dimension) search.set("dimension", dimension);
          return `/locations?${search.toString()}`;
        }}
      />
    </section>
  );
}
