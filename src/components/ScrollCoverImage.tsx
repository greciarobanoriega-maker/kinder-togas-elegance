import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  /** Words that rotate in the center while the color cover fades in */
  rotatingWords?: string[];
  /** Final headline shown when the color is fully solid */
  endTitle: string;
  endSubtitle?: string;
  className?: string;
}

/**
 * Cinematic scroll sequence:
 *  1. A rounded image with margins enters the viewport
 *  2. As you scroll DOWN, image scales up and a primary color cover fades in
 *  3. While the color builds, rotating words swap in the center
 *  4. Color reaches FULLY SOLID and final headline appears centered
 *  5. As the section ends, the image shrinks back with rounded corners (settled state)
 */
export function ScrollCoverImage({
  src,
  alt,
  rotatingWords = ["Tradición", "Memoria", "Orgullo", "Familia"],
  endTitle,
  endSubtitle,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Image: starts inset+rounded -> goes full bleed -> settles back inset+rounded
  const inset = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    ["56px", "0px", "0px", "72px"],
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    ["32px", "0px", "0px", "40px"],
  );
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.85, 1], [1, 1.05, 1.05, 1]);

  // Color overlay: transparent -> fully solid (1) and stays solid until the end
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.55, 1],
    [0, 1, 1],
  );

  // Final headline appears once color is solid
  const endOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const endY = useTransform(scrollYProgress, [0.7, 0.85], [20, 0]);

  // Rotating words shown while overlay builds (0.15 -> 0.7) then hide for end title
  const rotatingOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.65, 0.75],
    [0, 1, 1, 0],
  );

  const [activeWord, setActiveWord] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.15 || v > 0.7) return;
    // Map 0.15..0.7 -> 0..rotatingWords.length
    const t = (v - 0.15) / (0.7 - 0.15);
    const idx = Math.min(rotatingWords.length - 1, Math.floor(t * rotatingWords.length));
    if (idx !== activeWord) setActiveWord(idx);
  });

  return (
    <section ref={ref} className={cn("relative h-[300vh] w-full", className)}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{
            top: inset,
            bottom: inset,
            left: inset,
            right: inset,
            borderRadius: radius,
          }}
          className="absolute overflow-hidden bg-muted shadow-[var(--shadow-elevated)]"
        >
          <motion.img
            src={src}
            alt={alt}
            style={{ scale }}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {/* Solid primary color cover */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-primary"
          />

          {/* Rotating words while the cover builds */}
          <motion.div
            style={{ opacity: rotatingOpacity }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="relative h-[1.1em] overflow-hidden text-center">
              {rotatingWords.map((w, i) => (
                <motion.span
                  key={w}
                  initial={false}
                  animate={{
                    y: i === activeWord ? "0%" : i < activeWord ? "-110%" : "110%",
                    opacity: i === activeWord ? 1 : 0,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 text-balance text-5xl font-semibold tracking-tight text-primary-foreground sm:text-7xl md:text-8xl"
                >
                  {w}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Final centered text once color is fully solid */}
          <motion.div
            style={{ opacity: endOpacity, y: endY }}
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
