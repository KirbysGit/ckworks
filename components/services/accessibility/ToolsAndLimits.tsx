/**
 * "What tools can and cannot do" note on the Web Accessibility page.
 *
 * Deliberately a compact band rather than a full section: it sits between the
 * process band and the Title II band to answer the objection a public-entity
 * buyer will have already met, which is an overlay product promising compliance
 * for a monthly fee. Without it, the reader's takeaway from a deadline is to buy
 * a widget.
 *
 * Stays technically neutral per `docs/web-accessibility-service.md`. Describe
 * what the category does and does not change. Do not name or attack vendors.
 */
import Reveal from "@/components/ui/Reveal";

const toolNotes = [
  {
    title: "Automated checks",
    body: "Find detectable, objective failures quickly, and are useful for catching regressions over time.",
  },
  {
    title: "Human judgment",
    body: "Focus order, meaningful alternatives, clear instructions, recoverable errors, and complete journeys still need a person.",
  },
  {
    title: "Overlays and widgets",
    body: "Layer on top of a website. They do not change the underlying pages, documents, or workflows.",
  },
] as const;

export default function AccessibilityToolsAndLimits() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <Reveal className="block rounded-2xl border border-line bg-sand/60 px-6 py-7 sm:px-8 sm:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          What tools can and cannot do
        </p>

        <div className="mt-6 grid gap-7 lg:grid-cols-3 lg:gap-9">
          {toolNotes.map(({ title, body }, index) => (
            <div
              key={title}
              className={`min-w-0 ${
                index > 0 ? "lg:border-l lg:border-line lg:pl-9" : ""
              }`}
            >
              <h3 className="font-serif text-xl font-medium leading-snug text-ink">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
