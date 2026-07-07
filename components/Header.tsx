"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { nav } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ivory/85 backdrop-blur-md">
      <div className="container-ck flex h-20 items-center justify-between py-4">
        <Link href="#home" aria-label="CK Works home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm text-muted transition-colors hover:text-ink ${
                i === 0 ? "font-medium text-ink" : ""
              }`}
            >
              {item.label}
              {i === 0 && (
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-forest" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact">
            Start a project <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile toggle */}
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

      {/* Mobile menu */}
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
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-base text-ink hover:bg-forest-soft/50"
              >
                {item.label}
              </Link>
            ))}
            <Button href="#contact" className="mt-3 w-full">
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
