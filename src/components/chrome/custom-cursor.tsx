"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { EASE_OUT } from "@/lib/motion";

type CursorMode = "idle" | "link" | "media" | "text";

type HoverTarget = { mode: CursorMode; label: string };

const RING_SIZE = 40;
const DOT_SIZE = 6;

/**
 * Custom cursor: a trailing ring plus a tight centre dot.
 *
 * Opt-in on desktop pointers only — it is disabled for coarse pointers
 * (touch) and for `prefers-reduced-motion`, where the native cursor is the
 * right answer. Opt-in state is published on `<html data-cursor-custom>` so the
 * stylesheet can hide the native cursor without a flash on first paint.
 *
 * Pointer position is written to motion values inside a single rAF loop, so
 * moving the mouse never triggers a React render.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState<HoverTarget>({ mode: "idle", label: "" });

  const labelRef = useRef<HTMLSpanElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(-100, { stiffness: 380, damping: 32, mass: 0.35 });
  const ringY = useSpring(-100, { stiffness: 380, damping: 32, mass: 0.35 });

  /* --- enable / disable ------------------------------------------- */
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const on = fine.matches && !calm.matches;
      setEnabled(on);
      document.documentElement.toggleAttribute("data-cursor-custom", on);
    };

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      document.documentElement.removeAttribute("data-cursor-custom");
    };
  }, []);

  /* --- pointer tracking ------------------------------------------- */
  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      dotX.set(event.clientX);
      dotY.set(event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, dotX, dotY]);

  /* --- hover intent, via event delegation -------------------------- */
  useEffect(() => {
    if (!enabled) return;

    const resolve = (node: EventTarget | null): HoverTarget => {
      if (!(node instanceof Element)) return { mode: "idle", label: "" };
      const marked = node.closest<HTMLElement>("[data-cursor]");
      if (!marked) return { mode: "idle", label: "" };

      const mode = marked.dataset.cursor;
      const label = marked.dataset.cursorLabel ?? "";
      if (mode === "media") return { mode: "media", label };
      if (mode === "text") return { mode: "text", label: "" };
      return { mode: "link", label };
    };

    const onOver = (event: PointerEvent) => setHover(resolve(event.target));
    const onLeaveWindow = () => setHover({ mode: "idle", label: "" });

    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, [enabled]);

  /* --- smooth trailing ring --------------------------------------- */
  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const tick = () => {
      const current = ring.current;
      const next = target.current;
      current.x += (next.x - current.x) * 0.18;
      current.y += (next.y - current.y) * 0.18;
      ringX.set(current.x);
      ringY.set(current.y);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled, ringX, ringY]);

  useEffect(() => {
    if (labelRef.current) labelRef.current.textContent = hover.label;
  }, [hover.label]);

  if (!enabled) return null;

  const isActive = hover.mode !== "idle";
  const ringScale = hover.mode === "media" ? 2.4 : hover.mode === "text" ? 0.35 : isActive ? 1.55 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-[var(--line-strong)] bg-[color-mix(in_oklab,var(--gold),transparent_92%)] backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, width: RING_SIZE, height: RING_SIZE }}
        animate={{
          scale: ringScale,
          borderColor: isActive ? "var(--gold)" : "var(--line-strong)",
          backgroundColor: isActive
            ? "color-mix(in oklab, var(--gold), transparent 84%)"
            : "color-mix(in oklab, var(--gold), transparent 92%)",
        }}
        transition={{ duration: 0.32, ease: EASE_OUT }}
      >
        {hover.mode === "media" && !hover.label ? (
          <span className="font-mono text-[0.5rem] font-semibold tracking-[0.14em] text-[#14110e] uppercase">
            View
          </span>
        ) : (
          <span
            ref={labelRef}
            className="font-mono text-[0.5rem] font-medium tracking-[0.18em] text-[#14110e] uppercase"
          />
        )}
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 rounded-full bg-gold"
        style={{ x: dotX, y: dotY, width: DOT_SIZE, height: DOT_SIZE }}
        animate={{ scale: isActive ? 0 : 1, opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      />
    </div>
  );
}
