import { useEffect, useRef, useState } from "react";
import { cx } from "../../Lib/Utils";

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  ...props
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      data-reveal={shown ? "shown" : "pending"}
      className={cx("reveal", className)}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
