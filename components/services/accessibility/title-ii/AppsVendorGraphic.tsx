/**
 * Illustrative resident app overlapping a vendor-run portal.
 *
 * The overlap is the point: the bill in the phone and the balance in the portal
 * are the same $156.80, because a resident meets one obligation through two
 * systems and only one of them is usually built in house. The phone reuses the
 * shared `PhoneFrame`, so the site keeps one device language rather than
 * growing a second phone silhouette here.
 *
 * Decorative. The surface label beside it carries the meaning, so it holds no
 * text an assistive technology needs.
 */
import { ChevronDown, ChevronRight, LayoutGrid, UserRound } from "lucide-react";
import { PhoneMockup, PhoneStatusBar } from "@/components/ui/DeviceFrame";

const phoneRows = ["Usage", "Billing history", "Notifications"] as const;

const portalNav = [
  "My services",
  "Building permits",
  "Code enforcement",
  "Facility reservations",
  "My notifications",
  "Account settings",
] as const;

export default function AppsVendorGraphic() {
  return (
    <div className="flex w-full items-end" aria-hidden>

      {/* Portal: the vendor-run system behind the same obligation. The taller
          of the two frames, so the phone reads as something laid on top of it. */}
      <div className="min-w-0 flex-1 overflow-hidden rounded-[0.55rem] border border-line bg-card shadow-soft">
        <div className="flex items-center gap-1.5 border-b border-line bg-sand/45 px-2 py-2">
          <span className="flex gap-1">
            <span className="size-1.5 rounded-full bg-[#ee5c4d]" />
            <span className="size-1.5 rounded-full bg-[#f1bd42]" />
            <span className="size-1.5 rounded-full bg-[#58b64b]" />
          </span>
        </div>

        <div className="flex items-center gap-1.5 border-b border-line px-2 py-2.5">
          <LayoutGrid className="size-3 shrink-0 text-muted" />
          <span className="mx-auto text-center">
            <span className="block text-[0.55rem] font-semibold leading-tight text-ink">
              Greenridge Connect
            </span>
            <span className="block text-[0.46rem] leading-tight text-muted">
              Resident Portal
            </span>
          </span>
          <UserRound className="size-2.5 shrink-0 text-muted" />
          <ChevronDown className="size-2.5 shrink-0 text-muted" />
        </div>

        <div className="grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:grid-cols-[auto_minmax(0,1fr)]">
          {/* From xl the nav sizes to its own longest label and holds every
              item on one line. Below that it goes back to a share of the
              portal: the phone's width is fixed in pixels, so in a narrow
              column a content-sized nav would starve the panel beside it. */}
          <ul className="space-y-[10px] border-r border-line bg-sand/25 px-1.5 py-3 xl:whitespace-nowrap">
            {portalNav.map((item, index) => (
              <li
                key={item}
                className={`text-[0.46rem] leading-[1.2] ${
                  index === 0
                    ? "-mx-1 rounded-[0.15rem] bg-forest/12 px-1 py-[3px] font-semibold text-forest"
                    : "text-muted"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Extra padding on the right: the phone laps over this edge, and without
              it the account card's button ran under the device. */}
          <div className="py-3 pl-2 pr-3">
            <p className="text-[0.58rem] font-semibold leading-tight text-ink">
              Welcome back, Alex
            </p>
            <p className="mt-1 text-[0.42rem] leading-[1.5] text-muted">
              Manage your account and city services in one place.
            </p>

            <div className="mt-2.5 rounded-[0.3rem] border border-line bg-sand/35 p-2">
              <p className="text-[0.44rem] font-semibold text-ink">
                Account overview
              </p>
              <p className="mt-1 text-[0.4rem] text-muted">Balance due</p>
              <p className="text-[0.78rem] font-semibold leading-none text-ink">
                $156.80
              </p>
              <span className="mt-1.5 block rounded-[0.2rem] bg-forest py-[4px] text-center text-[0.42rem] font-semibold text-ivory">
                View &amp; pay
              </span>
            </div>

            <span className="mt-2.5 flex items-center justify-between text-[0.46rem] font-medium text-ink/80">
              Recent activity
              <ChevronRight className="size-2 text-muted" />
            </span>
            <span className="mt-1.5 block divide-y divide-line border-t border-line">
              {["Payment posted", "Permit BR-2025-0718"].map((row) => (
                <span key={row} className="block py-[5px] text-[0.42rem] text-muted">
                  {row}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Phone: the resident-facing app, laid over the right edge of the
          portal it duplicates. It is second in the row, so it paints above the
          portal without needing a stacking rule of its own, and it centres
          against the portal's height rather than sitting on the row's floor.
          Its shadow is tighter than the shared default: that one is sized for a
          full-scale device and, unscaled, spilled across the portal beside it.
          `PhoneMockup` is the Web Design hero device scaled down, so the shell
          gradient, island, side button, and status chrome are the hero's own,
          and the screen below is authored against its native 156px width. */}
      <PhoneMockup
        width={124}
        className="relative z-10 -ml-5 shrink-0 self-center"
        shadowClassName="shadow-[0_9px_18px_-12px_rgba(17,23,20,0.42),0_2px_6px_-5px_rgba(17,23,20,0.32)]"
      >
        <PhoneStatusBar />
        <div className="px-4 pb-2.5 pt-1.5">
          <p className="text-[13px] font-semibold leading-tight text-ink">
            Greenridge Utilities
          </p>

          <p className="mt-3 text-[10px] font-semibold leading-none text-ink">
            Pay bill
          </p>
          <p className="mt-1 text-[7px] leading-none text-muted">
            Account # 0123-4567-890
          </p>

          <p className="mt-3 text-[7px] leading-none text-muted">Amount due</p>
          <p className="mt-1 text-[20px] font-semibold leading-none text-ink">
            $156.80
          </p>
          <p className="mt-1.5 text-[7px] leading-none text-muted">
            Due May 31, 2025
          </p>

          <span className="mt-3 block rounded bg-forest py-2 text-center text-[8px] font-semibold text-ivory">
            Pay now
          </span>
          <span className="mt-1.5 block rounded border border-line py-2 text-center text-[8px] font-semibold text-ink">
            View bill
          </span>

          <div className="mt-3 divide-y divide-line border-t border-line">
            {phoneRows.map((row) => (
              <span
                key={row}
                className="flex items-center justify-between py-[7px] text-[8px] text-ink/80"
              >
                {row}
                <ChevronRight className="size-2.5 text-muted" />
              </span>
            ))}
          </div>
        </div>
      </PhoneMockup>
    </div>
  );
}
