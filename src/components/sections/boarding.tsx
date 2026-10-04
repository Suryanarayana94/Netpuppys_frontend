import Image from "next/image";

import { Parallax } from "@/components/motion/parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, contact, enquiry } from "@/data/site";

const BOARDING_FACTS = [
  { value: "24×7", label: "Medical assistance on campus" },
  { value: "6:1", label: "Student teacher ratio" },
  { value: "22", label: "Acre pollution free campus" },
  { value: "IV–XII", label: "Classes for boarding students" },
] as const;

const BOARDING_POINTS = [
  {
    title: "Supervised, round the clock",
    body: "Houseparents, medical cover and a structured daily routine — so the first time away from home feels like a step up, not a leap.",
  },
  {
    title: "Space to move and think",
    body: "A 22-acre pollution free campus gives boarders room for sport, for quiet study, and for the kind of conversation that only happens outside a classroom.",
  },
  {
    title: "A community, not a dorm",
    body: "Students from across India live, learn and compete together — the friendships and independence that carry well beyond school.",
  },
] as const;

export function Boarding() {
  return (
    <section id="boarding" className="shell scroll-mt-24 py-20 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Boarding Life"
            title="A home away from home, taken seriously"
            lead={about.pillars[1].body}
            size="lg"
          />

          <Reveal delay={0.2} className="mt-9">
            <ActionLink href="#enquire" variant="outline">
              Book a campus visit
            </ActionLink>
          </Reveal>

          <Reveal
            delay={0.3}
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-[var(--line)]"
          >
            {BOARDING_FACTS.map((fact) => (
              <div key={fact.label} className="bg-bg p-5">
                <p className="font-display text-3xl leading-none tracking-tight text-gold">{fact.value}</p>
                <p className="mt-2 text-[0.78rem] leading-snug text-muted">{fact.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div>
          {/* Campus photo with the school's polo cut-out breaking the frame. */}
          <div className="relative">
            <Parallax distance={70} className="overflow-hidden rounded-3xl border border-line">
              <Image
                src="/images/hero/campus-aerial.webp"
                alt="Aerial view of the Tulas International School campus"
                width={1920}
                height={1080}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="aspect-4/3 w-full object-cover object-[60%_65%]"
              />
            </Parallax>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -bottom-10 hidden w-40 md:block lg:w-52"
            >
              <Image
                src="/images/hero/gallery-4.webp"
                alt=""
                width={1317}
                height={1920}
                sizes="208px"
                className="w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>

          <Stagger
            className="mt-10 space-y-px overflow-hidden rounded-2xl border border-line bg-[var(--line)]"
            stagger={0.07}
          >
            {BOARDING_POINTS.map((point, index) => (
              <StaggerItem key={point.title} className="group bg-bg p-7 transition-colors duration-400 hover:bg-surface">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.65rem] tracking-[0.2em] text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl leading-tight tracking-tight md:text-2xl">
                    {point.title}
                  </h3>
                </div>
                <p className="mt-3 pl-9 text-sm leading-relaxed text-muted">{point.body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15} className="mt-10 rounded-2xl border border-line bg-surface p-7">
            <p className="text-sm leading-relaxed text-muted">
              Classes {enquiry.classes[0]?.replace("Class ", "")} to{" "}
              {enquiry.classes.at(-1)?.replace("Class ", "")} accept boarding applications for the current session. Call
              the admission helpline on{" "}
              <a
                href={`tel:${contact.helpline}`}
                data-cursor="link"
                className="text-gold underline underline-offset-4"
              >
                {contact.helplineDisplay}
              </a>{" "}
              or apply online in a few minutes.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
