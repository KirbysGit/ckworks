"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, X } from "lucide-react";
import { contactEmail } from "@/lib/data";

type ProjectInquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
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

export default function ProjectInquiryModal({
  isOpen,
  onClose,
  source,
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
      const firstField = modalRef.current?.querySelector<HTMLElement>(
        focusableSelector,
      );
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
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#efe8da]/75 px-3 py-3 sm:items-center sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
            className="relative max-h-[94vh] w-full max-w-[46rem] overflow-y-auto rounded-[1.65rem] border border-line bg-card px-5 py-6 shadow-float outline-none sm:px-8 sm:py-8"
            initial={{ opacity: 0, y: 24, scale: 0.985, rotate: -0.35 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={handleTrapFocus}
          >
            <div
              className="pointer-events-none absolute -right-4 -top-4 -z-10 h-full w-full rounded-[1.65rem] border border-line/70 bg-sand"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.65rem] opacity-[0.28]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(47,91,63,0.055) 1px, transparent 1px)",
                backgroundSize: "100% 2.15rem",
              }}
              aria-hidden
            />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ivory text-ink shadow-soft transition-colors hover:border-forest/40 hover:text-forest"
              aria-label="Close project inquiry"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <div className="relative py-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                  Note received
                </p>
                <h2
                  id="project-inquiry-title"
                  className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl"
                >
                  Got it. I&apos;ll take a look.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
                  Thanks for reaching out. I&apos;ll read through your note and
                  get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-forest px-8 py-3 text-sm font-semibold text-ivory shadow-soft transition-colors hover:bg-ink"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                  Start a project
                </p>
                <h2
                  id="project-inquiry-title"
                  className="mt-3 pr-10 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl"
                >
                  Got a project in mind?
                </h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Tell me what you&apos;re working on. No perfect brief needed.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField
                      label="Name"
                      required
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

                  <TextField
                    label="Business / project name"
                    value={form.businessName}
                    placeholder="Business, brand, or project name"
                    onChange={(value) => updateField("businessName", value)}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField
                      label="Project type"
                      value={form.projectType}
                      options={projectTypes}
                      placeholder="Choose a type"
                      onChange={(value) => updateField("projectType", value)}
                    />
                    <SelectField
                      label="Timeline"
                      value={form.timeline}
                      options={timelines}
                      placeholder="Choose a timeline"
                      onChange={(value) => updateField("timeline", value)}
                    />
                  </div>

                  <SelectField
                    label="Budget range"
                    value={form.budget}
                    options={budgets}
                    placeholder="Choose a range"
                    onChange={(value) => updateField("budget", value)}
                  />

                  <label className="block">
                    <span className="text-sm font-semibold text-ink">
                      Message <span className="text-forest">*</span>
                    </span>
                    <textarea
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="Tell me about the site, system, idea, or update you have in mind."
                      rows={5}
                      className={`mt-2 w-full resize-y rounded-xl border bg-ivory/75 px-4 py-3 text-sm leading-6 text-ink outline-none transition-colors placeholder:text-muted/65 focus:border-forest focus:ring-2 focus:ring-forest/15 ${
                        errors.message ? "border-red-400" : "border-line"
                      }`}
                    />
                    {errors.message && <FieldError>{errors.message}</FieldError>}
                  </label>

                  {status === "error" && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-900">
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

                  <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-end sm:justify-between">
                    <p className="max-w-[14rem] font-serif text-xl italic leading-snug text-forest">
                      Send a note and I&apos;ll take a look.
                      <span className="block text-base">- CK</span>
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-forest px-7 py-3 text-sm font-semibold text-ivory shadow-soft transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
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
                  </div>
                </form>
              </div>
            )}
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
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-forest">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`mt-2 h-12 w-full rounded-xl border bg-ivory/75 px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/65 focus:border-forest focus:ring-2 focus:ring-forest/15 ${
          error ? "border-red-400" : "border-line"
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
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-line bg-ivory/75 px-4 text-sm text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/15"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldError({ children }: { children: string }) {
  return <p className="mt-1.5 text-xs font-medium text-red-700">{children}</p>;
}
