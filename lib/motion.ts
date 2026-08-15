import type { CSSProperties } from "react";
import type { Variants } from "framer-motion";

/**
 * Delay for a `ck-*` primitive that reads `--ck-anim-delay` — `ck-step`,
 * `ck-draw-x`, `ck-resolve`, `ck-loadbar`, `ck-skeleton`. Those set their own
 * `animation-delay`, so a plain `animationDelay` style is ignored on them.
 * Everything else takes `style={{ animationDelay }}` instead.
 */
export const animDelay = (ms: number) =>
  ({ "--ck-anim-delay": `${ms}ms` }) as CSSProperties;

// Shared, restrained motion presets. Keep everything calm and slow.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const floatIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Standard viewport config so sections animate once as they scroll in.
export const inView = { once: true, amount: 0.3 } as const;
