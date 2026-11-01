import { cx } from "../../Lib/Utils";

export default function GamosaDivider({ className }) {
  return <div aria-hidden="true" className={cx("gamosa-divider", className)} />;
}
