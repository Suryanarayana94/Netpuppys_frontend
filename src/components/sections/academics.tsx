import Image from "next/image";

import { Parallax } from "@/components/motion/parallax";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { academics, contact } from "@/data/site";

export function Academics() {
  return (
    <section id="academics" className="relative scroll-mt-24 border-t border-line bg-bg-soft">
      <div className="shell py-20 md:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={academics.eyebrow}
            title={academics.title}
            lead={academics.lead}
            className="max-w-2xl"
          />
          <ActionLink href={contact.applyUrl} variant="outline" className="w-fit shrink-0">
            Start an application
          </ActionLink>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {academics.cards.map((card) => (
            <StaggerItem key={card.index} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_28px_60px_-34px_var(--glow)]">
                <span className="font-display text-[3.4rem] leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/60">
                  {card.index}
                </span>

                <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{card.body}</p>

                <ul className="mt-6 space-y-2 border-t border-line pt-5">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[0.8rem] text-muted">
                      <span aria-hidden="true" className="mt-[0.45em] size-1 shrink-0 rounded-full bg-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Wide brand band with parallax drift. */}
      <div className="relative overflow-hidden border-t border-line bg-bg">
        <Parallax distance={60} className="shell py-14 md:py-20">
          <div className="relative mx-auto max-w-4xl">
            <Image
              src="/images/hero/made-for-future.webp"
              alt="Made for the future — a TIS student"
              width={638}
              height={290}
              sizes="(min-width: 1024px) 672px, 92vw"
              className="mx-auto w-full max-w-2xl select-none"
            />
            <p className="mt-8 text-center font-display text-[clamp(1.4rem,3.2vw,2.4rem)] leading-tight tracking-tight text-balance">
              Holistic development, and preparing students to be global leaders.
            </p>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
