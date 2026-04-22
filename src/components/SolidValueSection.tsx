import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  ctaLabel: string;
  ctaTo: string;
  className?: string;
}

/**
 * Static, solid-color section that mirrors the END state of <ScrollCoverImage>.
 * Same primary background, no scroll effects — used as a calm "rest" beat
 * after the cinematic sequence.
 */
export function SolidValueSection({
  eyebrow,
  title,
  ctaLabel,
  ctaTo,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "relative mx-auto mt-2 mb-10 w-full max-w-[calc(100%-4rem)] overflow-hidden rounded-[40px] bg-primary px-8 py-24 text-primary-foreground sm:px-16 sm:py-32 md:py-40",
        className,
      )}
    >
      <div className="relative flex min-h-[50vh] flex-col">
        <div className="flex flex-1 items-center justify-center">
          <h2 className="text-balance text-center text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl">
            {title}
          </h2>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
          <p className="text-base font-semibold uppercase tracking-[0.2em] sm:text-lg">
            {eyebrow}
          </p>
          <Link
            to={ctaTo}
            className="group inline-flex items-center gap-2 text-base font-medium text-primary-foreground sm:text-lg"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
