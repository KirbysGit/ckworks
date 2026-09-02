/**
 * Illustrative permit application: a step indicator, the fields a resident
 * fills in, and the confirmation they have to be able to reach. Decorative; the
 * label carries the meaning.
 *
 * Sized to stand close to the band's shared baseline rather than floating in
 * the middle of its column, so the row reads as four deliberate compositions.
 */
import { Check, ChevronDown } from "lucide-react";

const steps = ["Start", "Details", "Review"] as const;

const fields = [
  { label: "Project address", value: "123 Oak Street", select: false },
  { label: "Project type", value: "Addition", select: true },
] as const;

export default function FormsGraphic() {
  return (
    <div
      className="w-full overflow-hidden rounded-[0.7rem] border border-line bg-card px-4 py-4 shadow-soft"
      aria-hidden
    >
      <p className="text-[0.86rem] font-semibold leading-tight text-ink">
        Building Permit Application
      </p>

      <div className="mt-4 flex items-start">
        {steps.map((step, index) => (
          <span key={step} className="flex flex-1 items-start last:flex-none">
            <span className="flex w-11 shrink-0 flex-col items-center gap-1.5">
              <span
                className={`flex size-[1.35rem] items-center justify-center rounded-full text-[0.58rem] font-semibold ${
                  index === 0
                    ? "bg-forest text-ivory"
                    : "border border-line bg-card text-muted"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`text-[0.55rem] leading-none ${
                  index === 0 ? "font-semibold text-ink" : "text-muted"
                }`}
              >
                {step}
              </span>
            </span>
            {index < steps.length - 1 && (
              <span className="mt-[0.65rem] h-px flex-1 bg-line" />
            )}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {fields.map(({ label, value, select }) => (
          <span key={label} className="block">
            <span className="block text-[0.58rem] font-medium text-ink">
              {label}
            </span>
            <span className="mt-1.5 flex h-[1.65rem] items-center justify-between rounded-[0.28rem] border border-field px-2 text-[0.58rem] text-ink/80">
              {value}
              {select && <ChevronDown className="size-2.5 text-muted" />}
            </span>
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-[0.35rem] bg-forest/10 px-2.5 py-2.5">
        <span className="flex size-[1.1rem] shrink-0 items-center justify-center rounded-full bg-forest">
          <Check className="size-2.5 text-ivory" strokeWidth={3} />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.62rem] font-semibold leading-tight text-ink">
            Application submitted
          </span>
          <span className="mt-0.5 block text-[0.55rem] leading-none text-muted">
            Confirmation #BR-2025-0718
          </span>
        </span>
      </div>
    </div>
  );
}
