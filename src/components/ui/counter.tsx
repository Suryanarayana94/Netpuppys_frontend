"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import { EASE_OUT } from "@/lib/motion";

type CounterProps = {
  value: number;
  suffix?: string;
  /** Seconds the count-up takes. */
  duration?: number;
};

/**
 * Counts up once the number scrolls into view.
 *
 * The digits are written straight to the DOM node inside the animation's
 * `onUpdate` so a 1.5s count-up never triggers 90 React renders.
 */
export function Counter({ value, suffix = "", duration = 1.5 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (reduceMotion) {
      node.textContent = String(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  return (
    <span>
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span aria-hidden="true" ref={ref}>
        {reduceMotion ? value : 0}
        {suffix}
      </span>
    </span>
  );
}
