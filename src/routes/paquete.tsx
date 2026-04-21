import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Gift, Repeat, Star } from "lucide-react";

import toga from "@/assets/package-toga.jpg";
import birrete from "@/assets/package-birrete.jpg";
import estola from "@/assets/package-estola.jpg";
import { RevealText } from "@/components/RevealText";
import { FadeInSection } from "@/components/FadeInSection";
import { ParallaxImage } from "@/components/ParallaxImage";
import { MagneticButton } from "@/components/MagneticButton";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/paquete")({
  head: () => ({
    meta: [
      { title: "El paquete — Kinder Togas" },
      {
        name: "description",
        content:
          "Toga y birrete rentados para el gran día. Estola personalizada de regalo: el alumno se la lleva como recuerdo.",
      },
      { property: "og:title", content: "El paquete — Kinder Togas" },
      {
        property: "og:description",
        content: "Toga, birrete y estola personalizada en un solo paquete.",
      },
    ],
  }),
  component: PaquetePage,
});

const items = [
  {
    image: toga,
    title: "Toga",
    badge: "Rentada",
    icon: Repeat,
    text: "Toga elegante, ligera y de excelente caída. Se entrega lista para el evento y se devuelve después.",
  },
  {
    image: birrete,
    title: "Birrete",
    badge: "Rentado",
    icon: Repeat,
    text: "Birrete clásico con borla en el color que combine con la generación. Incluido en el paquete.",
  },
  {
    image: estola,
    title: "Estola personalizada",
    badge: "De regalo",
    icon: Gift,
    text: "Diseñada para ti y bordada con tu nombre o el de la generación. Te la llevas a casa como recuerdo.",
    highlight: true,
  },
];

function PaquetePage() {
  return (
    <PageTransition>
      <FadeInSection className="mx-auto max-w-5xl px-6 pt-12 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          El paquete
        </p>
        <RevealText
          as="h1"
          text="Todo lo que necesitas para el gran día."
          className="mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground">
          Toga y birrete rentados, más una estola personalizada que es un
          regalo para el alumno.
        </p>
      </FadeInSection>

      <div className="mx-auto mt-20 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border ${
                it.highlight
                  ? "shadow-[var(--shadow-elevated)] md:-translate-y-2"
                  : "shadow-[var(--shadow-soft)]"
              }`}
            >
              <ParallaxImage
                src={it.image}
                alt={it.title}
                width={1024}
                height={1280}
                className="aspect-[4/5] rounded-none"
                speed={0.15}
              />
              <div className="flex flex-1 flex-col gap-4 p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {it.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      it.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {it.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{it.text}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <FadeInSection className="mx-auto mt-32 max-w-4xl px-6">
        <div className="rounded-[40px] bg-primary px-10 py-16 text-center text-primary-foreground md:px-16">
          <Star className="mx-auto h-6 w-6" />
          <RevealText
            as="h2"
            text="La estola es el recuerdo que se queda contigo."
            className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          />
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-primary-foreground/80">
            Diseña la tuya con el bordado y los colores de tu generación. Es un
            obsequio que cierra esta etapa con cariño.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton as="link" to="/estolas" variant="ghost" className="bg-white text-primary hover:bg-white/90 border-white/0">
              Personalizar mi estola
            </MagneticButton>
          </div>
        </div>
      </FadeInSection>
    </PageTransition>
  );
}
