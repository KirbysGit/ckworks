"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Loader2, X } from "lucide-react";
import Logo from "./ui/Logo";
import { contactEmail } from "@/lib/data";

type ProjectInquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  /** Dev-only: open straight to the success screen (no email send). */
  debugSuccess?: boolean;
};

type FormState = {
  name: string;
  email: string;
  businessName: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  businessName: "",
  projectType: "",
  timeline: "",
  budget: "",
  message: "",
};

const projectTypes = [
  "Website",
  "Website updates",
  "Logo / brand direction",
  "Dashboard or internal tool",
  "Integration / backend feature",
  "Not sure yet",
];

const timelines = [
  "No rush",
  "Next few weeks",
  "This month",
  "As soon as possible",
];

const budgets = [
  "Not sure yet",
  "Under $1,500",
  "$1,500-$3,000",
  "$3,000-$5,000",
  "$5,000+",
];

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const inputClasses =
  "mt-1.5 h-10 w-full rounded-none border bg-[#fbf6eb]/70 px-3 text-[13px] text-ink outline-none transition-colors placeholder:text-muted/65 focus:border-forest focus:ring-2 focus:ring-forest/15";

const fieldBorder = "border-[#cfc5b5]";

export default function ProjectInquiryModal({
  isOpen,
  onClose,
  source,
  debugSuccess = false,
}: ProjectInquiryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const firstField =
        modalRef.current?.querySelector<HTMLElement>(
          "[data-inquiry-initial-focus]",
        ) ??
        modalRef.current?.querySelector<HTMLElement>(focusableSelector);
      firstField?.focus();
    }, 80);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;

    const resetTimer = window.setTimeout(() => {
      setForm(initialForm);
      setErrors({});
      setStatus("idle");
    }, 220);

    return () => window.clearTimeout(resetTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !debugSuccess) return;
    setStatus("success");
  }, [isOpen, debugSuccess]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function validate() {
    const nextErrors: Errors = {};

    if (!form.name.trim()) nextErrors.name = "Please add your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please add your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Please use a valid email.";
    }
    if (!form.message.trim()) {
      nextErrors.message = "Tell me a little about what you need.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
          sourcePage:
            typeof window === "undefined" ? source : window.location.pathname,
          source,
        }),
      });

      if (!response.ok) throw new Error("Inquiry request failed");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleTrapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;

    const focusable = Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    ).filter((element) => element.offsetParent !== null);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#211f19]/62 px-3 py-4 backdrop-blur-[3px] sm:px-6 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onMouseDown={onClose}
          onKeyDown={(event) => {
            if (event.key === "Escape") onClose();
          }}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-inquiry-title"
            tabIndex={-1}
            className="relative w-full max-w-[41rem] outline-none"
            initial={{ opacity: 0, y: 28, scale: 0.982, rotate: -0.45 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={handleTrapFocus}
          >
            <div
              className="pointer-events-none absolute -bottom-6 -left-5 top-7 -z-20 hidden w-[96%] rotate-[-2.25deg] rounded-[0.45rem] bg-forest shadow-[0_26px_44px_rgba(10,22,16,0.36)] sm:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-12 bottom-7 top-8 -z-10 hidden w-[38%] rotate-[2.2deg] rounded-[0.45rem] border border-[#d9cdbb] bg-[#f7efdf] shadow-[0_22px_36px_rgba(31,36,32,0.24)] sm:block"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(111,83,46,0.17) 0.65px, transparent 0.8px)",
                backgroundSize: "10px 10px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-16 bottom-1 top-20 -z-30 hidden w-[30%] rotate-[5deg] rounded-[0.35rem] bg-[#ebe4d8] shadow-[0_20px_42px_rgba(31,36,32,0.22)] sm:block"
              aria-hidden
            />
            <PaperClip />

            <div className="relative overflow-visible rounded-[0.4rem] border border-[#d8cdbd] bg-[#fffaf0] px-5 pb-5 pt-9 shadow-[0_28px_70px_rgba(10,9,7,0.34),0_2px_8px_rgba(10,9,7,0.12)] sm:px-14 sm:pb-7 sm:pt-12">
              <div
                className="pointer-events-none absolute inset-0 rounded-[0.4rem] opacity-[0.55]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(104,84,55,0.12) 0.55px, transparent 0.75px), linear-gradient(rgba(47,91,63,0.035) 1px, transparent 1px)",
                  backgroundSize: "9px 9px, 100% 2.35rem",
                }}
                aria-hidden
              />

              <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-forest sm:right-7 sm:top-7"
                aria-label="Close project inquiry"
              >
                <X className="h-8 w-8" strokeWidth={1.6} />
              </button>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <SuccessMessage key="success" onClose={onClose} />
                ) : (
                  <motion.div
                    key="form"
                    className="relative"
                    initial={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      y: -18,
                      scale: 0.985,
                      filter: "blur(2px)",
                    }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="inline-block border-b border-forest/35 pb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-forest sm:ml-10">
                      Start a project
                    </p>
                    <h2
                      id="project-inquiry-title"
                      className="mt-4 pr-12 font-serif text-[2.15rem] font-medium leading-[1.02] text-ink sm:text-[2.35rem]"
                    >
                      Got a project in mind?
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-ink/80 sm:text-base">
                      Tell me what you&apos;re working on. No perfect brief needed.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <TextField
                          label="Name"
                          required
                          autoFocusMarker
                          value={form.name}
                          placeholder="Your name"
                          error={errors.name}
                          onChange={(value) => updateField("name", value)}
                        />
                        <TextField
                          label="Email"
                          required
                          type="email"
                          value={form.email}
                          placeholder="you@company.com"
                          error={errors.email}
                          onChange={(value) => updateField("email", value)}
                        />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <TextField
                          label="Business / project name"
                          value={form.businessName}
                          placeholder="Business or project name"
                          onChange={(value) =>
                            updateField("businessName", value)
                          }
                        />
                        <SelectField
                          label="Project type"
                          value={form.projectType}
                          options={projectTypes}
                          placeholder="Choose a type"
                          onChange={(value) => updateField("projectType", value)}
                        />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <SelectField
                          label="Timeline"
                          value={form.timeline}
                          options={timelines}
                          placeholder="Choose a timeline"
                          onChange={(value) => updateField("timeline", value)}
                        />
                        <SelectField
                          label="Budget range"
                          value={form.budget}
                          options={budgets}
                          placeholder="Choose a range"
                          onChange={(value) => updateField("budget", value)}
                        />
                      </div>

                      <label className="block">
                        <span className="text-xs font-bold text-ink">
                          Message <span className="text-forest">*</span>
                        </span>
                        <textarea
                          value={form.message}
                          onChange={(event) =>
                            updateField("message", event.target.value)
                          }
                          placeholder="Tell me about the site, system, idea, or update you have in mind."
                          rows={3}
                          className={`mt-1.5 w-full resize-none rounded-none border bg-[#fbf6eb]/70 px-3 py-2 text-[13px] leading-5 text-ink outline-none transition-colors placeholder:text-muted/65 focus:border-forest focus:ring-2 focus:ring-forest/15 ${
                            errors.message ? "border-red-400" : fieldBorder
                          }`}
                        />
                        {errors.message && (
                          <FieldError>{errors.message}</FieldError>
                        )}
                      </label>

                      {status === "error" && (
                        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-900">
                          Something went wrong. Please try again, or email me
                          directly at{" "}
                          <a
                            href={`mailto:${contactEmail}`}
                            className="font-semibold underline"
                          >
                            {contactEmail}
                          </a>
                          .
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-forest px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ivory shadow-[0_10px_22px_rgba(20,49,33,0.24)] transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send note <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <ModalBottomNote />
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
  required = false,
  type = "text",
  error,
  autoFocusMarker = false,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  error?: string;
  autoFocusMarker?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-ink">
        {label} {required && <span className="text-forest">*</span>}
      </span>
      <input
        type={type}
        value={value}
        data-inquiry-initial-focus={autoFocusMarker ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`${inputClasses} ${
          error ? "border-red-400" : fieldBorder
        }`}
      />
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedLabel = value || placeholder;

  function chooseOption(option: string) {
    onChange(option);
    setOpen(false);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative block"
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;
        if (!nextTarget || !event.currentTarget.contains(nextTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <span className="text-xs font-bold text-ink">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            const firstOption =
              wrapperRef.current?.querySelector<HTMLButtonElement>(
                "[data-select-option]",
              );
            firstOption?.focus();
          }
        }}
        className={`${inputClasses} ${fieldBorder} flex items-center justify-between gap-3 text-left transition-all hover:border-forest/55 hover:bg-forest-soft/20`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "text-ink" : "text-muted/65"}>
          {selectedLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-forest transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.8}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-1 overflow-hidden border border-forest/35 bg-[#fffaf0] py-1 shadow-[0_14px_28px_rgba(31,36,32,0.18)]"
        >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="option"
            aria-selected={value === option}
            data-select-option
            onClick={() => chooseOption(option)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setOpen(false);
                wrapperRef.current
                  ?.querySelector<HTMLButtonElement>("[aria-haspopup]")
                  ?.focus();
              }
            }}
            className={`block w-full px-3 py-2 text-left text-[13px] transition-colors focus:bg-forest-soft focus:text-forest focus:outline-none hover:bg-forest-soft hover:text-forest ${
              value === option ? "bg-forest-soft/70 text-forest" : "text-ink"
            }`}
          >
            {option}
          </button>
        ))}
        </div>
      )}
    </div>
  );
}

function FieldError({ children }: { children: string }) {
  return <p className="mt-1.5 text-xs font-medium text-red-700">{children}</p>;
}

function ModalBottomNote() {
  return (
    <motion.div
      className="pointer-events-none mx-auto -mt-1 flex w-full justify-center"
      initial={{ opacity: 0, y: 4, rotate: -0.6 }}
      animate={{ opacity: 1, y: 0, rotate: -0.6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/modal/modal-note.svg"
        alt=""
        className="h-auto w-56 select-none sm:w-64"
      />
    </motion.div>
  );
}

function SuccessMessage({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="success"
      className="relative mx-auto flex w-full max-w-[28rem] flex-col items-center text-center"
      initial={{ opacity: 0, y: 18, filter: "blur(3px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 12, filter: "blur(2px)" }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo size="md" />
      </motion.div>

      <SuccessCheckGraphic />

      <motion.h2
        id="project-inquiry-title"
        className="mt-2 font-serif text-[2.35rem] font-medium leading-none text-forest sm:text-[2.75rem]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
      >
        Got it!
      </motion.h2>

      <motion.p
        className="mx-auto mt-2.5 max-w-[24rem] text-sm leading-6 text-ink sm:text-[0.95rem]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        Your note is with CK Works now.
        <br className="hidden sm:block" /> I&apos;ll take a look and get back
        to you soon with any follow-up questions, ideas, or next steps.
      </motion.p>

      <SuccessSteps />
      <SuccessHandwritingGraphic />

      <motion.button
        type="button"
        onClick={onClose}
        className="mt-4 inline-flex min-h-10 w-full max-w-[26rem] items-center justify-center border border-forest bg-transparent px-8 py-2 text-sm font-bold text-forest transition-colors hover:bg-forest hover:text-ivory"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        Back to site
      </motion.button>
    </motion.div>
  );
}

function SuccessCheckGraphic() {
  return (
    <motion.div
      className="relative mt-4 flex h-24 w-28 items-center justify-center sm:mt-5 sm:h-28 sm:w-32"
      initial={{ opacity: 0, y: 8, scale: 0.88, rotate: -2 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{ duration: 0.42, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-forest-soft/25 blur-2xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/modal/modal-after-check.svg"
        alt=""
        className="relative h-full w-full select-none object-contain"
      />
    </motion.div>
  );
}

function SuccessSteps() {
  const steps = ["Note received", "I'll review it", "I'll reply soon"];

  return (
    <motion.ol
      className="mt-5 grid w-full max-w-[26rem] grid-cols-3 items-start gap-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {steps.map((step, index) => (
        <li key={step} className="relative text-center">
          {index < steps.length - 1 && (
            <motion.span
              className="absolute left-[58%] top-4 hidden h-px w-[84%] border-t border-dotted border-forest/80 sm:block"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.36,
                delay: 0.82 + index * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "left" }}
              aria-hidden
            />
          )}
          <motion.span
            className="relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-semibold text-ivory shadow-soft"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.24,
              delay: 0.78 + index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {index + 1}
          </motion.span>
          <p className="mt-2 text-xs font-bold leading-snug text-ink sm:text-sm">{step}</p>
        </li>
      ))}
    </motion.ol>
  );
}

function SuccessHandwritingGraphic() {
  return (
    <motion.div
      className="mt-4 w-full max-w-[19rem] px-4 sm:mt-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <motion.div
        className="w-full overflow-hidden"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.85, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/modal/modal-after-note.svg"
          alt=""
          className="h-auto w-full select-none"
        />
      </motion.div>
    </motion.div>
  );
}
function PaperClip() {
  return (
    <div
      className="pointer-events-none absolute -top-6 left-6 z-20 hidden h-24 w-10 sm:block"
      aria-hidden
    >
      <div className="absolute left-2 top-0 h-24 w-6 rounded-full border-[3px] border-[#9a7b34] shadow-[0_2px_4px_rgba(31,36,32,0.26)]" />
      <div className="absolute left-[1.2rem] top-3 h-[4.9rem] w-3 rounded-full border-[2px] border-[#c5a850]" />
    </div>
  );
}
