import Image from "next/image";

import { Parallax } from "@/components/motion/parallax";
import { Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/site";

const QUOTE_CAPTIONS = ["Supported, and pushed further", "A school that chooses you"] as const;

export function About() {
  return (
    <section id="about" className="shell scroll-mt-24 py-20 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.lead}
          size="xl"
          className="max-w-3xl"
        />

        <Reveal delay={0.15} className="lg:pb-3">
          <p className="text-base leading-relaxed text-muted md:text-lg">{about.body[0]}</p>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{about.body[1]}</p>
          <p className="mt-8 border-l-2 border-gold pl-5 font-display text-lg leading-snug text-ink italic">
            {about.founding}
          </p>
        </Reveal>
      </div>

      {/* Three pillars, staggered in on scroll. */}
      <Stagger className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-[var(--line)] md:mt-24 md:grid-cols-3">
        {about.pillars.map((pillar, index) => (
          <StaggerItem key={pillar.title} className="group relative bg-bg p-8 transition-colors duration-500 hover:bg-surface md:p-10">
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight md:text-[1.7rem]">
              {pillar.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{pillar.body}</p>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
          </StaggerItem>
        ))}
      </Stagger>

      {/* Two parent/student voices with drifting portraits. */}
      <div className="mt-20 grid gap-8 md:mt-28 lg:grid-cols-2">
        {about.quotes.map((quote, index) => (
          <Reveal key={quote.text} delay={index * 0.12} className={index === 1 ? "lg:mt-16" : undefined}>
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-10">
              <Parallax distance={26} className="pointer-events-none absolute -top-2 right-4 w-28 opacity-90 md:w-36">
                <Image
                  src={quote.image}
                  alt={quote.alt}
                  width={525}
                  height={476}
                  sizes="144px"
                  className="animate-drift w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.28)]"
                />
              </Parallax>

              <div className="relative">
                <span aria-hidden="true" className="block font-display text-5xl leading-none text-gold/70">
                  &ldquo;
                </span>
                <SplitText
                  text={quote.text}
                  className="mt-3 block max-w-[16ch] font-display text-[clamp(1.5rem,3.4vw,2.15rem)] leading-[1.12] tracking-tight"
                  stagger={0.035}
                />
                <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted">{quote.body}</p>
              </div>

              <figcaption className="relative mt-8 font-mono text-[0.65rem] tracking-[0.2em] text-subtle uppercase">
                {QUOTE_CAPTIONS[index]}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
