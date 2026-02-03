import Link from "next/link";
import { buttonStyles } from "@/lib/theme";
import { cn } from "@/lib/classnames";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-base-850 p-8 shadow-card">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Rick & Morty Database</p>
        <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
          Explore the multiverse of characters, locations, and episodes
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Browse the official Rick and Morty API with curated filters, search, and fast pagination.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className={cn(buttonStyles.base, buttonStyles.primary)} href="/characters">
            Browse characters
          </Link>
          <Link className={cn(buttonStyles.base, buttonStyles.ghost)} href="/locations">
            View locations
          </Link>
        </div>
      </div>
    </section>
  );
}
