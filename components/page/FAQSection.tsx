"use client";

import { type ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  faqs: FAQ[];
  label?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
};

export default function FAQSection({
  faqs,
  label = "FAQ",
  title = "A few useful questions.",
  description = "Common questions about working with CK Works, the process, and the results you can expect.",
  className = "",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section className={className}>
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          {label}
        </p>
        <h2 className="mt-4 font-serif text-[2.35rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink sm:text-[3rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-[1.05rem]">
            {description}
          </p>
        )}
      </div>

      <div className="mt-10 border-t border-line">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className={`border-b border-line transition-colors duration-200 ${
                isOpen ? "bg-forest-soft/55" : "bg-transparent"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-5 px-3 py-4 text-left sm:gap-6 sm:px-5 sm:py-5"
              >
                <span className="pr-2 font-sans text-[1rem] font-semibold leading-snug text-ink sm:text-[1.12rem]">
                  {faq.question}
                </span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                    isOpen
                      ? "border-forest bg-forest text-ivory"
                      : "border-line bg-ivory/45 text-forest hover:border-forest/50"
                  }`}
                  aria-hidden
                >
                  <Plus
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    strokeWidth={2}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
                        opacity: { duration: 0.22, ease: "easeOut" },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.14, ease: "easeIn" },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-5xl px-3 pb-4 text-sm leading-7 text-ink/76 sm:px-5 sm:pb-5 sm:text-[0.95rem]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </section>
  );
}
