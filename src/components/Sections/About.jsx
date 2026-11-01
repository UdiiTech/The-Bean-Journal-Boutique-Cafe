import { site } from "../../Data/Site";
import { hasValue } from "../../Lib/utils";
import Reveal from "../Ui/Reveal";
import TodoBadge from "../Ui/TodoBadge";
import { BeanIcon, MapPinIcon } from "../Ui/Icons";

export default function About() {
  return (
    <section id="about" className="bg-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-8">
        <Reveal className="lg:order-2">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-24 w-24 rounded-tl-3xl border-l-2 border-t-2 border-amber sm:-left-5 sm:-top-5 sm:h-32 sm:w-32"
            />
            <figure className="overflow-hidden rounded-[1.6rem] bg-cream shadow-[0_24px_60px_-30px_rgba(43,27,20,0.45)]">
              <img
                src={site.about.image.src}
                width={site.about.image.width}
                height={site.about.image.height}
                alt={site.about.image.alt}
                loading="lazy"
                decoding="async"
                className="h-full max-h-[560px] w-full object-cover"
              />
            </figure>
            <span className="absolute -bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-brick text-cream shadow-lg">
              <BeanIcon className="h-6 w-6" />
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-wood-deep">
            {site.about.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-espresso sm:text-5xl">
            {site.about.heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-espresso/75">
            {site.about.tagline}
          </p>

          {hasValue(site.about.story) ? (
            <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-espresso/70">
              {String(site.about.story)
                .split("\n\n")
                .map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
            </div>
          ) : (
            import.meta.env.DEV && (
              <p className="mt-4">
                <TodoBadge label="café story" />
              </p>
            )
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-espresso/5 px-4 text-sm font-medium text-espresso/80">
              <BeanIcon className="h-4 w-4 text-wood" />
              {site.cuisine}
            </span>
            <a
              href="#find-us"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-espresso/5 px-4 text-sm font-medium text-espresso/80 transition-colors hover:bg-espresso/10"
            >
              <MapPinIcon className="h-4 w-4 text-wood" />
              {site.address.neighbourhood}, {site.address.city}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
