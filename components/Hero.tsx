"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, LayoutTemplate, MessageSquareText, Workflow } from "lucide-react";
import HeroMockup from "./HeroMockup";
import { fadeUp, stagger } from "@/lib/motion";

/**
 * Reading-order accents in the headline.
 * Tuned to run while the right-side mockup cards are still settling in.
 *
 * Sequence: "show up" emphasizes → pause → "meant to" underline draws.
 *
 * "show up" keeps the same upright serif glyphs — each letter skews and
 * stretches slightly instead of switching to a true italic cut.
 */
const heroAccentTiming = {
  /** Seconds after mount before "show up" starts emphasizing */
  showUpDelay: 1.4,
  /** How long the green + letter-slant takes */
  showUpDuration: 0.55,
  /** Per-letter lean in degrees (negative = italic-like lean to the right) */
  showUpSkewDeg: -11,
  /** Horizontal stretch on each letter (1 = none) */
  showUpStretchX: 1.04,
  /** Pause after "show up" finishes, before the underline starts */
  betweenDelay: 0.22,
  /** How long the "meant to" underline takes to draw left → right */
  underlineDuration: 0.55,
} as const;

const meantToUnderlineDelay =
  heroAccentTiming.showUpDelay +
  heroAccentTiming.showUpDuration +
  heroAccentTiming.betweenDelay;

const showUpLetters = ["s", "h", "o", "w", " ", "u", "p"] as const;

const heroTrustItems = [
  {
    icon: MessageSquareText,
    title: "Clearer messaging",
    body: "Words that resonate and convert.",
  },
  {
    icon: LayoutTemplate,
    title: "Better structure",
    body: "Thoughtful systems that scale.",
  },
  {
    icon: Workflow,
    title: "Practical systems",
    body: "Tools and handoff you can actually use.",
  },
];

function ShowUpAccent() {
  return (
    <span className="inline" aria-label="show up">
      {showUpLetters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          aria-hidden
          className="inline-block origin-[50%_70%]"
          initial={{
            color: "#1F2420",
            skewX: 0,
            scaleX: 1,
          }}
          animate={{
            color: "#2F5B3F",
            skewX: heroAccentTiming.showUpSkewDeg,
            scaleX: heroAccentTiming.showUpStretchX,
          }}
          transition={{
            delay: heroAccentTiming.showUpDelay,
            duration: heroAccentTiming.showUpDuration,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container-ck grid items-start gap-4 pb-2 pt-6 sm:pt-8 lg:grid-cols-[0.8fr_1fr] lg:gap-4 lg:pb-4 lg:pt-10">
        {/* Left: copy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-2xl lg:pt-10"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-forest"
          >
            Web Design &amp; Digital Systems
          </motion.span>

          {/* Fixed 4-line break on sm+; below that the brs vanish and it wraps naturally */}
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-[3.5rem]"
          >
            Websites and systems{" "}
            <br className="hidden sm:block" />
            that help your business{" "}
            <br className="hidden sm:block" />
            <ShowUpAccent />{" "}
            the way it{" "}
            <br className="hidden sm:block" />
            was{" "}
            <span className="relative inline-block">
              meant to
              <motion.span
                className="pointer-events-none absolute -bottom-2 left-0 block w-full overflow-hidden sm:-bottom-3"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{
                  delay: meantToUnderlineDelay,
                  duration: heroAccentTiming.underlineDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden
              >
                <Image
                  src="/images/hero/svg/underline.svg"
                  alt=""
                  width={3785}
                  height={429}
                  className="h-auto w-full"
                />
              </motion.span>
            </span>
            .
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[85%] text-lg leading-relaxed text-muted"
          >
            I help businesses clean up their websites, sharpen how they come
            across, and build the systems behind the scenes so everything feels
            easier to run.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-start gap-4"
          >
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-semibold text-ivory shadow-lift transition-colors duration-200 hover:bg-ink"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#what-i-do"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-forest/80 bg-transparent px-6 py-3 text-sm font-semibold text-forest transition-colors duration-200 hover:bg-forest-soft"
            >
              See what I do
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-8 grid max-w-2xl gap-5 border-t border-line/50 pt-8 sm:grid-cols-3 sm:gap-0"
          >
            {heroTrustItems.map(({ icon: Icon, title, body }, index) => (
              <li
                key={title}
                className={`text-left ${
                  index > 0
                    ? "sm:border-l sm:border-line/50 sm:pl-5"
                    : ""
                } ${index < heroTrustItems.length - 1 ? "sm:pr-5" : ""}`}
              >
                <Icon className="h-5 w-5 text-forest" strokeWidth={1.8} />
                <h3 className="mt-3 text-sm font-semibold leading-tight text-ink">
                  {title}
                </h3>
                <p className="mt-1.5 max-w-[11rem] text-sm leading-6 text-muted">
                  {body}
                </p>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: layered mockup. min-w-0 lets this column shrink below its
            content's natural width (the fr split can't be honored without
            it); floating cards overlap outward instead of blocking the grid. */}
        <div className="min-w-0">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
