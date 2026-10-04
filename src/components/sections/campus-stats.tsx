import Image from "next/image";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/ui/counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { campusStats } from "@/data/site";

export function CampusStats() {
  return (
    <section id="campus" className="grain relative scroll-mt-24 overflow-hidden border-y border-line bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_15%_0%,var(--glow),transparent_70%)]"
      />

      <div className="shell relative py-20 md:py-28">
        <SectionHeading
          eyebrow="The Campus"
          title="Built for the way students actually live"
          lead="A 22-acre pollution free campus in Dehradun, with the facilities and ratios that keep a large school feeling personal."
          align="center"
          className="mx-auto items-center"
        />

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {campusStats.map((stat) => (
            <StaggerItem key={stat.label} className="group relative bg-bg p-8 text-center transition-colors duration-500 hover:bg-surface md:p-10">
              <Image
                src={stat.image}
                alt=""
                width={360}
                height={360}
                sizes="56px"
                aria-hidden="true"
                className="mx-auto size-12 object-contain opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 md:size-14"
              />
              <p className="mt-6 font-display text-[clamp(2.8rem,7vw,4.5rem)] leading-none tracking-tight text-gold">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-sm leading-snug text-muted">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            Sports, medical support, supervision and teaching ratios are not extras here — they are the reason a
            boarding student can focus on learning.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
