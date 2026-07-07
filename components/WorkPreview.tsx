"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { projects } from "@/lib/data";
import { fadeUp, stagger, inView } from "@/lib/motion";

export default function WorkPreview() {
  return (
    <section id="work" className="bg-sand py-20 lg:py-28">
      <div className="container-ck">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              A look at some recent projects.
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-ink"
          >
            View all work <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.a
              key={project.title}
              href="#contact"
              variants={fadeUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              {/* image / mockup placeholder */}
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${project.accent}`}
              >
                <div className="grid-texture absolute inset-0 opacity-25" />
                <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-medium text-forest">
                  {project.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest">
                  View project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
