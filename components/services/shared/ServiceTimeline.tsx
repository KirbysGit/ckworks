import type { CSSProperties } from "react";
import { Clock } from "lucide-react";
import type { ServiceTimeline as ServiceTimelineData } from "@/lib/services";

/**
 * One-line timeline answer for a service hero. Sits between the hero copy and
 * the CTA row — after the page has explained the service, before it asks for
 * the click, which is where "how long will this take?" actually gets asked.
 *
 * Deliberately not a card: the hero already carries a device preview, and
 * `AGENTS.md` warns against turning every element into one.
 *
 * Renders nothing when a service has no range we can stand behind yet.
 */
export default function ServiceTimeline({
  timeline,
  className = "",
  style,
}: {
  timeline: ServiceTimelineData | null;
  className?: string;
  /** Each hero passes its own `ck-rise` animation delay. */
  style?: CSSProperties;
}) {
  if (!timeline) return null;

  return (
    <p
      className={`flex items-start gap-2.5 text-sm leading-6 text-muted ${className}`}
      style={style}
    >
      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.8} />
      <span>
        {/*
          Mobile shows the figure alone, prefixed with "~" so it still reads as
          an estimate rather than a commitment. The lead-in and the caveat are
          desktop-only: stacked on a phone they ran to three lines and were the
          longest thing in the hero. Nothing is lost — every service page
          repeats the full sentence, caveat included, in its FAQ.

          Only the figure is emphasised; bolding the lead-in too made the line
          read heavy against the hero copy above it.
        */}
        <span className="sm:hidden" aria-hidden>
          ~{" "}
        </span>
        <span className="hidden sm:inline">{timeline.lead} </span>
        <span className="font-semibold text-ink">{timeline.value}</span>
        <span className="hidden sm:inline"> — {timeline.note}.</span>
      </span>
    </p>
  );
}
