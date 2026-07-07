import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-60";

const sizes = "px-6 py-3 text-sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-ivory shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
  secondary:
    "border border-line bg-card text-ink hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-soft",
  ghost: "text-forest hover:text-ink",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  "aria-label"?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
