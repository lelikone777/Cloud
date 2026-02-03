export const layoutStyles = {
  page: "min-h-screen bg-base-950 text-white",
  content: "mx-auto w-full max-w-6xl px-4 py-8",
  section: "space-y-6",
  sectionHeader: "flex flex-wrap items-center justify-between gap-4",
};

export const cardStyles = {
  shell: "mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl bg-base-850 shadow-card sm:max-w-none",
  image: "aspect-[4/3] w-full object-cover",
  body: "space-y-5 px-5 pb-6 pt-5 sm:px-6",
  title: "text-2xl font-semibold text-white",
  subtitle: "text-sm font-medium text-slate-200",
  metaLabel: "text-sm text-slate-400",
  metaValue: "text-lg text-white",
};

export const badgeStyles = {
  base: "inline-flex items-center gap-2 text-sm font-medium text-slate-200",
  dot: "h-2.5 w-2.5 rounded-full",
};

export const buttonStyles = {
  base:
    "inline-flex items-center justify-center rounded-full border border-transparent px-4 py-2 text-sm font-semibold transition duration-200",
  primary: "bg-accent-500 text-base-950 hover:bg-accent-600",
  ghost: "border-base-700 text-slate-200 hover:border-base-500 hover:text-white",
};

export const inputStyles = {
  base:
    "w-full rounded-2xl border border-base-700 bg-base-900 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-accent-500 focus:outline-none",
  select:
    "w-full rounded-2xl border border-base-700 bg-base-900 px-4 py-2 text-sm text-white focus:border-accent-500 focus:outline-none",
};

export const navStyles = {
  link: "text-sm font-semibold text-slate-200 transition hover:text-white",
  linkActive: "text-white",
};
