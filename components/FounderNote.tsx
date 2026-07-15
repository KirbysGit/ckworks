"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, inView } from "@/lib/motion";

const founderNoteLayout = {
  portraitMaxWidth: 14.25,
  drawingScale: 0.92,
  drawingOpacity: 0.64,
  drawingOffsetX: 0.35,
  drawingOffsetY: 0.15,
} as const;

export default function FounderNote() {
  const {
    portraitMaxWidth,
    drawingScale,
    drawingOpacity,
    drawingOffsetX,
    drawingOffsetY,
  } = founderNoteLayout;

  return (
    <section id="about" className="bg-sand py-10 lg:py-14">
      <div className="container-ck">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft"
        >
          <div className="grid items-stretch lg:grid-cols-[minmax(13rem,0.82fr)_minmax(0,1.18fr)_minmax(13rem,0.86fr)]">
            <div className="flex items-center justify-center border-b border-line/70 p-4 sm:p-5 lg:border-b-0 lg:border-r">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line/70 bg-forest-soft shadow-soft"
                style={{ maxWidth: `${portraitMaxWidth}rem` }}
              >
                <Image
                  src="/jpg/me.jpg"
                  alt="Colin Kirby"
                  fill
                  sizes="(max-width: 1024px) 70vw, 230px"
                  quality={92}
                  className="object-cover object-[center_20%]"
                />
              </div>
            </div>

            <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-8 lg:py-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest">
                A Note From Colin
              </p>

              <h2 className="mt-3 font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
                Hi, I&apos;m Colin.
              </h2>

              <div className="mt-4 space-y-2.5 text-sm leading-6 text-muted">
                <p>I&apos;m the founder of CK Works.</p>
                <p>
                  I earned my B.S. in Computer Engineering from the University
                  of Central Florida.
                </p>
                <p>
                  I&apos;m based in Orlando, Florida, where I stay active,
                  explore outdoors, and draw inspiration from the place I call
                  home.
                </p>
                <p>
                  I grew up drawing, taught myself guitar and piano, and
                  I&apos;m always learning.
                </p>
                <p>
                  I love the 0 to 1 process, taking an idea from a spark and
                  building something meaningful.
                </p>
              </div>

              <div className="mt-5">
                <Image
                  src="/svg/ck-full-signature.svg"
                  alt="Colin Kirby"
                  width={306}
                  height={119}
                  className="h-11 w-auto sm:h-12"
                />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/55">
                  Founder, CK Works
                </p>
              </div>
            </div>

            <div className="relative min-h-[13rem] overflow-hidden border-t border-line/70 bg-ivory/45 lg:min-h-0 lg:border-l lg:border-t-0">
              <div
                className="grid-texture pointer-events-none absolute inset-0 opacity-55 [mask-image:radial-gradient(circle_at_center,black_38%,transparent_88%)]"
                aria-hidden
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/note-drawing.svg"
                alt=""
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none object-contain"
                style={{
                  height: `${drawingScale * 100}%`,
                  width: "auto",
                  opacity: drawingOpacity,
                  transform: `translate(calc(-50% + ${drawingOffsetX}rem), calc(-50% + ${drawingOffsetY}rem))`,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
