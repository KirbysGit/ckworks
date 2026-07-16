"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

type Props = {
  show: boolean;
  /** Underline asset — defaults to the nav hand-drawn stroke */
  src?: string;
  className?: string;
};

/**
 * Hand-drawn underline that writes left → right on show and
 * erases through the far end on hide. Shared by header + footer.
 */
export default function DrawUnderline({
  show,
  src = "/images/nav/svg/underline.svg",
  className = "pointer-events-none absolute -bottom-2.5 left-1/2 block h-[9px] w-[120%] -translate-x-1/2 overflow-hidden",
}: Props) {
  const controls = useAnimationControls();
  const shown = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (show && !shown.current) {
        shown.current = true;
        await controls.start({
          clipPath: "inset(0 0% 0 0)",
          transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
        });
      } else if (!show && shown.current) {
        await controls.start({
          clipPath: "inset(0 0 0 100%)",
          transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
        });
        if (cancelled) return;
        controls.set({ clipPath: "inset(0 100% 0 0)" });
        shown.current = false;
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [show, controls]);

  return (
    <motion.span
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={controls}
      className={className}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full select-none object-fill"
      />
    </motion.span>
  );
}
