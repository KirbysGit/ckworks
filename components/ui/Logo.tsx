import Image from "next/image";

type Size = "sm" | "md" | "lg";

type Props = {
  className?: string;
  showWordmark?: boolean;
  size?: Size;
};

/**
 * Brand mark = constant clover icon + wordmark that swaps for dark mode.
 *
 *  - /svg/ck-icon.svg           green gradient clover — reads on any background,
 *                               so it stays the same in light and dark mode.
 *  - /svg/ck-lightwordmark.svg  near-black text, shown in LIGHT mode.
 *  - /svg/ck-dark-wordmark.svg  ivory text, shown in DARK mode (dark: variant).
 *
 * Sized by height (w-auto) so each wordmark keeps its own aspect ratio.
 * Dark-mode swap is driven by the `dark` class on <html> (see tailwind.config).
 */

// Single source of truth for logo sizing. Tweak here to rescale everywhere.
const scales: Record<Size, { icon: string; wordmark: string; gap: string }> = {
  sm: { icon: "h-7", wordmark: "h-6", gap: "gap-1.5" },
  md: { icon: "h-11", wordmark: "h-9", gap: "gap-1" },
  lg: { icon: "h-12", wordmark: "h-9", gap: "gap-2" },
};

export default function Logo({
  className = "",
  showWordmark = true,
  size = "md",
}: Props) {
  const s = scales[size];

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <Image
        src="/svg/ck-icon.svg"
        alt={showWordmark ? "" : "CK Works"}
        width={438}
        height={447}
        priority
        className={`${s.icon} w-auto`}
      />

      {showWordmark && (
        <>
          {/* light mode wordmark */}
          <Image
            src="/svg/ck-lightwordmark.svg"
            alt="CK Works"
            width={898}
            height={278}
            priority
            className={`${s.wordmark} w-auto dark:hidden`}
          />
          {/* dark mode wordmark */}
          <Image
            src="/svg/ck-dark-wordmark.svg"
            alt="CK Works"
            width={512}
            height={145}
            priority
            className={`hidden ${s.wordmark} w-auto dark:block`}
          />
        </>
      )}
    </span>
  );
}
