"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  /** Distance (px) the element travels on the way in. */
  y?: number;
  x?: number;
  className?: string;
  /** Element to render — keeps list markup valid. */
  as?: "div" | "li";
};

/**
 * Fade + slide reveal that fires once when the element scrolls into view.
 * Falls back to a plain wrapper when the user prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  const Plain = as === "li" ? "li" : "div";

  if (reduce) return <Plain className={className}>{children}</Plain>;

  return (
    <Tag
      // Targeted by the <noscript> rule in layout.tsx so the content is still
      // visible if JavaScript never runs.
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
}
