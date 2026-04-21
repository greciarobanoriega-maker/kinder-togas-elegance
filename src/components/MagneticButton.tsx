import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  strength?: number;
}

interface AsButton extends BaseProps {
  as?: "button";
  onClick?: () => void;
  type?: "button" | "submit";
}

interface AsLink extends BaseProps {
  as: "link";
  to: string;
}

interface AsAnchor extends BaseProps {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
}

type Props = AsButton | AsLink | AsAnchor;

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-elevated)]",
  ghost:
    "bg-transparent text-foreground border border-border hover:bg-muted/60",
};

export function MagneticButton(props: Props) {
  const { children, variant = "primary", className, strength = 0.35 } = props;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors",
        styles[variant],
        className,
      )}
    >
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >
      {props.as === "link" ? (
        <Link to={props.to}>{inner}</Link>
      ) : props.as === "a" ? (
        <a href={props.href} target={props.target} rel={props.rel}>
          {inner}
        </a>
      ) : (
        <button type={props.type ?? "button"} onClick={props.onClick}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
