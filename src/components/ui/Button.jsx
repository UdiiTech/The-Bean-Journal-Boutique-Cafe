import { cx } from "../../Lib/Utils";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-semibold leading-none decoration-transparent transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary: "bg-brick text-cream hover:bg-[#7f1616]",
  solid: "bg-espresso text-cream hover:bg-charcoal",
  amber: "bg-amber text-espresso hover:bg-[#d2944b]",
  "outline-light":
    "border border-cream/70 text-cream hover:bg-cream hover:text-espresso",
  "outline-dark":
    "border border-espresso/30 text-espresso hover:bg-espresso hover:text-cream",
  "soft-dark": "bg-espresso/5 text-espresso hover:bg-espresso/10",
  "soft-light": "bg-cream/10 text-cream hover:bg-cream/20",
};

const sizes = {
  sm: "min-h-11 px-4 text-sm",
  md: "",
  lg: "min-h-[52px] px-7 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className } = {}) {
  return cx(base, variants[variant] ?? variants.primary, sizes[size], className);
}
