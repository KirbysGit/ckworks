"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Button from "./ui/Button";
import HeroMockup from "./HeroMockup";
import { fadeUp, stagger } from "@/lib/motion";
import { trustChips } from "@/lib/data";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container-ck grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        {/* Left: copy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-forest"
          >
            Web Design &amp; Digital Systems
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            Websites and digital systems that help growing businesses{" "}
            <em className="italic text-forest">move forward</em> with{" "}
            <span className="underline-accent">confidence</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-muted"
          >
            I help businesses look sharper online and run smoother behind the
            scenes. Clean design, simple systems, and the right tools—built to
            fit the way you work.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#contact">
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#what-i-do" variant="secondary">
              See what I do
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5"
          >
            {trustChips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 text-sm text-muted"
              >
                <Check className="h-4 w-4 text-forest" />
                {chip}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: layered mockup */}
        <HeroMockup />
      </div>
    </section>
  );
}
