import { ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="bg-ivory py-20 lg:py-28">
        <div className="container-ck text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            Not Found
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
            This page is not in the CK Works notebook yet.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
            The page may have moved, or the link may be pointing to something
            that has not been built yet.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/">
              Return home <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/services" variant="secondary">
              Services
            </Button>
            <Button href="/work" variant="secondary">
              Work
            </Button>
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
