import Image from "next/image";

import { Reveal, SplitText } from "@/components/motion/reveal";
import { Marquee } from "@/components/ui/marquee";
import { testimonials } from "@/data/site";

type Review = (typeof testimonials.items)[number];

const HALF = Math.ceil(testimonials.items.length / 2);
const ROW_A = testimonials.items.slice(0, HALF);
const ROW_B = testimonials.items.slice(HALF);

export function Testimonials() {
  return (
    <section id="voices" className="scroll-mt-24 overflow-hidden border-t border-line bg-bg py-20 md:py-32">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <h2 className="font-display text-[clamp(2.1rem,5.4vw,3.9rem)] leading-[1.03] tracking-[-0.03em] text-balance">
            <SplitText text={testimonials.lead} />
          </h2>

          <Reveal delay={0.2} className="flex items-start gap-5">
            <Image
              src="/images/ui/reviews-bg.webp"
              alt=""
              width={416}
              height={270}
              sizes="96px"
              aria-hidden="true"
              className="w-24 shrink-0 rounded-xl object-contain opacity-80"
            />
            <div>
              <p className="eyebrow">{testimonials.eyebrow}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Unedited reviews left on Google by families across India — the clearest picture of what life at TIS
                feels like day to day.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 space-y-4 md:mt-20 md:space-y-5">
        <Marquee duration={62} items={ROW_A.map((review) => <ReviewCard key={review.name} review={review} />)} separator={null} pauseOnHover />
        <Marquee
          duration={68}
          reverse
          items={ROW_B.map((review) => <ReviewCard key={review.name} review={review} />)}
          separator={null}
          pauseOnHover
        />
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="mx-1.5 flex w-[19rem] shrink-0 flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-400 hover:border-gold/40 sm:w-[22rem]">
      <div className="flex items-center gap-3">
        <Image
          src={review.image}
          alt=""
          width={200}
          height={200}
          sizes="40px"
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <figcaption className="min-w-0">
          <p className="truncate text-sm font-medium">{review.name}</p>
          <p className="truncate font-mono text-[0.62rem] tracking-[0.14em] text-subtle uppercase">
            {review.relation}
          </p>
        </figcaption>
      </div>

      <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
    </figure>
  );
}
