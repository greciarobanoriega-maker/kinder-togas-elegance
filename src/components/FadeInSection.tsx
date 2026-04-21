import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function FadeInSection({
  children,
  className,
  delay = 0,
  as = "section",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div" | "article";
  id?: string;
}) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
