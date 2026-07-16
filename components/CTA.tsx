"use client";

import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import { fadeUp, inView } from "@/lib/motion";

/**
 * ── CTA flanking art (the easy knobs) ────────────────────────────────────
 * Handwritten SVGs that sit left/right of the centered content. All values
 * are applied via inline style, so any number works.
 *   • width   — px width of the art (SVGs are square, so this sets both dims)
 *   • x       — px from its own edge; NEGATIVE pushes it past the edge outward
 *   • top     — vertical anchor as % of the CTA row (50% = middle)
 *   • nudgeY  — fine vertical shift on top of `top` (e.g. "-50%" to center)
 *   • rotate  — degrees; negative tilts left, positive tilts right
 *   • opacity — 0..1
 * Art is hidden below lg (no room once the centered block takes the width).
 */
type ArtPlacement = {
  src: string;
  width: number;
  x: number;
  top: string;
  nudgeY: string;
  rotate: number;
  opacity: number;
};

const ctaArt: { left: ArtPlacement; right: ArtPlacement } = {
  left: {
    src: "/images/cta/svg/left.svg",
    width: 350,
    x: -24,
    top: "50%",
    nudgeY: "-52%",
    rotate: 0,
    opacity: 1,
  },
  right: {
    src: "/images/cta/svg/right.svg",
    width: 280,
    x: -24,
    top: "50%",
    nudgeY: "-48%",
    rotate: 0,
    opacity: 1,
  },
};

export default function CTA() {
  return (
    <section
      id="contact"
      className="border-t border-line/70 bg-ivory py-16 lg:py-24"
    >
      {/* `relative` anchors the flanking art to this container. */}
      <div className="container-ck relative">
        <CtaArt side="left" art={ctaArt.left} />
        <CtaArt side="right" art={ctaArt.right} />

        {/* Centered content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Let&apos;s work together
          </span>

          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Ready to bring your idea to life?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-muted">
            Good projects start with good conversations.
            <br className="hidden sm:block" />{" "}
            Tell me what you&apos;re working on and we&apos;ll take it from
            there.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="mailto:hello@ckworks.co">
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="mailto:hello@ckworks.co" variant="secondary">
              Send me a note
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CtaArt({ side, art }: { side: "left" | "right"; art: ArtPlacement }) {
  const style: CSSProperties = {
    width: art.width,
    top: art.top,
    transform: `translateY(${art.nudgeY}) rotate(${art.rotate}deg)`,
    opacity: art.opacity,
  };
  if (side === "left") style.left = art.x;
  else style.right = art.x;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={art.src}
      alt=""
      aria-hidden
      style={style}
      className="pointer-events-none absolute z-0 hidden h-auto select-none lg:block"
    />
  );
}
