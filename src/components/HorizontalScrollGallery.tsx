import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

interface Props {
  title: string;
  eyebrow?: string;
  items: GalleryItem[];
  className?: string;
}

export function HorizontalScrollGallery({ title, eyebrow, items, className }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for a buttery feel
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });

  // Translate the horizontal track. We move it from 0% to -((n-1)/n * 100%)
  // so the last image lands flush on screen.
  const x = useTransform(smooth, [0, 1], ["0%", "-80%"]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative hidden md:block", className)}
      style={{ height: `${items.length * 90}vh` }}
      aria-label={title}
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden bg-background">
        {/* Fixed title overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto max-w-7xl px-6 pt-10 sm:pt-14">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h2>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex h-full items-center gap-8 pl-[6vw] pr-[6vw] pt-40 sm:gap-10 md:gap-14"
        >
          {items.map((item, i) => (
            <ParallaxCard
              key={item.src + i}
              item={item}
              index={i}
              total={items.length}
              progress={smooth}
            />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-8 mx-auto h-[2px] w-[min(80%,640px)] overflow-hidden rounded-full bg-border">
          <motion.div
            style={{ scaleX: smooth, transformOrigin: "0% 50%" }}
            className="h-full w-full bg-primary"
          />
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({
  item,
  index,
  total,
  progress,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card has its "active window" within the global progress.
  const start = Math.max(0, index / total - 0.1);
  const end = Math.min(1, (index + 1) / total + 0.1);

  // Soft parallax on the inner image (counter-moves slightly)
  const imgX = useTransform(progress, [start, end], ["8%", "-8%"]);
  const imgScale = useTransform(progress, [start, (start + end) / 2, end], [1.08, 1.0, 1.08]);

  return (
    <div className="relative h-[62vh] w-[min(75vw,560px)] flex-shrink-0 overflow-hidden rounded-3xl bg-muted shadow-[var(--shadow-soft)] ring-1 ring-border">
      <motion.img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        style={{ x: imgX, scale: imgScale }}
        className="h-full w-full object-cover"
      />
      {item.caption ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <p className="text-sm font-medium text-white">{item.caption}</p>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Mobile fallback: simple horizontal touch carousel (snap), no pin.
 */
export function HorizontalScrollGalleryMobile({
  title,
  eyebrow,
  items,
  className,
}: Props) {
  return (
    <section className={cn("md:hidden", className)} aria-label={title}>
      <div className="mx-auto max-w-7xl px-6">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </div>

      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <div
            key={item.src + i}
            className="relative aspect-[3/4] w-[78vw] flex-shrink-0 snap-center overflow-hidden rounded-3xl bg-muted ring-1 ring-border"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {item.caption ? (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <p className="text-sm font-medium text-white">{item.caption}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
