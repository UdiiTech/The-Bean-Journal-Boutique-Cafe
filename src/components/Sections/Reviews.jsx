import { site, maps } from "../../Data/Site";
import { hasValue, isTodo } from "../../Lib/utils";
import Reveal from "../Ui/Reveal";
import TodoBadge from "../Ui/TodoBadge";
import { buttonClasses } from "../Ui/Button";
import { ArrowUpRightIcon, StarIcon } from "../Ui/Icons";

function Stars({ value }) {
  const stars = [0, 1, 2, 3, 4];
  return (
    <span
      className="relative inline-flex"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      <span aria-hidden="true" className="flex gap-1 text-cream/20">
        {stars.map((star) => (
          <StarIcon key={star} className="h-5 w-5" />
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 flex gap-1 overflow-hidden text-amber"
        style={{ width: `${Math.max(0, Math.min(100, (value / 5) * 100))}%` }}
      >
        {stars.map((star) => (
          <StarIcon key={star} className="h-5 w-5 shrink-0" />
        ))}
      </span>
    </span>
  );
}

export default function Reviews() {
  const items = site.reviews.items.slice(0, 3);
  const visible = items.filter((item) => hasValue(item.quote));

  return (
    <section id="reviews" className="bg-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-wood-deep">
            Guest notes
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-espresso sm:text-5xl">
            {site.reviews.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-espresso/70">
            {site.reviews.intro}
          </p>
        </Reveal>

        <div
          className={`mt-9 grid gap-5 ${
            visible.length > 0 || import.meta.env.DEV
              ? "lg:grid-cols-[0.85fr_1.15fr]"
              : "max-w-2xl"
          }`}
        >
          <Reveal className="focus-on-dark rounded-3xl bg-espresso p-6 text-cream sm:p-8">
            <Stars value={site.rating.value} />
            <p className="mt-4 font-display text-6xl leading-none text-cream">
              {site.rating.value}
            </p>
            <p className="mt-2 text-sm text-cream/70">
              {site.rating.value} on {site.rating.source} ·{" "}
              {site.rating.count.toLocaleString("en-IN")} reviews
            </p>

            {isTodo(site.reviews.googleLabel) ? (
              import.meta.env.DEV && (
                <TodoBadge label="Google reviews link label" />
              )
            ) : (
              <a
                href={maps.search}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({
                  variant: "outline-light",
                  className: "mt-6 w-full sm:w-auto",
                })}
              >
                {site.reviews.googleLabel}
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
          </Reveal>

          {(visible.length > 0 || import.meta.env.DEV) && (
            <div className="grid gap-3">
              {items.map((review, index) => {
                if (!hasValue(review.quote)) {
                  return import.meta.env.DEV ? (
                    <Reveal
                      key={`review-todo-${index}`}
                      delay={index * 60}
                      className="flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-espresso/20 bg-espresso/[0.025]"
                    >
                      <TodoBadge label={`review ${index + 1} quote`} />
                    </Reveal>
                  ) : null;
                }

                return (
                  <Reveal
                    key={review.quote.slice(0, 30)}
                    as="blockquote"
                    delay={index * 60}
                    className="rounded-2xl border border-espresso/10 bg-white/45 p-5 sm:p-6"
                  >
                    <p className="font-display text-lg leading-relaxed text-espresso/85">
                      “{review.quote}”
                    </p>
                    {(hasValue(review.author) || hasValue(review.when)) && (
                      <footer className="mt-4 flex flex-wrap items-center gap-x-2 text-xs font-medium text-espresso/70">
                        {hasValue(review.author) && <span>{review.author}</span>}
                        {hasValue(review.when) && (
                          <span aria-hidden="true">·</span>
                        )}
                        {hasValue(review.when) && <span>{review.when}</span>}
                      </footer>
                    )}
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
