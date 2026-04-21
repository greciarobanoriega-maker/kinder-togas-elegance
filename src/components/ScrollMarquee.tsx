import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  words: string[];
  className?: string;
}

/**
 * Full-bleed gradient marquee band that:
 *  - Scrolls its words horizontally on a loop (carousel) at a FIXED font size
 *  - Grows WIDER (and slightly taller) as you scroll DOWN through it
 *  - Shrinks as you scroll UP
 *  - Uses theme tokens (primary -> primary-soft) for the gradient
 */
export function ScrollMarquee({ words, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Band is ALWAYS full-bleed (edge to edge). Only the HEIGHT (thickness)
  // changes with scroll: thinner at entry/exit, taller in the middle.
  const height = useTransform(scrollYProgress, [0, 0.5, 1], [120, 260, 150]);

  // Duplicate the list so the marquee loops seamlessly
  const loop = [...words, ...words, ...words];

  return (
    <section
      ref={ref}
      className={cn("relative w-screen left-1/2 right-1/2 -translate-x-1/2", className)}
    >
      <motion.div
        style={{ height }}
        className="relative w-full overflow-hidden bg-[linear-gradient(110deg,var(--primary)_0%,color-mix(in_oklab,var(--primary)_70%,white)_50%,var(--primary)_100%)]"
      >
        <div className="flex h-full items-center">
          <motion.div
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            className="flex shrink-0 items-center whitespace-nowrap"
          >
            {loop.map((w, i) => (
              <span
                key={i}
                className="px-8 text-5xl font-semibold leading-none tracking-tight text-primary-foreground sm:text-6xl md:text-7xl"
              >
                {w}
                <span className="mx-6 inline-block h-2.5 w-2.5 translate-y-[-0.4em] rounded-full bg-primary-foreground/70 align-middle" />
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
