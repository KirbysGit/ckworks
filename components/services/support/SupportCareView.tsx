/** Renders the illustrative live-site care workspace in the Support hero. */
import Image from "next/image";
import { CalendarDays, Check, CheckCircle2, Clock3 } from "lucide-react";

const supportCareLayout = {
  /** Desktop keeps the live preview dominant while the care rail saves height. */
  preview: "aspect-[16/8.4] sm:aspect-[16/7.9]",
  outerRadius: "rounded-[1.4rem]",
  workspaceGrid: "lg:grid-cols-[minmax(0,1fr)_11.5rem] lg:gap-0",
} as const;

const updates = [
  ["Service page refreshed", "May 3"],
  ["New project added", "Apr 28"],
  ["Mobile spacing corrected", "Apr 24"],
] as const;

const siteContext = ["Forms", "Mobile", "Tracking", "Content"] as const;

const nextSteps = ["Review estimate", "Add project photos"] as const;

export default function SupportCareView() {
  return (
    <figure id="example-support" className="scroll-mt-28">
      <div className={`grid gap-3 ${supportCareLayout.workspaceGrid}`}>
        <div
          className={`${supportCareLayout.outerRadius} border border-line bg-card p-3 shadow-[0_26px_54px_-34px_rgba(31,36,32,0.5)] sm:p-4`}
        >
          <SupportCareHeader />
          <SitePreview />
          <NextUpBar />
        </div>

        <CareStatusRail />
      </div>

      <figcaption className="mt-3 text-center text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted">
        Illustrative client care example
      </figcaption>
    </figure>
  );
}

function SupportCareHeader() {
  return (
    <header className="flex items-center justify-between gap-4 px-2 pb-3 text-sm sm:px-3 sm:text-base">
      <p className="font-semibold tracking-[-0.01em] text-ink">
        riverstonebuilders.com
      </p>
      <p className="inline-flex shrink-0 items-center gap-1.5 font-medium text-forest">
        Live
        <Check className="h-4 w-4" strokeWidth={2.1} aria-hidden />
      </p>
    </header>
  );
}

function SitePreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ivory/45">
      <HeroPreview />
      <SiteDetailRow />
    </div>
  );
}

function HeroPreview() {
  return (
    <section
      className={`relative overflow-hidden ${supportCareLayout.preview}`}
    >
      <Image
        src="/images/services/png/05-hero-demo-01.png"
        alt="Illustrative Riverstone Builders custom home website"
        fill
        sizes="(max-width: 1024px) 100vw, 64vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-y-0 left-0 w-[58%] bg-ivory/50"
        aria-hidden
      />
      <div className="absolute inset-y-0 left-0 flex w-[58%] flex-col justify-center px-5 py-4 sm:px-8 lg:px-9">
        <p className="text-[0.48rem] font-semibold uppercase tracking-[0.18em] text-ink/85 sm:text-[0.56rem]">
          Custom homes. Lasting value.
        </p>
        <h3 className="mt-2 max-w-[12ch] font-serif text-[1.45rem] font-medium leading-[0.98] text-ink sm:text-[1.9rem] lg:text-[2.12rem]">
          Thoughtful design. Built to last.
        </h3>
        <p className="mt-2.5 max-w-[17rem] text-[0.66rem] leading-4 text-ink/82 sm:text-[0.72rem] sm:leading-[1.15rem]">
          Quality craftsmanship and an honest process from concept to
          completion.
        </p>
        <span className="mt-3 inline-flex w-fit rounded-md bg-forest px-3 py-1.5 text-[0.54rem] font-semibold uppercase tracking-[0.13em] text-ivory sm:text-[0.6rem]">
          Our work
        </span>
      </div>
    </section>
  );
}

function SiteDetailRow() {
  return (
    <section className="grid gap-4 px-5 py-4 sm:grid-cols-[0.82fr_0.96fr_1.05fr] sm:px-7 sm:py-5">
      <div>
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.17em] text-ink/80">
          Our approach
        </p>
        <p className="mt-2 max-w-[16rem] text-[0.68rem] leading-4 text-ink/80 sm:text-xs sm:leading-5">
          Custom homes built with care and clear communication.
        </p>
        <span className="mt-3 inline-flex text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-forest">
          Learn more -&gt;
        </span>
      </div>

      <div className="relative aspect-[1.45/1] overflow-hidden rounded-lg border border-line sm:self-center">
        <Image
          src="/images/services/png/05-hero-demo-02.png"
          alt="Illustrative modern farmhouse kitchen project"
          fill
          sizes="(max-width: 640px) 100vw, 24vw"
          className="object-cover"
        />
      </div>

      <div>
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.17em] text-ink/80">
          Recent project
        </p>
        <h4 className="mt-2 font-serif text-lg font-medium leading-tight text-ink sm:text-xl">
          Modern Farmhouse
        </h4>
        <p className="mt-2 text-[0.68rem] leading-4 text-ink/80 sm:text-xs sm:leading-5">
          A warm, modern home designed for everyday living.
        </p>
        <span className="mt-3 inline-flex text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-forest">
          View project -&gt;
        </span>
      </div>
    </section>
  );
}

function CareStatusRail() {
  return (
    <aside className="relative z-10 grid gap-3 lg:-ml-8 lg:w-[13.75rem] lg:self-center">
      <section className="rounded-xl border border-line bg-card/95 p-4 shadow-[0_18px_42px_-32px_rgba(31,36,32,0.45)] sm:p-5">
        <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-forest">
          <Clock3 className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          Last updated
        </p>
        <ul className="mt-3 space-y-2 text-[0.72rem] text-ink/82 sm:text-[0.78rem]">
          {updates.map(([label, date]) => (
            <li key={label} className="flex items-center gap-2.5">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest"
                aria-hidden
              />
              <span className="min-w-0 flex-1">{label}</span>
              <span className="shrink-0 text-muted">{date}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-line bg-card/95 p-4 shadow-[0_18px_42px_-32px_rgba(31,36,32,0.45)] sm:p-5">
        <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-forest">
          <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          Site context
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[0.72rem] font-medium text-ink/86 sm:text-[0.78rem]">
          {siteContext.map((item) => (
            <li key={item} className="flex items-center justify-between gap-2">
              <span>{item}</span>
              <Check
                className="h-3.5 w-3.5 shrink-0 text-forest"
                strokeWidth={2.2}
                aria-hidden
              />
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

function NextUpBar() {
  return (
    <section className="mt-3 flex flex-col gap-3 rounded-xl border border-line bg-ivory/35 px-4 py-3.5 sm:flex-row sm:items-center sm:px-4">
      <p className="flex shrink-0 items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink sm:pr-3">
        <CalendarDays
          className="h-4 w-4 text-forest"
          strokeWidth={1.8}
          aria-hidden
        />
        Next up
      </p>
      <div className="grid flex-1 gap-2 border-t border-line pt-3 sm:grid-cols-[0.86fr_1.14fr] sm:gap-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
        {nextSteps.map((step, index) => (
          <p
            key={step}
            className="flex items-center gap-2 text-[0.72rem] text-ink/85 sm:text-[0.8rem]"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-soft/70 text-[0.72rem] font-semibold text-forest">
              {index + 1}
            </span>
            {step}
          </p>
        ))}
      </div>
    </section>
  );
}
