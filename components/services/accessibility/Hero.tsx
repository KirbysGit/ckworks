/**
 * Opens the accessibility service with an illustrative public-service form.
 * The demo is intentionally static: it explains review states without adding
 * a second working form or competing with the page's real inquiry action.
 */
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, ChevronDown, ListChecks, LockKeyhole, MoreVertical, Search, Users } from "lucide-react";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import { serviceContainer, serviceHeroTitleClassName } from "../shared/styles";

const journeySteps = [
  ["Find the service", "Locate the contact page."],
  ["Complete the form", "Fill out the required information."],
  ["Review information", "Check your entries for accuracy."],
  ["Submit successfully", "Receive confirmation and a reference number."],
] as const;

/**
 * Hero entrance choreography (ms), matching the envelope used by the other
 * service heroes so the pages stay siblings.
 */
const accessibilityHeroTiming = {
  eyebrow: 0,
  title: 80,
  leadCopy: 170,
  facts: 250,
  factStep: 60,
  visual: 300,
  actions: 440,
  /*
   * Review beats, after the panel itself has settled at ~800ms. Each pairs a
   * change in the form with the handwritten note that explains it, so the note
   * never arrives before the thing it is pointing at.
   */
  focusBeat: 1000,
  errorBeat: 1750,
  labelBeat: 2450,
} as const;

/**
 * Three checkable facts rather than a promise. This slot is where the other
 * service heroes put `ServiceTimeline`; accessibility has no timeline it can
 * stand behind yet, so it carries what the engagement actually commits to.
 */
const heroFacts = [
  { icon: ListChecks, label: "Scope agreed before the work starts" },
  { icon: Users, label: "Works alongside your team or vendor" },
  { icon: BadgeCheck, label: "Written against WCAG 2.1 Level AA" },
] as const;

// Tune the handwritten review notes here. Each SVG keeps independent geometry
// because the source canvases have different proportions and visual centers.
const accessibilityHeroAnnotations = [
  {
    src: "/images/services/svg/accessibility-hero-text-1.svg",
    delay: accessibilityHeroTiming.focusBeat,
    top: "19%",
    left: "-125px",
    width: 220,
    height: 220,
  },
  {
    src: "/images/services/svg/accessibility-hero-text-3.svg",
    delay: accessibilityHeroTiming.errorBeat,
    top: "33%",
    left: "-132px",
    width: 200,
    height: 200,
  },{
    src: "/images/services/svg/accessibility-hero-text-2.svg",
    delay: accessibilityHeroTiming.labelBeat,
    top: "48%",
    left: "-155px",
    width: 240,
    height: 200,
  },

] as const;

function Field({
  label,
  children,
  active = false,
  error,
  helper,
  required = false,
  multiline = false,
  strongerBorder = false,
  beat,
}: {
  label: string;
  children: React.ReactNode;
  active?: boolean;
  error?: string;
  helper?: string;
  required?: boolean;
  multiline?: boolean;
  strongerBorder?: boolean;
  /** Delay in ms before this field's focus ring or error resolves. */
  beat?: number;
}) {
  const beatStyle =
    beat === undefined
      ? undefined
      : ({ "--ck-anim-delay": `${beat}ms` } as CSSProperties);

  return (
    <div>
      <p className="mb-1.5 text-[10px] font-semibold text-ink sm:text-[11px]">
        {label}{required ? <span className="ml-0.5 text-[#d95145]">*</span> : null}
      </p>
      <div
        style={beatStyle}
        className={`flex items-center rounded-[0.28rem] border bg-card px-2.5 text-[10px] text-ink/80 sm:text-[11px] ${multiline ? "min-h-11 items-start py-2" : "min-h-9"} ${
          active
            ? "ck-focus-ring border-[#1677ff] ring-1 ring-[#1677ff]"
            : error
              ? "ck-error-border rounded-b-none border-[1.5px] border-[#df695e]"
              : strongerBorder
                ? "border-[1.5px] border-[#cfc6b7]"
                : "border-line"
        }`}
      >
        {children}
      </div>
      {error ? (
        <div
          style={beatStyle}
          className="ck-error-in -mt-px flex items-center gap-1 rounded-b-[0.28rem] border-[1.5px] border-[#df695e] bg-[#fff8f5] px-2 py-1.5 text-[8px] text-[#99483f] sm:text-[9px]"
        >
          <span className="grid size-3 place-items-center rounded-full bg-[#df695e] text-[7px] font-bold text-white">!</span>
          {error}
        </div>
      ) : null}
      {helper ? <p className="mt-1 text-[8px] leading-3 text-muted sm:text-[9px]">{helper}</p> : null}
    </div>
  );
}

// The seal only occupies ~55% of the square SVG. Overscale it so the tree
// fills the 24px circle instead of sitting in a white ring of canvas padding.
const greenridgeLogo = {
  imageSize: 32,
  offsetX: -4,
  offsetY: -2,
} as const;

function GreenridgeReviewVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-[650px] pb-8 lg:pb-10" aria-label="Illustrative accessibility review of a fictional public-service contact form">
      {accessibilityHeroAnnotations.map((annotation) => (
        <span
          key={annotation.src}
          className="ck-pop pointer-events-none absolute z-10 hidden xl:block"
          style={{
            animationDelay: `${annotation.delay}ms`,
            top: annotation.top,
            left: annotation.left,
            width: annotation.width,
            height: annotation.height,
          }}
          aria-hidden="true"
        >
          <Image
            src={annotation.src}
            alt=""
            fill
            sizes={`${annotation.width}px`}
            className="object-contain"
          />
        </span>
      ))}
      <div className="overflow-hidden rounded-[1.15rem] border border-line bg-card shadow-lift">
        <div className="flex h-9 items-center gap-2 border-b border-line bg-sand/55 px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-[#e96b5d]" />
            <span className="size-2 rounded-full bg-[#e9bd49]" />
            <span className="size-2 rounded-full bg-[#70b95c]" />
          </div>
          <div className="mx-auto flex h-6 w-[58%] items-center justify-center gap-1.5 rounded-md bg-white/70 text-[9px] text-muted">
            <LockKeyhole className="size-2.5" />
            cityofgreenridge.gov/contact
          </div>
          <MoreVertical className="size-4 text-ink/70" aria-hidden="true" />
        </div>

        <div className="flex h-11 items-center border-b border-line px-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="grid size-6 shrink-0 place-items-center overflow-hidden rounded-full bg-[#fbfbfb]">
              <Image
                src="/images/services/svg/accessiblity-demo-logo.svg"
                alt=""
                width={greenridgeLogo.imageSize}
                height={greenridgeLogo.imageSize}
                className="max-h-none max-w-none"
                style={{
                  width: greenridgeLogo.imageSize,
                  height: greenridgeLogo.imageSize,
                  transform: `translate(${greenridgeLogo.offsetX}px, ${greenridgeLogo.offsetY}px)`,
                }}
              />
            </span>
            City of Greenridge
          </div>
          <div className="ml-auto hidden items-center gap-7 text-[10px] font-medium text-ink/80 sm:flex">
            <span>Services</span><span>Departments</span><span>News</span><span className="font-semibold text-forest">Contact</span>
            <Search className="size-3.5" />
          </div>
        </div>

        <div className="px-6 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-6">
          <p className="text-[10px] font-medium text-forest sm:text-[11px]">Home <span className="text-muted">/ Contact Us</span></p>
          <h2 className="mt-2.5 text-lg font-semibold tracking-[-0.02em] text-ink sm:text-xl">Contact the Planning Department</h2>
          <p className="mt-1 max-w-[25rem] text-[10px] leading-4 text-muted sm:text-[11px]">We&apos;re here to help. Send us a message and we&apos;ll respond as soon as we can.</p>

          <div className="mt-4 grid gap-3.5 sm:max-w-[68%]">
            <Field
              label="Your full name"
              required
              active
              beat={accessibilityHeroTiming.focusBeat}
            >
              Jordan Lee
            </Field>
            <Field
              label="Email address"
              required
              beat={accessibilityHeroTiming.errorBeat}
              error="Enter a valid email address (example@domain.com)."
            >
              jordanlee@email
            </Field>
            <Field label="What is this about?" required strongerBorder helper="Please select a topic so we can route your message.">
              <span>Select a topic</span><ChevronDown className="ml-auto size-3" />
            </Field>
            <Field label="Message" required multiline strongerBorder helper="Briefly describe your question or request."><span className="h-7" /></Field>
            <div className="w-fit rounded-md bg-forest px-5 py-2.5 text-[11px] font-semibold text-ivory sm:text-xs">Send message</div>
          </div>
        </div>
      </div>

      <div className="absolute -right-3 top-[25%] hidden w-[198px] rounded-[1rem] border border-line bg-card/95 p-5 shadow-lift backdrop-blur-sm sm:block lg:-right-8">
        <h3 className="text-[15px] font-semibold text-ink">Important journey</h3>
        <ol className="mt-5 space-y-5">
          {journeySteps.map(([title, body], index) => (
            <li key={title} className="grid grid-cols-[1.85rem_1fr] gap-2.5">
              <span className="grid size-[1.85rem] place-items-center rounded-full border border-forest text-xs font-semibold text-forest">{index + 1}</span>
              <div><p className="text-[11px] font-semibold leading-4 text-ink">{title}</p><p className="mt-0.5 text-[9px] leading-4 text-muted">{body}</p></div>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="absolute bottom-0 left-0 right-0 text-center text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-forest/80">
        Illustrative accessibility review
      </figcaption>
    </figure>
  );
}

export default function AccessibilityHero() {
  return (
    <section className="overflow-hidden border-b border-line bg-ivory py-10 sm:py-12 lg:py-16">
      <div className={`${serviceContainer} grid items-start gap-12 lg:grid-cols-[0.9fr_1.35fr] lg:gap-20`}>
        {/* Sits between top- and center-aligned. Centering is computed from the
            height difference, and this graphic is roughly twice the height of
            the copy, so `items-center` drops the text ~165px. A fixed offset
            lands it at the same height as the Ongoing Support hero and stays
            put when either side changes. */}
        <div className="max-w-xl text-center sm:text-left lg:mt-20">
          <p className="ck-rise text-xs font-semibold uppercase tracking-[0.26em] text-forest">Accessibility</p>
          <h1 className={`ck-rise ${serviceHeroTitleClassName}`} style={{ animationDelay: `${accessibilityHeroTiming.title}ms` }}>Web Accessibility</h1>
          <p
            className="ck-rise mx-auto mt-6 max-w-md text-base leading-7 text-ink/78 sm:mx-0 sm:text-[1.05rem]"
            style={{ animationDelay: `${accessibilityHeroTiming.leadCopy}ms` }}
          >
            Reviews, prioritized findings, and practical fixes that make your
            site work for people using keyboards, screen readers, captions, and
            magnification.
          </p>
          <ul className="mx-auto mt-5 w-fit max-w-md space-y-2 text-left sm:mx-0 sm:mt-7 sm:w-auto">
            {heroFacts.map(({ icon: Icon, label }, index) => (
              <li
                key={label}
                className="ck-rise flex items-start gap-2.5 text-sm leading-6 text-muted"
                style={{
                  animationDelay: `${
                    accessibilityHeroTiming.facts +
                    index * accessibilityHeroTiming.factStep
                  }ms`,
                }}
              >
                <Icon
                  className="mt-0.5 size-4 shrink-0 text-forest"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <div className="ck-rise mx-auto mt-7 flex w-fit flex-row items-center justify-center gap-2 sm:mx-0 sm:w-auto sm:justify-start sm:gap-3" style={{ animationDelay: `${accessibilityHeroTiming.actions}ms` }}>
            <ProjectInquiryTrigger source="accessibility_service_hero" className="shrink-0 rounded-md px-4 sm:px-5">
              Request a review <ArrowRight className="size-4" />
            </ProjectInquiryTrigger>
            <Link href="#what-gets-reviewed" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md px-2 py-3 text-sm font-semibold text-forest transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest sm:px-3">
              <span className="sm:hidden">What&apos;s reviewed</span>
              <span className="hidden sm:inline">What gets reviewed</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        <div
          className="ck-rise min-w-0"
          style={{ animationDelay: `${accessibilityHeroTiming.visual}ms` }}
        >
          <GreenridgeReviewVisual />
        </div>
      </div>
    </section>
  );
}
