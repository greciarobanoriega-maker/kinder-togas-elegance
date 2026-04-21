import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/niveles", label: "Niveles" },
  { to: "/paquete", label: "Paquete" },
  { to: "/estolas", label: "Estolas" },
  { to: "/accesorios", label: "Accesorios" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/60 px-3 py-2 backdrop-blur-xl transition-all",
          scrolled
            ? "shadow-[var(--shadow-glass)]"
            : "shadow-[0_1px_0_oklch(1_0_0_/_0.6)_inset]",
        )}
      >
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold tracking-tight text-foreground"
          aria-label="Kinder Togas — Inicio"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-semibold">
            KT
          </span>
          <span className="hidden sm:inline">Kinder Togas</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground bg-muted/70" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/contacto"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 md:inline-flex"
          >
            Reservar
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute left-4 right-4 top-20 rounded-3xl border border-white/40 bg-white/85 p-3 backdrop-blur-2xl shadow-[var(--shadow-elevated)] md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                    activeProps={{ className: "bg-muted" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
