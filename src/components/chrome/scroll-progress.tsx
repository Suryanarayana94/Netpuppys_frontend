"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Reading-progress indicator pinned to the top of the viewport.
 *
 * `scrollYProgress` is already normalised 0→1 for the whole document, so the
 * spring only smooths scroll jitter — no scroll maths lives in this component.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-brand-deep via-gold to-leaf"
    />
  );
}
