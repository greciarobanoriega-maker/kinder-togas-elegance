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

  // Section grows in WIDTH (via horizontal inset) and a bit in HEIGHT
  // 0 -> compact (with side margins), 0.5 -> full bleed + tall, 1 -> compact again
  const sideInset = useTransform(scrollYProgress, [0, 0.5, 1], ["48px", "0px", "32px"]);
  const height = useTransform(scrollYProgress, [0, 0.5, 1], [140, 240, 180]);
  const radius = useTransform(scrollYProgress, [0, 0.5, 1], ["32px", "0px", "24px"]);

  // Duplicate the list so the marquee loops seamlessly
  const loop = [...words, ...words, ...words];

  return (
    <section
      ref={ref}
      className={cn("relative w-full", className)}
    >
      <motion.div
        style={{
          marginLeft: sideInset,
          marginRight: sideInset,
          height,
          borderRadius: radius,
        }}
        className="relative overflow-hidden bg-[linear-gradient(110deg,var(--primary)_0%,color-mix(in_oklab,var(--primary)_70%,white)_50%,var(--primary)_100%)]"
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
