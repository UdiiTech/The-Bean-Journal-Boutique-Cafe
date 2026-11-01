import { site, maps } from "../../Data/Site";
import { getTodayStatus, isTodo } from "../../Lib/utils";
import { MapPinIcon, PhoneIcon } from "../Ui/Icons";
import TodoBadge from "../Ui/TodoBadge";

export default function TopBar() {
  const status = getTodayStatus(site.hours, site.timezone);

  return (
    <div className="focus-on-dark bg-espresso text-cream/80">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-4 py-2 text-[0.72rem] leading-snug sm:text-xs lg:px-8">
        <a
          href={maps.directions}
          target="_blank"
          rel="noopener noreferrer"
          title={site.address.full}
          className="flex w-full items-start gap-1.5 transition-colors hover:text-cream sm:w-auto"
        >
          <MapPinIcon className="mt-px h-3.5 w-3.5 shrink-0 text-amber" />
          <span>{site.address.full}</span>
        </a>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <a
            href={`tel:${site.phone.tel}`}
            className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-cream"
          >
            <PhoneIcon className="h-3.5 w-3.5 text-amber" />
            {site.phone.display}
          </a>

          {status ? (
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status.isOpen ? "bg-emerald-400" : "bg-red-400"
                }`}
                aria-hidden="true"
              />
              <span className="font-medium text-cream">{status.label}</span>
              <span className="text-cream/60">{status.hoursLabel}</span>
            </span>
          ) : isTodo(site.hours) ? (
            <TodoBadge label="today's open/closed status" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
