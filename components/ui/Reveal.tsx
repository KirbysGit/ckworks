"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in ms, applied as a transition delay. */
  delay?: number;
  className?: string;
  /** Element to render. Use "li"/"article" where the markup calls for it. */
  as?: ElementType;
};

/**
 * Scroll-reveal wrapper for below-the-fold content.
 *
 * The server renders children with no hiding class, so the page is fully
 * readable without JS (and for crawlers). Only after mount — and only if the
 * element is still below the viewport — does it hide and wait for an
 * IntersectionObserver to bring it back. Content already on screen at mount
 * is left alone, which avoids a hide-then-show flash.
 *
 * Reveals once; it never re-hides on scroll-back.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "in">("static");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer support, or motion is unwanted: leave content as rendered.
    if (!("IntersectionObserver" in window)) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Already visible on mount — leave it as rendered.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setPhase("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase("in");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealClass =
    phase === "static" ? "" : phase === "hidden" ? "ck-reveal" : "ck-reveal is-in";

  return (
    <Tag
      ref={ref}
      className={`${revealClass} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
