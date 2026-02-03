import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export function FiltersPanel({ children }: { children: ReactNode }) {
  return (
    <form className="space-y-4 rounded-3xl bg-base-850 p-5 shadow-card">
      <div className="grid gap-4 md:grid-cols-4">{children}</div>
      <div className="flex justify-end">
        <Button type="submit">Apply filters</Button>
      </div>
    </form>
  );
}
