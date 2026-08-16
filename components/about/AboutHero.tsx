import Image from "next/image";
import { PhoneFrame } from "@/components/ui/DeviceFrame";

/**
 * Owns the About page opening: studio introduction plus an illustrative
 * storefront and mobile commerce composition. The device uses the shared
 * phone shell so its physical treatment stays consistent with service pages.
 */

const aboutHeroLayout = {
  // Direct values keep image and device placement easy to tune, including negatives.
  storefront: {
    left: "0%",
    top: "0%",
    width: "min(82%, 32rem)",
    aspectRatio: "10 / 11",
  },
  phone: {
    right: "0%",
    bottom: "clamp(1.5rem, 3vw, 3rem)",
    width: "clamp(8.5rem, 42%, 13rem)",
  },
  caption: {
    left: "17%",
    bottom: "0%",
    connectorWidth: "5rem",
    connectorHeight: "2.5rem",
    connectorOffsetX: "-50px",
    connectorOffsetY: "-37.5px",
    dotSize: "0.375rem",
    textWidth: "15rem",
    textSize: "0.875rem",
    textLineHeight: "1.5rem",
  },
  visualHeight: "min-h-[25rem] sm:min-h-[34rem] lg:min-h-[40rem]",
} as const;

export default function AboutHero() {
  return (
    <section className="bg-ivory py-6 sm:py-8 lg:py-10">
      <div className="container-ck grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-14 lg:py-14">
        <div>
          <p className="ck-rise text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            About CK Works
          </p>
          <h1 className="ck-rise mt-5 max-w-4xl font-serif text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[4rem]">
            A small studio for thoughtful digital work.
          </h1>
          <p className="ck-rise mt-6 max-w-2xl text-base leading-7 text-ink/76 sm:text-lg">
            CK Works is led by Colin Kirby and combines design, software
            development, and systems thinking to build clearer websites and
            practical digital tools for growing businesses.
          </p>
        </div>

        <StorefrontVisual />
      </div>
    </section>
  );
}

function StorefrontVisual() {
  return (
    <div
      className={`relative mx-auto mt-12 w-full max-w-[42rem] lg:mt-0 ${aboutHeroLayout.visualHeight}`}
    >
      <div
        className="absolute overflow-hidden rounded-xl border border-line/80 bg-sand shadow-[0_22px_48px_-32px_rgba(31,36,32,0.44)]"
        style={aboutHeroLayout.storefront}
      >
        <Image
          src="/images/about/png/about-hero-demo.png"
          alt="Illustrative Field and Forge storefront"
          fill
          priority
          sizes="(min-width: 1024px) 35rem, (min-width: 640px) 60vw, 82vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute z-20" style={aboutHeroLayout.phone}>
        <PhoneFrame size="lg">
          <FieldAndForgePhone />
        </PhoneFrame>
      </div>

      <div
        className="absolute hidden items-end gap-4 text-forest lg:flex"
        style={{
          left: aboutHeroLayout.caption.left,
          bottom: aboutHeroLayout.caption.bottom,
        }}
      >
        <span
          className="relative rounded-bl-xl border-b-2 border-l-2 border-forest/80"
          style={{
            width: aboutHeroLayout.caption.connectorWidth,
            height: aboutHeroLayout.caption.connectorHeight,
            transform: `translate(${aboutHeroLayout.caption.connectorOffsetX}, ${aboutHeroLayout.caption.connectorOffsetY})`,
          }}
        >
          <span
            className="absolute -bottom-[3px] -right-[3px] rounded-full bg-forest"
            style={{
              width: aboutHeroLayout.caption.dotSize,
              height: aboutHeroLayout.caption.dotSize,
            }}
            aria-hidden
          />
        </span>
        <span
          className="text-ink"
          style={{
            maxWidth: aboutHeroLayout.caption.textWidth,
            fontSize: aboutHeroLayout.caption.textSize,
            lineHeight: aboutHeroLayout.caption.textLineHeight,
          }}
        >
          Helping small businesses look their best online.
        </span>
      </div>
    </div>
  );
}

function FieldAndForgePhone() {
  return (
    <div className="flex aspect-[9/18.5] w-full flex-col bg-card">
      <div className="relative z-20 flex h-[10cqw] items-start justify-between px-[8cqw] pt-[3cqw] text-[3.4cqw] font-semibold leading-none text-ink">
        <span>9:41</span>
        <span className="flex items-center gap-[1.4cqw] pt-[0.4cqw]" aria-hidden>
          <span className="flex h-[3.6cqw] items-end gap-[0.6cqw]">
            <span className="h-[1.2cqw] w-[0.65cqw] bg-ink" />
            <span className="h-[2cqw] w-[0.65cqw] bg-ink" />
            <span className="h-[2.8cqw] w-[0.65cqw] bg-ink" />
          </span>
          <span className="h-[3cqw] w-[5cqw] rounded-[0.7cqw] border-[0.65cqw] border-ink" />
        </span>
      </div>

      <div className="flex items-center justify-between px-[7cqw] pb-[5cqw] pt-[2cqw]">
        <span>
          <span className="block font-serif text-[6.1cqw] font-semibold tracking-[0.07em] text-ink">
            Field &amp; Forge
          </span>
          <span className="mt-[0.5cqw] block text-[2.3cqw] font-semibold uppercase tracking-[0.2em] text-ink/70">
            Goods and supply
          </span>
        </span>
        <span className="space-y-[1.3cqw]" aria-hidden>
          <span className="block h-[0.7cqw] w-[6cqw] bg-ink/80" />
          <span className="block h-[0.7cqw] w-[6cqw] bg-ink/80" />
          <span className="block h-[0.7cqw] w-[6cqw] bg-ink/80" />
        </span>
      </div>

      <div className="relative h-[66cqw] shrink-0 overflow-hidden">
        <Image
          src="/images/about/png/about-hero-mobile-demo.png"
          alt=""
          fill
          sizes="180px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-[7cqw] py-[6cqw]">
        <p className="font-serif text-[9cqw] font-medium leading-[1.04] text-ink">
          Quality goods for daily life.
        </p>
        <p className="mt-[3cqw] text-[3.9cqw] leading-[1.45] text-muted">
          Carefully chosen items for the home, workshop, and everyday living.
        </p>
        <span className="mt-[4cqw] inline-flex w-fit rounded-[1.4cqw] bg-forest px-[4cqw] py-[2.4cqw] text-[3.6cqw] font-semibold uppercase tracking-[0.1em] text-ivory">
          Shop all
        </span>
      </div>

      <div className="grid shrink-0 grid-cols-[auto_1fr] gap-[3cqw] border-t border-line/80 px-[7cqw] py-[4.2cqw]">
        <span className="mt-[1cqw] h-[8cqw] w-[9cqw] rounded-[1.2cqw] border-[1.1cqw] border-ink/70" aria-hidden />
        <span>
          <span className="block text-[2.8cqw] font-bold uppercase tracking-[0.12em] text-ink/80">
            Free local delivery
          </span>
          <span className="mt-[1cqw] block text-[2.9cqw] leading-[1.35] text-muted">
            For orders over $75 in the greater Portland area.
          </span>
        </span>
      </div>
    </div>
  );
}
