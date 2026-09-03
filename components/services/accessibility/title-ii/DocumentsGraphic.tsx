/**
 * Illustrative agenda, minutes, and meeting recording. The three sit on top of
 * one another because they are the same public record in three formats, and a
 * resident has to be able to reach all of them. Decorative; the label carries
 * the meaning.
 *
 * Both sheets carry deliberate empty space at the foot, so they read as paper
 * rather than as boxes sized to their text, and so the recording has something
 * to cover when it sits across them.
 *
 * Every dimension is in `cqw`, a percentage of the graphic's own width. This is
 * the only one of the four graphics that is a fixed composition rather than a
 * flow, and at fixed type sizes it came apart as the column narrowed: the list
 * wrapped taller while the recording stayed pinned to the foot, so at 1024 the
 * player sat across the agenda's text instead of its margin. In container units
 * the whole arrangement scales and the overlap always lands where it should.
 *
 * The container lives one level out because an element cannot query its own
 * container. 1cqw is 2.65px at the design width of 265.
 */
import Image from "next/image";
import { Captions, Maximize2, Play, Volume2 } from "lucide-react";

const agendaItems = [
  "Call to Order",
  "Pledge of Allegiance",
  "Roll Call",
  "Public Comments",
  "Consent Agenda",
] as const;

const minutesLines = [
  "94%", "82%", "88%", "70%", "91%", "76%", "85%", "62%", "89%", "73%",
] as const;

export default function DocumentsGraphic() {
  return (
    <div className="w-full [container-type:inline-size]" aria-hidden>
      <div className="relative h-[107cqw] w-full">
        {/* Minutes: runs nearly the full height so the recording hides its foot */}
        <div className="absolute right-0 top-[16cqw] h-[74cqw] w-[43%] rotate-[2.5deg] overflow-hidden rounded-[2.1cqw] border border-line bg-card px-[4.5cqw] pt-[4.5cqw] shadow-soft">
          <p className="text-[4.5cqw] font-semibold leading-tight tracking-[0.02em] text-ink">
            MINUTES
          </p>
          <div className="mt-[4.5cqw] space-y-[2.6cqw]">
            {minutesLines.map((width, index) => (
              <span
                key={`${width}-${index}`}
                className="block h-[1.1cqw] rounded-full bg-line"
                style={{ width }}
              />
            ))}
          </div>
        </div>

        {/* Agenda: the front sheet. Ruled rows, a letterhead bar, and a
            header rule, so it reads as a document rather than a white card. */}
        <div className="absolute left-0 top-0 w-[64%] overflow-hidden rounded-[2.1cqw] border border-line bg-card shadow-lift">
          <span className="block h-[0.7cqw] w-full bg-forest/75" />

          <div className="px-[5.3cqw] pb-[24cqw] pt-[2.4cqw]">
            <p className="text-[4.4cqw] font-semibold leading-tight tracking-[0.02em] text-ink">
              COUNCIL AGENDA
            </p>
            <p className="mt-[1.2cqw] text-[3.3cqw] font-semibold leading-snug text-ink/85">
              May 20, 2025 &middot; 7:00 PM
            </p>
            <p className="text-[3.3cqw] font-medium leading-snug text-muted">
              Council Chambers
            </p>

            <ol className="mt-[1.5cqw] divide-y divide-line/80 border-y border-line/80">
              {agendaItems.map((item, index) => (
                <li key={item} className="flex gap-[1.7cqw] py-[0.6cqw]">
                  <span className="text-[3cqw] font-medium leading-snug text-muted">
                    {index + 1}.
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[3cqw] font-medium leading-snug text-ink/90">
                      {item}
                    </span>
                    {item === "Public Comments" && (
                      <span className="mt-[0.6cqw] block text-[2.7cqw] font-medium leading-[1.3] text-muted">
                        Members of the public may address the Council.
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Meeting recording, centred across both sheets.
            The player is its own query container, so widening it scales the
            chrome, the thumbnail, and the type together rather than stretching
            a box around unchanged text. 1cqw here is 2.2px at the design width. */}
        <div className="absolute bottom-0 left-1/2 w-[72%] -translate-x-1/2 [container-type:inline-size]">
          <div className="overflow-hidden rounded-[3.8cqw] border border-line bg-card shadow-lift">
            <p className="border-b border-line px-[6cqw] py-[2.3cqw] text-[4.5cqw] font-medium leading-snug text-ink/85">
              May 20, 2025 Regular Meeting
            </p>
            <div className="relative h-[44cqw]">
              <Image
                src="/images/services/svg/video-city-meeting.svg"
                alt=""
                fill
                sizes="340px"
                className="object-cover"
              />
            </div>
            <div className="px-[6cqw] pb-[3.6cqw] pt-[3.6cqw]">
              <span className="relative block h-[1.7cqw] rounded-full bg-line">
                <span className="absolute inset-y-0 left-0 w-[6%] rounded-full bg-forest" />
                <span className="absolute -top-[1.25cqw] left-[6%] size-[4.1cqw] -translate-x-1/2 rounded-full bg-forest" />
              </span>
              <span className="mt-[3.6cqw] flex items-center gap-[3.6cqw]">
                <Play className="size-[5.3cqw] fill-ink text-ink" />
                <span className="text-[4.2cqw] font-medium leading-none tabular-nums text-muted">
                  2:24 / 1:24:56
                </span>
                <span className="ml-auto flex items-center gap-[3.6cqw] text-muted">
                  <Captions className="size-[5.3cqw]" />
                  <Volume2 className="size-[5.3cqw]" />
                  <Maximize2 className="size-[5.3cqw]" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
