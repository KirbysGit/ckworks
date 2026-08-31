"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Makes every framer-motion animation on the site honour
 * `prefers-reduced-motion`.
 *
 * The hand-rolled `ck-*` animations in `globals.css` each opt in through the
 * reduced-motion block at the bottom of that file, but framer has no equivalent
 * and defaults to animating regardless. That left the homepage service cards,
 * the header dropdown, and the FAQ accordion moving for people who had asked
 * the operating system for less motion.
 *
 * `reducedMotion="user"` keeps transforms and opacity changes but skips the
 * animation, so layouts still arrive in their final state.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
