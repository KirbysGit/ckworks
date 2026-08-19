"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import {
  referralOptions,
  serviceOptions,
  timingOptions,
} from "@/lib/inquiry";
import { trackEvent } from "@/lib/analytics";
import { animDelay } from "@/lib/motion";

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  currentWebsite: string;
  serviceNeeded: string;
  projectDescription: string;
  estimatedTiming: string;
  heardAbout: string;
  website: string;
};

const initialForm: ContactFormState = {
  name: "",
  email: "",
  company: "",
  currentWebsite: "",
  serviceNeeded: "",
  projectDescription: "",
  estimatedTiming: "",
  heardAbout: "",
  website: "",
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border-2 border-line bg-ivory/70 px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,background-color] duration-500 ease-out placeholder:text-muted/55 hover:border-forest/40 hover:bg-card focus:border-forest focus:bg-card";

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [formStartedAt, setFormStartedAt] = useState<number | null>(null);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setFormStartedAt(Date.now());
    trackEvent("project_inquiry_opened", {
      source: "contact_page",
    });
  }, []);

  const attribution = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        landingPage: "",
        referrer: "",
        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
      };
    }

    const params = new URLSearchParams(window.location.search);
    return {
      landingPage: window.location.pathname,
      referrer: document.referrer,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
    };
  }, []);

  function updateField(field: keyof ContactFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (!hasTrackedStart && field !== "website") {
      setHasTrackedStart(true);
      trackEvent("contact_form_started", {
        source: "contact_page",
        field,
      });
    }
    if (status === "error") {
      setStatus("idle");
      setError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.projectDescription.trim()) {
      setStatus("error");
      setError("Please add your name, email, and project description.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          businessName: form.company,
          currentWebsite: form.currentWebsite,
          projectType: form.serviceNeeded,
          timeline: form.estimatedTiming,
          heardAbout: form.heardAbout,
          message: form.projectDescription,
          website: form.website,
          formStartedAt: String(formStartedAt ?? Date.now()),
          submittedAt: new Date().toISOString(),
          sourcePage: "/contact",
          source: "contact-page",
          ...attribution,
        }),
      });

      if (!response.ok) throw new Error("Inquiry failed");

      trackEvent("contact_form_submitted", {
        source: "contact_page",
        project_type: form.serviceNeeded || "not_provided",
        timeline: form.estimatedTiming || "not_provided",
      });

      setStatus("success");
      setForm(initialForm);
      setFormStartedAt(Date.now());
      setHasTrackedStart(false);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or use email/WhatsApp.");
    }
  }

  if (status === "success") {
    return <ContactSuccess />;
  }

  return (
    // The card border and radius live on the wrapper in `app/contact/page.tsx`
    // so the form and the aside read as one panel rather than two stacked ones.
    <form
      onSubmit={handleSubmit}
      className="rounded-t-2xl bg-card px-6 py-5 sm:px-7 sm:py-6 lg:rounded-l-2xl lg:rounded-tr-none"
    >
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <TextField
          label="Name"
          required
          value={form.name}
          placeholder="Your name"
          onChange={(value) => updateField("name", value)}
        />
        <TextField
          label="Email"
          required
          type="email"
          value={form.email}
          placeholder="you@company.com"
          onChange={(value) => updateField("email", value)}
        />
        <TextField
          label="Company"
          value={form.company}
          placeholder="Your business"
          onChange={(value) => updateField("company", value)}
        />
        <TextField
          label="Current website"
          value={form.currentWebsite}
          placeholder="https://"
          onChange={(value) => updateField("currentWebsite", value)}
        />
        <SelectField
          label="What can I help with?"
          value={form.serviceNeeded}
          onChange={(value) => updateField("serviceNeeded", value)}
          options={serviceOptions}
        />
        <SelectField
          label="Estimated timing"
          value={form.estimatedTiming}
          onChange={(value) => updateField("estimatedTiming", value)}
          options={timingOptions}
        />
      </div>

      {/* Required field before the optional one, and four rows rather than six
          so the submit button stays reachable without scrolling. */}
      <label className="mt-3 block">
        <span className="text-sm font-semibold text-ink">
          Tell me about the project <span className="text-forest">*</span>
        </span>
        <textarea
          value={form.projectDescription}
          onChange={(event) =>
            updateField("projectDescription", event.target.value)
          }
          rows={4}
          className={`${fieldClass} resize-y`}
          placeholder="Share as much or as little as you'd like..."
        />
      </label>

      <div className="mt-3">
        <SelectField
          label="How did you hear about CK Works?"
          value={form.heardAbout}
          onChange={(value) => updateField("heardAbout", value)}
          options={referralOptions}
          optional
        />
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-semibold text-ivory shadow-soft transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send inquiry <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

const successSteps = ["Note received", "I'll review it", "I'll reply soon"];

function ContactSuccess() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      role="status"
      className="flex min-h-[28rem] flex-col items-center justify-center rounded-t-2xl px-6 py-10 text-center sm:px-8 sm:py-12 lg:min-h-full lg:rounded-l-2xl lg:rounded-tr-none"
    >
      <div
        className="ck-pop relative flex h-24 w-28 items-center justify-center sm:h-28 sm:w-32"
        style={{ animationDelay: "80ms" }}
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full bg-forest-soft/40 blur-2xl" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/modal/modal-after-check.svg"
          alt=""
          className="relative h-full w-full select-none object-contain"
        />
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="ck-rise mt-3 font-serif text-[2.35rem] font-medium leading-none text-forest outline-none sm:text-[2.75rem]"
        style={{ animationDelay: "200ms" }}
      >
        Got it.
      </h2>
      <p
        className="ck-rise mx-auto mt-2.5 max-w-[24rem] text-sm leading-6 text-ink sm:text-[0.95rem]"
        style={{ animationDelay: "300ms" }}
      >
        Your note is with CK Works now.
        <br className="hidden sm:block" /> I usually reply within one business
        day with any follow-up questions, ideas, or next steps.
      </p>

      <ol className="mt-8 grid w-full max-w-[26rem] grid-cols-3 items-start gap-2">
        {successSteps.map((step, index) => (
          <li key={step} className="relative text-center">
            {index < successSteps.length - 1 && (
              <span
                className="ck-draw-x absolute left-[58%] top-4 hidden h-px w-[84%] border-t border-dotted border-forest/80 sm:block"
                style={animDelay(520 + index * 140)}
                aria-hidden
              />
            )}
            <span
              className="ck-pop relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-semibold text-ivory shadow-soft"
              style={{ animationDelay: `${460 + index * 120}ms` }}
            >
              {index + 1}
            </span>
            <p
              className="ck-rise mt-2 text-xs font-bold leading-snug text-ink sm:text-sm"
              style={{ animationDelay: `${520 + index * 120}ms` }}
            >
              {step}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-forest">*</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  optional?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function chooseOption(option: string) {
    onChange(option);
    setOpen(false);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative block"
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (!next || !event.currentTarget.contains(next as Node)) {
          setOpen(false);
        }
      }}
    >
      <span className="text-sm font-semibold text-ink">
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-muted">(optional)</span>
        )}
      </span>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            wrapperRef.current
              ?.querySelector<HTMLButtonElement>("[data-select-option]")
              ?.focus();
          }
        }}
        className={`${fieldClass} flex items-center justify-between gap-3 text-left ${
          open ? "border-forest bg-card" : ""
        }`}
      >
        <span className={`min-w-0 truncate ${value ? "text-ink" : "text-muted/55"}`}>
          {value || "Select an option"}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-forest/75 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.8}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border-2 border-line bg-card py-1 shadow-soft"
        >
          {options.map((option) => {
            const selected = value === option;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
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
                className={`block w-full px-4 py-2.5 text-left text-sm transition-colors focus:outline-none ${
                  selected
                    ? "bg-forest-soft/80 font-medium text-forest"
                    : "text-ink hover:bg-forest-soft/55 hover:text-forest focus:bg-forest-soft/55 focus:text-forest"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
