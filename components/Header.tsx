"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import Logo from "./ui/Logo";
import DrawUnderline from "./ui/DrawUnderline";
import { primaryNav } from "@/lib/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/services") return pathname.startsWith("/services");
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function closeMobileMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ivory/85 backdrop-blur-md">
      <div className="container-ck flex h-20 items-center justify-between py-4">
        <Link href="/" aria-label="CK Works home">
          <Logo />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            const isHovered = hoveredHref === item.href;
            const hasChildren = "children" in item && Boolean(item.children);

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHoveredHref(item.href)}
                onMouseLeave={() => setHoveredHref(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 border-r border-line/80 px-6 py-1 font-sans text-sm font-medium tracking-wide transition-colors duration-200 last:border-r-0 ${
                    active ? "text-ink" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  <span className="relative inline-block">
                    {item.label}
                    <DrawUnderline show={active || isHovered} />
                  </span>
                  {hasChildren && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isHovered ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {hasChildren && (
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        key={`${item.href}-menu`}
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{
                          duration: 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute left-1/2 top-full z-50 mt-4 w-[22rem] -translate-x-1/2 rounded-2xl border border-line bg-card p-3 shadow-lift"
                      >
                        <Link
                          href="/services"
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-forest-soft/45"
                        >
                          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-forest">
                            Services
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-muted">
                            Explore the CK Works service structure.
                          </span>
                        </Link>
                        <div className="mt-1 grid gap-1">
                          {item.children?.map((service) => (
                            <Link
                              key={service.slug}
                              href={service.href}
                              className="group rounded-xl px-4 py-2.5 transition-colors hover:bg-forest-soft/45"
                            >
                              <span className="flex items-center justify-between gap-3 text-sm font-medium text-ink">
                                {service.title}
                                <ArrowRight className="h-3.5 w-3.5 text-forest transition-transform duration-200 group-hover:translate-x-1" />
                              </span>
                              <span className="mt-0.5 block text-xs leading-5 text-muted">
                                {service.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-medium text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
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

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-nav"
            className="overflow-hidden border-t border-line bg-ivory lg:hidden"
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.nav
              className="container-ck flex flex-col gap-1 py-4"
              aria-label="Mobile"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.035,
                    delayChildren: 0.04,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.02,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {primaryNav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -6 },
                  }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-2 py-2.5 font-sans text-base text-ink hover:bg-forest-soft/50"
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children && (
                    <div className="ml-3 border-l border-line/80 pl-3">
                      {item.children.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.href}
                          onClick={closeMobileMenu}
                          className="block rounded-lg px-2 py-2 text-sm text-muted transition-colors hover:bg-forest-soft/50 hover:text-ink"
                        >
                          {service.shortTitle}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -6 },
                }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-medium text-ivory shadow-soft transition-colors hover:bg-ink"
                >
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
