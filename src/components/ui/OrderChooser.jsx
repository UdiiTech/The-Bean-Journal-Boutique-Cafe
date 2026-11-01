import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "../../data/site";
import { hasValue } from "../../lib/utils";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import { OrderContext } from "./order-context";
import TodoBadge from "./TodoBadge";
import { buttonClasses } from "./Button";
import {
  ArrowUpRightIcon,
  BeanIcon,
  CloseIcon,
  PhoneIcon,
} from "./Icons";

function OrderChooser({ open, onClose }) {
  const dialogRef = useRef(null);
  const firstLinkRef = useRef(null);
  useBodyScrollLock(open);

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

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const handleBackdrop = useCallback(
    (event) => {
      if (event.target === event.currentTarget) close();
    },
    [close],
  );

  const links = [
    {
      key: "zomato",
      label: "Order on Zomato",
      detail: "Opens the restaurant page on Zomato",
      url: site.order.zomato,
      tone: "bg-brick text-cream hover:bg-[#7f1616]",
    },
    {
      key: "swiggy",
      label: "Order on Swiggy",
      detail: "Opens the restaurant page on Swiggy",
      url: site.order.swiggy,
      tone: "bg-amber text-espresso hover:bg-[#d2944b]",
    },
  ];

  const available = links.filter((link) => hasValue(link.url));
  const firstAvailableKey = available[0]?.key;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdrop}
      aria-labelledby="order-chooser-title"
      aria-describedby="order-chooser-description"
      className="order-dialog m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-[1.75rem] border-0 bg-cream p-0 text-espresso shadow-2xl backdrop:bg-espresso/75 backdrop:backdrop-blur-[2px] sm:m-auto sm:max-w-lg sm:rounded-[1.75rem]"
    >
      <div className="relative px-5 pb-7 pt-3 sm:px-7 sm:pb-8 sm:pt-6">
        <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-espresso/15 sm:hidden" />

        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-espresso/70 transition-colors hover:bg-espresso/5 hover:text-espresso"
          aria-label="Close order options"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <p className="mb-2 flex items-center gap-2 pr-12 text-xs font-bold uppercase tracking-[0.18em] text-wood-deep">
          <BeanIcon className="h-4 w-4" />
          {site.order.note}
        </p>
        <h2
          id="order-chooser-title"
          className="pr-10 font-display text-[1.7rem] leading-tight text-espresso sm:text-3xl"
        >
          Where would you like to order?
        </h2>
        <p
          id="order-chooser-description"
          className="mt-2 text-sm leading-relaxed text-espresso/70"
        >
          Choose your delivery app. You will finish your order there.
        </p>

        <div className="mt-6 grid gap-3">
          {links.map((link) => {
            if (!hasValue(link.url)) {
              if (!import.meta.env.DEV) return null;
              return (
                <div
                  key={link.key}
                  className="flex min-h-[68px] items-center justify-between rounded-2xl border border-dashed border-espresso/20 bg-espresso/[0.03] px-4 py-3"
                >
                  <span className="text-sm font-medium text-espresso/70">
                    {link.label}
                  </span>
                  <TodoBadge label={`${link.key} order link`} />
                </div>
              );
            }

            return (
              <a
                key={link.key}
                ref={link.key === firstAvailableKey ? firstLinkRef : undefined}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className={`group flex min-h-[72px] items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold shadow-sm transition-colors ${link.tone}`}
              >
                <span>
                  <span className="block text-base">{link.label}</span>
                  <span className="mt-1 block text-xs font-medium opacity-80">
                    {link.detail}
                  </span>
                </span>
                <ArrowUpRightIcon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            );
          })}
        </div>

        {available.length === 0 && (
          <div className="mt-5 rounded-2xl bg-espresso/[0.045] p-4">
            <p className="text-sm leading-relaxed text-espresso/75">
              Online ordering links are not live yet. Call us and we will help
              you place your order.
            </p>
            <a
              href={`tel:${site.phone.tel}`}
              className={buttonClasses({
                variant: "solid",
                className: "mt-3 w-full",
              })}
            >
              <PhoneIcon className="h-4 w-4" />
              Call {site.phone.display}
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={close}
          className={buttonClasses({
            variant: "soft-dark",
            className: "mt-5 w-full",
          })}
        >
          Not now
        </button>
      </div>
    </dialog>
  );
}

export function OrderProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openChooser = useCallback(() => setOpen(true), []);
  const closeChooser = useCallback(() => setOpen(false), []);

  return (
    <OrderContext.Provider value={{ openChooser }}>
      {children}
      <OrderChooser open={open} onClose={closeChooser} />
    </OrderContext.Provider>
  );
}
