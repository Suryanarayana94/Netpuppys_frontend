"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  /** How far the element is allowed to travel, in pixels. */
  strength?: number;
};

/**
 * Subtle "magnetic" pull towards the pointer.
 *
 * Values are motion values written from a pointer handler, so the movement runs
 * on the compositor and never re-renders React.
 */
export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (reduceMotion) return;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      x.set(((event.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * strength);
      y.set(((event.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * strength);
    },
    [reduceMotion, strength, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduceMotion) {
    return <span className={`inline-flex ${className ?? ""}`}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`inline-flex will-change-transform ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}
