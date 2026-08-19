import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import Button from "@/components/ui/Button";

/**
 * Owns the site's recovery page. The right-side route illustration frames a
 * single centered 404, while the copy gives visitors a clear way back.
 */

const errorBoard = {
  mapInset: "-7%",
  codeLeft: "50%",
  codeTop: "40%",
  codeSize: "clamp(9rem, 24vw, 18rem)",
} as const;

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="bg-ivory py-12 sm:py-14 lg:py-16">
        <div className="container-ck">
          <div className="grid items-center gap-12 lg:min-h-[34rem] lg:grid-cols-[minmax(18rem,0.76fr)_minmax(0,1.24fr)] lg:gap-10">
            <div className="max-w-xl">
              <p className="ck-rise text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                404 Error
              </p>
              <h1
                className="ck-rise mt-5 font-serif text-[2.6rem] font-medium leading-[1.04] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.5rem]"
                style={{ animationDelay: "80ms" }}
              >
                Looks like you took a wrong turn.
              </h1>
              <p
                className="ck-rise mt-5 max-w-md text-base leading-8 text-muted sm:text-[1.05rem]"
                style={{ animationDelay: "170ms" }}
              >
                The page you&apos;re looking for isn&apos;t on this route. Let&apos;s make a
                quick U-turn and get you back somewhere useful.
              </p>
              <div
                className="ck-rise mt-8 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "250ms" }}
              >
                <Button href="/">
                  Take me home <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/work" variant="secondary">
                  See work <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ErrorBoard />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ErrorBoard() {
  return (
    <div
      role="img"
      aria-label="Illustration of a route map prompting a U-turn around a page not found message."
      className="ck-lift relative mx-auto aspect-[1.18/1] w-full max-w-[43rem]"
    >
      <div
        className="pointer-events-none absolute"
        style={{ inset: errorBoard.mapInset }}
      >
        <Image
          src="/images/404/404-ring.svg"
          alt=""
          fill
          sizes="(min-width: 1024px) 43rem, 100vw"
          className="object-contain"
        />
      </div>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
        style={{
          left: errorBoard.codeLeft,
          top: errorBoard.codeTop,
        }}
      >
        <p
          className="font-serif font-medium leading-none tracking-[-0.07em] text-forest"
          style={{ fontSize: errorBoard.codeSize }}
        >
          404
        </p>
        <p className="mt-2 text-sm font-medium text-ink/70 sm:text-base">
          Looks like you&apos;re a little lost.
        </p>
      </div>
    </div>
  );
}
