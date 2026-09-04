/**
 * The four surfaces a Title II review has to account for, as one row.
 *
 * Together they cover the treatment the plan calls for on this page: web
 * content, documents, public workflows, mobile apps, and vendor-managed
 * content. Apps and vendor systems share a column on purpose, because from a
 * resident's side they are the same problem: a service the entity is
 * responsible for but usually did not build.
 *
 * The columns are even and every graphic fills its own, so each one shares the
 * exact content box of the label beneath it. The graphics still differ in
 * height, and they hang from a shared baseline rather than a shared top.
 *
 * Each graphic is decorative. The numbered label and description carry the
 * meaning, so nothing here depends on the illustration being understood.
 */
import type { CSSProperties } from "react";
import Reveal from "@/components/ui/Reveal";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
  serviceContainer,
} from "@/components/services/shared/styles";
import AppsVendorGraphic from "./AppsVendorGraphic";
import DocumentsGraphic from "./DocumentsGraphic";
import FormsGraphic from "./FormsGraphic";
import WebContentGraphic from "./WebContentGraphic";

const surfaces = [
  {
    number: "01",
    title: "Websites & web content",
    body: ["Pages, templates, navigation,", "and published information."],
    Graphic: WebContentGraphic,
  },
  {
    number: "02",
    title: "Forms & public workflows",
    body: ["Applications, payments,", "registrations, and requests."],
    Graphic: FormsGraphic,
  },
  {
    number: "03",
    title: "Documents & media",
    body: ["Agendas, minutes, policies,", "notices, video, and audio."],
    Graphic: DocumentsGraphic,
  },
  {
    number: "04",
    title: "Apps & vendor systems",
    body: ["Mobile applications, portals,", "booking tools, and third-party platforms."],
    Graphic: AppsVendorGraphic,
  },
] as const;

/**
 * Explicit placement, one entry per surface, because Tailwind has to see the
 * class names literally. The graphics take row 1 and the labels row 2 of the
 * same grid, which is what lets the dividers stop at the label row while the
 * graphics run as one uninterrupted band.
 */
const graphicCell = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-4 lg:row-start-1",
] as const;

const labelCell = [
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-4 lg:row-start-2",
] as const;

export default function CoveredSurfaces() {
  return (
    <section
      id="covered-surfaces"
      className="scroll-mt-24 border-b border-line bg-ivory py-16 sm:py-20 lg:py-24"
    >
      <div className={serviceContainer}>
        {/* Same centred label and title scale as every other service section
            (Analytics, Search, Support, and the parent Accessibility page), so
            this one does not sit at its own size. */}
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className={serviceCenterLabelClassName}>What the rule reaches</p>
          <h2 className={serviceCenterTitleClassName}>
            Four surfaces, one obligation.
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-8 grid w-full max-w-[76rem] gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:grid-rows-[auto_auto] lg:gap-x-0 lg:gap-y-7">
          {surfaces.map(
            ({ number, title, body, Graphic }, index) => {
            // The band and the labels take the same edge padding, so every
            // graphic sits on exactly the content box of the label beneath it
            // and the row lines up with the dividers rather than floating
            // across them.
            const edge = `${index > 0 ? "lg:pl-6" : ""} ${
              index < surfaces.length - 1 ? "lg:pr-6" : ""
            }`;

            return (
            // `lg:contents` dissolves the card at desktop so its graphic and
            // its label become grid items in their own rows. Below lg the
            // article stays a normal stacked card.
            <article
              key={number}
              className="mx-auto flex w-full max-w-[20rem] min-w-0 flex-col sm:mx-0 sm:max-w-none lg:contents"
            >
              {/* Row one: an uninterrupted band. No dividers and no column
                  padding here, so each graphic is free to take the width it
                  wants and lean into its neighbour. Bottom-aligned on a shared
                  baseline so four different natural heights still hand off to
                  one row of labels. */}
              <div
                className={`ck-step flex min-w-0 items-end lg:h-full ${graphicCell[index]} ${edge}`}
                style={
                  { "--ck-anim-delay": `${index * 110}ms` } as CSSProperties
                }
              >
                <div className="w-full">
                  <Graphic />
                </div>
              </div>

              {/* Row two: the labels, and the only place the dividers run.
                  Title size is fluid from lg up, and the titles are held on
                  one line only from xl, where there is room for it. Below that
                  the longest of them is allowed to wrap and the row reserves
                  two lines, so the four descriptions stay level either way
                  rather than the title being shaved down to fit. Bolder text
                  is also wider, so raising the weight moves these numbers. */}
              <div
                className={`ck-step flex min-w-0 flex-col ${labelCell[index]} ${edge} ${
                  index > 0 ? "lg:border-l lg:border-line" : ""
                }`}
                style={
                  { "--ck-anim-delay": `${140 + index * 110}ms` } as CSSProperties
                }
              >
              <div className="mt-7 flex items-baseline gap-3 lg:mt-0 lg:max-xl:min-h-[2.6rem]">
                <span className="text-[1.2rem] font-bold leading-none text-forest lg:text-[clamp(0.95rem,1.4vw,1.2rem)]">
                  {number}
                </span>
                <h3 className="font-serif text-[1.36rem] font-bold leading-tight tracking-[-0.015em] text-ink lg:text-[clamp(0.95rem,1.55vw,1.36rem)] xl:whitespace-nowrap">
                  {title}
                </h3>
              </div>

              <p className="mt-4 border-t border-line pt-4 text-[0.95rem] font-medium leading-[1.85] text-ink/80">
                {body[0]}
                <br />
                {body[1]}
              </p>
              </div>
            </article>
            );
            },
          )}
        </Reveal>
      </div>
    </section>
  );
}
