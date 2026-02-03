"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/classnames";
import { navItems } from "@/lib/navigation";
import { navStyles } from "@/lib/theme";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-base-800 bg-base-900/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link className="text-lg font-semibold" href="/characters">
          Rick & Morty DB
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(navStyles.link, pathname.startsWith(item.href) && navStyles.linkActive)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-base-700 text-white transition hover:border-base-500 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-5 w-5">
            <span
              className={cn(
                "absolute left-0 top-1 h-0.5 w-5 bg-white transition",
                open && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-2.5 h-0.5 w-5 bg-white transition",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-4 h-0.5 w-5 bg-white transition",
                open && "-translate-y-2 -rotate-45"
              )}
            />
          </span>
        </button>
      </div>
      <div
        className={cn(
          "overflow-hidden border-t border-base-800 bg-base-900 transition-all duration-300 md:hidden",
          open ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-3 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(navStyles.link, pathname.startsWith(item.href) && navStyles.linkActive)}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
