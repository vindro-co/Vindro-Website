"use client";

import { motion, useReducedMotion } from "framer-motion";

type Bar = { label: string; value: number };

/** Column chart — values are percentages of the tallest bar. Bars grow in view. */
export default function BarChart({ data }: { data: Bar[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="flex h-[110px] items-end gap-2.5">
      {data.map((bar, i) => (
        <div
          key={i}
          className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
        >
          <motion.i
            data-bar=""
            className="block w-full min-h-[8px] origin-bottom rounded-t-[5px] rounded-b-[2px] bg-ink"
            style={{ height: `${bar.value}%` }}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.07,
              ease: [0.2, 0.7, 0.3, 1],
            }}
          />
          <b className="text-[11px] font-medium text-ink-faint">{bar.label}</b>
        </div>
      ))}
    </div>
  );
}
