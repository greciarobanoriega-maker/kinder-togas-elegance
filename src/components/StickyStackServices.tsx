import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Shirt, Gift, Sparkles, ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { RevealText } from "@/components/RevealText";

type Service = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  Icon: LucideIcon;
  to: string;
  ctaLabel: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Renta de Togas",
    description:
      "Togas impecables, perfectamente entalladas y listas para el gran día. Cuidamos cada talla y cada detalle.",
    bullets: ["Tallas para preescolar, primaria y secundaria", "Entrega y recolección coordinadas", "Tela premium, planchada"],
    Icon: Shirt,
    to: "/niveles",
    ctaLabel: "Ver niveles",
  },
  {
    number: "02",
    title: "Paquetes de Graduación",
    description:
      "Toga, birrete y estola personalizada en un solo paquete. La estola es de regalo: el alumno se la lleva a casa para siempre.",
    bullets: ["Toga rentada de alta calidad", "Birrete con borla incluido", "Estola personalizada de regalo"],
    Icon: Gift,
    to: "/paquete",
    ctaLabel: "Ver el paquete",
  },
  {
    number: "03",
    title: "Accesorios",
    description:
      "Detalles que completan el recuerdo: estolas bordadas, borlas, listones y complementos para que cada generación brille.",
    bullets: ["Estolas bordadas a medida", "Borlas y listones por color", "Personalización por generación"],
    Icon: Sparkles,
    to: "/accesorios",
    ctaLabel: "Ver accesorios",
  },
];

export function StickyStackServices() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40">
      <div className="mx-auto mb-20 max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
          Nuestros servicios
        </p>
        <RevealText
          as="h2"
          text="Todo lo que tu generación necesita."
          className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Tres servicios pensados para que el día de la graduación se sienta
          impecable, sin estrés y con un recuerdo que dura para siempre.
        </p>
      </div>

      {/* Sticky stack track */}
      <div className="relative">
        {SERVICES.map((service, index) => (
          <StickyCard
            key={service.number}
            service={service}
            index={index}
            total={SERVICES.length}
          />
        ))}
      </div>
    </section>
  );
}

function StickyCard({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track this card's progress as it scrolls past the sticky position.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start center", "end start"],
  });

  // Each card scales down and dims slightly as the next card covers it.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Stack offset — each card sits a bit further down than the previous one.
  const topOffset = 96 + index * 16; // px
  const isLast = index === total - 1;

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        // Add bottom spacing so the user has scroll distance per card.
        marginBottom: isLast ? 0 : "20vh",
      }}
    >
      <motion.div
        style={{
          position: "sticky",
          top: `${topOffset}px`,
          scale,
          opacity,
          y,
          zIndex: index + 1,
        }}
      >
        <ServiceCard service={service} index={index} progress={scrollYProgress} />
      </motion.div>
    </div>
  );
}

function ServiceCard({
  service,
  index,
  progress,
}: {
  service: Service;
  index: number;
  progress: MotionValue<number>;
}) {
  // Subtle entrance lift when the card first arrives at the sticky position.
  const lift = useTransform(progress, [0, 0.05], [16, 0]);
  const enterOpacity = useTransform(progress, [0, 0.05], [0.85, 1]);
  const { Icon } = service;

  return (
    <motion.article
      style={{ y: lift, opacity: enterOpacity }}
      className="group relative overflow-hidden rounded-[40px] bg-card p-8 ring-1 ring-border shadow-[var(--shadow-soft)] sm:p-12 md:p-16"
    >
      {/* Soft gradient accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-soft blur-3xl"
      />

      <div className="relative grid items-start gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Servicio {service.number}
            </span>
          </div>

          <h3 className="mt-8 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {service.title}
          </h3>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {service.description}
          </p>

          <ul className="mt-8 grid gap-2.5">
            {service.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-sm text-foreground/80"
              >
                <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              to={service.to}
              className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              {service.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Big number — quiet K-minimal accent */}
        <div className="hidden md:block">
          <span
            aria-hidden
            className="select-none text-[10rem] font-semibold leading-none tracking-tighter text-foreground/5"
          >
            {service.number}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default StickyStackServices;
