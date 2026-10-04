"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { ThemeToggle } from "@/components/chrome/theme-toggle";
import { contact, primaryNav } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";
import { getLenis, scrollToSection } from "@/lib/smooth-scroll";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const theme = useTheme();
  const { scrollY } = useScroll();

  /* Over the hero the backdrop is always dark, so the knockout wordmark stays
     legible. Once the bar picks up the page colour it follows the theme. */
  const useInkWordmark = scrolled && theme === "light";

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  /* Close the overlay on Escape, like a dialog should. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* Lenis keeps its own scroll lock, so hand control to it rather than the body. */
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen]);

  const go = useCallback((href: string) => {
    setMenuOpen(false);
    // Let the overlay finish closing before Lenis takes the scroll back.
    window.setTimeout(() => scrollToSection(href.slice(1)), reduceMotion ? 0 : 240);
  }, [reduceMotion]);

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-colors duration-500",
          scrolled || menuOpen
            ? "border-b border-line bg-[color-mix(in_oklab,var(--bg),transparent_82%)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              getLenis()?.scrollTo(0, { duration: 1.1 });
            }}
            data-cursor="link"
            aria-label="Tulas International School — back to top"
            className="flex items-center"
          >
            <Image
              src={useInkWordmark ? "/images/brand/wordmark-ink.webp" : "/images/brand/footer-logo.webp"}
              alt="Tulas International School"
              width={203}
              height={79}
              sizes="(min-width: 768px) 203px, 160px"
              className="h-8 w-auto md:h-9"
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.href);
                }}
                data-cursor="link"
                className="group relative px-3.5 py-2 text-[0.875rem] text-muted transition-colors duration-300 hover:text-ink"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <a
              href={`tel:${contact.helpline}`}
              data-cursor="link"
              className="hidden font-mono text-[0.7rem] tracking-[0.14em] text-muted uppercase transition-colors hover:text-gold xl:inline"
            >
              {contact.helplineDisplay}
            </a>

            <a
              href={contact.applyUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="link"
              data-cursor-label="Apply"
              className="hidden h-9 items-center rounded-full bg-ink px-5 text-[0.8rem] font-medium text-bg transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Apply Now
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-cursor="link"
              className="relative grid size-9 place-items-center rounded-full border border-line lg:hidden"
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="h-px w-full bg-current"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="h-px w-full bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <MobileMenu key="mobile-menu" onNavigate={go} onClose={() => setMenuOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

type MobileMenuProps = {
  onNavigate: (href: string) => void;
  onClose: () => void;
};

function MobileMenu({ onNavigate, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();
  const stagger = reduceMotion ? 0 : 0.055;

  return (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="fixed inset-0 z-[70] flex flex-col bg-bg pt-24 pb-8 lg:hidden"
    >
      <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
        <ul className="flex flex-col">
          {primaryNav.map((item, index) => (
            <motion.li
              key={item.href}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.06 + index * stagger }}
              className="border-b border-line"
            >
              <a
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.href);
                }}
                className="flex items-baseline justify-between py-4 font-display text-3xl tracking-tight"
              >
                {item.label}
                <span className="font-mono text-[0.65rem] text-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.06 + primaryNav.length * stagger }}
          className="mt-8 flex flex-col gap-3"
        >
          <a
            href={contact.applyUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink text-sm font-medium text-bg"
          >
            Apply Now
          </a>
          <a
            href={`tel:${contact.helpline}`}
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong font-mono text-xs tracking-[0.14em] uppercase"
          >
            {contact.helplineDisplay}
          </a>
        </motion.div>
      </nav>
    </motion.div>
  );
}
