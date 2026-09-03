/**
 * Pairs the Title II content-and-exceptions framing with one layered document
 * composition, including the Greenridge seals and handwritten review notes.
 */
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { serviceContainer } from "@/components/services/shared/styles";

type PlaceholderSection = readonly string[];
type PaperVariant = "archived" | "vendor" | "notice";

const paperLines = {
  archived: [
    ["42%"],
    ["100%", "95%", "98%", "84%"],
    ["100%", "91%", "97%", "76%"],
    ["89%", "100%", "68%"],
  ],
  vendor: [
    ["36%"],
    ["100%", "92%", "97%"],
    ["98%", "86%", "100%", "91%"],
    ["94%", "81%", "98%"],
  ],
  notice: [
    ["40%"],
    ["100%", "95%", "98%", "87%"],
    ["98%", "92%", "100%", "82%"],
    ["94%", "100%", "74%"],
  ],
} satisfies Record<string, readonly PlaceholderSection[]>;

// These positions own the paper stack and its handwritten review notes.
// The notes use artwork that already includes its arrow, so each needs one
// plain position/width control rather than a separate connector.
const paperLayout = {
  archived:
    "left-[1%] top-[2%] h-[60%] w-[49%] -rotate-[0.35deg] sm:left-[3%] sm:w-[47%]",
  vendor:
    "left-[21%] top-[12%] h-[60%] w-[52%] rotate-[0.2deg] sm:left-[23%] sm:w-[50%]",
  notice:
    "left-[40%] top-[31%] h-[64%] w-[48%] -rotate-[0.12deg] sm:left-[42%] sm:w-[45%]",
} as const;

const annotationLayout = {
  maintains:
    "right-[-1%] top-[10%] w-[31%] sm:right-[-2%] sm:top-[9%] sm:w-[31%]",
  current:
    "right-[-1%] top-[43%] w-[24%] sm:right-[-8%] sm:top-[41%] sm:w-[24%]",
} as const;

function PlaceholderLines({
  sections,
}: {
  sections: readonly PlaceholderSection[];
}) {
  return (
    <div className="mt-[clamp(1rem,3.6cqw,1.8rem)] space-y-[clamp(1rem,3.4cqw,1.65rem)]">
      {sections.map((section, sectionIndex) => (
        <div
          key={`${section[0]}-${sectionIndex}`}
          className="space-y-[clamp(0.5rem,1.55cqw,0.75rem)]"
        >
          {section.map((width, lineIndex) => (
            <span
              key={`${width}-${lineIndex}`}
              className={`block rounded-full bg-ink ${
                section.length === 1
                  ? "h-[2px] opacity-25"
                  : "h-px opacity-20"
              }`}
              style={{ width }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function SealMark() {
  return (
    <span className="relative block size-[clamp(2rem,6cqw,2.8rem)] shrink-0">
      <Image
        src="/images/services/svg/ada-greenridge-medallion.svg"
        alt=""
        fill
        sizes="48px"
        className="object-contain"
      />
    </span>
  );
}

function PaperFormat({ variant }: { variant: PaperVariant }) {
  if (variant === "vendor") {
    return (
      <div className="mt-[clamp(0.9rem,3cqw,1.4rem)] rounded-[0.12rem] border border-current/18 p-[clamp(0.65rem,2.3cqw,1.05rem)]">
        <div className="grid grid-cols-[0.32fr_1fr] gap-[clamp(0.55rem,2cqw,0.9rem)]">
          <div className="space-y-[clamp(0.45rem,1.3cqw,0.65rem)] border-r border-current/15 pr-[clamp(0.4rem,1.5cqw,0.7rem)] opacity-25">
            <span className="block h-1.5 w-[78%] rounded-full bg-current" />
            <span className="block h-px w-full bg-current" />
            <span className="block h-px w-[88%] bg-current" />
            <span className="block h-px w-[72%] bg-current" />
          </div>
          <div className="space-y-[clamp(0.5rem,1.45cqw,0.7rem)] opacity-25">
            <span className="block h-1.5 w-[45%] rounded-full bg-current" />
            <span className="block h-px w-full bg-current" />
            <span className="block h-px w-[92%] bg-current" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[clamp(0.9rem,3cqw,1.4rem)] flex items-center gap-[clamp(0.65rem,2.2cqw,1rem)]">
      <span className={variant === "archived" ? "opacity-55" : "opacity-80"}>
        <SealMark />
      </span>
      <div className="min-w-0 flex-1 space-y-[clamp(0.45rem,1.25cqw,0.6rem)] opacity-55">
        <span className="block h-px w-full bg-current/45" />
        <span className="block h-px w-[72%] bg-current/35" />
        {variant === "notice" ? (
          <span className="block h-px w-[88%] bg-current/30" />
        ) : null}
      </div>
    </div>
  );
}

function Paper({
  title,
  sections,
  className,
  variant,
  muted = false,
  browser = false,
}: {
  title: string;
  sections: readonly PlaceholderSection[];
  className: string;
  variant: PaperVariant;
  muted?: boolean;
  browser?: boolean;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[0.18rem] border px-[clamp(0.8rem,3.5cqw,1.7rem)] py-[clamp(0.9rem,3.8cqw,1.8rem)] shadow-[inset_0_0_30px_rgba(138,131,117,0.045),0_20px_44px_-28px_rgba(31,36,32,0.5)] ${className} ${
        muted
          ? "border-[#d3cabd] bg-[#fffdf7] text-muted/80"
          : "border-[#c8d2c4] bg-[#fffef8] text-forest"
      }`}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:radial-gradient(circle_at_center,rgba(95,102,95,0.38)_0_0.45px,transparent_0.65px)] [background-size:7px_7px]"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="flex items-center gap-3 border-b border-current/25 pb-[clamp(0.6rem,2cqw,1rem)]">
          <p className="text-[clamp(0.58rem,1.45cqw,0.78rem)] font-semibold uppercase leading-tight tracking-[0.08em]">
            {title}
          </p>
          {browser ? (
            <span className="ml-auto grid gap-1 opacity-75" aria-hidden="true">
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
            </span>
          ) : null}
        </div>

        <PaperFormat variant={variant} />
        <PlaceholderLines sections={sections} />
      </div>
    </div>
  );
}

function PaperStack() {
  return (
    <figure
      className="mx-auto w-full max-w-[40rem]"
      aria-label="Illustrative stack of archived, vendor-managed, and current public documents"
    >
      <div
        className="relative h-[30rem] w-full [container-type:inline-size] sm:h-[34rem] lg:h-[36rem]"
        aria-hidden="true"
      >
        <Paper
          title="Archived record · 2019"
          sections={paperLines.archived}
          className={paperLayout.archived}
          variant="archived"
          muted
        />
        <Paper
          title="Vendor platform"
          sections={paperLines.vendor}
          className={paperLayout.vendor}
          variant="vendor"
          browser
        />
        <Paper
          title="Current public notice"
          sections={paperLines.notice}
          className={paperLayout.notice}
          variant="notice"
        />
        <Image
          src="/images/services/svg/ada-who-maintains.svg"
          alt=""
          width={954}
          height={409}
          sizes="(min-width: 1024px) 250px, 34vw"
          className={`absolute h-auto ${annotationLayout.maintains}`}
        />
        <Image
          src="/images/services/svg/ada-still-used-today.svg"
          alt=""
          width={792}
          height={388}
          sizes="(min-width: 1024px) 220px, 30vw"
          className={`absolute h-auto ${annotationLayout.current}`}
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-muted sm:ml-[42%] sm:justify-start sm:text-left sm:text-sm">
        <span className="h-px w-6 shrink-0 bg-forest" aria-hidden="true" />
        <span>Context determines what needs evaluation.</span>
      </figcaption>
    </figure>
  );
}

export default function ContentContext() {
  return (
    <section
      id="content-context"
      className="scroll-mt-24 border-b border-line bg-ivory py-16 sm:py-20 lg:py-24"
    >
      <div
        className={`${serviceContainer} grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-20`}
      >
        <div className="mx-auto max-w-[35rem] text-center sm:mx-0 sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
            Content, vendors, and exceptions
          </p>
          <h2 className="mt-5 font-serif text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.025em] text-ink sm:text-[3.25rem] lg:text-[3.55rem]">
            <span className="block">Some content</span>
            <span className="block lg:whitespace-nowrap">
              requires a closer look.
            </span>
          </h2>

          <div className="mx-auto mt-7 max-w-[33rem] space-y-5 text-sm leading-7 text-ink/78 sm:mx-0 sm:text-base">
            <p>
              Older documents and archived content are not all treated the
              same way. Third-party contributions and vendor-managed systems
              can add another layer.
            </p>
            <p>
              Current use, location, ownership, and relationship to a public
              service all matter. A file label or vendor name does not answer
              the question by itself.
            </p>
          </div>

          <a
            href="https://www.ada.gov/resources/web-rule-first-steps/"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 py-1 text-sm font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-forest/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:text-base"
          >
            Read current DOJ guidance
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>

        <PaperStack />
      </div>
    </section>
  );
}
