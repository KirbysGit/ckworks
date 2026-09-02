/**
 * The four surfaces a Title II review has to account for, as one row.
 *
 * Together they cover the treatment the plan calls for on this page: web
 * content, documents, public workflows, mobile apps, and vendor-managed
 * content. Apps and vendor systems share a column on purpose, because from a
 * resident's side they are the same problem: a service the entity is
 * responsible for but usually did not build.
 *
 * The columns are deliberately uneven. Only the apps column needs real width,
 * so the forms column is kept narrow and the documents group bleeds left across
 * the divider into the slack that creates. Bleed only ever runs leftward: a
 * graphic overflowing right would be painted over by the next column's border,
 * since later siblings paint on top.
 *
 * Each graphic is decorative. The numbered label and description carry the
 * meaning, so nothing here depends on the illustration being understood.
 */
import { serviceContainer } from "@/components/services/shared/styles";
import AppsVendorGraphic from "./AppsVendorGraphic";
import DocumentsGraphic from "./DocumentsGraphic";
import FormsGraphic from "./FormsGraphic";
import WebContentGraphic from "./WebContentGraphic";

const surfaces = [
  {
    number: "01",
    title: "Websites",
    body: ["Pages, templates, navigation,", "and published information."],
    Graphic: WebContentGraphic,
    // Flush to the container edge on the left, and leaning into the forms
    // column on the right. There is room for it because the card beside it is
    // narrow and centred.
    graphicClass: "w-full lg:w-[110%] lg:shrink-0",
    cellClass: "",
  },
  {
    number: "02",
    title: "Forms & public workflows",
    body: ["Applications, payments,", "registrations, and requests."],
    Graphic: FormsGraphic,
    // The narrowness belongs to the graphic, not the column: the column still
    // has to hold the longest title in the row on a single line.
    graphicClass: "mx-auto w-full lg:max-w-[16.25rem]",
    // The band's gutters are percentages, not pixels: fixed padding held its
    // width while the columns shrank, and at 1024 the four graphics met edge to
    // edge with no divider left to separate them.
    cellClass: "lg:pl-[15%] lg:pr-[3%]",
  },
  {
    number: "03",
    title: "Documents & media",
    body: ["Agendas, minutes, policies,", "notices, video, and audio."],
    Graphic: DocumentsGraphic,
    // Capped narrower than its cell. This group is one scaled composition, so
    // its height is a fixed ratio of its width, and trimming the width is the
    // only lever that brings its top down level with the cards beside it.
    graphicClass: "mx-auto w-full lg:max-w-[14.7rem]",
    cellClass: "lg:pl-[3%] lg:pr-[8%]",
  },
  {
    number: "04",
    title: "Apps & vendor systems",
    body: ["Mobile applications, portals,", "booking tools, and third-party platforms."],
    Graphic: AppsVendorGraphic,
    graphicClass: "w-full",
    cellClass: "",
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
        <div className="mx-auto max-w-[44rem] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
            What the rule reaches
          </p>
          <h2 className="mt-5 font-serif text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[2.9rem]">
            Four surfaces, one obligation.
          </h2>
          <p className="mt-5 text-sm leading-7 text-ink/78 sm:text-base">
            Websites, documents, applications, and outside systems can all shape
            whether someone can use a public service.
          </p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[0.95fr_1.15fr_1fr_1.2fr] lg:grid-rows-[auto_auto] lg:gap-x-0 lg:gap-y-7">
          {surfaces.map(
            ({ number, title, body, Graphic, graphicClass, cellClass }, index) => (
            // `lg:contents` dissolves the card at desktop so its graphic and
            // its label become grid items in their own rows. Below lg the
            // article stays a normal stacked card.
            <article key={number} className="flex min-w-0 flex-col lg:contents">
              {/* Row one: an uninterrupted band. No dividers and no column
                  padding here, so each graphic is free to take the width it
                  wants and lean into its neighbour. Bottom-aligned on a shared
                  baseline so four different natural heights still hand off to
                  one row of labels. */}
              <div
                className={`flex min-w-0 items-end lg:h-full ${graphicCell[index]} ${cellClass}`}
              >
                <div className={graphicClass}>
                  <Graphic />
                </div>
              </div>

              {/* Row two: the labels, and the only place the dividers run.
                  Title size is fluid from lg up: the titles are held on one
                  line so the four descriptions stay level, and at a fixed size
                  the longest of them overflows its column between 1024 and
                  roughly 1200. */}
              <div
                className={`flex min-w-0 flex-col ${labelCell[index]} ${
                  index > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""
                } ${index < surfaces.length - 1 ? "lg:pr-6" : ""}`}
              >
              <div className="mt-7 flex items-baseline gap-3 lg:mt-0">
                <span className="font-serif text-[1.3rem] font-semibold leading-none text-forest lg:text-[clamp(1rem,1.5vw,1.3rem)]">
                  {number}
                </span>
                <h3 className="whitespace-nowrap font-serif text-[1.36rem] font-medium leading-tight tracking-[-0.015em] text-ink max-lg:whitespace-normal lg:text-[clamp(1.05rem,1.55vw,1.36rem)]">
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
            ),
          )}
        </div>
      </div>
    </section>
  );
}
