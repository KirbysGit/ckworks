"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Palette,
  ShieldCheck,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import ProjectCard from "../projects/ProjectCard";
import {
  featuredCaseStudies,
  secondaryCaseStudies,
  type CaseStudy,
} from "@/lib/projects";
import { fadeUp, stagger, inView } from "@/lib/motion";

export default function WorkPreview() {
  return (
    <section id="work" className="relative overflow-hidden bg-ivory py-14 lg:py-20">
      <div className="container-ck relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="max-w-[80rem]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-forest">
            Selected Work
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            A few things I&apos;ve built, designed, or helped bring into shape.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-9 sm:hidden"
        >
          <MobileFeaturedCarousel />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-9 hidden gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-4"
        >
          {featuredCaseStudies.map((study) => (
            <motion.div key={study.slug} variants={fadeUp}>
              <ProjectCard study={study} variant="tile" />
            </motion.div>
          ))}
        </motion.div>

        {secondaryCaseStudies.length > 0 && (
          <div className="mt-14">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="max-w-[80rem]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                More Things I&apos;ve Built
              </p>
              <h3 className="mt-4 hidden font-serif text-4xl font-medium leading-tight text-ink sm:block sm:text-5xl">
                More things I&apos;ve built
              </h3>
              <p className="mt-3 hidden max-w-4xl text-base leading-7 text-muted sm:block sm:text-lg">
                A few extra builds, experiments, and systems that show the
                range of what I like working on.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-5 sm:hidden"
            >
              {secondaryCaseStudies.map((study) => (
                <motion.div key={study.slug} variants={fadeUp}>
                  <MobileProjectRow study={study} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-8 hidden items-stretch gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4"
            >
              {secondaryCaseStudies.map((study) => (
                <motion.div key={study.slug} variants={fadeUp}>
                  <ProjectCard study={study} variant="compact" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

function MobileFeaturedCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToProject(index: number) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const nextIndex = Math.max(
      0,
      Math.min(featuredCaseStudies.length - 1, index),
    );
    const slide = scroller.children[nextIndex] as HTMLElement | undefined;
    if (!slide) return;

    const target =
      slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2;

    scroller.scrollTo({ left: target, behavior: "smooth" });
    setActiveIndex(nextIndex);
  }

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    const slides = Array.from(scroller.children) as HTMLElement[];
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }

  return (
    <div>
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[9vw] pb-5 pt-1 scroll-px-[9vw] scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredCaseStudies.map((study, index) => (
            <div
              key={study.slug}
              className="relative w-[82vw] max-w-[24rem] shrink-0 snap-center snap-always"
            >
              <span className="absolute left-4 top-4 z-20 rounded-full bg-ink/55 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-ivory backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(featuredCaseStudies.length).padStart(2, "0")}
              </span>
              <ProjectCard study={study} variant="tile" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-8">
        <button
          type="button"
          onClick={() => scrollToProject(activeIndex - 1)}
          aria-label="Previous project"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-forest shadow-soft transition-colors duration-200 hover:bg-forest-soft disabled:opacity-40"
          disabled={activeIndex === 0}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          {featuredCaseStudies.map((study, index) => (
            <button
              key={study.slug}
              type="button"
              onClick={() => scrollToProject(index)}
              aria-label={`Show ${study.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-5 bg-forest" : "w-2 bg-line"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToProject(activeIndex + 1)}
          aria-label="Next project"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-forest shadow-soft transition-colors duration-200 hover:bg-forest-soft disabled:opacity-40"
          disabled={activeIndex === featuredCaseStudies.length - 1}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

const mobileProjectIcons: Record<string, LucideIcon> = {
  "ck-dev": Palette,
  "sentiment-trader": TrendingUp,
  "internal-automation-tool": Workflow,
  securescape: ShieldCheck,
};

const mobileProjectSubtitles: Record<string, string> = {
  "ck-dev": "Creative Frontend Portfolio",
  "sentiment-trader": "Financial NLP · Market Data",
  "internal-automation-tool": "Internal Platform",
  securescape: "Embedded Security System",
};

function MobileProjectRow({ study }: { study: CaseStudy }) {
  const Icon = mobileProjectIcons[study.slug] ?? Palette;

  return (
    <Link
      href={`/${study.slug}`}
      className="group flex items-center gap-3 border-t border-line py-3.5 last:border-b"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forest-soft text-forest shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
        <Icon className="h-5 w-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-ink">
          {study.name}
        </span>
        <span className="mt-0.5 block truncate text-sm text-muted">
          {mobileProjectSubtitles[study.slug] ?? study.category}
        </span>
      </span>

      <ChevronRight className="h-5 w-5 shrink-0 text-forest transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}
