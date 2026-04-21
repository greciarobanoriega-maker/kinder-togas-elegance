import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import crayola from "@/assets/stole-crayola.jpg";
import multicolor from "@/assets/stole-multicolor.jpg";
import lapiz from "@/assets/stole-lapiz.jpg";
import { RevealText } from "@/components/RevealText";
import { FadeInSection } from "@/components/FadeInSection";
import { ParallaxImage } from "@/components/ParallaxImage";
import { MagneticButton } from "@/components/MagneticButton";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/estolas")({
  head: () => ({
    meta: [
      { title: "Estolas personalizadas — Kinder Togas" },
      {
        name: "description",
        content:
          "Diseños Crayola, Multicolor y Lápiz. Colores Plata, Oro, Negro, Rojo, Azul Rey y más. Diseña la estola de tu generación.",
      },
      { property: "og:title", content: "Estolas personalizadas — Kinder Togas" },
      {
        property: "og:description",
        content: "Tres diseños y una paleta amplia para crear una estola única.",
      },
    ],
  }),
  component: EstolasPage,
});

const designs = [
  {
    name: "Crayola",
    image: crayola,
    description: "Ilustraciones tipo crayón, frescas y juveniles.",
  },
  {
    name: "Multicolor",
    image: multicolor,
    description: "Patrón geométrico vibrante para destacar.",
  },
  {
    name: "Lápiz",
    image: lapiz,
    description: "Trazo a lápiz, sobrio y editorial.",
  },
];

const colors = [
  { name: "Plata", hex: "#C0C0C0" },
  { name: "Oro", hex: "#D4AF37" },
  { name: "Negro", hex: "#1D1D1F" },
  { name: "Rojo", hex: "#B91C1C" },
  { name: "Azul Rey", hex: "#1E3A8A" },
  { name: "Verde", hex: "#15803D" },
  { name: "Vino", hex: "#7F1D1D" },
  { name: "Rosa", hex: "#DB2777" },
  { name: "Blanco", hex: "#FFFFFF" },
];

function EstolasPage() {
  return (
    <PageTransition>
      <FadeInSection className="mx-auto max-w-5xl px-6 pt-12 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Estolas personalizadas
        </p>
        <RevealText
          as="h1"
          text="Diseña la estola de tu generación."
          className="mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground">
          Elige un diseño, combina los colores y agrega el bordado de tu
          escuela. Tu estola es para siempre.
        </p>
      </FadeInSection>

      <FadeInSection className="mx-auto mt-20 max-w-6xl px-6">
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Diseños disponibles
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {designs.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group overflow-hidden rounded-3xl bg-card ring-1 ring-border shadow-[var(--shadow-soft)]"
            >
              <ParallaxImage
                src={d.image}
                alt={`Diseño ${d.name}`}
                width={1024}
                height={1280}
                className="aspect-[4/5] rounded-none"
                speed={0.2}
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {d.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto mt-24 max-w-6xl px-6">
        <div className="rounded-[40px] border border-border bg-card p-10 md:p-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Paleta de colores
          </p>
          <RevealText
            as="h2"
            text="Encuentra el color perfecto."
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          />
          <div className="mt-10 flex flex-wrap gap-6">
            {colors.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col items-center gap-2"
              >
                <span
                  className="h-16 w-16 rounded-full ring-1 ring-border shadow-[var(--shadow-soft)] transition-transform group-hover:scale-105"
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
                <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  {c.name}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <MagneticButton
              as="a"
              href="https://wa.me/5216461305987?text=Hola,%20quiero%20personalizar%20mi%20estola."
              target="_blank"
              rel="noopener noreferrer"
            >
              Personalizar mi estola
            </MagneticButton>
          </div>
        </div>
      </FadeInSection>
    </PageTransition>
  );
}
