import type { ReactNode } from "react";

type SectionHeadingProps = {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export default function SectionHeading({
  label,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          {label}
        </p>
      )}
      <h2 className="mt-3 font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
