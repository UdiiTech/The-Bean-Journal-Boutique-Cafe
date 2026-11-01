import { site, maps } from "../../Data/Site";
import { navLinks } from "../../Lib/Nav";
import { cx, formatTime, hasValue } from "../../Lib/Utils";
import { useOrder } from "../UI/OrderContext";
import { buttonClasses } from "../UI/Button";
import TodoBadge from "../UI/TodoBadge";
import GamosaDivider from "../UI/GamosaDivider";
import {
  BeanIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
} from "../UI/Icons";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

export default function Footer() {
  const { openChooser } = useOrder();
  const year = new Date().getFullYear();
  const socials = site.social.filter(
    (item) => hasValue(item.url) || import.meta.env.DEV,
  );
  const creditVisible = hasValue(site.credit.name) || import.meta.env.DEV;

  return (
    <footer className="focus-on-dark bg-espresso text-cream">
      <GamosaDivider />
      <div className="mx-auto max-w-7xl px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-12 sm:px-6 sm:pt-16 md:pb-10 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brick text-cream">
                <BeanIcon className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl leading-tight text-cream">
                {site.name}
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              {site.about.tagline}
            </p>
            {(hasValue(site.assameseGreeting) || import.meta.env.DEV) && (
              <p className="mt-3 font-display text-lg text-amber">
                {hasValue(site.assameseGreeting) ? (
                  site.assameseGreeting
                ) : (
                  <TodoBadge label="Assamese greeting" />
                )}
              </p>
            )}
            <button
              type="button"
              onClick={openChooser}
              className={buttonClasses({
                variant: "amber",
                className: "mt-6",
              })}
            >
              Order Online
            </button>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber">
              Visit
            </h2>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-cream/75">
              <a
                href={maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-cream"
              >
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span>{site.address.full}</span>
              </a>
              <a
                href={`tel:${site.phone.tel}`}
                className="flex items-center gap-2 font-medium transition-colors hover:text-cream"
              >
                <PhoneIcon className="h-4 w-4 shrink-0 text-amber" />
                {site.phone.display}
              </a>
            </address>
            {(Array.isArray(site.hours) || import.meta.env.DEV) && (
              <p className="mt-4 text-xs leading-relaxed text-cream/50">
                {Array.isArray(site.hours) ? (
                  site.hours.map((entry) => (
                    <span key={entry.day} className="block">
                      {entry.day}: {formatTime(entry.open)}–
                      {formatTime(entry.close)}
                    </span>
                  ))
                ) : (
                  <TodoBadge label="opening hours" />
                )}
              </p>
            )}
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`tel:${site.phone.tel}`}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-amber transition-colors hover:text-cream"
            >
              Call to reserve · {site.phone.display}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              {socials.length > 0 && (
                <ul className="flex items-center gap-2" aria-label="Social media">
                  {socials.map((item) => {
                    const Icon = socialIcons[item.icon];
                    if (!Icon) return null;
                    if (!hasValue(item.url)) {
                      return (
                        <li
                          key={item.label}
                          className="flex items-center gap-1.5 rounded-full border border-dashed border-cream/20 px-3 py-2 text-xs text-cream/50"
                        >
                          {item.label} <TodoBadge label={`${item.label} link`} />
                        </li>
                      );
                    }
                    return (
                      <li key={item.label}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:bg-cream hover:text-espresso"
                          aria-label={`${site.shortName} on ${item.label}`}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
              {(hasValue(site.fssai) || import.meta.env.DEV) && (
                <p
                  className={cx(
                    "mt-3 text-xs",
                    hasValue(site.fssai) ? "text-cream/55" : "text-cream/45",
                  )}
                >
                  {hasValue(site.fssai) ? (
                    <>FSSAI Licence: {site.fssai}</>
                  ) : (
                    <TodoBadge label="FSSAI licence number" />
                  )}
                </p>
              )}
            </div>

            <div className="text-xs leading-relaxed text-cream/55 sm:text-right">
              <p>
                © {year} {site.name}. All rights reserved.
              </p>
              {creditVisible && (
                <p className="mt-1">
                  {site.credit.label}{" "}
                  {hasValue(site.credit.name) ? (
                    hasValue(site.credit.url) ? (
                      <a
                        href={site.credit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-cream/30 underline-offset-2 transition-colors hover:text-cream"
                      >
                        {site.credit.name}
                      </a>
                    ) : (
                      <span className="text-cream/75">{site.credit.name}</span>
                    )
                  ) : (
                    <TodoBadge label="website credit" />
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
