"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useId, useRef, useState } from "react";

import { personalities } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "sports", label: personalities.sports.label },
  { id: "leaders", label: personalities.leaders.label },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Personalities() {
  const [active, setActive] = useState<TabId>("sports");
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const people = active === "sports" ? personalities.sports.people : personalities.leaders.people;

  /** Roving arrow-key navigation, per the WAI-ARIA tabs pattern. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (delta === 0 && event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    const lastIndex = TABS.length - 1;
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? lastIndex
          : (TABS.findIndex((tab) => tab.id === active) + delta + TABS.length) % TABS.length;

    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="border-t border-line bg-bg">
      <div className="shell py-20 md:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              <p className="eyebrow">{personalities.eyebrow}</p>
            </div>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5.6vw,4rem)] leading-[1.02] tracking-[-0.03em] text-balance">
              Influential personalities who have walked this campus
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Notable personalities"
            onKeyDown={onKeyDown}
            className="flex w-fit shrink-0 gap-1 rounded-full border border-line bg-surface p-1"
          >
            {TABS.map((tab, index) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  role="tab"
                  id={`${baseId}-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  data-cursor="link"
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.8rem] font-medium transition-colors duration-300",
                    selected ? "text-[#14110e]" : "text-muted hover:text-ink",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId={`${baseId}-tab-pill`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-gold"
                    />
                  ) : null}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-${active}`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="mt-12"
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
            >
              {people.map((person) => (
                <li key={person.name} className="group">
                  <div className="relative overflow-hidden rounded-full">
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={520}
                      height={520}
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 28vw, 44vw"
                      className="aspect-square w-full rounded-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-line ring-inset transition-all duration-500 group-hover:ring-2 group-hover:ring-gold"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-[0.98rem] leading-snug tracking-tight">{person.name}</h3>
                  <p className="mt-2 text-[0.72rem] leading-relaxed text-muted transition-colors duration-300 group-hover:text-gold/85">
                    {person.role}
                  </p>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
