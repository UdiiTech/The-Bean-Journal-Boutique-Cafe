import { useCallback, useEffect, useRef } from "react";
import { site } from "../../Data/Site";
import { cx, whatsappHref } from "../../Lib/utils";
import useBodyScrollLock from "../../Hooks/UseBodyScrollLock";
import { useOrder } from "../Ui/OrderContext";
import { buttonClasses } from "../Ui/Button";
import TodoBadge from "../Ui/TodoBadge";
import {
  ArrowRightIcon,
  BeanIcon,
  CloseIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../Ui/Icons";

export default function MobileMenu({ open, onClose, links }) {
  const dialogRef = useRef(null);
  const firstLinkRef = useRef(null);
  const { openChooser } = useOrder();
  useBodyScrollLock(open);
  const whatsapp = whatsappHref(site.whatsapp);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => firstLinkRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleBackdrop = useCallback((event) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  }, []);

  const order = () => {
    dialogRef.current?.close();
    openChooser();
  };

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      onClose={onClose}
      onClick={handleBackdrop}
      aria-label="Main menu"
      className="mobile-menu-dialog m-0 h-dvh max-h-none w-full max-w-none border-0 bg-cream p-0 text-espresso backdrop:bg-espresso/60 lg:hidden"
    >
      <div className="flex min-h-full flex-col">
        <div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
          <a
            href="#top"
            onClick={() => dialogRef.current?.close()}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brick text-cream">
              <BeanIcon className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-lg leading-none text-espresso">
                {site.shortName}
              </span>
              <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-wood-deep">
                Boutique Café
              </span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-espresso/70 transition-colors hover:bg-espresso/5 hover:text-espresso"
            aria-label="Close menu"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-5 py-5">
          <ul className="divide-y divide-espresso/10">
            {links.map((link, index) => (
              <li key={link.href}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => dialogRef.current?.close()}
                  className="flex min-h-14 items-center justify-between py-2 font-display text-2xl text-espresso transition-colors hover:text-brick"
                >
                  {link.label}
                  <ArrowRightIcon className="h-5 w-5 text-espresso/30" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2.5 border-t border-espresso/10 px-5 py-5">
          <button
            type="button"
            onClick={order}
            className={buttonClasses({
              variant: "primary",
              size: "lg",
              className: "w-full",
            })}
          >
            Order Online
          </button>
          <a
            href="#reserve"
            onClick={() => dialogRef.current?.close()}
            className={buttonClasses({
              variant: "outline-dark",
              size: "lg",
              className: "w-full",
            })}
          >
            Reserve a Table
          </a>
          <div
            className={cx(
              "grid gap-2.5 pt-1",
              whatsapp || import.meta.env.DEV ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            <a
              href={`tel:${site.phone.tel}`}
              className={buttonClasses({
                variant: "solid",
                className: "w-full",
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
                  variant: "outline-dark",
                  className: "w-full",
                })}
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            ) : import.meta.env.DEV ? (
              <span className="flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-dashed border-espresso/20 px-2 text-xs text-espresso/40">
                WhatsApp <TodoBadge label="WhatsApp number" />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </dialog>
  );
}
