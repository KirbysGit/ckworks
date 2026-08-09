import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import WhatsAppContactLink from "@/components/contact/WhatsAppContactLink";

export default function ContactCTA({
  title = "Ready to talk through the next step?",
  description = "Send a note with what you are working on, and I will help you figure out what makes sense next.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-t border-line/70 bg-ivory py-14 lg:py-20">
      <div className="container-ck">
        <div className="rounded-[2rem] border border-line bg-card px-6 py-8 text-center shadow-soft sm:px-10 lg:px-12 lg:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
            Start Here
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted">
            {description}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact">
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
            <WhatsAppContactLink
              location="contact_cta"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-forest/50 bg-transparent px-6 py-3 text-sm font-medium text-forest transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-soft/40 hover:shadow-soft"
            >
              WhatsApp
            </WhatsAppContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
