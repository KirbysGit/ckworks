/**
 * Renders the full-width Web Accessibility showcase on the services index.
 * The desktop review diagram deliberately collapses to one focused journey on mobile.
 */
import Link from "next/link";
import {
  AlignLeft,
  ArrowRight,
  Keyboard,
  ListChecks,
} from "lucide-react";
import type { ServiceArea } from "@/lib/services";

const reviewItems = [
  {
    title: "Keyboard",
    detail: "Focus order reviewed",
    icon: Keyboard,
  },
  {
    title: "Forms",
    detail: "Labels and errors reviewed",
    icon: ListChecks,
  },
  {
    title: "Content",
    detail: "Contrast and structure reviewed",
    icon: AlignLeft,
  },
] as const;

const structureItems = [
  { type: "H1", label: "Welcome", bars: ["72%"] },
  { type: "H2", label: "Contact Us", bars: ["72%"] },
  { type: "Form", label: "Name, email, message", bars: ["72%", "42%"] },
] as const;

export default function AccessibilityOverviewCard({
  service,
  number,
  description,
}: {
  service: ServiceArea;
  number: string;
  description: string;
}) {
  return (
    <article className="group/card grid h-full min-h-[21.25rem] overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift md:grid-cols-[minmax(18rem,0.86fr)_minmax(0,2.44fr)]">
      <div className="relative flex min-w-0 flex-col border-b border-line px-6 py-7 sm:px-8 sm:py-8 md:border-b-0">
        <span
          className="pointer-events-none absolute inset-y-8 right-0 hidden w-px bg-line md:block"
          aria-hidden
        />
        <span className="font-serif text-2xl font-medium leading-none tracking-[-0.02em] text-[#A8713B]">
          {number}
        </span>
        <h2 className="mt-6 max-w-[22rem] font-serif text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-ink sm:text-[2.55rem]">
          {service.title}
        </h2>
        <p className="mt-6 max-w-[26rem] text-base leading-8 text-ink/78 md:text-[0.95rem] md:leading-7">
          {description}
        </p>

        <Link
          href={service.href}
          className="group/link mt-9 inline-flex w-fit items-center gap-2 border-b border-[#A8713B] pb-0.5 text-base font-semibold text-ink transition-colors hover:text-forest md:mt-auto"
        >
          View service
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>

      <div
        className="flex min-h-0 min-w-0 flex-col justify-center"
        data-nosnippet
      >
        <div
          className="grid h-full min-w-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] md:items-center xl:grid-cols-[minmax(10rem,0.82fr)_minmax(18rem,1.38fr)_minmax(14rem,1.08fr)]"
          aria-hidden
        >
          <PageStructurePanel />
          <ContactFormPanel />
          <ReviewPanel />
        </div>

        <p className="px-5 pb-5 pt-3 text-center text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">
          Illustrative accessibility review
        </p>
      </div>
    </article>
  );
}

function PageStructurePanel() {
  return (
    <div className="relative hidden min-h-[14.5rem] min-w-0 flex-col px-5 py-5 xl:flex">
      <span
        className="pointer-events-none absolute inset-y-3 right-0 w-px bg-line"
        aria-hidden
      />
      <p className="text-sm font-semibold text-ink">Page structure</p>
      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-evenly">
        {structureItems.map((item) => (
          <div key={item.type} className="grid grid-cols-[1.75rem_1fr] gap-2">
            <span className="pt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-forest/80">
              {item.type}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-5 text-ink">
                {item.label}
              </p>
              <div className="mt-1.5 space-y-1.5">
                {item.bars.map((width, index) => (
                  <span
                    key={`${item.type}-${index}`}
                    className="block h-1.5 rounded-full bg-line/80"
                    style={{ width }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactFormPanel() {
  const fields = [
    { label: "Name", value: "Jane Smith", active: false, tall: false },
    {
      label: "Email",
      value: "jane@example.com",
      active: true,
      tall: false,
    },
    {
      label: "Message",
      value: "How can we help?",
      active: false,
      tall: true,
    },
  ] as const;

  return (
    <div className="relative flex min-h-[14.5rem] min-w-0 flex-col px-5 py-2.5">
      <span
        className="pointer-events-none absolute inset-y-3 right-0 hidden w-px bg-line md:block"
        aria-hidden
      />
      <p className="ml-10 text-xl font-semibold tracking-[-0.02em] text-ink">
        Contact Us
      </p>
      <p className="ml-10 mt-1 text-sm text-muted">
        We&apos;d love to hear from you.
      </p>

      <div className="mt-2 grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3">
        <div className="relative flex flex-col items-center justify-between py-3">
          <span className="absolute bottom-5 top-5 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-forest/65" />
          {[1, 2, 3].map((step) => (
            <span
              key={step}
              className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-forest text-xs font-semibold text-card shadow-soft"
            >
              <span className="translate-y-px leading-none">{step}</span>
            </span>
          ))}
        </div>

        <div className="min-w-0 space-y-1.5">
          {fields.map((field) => (
            <div key={field.label}>
              <p className="text-xs font-medium leading-none text-ink">
                {field.label}
              </p>
              <div
                className={`mt-1 rounded-md border px-3 py-1.5 text-sm text-ink/85 ${
                  field.tall ? "min-h-10" : "min-h-8"
                } ${
                  field.active
                    ? "border-[#4F8FEA] bg-card ring-2 ring-[#4F8FEA]/25"
                    : "border-line bg-card/65"
                }`}
              >
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="ml-10 mt-2 inline-flex self-start rounded-md bg-ink px-3 py-1.5 text-sm font-semibold text-card">
        Send message
      </span>
    </div>
  );
}

function ReviewPanel() {
  return (
    <div className="hidden min-h-[14.5rem] min-w-0 flex-col overflow-hidden px-5 py-5 md:flex">
      <p className="text-sm font-semibold text-ink">Accessibility review</p>
      <div className="mt-2 flex min-h-0 flex-1 flex-col divide-y divide-line">
        {reviewItems.map(({ title, detail, icon: Icon }) => (
          <div
            key={title}
            className="flex flex-1 items-center gap-3 px-2.5 py-1.5"
          >
            <Icon
              className="h-6 w-6 shrink-0 text-forest"
              strokeWidth={1.8}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5 text-ink">
                {title}
              </p>
              <p className="text-xs leading-5 text-muted">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
