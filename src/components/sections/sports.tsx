"use client";

import Image from "next/image";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/ui/counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { beyond } from "@/data/site";
import { cn } from "@/lib/utils";

/** Low-opacity brand washes behind each cut-out, cycled across the grid. */
const PLATE_TINTS = [
  "bg-[radial-gradient(120%_110%_at_50%_115%,color-mix(in_oklab,var(--gold),transparent_72%),transparent_68%)]",
  "bg-[radial-gradient(120%_110%_at_50%_115%,color-mix(in_oklab,var(--brand),transparent_80%),transparent_68%)]",
  "bg-[radial-gradient(120%_110%_at_50%_115%,color-mix(in_oklab,var(--leaf),transparent_82%),transparent_68%)]",
] as const;

export function Sports() {
  return (
    <section id="beyond" className="relative scroll-mt-24 border-t border-line bg-bg-soft">
      <div className="shell py-20 md:py-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow={beyond.eyebrow}
            title={beyond.title}
            lead={beyond.body}
            size="lg"
            className="max-w-3xl"
          />
          <p className="font-display text-[clamp(4rem,12vw,8rem)] leading-none tracking-tight text-gold/25">
            <Counter value={16} suffix="+" />
          </p>
        </div>

        {/* Sport grid — each tile reacts on hover. */}
        <Stagger
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8"
          stagger={0.045}
        >
          {beyond.items.map((sport) => (
            <StaggerItem key={sport.name} y={20}>
              <div
                data-cursor="link"
                className="group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-line bg-bg p-4 transition-colors duration-400 hover:border-gold/50"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--glow),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <Image
                  src={sport.image}
                  alt=""
                  width={240}
                  height={240}
                  sizes="(min-width: 1280px) 56px, (min-width: 1024px) 48px, 48px"
                  aria-hidden="true"
                  className="relative size-12 object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-110 xl:size-14"
                />
                <span className="relative text-center text-[0.72rem] leading-tight font-medium text-muted transition-colors duration-300 group-hover:text-ink">
                  {sport.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Campus life — the school's cut-out artwork, each on its own tinted plate. */}
        <Stagger className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3" stagger={0.07}>
          {beyond.gallery.map((shot, index) => (
            <StaggerItem
              key={shot.src}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-line bg-surface",
                index === 0 ? "col-span-2 aspect-16/10 md:aspect-16/9" : "aspect-4/5",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100",
                  PLATE_TINTS[index % PLATE_TINTS.length],
                )}
              />
              <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.2em] text-muted uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1200}
                height={1500}
                sizes="(min-width: 768px) 31vw, 46vw"
                data-cursor="media"
                className={cn(
                  "absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]",
                  index === 0 && "md:p-10",
                )}
              />
              <span className="absolute right-4 bottom-4 rounded-full border border-line bg-bg/70 px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.18em] text-ink uppercase backdrop-blur-sm">
                {shot.label}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
