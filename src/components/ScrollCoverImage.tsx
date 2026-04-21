import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  /** Title shown over the solid color at the end of the sequence */
  endTitle: string;
  endSubtitle?: string;
  className?: string;
}

/**
 * Cinematic scroll sequence:
 *  1. A rounded image with margins enters the viewport
 *  2. As you scroll down, the image scales up and a cobalt color layer fades in
 *  3. The image becomes full-bleed (covers the entire viewport)
 *  4. The color layer turns fully solid and a different headline appears centered
 */
export function ScrollCoverImage({
  src,
  alt,
  endTitle,
  endSubtitle,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Image goes from inset (with margins + rounded) to full-bleed
  const inset = useTransform(scrollYProgress, [0, 0.7], ["48px", "0px"]);
  const radius = useTransform(scrollYProgress, [0, 0.7], ["32px", "0px"]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 1.05]);

  // Color overlay fades from transparent -> fully solid cobalt
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.75, 1], [0, 0.7, 1]);

  // End text fades in only at the very end
  const textOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.85, 1], [24, 0]);

  return (
    <section ref={ref} className={cn("relative h-[260vh] w-full", className)}>
      {/* Sticky stage that holds the visual */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ top: inset, bottom: inset, left: inset, right: inset, borderRadius: radius }}
          className="absolute overflow-hidden bg-muted"
        >
          <motion.img
            src={src}
            alt={alt}
            style={{ scale }}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Cobalt color cover */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-primary"
          />

          {/* End-state centered text */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-primary-foreground sm:text-6xl md:text-7xl">
              {endTitle}
            </h2>
            {endSubtitle && (
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                {endSubtitle}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
