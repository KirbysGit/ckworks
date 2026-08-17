import { ArrowRight } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import Button from "@/components/ui/Button";

/**
 * 404 as a misfiled page.
 *
 * The folder construction is lifted from the `/work` hero cards rather than
 * invented: a tab with `border-x border-t` and `-mb-px` so its fill covers the
 * body's top border, over a `rounded-[0.35rem] border-line bg-card` body. That
 * language already exists in the design system, so the joke reads as a CK Works
 * artefact instead of an illustration pasted onto the site.
 *
 * Deliberately restrained: no new tokens, no new keyframe, no new dependency.
 * The entrance is the shared `ck-lift`, which is already covered by the
 * reduced-motion block in `globals.css`.
 *
 * The card carries its own tilt, so `ck-lift` sits on a wrapper — a primitive
 * ends at `transform: none` and would otherwise flatten it.
 */

const stackedFolders = [
  // Tab insets step left as the folders come forward, so all three read.
  { label: "Services", tabInset: "ml-16", overlap: "" },
  { label: "About", tabInset: "ml-9", overlap: "-mt-6" },
  { label: "Work", tabInset: "ml-2", overlap: "-mt-6" },
] as const;

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="bg-ivory py-12 sm:py-14 lg:py-16">
        <div className="container-ck">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="ck-rise text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                404 Error
              </p>
              <h1
                className="ck-rise mt-5 max-w-xl font-serif text-[2.6rem] font-medium leading-[1.04] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.5rem]"
                style={{ animationDelay: "80ms" }}
              >
                This page seems to be out of place.
              </h1>
              <p
                className="ck-rise mt-5 max-w-md text-base leading-8 text-muted sm:text-[1.05rem]"
                style={{ animationDelay: "170ms" }}
              >
                It may have moved, been removed, or never landed where it was
                supposed to. Let&apos;s get you back to something useful.
              </p>
              <div
                className="ck-rise mt-8 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "250ms" }}
              >
                <Button href="/">
                  Back home <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/work" variant="secondary">
                  See work <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <MisfiledGraphic />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/**
 * One `role="img"` wrapper, so the folder labels read as a single description
 * to assistive tech rather than a list of fake navigation.
 */
function MisfiledGraphic() {
  return (
    <div
      role="img"
      aria-label="Illustration of a page filed in the wrong folder."
      className="mx-auto w-full max-w-[24rem] lg:mx-0 lg:ml-auto lg:max-w-[26rem]"
    >
      {/* Folder stack. The last one is hidden on phones so the graphic is
          recomposed rather than shrunk. */}
      <div>
        {stackedFolders.map(({ label, tabInset, overlap }, index) => (
          <div
            key={label}
            className={`relative flex flex-col ${overlap} ${
              index === 0 ? "hidden sm:flex" : ""
            }`}
          >
            <span
              className={`relative z-10 -mb-px inline-flex self-start rounded-t-[0.3rem] border-x border-t border-line bg-card px-3 pb-1.5 pt-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-ink/60 ${tabInset}`}
            >
              {label}
            </span>
            <div className="h-11 rounded-[0.35rem] border border-line bg-card" />
          </div>
        ))}
      </div>

      {/* The slot the page should have gone in, and the card that missed it. */}
      <div className="relative mt-7">
        <div className="flex h-[8.5rem] items-end justify-center rounded-[0.35rem] border border-dashed border-forest/30 bg-forest-soft/15 pb-3">
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-forest/55">
            Page should be here
          </span>
        </div>

        {/* ck-lift on the wrapper; the tilt lives on the card inside it. */}
        <div className="ck-lift absolute inset-x-4 -top-8 sm:inset-x-8">
          <div className="rotate-[-0.7deg] rounded-[0.35rem] border border-line bg-card px-5 py-5 shadow-soft sm:px-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft text-[0.6rem] font-bold text-forest">
                ?
              </span>
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-ink/60">
                Misfiled page
              </span>
            </div>

            <p className="mt-4 font-serif text-[2.75rem] font-medium leading-none text-forest sm:text-5xl">
              404
            </p>

            <p className="mt-3 text-[0.58rem] font-semibold uppercase leading-5 tracking-[0.16em] text-muted">
              The page you&apos;re looking for
            </p>
          </div>
        </div>
      </div>

      {/* Base. A graphic anchor, not a drawer. */}
      <div className="mt-7 flex items-center justify-center rounded-[0.35rem] bg-forest py-2.5">
        <span className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-ivory/85">
          CK Works
        </span>
      </div>
    </div>
  );
}
