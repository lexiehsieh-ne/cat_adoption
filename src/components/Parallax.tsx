"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function Parallax({
  children,
  speed = 0.2,
  rotate = 0,
  baseRotate = 0,
  className,
  "aria-hidden": ariaHidden,
}: {
  children: ReactNode;
  /** Positive = drifts down while scrolling into view, then up while leaving. Roughly px of travel per 100px of speed. */
  speed?: number;
  /** Extra degrees of rotation gained across the scroll range, centered on baseRotate. */
  rotate?: number;
  /** Static tilt in degrees (use instead of a Tailwind rotate-* class, since it would be overwritten). */
  baseRotate?: number;
  className?: string;
  "aria-hidden"?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = reduceMotion ? 0 : speed * 220;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const rotateRange = reduceMotion ? 0 : rotate;
  const r = useTransform(
    scrollYProgress,
    [0, 1],
    [baseRotate - rotateRange, baseRotate + rotateRange]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate: r }}
      className={className}
      aria-hidden={ariaHidden}
    >
      {children}
    </motion.div>
  );
}
