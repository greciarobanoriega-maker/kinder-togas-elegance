import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
  /** Color of the unfilled (base) text */
  baseClassName?: string;
  /** Color of the filled (karaoke) text */
  fillClassName?: string;
}

/**
 * Word-by-word karaoke text reveal driven by scroll progress.
 * As the user scrolls down through the section, each word fills in;
 * scrolling up reverses the fill.
 */
export function KaraokeText({
  text,
  className,
  baseClassName = "text-foreground/15",
  fillClassName = "text-foreground",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("relative", className)}>
      <p className={cn("relative leading-[1.15]", baseClassName)}>
        {words.map((w, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <Word
              key={i}
              word={w}
              start={start}
              end={end}
              progress={smooth}
              fillClassName={fillClassName}
              isLast={i === words.length - 1}
            />
          );
        })}
      </p>
    </div>
  );
}

function Word({
  word,
  start,
  end,
  progress,
  fillClassName,
  isLast,
}: {
  word: string;
  start: number;
  end: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  fillClassName: string;
  isLast: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [4, 0]);
  return (
    <span className="relative inline-block">
      <span aria-hidden className="invisible">
        {word}
        {!isLast && "\u00A0"}
      </span>
      <motion.span
        style={{ opacity, y }}
        className={cn("absolute inset-0", fillClassName)}
      >
        {word}
        {!isLast && "\u00A0"}
      </motion.span>
    </span>
  );
}
