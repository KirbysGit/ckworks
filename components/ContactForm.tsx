"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { serviceAreas } from "@/lib/services";
import { trackEvent } from "@/lib/analytics";

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

const timingOptions = [
  "No rush",
  "Next few weeks",
  "This month",
  "As soon as possible",
];

const referralOptions = [
  "Google",
  "LinkedIn",
  "Referral",
  "Past project",
  "Other",
];

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-ivory/70 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/15";

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
    return (
      <div className="rounded-2xl border border-forest/25 bg-forest-soft/55 p-6 text-center shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
          Message Sent
        </p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-ink">
          Got it.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted">
          Your note is with CK Works now. I will review it and reply soon with
          any useful questions, ideas, or next steps.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setHasTrackedStart(false);
          }}
          className="mt-5 rounded-xl border border-forest/50 px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-ivory"
        >
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-card p-5 shadow-soft sm:p-7"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Name"
          required
          value={form.name}
          onChange={(value) => updateField("name", value)}
        />
        <TextField
          label="Email"
          required
          type="email"
          value={form.email}
          onChange={(value) => updateField("email", value)}
        />
        <TextField
          label="Company"
          value={form.company}
          onChange={(value) => updateField("company", value)}
        />
        <TextField
          label="Current website"
          value={form.currentWebsite}
          placeholder="https://"
          onChange={(value) => updateField("currentWebsite", value)}
        />
        <SelectField
          label="Service needed"
          value={form.serviceNeeded}
          onChange={(value) => updateField("serviceNeeded", value)}
          options={serviceAreas.map((service) => service.title)}
        />
        <SelectField
          label="Estimated timing"
          value={form.estimatedTiming}
          onChange={(value) => updateField("estimatedTiming", value)}
          options={timingOptions}
        />
      </div>

      <div className="mt-4">
        <SelectField
          label="How did you hear about CK Works?"
          value={form.heardAbout}
          onChange={(value) => updateField("heardAbout", value)}
          options={referralOptions}
        />
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-ink">
          Project description <span className="text-forest">*</span>
        </span>
        <textarea
          value={form.projectDescription}
          onChange={(event) =>
            updateField("projectDescription", event.target.value)
          }
          rows={6}
          className={`${fieldClass} resize-y`}
          placeholder="Tell me what you are working on, what feels messy, and what you want the site or system to help with."
        />
      </label>

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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      >
        <option value="">Choose one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
