import { useEffect, useState } from "react";
import { site } from "../../Data/Site";
import { navLinks } from "../../Lib/nav";
import { useOrder } from "../Ui/OrderContext";
import { buttonClasses } from "../Ui/Button";
import { BeanIcon, MenuIcon } from "../Ui/Icons";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openChooser } = useOrder();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brick text-cream sm:h-11 sm:w-11">
            <BeanIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate font-display text-lg leading-none text-espresso sm:text-2xl">
              {site.shortName}
            </span>
            <span className="mt-1 text-[0.5rem] font-bold uppercase tracking-[0.18em] text-wood-deep sm:text-[0.62rem] sm:tracking-[0.22em]">
              Boutique Café
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-espresso/75 transition-colors hover:bg-espresso/5 hover:text-brick xl:px-3.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openChooser}
            className={buttonClasses({
              variant: "primary",
              size: "sm",
              className: "sm:hidden",
            })}
          >
            Order
          </button>
          <button
            type="button"
            onClick={openChooser}
            className={buttonClasses({
              variant: "primary",
              className: "max-sm:hidden",
            })}
          >
            Order Online
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-espresso transition-colors hover:bg-espresso/5 lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
