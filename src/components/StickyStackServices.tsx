import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    bullets: [
      "Tallas para preescolar, primaria y secundaria",
      "Entrega y recolección coordinadas",
      "Tela premium, planchada",
    ],
    Icon: Shirt,
    to: "/niveles",
    ctaLabel: "Ver niveles",
  },
  {
    number: "02",
    title: "Paquetes de Graduación",
    description:
      "Toga, birrete y estola personalizada en un solo paquete. La estola es de regalo: el alumno se la lleva a casa para siempre.",
    bullets: [
      "Toga rentada de alta calidad",
      "Birrete con borla incluido",
      "Estola personalizada de regalo",
    ],
    Icon: Gift,
    to: "/paquete",
    ctaLabel: "Ver el paquete",
  },
  {
    number: "03",
    title: "Accesorios",
    description:
      "Detalles que completan el recuerdo: estolas bordadas, borlas, listones y complementos para que cada generación brille.",
    bullets: [
      "Estolas bordadas a medida",
      "Borlas y listones por color",
      "Personalización por generación",
    ],
    Icon: Sparkles,
    to: "/accesorios",
    ctaLabel: "Ver accesorios",
  },
];

// Vertical pixel offset between stacked cards (very tight, like the reference image).
const CARD_GAP_PX = 14;
// Distance the user has to scroll *per card* to advance one full transition.
const PER_CARD_VH = 85;

export function StickyStackServices() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-32 sm:pt-40">
      <div className="mx-auto mb-16 max-w-3xl text-center">
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

      {/* Pinned scroll track — total height drives how long the stack takes. */}
      <div
        ref={sectionRef}
        className="relative"
        style={{
          height: `${SERVICES.length * PER_CARD_VH + 40}vh`,
        }}
      >
        {SERVICES.map((service, index) => (
          <StackedCard
            key={service.number}
            service={service}
            index={index}
            total={SERVICES.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function StackedCard({
  service,
  index,
  total,
  scrollYProgress,
}: {
  service: Service;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each card owns a slice of overall progress.
  // Card i is "active" between i/total and (i+1)/total.
  const start = index / total;
  const end = (index + 1) / total;

  // While THIS card's slice is in progress, the NEXT card slides up over it.
  // So this card scales down + dims + lifts slightly during its own slice
  // (which is exactly when the next card is covering it).
  // The last card never gets covered, so it stays at rest.
  const isLast = index === total - 1;

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, isLast ? 1 : 0.9],
  );
  // Keep cards fully opaque so the colors don't look washed out / transparent.
  const opacity = useTransform(scrollYProgress, [start, end], [1, 1]);
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [0, isLast ? 0 : -24],
  );

  // Sticky offset — each card sits just a hair below the previous one.
  const topOffset = 80 + index * CARD_GAP_PX;

  return (
    <div
      className="sticky"
      style={{
        top: `${topOffset}px`,
        // Each card occupies one slice of the track height.
        height: `${100 / total}%`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
          transformOrigin: "center top",
        }}
        className="will-change-transform"
      >
        <ServiceCard service={service} index={index} total={total} />
      </motion.div>
    </div>
  );
}

function ServiceCard({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  const { Icon } = service;
  const isLast = index === total - 1;

  return (
    <article
      className="relative overflow-hidden rounded-[40px] bg-card p-8 ring-1 ring-border shadow-[var(--shadow-elevated)] sm:p-12 md:p-16"
      style={{
        // Slight tonal shift so stacked edges read as separate layers.
        backgroundColor: isLast
          ? undefined
          : `color-mix(in oklab, var(--card) ${100 - index * 2}%, var(--foreground) ${index * 2}%)`,
      }}
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
    </article>
  );
}

export default StickyStackServices;
