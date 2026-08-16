import Image from "next/image";
import { Menu } from "lucide-react";

/**
 * Owns the device illustration used by Process phase three. Phases one, two,
 * and four each own their complete card composition.
 */

const hearth = {
  logo: "/images/services/svg/01-hearth-logo-demo.svg",
  photo: "/images/services/png/01-hearth-home-demo.png",
} as const;

/** Shows the build result in a laptop and phone pair. */
export function BuildVisual() {
  return (
    <div className="relative pr-[15%]" aria-hidden>
      <div className="relative">
        <div className="rounded-t-xl bg-[linear-gradient(150deg,#2C332D_0%,#171D18_55%,#0B0E0B_100%)] p-[6px] shadow-[0_26px_46px_-30px_rgba(17,23,20,0.78)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[0.35rem] bg-card">
            <HearthDesktop />
          </div>
        </div>
        <div className="relative mx-[-5%] h-[13px] rounded-b-xl bg-[linear-gradient(180deg,#69746A_0%,#414B42_45%,#1B211C_100%)] shadow-[0_14px_22px_-16px_rgba(17,23,20,0.8)]">
          <span className="absolute left-1/2 top-0 h-[5px] w-[15%] -translate-x-1/2 rounded-b-md bg-black/25" />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[27%] min-w-[5.5rem] max-w-[8.5rem]">
        <div className="rounded-[1.35rem] bg-[linear-gradient(145deg,#050605_0%,#181B18_30%,#6F746C_43%,#FFF9EA_49%,#3C423B_56%,#060706_100%)] p-[2px] shadow-[0_18px_32px_-16px_rgba(17,23,20,0.72)]">
          <div className="rounded-[1.25rem] bg-[linear-gradient(145deg,#030403_0%,#0C0F0C_45%,#272D27_58%,#050605_100%)] p-[3px]">
            <div className="relative overflow-hidden rounded-[1.05rem] bg-card">
              <span
                className="pointer-events-none absolute left-1/2 top-[-4px] z-20 h-[11px] w-[38%] -translate-x-1/2 rounded-b-[6px] bg-[#050605]"
                aria-hidden
              />
              <HearthMobile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HearthDesktop() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-line px-3 py-2">
        <Image
          src={hearth.logo}
          alt=""
          width={14}
          height={14}
          className="h-3.5 w-3.5 shrink-0 object-contain"
        />
        <span className="font-serif text-[0.62rem] font-semibold text-ink">
          Hearth &amp; Home
        </span>
        <span className="ml-auto flex items-center gap-2.5 text-[0.46rem] font-semibold text-ink/55">
          {["Services", "Projects", "About"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[0.5fr_0.5fr]">
        <div className="flex flex-col justify-center bg-[#243028] px-3 py-2 text-ivory">
          <p className="font-serif text-[0.82rem] font-medium leading-[1.08]">
            Thoughtful spaces, built around you.
          </p>
          <p className="mt-1 text-[0.46rem] leading-[1.35] text-ivory/78">
            Interior design for calm, considered homes.
          </p>
          <span className="mt-2 inline-flex w-fit rounded bg-[#174A31] px-2 py-1 text-[0.44rem] font-semibold text-ivory">
            View our work
          </span>
        </div>
        <div className="relative min-h-0 overflow-hidden">
          <Image
            src={hearth.photo}
            alt=""
            fill
            sizes="(min-width: 1024px) 560px, 60vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-3 divide-x divide-line border-t border-line bg-[#FAF8F4]">
        {["Warm spaces", "Refined detail", "Easy inquiry"].map((label) => (
          <span
            key={label}
            className="px-0.5 py-1.5 text-center text-[0.42rem] font-semibold leading-tight text-ink/75"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function HearthMobile() {
  return (
    <div className="flex min-h-[11rem] flex-col">
      <div className="flex shrink-0 items-center gap-1 px-2 pb-1 pt-3">
        <Image
          src={hearth.logo}
          alt=""
          width={10}
          height={10}
          className="h-2.5 w-2.5 shrink-0 object-contain"
        />
        <span className="truncate font-serif text-[0.42rem] font-semibold text-ink">
          Hearth &amp; Home
        </span>
        <Menu className="ml-auto h-2 w-2 shrink-0 text-muted" />
      </div>

      <div className="bg-[#243028] px-2 py-2 text-ivory">
        <p className="font-serif text-[0.52rem] font-medium leading-[1.1]">
          Thoughtful spaces, built around you.
        </p>
        <span className="mt-1.5 inline-flex rounded bg-[#174A31] px-1.5 py-0.5 text-[0.36rem] font-semibold text-ivory">
          View our work
        </span>
      </div>

      <div className="relative h-[4.5rem] shrink-0 overflow-hidden">
        <Image
          src={hearth.photo}
          alt=""
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

