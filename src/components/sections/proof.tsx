import Image from "next/image";

import { Parallax } from "@/components/motion/parallax";
import { Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/reveal";
import { RotatingSeal } from "@/components/ui/rotating-seal";
import { awards, partners, secret } from "@/data/site";

export function Proof() {
  return (
    <section className="border-t border-line bg-bg-soft">
      {/* --- The question ------------------------------------------- */}
      <div className="shell py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              <p className="eyebrow">{secret.eyebrow}</p>
            </div>

            <h2 className="mt-5 font-display text-[clamp(2.1rem,5.4vw,3.9rem)] leading-[1.03] tracking-[-0.03em] text-balance">
              <SplitText text={secret.question} />
            </h2>

            <Reveal delay={0.15}>
              <p className="mt-7 max-w-prose text-base leading-relaxed text-muted md:text-lg">{secret.body}</p>
            </Reveal>

            <Reveal delay={0.25} className="mt-9">
              <p className="font-display text-2xl leading-tight tracking-tight text-gold md:text-3xl">
                {secret.stamp}
              </p>
            </Reveal>
          </div>

          <div className="relative">
            <Parallax distance={54} scaleFrom={0.97} scaleTo={1.02} className="relative">
              <Image
                src={secret.image}
                alt={secret.imageAlt}
                width={1100}
                height={1100}
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="w-full select-none"
              />
              <RotatingSeal
                text={secret.stamp}
                className="absolute -bottom-6 left-4 size-24 text-gold md:-bottom-10 md:left-8 md:size-32"
              />
            </Parallax>
          </div>
        </div>
      </div>

      {/* --- Awards -------------------------------------------------- */}
      <div className="border-t border-line">
        <div className="shell py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{awards.eyebrow}</p>
              <h3 className="mt-4 font-display text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.03em] text-balance">
                {awards.lead}
              </h3>
            </div>
            <a
              href={awards.cta.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="link"
              className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase transition-colors hover:text-gold"
            >
              {awards.cta.label} →
            </a>
          </div>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-3" stagger={0.09}>
            {awards.items.map((award) => (
              <StaggerItem key={award.image} className="h-full">
                <figure className="group relative h-full overflow-hidden rounded-2xl border border-line bg-bg">
                  <Image
                    src={award.image}
                    alt={award.alt}
                    width={640}
                    height={640}
                    sizes="(min-width: 640px) 30vw, 92vw"
                    className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0e0c0a]/85 to-transparent p-5 pt-10 font-mono text-[0.65rem] tracking-[0.18em] text-white/90 uppercase">
                    {award.title}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* --- Collaborations ------------------------------------------ */}
      <div className="border-t border-line">
        <div className="shell py-20 md:py-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="font-display text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.05] tracking-[-0.03em]">
              {partners.lead}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Partnerships that extend learning beyond the classroom — universities, institutions and councils that
              work with TIS students and faculty.
            </p>
          </div>

          <Stagger className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-[var(--line)] sm:grid-cols-4 lg:grid-cols-6">
            {partners.items.map((partner) => (
              <StaggerItem key={partner.name} y={18}>
                <div
                  data-cursor="link"
                  title={partner.name}
                  className="grid aspect-square place-items-center bg-bg p-5 transition-colors duration-400 hover:bg-surface"
                >
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={300}
                    height={300}
                    sizes="(min-width: 1024px) 14vw, (min-width: 640px) 22vw, 30vw"
                    className="max-h-full w-full object-contain opacity-45 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
