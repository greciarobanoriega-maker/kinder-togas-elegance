import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Left -> right curtain wipe overlay that reveals the section below.
 * Use as a thin divider between major sections.
 */
export function CurtainTransition({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-px w-full overflow-hidden", className)} aria-hidden>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/15 to-transparent"
      />
    </div>
  );
}

/**
 * Full-width cobalt sweep that animates left -> right when the section
 * scrolls in. Use as a decorative band at the top of major sections.
 */
export function CurtainSweep({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-[2px] w-full overflow-hidden", className)} aria-hidden>
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "0%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
        className="absolute inset-0 bg-primary"
      />
    </div>
  );
}
