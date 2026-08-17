"use client";

import Link from "next/link";
import { type MouseEvent, type ReactNode } from "react";
import { useProjectInquiry } from "./ProjectInquiryProvider";

/**
 * "Start a project" everywhere on the site. One label, one behavior.
 *
 * Renders a real link to `/contact` and upgrades a plain left-click into the
 * quick modal. That ordering matters: the modal is an enhancement over a
 * working link, not a replacement for one. It keeps the CTA functional before
 * hydration or if JS fails, keeps `/contact` crawlable and internally linked
 * from every page, and preserves the things a `<button>` quietly takes away —
 * cmd or middle click to open in a new tab, and right-click to copy the
 * address.
 *
 * Modified clicks are deliberately left alone so the browser can handle them.
 *
 * `source` is carried into the inquiry payload, so a conversion from the
 * homepage hero is distinguishable from one in a service footer. Use a stable
 * snake_case value naming the surface, not the page title.
 */

type Variant = "primary" | "secondary" | "ghost";

type ProjectInquiryTriggerProps = {
  children: ReactNode;
  source?: string;
  variant?: Variant;
  className?: string;
  onOpen?: () => void;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-60";

const sizes = "px-6 py-3 text-sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-ivory shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
  secondary:
    "border border-forest/50 bg-transparent text-forest hover:-translate-y-0.5 hover:bg-forest-soft/40 hover:shadow-soft",
  ghost: "text-forest hover:text-ink",
};

/** True when the browser should be left to follow the link itself. */
function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export default function ProjectInquiryTrigger({
  children,
  source,
  variant = "primary",
  className = "",
  onOpen,
}: ProjectInquiryTriggerProps) {
  const { openInquiry } = useProjectInquiry();

  return (
    <Link
      href="/contact"
      onClick={(event) => {
        if (isModifiedClick(event)) return;
        event.preventDefault();
        onOpen?.();
        openInquiry(source, event.currentTarget);
      }}
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
