"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { services } from "@/lib/data";
import { fadeUp, stagger, inView } from "@/lib/motion";

export default function Services() {
  return (
    <section id="what-i-do" className="container-ck py-20 lg:py-28">
      <div className="max-w-2xl">
        <SectionLabel>What I Do</SectionLabel>
        <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
          A few ways I can help your business.
        </h2>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map(({ icon: Icon, title, body }) => (
          <motion.a
            key={title}
            href="#contact"
            variants={fadeUp}
            className="group flex flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-soft">
              <Icon className="h-5 w-5 text-forest" />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">
              {title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {body}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
