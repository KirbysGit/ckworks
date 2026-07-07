"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { fadeUp, inView } from "@/lib/motion";

export default function FounderNote() {
  return (
    <section id="about" className="bg-sand py-20 lg:py-28">
      <div className="container-ck">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid items-center gap-10 rounded-2xl border border-line bg-card p-8 shadow-soft md:grid-cols-[280px_1fr] md:p-12"
        >
          {/* portrait placeholder */}
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-gradient-to-br from-forest-soft to-[#e7ddc9]">
              <User className="h-16 w-16 text-forest/40" />
            </div>
            {/* handwritten-style note */}
            <span className="absolute -right-3 -top-4 rotate-[-6deg] rounded-full bg-forest px-4 py-1.5 font-serif text-lg italic text-ivory shadow-soft">
              Nice to meet you!
            </span>
          </div>

          <div>
            <SectionLabel>A Note From Colin</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl font-medium text-ink sm:text-5xl">
              Hi, I&apos;m Colin.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              <p>
                I started CK Works to help good businesses show up better online
                and get more time back in their day. I believe in clear
                communication, honest timelines, and work that&apos;s built to
                last.
              </p>
              <p>
                When I&apos;m not building websites or systems, you&apos;ll
                probably find me hiking, drinking good coffee, or tinkering with
                something new.
              </p>
            </div>
            <p className="mt-6 font-serif text-3xl italic text-forest">Colin</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
