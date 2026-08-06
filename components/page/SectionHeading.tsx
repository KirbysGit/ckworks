import type { ReactNode } from "react";

type SectionHeadingProps = {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Shared service/content section headers.
 *  - left: "What this service covers / Everything you need..."
 *  - center: "A better website makes a real difference."
 */
export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "mx-auto max-w-5xl text-center" : ""} ${className}`}>
      {label && (
        <p
          className={
            isCenter
              ? "text-xs font-semibold uppercase tracking-[0.28em] text-forest/80"
              : "text-xs font-semibold uppercase tracking-[0.24em] text-muted"
          }
        >
          {label}
        </p>
      )}
      <h2
        className={
          isCenter
            ? "mt-5 font-serif text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[2.75rem] lg:text-[3.8rem]"
            : "mt-4 font-serif text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.35rem]"
        }
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm leading-7 text-ink/75 sm:text-[0.95rem] ${
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
