import { useRef, useState } from "react";
import { site } from "../../Data/Site";
import { cx, formatPrice, hasValue, isTodo } from "../../Lib/utils";
import { useOrder } from "../Ui/OrderContext";
import { buttonClasses } from "../Ui/Button";
import Reveal from "../Ui/Reveal";
import TodoBadge from "../Ui/TodoBadge";
import { BeanIcon, BagIcon, PhoneIcon } from "../Ui/Icons";

function DietMarker({ diet }) {
  if (diet !== "veg" && diet !== "non-veg") {
    return isTodo(diet) && import.meta.env.DEV ? (
      <TodoBadge label="veg / non-veg marker" />
    ) : null;
  }

  const isVeg = diet === "veg";
  return (
    <span
      className={cx(
        "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border",
        isVeg ? "border-green-700" : "border-red-700",
      )}
      role="img"
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span
        className={cx(
          "h-2 w-2 rounded-full",
          isVeg ? "bg-green-700" : "bg-red-700",
        )}
      />
    </span>
  );
}

function MenuCard({ item, delay }) {
  const price = formatPrice(item.price);
  const hasBody =
    hasValue(item.name) ||
    hasValue(item.description) ||
    hasValue(item.price) ||
    hasValue(item.diet) ||
    import.meta.env.DEV;

  return (
    <Reveal
      as="article"
      delay={delay}
      className="group overflow-hidden rounded-2xl border border-espresso/10 bg-cream shadow-[0_16px_40px_-32px_rgba(43,27,20,0.55)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-espresso/10">
        <img
          src={item.image.src}
          width={item.image.width}
          height={item.image.height}
          alt={item.image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
        />
      </div>

      {hasBody && (
        <div className="p-5">
          {hasValue(item.name) ? (
            <h3 className="font-display text-xl leading-tight text-espresso">
              {item.name}
            </h3>
          ) : (
            import.meta.env.DEV && <TodoBadge label="menu item name" />
          )}

          {hasValue(item.description) && (
            <p className="mt-2 text-sm leading-relaxed text-espresso/65">
              {item.description}
            </p>
          )}

          <div className="mt-4 flex min-h-7 items-center justify-between gap-3">
            {price ? (
              <span className="font-display text-xl text-brick">{price}</span>
            ) : (
              import.meta.env.DEV && <TodoBadge label="menu price" />
            )}
            <DietMarker diet={item.diet} />
          </div>
        </div>
      )}
    </Reveal>
  );
}

function MenuFallback({ className }) {
  return (
    <div
      className={cx(
        "flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-espresso/20 bg-espresso/[0.025] p-6 sm:flex-row sm:items-center",
        className,
      )}
    >
      <p className="text-sm leading-relaxed text-espresso/75">
        {site.menu.emptyNote}
      </p>
      <a
        href={`tel:${site.phone.tel}`}
        className={buttonClasses({
          variant: "outline-dark",
          className: "shrink-0",
        })}
      >
        <PhoneIcon className="h-4 w-4" />
        Call {site.phone.display}
      </a>
    </div>
  );
}

export default function MenuHighlights() {
  const { openChooser } = useOrder();
  const categories = site.menu.categories.filter(
    (category) =>
      import.meta.env.DEV ||
      category.items.some((item) => hasValue(item.name)),
  );
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const tabRefs = useRef([]);
  const active = categories.find((category) => category.id === activeId) ?? categories[0];
  const items = active
    ? active.items.filter((item) => import.meta.env.DEV || hasValue(item.name))
    : [];

  const handleTabKeyDown = (event, index) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % categories.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + categories.length) % categories.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = categories.length - 1;

    setActiveId(categories[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="menu" className="border-y border-espresso/10 bg-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-wood-deep">
            <BeanIcon className="h-4 w-4" />
            From the kitchen
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-espresso sm:text-5xl">
            {site.menu.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-espresso/70">
            {site.menu.intro}
          </p>
        </Reveal>

        {active ? (
          <>
            <div
              role="tablist"
              aria-label="Menu categories"
              className="mt-8 flex flex-wrap gap-2"
            >
              {categories.map((category, index) => {
                const selected = category.id === active.id;
                return (
                  <button
                    key={category.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`menu-tab-${category.id}`}
                    aria-selected={selected}
                    aria-controls={`menu-panel-${category.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(category.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={cx(
                      "inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors",
                      selected
                        ? "border-espresso bg-espresso text-cream"
                        : "border-espresso/20 bg-transparent text-espresso/70 hover:border-espresso/40 hover:text-espresso",
                    )}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`menu-panel-${active.id}`}
              aria-labelledby={`menu-tab-${active.id}`}
              tabIndex={0}
              className="mt-7 focus-visible:outline-offset-4"
            >
              {items.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, index) => (
                    <MenuCard key={item.id} item={item} delay={index * 70} />
                  ))}
                </div>
              ) : (
                <MenuFallback />
              )}
            </div>
          </>
        ) : (
          <MenuFallback className="mt-8" />
        )}

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-espresso/[0.045] p-5 sm:flex-row sm:items-center sm:p-6">
          <p className="text-sm font-medium text-espresso/70">{site.order.note}</p>
          <button
            type="button"
            onClick={openChooser}
            className={buttonClasses({ variant: "primary", className: "w-full sm:w-auto" })}
          >
            <BagIcon className="h-4 w-4" />
            Order Online
          </button>
        </Reveal>
      </div>
    </section>
  );
}
