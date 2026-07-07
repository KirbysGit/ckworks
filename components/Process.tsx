"use client";

import { motion } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";
import { steps } from "@/lib/data";
import { fadeUp, stagger, inView } from "@/lib/motion";

export default function Process() {
  return (
    <section id="process" className="container-ck py-20 lg:py-28">
      <div className="max-w-2xl">
        <SectionLabel>How We Work</SectionLabel>
        <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
          A clear, calm process from first call to launch.
        </h2>
      </div>

      <motion.ol
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-14 grid gap-8 md:grid-cols-5 md:gap-4"
      >
        {steps.map((step, i) => (
          <motion.li key={step.number} variants={fadeUp} className="relative">
            {/* dotted connector (desktop only, between steps) */}
            {i < steps.length - 1 && (
              <span
                className="absolute left-11 top-5 hidden h-px w-full border-t-2 border-dotted border-line md:block"
                aria-hidden
              />
            )}

            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-forest/30 bg-forest-soft font-serif text-lg font-semibold text-forest">
              {step.number}
            </span>
            <h3 className="mt-4 font-serif text-xl font-semibold text-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
