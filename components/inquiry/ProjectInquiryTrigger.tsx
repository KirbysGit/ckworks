"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";
import {
  inquiryIntentParam,
  inquiryServiceParam,
  serviceSlugFromPath,
  type InquiryIntent,
} from "@/lib/inquiry";
import type { ServiceSlug } from "@/lib/services";
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
 *
 * The service select is preselected automatically from the page the trigger is
 * rendered on, so every CTA on `/services/<slug>` files under that service with
 * no per-button wiring to keep in sync. Pass `service` only to override that,
 * for example on a case study that should file under the service it proves.
 *
 * The slug also rides along in the `href`, so the same preselection survives
 * the paths that never reach `openInquiry`: cmd-click, no JS, or a crawler
 * following the link to `/contact`.
 */

type Variant = "primary" | "secondary" | "ghost";

type ProjectInquiryTriggerProps = {
  children: ReactNode;
  source?: string;
  /** Overrides the service inferred from the current path. */
  service?: ServiceSlug;
  /** Named starting context; prefills the message field. */
  intent?: InquiryIntent;
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
  service,
  intent,
  variant = "primary",
  className = "",
  onOpen,
}: ProjectInquiryTriggerProps) {
  const { openInquiry } = useProjectInquiry();
  const pathname = usePathname();
  const resolvedService = service ?? serviceSlugFromPath(pathname);

  const params = new URLSearchParams();
  if (resolvedService) params.set(inquiryServiceParam, resolvedService);
  if (intent) params.set(inquiryIntentParam, intent);
  const query = params.toString();

  return (
    <Link
      href={query ? `/contact?${query}` : "/contact"}
      onClick={(event) => {
        if (isModifiedClick(event)) return;
        event.preventDefault();
        onOpen?.();
        openInquiry(source, event.currentTarget, resolvedService, intent);
      }}
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
