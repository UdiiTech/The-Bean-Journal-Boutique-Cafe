import { useRef, useState } from "react";
import { site } from "../../Data/Site";
import Reveal from "../UI/Reveal";
import Lightbox from "../UI/Lightbox";
import { ArrowUpRightIcon, BeanIcon } from "../UI/Icons";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const openerRef = useRef(null);
  const images = site.gallery.images;

  const open = (index, event) => {
    openerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  const close = () => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  return (
    <section id="gallery" className="focus-on-dark bg-espresso py-16 text-cream sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber">
              <BeanIcon className="h-4 w-4" />
              Inside the café
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">
              {site.gallery.heading}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/60">
            Interiors, plates and small moments from The Bean Journal. Tap a
            photo to view it larger.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={(event) => open(index, event)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-cream/10 text-left ring-1 ring-cream/10 transition-all hover:ring-amber/60 focus-visible:outline-cream"
              aria-label={`Open photo: ${image.alt}`}
            >
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-90 transition-all duration-500 motion-safe:group-hover:scale-[1.04] motion-safe:group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-espresso/55 text-cream opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              >
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </button>
          ))}
        </Reveal>
      </div>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={close}
        onIndexChange={setActiveIndex}
      />
    </section>
  );
}
