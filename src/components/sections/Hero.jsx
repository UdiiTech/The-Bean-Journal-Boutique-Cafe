import { site } from "../../data/site";
import { hasValue, whatsappHref } from "../../lib/utils";
import { useOrder } from "../ui/order-context";
import { buttonClasses } from "../ui/Button";
import TodoBadge from "../ui/TodoBadge";
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  WhatsAppIcon,
} from "../ui/Icons";

export default function Hero() {
  const { openChooser } = useOrder();
  const whatsapp = whatsappHref(site.whatsapp);

  return (
    <section
      id="top"
      className="focus-on-dark relative isolate overflow-hidden bg-espresso text-cream"
    >
      <img
        src={site.hero.image.src}
        width={site.hero.image.width}
        height={site.hero.image.height}
        alt={site.hero.image.alt}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-espresso/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/95 via-espresso/75 to-espresso/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-espresso to-transparent"
      />

      <div className="mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-center px-4 py-20 sm:min-h-[82svh] sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber">
            <span className="inline-block h-px w-8 bg-amber/70" aria-hidden="true" />
            {site.about.eyebrow} · {site.address.city}
          </p>

          <h1 className="mt-5 font-display text-[2.9rem] leading-[0.98] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            {site.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">
            {site.hero.line}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openChooser}
              className={buttonClasses({ variant: "primary", size: "lg" })}
            >
              Order Online
            </button>
            <a
              href="#reserve"
              className={buttonClasses({ variant: "amber", size: "lg" })}
            >
              <CalendarIcon className="h-4 w-4" />
              Reserve a Table
            </a>
            <a
              href={`tel:${site.phone.tel}`}
              className={buttonClasses({
                variant: "outline-light",
                size: "lg",
              })}
            >
              <PhoneIcon className="h-4 w-4" />
              Call
            </a>
            {whatsapp ? (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({
                  variant: "outline-light",
                  size: "lg",
                })}
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            ) : import.meta.env.DEV ? (
              <span className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-dashed border-cream/30 px-5 text-sm text-cream/50">
                WhatsApp <TodoBadge label="WhatsApp number" />
              </span>
            ) : null}
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm text-cream/80">
            <li className="inline-flex items-center gap-1.5">
              <StarIcon className="h-4 w-4 text-amber" />
              <span>
                {site.rating.value} on {site.rating.source},{" "}
                {site.rating.count.toLocaleString("en-IN")} reviews
              </span>
            </li>
            <li aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-cream/40 sm:block" />
            <li>{site.cuisine}</li>
            <li aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-cream/40 sm:block" />
            <li className="inline-flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4 text-amber" />
              {site.address.neighbourhood}, {site.address.city}
            </li>
          </ul>

          {hasValue(site.assameseGreeting) && (
            <p className="mt-5 font-display text-lg text-cream/70">
              {site.assameseGreeting}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
