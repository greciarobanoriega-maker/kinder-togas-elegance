import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  words: string[];
  className?: string;
}

/**
 * Gradient marquee band that:
 *  - Scrolls its words horizontally on a loop (carousel)
 *  - Grows taller as you scroll DOWN through it
 *  - Shrinks as you scroll UP
 */
export function ScrollMarquee({ words, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Section height grows from compact -> tall as it crosses viewport
  const height = useTransform(scrollYProgress, [0, 0.5, 1], [120, 320, 200]);
  const fontSize = useTransform(scrollYProgress, [0, 0.5, 1], [48, 140, 90]);
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  // Duplicate the list so the marquee loops seamlessly
  const loop = [...words, ...words, ...words];

  return (
    <motion.section
      ref={ref}
      style={{ height }}
      className={cn(
        "relative w-full overflow-hidden",
        "bg-[linear-gradient(110deg,oklch(0.78_0.17_70)_0%,oklch(0.88_0.18_95)_45%,oklch(0.82_0.16_55)_100%)]",
        className,
      )}
    >
      <motion.div
        style={{ fontSize, skewY: skew }}
        className="flex h-full items-center"
      >
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          className="flex shrink-0 items-center whitespace-nowrap"
        >
          {loop.map((w, i) => (
            <span
              key={i}
              className="px-8 font-semibold leading-none tracking-tight text-white"
              style={{ fontFeatureSettings: '"ss01"' }}
            >
              {w}
              <span className="mx-6 inline-block h-3 w-3 translate-y-[-0.4em] rounded-full bg-white/70 align-middle" />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
