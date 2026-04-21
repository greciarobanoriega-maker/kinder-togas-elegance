import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number; // 0 = none, 1 = strong
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  speed = 0.25,
  width,
  height,
  priority,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 50}px`, `${speed * 50}px`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-3xl bg-muted", className)}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        style={{ y, scale }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
