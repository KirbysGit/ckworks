import type { ReactNode } from "react";

/**
 * Laptop and phone shells.
 *
 * The bezel treatment is lifted from the Web Design hero
 * (`components/services/web-design/Page.tsx`) so the site keeps one device
 * language — `docs/design-system.md` asks for established mockups to be reused
 * rather than near-duplicated. Shell only: pass the screen as children.
 *
 * `size` swaps the radii, bezel thickness, and base proportions. "lg" carries
 * the hero's full chrome treatment; "sm" preserves its phone silhouette with
 * a quieter, card-scale shell that does not turn into a glossy capsule.
 * The Web Design hero can adopt these once its entrance choreography is
 * untangled — its `ck-lift` wrappers already sit outside the frame markup.
 */

type Size = "sm" | "lg";

const laptopSizing = {
  sm: {
    lid: "rounded-t-[1.1rem] p-[5px]",
    sheen: "inset-[2px] rounded-t-[0.95rem]",
    screen: "rounded-t-[0.75rem]",
    divider: "h-[7px]",
    base: "h-[16px]",
    baseRadius: "rounded-b-[1rem]",
    lip: "h-[9px]",
    notch: "h-[6px] w-[24%] rounded-b-[0.6rem]",
    foot: "h-[4px] w-7",
  },
  lg: {
    lid: "rounded-t-[1.55rem] p-[7px]",
    sheen: "inset-[2px] rounded-t-[1.35rem]",
    screen: "rounded-t-[1.05rem]",
    divider: "h-[9px]",
    base: "h-[22px]",
    baseRadius: "rounded-b-[1.45rem]",
    lip: "h-[13px]",
    notch: "h-[9px] w-[27%] rounded-b-[0.85rem]",
    foot: "h-[5px] w-10",
  },
} as const;

export function LaptopFrame({
  children,
  size = "sm",
  className = "",
}: {
  children: ReactNode;
  size?: Size;
  className?: string;
}) {
  const s = laptopSizing[size];

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative aspect-[16/10] rounded-b-none bg-[linear-gradient(145deg,#050605_0%,#111511_43%,#252B26_52%,#121712_66%,#080A08_100%)] shadow-[0_28px_58px_-28px_rgba(17,23,20,0.82),0_8px_18px_-10px_rgba(17,23,20,0.5)] ${s.lid}`}
      >
        <span
          className={`pointer-events-none absolute rounded-b-none bg-[linear-gradient(165deg,rgba(255,255,255,0.045),transparent_30%,rgba(0,0,0,0.34)_78%)] opacity-45 ${s.sheen}`}
          aria-hidden
        />
        {/* Query container so screen content can scale from the lid width. */}
        <div
          className={`relative h-full overflow-hidden rounded-b-none border border-black/25 bg-card shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] [container-type:inline-size] ${s.screen}`}
        >
          {children}
        </div>
      </div>

      {/* Hinge */}
      <div
        className={`relative z-10 -mt-px bg-[linear-gradient(180deg,#353C35_0%,#1D241E_42%,#111511_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_4px_8px_-8px_rgba(0,0,0,0.9)] ${s.divider}`}
        aria-hidden
      >
        <span className="absolute inset-x-[1px] top-px h-px bg-white/10" />
      </div>

      {/* Base, wider than the lid so the machine sits on a footprint */}
      <div
        className={`relative z-20 mx-[-7%] -mt-[3px] shadow-[0_18px_32px_-23px_rgba(17,23,20,0.72)] ${s.base}`}
        aria-hidden
      >
        <span
          className={`absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,#6B766C_0%,#4A554B_46%,#172018_100%)] shadow-[inset_0_2px_3px_rgba(255,255,255,0.08),inset_0_-4px_7px_rgba(0,0,0,0.36)] ${s.baseRadius}`}
        />
        <span
          className={`absolute inset-x-[2.75%] top-0 bg-[linear-gradient(180deg,#A4A99F_0%,#899185_48%,rgba(102,114,104,0)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] [mask-image:linear-gradient(90deg,transparent_0%,black_9%,black_91%,transparent_100%)] ${s.lip}`}
        />
        <span className="absolute inset-x-[4%] top-[1px] h-px rounded-full bg-white/28" />
        <span
          className={`absolute left-1/2 top-0 -translate-x-1/2 bg-[linear-gradient(180deg,#5B625A_0%,#888A80_56%,#B4B2A8_100%)] shadow-[inset_0_-1px_2px_rgba(255,255,255,0.36),inset_0_2px_3px_rgba(0,0,0,0.22),0_6px_12px_-10px_rgba(0,0,0,0.78)] ${s.notch}`}
        />
        <span
          className={`absolute -bottom-[3px] left-[11%] rounded-b-md bg-[linear-gradient(180deg,#2A2F29,#070807)] shadow-[0_3px_8px_-4px_rgba(0,0,0,0.9)] ${s.foot}`}
        />
        <span
          className={`absolute -bottom-[3px] right-[11%] rounded-b-md bg-[linear-gradient(180deg,#2A2F29,#070807)] shadow-[0_3px_8px_-4px_rgba(0,0,0,0.9)] ${s.foot}`}
        />
      </div>
    </div>
  );
}

/**
 * "sm" is sized in container units so a phone dropped into a narrow column
 * stays a phone — radii, bezel, and notch all track the device width instead
 * of holding fixed pixels and swamping the screen. "lg" keeps the hero's
 * original pixel values, where the width is known and generous.
 */
const phoneSizing = {
  sm: {
    // At this scale, the hero's broad metallic sweep overwhelms the screen.
    // Keep the same dark, layered device language, but reduce it to a thin
    // graphite rim and one subtle light catch near the top edge.
    shell:
      "border border-black/85 bg-[#080A08] shadow-[0_15px_26px_-15px_rgba(17,23,20,0.78),0_5px_10px_-8px_rgba(17,23,20,0.52)]",
    sheen:
      "inset-[0.75cqw] rounded-[16.25cqw] bg-[radial-gradient(circle_at_24%_7%,rgba(255,255,255,0.22),transparent_17%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_16%,rgba(0,0,0,0.2)_100%)] opacity-75",
    button: "top-[28%] h-[13%] w-[1.5cqw]",
    inner:
      "rounded-[15.5cqw] p-[1.45cqw]",
    innerSurface:
      "bg-[#030403] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.13),inset_-1px_-2px_3px_rgba(0,0,0,0.8)]",
    outer: "rounded-[17cqw] p-[1.15cqw]",
    screen: "rounded-[13.5cqw]",
    notch: "h-[9.5cqw] w-[32cqw]",
    notchRadius: "rounded-b-[4cqw]",
    speaker: "top-[3.6cqw] h-[1cqw] w-[11.5cqw]",
    notchOffset: "top-0",
    detailedNotch: false,
  },
  lg: {
    shell:
      "bg-[linear-gradient(145deg,#050605_0%,#181B18_30%,#6F746C_43%,#FFF9EA_49%,#3C423B_56%,#060706_74%,#161A16_100%)] shadow-[0_18px_38px_-18px_rgba(17,23,20,0.7),0_6px_14px_-8px_rgba(17,23,20,0.58)]",
    sheen:
      "inset-[1px] rounded-[2.2rem] bg-[radial-gradient(circle_at_30%_7%,rgba(255,255,255,0.38),transparent_24%),linear-gradient(160deg,rgba(255,255,255,0.16),transparent_35%,rgba(0,0,0,0.42)_74%)] opacity-70",
    innerSurface:
      "bg-[linear-gradient(145deg,#030403_0%,#0C0F0C_46%,#252B25_58%,#050605_100%)] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.16),inset_-2px_-2px_4px_rgba(0,0,0,0.82)]",
    outer: "rounded-[2.3rem] p-[2px]",
    button: "top-24 h-11 w-[3px]",
    inner: "rounded-[2.15rem] p-[4px]",
    screen: "rounded-[1.75rem]",
    notch: "h-[14px] w-[62px]",
    notchRadius: "rounded-b-[8px]",
    notchOffset: "top-[2px]",
    speaker: "top-[9px] h-[2px] w-[22px]",
    detailedNotch: true,
  },
} as const;

export function PhoneFrame({
  children,
  size = "sm",
  className = "",
}: {
  children: ReactNode;
  size?: Size;
  className?: string;
}) {
  const s = phoneSizing[size];

  return (
    // The outer shell is the query container, so every part of the phone —
    // bezel, radii, notch, and the screen content — scales from one width.
    <div
      className={`relative [container-type:inline-size] ${s.shell} ${s.outer} ${className}`}
    >
      <span
        className={`pointer-events-none absolute ${s.sheen}`}
        aria-hidden
      />
      <span
        className={`absolute -right-[2px] rounded-r-full bg-[linear-gradient(180deg,#313630,#090A09)] ${s.button}`}
        aria-hidden
      />

      <div
        className={`relative ${s.innerSurface} ${s.inner}`}
      >
        <div
          className={`relative overflow-hidden bg-card shadow-[inset_0_0_0_1px_rgba(31,36,32,0.05)] ${s.screen}`}
        >
          {children}
        </div>

        {/* Island lives on the inner bezel, not the screen, so the ivory
            screen edge and inner highlight cannot show above it. */}
        <div
          className={`pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 ${s.notchOffset} ${s.notch}`}
          aria-hidden
        >
          <div
            className={`relative h-full w-full bg-[#050605] ${s.notchRadius} ${
              s.detailedNotch ? "shadow-[0_1px_0_rgba(5,6,5,0.95)]" : ""
            }`}
          >
            {s.detailedNotch && (
              <>
                <span className="absolute -left-[8px] top-0 h-2 w-2 rounded-br-lg shadow-[8px_0_0_0_#050605]" />
                <span className="absolute -right-[8px] top-0 h-2 w-2 rounded-bl-lg shadow-[-8px_0_0_0_#050605]" />
              </>
            )}
            <span
              className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-white/16 ${s.speaker}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Status chrome used inside phone screens. Matches the Web Design hero. */
function CellularSignal() {
  return (
    <span className="flex h-[6px] items-end gap-[0.75px]" aria-hidden>
      {[2.5, 3.5, 4.5, 5.5].map((height) => (
        <span
          key={height}
          className="w-px rounded-full bg-ink"
          style={{ height }}
        />
      ))}
    </span>
  );
}

function WifiSignal() {
  return (
    <svg viewBox="0 0 10 8" className="h-[7px] w-[9px] text-ink" aria-hidden>
      <path
        d="M1.3 2.5C3.4.8 6.6.8 8.7 2.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.1"
      />
      <path
        d="M2.9 4.2C4.1 3.3 5.9 3.3 7.1 4.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.1"
      />
      <path
        d="M4.5 6C4.8 5.8 5.2 5.8 5.5 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <span className="relative inline-flex h-[3.5px] w-[8px] shrink-0" aria-hidden>
      <span className="absolute inset-0 rounded-[1px] border border-ink/80" />
      <span className="absolute bottom-[1px] right-[-1.5px] top-[1px] w-px rounded-r bg-ink/70" />
      <span className="absolute bottom-[1px] left-[1px] top-[1px] w-[4.75px] rounded-[0.5px] bg-ink" />
    </span>
  );
}

export function PhoneStatusBar() {
  return (
    <div className="relative z-20 flex h-[18px] items-start justify-between px-[15px] pt-[5px]">
      <span className="pl-1.5 text-[6px] font-semibold leading-none text-ink">
        9:41
      </span>
      <span className="flex shrink-0 items-center justify-end gap-[2px]">
        <CellularSignal />
        <WifiSignal />
        <BatteryIcon />
      </span>
    </div>
  );
}
