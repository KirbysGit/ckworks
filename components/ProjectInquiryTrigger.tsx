"use client";

import { type ReactNode } from "react";
import { useProjectInquiry } from "./ProjectInquiryProvider";

type Variant = "primary" | "secondary" | "ghost";

type ProjectInquiryTriggerProps = {
  children: ReactNode;
  source?: string;
  variant?: Variant;
  className?: string;
  onOpen?: () => void;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-60";

const sizes = "px-6 py-3 text-sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-ivory shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
  secondary:
    "border border-forest/50 bg-transparent text-forest hover:-translate-y-0.5 hover:bg-forest-soft/40 hover:shadow-soft",
  ghost: "text-forest hover:text-ink",
};

export default function ProjectInquiryTrigger({
  children,
  source,
  variant = "primary",
  className = "",
  onOpen,
}: ProjectInquiryTriggerProps) {
  const { openInquiry } = useProjectInquiry();

  return (
    <button
      type="button"
      onClick={(event) => {
        onOpen?.();
        openInquiry(source, event.currentTarget);
      }}
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
