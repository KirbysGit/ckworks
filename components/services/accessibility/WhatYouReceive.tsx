/**
 * "What you receive" band on the Web Accessibility page.
 *
 * Sits between the process band and the tools band, which is where a reader who
 * has just been told how the work proceeds asks what actually lands in their
 * hands. Without it the page explains the method and never names the output.
 *
 * The copy stays inside the boundaries in `docs/web-accessibility-service.md`,
 * which still lists the report format, severity scheme, and retest as open
 * delivery decisions. Note what the last item does and does not say: it names
 * what should be rechecked without promising that a recheck is included. Keep
 * that distinction if this is ever reworded.
 *
 * Icons are deliberately not the ones the process band uses. That band sits
 * directly above with List, Wrench, and RefreshCw for Prioritize, Improve, and
 * Maintain; reusing them here for different ideas made the same three glyphs
 * mean two things within one screen.
 */
import {
  ArrowDownWideNarrow,
  BookOpenCheck,
  FileText,
  ListTodo,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { serviceSectionTitleClassName } from "../shared/styles";

const deliverables = [
  {
    title: "Defined scope",
    body: "Pages, templates, documents, and journeys reviewed.",
    icon: FileText,
  },
  {
    title: "Prioritized findings",
    body: "Confirmed barriers organized by user impact.",
    icon: ArrowDownWideNarrow,
  },
  {
    title: "Practical guidance",
    body: "Evidence, WCAG references, and recommended fixes.",
    icon: BookOpenCheck,
  },
  {
    title: "Next steps",
    body: "What CK Works can address and what should be rechecked.",
    icon: ListTodo,
  },
] as const;

/**
 * Breaks after the first word so every title reads as two centred lines.
 *
 * A forced break rather than a narrow container: relying on wrapping made the
 * break point move with the column width, so the four titles disagreed with
 * each other between lg and roughly 1250px. This way they are identical at
 * every size, and the longest single word sets the width rather than the
 * longest phrase.
 */
function StackedTitle({ text }: { text: string }) {
  const [first, ...rest] = text.split(" ");
  return (
    <>
      <span className="block">{first}</span>
      <span className="block">{rest.join(" ")}</span>
    </>
  );
}

/**
 * Borders describe the grid at each breakpoint: stacked rows on mobile, a 2x2
 * with a cross at sm, and one divided row at lg. The lg resets come last so
 * they win over the sm rules at the wide end.
 */
function cellBorders(index: number) {
  return [
    "max-sm:border-t max-sm:first:border-t-0",
    index % 2 === 1 ? "sm:border-l" : "",
    index > 1 ? "sm:border-t" : "",
    "lg:border-t-0",
    index > 0 ? "lg:border-l" : "",
  ].join(" ");
}

export default function AccessibilityWhatYouReceive() {
  return (
    <section
      id="what-you-receive"
      className="grid scroll-mt-24 gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-12 lg:py-16"
    >
      <Reveal className="max-w-md lg:self-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          What you receive
        </p>
        <h2 className={serviceSectionTitleClassName}>A clear path forward.</h2>
        <p className="mt-4 text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
          Each review ends with practical information your team can act on.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {deliverables.map(({ title, body, icon: Icon }, index) => (
          <Reveal
            key={title}
            delay={index * 80}
            className={`min-w-0 border-line px-0 py-6 text-center sm:px-5 sm:py-4 lg:px-5 ${cellBorders(index)}`}
          >
            <Icon
              className="mx-auto size-7 text-forest"
              strokeWidth={1.5}
              aria-hidden
            />
            {/* Fixed height so the bodies share a baseline whether the title
                wraps or not; it does wrap between lg and roughly 1250px. */}
            <h3 className="mt-5 font-serif text-2xl font-semibold leading-[1.12] tracking-[-0.01em] text-ink">
              <StackedTitle text={title} />
            </h3>
            <p className="mx-auto mt-2.5 max-w-[15rem] text-sm leading-6 text-muted">
              {body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
