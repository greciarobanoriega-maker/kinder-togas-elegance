import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { RevealText } from "@/components/RevealText";

export interface ReverseScrollGalleryItem {
  src: string;
  alt: string;
}

interface ReverseScrollGalleryProps {
  eyebrow?: string;
  title: string;
  description?: string;
  columns: [
    ReverseScrollGalleryItem[],
    ReverseScrollGalleryItem[],
    ReverseScrollGalleryItem[],
  ];
  className?: string;
}

/**
 * 3-column "reverse scroll" gallery.
 *
 * Outer columns (1 & 3) drift DOWN as the user scrolls down the page,
 * the center column (2) drifts UP — creating a counter-flow rhythm.
 *
 * Each column starts at a slightly different vertical offset so the
 * grid never looks perfectly aligned. Apple-style: white background,
 * generous gaps, soft rounded corners.
 */
export function ReverseScrollGallery({
  eyebrow = "Galería",
  title,
  description,
  columns,
  className,
}: ReverseScrollGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Outer columns drift down, center column drifts up. Different magnitudes
  // so the parallax feels organic instead of mechanical.
  const yLeft = useTransform(scrollYProgress, [0, 1], ["-8%", "14%"]);
  const yCenter = useTransform(scrollYProgress, [0, 1], ["12%", "-16%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["-4%", "18%"]);

  const columnTransforms = [yLeft, yCenter, yRight] as const;
  // Initial vertical offsets so columns aren't aligned at the top.
  const initialOffsets = ["mt-0", "mt-24", "mt-12"] as const;

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative mx-auto mt-32 max-w-7xl overflow-hidden bg-background px-6 sm:mt-40",
        className,
      )}
    >
      <div className="mx-auto mb-16 max-w-2xl text-center">
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

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-14">
        {columns.map((items, colIndex) => (
          <motion.div
            key={colIndex}
            style={{ y: columnTransforms[colIndex] }}
            className={cn(
              "flex flex-col gap-8 sm:gap-10 md:gap-14 will-change-transform",
              // Only apply the staggered initial offsets on md+ so the mobile
              // single column stays clean.
              "md:" + initialOffsets[colIndex],
              colIndex === 0 && "md:mt-0",
              colIndex === 1 && "md:mt-24",
              colIndex === 2 && "md:mt-12",
            )}
          >
            {items.map((item, i) => (
              <figure
                key={`${colIndex}-${i}`}
                className="overflow-hidden rounded-[32px] bg-muted shadow-[var(--shadow-soft)] ring-1 ring-border"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </figure>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ReverseScrollGallery;
