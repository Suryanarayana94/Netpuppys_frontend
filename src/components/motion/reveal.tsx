"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { EASE_OUT, VIEWPORT, VIEWPORT_SOFT } from "@/lib/motion";

/* ------------------------------------------------------------------ *
 *  Reveal — the workhorse entrance animation.
 * ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element animates. */
  delay?: number;
  /** Travel distance in pixels. */
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 26 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.75, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 *  Stagger — parent/child pair for lists and card grids.
 * ------------------------------------------------------------------ */

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  stagger?: number;
};

export function Stagger({ children, className, stagger = 0.09 }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_SOFT}
      variants={{
        hidden: {},
        show: reduceMotion
          ? { transition: { staggerChildren: 0 } }
          : { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  /** Travel distance in pixels. */
  y?: number;
};

export function StaggerItem({ children, className, y = 28 }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduceMotion
          ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
          : {
              hidden: { opacity: 0, y, scale: 0.985 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE_OUT } },
            }
      }
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 *  SplitText — word-by-word mask reveal for display headlines.
 * ------------------------------------------------------------------ */

type SplitTextProps = {
  text: string;
  className?: string;
  /** Applied to each animated word — used for the accent colour on one line. */
  wordClassName?: string;
  delay?: number;
  stagger?: number;
};

export function SplitText({ text, className, wordClassName, delay = 0, stagger = 0.05 }: SplitTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          // Words repeat verbatim across the page, so index is the stable key here.
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
        >
          <motion.span
            className={`inline-block will-change-transform ${wordClassName ?? ""}`}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.85, ease: EASE_OUT } },
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
