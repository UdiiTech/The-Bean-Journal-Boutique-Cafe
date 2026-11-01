import { cx } from "../../lib/utils";

export default function GamosaDivider({ className }) {
  return <div aria-hidden="true" className={cx("gamosa-divider", className)} />;
}
