import { site } from "../../data/site";
import { cx, whatsappHref } from "../../lib/utils";
import { useOrder } from "../ui/order-context";
import TodoBadge from "../ui/TodoBadge";
import {
  BagIcon,
  CalendarIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../ui/Icons";

export default function MobileBar() {
  const { openChooser } = useOrder();
  const whatsapp = whatsappHref(site.whatsapp);
  const showWhatsAppSlot = Boolean(whatsapp) || import.meta.env.DEV;

  return (
    <nav
      aria-label="Quick actions"
      className="mobile-quick-bar fixed inset-x-0 bottom-0 z-40 border-t border-espresso/10 bg-cream/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(43,27,20,0.08)] backdrop-blur-md md:hidden"
    >
      <div
        className={cx(
          "mx-auto grid max-w-lg px-1",
          showWhatsAppSlot ? "grid-cols-4" : "grid-cols-3",
        )}
      >
        <a
          href={`tel:${site.phone.tel}`}
          className="flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-espresso/80 transition-colors hover:bg-espresso/5 active:bg-espresso/10"
        >
          <PhoneIcon className="h-5 w-5" />
          <span className="text-[0.65rem] font-semibold">Call</span>
        </a>

        {whatsapp ? (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-espresso/80 transition-colors hover:bg-espresso/5 active:bg-espresso/10"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="text-[0.65rem] font-semibold">WhatsApp</span>
          </a>
        ) : showWhatsAppSlot ? (
          <span className="flex min-h-[58px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-espresso/60">
            <WhatsAppIcon className="h-5 w-5" />
            <span className="text-[0.58rem] font-semibold">WhatsApp</span>
            <TodoBadge label="WhatsApp number" />
          </span>
        ) : null}

        <button
          type="button"
          onClick={openChooser}
          className="flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-espresso/80 transition-colors hover:bg-espresso/5 active:bg-espresso/10"
        >
          <BagIcon className="h-5 w-5" />
          <span className="text-[0.65rem] font-semibold">Order</span>
        </button>

        <a
          href="#reserve"
          className="flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-espresso/80 transition-colors hover:bg-espresso/5 active:bg-espresso/10"
        >
          <CalendarIcon className="h-5 w-5" />
          <span className="text-[0.65rem] font-semibold">Reserve</span>
        </a>
      </div>
    </nav>
  );
}
