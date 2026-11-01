import { site, maps } from "../../data/site";
import { formatTime, hasValue, isTodo } from "../../lib/utils";
import { buttonClasses } from "../ui/Button";
import Reveal from "../ui/Reveal";
import TodoBadge from "../ui/TodoBadge";
import {
  ClockIcon,
  MapPinIcon,
  NavigationIcon,
  PhoneIcon,
} from "../ui/Icons";

export default function LocationHours() {
  const hoursKnown = Array.isArray(site.hours) && site.hours.length > 0;

  return (
    <section id="find-us" className="bg-cream pb-16 pt-4 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal className="rounded-3xl border border-espresso/10 bg-white/45 p-6 sm:p-8">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-wood-deep">
              <MapPinIcon className="h-4 w-4" />
              Find us
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-espresso sm:text-[2.75rem]">
              Hours &amp; location
            </h2>

            <address className="mt-6 not-italic">
              <p className="text-lg leading-relaxed text-espresso/80">
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.state} {site.address.pin}
              </p>
              <a
                href={`tel:${site.phone.tel}`}
                className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-brick transition-colors hover:text-espresso"
              >
                <PhoneIcon className="h-4 w-4" />
                {site.phone.display}
              </a>
            </address>

            <div className="mt-6 border-t border-espresso/10 pt-5">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-espresso/70">
                <ClockIcon className="h-4 w-4 text-wood" />
                Opening hours
              </h3>

              {hoursKnown ? (
                <>
                  <table className="mt-3 w-full text-sm">
                    <caption className="sr-only">Opening hours</caption>
                    <tbody>
                      {site.hours.map((entry) => (
                        <tr
                          key={entry.day}
                          className="border-b border-espresso/5 last:border-0"
                        >
                          <th
                            scope="row"
                            className="py-2 text-left font-medium text-espresso/75"
                          >
                            {entry.day}
                          </th>
                          <td className="py-2 text-right text-espresso/70">
                            {formatTime(entry.open)} – {formatTime(entry.close)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hasValue(site.hoursNote) && (
                    <p className="mt-3 text-xs leading-relaxed text-espresso/70">
                      {site.hoursNote}
                    </p>
                  )}
                </>
              ) : (
                <div className="mt-3 text-sm text-espresso/70">
                  {isTodo(site.hours) && import.meta.env.DEV ? (
                    <TodoBadge label="opening hours" />
                  ) : (
                    <p>Call us for today&apos;s hours.</p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "solid" })}
              >
                <NavigationIcon className="h-4 w-4" />
                Get directions
              </a>
              <a
                href={`tel:${site.phone.tel}`}
                className={buttonClasses({ variant: "outline-dark" })}
              >
                <PhoneIcon className="h-4 w-4" />
                Call
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="overflow-hidden rounded-3xl border border-espresso/10 bg-espresso/5">
            <iframe
              src={maps.embed}
              title={`Map showing ${site.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[320px] w-full border-0 sm:h-[420px] lg:h-full lg:min-h-[520px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
