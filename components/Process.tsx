"use client";

import { motion } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import { fadeUp, stagger, inView } from "@/lib/motion";

type Chapter = {
  number: string;
  label: string;
  title: string;
  body: string;
};

type ChapterColumn = {
  left: string;
  top: string;
  width: string;
  bottom: string;
  paddingX: string;
  /** Title underline rotation in degrees */
  underlineRotate: number;
  /** Flip the underline horizontally so strokes don't match */
  underlineFlip?: boolean;
};

type SectionDrawing = {
  src: string;
  left: string;
  bottom: string;
  width: string;
  rotate: number;
  opacity?: number;
};

const processChapters: Chapter[] = [
  {
    number: "1",
    label: "Chapter 01",
    title: "We get clear.",
    body: "We start with your goals, your audience, and what the site actually needs to do.",
  },
  {
    number: "2",
    label: "Chapter 02",
    title: "We shape the direction.",
    body: "We define the structure, messaging, and visual direction so the project has a strong foundation.",
  },
  {
    number: "3",
    label: "Chapter 03",
    title: "I build it out.",
    body: "I turn the direction into a real site, with thoughtful design, clean code, and the practical pieces behind it.",
  },
  {
    number: "4",
    label: "Chapter 04",
    title: "We launch, respond, and improve.",
    body: "Once it is live, we test, refine, and keep improving what needs attention.",
  },
];

/**
 * Book layout knobs - percentages of the book image box unless noted.
 * Move columns and the center spine line here without touching markup.
 */
const bookLayout = {
  /**
   * Each chapter column can be moved independently.
   * left/top/width/bottom are based on the full book image box.
   */
  columns: [
    {
      left: "9.2%",
      top: "12%",
      width: "20%",
      bottom: "13%",
      paddingX: "1.5%",
      underlineRotate: 0, // straight
    },
    {
      left: "29.5%",
      top: "12%",
      width: "20%",
      bottom: "13%",
      paddingX: "1.5%",
      underlineRotate: -2, // positive slope
    },
    {
      left: "51%",
      top: "12%",
      width: "20%",
      bottom: "13%",
      paddingX: "1.5%",
      underlineRotate: -1.25, // very slight negative
      underlineFlip: true,
    },
    {
      left: "72%",
      top: "12%",
      width: "19%",
      bottom: "13%",
      paddingX: "1.5%",
      underlineRotate: -2, // slight positive
    },
  ] satisfies ChapterColumn[],

  /**
   * Bottom drawings for the book pages.
   * left/bottom/width are based on the full book image box.
   */
  sectionDrawings: [
    {
      src: "/images/process/svg/section-1.svg",
      left: "18.2%",
      bottom: "20.8%",
      width: "25.4%",
      rotate: -3,
      opacity: 0.9,
    },
    {
      src: "/images/process/svg/section-2.svg",
      left: "39.3%",
      bottom: "17.2%",
      width: "24%",
      rotate: 1,
      opacity: 0.88,
    },
    {
      src: "/images/process/svg/section-3.svg",
      left: "62%",
      bottom: "19.8%",
      width: "23.8%",
      rotate: -1,
      opacity: 0.9,
    },
    {
      src: "/images/process/svg/section-4.svg",
      left: "83.3%",
      bottom: "17.2%",
      width: "25.2%",
      rotate: 2,
      opacity: 0.9,
    },
  ] satisfies SectionDrawing[],

  /**
   * Backing shadows behind the bottom of the SVG book.
   * Use bottom/height/translateY to tuck the shadow into the book edge.
   */
  groundShadow: {
    left: "4.5%",
    right: "4.5%",
    bottom: "0.4%",
    height: "10.5%",
    blur: 13,
    opacity: 0.28,
    translateY: "8%",
  },
  contactShadow: {
    left: "5%",
    right: "5%",
    bottom: "11%",
    height: "4%",
    blur: 5,
    opacity: 0.5,
    translateY: "0%",
  },

  /**
   * Soft top-edge shade so the book lifts off the page foundation.
   * Sit just behind/under the top of the SVG.
   */
  topShadow: {
    left: "5%",
    right: "5%",
    top: "1.5%",
    height: "7%",
    blur: 10,
    opacity: 0.22,
    translateY: "-35%",
  },

  /**
   * Center spine shadow line - heavier fold mark you can slide.
   * `left` is % across the book; `width`/`blur` are in px.
   */
  spine: {
    left: "50%",
    top: "8%",
    bottom: "11%",
    width: 12,
    blur: 8,
    spread: 2,
    opacity: 0.34,
    color: "rgba(31, 36, 32, 0.5)",
  },
} as const;

export default function Process() {
  return (
    <section id="process" className="container-ck py-14 lg:py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={inView}
      >
        <motion.div variants={fadeUp}>
          <SectionHeader
            label="The Approach"
            title="A calm way projects take shape."
            subtitle="Every project is different, but the foundation is always the same: clarity, thoughtful design, solid build, and ongoing care."
          />
        </motion.div>

        <ProcessBook />

        <motion.ol variants={fadeUp} className="mt-10 space-y-3 lg:hidden">
          {processChapters.map((chapter) => (
            <li
              key={chapter.number}
              className="rounded-xl border border-line bg-card p-5 shadow-soft"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest">
                {chapter.label}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-medium leading-tight text-ink">
                {chapter.number}. {chapter.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {chapter.body}
              </p>
            </li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
}

function ProcessBook() {
  const {
    columns,
    sectionDrawings,
    groundShadow,
    contactShadow,
    topShadow,
    spine,
  } = bookLayout;

  return (
    <motion.div variants={fadeUp} className="relative mt-6 hidden lg:block">
      <div className="relative mx-auto max-w-[92rem]">
        <div
          className="pointer-events-none absolute z-0 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(31,36,32,0.34)_0%,rgba(31,36,32,0.18)_44%,rgba(31,36,32,0)_74%)]"
          aria-hidden
          style={{
            left: groundShadow.left,
            right: groundShadow.right,
            bottom: groundShadow.bottom,
            height: groundShadow.height,
            filter: `blur(${groundShadow.blur}px)`,
            opacity: groundShadow.opacity,
            transform: `translateY(${groundShadow.translateY})`,
          }}
        />

        <div
          className="pointer-events-none absolute z-[1] rounded-[50%] bg-[linear-gradient(90deg,rgba(31,36,32,0),rgba(31,36,32,0.36)_18%,rgba(31,36,32,0.42)_50%,rgba(31,36,32,0.36)_82%,rgba(31,36,32,0))]"
          aria-hidden
          style={{
            left: contactShadow.left,
            right: contactShadow.right,
            bottom: contactShadow.bottom,
            height: contactShadow.height,
            filter: `blur(${contactShadow.blur}px)`,
            opacity: contactShadow.opacity,
            transform: `translateY(${contactShadow.translateY})`,
          }}
        />

        {/* Top edge shade — keeps the book from blending into the page */}
        <div
          className="pointer-events-none absolute z-[1] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(31,36,32,0.32)_0%,rgba(31,36,32,0.14)_48%,rgba(31,36,32,0)_76%)]"
          aria-hidden
          style={{
            left: topShadow.left,
            right: topShadow.right,
            top: topShadow.top,
            height: topShadow.height,
            filter: `blur(${topShadow.blur}px)`,
            opacity: topShadow.opacity,
            transform: `translateY(${topShadow.translateY})`,
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/process/svg/book-bg.svg"
          alt=""
          aria-hidden
          className="relative z-[2] block w-full select-none"
        />

        {/* Soft page texture only; no center-container shadow. */}
        <div
          className="pointer-events-none absolute inset-[6%_8%_13%] z-[3] opacity-[0.13]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(rgba(77,63,41,0.25) 0.55px, transparent 0.55px)",
            backgroundSize: "7px 7px",
          }}
        />

        {/* Movable spine / fold shadow line */}
        <span
          className="pointer-events-none absolute z-[4] -translate-x-1/2"
          style={{
            left: spine.left,
            top: spine.top,
            bottom: spine.bottom,
            width: spine.width,
            opacity: spine.opacity,
            background: `linear-gradient(90deg, transparent 0%, ${spine.color} 48%, ${spine.color} 52%, transparent 100%)`,
            filter: `blur(${spine.blur}px)`,
            boxShadow: `0 0 ${spine.blur}px ${spine.spread}px ${spine.color}`,
          }}
          aria-hidden
        />

        {sectionDrawings.map((drawing) => (
          <div
            key={drawing.src}
            className="pointer-events-none absolute z-[9] block select-none mix-blend-multiply"
            style={{
              left: drawing.left,
              bottom: drawing.bottom,
              width: drawing.width,
              opacity: drawing.opacity ?? 1,
              transform: `translateX(-50%) rotate(${drawing.rotate}deg)`,
              transformOrigin: "50% 70%",
            }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={drawing.src}
              alt=""
              className="block w-full select-none object-contain"
            />
          </div>
        ))}

        {/* Parameterized chapter columns */}
        {processChapters.map((chapter, index) => {
          const col = columns[index];
          if (!col) return null;

          return (
            <motion.article
              key={chapter.number}
              className="absolute z-10 flex flex-col"
              style={{
                top: col.top,
                bottom: col.bottom,
                left: col.left,
                width: col.width,
                paddingLeft: col.paddingX,
                paddingRight: col.paddingX,
              }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{
                duration: 0.65,
                delay: 0.12 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-forest/85">
                {chapter.label}
              </p>

              <h3 className="mt-[6%] font-serif text-[clamp(1.55rem,2vw,2.15rem)] font-medium leading-[0.98] text-ink">
                {chapter.number}. {chapter.title}
              </h3>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/svg/underline-straight.svg"
                alt=""
                aria-hidden
                className="mx-auto mt-1.5 h-[10px] w-[72%] max-w-[10rem] origin-center select-none object-fill"
                style={{
                  transform: `${
                    col.underlineFlip ? "scaleX(-1) " : ""
                  }rotate(${col.underlineRotate}deg)`,
                }}
              />

              <p className="mt-[6%] max-w-[14rem] text-[clamp(0.72rem,0.86vw,0.9rem)] leading-[1.7] text-ink/82">
                {chapter.body}
              </p>
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
}
