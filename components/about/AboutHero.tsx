import type { CSSProperties } from "react";
import Image from "next/image";
import { Truck } from "lucide-react";
import { PhoneFrame, PhoneStatusBar } from "@/components/ui/DeviceFrame";
import { animDelay } from "@/lib/motion";

/**
 * Owns the About page opening: studio introduction plus an illustrative
 * storefront and mobile commerce composition. Mobile keeps the storefront as
 * one calm visual; desktop adds the shared phone shell and connector story.
 *
 * The visual plays as one sequence: the storefront lands, the dashed elbow
 * draws out of its top-right and turns down, the phone arrives where the line
 * finishes, and the site inside it loads. Above the fold, so these are plain
 * CSS animations rather than `Reveal`.
 *
 * The loading beat is a branded boot: white splash, clover spinning once,
 * forest arc drawing around it, then `ck-resolve` on the real screen.
 */

/**
 * Hero choreography (ms). Boot holds through the 700ms arc, then the splash
 * fades and the page settles a little after 2s. Keep `storefront` early: it
 * is the priority image and the likely LCP element.
 */
const aboutHeroTiming = {
  eyebrow: 0,
  title: 80,
  lead: 170,
  storefront: 250,
  caption: 420,
  elbow: 540,
  phone: 1160,
  boot: 1300,
  screen: 1980,
  headline: 2140,
  cta: 2260,
} as const;

const aboutHeroLayout = {
  // Direct values keep image and device placement easy to tune, including negatives.
  mobile: {
    storefrontWidth: "76%",
    storefrontAspectRatio: "562 / 685",
    phoneRight: "-0.1rem",
    phoneBottom: "1.25rem",
    phoneScale: 0.78,
  },
  storefront: {
    left: "0%",
    top: "0%",
    width: "min(82%, 32rem)",
    aspectRatio: "10 / 11",
  },
  phone: {
    right: "0%",
    bottom: "clamp(1.5rem, 3vw, 3rem)",
    // Canonical Web Design hero phone; `scale` enlarges island, icons, and screen together.
    width: "10.5rem",
    scale: 1.24,
  },
  caption: {
    left: "17%",
    bottom: "0%",
    // Moves the L-shape and caption together.
    offsetX: "-50px",
    offsetY: "-37.5px",
    connectorWidth: "5rem",
    connectorHeight: "2.5rem",
    dotSize: "0.375rem",
    textWidth: "15rem",
    textSize: "1.125rem",
    textLineHeight: "1.5rem",
    // Drops the copy onto the connector's horizontal bar.
    textOffsetY: "2.1rem",
  },
  // Centered clover + progress ring on the white boot splash.
  boot: {
    size: "38cqw",
    ringWidth: 2.7,
    clover: "h-[44%] w-auto",
  },
  /**
   * Dashed elbow from the storefront's top-right into the phone.
   * Starts inset from the image edge, turns down, and lands on the phone top.
   */
  phoneLink: {
    startInsetX: "0rem",
    startY: "5rem",
    radius: "1.35rem",
    stroke: "2.5px",
    dot: "0.625rem",
    // Nudges the end-dot onto the stroke (positive = right).
    dotOffsetX: "0.04cqw",
    // Unscaled PhoneFrame (12px chrome) + 19.5rem screen.
    phoneHeight: "20.25rem",
    endOffsetX: "0px",
    endOffsetY: "0px",
  },
} as const;

export default function AboutHero() {
  return (
    <section className="bg-ivory pb-6 pt-4 sm:pb-8 sm:pt-5 lg:pb-10 lg:pt-6">
      <div className="container-ck grid items-center gap-0 pb-8 pt-2 sm:pb-12 sm:pt-3 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-14 lg:pb-14 lg:pt-4">
        <div className="text-center lg:text-left">
          <p
            className="ck-rise text-xs font-semibold uppercase tracking-[0.28em] text-forest"
            style={{ animationDelay: `${aboutHeroTiming.eyebrow}ms` }}
          >
            About CK Works
          </p>
          <h1
            className="ck-rise mx-auto mt-5 max-w-4xl font-serif text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:mx-0 lg:text-[4rem]"
            style={{ animationDelay: `${aboutHeroTiming.title}ms` }}
          >
            A small studio for thoughtful digital work.
          </h1>
          <p
            className="ck-rise mx-auto mt-6 max-w-2xl text-base leading-7 text-ink/76 sm:text-lg lg:mx-0"
            style={{ animationDelay: `${aboutHeroTiming.lead}ms` }}
          >
            CK Works is an Orlando studio led by Colin Kirby. I build clear
            websites and practical digital systems for growing businesses.
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
      className="relative mx-auto mt-8 w-full max-w-[42rem] lg:mt-0 lg:min-h-[40rem]"
    >
      <div
        className="ck-lift relative w-[var(--about-storefront-mobile-width)] overflow-hidden rounded-xl border border-line/80 bg-sand shadow-[0_22px_48px_-32px_rgba(31,36,32,0.44)] [aspect-ratio:var(--about-storefront-mobile-aspect)] lg:absolute lg:left-[var(--about-storefront-left)] lg:top-[var(--about-storefront-top)] lg:w-[var(--about-storefront-width)] lg:[aspect-ratio:var(--about-storefront-aspect)]"
        style={
          {
            "--about-storefront-mobile-width":
              aboutHeroLayout.mobile.storefrontWidth,
            "--about-storefront-mobile-aspect":
              aboutHeroLayout.mobile.storefrontAspectRatio,
            "--about-storefront-left": aboutHeroLayout.storefront.left,
            "--about-storefront-top": aboutHeroLayout.storefront.top,
            "--about-storefront-width": aboutHeroLayout.storefront.width,
            "--about-storefront-aspect": aboutHeroLayout.storefront.aspectRatio,
            animationDelay: `${aboutHeroTiming.storefront}ms`,
          } as CSSProperties
        }
      >
        <Image
          src="/images/about/png/about-hero-demo.png"
          alt="Illustrative Field and Forge storefront"
          fill
          priority
          sizes="(min-width: 1024px) 35rem, 76vw"
          className="object-cover object-center"
        />
        <p
          className="ck-fade absolute right-3 top-3 z-10 text-right text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ivory"
          style={{ animationDelay: `${aboutHeroTiming.caption}ms` }}
        >
          Illustrative example
        </p>
      </div>

      {/* ck-pop sits on the outer box; the inner one owns the layout scale, and
          a primitive ends at `transform: none` so sharing an element would
          flatten the phone to its unscaled size. */}
      <div
        className="ck-pop absolute bottom-[var(--about-phone-mobile-bottom)] right-[var(--about-phone-mobile-right)] z-20 w-[var(--about-phone-width)] lg:bottom-[var(--about-phone-bottom)] lg:right-[var(--about-phone-right)]"
        style={
          {
            "--about-phone-mobile-right": aboutHeroLayout.mobile.phoneRight,
            "--about-phone-mobile-bottom": aboutHeroLayout.mobile.phoneBottom,
            "--about-phone-right": aboutHeroLayout.phone.right,
            "--about-phone-bottom": aboutHeroLayout.phone.bottom,
            "--about-phone-width": aboutHeroLayout.phone.width,
            animationDelay: `${aboutHeroTiming.phone}ms`,
          } as CSSProperties
        }
      >
        <div
          className="ml-auto origin-bottom-right [transform:scale(var(--about-phone-mobile-scale))] lg:[transform:scale(var(--about-phone-scale))]"
          style={
            {
              width: aboutHeroLayout.phone.width,
              "--about-phone-mobile-scale": aboutHeroLayout.mobile.phoneScale,
              "--about-phone-scale": aboutHeroLayout.phone.scale,
            } as CSSProperties
          }
        >
          <PhoneFrame>
            <FieldAndForgePhone />
          </PhoneFrame>
        </div>
      </div>

      <PhoneLinkConnector />

      {/* The positioning translate stays on the outer box so the inner one is
          free to carry ck-rise. */}
      <div
        className="absolute hidden lg:block"
        style={{
          left: aboutHeroLayout.caption.left,
          bottom: aboutHeroLayout.caption.bottom,
          transform: `translate(${aboutHeroLayout.caption.offsetX}, ${aboutHeroLayout.caption.offsetY})`,
        }}
      >
      <div
        className="ck-rise flex items-end gap-3 text-forest"
        style={{ animationDelay: `${aboutHeroTiming.caption}ms` }}
      >
        <span
          className="relative shrink-0 rounded-bl-xl border-b-2 border-l-2 border-forest/80"
          style={{
            width: aboutHeroLayout.caption.connectorWidth,
            height: aboutHeroLayout.caption.connectorHeight,
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
            transform: `translateY(${aboutHeroLayout.caption.textOffsetY})`,
          }}
        >
          Helping small businesses look their best online.
        </span>
      </div>
      </div>
    </div>
  );
}

function PhoneLinkConnector() {
  const { storefront, phone, phoneLink } = aboutHeroLayout;
  const phoneCenterFromRight = `calc(${phone.width} * ${phone.scale} / 2 - ${phoneLink.endOffsetX})`;
  const phoneTopFromBottom = `calc(${phone.bottom} + ${phoneLink.phoneHeight} * ${phone.scale} - ${phoneLink.endOffsetY})`;

  return (
    <div
      className="ck-draw-elbow pointer-events-none absolute z-30 hidden border-forest/70 lg:block"
      style={
        {
          left: `calc(${storefront.width} - ${phoneLink.startInsetX})`,
          top: phoneLink.startY,
          right: phoneCenterFromRight,
          bottom: phoneTopFromBottom,
          borderTopWidth: phoneLink.stroke,
          borderRightWidth: phoneLink.stroke,
          borderTopStyle: "dashed",
          borderRightStyle: "dashed",
          borderTopRightRadius: phoneLink.radius,
          // At least the rendered border width; 2.5px here renders as 2px, so
          // this over-covers slightly, which is the safe direction.
          "--ck-elbow-strip": phoneLink.stroke,
          ...animDelay(aboutHeroTiming.elbow),
        } as CSSProperties
      }
      aria-hidden
    >
      <span
        className="absolute z-40 rounded-full bg-forest"
        style={{
          width: phoneLink.dot,
          height: phoneLink.dot,
          right: `calc(${phoneLink.dot} / -2 - ${phoneLink.dotOffsetX})`,
          bottom: `calc(${phoneLink.dot} / -2)`,
        }}
      />
    </div>
  );
}

function FieldAndForgePhone() {
  return (
    <div className="relative flex h-[19.5rem] w-full flex-col bg-card">
      <PhoneBootScreen />

      <PhoneStatusBar />

      <div className="flex items-center justify-between px-[7cqw] pb-[5cqw] pt-[2cqw]">
        <span>
          <span className="block font-serif text-[6cqw] font-bold uppercase tracking-[0.08em] text-ink">
            Field &amp; Forge
          </span>
          <span className="mt-[0.5cqw] block text-center text-[2.3cqw] font-semibold uppercase tracking-[0.2em] text-ink/70">
            Goods and supply
          </span>
        </span>
        <svg
          viewBox="0 0 12 10"
          className="h-3 w-3 shrink-0 text-ink"
          aria-hidden
        >
          <path
            d="M1 1.5h10M1 5h10M1 8.5h10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
          />
        </svg>
      </div>

      <div
        className="ck-resolve relative h-[66cqw] shrink-0 overflow-hidden"
        style={animDelay(aboutHeroTiming.screen)}
      >
        <Image
          src="/images/about/png/about-hero-mobile-demo.png"
          alt=""
          fill
          sizes="180px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col px-[7cqw] pb-[2.5cqw] pt-[6cqw]">
        <p
          className="ck-rise font-serif text-[10cqw] font-medium leading-[1.1] text-ink"
          style={{ animationDelay: `${aboutHeroTiming.headline}ms` }}
        >
          Quality goods for daily life.
        </p>
        <p
          className="ck-rise mt-[3cqw] text-[3.9cqw] leading-[1.45] text-muted"
          style={{ animationDelay: `${aboutHeroTiming.headline + 90}ms` }}
        >
          Carefully chosen items for the home, workshop, and everyday living.
        </p>
        <span
          className="ck-pop mt-[4cqw] inline-flex w-fit items-center justify-center rounded-[1.4cqw] bg-[#1F4532] py-[2.6cqw] pl-[4cqw] pr-[3.6cqw] text-[3.6cqw] font-semibold uppercase leading-none tracking-[0.1em] text-ivory"
          style={{ animationDelay: `${aboutHeroTiming.cta}ms` }}
        >
          Shop all
        </span>
      </div>

      <div className="mt-[5cqw] grid shrink-0 grid-cols-[auto_1fr] items-center gap-[7cqw] border-t border-line/80 px-[7cqw] pb-[4.2cqw] pt-[5cqw]">
        <span className="flex text-ink/80" aria-hidden>
          <Truck className="h-[9cqw] w-[9cqw]" strokeWidth={1.7} />
        </span>
        <span>
          <span className="block text-[3.5cqw] font-bold uppercase tracking-[0.12em] text-ink/80">
            Free local delivery
          </span>
          <span className="mt-[1cqw] block text-[3.5cqw] leading-[1.35] text-muted">
            For orders over $75 in the greater Portland area.
          </span>
        </span>
      </div>
    </div>
  );
}

/**
 * White splash over the phone screen: clover turns once while a forest arc
 * draws around it, then the overlay yields to Field & Forge.
 */
function PhoneBootScreen() {
  const delay = animDelay(aboutHeroTiming.boot);
  const { size, ringWidth, clover } = aboutHeroLayout.boot;

  return (
    <div
      className="ck-boot-screen absolute inset-0 z-10 flex items-center justify-center bg-white"
      style={delay}
      aria-hidden
    >
      <div className="relative aspect-square" style={{ width: size }}>
        <svg
          viewBox="0 0 42 42"
          className="block h-auto w-full -rotate-90 text-forest"
        >
          <circle
            cx="21"
            cy="21"
            r="15.9155"
            fill="none"
            className="text-forest-soft"
            stroke="currentColor"
            strokeWidth={ringWidth}
          />
          <circle
            className="ck-draw-arc"
            style={{
              ...delay,
              // Linear-ish fill so the ring reads as progress, not a pop-on donut.
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            cx="21"
            cy="21"
            r="15.9155"
            fill="none"
            stroke="currentColor"
            strokeWidth={ringWidth}
            strokeLinecap="round"
            strokeDasharray="100 100"
          />
        </svg>
        <span
          className="ck-boot-spin absolute inset-0 flex items-center justify-center"
          style={delay}
        >
          <Image
            src="/images/brand/ck-icon-logo.png"
            alt=""
            width={761}
            height={777}
            className={clover}
          />
        </span>
      </div>
    </div>
  );
}
