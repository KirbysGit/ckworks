"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, LayoutTemplate, MessageSquareText, Workflow } from "lucide-react";
import HeroMockup from "./HeroMockup";
import ProjectInquiryTrigger from "./ProjectInquiryTrigger";
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

function MobileHeroPreview() {
  return (
    <motion.div
      variants={fadeUp}
      className="relative mt-6 h-[226px] w-full overflow-hidden rounded-[1.35rem] border border-line/70 bg-card shadow-soft lg:hidden"
      aria-label="Small preview of a mobile website and dashboard system"
    >
      <div className="grid-texture absolute inset-0 opacity-35" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(221,232,216,0.72),transparent_36%),radial-gradient(circle_at_16%_92%,rgba(47,91,63,0.1),transparent_34%)]"
        aria-hidden
      />

      <div className="absolute left-4 top-5 w-[77%] overflow-hidden rounded-xl border border-line bg-[#FFFDF8] shadow-[0_16px_34px_-24px_rgba(31,36,32,0.42)]">
        <div className="flex h-7 items-center gap-1.5 border-b border-line/60 px-3">
          <span className="h-2 w-2 rounded-full bg-[#E5766D]/80" />
          <span className="h-2 w-2 rounded-full bg-[#E8B54D]/80" />
          <span className="h-2 w-2 rounded-full bg-[#58A66B]/80" />
          <span className="ml-2 h-1.5 flex-1 rounded-full bg-sand/70" />
        </div>
        <div className="grid min-h-[148px] grid-cols-[0.9fr_1.1fr] gap-3 p-3">
          <div className="pt-1">
            <Image
              src="/images/hero/svg/demo-logo.svg"
              alt=""
              width={74}
              height={24}
              className="h-auto w-16 opacity-80"
            />
            <div className="mt-5 space-y-2">
              <span className="block h-[4px] w-24 rounded-full bg-ink/55" />
              <span className="block h-[4px] w-20 rounded-full bg-ink/42" />
              <span className="block h-[4px] w-14 rounded-full bg-ink/30" />
            </div>
            <div className="mt-4 space-y-1.5">
              <span className="block h-[3px] w-24 rounded-full bg-muted/18" />
              <span className="block h-[3px] w-20 rounded-full bg-muted/18" />
              <span className="block h-[3px] w-16 rounded-full bg-muted/18" />
            </div>
            <span className="mt-5 block h-5 w-20 rounded-md bg-forest shadow-[0_8px_18px_-14px_rgba(47,91,63,0.85)]" />
          </div>
          <div className="relative min-h-[122px] overflow-hidden rounded-lg">
            <Image
              src="/images/hero/png/demo-graphic.png"
              alt=""
              fill
              sizes="180px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-line/45 px-3 py-2.5">
          {[0, 1, 2].map((item) => (
            <div key={item} className="space-y-1.5">
              <span className="block h-[3px] rounded-full bg-forest/22" />
              <span className="block h-[3px] w-2/3 rounded-full bg-muted/14" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-12 w-[29%] rotate-[2deg] rounded-[1.45rem] bg-[linear-gradient(145deg,#050605,#323832_45%,#fff8e8_50%,#050605_68%)] p-[2px] shadow-[0_18px_30px_-18px_rgba(31,36,32,0.65)]">
        <div className="relative overflow-hidden rounded-[1.4rem] bg-card p-1">
          <div className="absolute left-1/2 top-1 h-2.5 w-10 -translate-x-1/2 rounded-full bg-[#050605]" />
          <div className="min-h-[154px] rounded-[1.05rem] bg-[#FFFDF8] px-2 pb-2 pt-6">
            <Image
              src="/images/hero/svg/demo-logo.svg"
              alt=""
              width={58}
              height={18}
              className="h-auto w-12 opacity-75"
            />
            <div className="mt-4 space-y-1.5">
              <span className="block h-[4px] w-14 rounded-full bg-ink/50" />
              <span className="block h-[4px] w-11 rounded-full bg-ink/38" />
            </div>
            <div className="relative mt-3 h-[76px] overflow-hidden rounded-lg">
              <Image
                src="/images/hero/png/demo-graphic.png"
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="mt-2 space-y-1">
              <span className="block h-[3px] w-14 rounded-full bg-muted/16" />
              <span className="block h-[3px] w-10 rounded-full bg-muted/16" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container-ck grid items-start gap-4 pb-4 pt-6 sm:pt-8 lg:grid-cols-[0.8fr_1fr] lg:gap-4 lg:pb-4 lg:pt-10">
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
            className="mt-5 font-serif text-[2.55rem] font-medium leading-[1.03] tracking-normal text-ink sm:text-[3.5rem] lg:leading-[1.05]"
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

          <MobileHeroPreview />

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[94%] text-base leading-7 text-muted sm:mt-6 sm:max-w-[85%] sm:text-lg sm:leading-relaxed"
          >
            I help businesses clean up their websites, sharpen how they come
            across, and build the systems behind the scenes so everything feels
            easier to run.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-nowrap items-center justify-start gap-3 sm:mt-8 sm:flex-wrap sm:gap-4"
          >
            <ProjectInquiryTrigger
              source="hero"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3 text-sm font-semibold text-ivory shadow-lift transition-colors duration-200 hover:bg-ink sm:flex-none sm:px-6"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </ProjectInquiryTrigger>
            <a
              href="#what-i-do"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border-2 border-forest/80 bg-transparent px-4 py-3 text-sm font-semibold text-forest transition-colors duration-200 hover:bg-forest-soft sm:flex-none sm:px-6"
            >
              See what I do
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-6 grid max-w-2xl gap-2 border-t border-line/50 pt-4 sm:mt-8 sm:grid-cols-3 sm:gap-0 sm:pt-8"
          >
            {heroTrustItems.map(({ icon: Icon, title, body }, index) => (
              <li
                key={title}
                className={`flex items-start gap-3 rounded-xl border border-line/60 bg-card/55 p-3 text-left shadow-[0_10px_24px_-24px_rgba(31,36,32,0.45)] sm:block sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none ${
                  index > 0
                    ? "sm:border-l sm:border-line/50 sm:pl-5"
                    : ""
                } ${index < heroTrustItems.length - 1 ? "sm:pr-5" : ""}`}
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-forest sm:mt-0 sm:h-5 sm:w-5" strokeWidth={1.8} />
                <div>
                  <h3 className="text-sm font-semibold leading-tight text-ink sm:mt-3">
                    {title}
                  </h3>
                  <p className="mt-1 max-w-none text-xs leading-5 text-muted sm:mt-1.5 sm:max-w-[11rem] sm:text-sm sm:leading-6">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: layered mockup. min-w-0 lets this column shrink below its
            content's natural width (the fr split can't be honored without
            it); floating cards overlap outward instead of blocking the grid. */}
        <div className="hidden min-w-0 lg:block">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
