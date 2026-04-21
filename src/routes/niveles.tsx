import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { RevealText } from "@/components/RevealText";
import { FadeInSection } from "@/components/FadeInSection";
import { ParallaxImage } from "@/components/ParallaxImage";
import { MagneticButton } from "@/components/MagneticButton";
import { PageTransition } from "@/components/PageTransition";
import { LEVELS, formatPrice } from "@/data/levels";

export const Route = createFileRoute("/niveles")({
  head: () => ({
    meta: [
      { title: "Niveles educativos — Kinder Togas" },
      {
        name: "description",
        content:
          "Togas para Preescolar ($450), Primaria ($450) y Secundaria ($550). Diseños pensados para cada etapa.",
      },
      { property: "og:title", content: "Niveles educativos — Kinder Togas" },
      {
        property: "og:description",
        content: "Tres diseños de toga, uno para cada etapa escolar.",
      },
    ],
  }),
  component: NivelesPage,
});

function NivelesPage() {
  return (
    <PageTransition>
      <FadeInSection className="mx-auto max-w-6xl px-6 pb-12 pt-12 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Niveles educativos
        </p>
        <RevealText
          as="h1"
          text="Una toga para cada etapa."
          className="mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground">
          Tres diseños cuidadosamente pensados para acompañar a cada generación
          en su gran día.
        </p>
      </FadeInSection>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-32 px-6 pb-12">
        {LEVELS.map((lv, i) => {
          const reverse = i % 2 === 1;
          return (
            <FadeInSection
              key={lv.slug}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                reverse ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <ParallaxImage
                src={lv.image}
                alt={`Toga de ${lv.name}`}
                width={1280}
                height={1280}
                className="aspect-[4/5] rounded-[32px]"
                speed={0.3}
              />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  {lv.name}
                </p>
                <RevealText
                  as="h2"
                  text={lv.tagline}
                  className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
                />
                <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                  {lv.description}
                </p>
                <ul className="mt-6 space-y-2 text-sm text-foreground">
                  {[
                    "Toga rentada de alta calidad",
                    "Birrete rentado con borla",
                    "Estola personalizada de regalo",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-soft text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-end justify-between gap-6 rounded-3xl border border-border bg-card p-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Paquete desde
                    </p>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="mt-1 text-3xl font-semibold tracking-tight text-foreground"
                    >
                      {formatPrice(lv.price)}
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        MXN
                      </span>
                    </motion.p>
                  </div>
                  <MagneticButton
                    as="a"
                    href={`https://wa.me/5216461305987?text=${encodeURIComponent(
                      `Hola, me interesa el paquete de ${lv.name}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reservar
                  </MagneticButton>
                </div>
              </div>
            </FadeInSection>
          );
        })}
      </div>
    </PageTransition>
  );
}
