/**
 * Illustrative city homepage: chrome, masthead, primary nav, hero, and the row
 * of quick actions most public sites lead with. Decorative; the label beside it
 * carries the meaning.
 */
import Image from "next/image";
import { CalendarDays, CreditCard, FileSignature, TriangleAlert } from "lucide-react";

const quickActions = [
  { label: ["Pay a", "bill"], Icon: CreditCard },
  { label: ["Report an", "issue"], Icon: TriangleAlert },
  { label: ["Apply or", "permit"], Icon: FileSignature },
  { label: ["Meeting", "calendar"], Icon: CalendarDays },
] as const;

export default function WebContentGraphic() {
  return (
    <div
      className="w-full overflow-hidden rounded-[0.6rem] border border-line bg-card shadow-soft"
      aria-hidden
    >
      <div className="flex items-center gap-1 border-b border-line bg-sand/45 px-2.5 py-1.5">
        <span className="size-1.5 rounded-full bg-[#ee5c4d]" />
        <span className="size-1.5 rounded-full bg-[#f1bd42]" />
        <span className="size-1.5 rounded-full bg-[#58b64b]" />
      </div>

      {/* Masthead */}
      <div className="flex items-center gap-1.5 px-2.5 py-2">
        {/* Same seal, and the same crop treatment, as the hero mockup. */}
        <span className="grid size-4 shrink-0 place-items-center overflow-hidden rounded-full bg-[#fbfbfb]">
          <Image
            src="/images/services/svg/accessiblity-demo-logo.svg"
            alt=""
            width={20}
            height={20}
            className="max-h-none max-w-none -translate-x-[1.7px] -translate-y-[0.5px]"
          />
        </span>
        <span className="text-[0.55rem] font-semibold leading-none text-ink">
          City of Greenridge
        </span>
        <span className="ml-auto flex w-[6.5rem] items-center justify-between rounded-[0.2rem] border border-line px-1.5 py-[3px]">
          <span className="text-[0.42rem] text-muted">
            Search Greenridge.gov
          </span>
          <span className="block size-1.5 rounded-full border border-muted/70" />
        </span>
      </div>

      {/* Primary navigation */}
      <div className="flex items-center gap-3 bg-forest px-2.5 py-[7px]">
        {["Services", "Government", "Residents", "Business"].map((item) => (
          <span key={item} className="text-[0.46rem] font-medium text-ivory/90">
            {item}
          </span>
        ))}
      </div>

      {/* Hero band */}
      <div className="relative h-[7.5rem] overflow-hidden">
        <Image
          src="/images/services/svg/ada-section-demo-bg.svg"
          alt=""
          fill
          sizes="320px"
          className="object-cover"
        />
        {/* Holds the headline off the artwork's lighter passages. */}
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,20,14,0.12),rgba(9,20,14,0.58))]" />
        <div className="relative px-2.5 pb-3 pt-7">
          <p className="text-[0.92rem] font-semibold leading-[1.22] tracking-[-0.01em] text-ivory">
            Working together
            <br />
            for a stronger Greenridge.
          </p>
          <span className="mt-2.5 inline-block rounded-[0.2rem] bg-ivory/95 px-2 py-[3px] text-[0.44rem] font-semibold text-forest">
            Explore services
          </span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 divide-x divide-line border-t border-line">
        {quickActions.map(({ label, Icon }) => (
          <span
            key={label.join(" ")}
            className="flex flex-col items-center gap-1 px-1 py-2.5 text-center"
          >
            <Icon className="size-3 text-forest" strokeWidth={1.5} />
            <span className="text-[0.42rem] leading-[1.35] text-ink/80">
              {label[0]}
              <br />
              {label[1]}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
