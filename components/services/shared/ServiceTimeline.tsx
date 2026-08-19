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
        {/* Only the figure is emphasised — bolding the lead-in too made the
            line read heavy against the hero copy above it. */}
        {timeline.lead}{" "}
        <span className="font-semibold text-ink">{timeline.value}</span> —{" "}
        {timeline.note}.
      </span>
    </p>
  );
}
