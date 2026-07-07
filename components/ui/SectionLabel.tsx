type Props = {
  children: string;
  className?: string;
};

// Small uppercase eyebrow with a short forest tick, used above section titles.
export default function SectionLabel({ children, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-forest ${className}`}
    >
      <span className="h-px w-6 bg-forest/50" aria-hidden />
      {children}
    </span>
  );
}
