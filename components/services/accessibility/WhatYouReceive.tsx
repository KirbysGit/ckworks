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
    title: "Defined Scope",
    body: "Pages, templates, documents, and journeys reviewed.",
    icon: FileText,
  },
  {
    title: "Prioritized Findings",
    body: "Confirmed barriers organized by user impact.",
    icon: ArrowDownWideNarrow,
  },
  {
    title: "Practical Guidance",
    body: "Evidence, WCAG references, and recommended fixes.",
    icon: BookOpenCheck,
  },
  {
    title: "Next Steps",
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
 * Two across with a cross through the middle up to lg, then one divided row.
 * `lg:border-t-0` comes after the base rule so it wins at the wide end; both
 * are border-width utilities, so source order is what decides.
 */
function cellBorders(index: number) {
  return [
    index % 2 === 1 ? "border-l" : "",
    index > 1 ? "border-t" : "",
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
      <Reveal className="mx-auto max-w-md text-center sm:mx-0 sm:text-left lg:self-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          What you receive
        </p>
        <h2 className={serviceSectionTitleClassName}>A clear path forward.</h2>
        <p className="mt-4 text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
          Each review ends with practical information your team can act on.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {deliverables.map(({ title, body, icon: Icon }, index) => (
          <Reveal
            key={title}
            delay={index * 80}
            className={`min-w-0 border-line px-4 py-6 text-center sm:px-5 sm:py-4 lg:px-5 ${cellBorders(index)}`}
          >
            <Icon
              className="mx-auto size-7 text-forest"
              strokeWidth={1.5}
              aria-hidden
            />
            {/* Fixed height so the bodies share a baseline whether the title
                wraps or not; it does wrap between lg and roughly 1250px. */}
            <h3 className="mt-5 font-serif text-[1.6rem] font-semibold leading-[1.12] tracking-[-0.015em] text-ink">
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
