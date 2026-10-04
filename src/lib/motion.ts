/**
 * The motion language for the whole page.
 *
 * Three curves, used everywhere: one decelerating ease for entrances, and the
 * two viewport presets that decide when a section "counts" as arrived. Keeping
 * them here means every section triggers at the same scroll depth.
 */

/** Decelerating ease-out — the default for anything entering the viewport. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** `whileInView` preset for standalone elements. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;

/** Looser preset for long sections, so they animate before fully in frame. */
export const VIEWPORT_SOFT = { once: true, amount: 0.15 } as const;
