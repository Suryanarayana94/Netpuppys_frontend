"use client";

import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";

import { setLenis } from "@/lib/smooth-scroll";

/**
 * Inertial smooth scrolling.
 *
 * Mounted once, high in the tree. Lenis still commits to the native scroll
 * position, so `useScroll`, `position: sticky` and in-page anchors keep
 * working unchanged — we only own the rAF pump.
 *
 * Skipped entirely when the visitor prefers reduced motion: inertial scrolling
 * is exactly the large-area motion that setting exists to suppress.
 */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease-out: responsive immediately, long settle, no overshoot
      // (overshoot would fight `whileInView` thresholds).
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    setLenis(lenis);

    let frame = 0;
    const pump = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(pump);
    };
    frame = window.requestAnimationFrame(pump);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduceMotion]);

  return null;
}
