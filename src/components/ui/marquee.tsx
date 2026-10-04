"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  /** Seconds for one full pass. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  /** Rendered between items — a dot, a slash, a small glyph. */
  separator?: ReactNode;
  fade?: boolean;
  pauseOnHover?: boolean;
};

const DEFAULT_SEPARATOR = (
  <span aria-hidden="true" className="mx-5 size-1.5 shrink-0 rounded-full bg-gold/70 sm:mx-7" />
);

/**
 * CSS-driven infinite marquee.
 *
 * The track holds two identical copies and translates by exactly -50%, so the
 * loop is seamless. The second copy is hidden from assistive tech; the visible
 * content is announced once. The animation is pure CSS, so it keeps running
 * off the main thread and costs nothing in JS.
 */
export function Marquee({
  items,
  duration = 38,
  reverse = false,
  className = "",
  separator = DEFAULT_SEPARATOR,
  fade = true,
  pauseOnHover = false,
}: MarqueeProps) {
  const copy = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={index} className="flex shrink-0 items-center">
          {index > 0 ? separator : null}
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`group relative overflow-hidden ${
        fade
          ? "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          : ""
      } ${className}`}
    >
      <div
        className={`animate-marquee flex w-max ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
