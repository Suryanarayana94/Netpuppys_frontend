"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { ScaleOnScroll } from "@/components/motion/parallax";
import { Reveal, SplitText } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { Marquee } from "@/components/ui/marquee";
import { contact, hero, site } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";
import { scrollToSection } from "@/lib/smooth-scroll";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  /* The scrim thickens as the hero leaves, so the marquee below stays readable. */
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.85], [0.55, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Welcome to Tulas International School"
      className="grain relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-[#0e0c0a] text-[#f7f2e8] md:min-h-[100svh]"
    >
      {/* Background plate */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <ScaleOnScroll className="h-full w-full">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </ScaleOnScroll>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: scrimOpacity }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_20%_15%,rgba(14,12,10,0.25),rgba(14,12,10,0.92))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-[#0e0c0a] via-[#0e0c0a]/70 to-transparent"
      />

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="shell relative pt-32 pb-8 md:pt-40 md:pb-10"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md">
            <span aria-hidden="true" className="relative grid size-2 place-items-center">
              <span className="animate-pulse-ring absolute size-2 rounded-full bg-leaf" />
              <span className="size-2 rounded-full bg-leaf" />
            </span>
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              {hero.eyebrow}
            </span>
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.2em] text-white/60 uppercase">
            Est. {site.established} · {site.trust}
          </span>
        </motion.div>

        <h1 className="mt-7 font-display leading-[0.92] font-medium tracking-[-0.04em] text-[clamp(2.9rem,12.5vw,10.5rem)]">
          <SplitText
            text={hero.titleLines[0]}
            className="block"
            wordClassName="pr-2"
            delay={0.45}
            stagger={0.075}
          />
          <SplitText
            text={hero.titleLines[1]}
            className="block italic text-gold"
            wordClassName="pr-2"
            delay={0.62}
            stagger={0.075}
          />
        </h1>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal delay={0.85} y={18}>
            <p className="max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{hero.lead}</p>
          </Reveal>

          <Reveal delay={0.98} y={18} className="flex flex-wrap items-center gap-3 lg:justify-end">
            <ActionLink href={hero.primaryCta.href} size="lg" cursorLabel="Apply">
              {hero.primaryCta.label}
            </ActionLink>
            <ActionLink
              href={hero.secondaryCta.href}
              variant="outline"
              size="lg"
              magnetic={false}
              className="border-white/30 text-white hover:border-gold hover:text-gold"
            >
              {hero.secondaryCta.label}
            </ActionLink>
            <a
              href={`tel:${contact.helpline}`}
              data-cursor="link"
              className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.16em] text-white/60 uppercase transition-colors hover:text-gold lg:ml-2"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
              {contact.helplineDisplay}
            </a>
          </Reveal>
        </div>
      </motion.div>

      <div className="relative border-t border-white/15 bg-[#0e0c0a]/70 py-5 backdrop-blur-sm">
        <Marquee
          duration={44}
          items={hero.marquee.map((item) => (
            <span
              key={item}
              className="font-display text-lg tracking-tight text-white/80 uppercase md:text-xl"
            >
              {item}
            </span>
          ))}
          fade={false}
        />
      </div>

      <motion.a
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection("about");
        }}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-label="Scroll to About TIS"
        data-cursor="link"
        className="absolute top-1/2 right-6 hidden -translate-y-1/2 items-center gap-3 lg:flex"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="font-mono text-[0.62rem] tracking-[0.3em] text-white/50 uppercase">Scroll</span>
        <span aria-hidden="true" className="relative block h-16 w-px overflow-hidden bg-white/20">
          <motion.span
            animate={reduceMotion ? undefined : { y: ["-100%", "100%"] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-gold"
          />
        </span>
      </motion.a>
    </section>
  );
}
