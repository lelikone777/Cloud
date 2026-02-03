import { Suspense } from "react";
import { LocationsClient } from "./locations-client";
import { layoutStyles } from "@/lib/theme";

export default function LocationsPage() {
  return (
    <Suspense
      fallback={
        <section className={layoutStyles.section}>
          <div className="rounded-3xl border border-base-800 bg-base-850 p-10 text-center text-slate-400">
            Loading locations...
          </div>
        </section>
      }
    >
      <LocationsClient />
    </Suspense>
  );
}
