"use client";

import { motion } from "framer-motion";
import { outcomes } from "@/lib/data";
import { fadeUp, stagger, inView } from "@/lib/motion";

export default function OutcomeStrip() {
  return (
    <section className="container-ck pb-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="grid divide-line rounded-2xl border border-line bg-card shadow-soft md:grid-cols-3 md:divide-x"
      >
        {outcomes.map(({ icon: Icon, title, body }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="flex flex-col gap-3 border-b border-line p-7 last:border-b-0 md:border-b-0"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-soft">
              <Icon className="h-5 w-5 text-forest" />
            </span>
            <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-muted">{body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
