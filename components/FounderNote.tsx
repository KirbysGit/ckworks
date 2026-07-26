"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { fadeUp, inView } from "@/lib/motion";

const founderNoteLayout = {
  stageMaxWidth: "92rem",
  portrait: {
    width: "18.5rem",
    left: "-6rem",
    top: "52%",
    rotate: "-1.2deg",
  },
  drawingCard: {
    width: "20.5rem",
    height: "28rem",
    right: "-6rem",
    top: "3.75rem",
    rotate: "2.4deg",
  },
  drawing: {
    scale: 1.08,
    opacity: 0.58,
    offsetX: "0.15rem",
    offsetY: "0.35rem",
  },
  /**
   * Mobile-only note panel over the mountain/forest background.
   * Tune the wash so type stays readable without hiding the art.
   */
  mobilePanel: {
    maxWidth: "34rem",
    overlay: "rgba(250, 247, 240, 0.78)",
    blur: "6px",
    paddingX: "1.35rem",
    paddingY: "1.75rem",
  },
} as const;

export default function FounderNote() {
  const { stageMaxWidth, portrait, drawingCard, drawing, mobilePanel } =
    founderNoteLayout;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-sand py-12 sm:py-14 lg:py-16"
    >
      {/* full-bleed section background art */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/founder/svg/note-bg.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-80"
      />
      <div className="container-ck relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="relative mx-auto grid gap-5 lg:min-h-[32rem] lg:block"
          style={{ maxWidth: stageMaxWidth }}
        >
          <div
            className="pointer-events-none absolute bottom-4 left-[12%] right-[12%] hidden h-14 rounded-[50%] bg-ink/18 blur-3xl lg:block"
            aria-hidden
          />

          {/* Map / drawing — desktop only */}
          <div
            className="relative z-0 mx-auto hidden h-[24rem] w-full max-w-[25rem] overflow-hidden rounded-[1.8rem] border border-line/80 bg-card/75 shadow-lift lg:absolute lg:right-[var(--drawing-right)] lg:top-[var(--drawing-top)] lg:block lg:h-[var(--drawing-height)] lg:w-[var(--drawing-width)] lg:max-w-none lg:rotate-[var(--drawing-rotate)]"
            style={
              {
                "--drawing-width": drawingCard.width,
                "--drawing-height": drawingCard.height,
                "--drawing-right": drawingCard.right,
                "--drawing-top": drawingCard.top,
                "--drawing-rotate": drawingCard.rotate,
              } as CSSProperties
            }
          >
            <div className="pointer-events-none absolute inset-3 rounded-[1.45rem] border border-line/45" />
            <div
              className="grid-texture pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(circle_at_center,black_42%,transparent_88%)]"
              aria-hidden
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/founder/svg/note-drawing.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none object-contain mix-blend-multiply"
              style={{
                height: `${drawing.scale * 100}%`,
                width: "auto",
                opacity: drawing.opacity,
                transform: `translate(calc(-50% + ${drawing.offsetX}), calc(-50% + ${drawing.offsetY}))`,
              }}
            />
          </div>

          <article
            className="relative z-20 mx-auto w-full max-w-[var(--mobile-max)] overflow-hidden rounded-[1.35rem] px-[var(--mobile-pad-x)] py-[var(--mobile-pad-y)] lg:max-w-[49rem] lg:min-h-[30rem] lg:rounded-[1.8rem] lg:border lg:border-line lg:bg-card/95 lg:px-20 lg:py-11 lg:shadow-float"
            style={
              {
                ["--mobile-max" as string]: mobilePanel.maxWidth,
                ["--mobile-pad-x" as string]: mobilePanel.paddingX,
                ["--mobile-pad-y" as string]: mobilePanel.paddingY,
              } as CSSProperties
            }
          >
            {/* Mobile: soft wash so the note sits over the forest art */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.35rem] lg:hidden"
              aria-hidden
              style={{
                backgroundColor: mobilePanel.overlay,
                backdropFilter: `blur(${mobilePanel.blur})`,
                WebkitBackdropFilter: `blur(${mobilePanel.blur})`,
              }}
            />

            {/* Desktop card chrome */}
            <div className="pointer-events-none absolute inset-2 hidden rounded-[1.65rem] border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] lg:block" />
            <div
              className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_22%_4%,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_90%_12%,rgba(255,255,255,0.7),transparent_30%),linear-gradient(180deg,rgba(255,253,248,0.9)_0%,rgba(250,247,240,0.45)_100%)] lg:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-8 inset-y-10 hidden opacity-[0.18] lg:block"
              aria-hidden
              style={{
                backgroundImage:
                  "repeating-linear-gradient(180deg, transparent 0 31px, rgba(47,91,63,0.28) 32px, transparent 33px)",
              }}
            />

            <div className="relative z-10 text-center lg:text-left">
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                <span className="h-px w-8 bg-forest" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-forest">
                  A Note From Colin
                </p>
                <span className="h-px w-8 bg-forest lg:hidden" aria-hidden />
              </div>

              <h2 className="mt-6 font-serif text-[clamp(2.55rem,3.6vw,3.65rem)] font-medium leading-[0.95] text-ink">
                Hi, I&apos;m{" "}
                <span className="relative inline-block">
                  Colin.
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/brand/svg/underline-straight.svg"
                    alt=""
                    aria-hidden
                    className="absolute -bottom-3 left-1/2 h-3 w-[72%] -translate-x-1/2 object-fill"
                  />
                </span>
              </h2>

              <div className="mx-auto mt-8 max-w-[39rem] space-y-3.5 text-justify text-[0.98rem] leading-7 text-ink/82 sm:text-base sm:leading-8 lg:mx-0 lg:text-left">
                <p>
                  I started CK Works because I kept noticing the same thing: good
                  businesses doing real work, but showing up online with
                  websites that felt outdated, unclear, or harder to use than
                  they needed to be.
                </p>
                <p>
                  My background is technical, but I care just as much about the
                  creative side: the message, the layout, the feeling, and the
                  details that make something easier to understand.
                </p>
                <p>
                  CK Works is my way of helping business owners close that gap
                  with clearer websites, thoughtful design, and practical
                  systems that support the work behind the scenes.
                </p>
              </div>

              <div className="mt-6 flex flex-col items-center lg:items-start">
                <Image
                  src="/images/brand/svg/signature-full.svg"
                  alt="Colin Kirby"
                  width={306}
                  height={119}
                  className="h-12 w-auto sm:h-14"
                />
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/55">
                  Founder, CK Works
                </p>
                <span className="mt-3 block h-px w-7 bg-forest" aria-hidden />
              </div>
            </div>
          </article>

          {/* Portrait — desktop only */}
          <div
            className="relative z-30 mx-auto hidden w-full max-w-[24rem] rounded-[1.85rem] border border-line bg-card p-3 shadow-[0_22px_60px_-18px_rgba(31,36,32,0.34)] lg:absolute lg:left-[var(--portrait-left)] lg:top-[var(--portrait-top)] lg:block lg:w-[var(--portrait-width)] lg:max-w-none lg:-translate-y-1/2 lg:rotate-[var(--portrait-rotate)]"
            style={
              {
                "--portrait-width": portrait.width,
                "--portrait-left": portrait.left,
                "--portrait-top": portrait.top,
                "--portrait-rotate": portrait.rotate,
              } as CSSProperties
            }
          >
            <div className="relative aspect-[4/5.15] overflow-hidden rounded-[1.35rem] bg-forest-soft">
              <Image
                src="/images/founder/jpg/portrait.jpg"
                alt="Colin Kirby"
                fill
                sizes="(max-width: 1024px) 88vw, 384px"
                quality={92}
                className="object-cover object-[center_20%]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
