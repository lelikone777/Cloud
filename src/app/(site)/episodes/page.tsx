import { Suspense } from "react";
import { EpisodesClient } from "./episodes-client";
import { layoutStyles } from "@/lib/theme";

export default function EpisodesPage() {
  return (
    <Suspense
      fallback={
        <section className={layoutStyles.section}>
          <div className="rounded-3xl border border-base-800 bg-base-850 p-10 text-center text-slate-400">
            Loading episodes...
          </div>
        </section>
      }
    >
      <EpisodesClient />
    </Suspense>
  );
}
