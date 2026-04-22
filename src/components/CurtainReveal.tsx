import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { RevealText } from "@/components/RevealText";

interface CurtainRevealProps {
  eyebrow?: string;
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

/**
 * Two solid color panels (left + right) that slide horizontally outward
 * as the user scrolls into the section, revealing a centered image / message.
 *
 * Uses scroll-linked progress so the open/close feels weighty (low stiffness),
 * matching the K-minimal aesthetic of the rest of the site.
 */
export function CurtainReveal({
  eyebrow = "Detrás del telón",
  title,
  description,
  imageSrc,
  imageAlt = "",
  className,
}: CurtainRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "center center"],
  });

  // Curtains stay closed (0%) at the start, then slide outward (-100% / 100%).
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Center content gently scales / fades up as the curtains part.
  const contentScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.6, 1]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative mx-auto mt-32 max-w-7xl px-6 sm:mt-40",
        className,
      )}
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </p>
        <RevealText
          as="h2"
          text={title}
          className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        />
        {description ? (
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[40px] bg-muted shadow-[var(--shadow-elevated)] ring-1 ring-border">
        {/* Center reveal */}
        <motion.div
          style={{ scale: contentScale, opacity: contentOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-card px-6 text-center">
              <p className="max-w-xl text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {title}
              </p>
            </div>
          )}
        </motion.div>

        {/* Left curtain */}
        <motion.div
          style={{ x: leftX }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
          className="absolute inset-y-0 left-0 z-10 w-1/2 bg-primary"
          aria-hidden
        />
        {/* Right curtain */}
        <motion.div
          style={{ x: rightX }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
          className="absolute inset-y-0 right-0 z-10 w-1/2 bg-primary-soft"
          aria-hidden
        />

        {/* Subtle seam highlight while curtains are visible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-20 -ml-px w-px bg-foreground/10"
        />
      </div>
    </section>
  );
}

export default CurtainReveal;
