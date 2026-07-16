"use client";

import Image from "next/image";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

type Size = "sm" | "md" | "lg";

type Props = {
  className?: string;
  showWordmark?: boolean;
  size?: Size;
};

/**
 * Brand mark = constant clover icon + wordmark that swaps for dark mode.
 *
 *  - /images/brand/svg/icon.svg           green gradient clover — reads on any background,
 *                               so it stays the same in light and dark mode.
 *  - /images/brand/svg/wordmark-light.svg  near-black text, shown in LIGHT mode.
 *  - /images/brand/svg/wordmark-dark.svg  ivory text, shown in DARK mode (dark: variant).
 *
 * Sized by height (w-auto) so each wordmark keeps its own aspect ratio.
 * Dark-mode swap is driven by the `dark` class on <html> (see tailwind.config).
 *
 * On hover, the clover does a single forward 360° spin with a small scale-pop.
 * The spin is triggered imperatively (not whileHover) so it always rotates the
 * same direction and never plays in reverse when the pointer leaves.
 */

// Single source of truth for logo sizing. Tweak here to rescale everywhere.
const scales: Record<Size, { icon: string; wordmark: string; gap: string }> = {
  sm: { icon: "h-7", wordmark: "h-6", gap: "gap-0.1" },
  md: { icon: "h-12", wordmark: "h-11", gap: "gap-0.25" },
  lg: { icon: "h-14", wordmark: "h-12", gap: "gap-0.5" },
};

export default function Logo({
  className = "",
  showWordmark = true,
  size = "md",
}: Props) {
  const s = scales[size];
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  function playSpin() {
    if (reduceMotion) {
      // Gentle feedback only for users who prefer reduced motion.
      controls.start({ scale: [1, 1.06, 1], transition: { duration: 0.4 } });
      return;
    }
    controls.start({
      rotate: [0, 360],
      scale: [1, 1.12, 1],
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    });
  }

  return (
    <span
      onMouseEnter={playSpin}
      className={`group inline-flex items-center ${s.gap} ${className}`}
    >
      <motion.span
        animate={controls}
        className="inline-flex will-change-transform"
      >
        <Image
          src="/images/brand/svg/icon.svg"
          alt={showWordmark ? "" : "CK Works"}
          width={438}
          height={447}
          priority
          className={`${s.icon} w-auto`}
        />
      </motion.span>

      {showWordmark && (
        <>
          {/* light mode wordmark */}
          <Image
            src="/images/brand/svg/wordmark-light.svg"
            alt="CK Works"
            width={898}
            height={278}
            priority
            className={`${s.wordmark} w-auto dark:hidden`}
          />
          {/* dark mode wordmark */}
          <Image
            src="/images/brand/svg/wordmark-dark.svg"
            alt="CK Works"
            width={512}
            height={145}
            priority
            className={`hidden ${s.wordmark} w-auto dark:block`}
          />
        </>
      )}
    </span>
  );
}
