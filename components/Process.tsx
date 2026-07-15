"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Laptop,
  Search,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { fadeUp, stagger, inView } from "@/lib/motion";

type Chapter = {
  number: string;
  label: string;
  title: string;
  body: string;
  note: string;
  icon: LucideIcon;
};

const processChapters: Chapter[] = [
  {
    number: "1",
    label: "Chapter 01",
    title: "We get clear.",
    body: "We start with your goals, your audience, and what the site actually needs to do.",
    note: "Clarity first. Everything else builds from here.",
    icon: Search,
  },
  {
    number: "2",
    label: "Chapter 02",
    title: "We shape the direction.",
    body: "We define the structure, messaging, and visual direction so the project has a strong foundation.",
    note: "A clear plan makes everything easier.",
    icon: ClipboardList,
  },
  {
    number: "3",
    label: "Chapter 03",
    title: "I build it out.",
    body: "I turn the direction into a real site, with thoughtful design, clean code, and the practical pieces behind it.",
    note: "Intentional design. Reliable build. Made to work.",
    icon: Laptop,
  },
  {
    number: "4",
    label: "Chapter 04",
    title: "We launch, respond, and improve.",
    body: "Once it is live, we test, refine, and keep improving what needs attention.",
    note: "Launch is the beginning, not the end.",
    icon: Sprout,
  },
];

export default function Process() {
  return (
    <section id="process" className="container-ck py-14 lg:py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={inView}
      >
        <motion.div
          variants={fadeUp}
          className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.62fr)_minmax(14rem,0.36fr)] lg:items-end"
        >
          <div>
            <SectionLabel>The Approach</SectionLabel>
            <h2 className="mt-5 max-w-[44rem] font-serif text-5xl font-medium leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
              A calm way projects take shape.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-ink/80 sm:text-lg">
            Every project is different, but the foundation is always the same:
            clarity, thoughtful design, solid build, and ongoing care.
          </p>

          <p className="hidden rotate-[-7deg] justify-self-center font-serif text-2xl italic leading-tight text-forest/90 lg:block">
            Thoughtful work
            <br />
            built to last.
            <span className="mt-2 block h-px w-28 origin-left rotate-[-3deg] bg-forest/70" />
          </p>
        </motion.div>

        <ProcessBook />

        <motion.ol variants={fadeUp} className="mt-10 space-y-3 lg:hidden">
          {processChapters.map((chapter) => (
            <li
              key={chapter.number}
              className="rounded-xl border border-line bg-card p-5 shadow-soft"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest">
                {chapter.label}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-medium leading-tight text-ink">
                {chapter.number}. {chapter.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {chapter.body}
              </p>
            </li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
}

function ProcessBook() {
  return (
    <motion.div variants={fadeUp} className="relative mt-12 hidden lg:block">
      <div
        className="pointer-events-none absolute inset-x-14 bottom-[-1.6rem] h-12 rounded-[50%] bg-ink/25 blur-2xl"
        aria-hidden
      />

      <div className="relative px-5 pb-5 pt-4">
        <div
          className="absolute inset-x-0 bottom-0 top-8 rounded-[2.2rem] bg-[linear-gradient(180deg,#23432f_0%,#102318_58%,#08120d_100%)] shadow-[0_18px_44px_-20px_rgba(7,14,10,0.78),inset_0_2px_0_rgba(255,255,255,0.12)]"
          aria-hidden
        />
        <PageStack side="left" />
        <PageStack side="right" />

        <div className="relative min-h-[29rem] overflow-hidden rounded-[2rem] border border-[#d9d2c4] bg-[#fffcf4] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_28px_-20px_rgba(31,36,32,0.55)]">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_3%,rgba(255,255,255,0.88),transparent_25%),radial-gradient(circle_at_82%_6%,rgba(255,255,255,0.76),transparent_28%),linear-gradient(90deg,rgba(77,63,41,0.08),transparent_10%,transparent_42%,rgba(31,36,32,0.08)_50%,transparent_58%,transparent_90%,rgba(77,63,41,0.08)),linear-gradient(180deg,#fffdf8_0%,#f8f1e5_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.22]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(rgba(77,63,41,0.22) 0.55px, transparent 0.55px)",
              backgroundSize: "7px 7px",
            }}
          />
          <div
            className="absolute inset-x-8 top-0 h-12 rounded-[50%] border-t border-[#d8d0c0]/80"
            aria-hidden
          />
          <div
            className="absolute inset-x-8 bottom-0 h-10 rounded-[50%] border-b border-[#cfc5b4]/90"
            aria-hidden
          />
          <div
            className="absolute bottom-0 left-8 right-8 h-5 bg-[repeating-linear-gradient(0deg,rgba(65,56,42,0.2)_0_1px,rgba(255,255,255,0)_1px_3px)] opacity-70"
            aria-hidden
          />
          <div
            className="absolute bottom-0 left-1/2 z-20 h-full w-16 -translate-x-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(52,45,35,0.06)_22%,rgba(52,45,35,0.26)_49%,rgba(255,255,255,0.28)_51%,rgba(52,45,35,0.08)_76%,transparent_100%)]"
            aria-hidden
          />
          <div
            className="absolute bottom-[-1px] left-1/2 z-30 h-9 w-3 -translate-x-1/2 rounded-t-full bg-[#183322] shadow-[0_-2px_6px_rgba(7,14,10,0.38)]"
            aria-hidden
          />

          <div className="relative z-10 grid min-h-[29rem] grid-cols-4 px-16 pb-14 pt-14">
            {processChapters.map((chapter, index) => (
              <BookChapter key={chapter.number} chapter={chapter} index={index} />
            ))}
          </div>

          <span className="absolute bottom-9 left-12 text-[11px] font-semibold uppercase tracking-[0.38em] text-ink/70">
            CK Works
          </span>
          <span className="absolute bottom-9 right-12 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/70">
            Built to last.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function PageStack({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`absolute bottom-3 top-11 z-0 w-12 bg-[repeating-linear-gradient(90deg,#f5eedf_0_2px,#d7cebd_2px_3px,#fff9ec_3px_5px)] opacity-95 shadow-[inset_0_0_10px_rgba(77,63,41,0.22)] ${
        side === "left"
          ? "left-3 rounded-l-[2rem]"
          : "right-3 rounded-r-[2rem]"
      }`}
      aria-hidden
    />
  );
}

function BookChapter({ chapter, index }: { chapter: Chapter; index: number }) {
  const Icon = chapter.icon;
  const hasDivider = index === 0 || index === 2;

  return (
    <article
      className={`relative flex min-h-[22rem] flex-col px-9 ${
        hasDivider ? "border-r border-[#d8d0c2]" : ""
      } ${index === 2 ? "pl-12" : ""}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-forest/85">
        {chapter.label}
      </p>
      <span className="mt-2 h-px w-8 bg-forest/60" aria-hidden />

      <h3 className="mt-8 font-serif text-[2.15rem] font-medium leading-[0.98] text-ink">
        {chapter.number}. {chapter.title}
      </h3>
      <span
        className="mt-2 h-px w-[72%] origin-left rotate-[-4deg] bg-forest/70"
        aria-hidden
      />

      <p className="mt-8 max-w-[14rem] text-sm leading-6 text-ink/82">
        {chapter.body}
      </p>

      <div
        className={`mt-auto flex items-end gap-4 pt-8 ${
          index === 3 ? "justify-between" : "justify-center"
        }`}
      >
        <Icon
          className={`h-12 w-12 text-forest/75 ${index === 3 ? "h-10 w-10" : ""}`}
          strokeWidth={1.35}
          aria-hidden
        />
        <p
          className={`max-w-[9.5rem] rotate-[-8deg] font-serif text-lg italic leading-tight text-forest/80 ${
            index === 3
              ? "rounded-[50%] border border-forest/55 px-4 py-3 text-center text-base"
              : ""
          }`}
        >
          {chapter.note}
        </p>
      </div>
    </article>
  );
}
