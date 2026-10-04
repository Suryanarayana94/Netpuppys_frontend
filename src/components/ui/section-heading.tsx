import { SplitText } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  /** Smaller display size for sections where the title is a full sentence. */
  size?: "md" | "lg" | "xl";
};

const SIZES = {
  md: "text-[clamp(1.9rem,4.4vw,3.1rem)]",
  lg: "text-[clamp(2.2rem,5.6vw,4rem)]",
  xl: "text-[clamp(2.6rem,7.4vw,5.5rem)]",
} as const;

/**
 * Shared section header: mono eyebrow, masked display title, muted lead.
 * The title animates word-by-word so every section opens the same way.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  size = "lg",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex items-center gap-4", align === "center" && "justify-center")}>
        <span aria-hidden="true" className="h-px w-8 bg-gold" />
        <p className="eyebrow">{eyebrow}</p>
      </div>

      <SplitText
        text={title}
        className={cn("block font-display leading-[1.02] tracking-[-0.03em] text-balance", SIZES[size])}
      />

      {lead ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
