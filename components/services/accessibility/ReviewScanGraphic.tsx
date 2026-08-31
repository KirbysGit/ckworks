/**
 * Illustrative review scanner for the "How the work happens" band.
 *
 * Rebuilt from an exported SVG so it draws with the site's own tokens, stays
 * crisp at any size, and can actually move. A furnished page mock, dressed the
 * same way as the other site previews on this site: shaded chrome, the three
 * window dots in the shared red/amber/green, and filled placeholder blocks
 * rather than outlines.
 *
 * Entirely decorative. The four stages beside it carry the meaning, so it holds
 * no text and is hidden from assistive technology. If it ever gains information
 * of its own, that information belongs in real text, not in here.
 *
 * The scanner is `ck-scan` in `globals.css`: the magnifier follows a smooth arc
 * down and across the page, then rests invisible for the back third of the
 * cycle. The
 * wrapper is sized to the whole graphic on purpose, because that is what makes
 * the path's percentage coordinates resolve against the graphic rather than
 * against the magnifier. It is listed in the prefers-reduced-motion block
 * there, where cancelling the animation leaves it hidden and the mock reads as
 * a still page.
 *
 * The wrapper clips: the scanner is `inset-0` and then translated up to 40% of
 * the graphic's width, so its box runs past the right edge and widens the page
 * even while it is at opacity 0. The magnifier's own travel tops out at 90%,
 * well inside the clip, so nothing visible is lost.
 */
import { CircleCheck, Search } from "lucide-react";

/** Ragged widths read as prose rather than as a placeholder block. */
const bodyLines = ["92%", "100%", "84%", "62%"] as const;

export default function AccessibilityReviewScanGraphic() {
  return (
    <div className="relative w-full overflow-hidden py-2" aria-hidden>
      <div className="overflow-hidden rounded-[0.6rem] border border-line bg-card shadow-soft">
        {/* Browser chrome, matching the other site previews. */}
        <div className="flex items-center gap-3 border-b border-line bg-sand/55 px-3.5 py-2.5">
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#D96859]" />
            <span className="size-2 rounded-full bg-[#DEA741]" />
            <span className="size-2 rounded-full bg-[#74A66D]" />
          </span>
          <span className="mx-auto h-4 w-[46%] rounded-full border border-line bg-card/80" />
        </div>

        {/* The site's own header. */}
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5">
          <span className="size-4 shrink-0 rounded-[0.2rem] bg-forest/85" />
          <span className="h-1.5 w-12 rounded-full bg-ink/75" />
          <span className="ml-auto flex items-center gap-2">
            {[0, 1, 2].map((item) => (
              <span key={item} className="h-1 w-7 rounded-full bg-line" />
            ))}
          </span>
        </div>

        <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-4 px-4 py-4">
          {/* Left: page content, already read. */}
          <div className="min-w-0">
            <span className="block h-14 rounded-[0.25rem] border border-line bg-sand" />
            <div className="mt-3 flex items-center gap-2">
              <span className="h-1.5 min-w-0 flex-1 rounded-full bg-ink" />
              <CircleCheck
                className="size-3.5 shrink-0 text-forest"
                strokeWidth={1.8}
              />
            </div>
            <div className="mt-2.5 space-y-2">
              {bodyLines.map((width, index) => (
                <span
                  key={index}
                  className="block h-1 rounded-full bg-line"
                  style={{ width }}
                />
              ))}
            </div>
          </div>

          {/* Right: a form, with one field showing a visible focus state. */}
          <div className="min-w-0 rounded-[0.3rem] border border-line bg-sand/45 p-3">
            <span className="block h-1.5 w-10 rounded-full bg-forest" />
            <span className="mt-2.5 block h-6 rounded-[0.2rem] border border-line bg-card" />
            <span className="mt-2 block h-6 rounded-[0.2rem] border-[1.5px] border-forest bg-card" />
            <span className="mt-2.5 block h-5 w-16 rounded-[0.2rem] bg-forest" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-line bg-sand/40 px-4 py-3">
          {[0, 1, 2].map((item) => (
            <span key={item} className="h-1 rounded-full bg-line" />
          ))}
        </div>
      </div>

      {/* The scanner sits outside the frame so it draws over everything. Both
          children hang off the wrapper's top-left corner and centre themselves,
          so the keyframe path moves the pair as one. */}
      <div className="ck-scan pointer-events-none absolute inset-0">
        <span className="absolute left-0 top-0 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/10 blur-lg" />
        <Search
          className="absolute left-0 top-0 size-11 -translate-x-1/2 -translate-y-1/2 text-forest"
          strokeWidth={1.3}
        />
      </div>
    </div>
  );
}
