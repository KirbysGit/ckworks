"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Monitor,
  Search,
  ChartColumnIncreasing,
  Puzzle,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import Logo from "../ui/Logo";
import DrawUnderline from "../ui/DrawUnderline";
import { primaryNav } from "@/lib/navigation";
import type { ServiceArea, ServiceSlug } from "@/lib/services";

type ServiceDropdownItem = {
  number: string;
  description: string;
  icon: LucideIcon;
  blockyIcon?: boolean;
};

/**
 * Services dropdown tuning knobs.
 * x/y are relative to the Services nav item:
 *   x: negative moves left, positive moves right
 *   y: controls the gap below the nav row
 */
const servicesDropdownLayout = {
  width: "26rem",
  x: "-1.85rem",
  y: "0.8rem",
  padding: "1.25rem",
  notchSize: "0.9rem",
} as const;

const serviceDropdownItems: Record<ServiceSlug, ServiceDropdownItem> = {
  "web-design-development": {
    number: "01",
    description: "Fast, modern sites built to convert.",
    icon: Monitor,
  },
  "search-ai-visibility": {
    number: "02",
    description: "Get found in search and AI results.",
    icon: Search,
  },
  "analytics-lead-tracking": {
    number: "03",
    description: "Measure what matters. Improve results.",
    icon: ChartColumnIncreasing,
  },
  "digital-systems-integrations": {
    number: "04",
    description: "Connect tools. Automate workflows.",
    icon: Puzzle,
    blockyIcon: true,
  },
  "ongoing-support": {
    number: "05",
    description: "Reliable care for long-term growth.",
    icon: Headphones,
  },
};

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
                      <ServicesDropdown services={item.children ?? []} />
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

function ServicesDropdown({ services }: { services: ServiceArea[] }) {
  const dropdownX = `calc(-50% + ${servicesDropdownLayout.x})`;

  return (
    <motion.div
      key="services-menu"
      initial={{ opacity: 0, x: dropdownX, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, x: dropdownX, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: dropdownX, y: 10, scale: 0.985 }}
      transition={{
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-1/2 top-full z-50 overflow-hidden rounded-[1.1rem] border border-line bg-card shadow-[0_24px_60px_-28px_rgba(31,36,32,0.32)]"
      style={{
        width: servicesDropdownLayout.width,
        marginTop: servicesDropdownLayout.y,
      }}
    >
      <span
        className="absolute left-1/2 -translate-x-1/2 rotate-45 border-l border-t border-line bg-card"
        style={{
          top: `calc(${servicesDropdownLayout.notchSize} / -2)`,
          width: servicesDropdownLayout.notchSize,
          height: servicesDropdownLayout.notchSize,
        }}
        aria-hidden
      />

      <div
        className="relative"
        style={{ padding: servicesDropdownLayout.padding }}
      >
        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-forest/85">
          Services
        </p>

        <Link
          href="/services"
          className="group relative mt-3.5 flex items-center gap-2.5 pb-1"
        >
          <span className="font-serif text-xl font-bold leading-none text-ink">
            All Services
          </span>
          <ArrowRight className="h-4 w-4 text-ink transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="border-t border-line/80">
        {services.map((service) => {
          const config = serviceDropdownItems[service.slug];
          const Icon = config.icon;

          return (
            <Link
              key={service.slug}
              href={service.href}
              className="group grid grid-cols-[2.45rem_2.2rem_minmax(0,1fr)] items-center gap-3 border-b border-line/80 py-3.5 transition-colors duration-200 last:border-b-0 hover:bg-forest-soft/25"
              style={{
                paddingLeft: servicesDropdownLayout.padding,
                paddingRight: servicesDropdownLayout.padding,
              }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-sand font-source-serif-display text-[0.95rem] font-semibold tabular-nums leading-none tracking-tight text-forest shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
                style={{ fontVariationSettings: '"opsz" 14' }}
              >
                {config.number}
              </span>
              <Icon
                className="h-5 w-5 text-forest transition-transform duration-200 group-hover:-translate-y-0.5"
                strokeLinecap={config.blockyIcon ? "square" : "round"}
                strokeLinejoin={config.blockyIcon ? "miter" : "round"}
                strokeWidth={config.blockyIcon ? 1.7 : 1.45}
              />
              <span className="min-w-0">
                <span className="block font-serif text-lg font-medium leading-tight text-ink">
                  {service.title}
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-muted">
                  {config.description}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
