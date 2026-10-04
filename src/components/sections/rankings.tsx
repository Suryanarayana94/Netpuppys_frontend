import Image from "next/image";

import { SplitText, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { rankings } from "@/data/site";

export function Rankings() {
  return (
    <section id="rankings" className="scroll-mt-24 border-t border-line bg-bg-soft">
      <div className="shell py-20 md:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={rankings.eyebrow} title={rankings.title} size="lg" className="max-w-2xl" />
          <Image
            src="/images/stats/ranking.webp"
            alt=""
            width={360}
            height={360}
            sizes="64px"
            aria-hidden="true"
            className="hidden size-16 shrink-0 object-contain opacity-60 md:block"
          />
        </div>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {rankings.items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg p-7 transition-colors duration-500 hover:border-gold/45">
                <div>
                  <SplitText
                    text={item.rank}
                    className="block font-display text-[clamp(3.4rem,7vw,4.6rem)] leading-none tracking-tight text-gold"
                    stagger={0.05}
                  />
                  <h3 className="mt-4 font-display text-xl leading-tight tracking-tight">{item.title}</h3>
                </div>

                <p className="mt-8 border-t border-line pt-5 text-sm leading-relaxed text-muted">{item.body}</p>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -bottom-10 size-32 rounded-full bg-[var(--glow)] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
