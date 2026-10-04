"use client";

import { useCallback } from "react";

import { toggleTheme, useTheme } from "@/lib/theme";

/**
 * Dark / light switch.
 *
 * There is no theme context: the active theme is an attribute on `<html>`,
 * read through `useTheme` (for `aria-pressed`) and written by `toggleTheme`.
 * The visuals are pure CSS driven by `light:` / `dark:` variants, so the
 * control is already in the right position on first paint — no flash, no
 * post-hydration snap, and no motion library needed for a 24px slide.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const onClick = useCallback(() => toggleTheme(theme), [theme]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={theme === "light"}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      data-cursor="link"
      className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-line bg-[var(--surface)] p-1 transition-colors duration-300 hover:border-gold/60 ${className}`}
    >
      <span className="absolute top-1 left-1 grid size-6 place-items-center rounded-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] light:translate-x-6">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="absolute size-3.5 text-[#14110e] transition-opacity duration-300 dark:opacity-100 light:opacity-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
        >
          <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" strokeLinejoin="round" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="absolute size-3.5 text-[#14110e] transition-opacity duration-300 light:opacity-100 dark:opacity-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path
            d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6 17 17M7 7 5.4 5.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
}
