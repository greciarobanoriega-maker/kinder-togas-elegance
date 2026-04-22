import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  words: string[];
  className?: string;
}

/**
 * Full-bleed gradient marquee band:
 *  - Sits flush at the top of the page (aligned with the header line)
 *  - Grows smoothly in HEIGHT (thickness) as you scroll DOWN, shrinks scrolling UP
 *  - Words start ABOVE the band and translate DOWNWARD with scroll, so as the
 *    band grows you progressively reveal the text instead of always seeing it
 *    centered on the gradient
 *  - Smoothed via spring for a buttery feel
 */
export function ScrollMarquee({ words, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Very heavy, "drawer-like" spring — feels like a heavy drawer that
  // slows before it slams shut on the way back up.
  const progress = useSpring(scrollYProgress, {
    stiffness: 14,
    damping: 38,
    mass: 3,
  });

  // Hold the azul band tall until 85% of the scroll, then close like a drawer
  // at the very end so the white section only appears in the last stretch.
  const height = useTransform(progress, [0, 0.45, 0.85, 1], [80, 180, 180, 0]);

  // Words travel DOWNWARD through the band as user scrolls.
  const wordsY = useTransform(progress, [0, 1], ["-60%", "30%"]);

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
        <motion.div
          style={{ y: wordsY, top: "50%" }}
          className="absolute inset-x-0 flex -translate-y-1/2 items-center"
        >
          <motion.div
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
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
        </motion.div>
      </motion.div>
    </section>
  );
}
