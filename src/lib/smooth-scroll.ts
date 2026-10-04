import type Lenis from "lenis";

/**
 * Module-level handle on the single Lenis instance.
 *
 * Lenis owns the scroll position, so anything that needs to move the page
 * (nav links, "scroll to top", the enquiry CTA) has to go through here rather
 * than through `scrollIntoView`, otherwise the two fight each other.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null): void {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Smooth-scrolls to a section id, accounting for the fixed header. */
export function scrollToSection(id: string, offset = -84): void {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.2 });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function scrollToTop(): void {
  if (instance) {
    instance.scrollTo(0, { duration: 1.2 });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
