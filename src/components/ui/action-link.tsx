"use client";

import Link from "next/link";
import { useCallback } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/smooth-scroll";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gold text-[#14110e] hover:bg-[color-mix(in_oklab,var(--gold),white_18%)] shadow-[0_10px_30px_-12px_var(--glow)]",
  outline: "border border-line-strong text-ink hover:border-gold hover:text-gold",
  ghost: "text-ink hover:text-gold",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8rem]",
  md: "h-11 px-6 text-[0.875rem]",
  lg: "h-14 px-8 text-[0.95rem]",
};

const BASE =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[0.02em] transition-colors duration-300 select-none";

function isInternalHash(href: string): boolean {
  return href.startsWith("#");
}

type ActionLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Turns the magnetic pull on. Off for dense lists and footers. */
  magnetic?: boolean;
  /** Short word printed inside the custom cursor's ring on hover. */
  cursorLabel?: string;
  /** Force external treatment; inferred from the URL by default. */
  external?: boolean;
};

/**
 * The one button/link in the system.
 *
 * Handles the three link flavours the site needs — external, Next route and
 * in-page anchor — and routes in-page anchors through Lenis so they land at the
 * same offset the fixed header expects.
 */
export function ActionLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  magnetic = true,
  cursorLabel,
  external,
}: ActionLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);
  const isExternal = external ?? /^https?:/.test(href);

  const handleAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      scrollToSection(href.slice(1));
    },
    [href],
  );

  const inner = (
    <>
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </>
  );

  const body = magnetic ? <Magnetic strength={10}>{inner}</Magnetic> : inner;
  const cursorProps = { "data-cursor": "link", "data-cursor-label": cursorLabel };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
        {...cursorProps}
      >
        {body}
      </a>
    );
  }

  if (isInternalHash(href)) {
    return (
      <a href={href} onClick={handleAnchorClick} className={classes} {...cursorProps}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...cursorProps}>
      {body}
    </Link>
  );
}
