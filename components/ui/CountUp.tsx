"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** useLayoutEffect on the client, no-op during SSR (avoids the React warning). */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type CountUpProps = {
  /** Final value to count to. */
  to: number;
  from?: number;
  /** Animation length in milliseconds. */
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Adds thousands separators (1,234). */
  separator?: boolean;
  className?: string;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function format(value: number, decimals: number, separator: boolean) {
  const fixed = value.toFixed(decimals);
  if (!separator) return fixed;
  const [whole, frac] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return frac ? `${grouped}.${frac}` : grouped;
}

/** Number that animates from `from` to `to` the first time it scrolls into view. */
export default function CountUp({
  to,
  from = 0,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = true,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  // `null` means "hasn't been primed yet" — server and first client render both
  // show the final figure, so the real number is in the HTML for crawlers and
  // for anyone without JS. A layout effect drops it to the start value before
  // the browser paints, so there is no visible flash.
  const [value, setValue] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!reduce) setValue(from);
  }, [from, reduce]);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(from + (to - from) * easeOutExpo(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabnum">
        {format(value ?? to, decimals, separator)}
      </span>
      {suffix}
    </span>
  );
}
