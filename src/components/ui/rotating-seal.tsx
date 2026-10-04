"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

import { cn } from "@/lib/utils";

type RotatingSealProps = {
  text: string;
  className?: string;
};

/**
 * Circular text badge. The word ring is a real SVG `textPath`, so the copy
 * stays selectable and translatable, and it stops rotating for reduced motion.
 */
export function RotatingSeal({ text, className }: RotatingSealProps) {
  const id = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const label = `${text} · `;

  return (
    <motion.div
      aria-hidden="true"
      className={cn("grid place-items-center", className)}
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 120 120" className="size-full">
        <defs>
          <path
            id={`seal-${id}`}
            d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0"
            fill="none"
          />
        </defs>
        <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
        <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
        <text
          fill="currentColor"
          fontSize="9.5"
          letterSpacing="2.6"
          fontFamily="var(--font-mono)"
          className="uppercase"
        >
          <textPath href={`#seal-${id}`}>{label.repeat(2)}</textPath>
        </text>
      </svg>
    </motion.div>
  );
}
