"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LayoutTemplate,
  Menu,
  MessageSquareText,
  Workflow,
} from "lucide-react";
import HeroMockup, { WindermereBrand } from "./HeroMockup";
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
    <span className="inline-block whitespace-nowrap" aria-label="show up">
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

function MobilePhoneStatusBar() {
  return (
    <div className="relative z-40 flex h-6 items-center justify-between px-3 pt-1">
      <span className="text-[5.5px] font-semibold leading-none text-ink">
        9:41
      </span>
      <span className="flex shrink-0 items-center justify-end gap-[2.5px]" aria-hidden>
        <span className="flex h-[6px] w-[7px] items-end gap-px">
          {[1.5, 2.5, 3.5, 5].map((height) => (
            <span
              key={height}
              className="w-px rounded-full bg-ink"
              style={{ height }}
            />
          ))}
        </span>
        <svg
          viewBox="0 0 14 10"
          className="h-[5px] w-[7px] shrink-0 text-ink"
          fill="none"
        >
          <path
            d="M2.2 3.8C5 1.9 9 1.9 11.8 3.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.05"
          />
          <path
            d="M4.5 6C6 5 8 5 9.5 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.05"
          />
          <path
            d="M6.7 8C6.9 7.85 7.1 7.85 7.3 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.05"
          />
        </svg>
        <span className="relative inline-flex h-[4px] w-[9px] shrink-0">
          <span className="absolute inset-0 rounded-[1px] border border-ink/80" />
          <span className="absolute bottom-[1px] right-[-1.5px] top-[1px] w-px rounded-r bg-ink/70" />
          <span className="absolute bottom-[1px] left-[1px] top-[1px] w-[5.5px] rounded-[0.5px] bg-ink" />
        </span>
      </span>
    </div>
  );
}

function MobileHeroPreview() {
  return (
    <motion.div
      variants={fadeUp}
      className="relative mx-auto mt-9 h-[22.75rem] w-full max-w-[23rem] overflow-visible md:hidden"
      aria-label="Layered preview of a calm website and mobile view"
    >
      <div
        className="grid-texture pointer-events-none absolute -inset-x-6 -inset-y-5 opacity-35 [mask-image:radial-gradient(circle_at_center,black_26%,transparent_76%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-8 top-14 h-32 w-32 rounded-full bg-forest-soft/70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 bottom-12 h-36 w-36 rounded-full bg-forest-soft/85 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-4 bottom-5 h-20 rounded-[50%] bg-ink/12 blur-2xl"
        aria-hidden
      />

      <div className="absolute left-0 top-8 w-[77%] -rotate-[3deg] overflow-hidden rounded-2xl border border-line bg-card shadow-float">
        <div className="flex h-7 items-center gap-1.5 border-b border-line/80 px-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#E5766D]" />
            <span className="h-2 w-2 rounded-full bg-[#E8B54D]" />
            <span className="h-2 w-2 rounded-full bg-[#58A66B]" />
          </div>
          <div className="ml-3 h-1.5 flex-1 rounded-md bg-sand" />
        </div>

        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <WindermereBrand compact />
          <div className="flex items-center gap-2.5 text-[7px] text-muted">
            {["Services", "About", "Contact"].map((item) => (
              <span key={item}>{item}</span>
            ))}
            <span className="rounded bg-forest px-2 py-1 text-[6px] font-medium text-ivory">
              Book
            </span>
          </div>
        </div>

        <div className="grid min-h-[154px] grid-cols-[1.04fr_0.96fr] gap-3 px-4 pb-4 pt-1">
          <div>
            <h3 className="font-serif text-[1.38rem] font-medium leading-[1.03] text-ink">
              Care that fits{" "}
              <em className="italic">your life</em>.
            </h3>
            <p className="mt-2 max-w-[8rem] text-[7px] leading-relaxed text-muted">
              Compassionate care with a calmer path forward.
            </p>
            <span className="mt-3 inline-flex rounded-md bg-forest px-3 py-1.5 text-[7px] font-medium text-ivory shadow-[0_8px_18px_-14px_rgba(47,91,63,0.85)]">
              Book a call
            </span>
          </div>
          <div className="relative hidden min-h-[128px] overflow-hidden rounded-xl min-[360px]:block">
            <Image
              src="/images/hero/png/demo-graphic.png"
              alt=""
              fill
              sizes="180px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-5 z-20 w-[39%] rotate-[4deg] rounded-[2rem] bg-[linear-gradient(145deg,#050605_0%,#181B18_30%,#6F746C_43%,#FFF9EA_49%,#3C423B_56%,#060706_74%,#161A16_100%)] p-[2px] shadow-[0_18px_34px_-16px_rgba(17,23,20,0.62),0_5px_12px_-6px_rgba(17,23,20,0.48)]">
        <span
          className="pointer-events-none absolute inset-[1px] rounded-[1.95rem] bg-[radial-gradient(circle_at_28%_7%,rgba(255,255,255,0.38),transparent_22%),linear-gradient(160deg,rgba(255,255,255,0.18),transparent_34%,rgba(0,0,0,0.42)_72%)] opacity-70"
          aria-hidden
        />
        <div className="relative rounded-[1.9rem] bg-[linear-gradient(145deg,#030403_0%,#0C0F0C_45%,#272D27_58%,#050605_100%)] p-[4px] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.16),inset_-2px_-2px_4px_rgba(0,0,0,0.82)]">
          <div className="relative overflow-hidden rounded-[1.55rem] bg-card shadow-[inset_0_0_0_1px_rgba(31,36,32,0.04)]">
            <div
              className="pointer-events-none absolute left-1/2 top-[-5px] z-30 h-[17px] w-[50px] -translate-x-1/2"
              aria-hidden
            >
              <div className="relative h-full w-full rounded-b-[7px] bg-[#050605] shadow-[0_1px_0_rgba(5,6,5,0.95)]">
                <span className="absolute -left-[7px] top-0 h-1.5 w-1.5 rounded-br-lg shadow-[6px_0_0_0_#050605]" />
                <span className="absolute -right-[7px] top-0 h-1.5 w-1.5 rounded-bl-lg shadow-[-6px_0_0_0_#050605]" />
                <span className="absolute left-1/2 top-[7px] h-[2px] w-[18px] -translate-x-1/2 rounded-full bg-white/18" />
              </div>
            </div>
            <div className="relative min-h-[250px] bg-card">
              <MobilePhoneStatusBar />

              <div className="flex items-center justify-between px-3.5 pt-1">
                <WindermereBrand compact />
                <Menu className="h-3.5 w-3.5 text-muted" />
              </div>

              <div className="px-3.5 pb-3.5 pt-2">
                <p className="font-serif text-[11px] font-medium leading-snug text-ink">
                  Care that fits{" "}
                  <em className="italic">your life</em>.
                </p>
                <span className="mt-2 inline-block rounded bg-forest px-2 py-1 text-[7px] font-medium text-ivory shadow-[0_4px_10px_-6px_rgba(47,91,63,0.8)]">
                  Book a call
                </span>
                <div className="relative mt-2.5 h-32 overflow-hidden rounded-lg shadow-[0_10px_22px_-18px_rgba(31,36,32,0.7)]">
                  <Image
                    src="/images/hero/png/demo-graphic.png"
                    alt=""
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-0.4rem] left-[42%] z-30 w-[39%] -translate-x-1/2 rotate-[-4deg]">
        <div className="relative aspect-[0.92] w-full rounded-xl border border-[#EDE6D0]/65 bg-gradient-to-br from-[#FEFCF5] via-[#FBF7EB] to-[#F5EFD9] shadow-[0_22px_42px_-20px_rgba(31,36,32,0.76),0_8px_18px_-14px_rgba(31,36,32,0.48)]">
          <div className="absolute inset-x-0 top-0 h-4 rounded-t-xl bg-white/30" />
          <Image
            src="/images/hero/svg/postit.svg"
            alt=""
            fill
            sizes="140px"
            className="object-contain px-1"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container-ck grid items-start gap-4 pb-4 pt-6 sm:pt-8 md:grid-cols-[0.8fr_1fr] md:gap-4 md:pb-4 lg:pt-10">
        {/* Left: copy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-2xl text-center md:mx-0 md:pt-8 md:text-left lg:pt-10"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-forest"
          >
            Web Design &amp; Digital Systems
          </motion.span>

          {/* Fixed line breaks on md+; phone uses its own centered rhythm. */}
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-serif text-[2.82rem] font-medium leading-[1.08] tracking-normal text-ink md:text-[3rem] md:leading-[1.05] lg:text-[3.5rem]"
          >
            <span className="block md:hidden">
              Websites and
              <br />
              systems that help
              <br />
              your business
              <br />
              <span className="relative inline-block whitespace-nowrap text-forest">
                <ShowUpAccent />
                <motion.span
                  className="pointer-events-none absolute -bottom-2 left-0 block w-full overflow-hidden"
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
              <br />
              the way it was
              <br />
              meant to.
            </span>
            <span className="hidden md:inline">
              Websites and systems{" "}
              <br className="hidden md:block" />
              that help your business{" "}
              <br className="hidden md:block" />
              <ShowUpAccent />{" "}
              the way it{" "}
              <br className="hidden md:block" />
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
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-[21rem] text-base leading-7 text-muted md:mx-0 md:mt-6 md:max-w-[85%] md:text-lg md:leading-relaxed"
          >
            I help businesses clean up their websites, sharpen how they come
            across, and build the systems behind the scenes so everything feels
            easier to run.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-7 flex max-w-[22rem] flex-col items-stretch justify-center gap-3 md:mx-0 md:mt-8 md:flex-row md:flex-wrap md:items-center md:justify-start md:gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3 text-sm font-semibold text-ivory shadow-lift transition-colors duration-200 hover:bg-ink md:w-auto md:flex-none md:px-6"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-forest/80 bg-transparent px-4 py-3 text-sm font-semibold text-forest transition-colors duration-200 hover:bg-forest-soft md:w-auto md:flex-none md:px-6"
            >
              See what I do
            </Link>
          </motion.div>

          <MobileHeroPreview />

          <motion.ul
            variants={fadeUp}
            className="mx-auto mt-7 grid max-w-[22rem] grid-cols-3 gap-0 border-t border-line/50 pt-5 md:mx-0 md:mt-8 md:max-w-2xl md:pt-8"
          >
            {heroTrustItems.map(({ icon: Icon, title, body }, index) => (
              <li
                key={title}
                className={`px-2 text-center md:block md:text-left ${
                  index > 0
                    ? "border-l border-line/60 md:border-line/50 md:pl-5"
                    : ""
                } ${index < heroTrustItems.length - 1 ? "md:pr-5" : ""}`}
              >
                <Icon className="mx-auto h-5 w-5 shrink-0 text-forest md:mx-0" strokeWidth={1.8} />
                <div>
                  <h3 className="mt-2 text-[11px] font-semibold leading-tight text-ink md:mt-3 md:text-sm">
                    {title}
                  </h3>
                  <p className="mt-1 hidden max-w-none text-xs leading-5 text-muted min-[390px]:block md:mt-1.5 md:max-w-[11rem] md:text-sm md:leading-6">
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
        <div className="hidden min-w-0 md:block">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
