"use client";

import Image from "next/image";

import { contact, footerNav, primaryNav, site, socials } from "@/data/site";
import { scrollToSection, scrollToTop } from "@/lib/smooth-scroll";

const EXPLORE_EXTRA = [
  { label: "Virtual Tour", href: contact.virtualTourUrl },
  { label: "Enquire Now", href: "#enquire" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-soft">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-16">
          <div>
            <Image
              src="/images/brand/footer-logo.webp"
              alt={site.name}
              width={203}
              height={79}
              sizes="203px"
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {site.type} in {site.city}, {site.state}. {site.board} curriculum, established {site.established}.
            </p>

            <address className="mt-8 space-y-1 text-sm leading-relaxed not-italic text-muted">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <ul className="mt-7 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    data-cursor="link"
                    className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    <Image src={social.icon} alt="" width={16} height={16} sizes="16px" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Explore">
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[...primaryNav, ...EXPLORE_EXTRA].map((item) => (
                <li key={item.label}>
                  <Anchor href={item.href} className="text-muted transition-colors duration-300 hover:text-gold">
                    {item.label}
                  </Anchor>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Mandatory disclosure">
            <h2 className="eyebrow">Quick links</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-muted transition-colors duration-300 hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <ContactChip label="Admission helpline" value={contact.helplineDisplay} href={`tel:${contact.helpline}`} />
          <ContactChip label="Landline" value={contact.landlines[0]} href={`tel:${contact.landlines[0]}`} />
          <ContactChip label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactChip label="Student portal" value="Fedena Login" href={contact.studentPortalUrl} />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {year} {site.name}, {site.city} | All Rights Reserved
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="link"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase transition-colors hover:text-gold"
          >
            Back to top
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3 transition-transform duration-300 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

/** In-page anchors go through Lenis; everything else is a plain link. */
function Anchor({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (!href.startsWith("#")) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(href.slice(1));
      }}
      className={className}
    >
      {children}
    </a>
  );
}

function ContactChip({ label, value, href }: { label: string; value: string; href: string }) {
  const external = !href.startsWith("tel:") && !href.startsWith("mailto:");

  return (
    <div>
      <p className="eyebrow">{label}</p>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        className="mt-2 block text-sm text-ink transition-colors duration-300 hover:text-gold"
      >
        {value}
      </a>
    </div>
  );
}
