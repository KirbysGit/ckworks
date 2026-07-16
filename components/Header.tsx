"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import DrawUnderline from "./ui/DrawUnderline";
import { nav } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  // Keep underline in sync with the hash when navigating, but never force
  // Home to stay underlined on first load.
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const match = nav.find((item) => item.href.endsWith(hash));
      if (match) setActiveHref(match.href);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ivory/85 backdrop-blur-md">
      <div className="container-ck flex h-20 items-center justify-between py-4">
        <Link href="/#home" aria-label="CK Works home">
          <Logo />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const isActive = activeHref === item.href;
            const isHovered = hoveredHref === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveHref(item.href)}
                onMouseEnter={() => setHoveredHref(item.href)}
                onMouseLeave={() => setHoveredHref(null)}
                className={`border-r border-line/80 px-6 py-1 font-sans text-sm font-medium tracking-wide transition-colors duration-200 last:border-r-0 ${
                  isActive ? "text-ink" : "text-ink/70 hover:text-ink"
                }`}
              >
                <span className="relative inline-block">
                  {item.label}
                  <DrawUnderline show={isActive || isHovered} />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/#contact">
            Start a project <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ivory lg:hidden">
          <nav
            className="container-ck flex flex-col gap-1 py-4"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActiveHref(item.href);
                  setOpen(false);
                }}
                className="rounded-lg px-2 py-2.5 font-sans text-base text-ink hover:bg-forest-soft/50"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/#contact" className="mt-3 w-full">
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
