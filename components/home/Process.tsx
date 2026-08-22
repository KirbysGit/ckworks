"use client";

import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
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

type MobileChapterDrawing = {
  src: string;
  /** Rendered width of the *ink*, not of the source canvas. */
  size: string;
  /**
   * Ink bounds inside the 1254x1254 source, measured with getBBox and padded.
   * The artwork is a portrait composition centred in a square canvas, so about
   * 46% of the width and 27% of the height is empty. Cropping to these numbers
   * in CSS reclaims that space.
   *
   * The crop lives here rather than in the SVG because `sectionDrawings`
   * (the desktop book spread) renders the same four files, positioned against
   * the square canvas. Editing the viewBox would move every one of them.
   */
  inkW: number;
  inkH: number;
  scale?: number;
  rotate: number;
  offsetX?: string;
  offsetY?: string;
};

const processChapters: Chapter[] = [
  {
    number: "1",
    label: "Chapter 01",
    title: "We'll get clear.",
    body: "We'll figure out your goals, who you serve, and what the site actually needs to do.",
  },
  {
    number: "2",
    label: "Chapter 02",
    title: "We'll shape the direction.",
    body: "I turn what we learned into structure, messaging, and a visual direction we can build from.",
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
    title: "I launch. We improve.",
    body: "Once it is live, I test the important paths. Then we refine based on how people actually use it.",
  },
];

const mobileChapterDrawings: MobileChapterDrawing[] = [
  {
    src: "/images/process/svg/section-1.svg",
    size: "11rem",
    inkW: 720,
    inkH: 923,
    scale: 1,
    rotate: -3,
  },
  {
    src: "/images/process/svg/section-2.svg",
    size: "11rem",
    inkW: 706,
    inkH: 975,
    scale: 1,
    rotate: 2,
  },
  {
    src: "/images/process/svg/section-3.svg",
    size: "11rem",
    inkW: 731,
    inkH: 960,
    scale: 1,
    rotate: -1,
  },
  {
    src: "/images/process/svg/section-4.svg",
    // Narrow and tall, so this width is chosen to land near the other three
    // in height rather than to match them in width.
    size: "7rem",
    inkW: 511,
    inkH: 1071,
    scale: 1,
    rotate: 2,
  },
];

/**
 * Mobile chapter drawing layout knobs.
 *   gapFromText - vertical space between the paragraph and sketch
 *   canvasWidth - visual drawing area; can exceed the text column
 *   maxWidth    - optional cap relative to the chapter text column
 *   opacity     - overall drawing strength
 *
 * Use maxWidth: "none" when you want the per-image size values to control
 * the drawing without being capped by the text column.
 * If size feels capped by the viewport/SVG artboard, increase scale per image.
 *
 * Per-image size and x/y nudges live in mobileChapterDrawings above.
 */
const mobileChapterDrawingLayout = {
  gapFromText: "0.5rem",
  /**
   * The drawing canvas spans the whole chapter row, not just the text column.
   *
   * A chapter is `grid-cols-[5.25rem_minmax(0,1fr)]` with `gap-2.5`, so the
   * text column starts 5.875rem in. Centring inside that column put every
   * drawing about half that distance right of the screen centre. Pulling the
   * canvas back across the rail lets `justify-center` centre on the row.
   *
   * Keep `railOffset` equal to the grid's first column plus its gap.
   */
  railOffset: "4.5rem",
  canvasWidth: "calc(100% + 5.875rem)",
  maxWidth: "none",
  opacity: 0.85,
} as const;

/**
 * Mobile chapter title underline knobs.
 *   offsetX  — positive nudges right, negative left (e.g. "0.35rem" or "6px")
 *   offsetY  — positive nudges down
 *   width    — relative to the title block (e.g. "85%")
 *   maxWidth — hard cap so long titles don't stretch it forever
 *   rotate   — degrees; negative tilts left
 */
const mobileChapterUnderline = {
  offsetX: "0px",
  offsetY: "0px",
  width: "85%",
  maxWidth: "9rem",
  rotate: 0,
} as const;

/**
 * Mobile timeline (dot + vertical connector under Chapter / 01).
 * The line is anchored to the column center; use offsetX to fine-tune.
 *   offsetX   — positive nudges right of center, negative left
 *   top       — where the connector starts (below the dot)
 *   height    — how far it runs (can use calc)
 *   width     — line thickness
 *   dotSize   — outer ring size
 *   innerSize — filled center dot size
 */
const mobileTimeline = {
  offsetX: "0px",
  top: "7.45rem",
  height: "calc(100% + 2rem)",
  width: "1px",
  dotSize: "2rem",
  innerSize: "0.75rem",
} as const;

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
    <section
      id="process"
      // `overflow-x-clip` contains the mobile chapter drawings, which bleed
      // past the container on purpose via `min-width` and offset transforms.
      // The bleed is the design; the page scrolling sideways was not. Using
      // `clip` rather than `hidden` avoids creating a scroll container, so
      // sticky descendants keep working.
      // Asymmetric bottom padding on mobile: the next section brings its own
      // top padding, so a full `py-14` here just doubled the gap. Desktop keeps
      // the even `lg:py-20` because the book spread needs the breathing room.
      className="container-ck overflow-x-clip bg-ivory pb-6 pt-14 text-ink [color-scheme:only_light] [forced-color-adjust:none] lg:py-20"
    >
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
            className="text-center lg:text-left [&_h2]:mx-auto [&_p]:mx-auto lg:[&_h2]:mx-0 lg:[&_p]:mx-0"
          />
        </motion.div>

        <ProcessBook />
        <MobileProcessTimeline />
      </motion.div>
    </section>
  );
}

function MobileProcessTimeline() {
  return (
    <motion.div variants={fadeUp} className="mt-12 lg:hidden">
      <ol>
        {processChapters.map((chapter, index) => {
          const drawing = mobileChapterDrawings[index];
          const chapterNumber = chapter.number.padStart(2, "0");
          const isLast = index === processChapters.length - 1;

          return (
            <li
              key={chapter.number}
              // `py-8` separates one chapter from the next, so the last one
              // does not need its bottom half — that padding was stacking on
              // top of the section's own and the next section's.
              className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-2.5 border-b border-line/80 py-8 first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="relative flex min-h-full flex-col items-center text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-forest">
                  Chapter
                </p>
                <p className="mt-2 font-display text-5xl font-medium leading-none tracking-tight text-forest">
                  {chapterNumber}
                </p>
                <span
                  className="mt-5 flex items-center justify-center rounded-full bg-forest-soft"
                  style={{
                    width: mobileTimeline.dotSize,
                    height: mobileTimeline.dotSize,
                  }}
                >
                  <span
                    className="rounded-full bg-forest"
                    style={{
                      width: mobileTimeline.innerSize,
                      height: mobileTimeline.innerSize,
                    }}
                  />
                </span>
                {!isLast && (
                  <span
                    className="absolute -translate-x-1/2 bg-line"
                    style={{
                      left: `calc(50% + ${mobileTimeline.offsetX})`,
                      top: mobileTimeline.top,
                      height: mobileTimeline.height,
                      width: mobileTimeline.width,
                    }}
                    aria-hidden
                  />
                )}
              </div>

              <div className="flex min-w-0 flex-col">
                <div className="min-w-0">
                  <div className="w-fit max-w-full">
                    <h3 className="font-serif text-[2rem] font-medium leading-[1.05] text-ink">
                      {chapter.title}
                    </h3>
                    <img
                      src="/images/hero/svg/underline.svg"
                      alt=""
                      aria-hidden
                      width={3785}
                      height={429}
                      loading="lazy"
                      decoding="async"
                      className="mr-auto mt-1.5 block h-auto select-none"
                      style={{
                        width: mobileChapterUnderline.width,
                        maxWidth: mobileChapterUnderline.maxWidth,
                        transformOrigin: "left center",
                        transform: `translate(${mobileChapterUnderline.offsetX}, ${mobileChapterUnderline.offsetY}) rotate(${mobileChapterUnderline.rotate}deg)`,
                      }}
                    />
                  </div>
                  <p className="mt-5 text-[0.95rem] leading-7 text-ink/82">
                    {chapter.body}
                  </p>
                </div>

                {drawing && (
                  <div
                    className="flex justify-center overflow-visible"
                    style={{
                      marginTop: mobileChapterDrawingLayout.gapFromText,
                      width: mobileChapterDrawingLayout.canvasWidth,
                      marginLeft: `calc(-1 * ${mobileChapterDrawingLayout.railOffset})`,
                    }}
                  >
                    {/* A window onto the ink. The square source is scaled so
                        its ink spans `size`, then the empty margins are
                        clipped away — the drawing stays the same resolution,
                        the box around it stops being mostly nothing. */}
                    <span
                      className="block overflow-hidden"
                      style={{
                        width: drawing.size,
                        aspectRatio: `${drawing.inkW} / ${drawing.inkH}`,
                        opacity: mobileChapterDrawingLayout.opacity,
                        transformOrigin: "left top",
                        transform: `translate(${drawing.offsetX ?? "0px"}, ${
                          drawing.offsetY ?? "0px"
                        }) rotate(${drawing.rotate}deg) scale(${
                          drawing.scale ?? 1
                        })`,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={drawing.src}
                        alt=""
                        aria-hidden
                        width={1254}
                        height={1254}
                        loading="lazy"
                        decoding="async"
                        className="block max-w-none select-none"
                        style={{
                          width: `${(1254 / drawing.inkW) * 100}%`,
                          height: "auto",
                          marginLeft: `${(-(1254 - drawing.inkW) / 2 / drawing.inkW) * 100}%`,
                          marginTop: `${(-(1254 - drawing.inkH) / 2 / drawing.inkH) * 100}%`,
                        }}
                      />
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </motion.div>
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
    <motion.div
      variants={fadeUp}
      className="relative mt-6 hidden bg-ivory text-ink [color-scheme:only_light] [forced-color-adjust:none] lg:block"
    >
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
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
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
            className="pointer-events-none absolute z-[9] block select-none"
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
              width={1254}
              height={1254}
              loading="lazy"
              decoding="async"
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
                width={968}
                height={42}
                loading="lazy"
                decoding="async"
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
