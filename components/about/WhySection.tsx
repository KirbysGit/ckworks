import Image from "next/image";
import { Check, X } from "lucide-react";

/**
 * Owns the About page's "Why CK Works exists" band: the gap story on the
 * left, and a Real Business vs Digital Side comparison on the right.
 *
 * Comparison art knobs (`comparisonArt`):
 * - `padX` / `padTop` — card edge padding; does not change textOffsetX
 * - `wellHeight` — space reserved from the list to the crop line
 * - `cropInset` — padding below the crop line, inside the card
 * - `width` — drawing size
 * - `offsetX` / `offsetY` — drawing nudge (`-` left/up, `+` right/down)
 * - `textOffsetX` — label/list nudge only; does not move the drawing
 * Positive `offsetY` pushes a drawing into the crop line. The top stays open
 * so moving a drawing up will not clip it.
 */

const comparisonArt = {
  padX: "1rem",
  padTop: "1.75rem",
  wellHeight: "7.25rem",
  cropInset: "0.7rem",
  storefront: {
    width: "18rem",
    offsetX: "0rem",
    offsetY: "0.75rem",
    textOffsetX: "2rem",
  },
  browser: {
    width: "16rem",
    offsetX: "0rem",
    offsetY: "3.875rem",
    textOffsetX: "2rem",
  },
} as const;

const realBusiness = [
  "Clear expertise",
  "Happy customers",
  "Strong outcomes",
] as const;

const digitalSide = [
  "Hard to understand",
  "Outdated or generic",
  "Missing the next step",
] as const;

export default function WhySection() {
  return (
    <section className="border-b border-line/70 bg-ivory py-12 lg:py-16">
      <div className="container-ck grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            Why CK Works Exists
          </p>
          <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-[3.35rem]">
            I kept noticing the same gap.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-ink/80 sm:text-[1.05rem] sm:leading-8">
            <p>
              Many businesses are strong in real life, but their website or
              digital side undersells them.
            </p>
            <p>
              The information may be there, but it&apos;s buried, unclear, or
              simply not helping people take the next step.
            </p>
            <p className="font-medium text-ink">
              CK Works exists to close that gap.
            </p>
          </div>
        </div>

        <GapComparison />
      </div>
    </section>
  );
}

function GapComparison() {
  return (
    <div className="relative grid overflow-hidden rounded-2xl border border-line bg-card sm:grid-cols-2">
      <ComparisonColumn
        label="Real Business"
        items={realBusiness}
        tone="positive"
        image={{
          src: "/images/about/svg/about-section-01.svg",
          alt: "Line drawing of a storefront",
          layout: comparisonArt.storefront,
        }}
        className="border-b border-line sm:border-b-0 sm:border-r"
      />

      <span className="relative z-10 mx-auto -my-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ivory text-[0.68rem] font-semibold text-ink sm:hidden">
        vs.
      </span>

      <ComparisonColumn
        label="Digital Side"
        items={digitalSide}
        tone="negative"
        image={{
          src: "/images/about/svg/about-section-02.svg",
          alt: "Line drawing of a generic website layout",
          layout: comparisonArt.browser,
        }}
      />

      <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ivory text-[0.72rem] font-semibold text-ink shadow-[0_4px_12px_-8px_rgba(31,36,32,0.45)] sm:flex">
        vs.
      </span>
    </div>
  );
}

function ComparisonColumn({
  label,
  items,
  tone,
  image,
  className = "",
}: {
  label: string;
  items: readonly string[];
  tone: "positive" | "negative";
  image: {
    src: string;
    alt: string;
    layout: {
      width: string;
      offsetX: string;
      offsetY: string;
      textOffsetX: string;
    };
  };
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[20rem] flex-col sm:min-h-[21.5rem] ${className}`}
      style={{
        paddingLeft: comparisonArt.padX,
        paddingRight: comparisonArt.padX,
        paddingTop: comparisonArt.padTop,
        paddingBottom: comparisonArt.cropInset,
      }}
    >
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: image.layout.width,
          transform: `translateX(${image.layout.textOffsetX})`,
        }}
      >
        <p className="text-[1.35rem] font-bold uppercase tracking-[0.12em] text-ink sm:text-[1.3rem]">
          {label}
        </p>
        <ul className="mt-5 space-y-5">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm font-medium text-ink sm:text-[0.95rem]"
            >
              {tone === "positive" ? (
                <span className="flex size-[1.125rem] shrink-0 items-center justify-center rounded-full bg-forest">
                  <Check className="size-2.5 text-ivory" strokeWidth={3} />
                </span>
              ) : (
                <span className="flex size-[1.125rem] shrink-0 items-center justify-center rounded-full border border-muted/45 text-muted">
                  <X className="size-2.5" strokeWidth={2.4} />
                </span>
              )}
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="relative mt-auto shrink-0"
        style={{
          height: comparisonArt.wellHeight,
          clipPath: "inset(-100% 0 0 0)",
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={420}
          height={280}
          className="absolute bottom-0 left-1/2 h-auto object-contain opacity-90"
          style={{
            width: image.layout.width,
            maxWidth: image.layout.width,
            transform: `translate(calc(-50% + ${image.layout.offsetX}), ${image.layout.offsetY})`,
          }}
        />
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-line"
          aria-hidden
        />
      </div>
    </div>
  );
}
