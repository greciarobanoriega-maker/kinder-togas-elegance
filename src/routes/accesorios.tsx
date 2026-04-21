import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import borlitas from "@/assets/acc-borlitas.jpg";
import medallas from "@/assets/acc-medallas.jpg";
import peluches from "@/assets/acc-peluches.jpg";
import camisetas from "@/assets/acc-camisetas.jpg";
import { RevealText } from "@/components/RevealText";
import { FadeInSection } from "@/components/FadeInSection";
import { MagneticButton } from "@/components/MagneticButton";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/accesorios")({
  head: () => ({
    meta: [
      { title: "Accesorios — Kinder Togas" },
      {
        name: "description",
        content:
          "Borlitas Recuerdo 2026, medallas de acrílico, peluches de graduación y camisetas. Detalles para una graduación inolvidable.",
      },
      { property: "og:title", content: "Accesorios — Kinder Togas" },
      {
        property: "og:description",
        content: "Detalles que hacen única la graduación de tu generación.",
      },
    ],
  }),
  component: AccesoriosPage,
});

const items = [
  {
    image: borlitas,
    name: "Borlitas Recuerdo 2026",
    description: "Pequeñas borlas conmemorativas en colores variados.",
  },
  {
    image: medallas,
    name: "Medallas de Acrílico",
    description: "Medallas grabadas con cinta a juego con la generación.",
  },
  {
    image: peluches,
    name: "Peluches de Graduación",
    description: "Tiernos osos con toga y birrete, regalo perfecto.",
  },
  {
    image: camisetas,
    name: "Camisetas",
    description: "Playeras conmemorativas en cortes modernos.",
  },
];

function AccesoriosPage() {
  return (
    <PageTransition>
      <FadeInSection className="mx-auto max-w-5xl px-6 pt-12 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Accesorios
        </p>
        <RevealText
          as="h1"
          text="Detalles que cuentan la historia."
          className="mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground">
          Complementa el paquete con recuerdos pensados para durar.
        </p>
      </FadeInSection>

      <div className="mx-auto mt-20 grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.article
            key={it.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-3xl bg-card ring-1 ring-border shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-elevated)]"
          >
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={it.image}
                alt={it.name}
                width={1280}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </div>
            <div className="p-6">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {it.name}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{it.description}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <FadeInSection className="mx-auto mt-32 max-w-3xl px-6 text-center">
        <RevealText
          as="h2"
          text="¿Necesitas algo especial?"
          className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        />
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Trabajamos pedidos personalizados para escuelas y generaciones.
          Cuéntanos qué tienes en mente.
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticButton
            as="a"
            href="https://wa.me/5216461305987"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </MagneticButton>
        </div>
      </FadeInSection>
    </PageTransition>
  );
}
