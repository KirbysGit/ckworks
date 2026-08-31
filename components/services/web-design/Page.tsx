/** Renders the bespoke Web Design and Development service experience. */
import { Fragment, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Flag,
  Gauge,
  Home,
  LayoutTemplate,
  Mail,
  MessageSquareText,
  MonitorSmartphone,
  Paintbrush,
  Rocket,
  Search,
  Settings2,
  Sparkle,
  TrendingUp,
} from "lucide-react";
import FAQSection from "@/components/page/FAQSection";
import Reveal from "@/components/ui/Reveal";
import { PhoneStatusBar } from "@/components/ui/DeviceFrame";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import ServiceTimeline from "@/components/services/shared/ServiceTimeline";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";
import { webDesignTimeline, type ServiceArea } from "@/lib/services";
import ServiceFrame from "../shared/ServiceFrame";
import RelatedLinks from "../shared/RelatedLinks";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
  serviceContainer,
  serviceHeroTitleClassName,
  serviceSectionBodyClassName,
  serviceSectionLabelClassName,
  serviceSectionTitleClassName,
} from "../shared/styles";
const webDesignDemoImage = "/images/services/png/01-hearth-home-demo.png";
const webDesignLogo = "/images/services/svg/01-hearth-logo-demo.svg";

/**
 * Hero entrance choreography (ms). The demo site "loads" in the laptop:
 * frame lifts in → browser progress bar → skeleton shimmer → content
 * resolves into focus → demo copy settles → phone follows.
 *
 * CSS animation delays only (runs on first paint, no hydration wait).
 * Keep `screen` reasonably early — the laptop photo is a likely LCP candidate.
 */
const webDesignHeroTiming = {
  eyebrow: 0,
  title: 80,
  leadCopy: 170,
  supportCopy: 230,
  actions: 310,
  laptop: 260,
  loadbar: 450,
  skeleton: 520,
  screen: 980,
  chromeNav: 1040,
  demoHeadline: 1180,
  demoBody: 1260,
  demoCta: 1340,
  phone: 1460,
} as const;

const webDesignIncludes = [
  {
    title: "Custom design",
    body: "A website built around your brand, not a generic template.",
    icon: Paintbrush,
  },
  {
    title: "Responsive everywhere",
    body: "Looks and works cleanly on phones, tablets, and desktops.",
    icon: MonitorSmartphone,
  },
  {
    title: "Clear messaging",
    body: "Pages structured so visitors understand what you do and what to do next.",
    icon: MessageSquareText,
  },
  {
    title: "Fast & reliable",
    body: "Modern builds that load quickly and stay stable over time.",
    icon: Gauge,
  },
  {
    title: "Easy to manage",
    body: "Set up so you can update content yourself, or I can handle it for you.",
    icon: Settings2,
  },
  {
    title: "Built to grow",
    body: "A foundation that can expand as your business and offers evolve.",
    icon: TrendingUp,
  },
] as const;

const webDesignTransformation = [
  {
    step: 1,
    title: "Current site",
    body: "Cramped layout, weak hierarchy, and no clear next step.",
    stage: "current",
  },
  {
    step: 2,
    title: "Better structure",
    body: "The same offer, now with clearer sections and navigation.",
    stage: "structure",
  },
  {
    step: 3,
    title: "Modern design",
    body: "Typography, imagery, and spacing start to feel intentional.",
    stage: "modern",
  },
  {
    step: 4,
    title: "Launched website",
    body: "Polished page with a clear CTA and supporting detail.",
    stage: "launch",
  },
] as const;

const webDesignProcess = [
  {
    title: "Understand the business",
    body: "I'll learn what you do, who you serve, and what the website needs to accomplish.",
    icon: Search,
  },
  {
    title: "Design & Build",
    body: "I shape the structure, design, and development into a clear, modern site.",
    icon: LayoutTemplate,
  },
  {
    title: "Launch & Improve",
    body: "I launch carefully, then we keep refining based on how the site is used.",
    icon: Rocket,
  },
] as const;

const webDesignFaqs = [
  {
    question: "How much does a business website cost?",
    answer:
      "It depends on scope: pages, content, design depth, and any integrations. After a short discovery call, I can give you a clear range based on what the site actually needs to do.",
  },
  {
    question: "How long does a website project usually take?",
    // Range comes from the same const the hero reads, so the two cannot drift.
    answer: `Most small-business sites run ${webDesignTimeline.value} — ${webDesignTimeline.note}. What moves the number: how many pages there are, how ready your content is, how quickly feedback comes back, and whether the site needs integrations. Redesigns and custom features sit at the longer end.`,
  },
  {
    question: "Can CK Works redesign my existing website?",
    answer:
      "Yes. I can keep what still works, clean up the structure and messaging, and rebuild the experience so it looks sharper and converts more clearly.",
  },
  {
    question: "What will you need from me during the project?",
    answer:
      "Typically: goals, who you serve, brand assets if you have them, examples you like, and content inputs or access to what already exists. I guide the process so you always know what is needed next.",
  },
  {
    question: "Will I be able to update the website after launch?",
    answer:
      "Yes. I can set it up so you can handle common updates yourself, or keep CK Works involved for ongoing changes, depending on how hands-on you want to be.",
  },
] as const;

const webDesignProjectSlugs = ["tizirsso", "taylor", "centi"] as const;

export default function Page({ service }: { service: ServiceArea }) {
  const projects = webDesignProjectSlugs
    .map((projectSlug) => getCaseStudy(projectSlug))
    .filter((project): project is CaseStudy => Boolean(project));

  return (
    <ServiceFrame service={service}><section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={serviceContainer}>
          <WebDesignHero timeline={service.timeline} />
          <WebDesignIncludes />
          <WebDesignTransformation />
          <WebDesignProcess />
          <WebDesignWork projects={projects} />
          <WebDesignFaq />
          <WebDesignRelated />
          <WebDesignBottomCta />
        </div>
      </section>
    </ServiceFrame>
  );
}

function WebDesignHero({ timeline }: { timeline: ServiceArea["timeline"] }) {
  return (
    <div className="grid items-start gap-8 border-b border-line pb-6 sm:gap-10 sm:pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      {/* TRIAL: centred on mobile so the stacked hero reads as one block.
          Revert by dropping `text-center sm:text-left` here and the
          `mx-auto sm:mx-0` / `justify-center` pairs below. */}
      <div className="max-w-xl text-center sm:text-left">
        <p
          className="ck-rise text-xs font-semibold uppercase tracking-[0.26em] text-forest"
          style={{ animationDelay: `${webDesignHeroTiming.eyebrow}ms` }}
        >
          Design
        </p>
        <h1
          className={`ck-rise ${serviceHeroTitleClassName}`}
          style={{ animationDelay: `${webDesignHeroTiming.title}ms` }}
        >
          Web Design & Development
        </h1>
        <p
          className="ck-rise mx-auto mt-6 max-w-md text-base leading-7 text-ink/78 sm:mx-0"
          style={{ animationDelay: `${webDesignHeroTiming.leadCopy}ms` }}
        >
          Websites built around what your business needs people to understand
          and do.
        </p>
        {/* Desktop only. It restates the lead above it — both say CK Works
            builds clear websites that make the next step easy — which costs
            three lines on a phone for an idea already delivered. */}
        <p
          className="ck-rise mt-5 hidden max-w-lg text-base leading-7 text-ink/78 sm:block"
          style={{ animationDelay: `${webDesignHeroTiming.supportCopy}ms` }}
        >
          CK Works plans, designs, and builds modern websites that look clear,
          work well, and make the next step easy to take.
        </p>
        <ServiceTimeline
          timeline={timeline}
          className="ck-rise mt-4 justify-center sm:mt-7 sm:justify-start"
          style={{ animationDelay: `${webDesignHeroTiming.actions}ms` }}
        />
        {/* `w-fit` + `items-stretch` gives both actions one content-sized
            width instead of spanning the column; `mx-auto` centres that block
            on mobile. The row layout takes over at sm. */}
        <div
          className="ck-rise mx-auto mt-7 flex w-fit flex-row items-center gap-3 sm:mx-0 sm:w-auto"
          style={{ animationDelay: `${webDesignHeroTiming.actions}ms` }}
        >
          <ProjectInquiryTrigger
            source="web_design_service_hero"
            className="rounded-md px-5"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </ProjectInquiryTrigger>
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-ink transition-colors hover:text-forest"
          >
            See the work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <WebDesignDevicePreview />
    </div>
  );
}

function WebDesignDevicePreview() {
  return (
    // Mobile reserves 22rem for ~18rem of content (laptop + caption), leaving
    // ~64px of empty box under the caption. The phone that used to fill it is
    // desktop-only now, so the floor comes down to match.
    <div className="relative min-h-[19rem] sm:min-h-[26rem] lg:min-h-[29rem]">
      <div
        className="pointer-events-none absolute bottom-3 left-8 right-8 h-12 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(31,36,32,0.22),rgba(31,36,32,0.08)_42%,transparent_72%)] blur-xl"
        aria-hidden
      />

      <div
        // The laptop base sits at `mx-[-7%]`, so it renders ~14% wider than this
        // box. 87% keeps that base inside the container instead of pushing the
        // page 8px sideways, and `mx-auto` centres it now the phone is gone.
        className="ck-lift absolute inset-x-0 top-3 mx-auto w-[87%] sm:inset-x-auto sm:left-0 sm:mx-0 sm:w-[80%]"
        style={{ animationDelay: `${webDesignHeroTiming.laptop}ms` }}
      >
        <div className="relative">
          <div className="relative aspect-[16/10] rounded-t-[1.55rem] rounded-b-none bg-[linear-gradient(145deg,#050605_0%,#111511_43%,#252B26_52%,#121712_66%,#080A08_100%)] p-[7px] shadow-[0_28px_58px_-28px_rgba(17,23,20,0.82),0_8px_18px_-10px_rgba(17,23,20,0.5)]">
            <span
              className="pointer-events-none absolute inset-[2px] rounded-t-[1.35rem] rounded-b-none bg-[linear-gradient(165deg,rgba(255,255,255,0.045),transparent_30%,rgba(0,0,0,0.34)_78%)] opacity-45"
              aria-hidden
            />
            <div className="relative h-full overflow-hidden rounded-t-[1.05rem] rounded-b-none border border-black/25 bg-card shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
              <LaptopBrowserContent />
            </div>
          </div>

          {/* Laptop Divider Bar */}
          <div
            className="relative z-10 -mt-px h-[9px] bg-[linear-gradient(180deg,#353C35_0%,#1D241E_42%,#111511_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_4px_8px_-8px_rgba(0,0,0,0.9)]"
            aria-hidden
          >
            <span className="absolute inset-x-[1px] top-px h-px bg-white/10" />
          </div>

          {/* Laptop Base */}
          <div className="relative z-20 mx-[-7%] -mt-[3px] h-[22px] shadow-[0_18px_32px_-23px_rgba(17,23,20,0.72)]">
            <span
              className="absolute inset-x-0 top-0 h-full rounded-b-[1.45rem] bg-[linear-gradient(180deg,#6B766C_0%,#4A554B_46%,#172018_100%)] shadow-[inset_0_2px_3px_rgba(255,255,255,0.08),inset_0_-4px_7px_rgba(0,0,0,0.36)]"
              aria-hidden
            />
            <span
              className="absolute inset-x-[2.75%] top-0 h-[13px] bg-[linear-gradient(180deg,#A4A99F_0%,#899185_48%,rgba(102,114,104,0)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] [mask-image:linear-gradient(90deg,transparent_0%,black_9%,black_91%,transparent_100%)]"
              aria-hidden
            />
            <span
              className="absolute inset-x-[4%] top-[1px] h-px rounded-full bg-white/28"
              aria-hidden
            />
            <span
              className="absolute left-1/2 top-0 h-[9px] w-[27%] -translate-x-1/2 rounded-b-[0.85rem] bg-[linear-gradient(180deg,#5B625A_0%,#888A80_56%,#B4B2A8_100%)] shadow-[inset_0_-1px_2px_rgba(255,255,255,0.36),inset_0_2px_3px_rgba(0,0,0,0.22),0_6px_12px_-10px_rgba(0,0,0,0.78)]"
              aria-hidden
            />
            <span
              className="absolute inset-x-5 bottom-[2px] h-[2px] rounded-full bg-black/30 blur-[0.5px]"
              aria-hidden
            />
            <span
              className="absolute -bottom-[3px] left-[11%] h-[5px] w-10 rounded-b-md bg-[linear-gradient(180deg,#2A2F29,#070807)] shadow-[0_3px_8px_-4px_rgba(0,0,0,0.9)]"
              aria-hidden
            />
            <span
              className="absolute -bottom-[3px] right-[11%] h-[5px] w-10 rounded-b-md bg-[linear-gradient(180deg,#2A2F29,#070807)] shadow-[0_3px_8px_-4px_rgba(0,0,0,0.9)]"
              aria-hidden
            />
          </div>

          <p className="absolute left-1/2 top-[calc(100%+1.65rem)] -translate-x-1/2 whitespace-nowrap text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Illustrative website concept
          </p>
        </div>
      </div>

      <div
        className="ck-lift absolute right-0 top-[5.65rem] z-20 hidden w-[29%] min-w-[8.4rem] max-w-[10.5rem] sm:block"
        style={{ animationDelay: `${webDesignHeroTiming.phone}ms` }}
      >
        <div className="relative rounded-[2.3rem] bg-[linear-gradient(145deg,#050605_0%,#181B18_30%,#6F746C_43%,#FFF9EA_49%,#3C423B_56%,#060706_74%,#161A16_100%)] p-[2px] shadow-[0_18px_38px_-18px_rgba(17,23,20,0.7),0_6px_14px_-8px_rgba(17,23,20,0.58)]">
          <span
            className="pointer-events-none absolute inset-[1px] rounded-[2.2rem] bg-[radial-gradient(circle_at_30%_7%,rgba(255,255,255,0.38),transparent_24%),linear-gradient(160deg,rgba(255,255,255,0.16),transparent_35%,rgba(0,0,0,0.42)_74%)] opacity-70"
            aria-hidden
          />
          <span
            className="absolute -right-[2px] top-24 h-11 w-[3px] rounded-r-full bg-[linear-gradient(180deg,#313630,#090A09)]"
            aria-hidden
          />
          <div className="relative rounded-[2.15rem] bg-[linear-gradient(145deg,#030403_0%,#0C0F0C_46%,#252B25_58%,#050605_100%)] p-[4px] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.16),inset_-2px_-2px_4px_rgba(0,0,0,0.82)]">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-card shadow-[inset_0_0_0_1px_rgba(31,36,32,0.05)]">
              <div
                className="pointer-events-none absolute left-1/2 top-[-6px] z-30 h-[20px] w-[62px] -translate-x-1/2"
                aria-hidden
              >
                <div className="relative h-full w-full rounded-b-[8px] bg-[#050605] shadow-[0_1px_0_rgba(5,6,5,0.95)]">
                  <span className="absolute -left-[8px] top-0 h-2 w-2 rounded-br-lg shadow-[8px_0_0_0_#050605]" />
                  <span className="absolute -right-[8px] top-0 h-2 w-2 rounded-bl-lg shadow-[-8px_0_0_0_#050605]" />
                  <span className="absolute left-1/2 top-[9px] h-[2px] w-[22px] -translate-x-1/2 rounded-full bg-white/16" />
                </div>
              </div>

              <div className="h-[19.5rem] overflow-hidden bg-card">
                <PhoneStatusBar />
                <div className="px-4 pb-4 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Image
                        src={webDesignLogo}
                        alt=""
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 object-contain"
                      />
                      <span className="font-serif text-[11px] font-medium tracking-[0.02em] text-ink">
                        Hearth & Home
                      </span>
                    </span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full text-ink">
                      <span className="space-y-[2px]" aria-hidden>
                        <span className="block h-px w-3 bg-ink" />
                        <span className="block h-px w-3 bg-ink" />
                        <span className="block h-px w-3 bg-ink" />
                      </span>
                    </span>
                  </div>
                  <p className="mt-5 font-serif text-[1.42rem] font-medium leading-[1.03] tracking-[-0.02em] text-ink">
                    Spaces that reflect how you live.
                  </p>
                  <p className="mt-2.5 text-[8px] leading-4 text-muted">
                    Full-service interior design from concept to completion.
                  </p>
                  <span className="mt-3.5 inline-flex rounded bg-[#174A31] px-3 py-2 text-[8px] font-semibold text-ivory shadow-[0_8px_18px_-12px_rgba(23,74,49,0.9)]">
                    Book a Consultation
                  </span>
                  <div className="relative mt-3.5 h-[5.2rem] overflow-hidden rounded-lg shadow-[0_12px_24px_-18px_rgba(31,36,32,0.75)]">
                    <Image
                      src={webDesignDemoImage}
                      alt="Mobile interior design website preview"
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LaptopBrowserContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="relative flex h-9 items-center justify-between border-b border-line bg-card px-4">
        {/* Browser-style progress indicator under the chrome. */}
        <span
          className="ck-loadbar absolute inset-x-0 bottom-0 h-[2px] bg-forest"
          style={
            {
              "--ck-anim-delay": `${webDesignHeroTiming.loadbar}ms`,
            } as CSSProperties
          }
          aria-hidden
        />
        <span className="flex items-center gap-1.5">
          <Image
            src={webDesignLogo}
            alt=""
            width={14}
            height={14}
            className="h-3.5 w-3.5 object-contain"
          />
          <span className="font-serif text-[9px] font-medium tracking-[0.02em] text-ink">
            Hearth & Home
          </span>
        </span>
        <div
          className="ck-fade hidden gap-5 text-[7px] font-semibold text-ink/70 sm:flex"
          style={{ animationDelay: `${webDesignHeroTiming.chromeNav}ms` }}
        >
          <span>Our Services</span>
          <span>Projects</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <span
          className="ck-fade rounded bg-[#174A31] px-2.5 py-1.5 text-[7px] font-semibold text-ivory shadow-[0_6px_16px_-12px_rgba(23,74,49,0.92)]"
          style={{ animationDelay: `${webDesignHeroTiming.chromeNav}ms` }}
        >
          Book a Consultation
        </span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#141714]">
        {/* Skeleton placeholders while the "page" loads. */}
        <div
          className="ck-skeleton absolute inset-0 z-10 bg-[#171a17] px-7 pt-[18%]"
          style={
            {
              "--ck-anim-delay": `${webDesignHeroTiming.skeleton}ms`,
            } as CSSProperties
          }
          aria-hidden
        >
          <div className="ck-skeleton-block h-3 w-[9.5rem] rounded-sm" />
          <div className="ck-skeleton-block mt-3 h-3 w-[7rem] rounded-sm opacity-80" />
          <div className="ck-skeleton-block mt-5 h-2 w-[11rem] rounded-sm opacity-70" />
          <div className="ck-skeleton-block mt-2 h-2 w-[8.5rem] rounded-sm opacity-55" />
          <div className="ck-skeleton-block mt-5 h-6 w-[5.25rem] rounded-sm opacity-75" />
          <div className="ck-skeleton-block absolute inset-y-0 right-0 w-[46%] opacity-40" />
        </div>

        {/* Real page content resolving into focus. */}
        <div
          className="ck-resolve absolute inset-0"
          style={
            {
              "--ck-anim-delay": `${webDesignHeroTiming.screen}ms`,
            } as CSSProperties
          }
        >
          <Image
            src={webDesignDemoImage}
            alt="Interior design website preview"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/72 via-ink/18 to-transparent" />
        </div>

        <div className="absolute left-7 top-[20%] z-20 max-w-[15rem] text-ivory">
          <p
            // 2rem against 9px nav and 10px body read as 3x the body size in a
            // 289px-wide mock. Scaled down on mobile so the demo keeps a
            // believable hierarchy; desktop has the room for the full size.
            className="ck-rise font-serif text-[1.35rem] leading-[1.05] tracking-[-0.02em] sm:text-[2rem] sm:leading-[1.02]"
            style={{ animationDelay: `${webDesignHeroTiming.demoHeadline}ms` }}
          >
            Thoughtful spaces, built around you.
          </p>
          <p
            className="ck-rise mt-4 max-w-[12rem] text-[10px] leading-5 text-ivory/84"
            style={{ animationDelay: `${webDesignHeroTiming.demoBody}ms` }}
          >
            Interior design for homes that feel calm, comfortable, and
            considered.
          </p>
          <span
            className="ck-pop mt-5 inline-flex rounded bg-ivory px-3 py-2 text-[8px] font-semibold text-ink shadow-[0_10px_18px_-14px_rgba(0,0,0,0.7)]"
            style={{ animationDelay: `${webDesignHeroTiming.demoCta}ms` }}
          >
            View our projects
          </span>
        </div>
      </div>
    </div>
  );
}

function WebDesignIncludes() {
  return (
    <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-16 lg:py-16">
      <Reveal className="max-w-md">
        <p className={serviceSectionLabelClassName}>
          What this service covers
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Everything you need in a website.
        </h2>
        <p className={serviceSectionBodyClassName}>
          From structure and design to development and launch, CK Works builds
          websites that look professional and help people know what to do next.
        </p>
        <Link
          href="/services"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-forest"
        >
          See all services
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {webDesignIncludes.map(({ title, body, icon: Icon }, index) => (
          <Reveal
            as="article"
            key={title}
            delay={index * 70}
            className="flex gap-4"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center text-ink">
              <Icon className="h-6 w-6" strokeWidth={1.4} />
            </span>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WebDesignTransformation() {
  return (
    <section className="border-b border-line py-14 lg:py-20">
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>
          From outdated to built for today
        </p>
        <h2 className={serviceCenterTitleClassName}>
          A better website makes a real difference.
        </h2>
      </Reveal>

      {/* Mobile / tablet: stacked steps */}
      <div className="mt-8 grid gap-8 md:grid-cols-2 xl:hidden">
        {webDesignTransformation.map((step, index) => (
          <Reveal key={step.title} delay={index * 120}>
            <TransformationStep step={step} />
          </Reveal>
        ))}
      </div>

      {/* Desktop: equal-width cards. Perspective is per-card (not shared),
          otherwise one camera makes left gaps look huge and right cards stack.
          Stages reveal left→right so the sequence reads as progression. */}
      <div className="mt-12 hidden xl:block">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
        >
          {webDesignTransformation.map((step, index) => (
            <Reveal key={step.title} delay={index * 180} className="min-w-0">
              <TransformationCardTilt>
                <WebsiteStagePreview step={step} />
              </TransformationCardTilt>
            </Reveal>
          ))}
        </div>
        <div
          className="mt-7 grid items-stretch"
          style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
        >
          {webDesignTransformation.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 180 + 120}
              className={`relative min-h-[9.5rem] min-w-0 px-7 first:pl-0 last:pr-0 ${
                index > 0 ? "border-l border-line" : ""
              }`}
            >
              <div className="flex min-h-8 items-center justify-between gap-3">
                <h3 className="min-w-0 font-serif text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-ink">
                  <span className="mr-3 font-sans text-[0.95rem] font-medium tracking-[0.05em] text-forest">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  {step.title}
                </h3>
                {index < webDesignTransformation.length - 1 ? (
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-forest/80"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                ) : (
                  <Flag
                    className="h-5 w-5 shrink-0 text-forest/80"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                )}
              </div>
              <div className="mt-5 h-px bg-line" aria-hidden />
              <p className="mt-5 max-w-[15rem] text-sm leading-7 text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Card-shell 3D only — local perspective so every card gets the same tilt + spacing. */
function TransformationCardTilt({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-w-0 w-full"
      style={{
        perspective: "900px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        className="w-full"
        style={{
          transform: "rotateY(-3.5deg) rotateX(0.8deg)",
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          filter: "blur(0)",
          boxShadow:
            "-18px 16px 32px -16px rgba(31, 36, 32, 0.34), -6px 6px 14px -8px rgba(31, 36, 32, 0.2)",
          borderRadius: "0.375rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function TransformationStep({
  step,
}: {
  step: (typeof webDesignTransformation)[number];
}) {
  return (
    <article className="min-w-0">
      <TransformationCardTilt>
        <WebsiteStagePreview step={step} />
      </TransformationCardTilt>
      <TransformationCaption step={step} className="mt-3" />
    </article>
  );
}

function TransformationCaption({
  step,
  className = "",
}: {
  step: (typeof webDesignTransformation)[number];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-[0.95rem] font-semibold text-ink text-justify">
        <span className="text-muted">{step.step}.</span> {step.title}
      </h3>
      <p className="mt-1 text-xs leading-5 text-muted text-justify pr-[6rem]">{step.body}</p>
    </div>
  );
}

function WebsiteStagePreview({
  step,
}: {
  step: (typeof webDesignTransformation)[number];
}) {
  const isCurrent = step.stage === "current";
  const overlayHeader = step.stage === "modern";

  return (
    <div
      className={`relative flex aspect-[4/3] flex-col overflow-hidden rounded-md border shadow-soft ${
        isCurrent ? "border-ink/35 bg-[#252821] text-ivory" : "border-line bg-card text-ink"
      }`}
    >
      {overlayHeader ? (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <ModernSitePreview />
          </div>
          <div className="absolute inset-x-0 top-0 z-10">
            <StageBrowserHeader isCurrent={isCurrent} stage={step.stage} />
          </div>
        </>
      ) : (
        <>
          <StageBrowserHeader isCurrent={isCurrent} stage={step.stage} />
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {step.stage === "current" && <CurrentSitePreview />}
            {step.stage === "structure" && <StructuredSitePreview />}
            {step.stage === "launch" && <LaunchedSitePreview />}
          </div>
        </>
      )}
    </div>
  );
}

function StageBrowserHeader({
  isCurrent,
  stage,
}: {
  isCurrent: boolean;
  stage: (typeof webDesignTransformation)[number]["stage"];
}) {
  const navItems =
    stage === "current"
      ? ["Home", "Info", "Photos"]
      : ["Home", "Services", "Projects", "Contact"];

  return (
    <div
      className={`relative z-10 flex h-8 shrink-0 items-center gap-2 border-b px-2.5 ${
        stage === "modern"
          ? "border-white/15 bg-ink/45 text-ivory"
          : isCurrent
            ? "border-white/10 bg-black/25"
            : "border-line/70 bg-card"
      }`}
    >
      <span className="flex min-w-0 items-center gap-1">
        <Image
          src={webDesignLogo}
          alt=""
          width={12}
          height={12}
          className={`h-3 w-3 shrink-0 object-contain ${
            stage === "modern" || isCurrent ? "brightness-0 invert opacity-80" : ""
          }`}
        />
        <span
          className={`truncate font-serif text-[10px] font-semibold tracking-[0.01em] ${
            stage === "modern" || isCurrent ? "text-ivory/85" : "text-ink"
          }`}
        >
          Hearth & Home
        </span>
      </span>
      <span
        className={`ml-auto flex min-w-0 items-center justify-end gap-1.5 truncate text-[7.5px] font-semibold ${
          stage === "current"
            ? "gap-1 text-ivory/45"
            : stage === "modern"
              ? "text-ivory/75"
              : "text-ink/80"
        }`}
      >
        {navItems.map((item) => (
          <span key={item} className="shrink-0">
            {item}
          </span>
        ))}
      </span>
      {stage === "launch" && (
        <span className="shrink-0 rounded bg-[#174A31] px-1.5 py-0.5 text-[7px] font-semibold text-ivory">
          Book
        </span>
      )}
    </div>
  );
}

function CurrentSitePreview() {
  return (
    <div className="absolute inset-0 grid grid-cols-[0.44fr_0.56fr] gap-1.5 bg-[#171a16] p-2">
      <div className="flex min-h-0 flex-col gap-1.5">
        <div className="space-y-1 rounded border border-white/10 bg-white/[0.03] p-2">
          <span className="block h-1.5 w-10 rounded-full bg-ivory/35" />
          <span className="block h-1 w-14 rounded-full bg-ivory/20" />
          <span className="block h-1 w-8 rounded-full bg-ivory/15" />
        </div>
        <div className="min-h-0 flex-1 space-y-1 rounded border border-white/10 bg-black/25 p-1.5">
          {["Services", "Rooms", "Gallery", "Contact"].map((item) => (
            <span
              key={item}
              className="block rounded-sm border border-white/8 bg-white/[0.04] px-1.5 py-1 text-[7px] text-ivory/50"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="rounded border border-dashed border-white/15 px-1.5 py-1 text-[7px] text-ivory/40">
          No clear CTA
        </div>
      </div>
      <div className="relative min-h-0 overflow-hidden rounded-sm border border-white/10">
        <Image
          src={webDesignDemoImage}
          alt=""
          fill
          sizes="240px"
          className="object-cover opacity-45 grayscale"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-2 bottom-2">
          <p className="text-[10px] font-semibold leading-tight text-ivory/80">
            Interior design services and beautiful homes.
          </p>
          <p className="mt-1 text-[7px] leading-snug text-ivory/45">
            Busy copy with no hierarchy.
          </p>
        </div>
      </div>
    </div>
  );
}

function StructuredSitePreview() {
  return (
    <div className="absolute inset-0 grid grid-cols-[0.54fr_0.46fr] bg-[#f7f4ed]">
      <div className="flex flex-col justify-center px-3 py-2.5">
        <p className="font-serif text-[1.05rem] font-medium leading-[1.08] text-ink">
          Spaces that feel like home.
        </p>
        <p className="mt-2 text-[8.5px] leading-[1.4] text-ink/75">
          Clear headline, short support copy, and one next step.
        </p>
        <span className="mt-2.5 inline-flex w-fit rounded bg-[#174A31] px-2.5 py-1 text-[8px] font-semibold text-ivory">
          Learn more
        </span>
      </div>
      <div className="relative min-h-0 overflow-hidden">
        <Image
          src={webDesignDemoImage}
          alt=""
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function ModernSitePreview() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#243028]">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image
          src={webDesignDemoImage}
          alt=""
          fill
          sizes="280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/15" />
        {/* pt-8 matches overlay nav (h-8) so justify-center uses the visible area below it */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-8 text-center text-ivory">
          <p className="font-serif text-[1.05rem] font-medium leading-[1.08]">
            Thoughtful spaces, built around you.
          </p>
          <p className="mt-1.5 max-w-[10.5rem] text-[8.5px] leading-[1.4] text-ivory/80">
            Type, spacing, and imagery start working together.
          </p>
          <span className="mt-2.5 inline-flex rounded border border-ivory/55 bg-ivory/10 px-2.5 py-1 text-[8px] font-semibold text-ivory">
            View our work
          </span>
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-3 border-t border-white/10 bg-ink/90 px-2 py-2 text-[7.5px] font-semibold text-ivory/80">
        {["Services", "Projects", "About"].map((item) => (
          <span key={item} className="flex items-center justify-center gap-0.5">
            {item}
            <ArrowRight className="h-2.5 w-2.5 opacity-60" strokeWidth={1.8} />
          </span>
        ))}
      </div>
    </div>
  );
}

const launchedHighlights = [
  { label: "Warm spaces", icon: Home },
  { label: "Refined detail", icon: Sparkle },
  { label: "Easy inquiry", icon: Mail },
] as const;

function LaunchedSitePreview() {
  return (
    <div className="absolute inset-0 flex flex-col bg-card">
      <div className="grid min-h-0 flex-1 grid-cols-[0.48fr_0.52fr]">
        <div className="flex flex-col justify-center bg-[#243028] px-3 py-2.5 text-ivory">
          <p className="font-serif text-[1.05rem] font-medium leading-[1.08]">
            Homes shaped around everyday calm.
          </p>
          <p className="mt-1.5 text-[8.5px] leading-[1.4] text-ivory/78">
            Finished page with a clear action and room to grow.
          </p>
          <span className="mt-2.5 inline-flex w-fit rounded bg-[#174A31] px-2.5 py-1 text-[8px] font-semibold text-ivory">
            Get in touch
          </span>
        </div>
        <div className="relative min-h-0 overflow-hidden">
          <Image
            src={webDesignDemoImage}
            alt=""
            fill
            sizes="220px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-3 divide-x divide-line border-t border-line bg-[#faf8f4]">
        {launchedHighlights.map(({ label, icon: Icon }) => (
          <span
            key={label}
            className="flex flex-col items-center justify-center gap-1 px-1 py-2 text-center text-[7.5px] font-semibold leading-tight text-ink/80"
          >
            <Icon className="h-3.5 w-3.5 text-forest" strokeWidth={1.7} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Process sticky knobs (How I work).
 *   size      — post-it width in px
 *   x / y     — offset from its natural spot (px; +x right, +y down)
 *   rotate    — degrees; negative tilts left
 *   textScale — SVG text scale (1 = default, 1.45 = larger)
 *   textPad   — inset around the SVG as % of the note
 */
const processStickyLayout = {
  size: 180,
  x: 110,
  y: -5,
  rotate: -6,
  textScale: 1.35,
  textPad: 6,
} as const;

/**
 * `offsetX` and `className` are per-instance because the note renders twice:
 * beside the steps in the narrow left column on desktop, and beneath them on
 * mobile. The shared `x: 110` was tuned for that column and reads as centred
 * once the column is full width, so the mobile copy sits closer to the left.
 */
function ProcessStickyNote({
  offsetX,
  className = "",
}: {
  offsetX?: number;
  className?: string;
}) {
  const { size, x, y, rotate, textScale, textPad } = processStickyLayout;

  return (
    <div
      className={`relative aspect-square rounded-[3px] bg-[#efe6d3] shadow-[0_2px_4px_rgba(31,36,32,0.07),0_14px_18px_-17px_rgba(31,36,32,0.62)] ${className}`}
      style={{
        width: size,
        transform: `translate(${offsetX ?? x}px, ${y}px) rotate(${rotate}deg)`,
      }}
      aria-hidden
    >
      <span className="pointer-events-none absolute inset-0 rounded-[3px] bg-[linear-gradient(140deg,rgba(255,255,255,0.22),transparent_38%,rgba(31,36,32,0.055)_100%)]" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-3 rounded-t-[3px] bg-[linear-gradient(180deg,rgba(31,36,32,0.055),transparent)]" />
      <span className="pointer-events-none absolute bottom-[-0.32rem] left-[14%] right-[14%] h-3 rounded-[50%] bg-ink/15 blur-md" />
      <span className="pointer-events-none absolute bottom-[-1px] left-[10%] right-[20%] h-4 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(31,36,32,0.1),transparent_68%)] blur-sm" />
      <span className="absolute bottom-0 right-0 h-5 w-5 rounded-tl-sm bg-[linear-gradient(135deg,rgba(31,36,32,0.14),rgba(255,255,255,0.36)_48%,rgba(255,255,255,0.02)_50%)]" />
      <span
        className="pointer-events-none absolute z-10"
        style={{
          left: `${textPad}%`,
          top: `${textPad}%`,
          right: `${textPad}%`,
          bottom: `${textPad}%`,
          transform: `scale(${textScale})`,
          transformOrigin: "center center",
        }}
      >
        <Image
          src="/images/services/svg/01-post-it-text.svg"
          alt=""
          fill
          sizes={`${size}px`}
          className="object-contain"
        />
      </span>
    </div>
  );
}

function WebDesignProcess() {
  return (
    <section className="grid gap-4 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-16 lg:py-16">
      <Reveal className="max-w-md">
        <p className={serviceSectionLabelClassName}>How I work</p>
        <h2 className={serviceSectionTitleClassName}>
          A clear path from start to launch.
        </h2>
        <p className={serviceSectionBodyClassName}>
          Each project is different, but the foundation stays simple.
        </p>
        <Link
          href="/process"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-forest"
        >
          View the full process
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>

        {/* Desktop keeps the note beside the steps, in the left column.
            On mobile the same note renders after the steps instead — see the
            `lg:hidden` copy below. It is decorative (`aria-hidden`, and its
            text is an SVG with empty alt), so rendering it twice duplicates no
            content and adds nothing to the accessibility tree. */}
        <div className="hidden lg:block">
          <ProcessStickyNote className="mt-10 sm:mt-12" />
        </div>
      </Reveal>

      <div className="pl-3 lg:pl-0">
        {webDesignProcess.map((step, index) => (
          <Reveal
            as="article"
            key={step.title}
            delay={index * 110}
            className={`grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-4 py-5 lg:min-h-[8.75rem] lg:py-7 ${
              index > 0 ? "border-t border-line" : "pt-3 lg:pt-7"
            }`}
          >
            <span
              className="font-source-serif-display text-[1.7rem] font-semibold leading-none tracking-tight tabular-nums text-forest/80 sm:text-[2rem]"
              style={{ fontVariationSettings: '"opsz" 20' }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-serif text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[1.85rem]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="lg:hidden">
        <ProcessStickyNote offsetX={70} className="mt-[1rem]" />
      </div>
    </section>
  );
}

const webDesignWorkContent = {
  featured: {
    slug: "tizirsso",
    label: "Live client website",
    description:
      "A performance-driven website that clarifies the team's story, showcases results, and makes it easy for partners and fans to get involved.",
    highlights: [
      "Clearer content & hierarchy",
      "Stronger story presentation",
      "Sponsor-friendly structure",
    ],
  },
  secondary: [
    {
      slug: "taylor",
      label: "Product build",
      description:
        "A structured product experience that demonstrates clear flows, interface clarity, and organized user journeys.",
    },
    {
      slug: "centi",
      label: "Finance dashboard",
      description:
        "A personal finance dashboard with connected accounts, clear spending insights, and organized financial data.",
    },
  ],
} as const;

function WebDesignWork({ projects }: { projects: CaseStudy[] }) {
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  const featured = bySlug.get(webDesignWorkContent.featured.slug);

  if (!featured) return null;

  return (
    <section className="border-b border-line py-14 lg:py-20">
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>Selected work</p>
        <h2 className={serviceCenterTitleClassName}>
          Recent projects, real results.
        </h2>
      </Reveal>

      <div className="mt-8 grid items-stretch gap-4 sm:mt-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-4">
        <Reveal className="h-full min-h-0">
          <FeaturedWorkCard
            project={featured}
            content={webDesignWorkContent.featured}
          />
        </Reveal>
        <div className="grid h-full min-h-0 grid-rows-2 gap-4">
          {webDesignWorkContent.secondary.map((item, index) => {
            const project = bySlug.get(item.slug);
            return project ? (
              <Reveal
                key={item.slug}
                delay={120 + index * 110}
                className="h-full min-h-0"
              >
                <SecondaryWorkCard project={project} content={item} />
              </Reveal>
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkCard({
  project,
  content,
}: {
  project: CaseStudy;
  content: (typeof webDesignWorkContent)["featured"];
}) {
  return (
    <Link
      href={`/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative min-h-[12rem] flex-[1.35] overflow-hidden bg-ink sm:min-h-[14rem]">
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid-texture absolute inset-0 opacity-25" />
        )}
      </div>

      <div className="flex shrink-0 flex-col bg-card p-4 text-ink sm:p-5">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-forest">
          {content.label}
        </p>
        <h3 className="mt-1.5 font-serif text-[1.45rem] font-semibold leading-tight sm:text-[1.6rem]">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.8rem] leading-5 text-muted sm:line-clamp-3">
          {content.description}
        </p>

        <div className="mt-3 hidden flex-wrap items-center gap-x-2.5 gap-y-1.5 border-t border-line pt-3 text-[0.68rem] font-medium text-ink/75 sm:flex">
          {content.highlights.map((highlight, index) => (
            <span key={highlight} className="flex items-center gap-2.5">
              {index > 0 && <span className="h-3 w-px bg-line" aria-hidden />}
              <span className="flex items-center gap-1">
                <CircleCheck
                  className="h-3 w-3 shrink-0 text-forest"
                  strokeWidth={2}
                />
                {highlight}
              </span>
            </span>
          ))}
        </div>

        <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-forest sm:mt-4">
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function SecondaryWorkCard({
  project,
  content,
}: {
  project: CaseStudy;
  content: (typeof webDesignWorkContent)["secondary"][number];
}) {
  return (
    <Link
      href={`/${project.slug}`}
      className="group grid h-full min-h-[11.5rem] overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-lift sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
    >
      <div className="relative min-h-[9.5rem] overflow-hidden bg-ink sm:h-full sm:min-h-0">
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 26vw, 90vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid-texture absolute inset-0 opacity-25" />
        )}
      </div>

      <div className="flex flex-col justify-center p-4 sm:p-5">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-forest">
          {content.label}
        </p>
        <h3 className="mt-1 font-serif text-[1.25rem] font-semibold leading-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-[0.8rem] leading-5 text-muted">
          {content.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-forest">
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function WebDesignFaq() {
  return (
    <section className="border-t border-line py-12 pb-8 lg:py-14 lg:pb-8">
      <Reveal>
        <FAQSection
          faqs={[...webDesignFaqs]}
          description="Common questions about planning, building, and maintaining a CK Works website."
        />
      </Reveal>
    </section>
  );
}

/**
 * This page had no contextual links out, so every other service was reachable
 * from it only through the footer. Accessibility comes first: it is the choice
 * that is cheapest to make while a site is being designed and most expensive to
 * retrofit, which is exactly the decision someone reading this page is making.
 */
function WebDesignRelated() {
  return (
    <RelatedLinks
      compactMobile
      links={[
        {
          label: "Build accessibility in from the start",
          href: "/services/web-accessibility",
          note: "Structure, contrast, and forms are far cheaper to get right before launch.",
        },
        {
          label: "Keep the site working after launch",
          href: "/services/ongoing-support",
          note: "Updates, fixes, and improvements once the build is live.",
        },
      ]}
    />
  );
}

function WebDesignBottomCta() {
  return (
    <Reveal className="mt-0 flex flex-col gap-5 rounded-xl border border-line bg-card px-6 py-6 text-center shadow-soft sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
      <div className="mx-auto max-w-xl lg:mx-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
          Web Design &amp; Development
        </p>
        <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
          Ready to build a website that works for your business?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-ink/75 sm:text-[0.95rem] lg:mx-0">
          Let&apos;s create something that looks great and gets results.
        </p>
      </div>

      <div className="mx-auto flex w-fit shrink-0 flex-col items-stretch gap-4 lg:mx-0">
        <ProjectInquiryTrigger
          source="web_design_service_bottom_cta"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
        >
          Start a project
          <ArrowRight className="h-4 w-4" />
        </ProjectInquiryTrigger>
        <Link
          href="/process"
          className="group inline-flex items-center justify-center gap-1.5 border-b border-forest pb-1.5 text-sm font-semibold text-forest transition-colors hover:text-ink"
        >
          See how the process works
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Reveal>
  );
}

// ── Analytics & Lead Tracking (bespoke page) ──────────────────────────────
