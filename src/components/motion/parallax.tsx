"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Total travel in pixels across the element's full pass through the viewport. */
  distance?: number;
  scaleFrom?: number;
  scaleTo?: number;
};

/**
 * Scroll-linked depth for imagery. Uses a spring so the value settles rather
 * than snapping, and writes straight to a transform — no React re-renders.
 */
export function Parallax({ children, className, distance = 90, scaleFrom, scaleTo }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleFrom ?? 1, 1, scaleTo ?? 1]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

type ScaleOnScrollProps = {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
};

/** Slow Ken-Burns style scale tied to scroll position — used on the hero. */
export function ScaleOnScroll({ children, className, from = 1.12, to = 1 }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
