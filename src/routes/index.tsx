import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Gift } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import { RevealText } from "@/components/RevealText";
import { FadeInSection } from "@/components/FadeInSection";
import { MagneticButton } from "@/components/MagneticButton";
import { CurtainSweep } from "@/components/CurtainTransition";
import { PageTransition } from "@/components/PageTransition";
import { ScrollMarquee } from "@/components/ScrollMarquee";
import { KaraokeText } from "@/components/KaraokeText";
import { ScrollCoverImage } from "@/components/ScrollCoverImage";
import { SolidValueSection } from "@/components/SolidValueSection";
import { StickyStackServices } from "@/components/StickyStackServices";
import {
  HorizontalScrollGallery,
  HorizontalScrollGalleryMobile,
} from "@/components/HorizontalScrollGallery";
import levelSecundaria from "@/assets/level-secundaria.jpg";
import levelPreescolar from "@/assets/level-preescolar.jpg";
import levelPrimaria from "@/assets/level-primaria.jpg";
import packageToga from "@/assets/package-toga.jpg";
import packageBirrete from "@/assets/package-birrete.jpg";
import packageEstola from "@/assets/package-estola.jpg";
import { LEVELS, formatPrice } from "@/data/levels";

const galleryItems = [
  { src: levelPreescolar, alt: "Niños de preescolar con toga", caption: "Preescolar · primer gran paso" },
  { src: packageToga, alt: "Toga sobre fondo claro", caption: "Toga impecable" },
  { src: levelPrimaria, alt: "Generación de primaria graduándose", caption: "Primaria · orgullo familiar" },
  { src: packageBirrete, alt: "Birrete con borla", caption: "Birrete con borla" },
  { src: levelSecundaria, alt: "Graduación de secundaria", caption: "Secundaria · momento inolvidable" },
  { src: packageEstola, alt: "Estola personalizada", caption: "Estola que se queda contigo" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kinder Togas — Momentos que se quedan para siempre" },
      {
        name: "description",
        content:
          "Togas, birretes y estolas personalizadas para preescolar, primaria y secundaria en Ensenada. Reserva el paquete de tu generación.",
      },
      {
        property: "og:title",
        content: "Kinder Togas — Momentos que se quedan para siempre",
      },
      {
        property: "og:description",
        content:
          "Togas, birretes y estolas personalizadas para todas las generaciones. Diseño minimalista y entrega impecable.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <PageTransition>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative mx-auto -mt-28 flex min-h-[100svh] max-w-7xl flex-col items-center justify-center overflow-hidden px-6 pt-28"
      >
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-x-4 inset-y-24 -z-10 overflow-hidden rounded-[40px] sm:inset-x-6"
        >
          <img
            src={heroImg}
            alt="Toga, birrete y estola sobre fondo claro"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background/80" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Generación 2026
          </motion.div>

          <RevealText
            as="h1"
            text="Momentos que se quedan para siempre."
            className="text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Togas, birretes y estolas personalizadas para preescolar, primaria
            y secundaria. Diseñadas con cuidado, entregadas con cariño.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton as="link" to="/niveles">
              Ver niveles <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton as="link" to="/paquete" variant="ghost">
              Conocer el paquete
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓ desplaza
          </motion.span>
        </motion.div>
      </section>

      {/* GRADIENT MARQUEE — flush at the header line, grows on scroll-down */}
      <ScrollMarquee
        className="mt-0"
        words={[
          "Generación 2026",
          "Toga",
          "Birrete",
          "Estola",
          "Recuerdo para siempre",
          "Hecho con cariño",
        ]}
      />

      {/* KARAOKE TEXT FILL */}
      <section className="mx-auto max-w-5xl px-6 py-32 sm:py-40">
        <KaraokeText
          text="Bienvenidos a Kinder Togas, donde cada generación encuentra su momento. Diseñamos togas, birretes y estolas personalizadas para que el día más esperado se quede grabado para siempre."
          className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        />
      </section>

      {/* SCROLL COVER IMAGE — image grows, color cover, rotating words, settles */}
      <ScrollCoverImage
        src={levelSecundaria}
        alt="Generación celebrando su graduación"
        rotatingWords={["Tradición", "Orgullo", "Memoria", "Familia"]}
        endTitle="Una graduación que merece ser inolvidable."
        endSubtitle="Acompañamos a tu generación con togas impecables y una estola personalizada que el alumno se lleva a casa."
      />

      {/* SOLID VALUE — same cobalt, no effects, mirrors the previous end state */}
      <SolidValueSection
        eyebrow="Nuestro compromiso"
        title="Pasión"
        ctaLabel="Conoce nuestra historia"
        ctaTo="/contacto"
      />

      {/* HORIZONTAL SCROLL GALLERY — pinned section */}
      <HorizontalScrollGallery
        eyebrow="Generaciones"
        title="Cada foto, una historia."
        items={galleryItems}
      />
      <HorizontalScrollGalleryMobile
        eyebrow="Generaciones"
        title="Cada foto, una historia."
        items={galleryItems}
      />

      <CurtainSweep className="my-24 max-w-7xl mx-auto" />

      {/* STICKY STACK SERVICES */}
      <StickyStackServices />

      {/* LEVELS PREVIEW */}
      <FadeInSection className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Niveles educativos
            </p>
            <RevealText
              as="h2"
              text="Una toga para cada etapa."
              className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            />
          </div>
          <Link
            to="/niveles"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            Ver todos los niveles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {LEVELS.map((lv, i) => (
            <motion.div
              key={lv.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/niveles"
                className="group block overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <motion.img
                    src={lv.image}
                    alt={`Toga de ${lv.name}`}
                    width={1280}
                    height={1280}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {lv.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{lv.tagline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Desde
                    </p>
                    <p className="text-base font-semibold text-foreground">
                      {formatPrice(lv.price)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      {/* PACKAGE TEASER */}
      <FadeInSection className="mx-auto mt-32 max-w-7xl px-6">
        <div className="grid items-center gap-12 rounded-[40px] bg-card p-10 shadow-[var(--shadow-soft)] ring-1 ring-border md:grid-cols-2 md:p-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <Gift className="h-3.5 w-3.5" /> El paquete completo
            </span>
            <RevealText
              as="h2"
              text="Toga, birrete y una estola que es para siempre."
              className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            />
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              La toga y el birrete se rentan para el gran día. La estola
              personalizada es un regalo: el alumno se la lleva a casa como
              recuerdo de su graduación.
            </p>
            <div className="mt-8">
              <MagneticButton as="link" to="/paquete">
                Ver qué incluye <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
          <ul className="grid gap-3">
            {[
              { t: "Toga", s: "Rentada · alta calidad" },
              { t: "Birrete", s: "Rentado · con borla" },
              { t: "Estola personalizada", s: "De regalo · es tuya" },
            ].map((it, i) => (
              <motion.li
                key={it.t}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex items-center justify-between rounded-2xl border border-border bg-background px-5 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{it.t}</p>
                  <p className="text-xs text-muted-foreground">{it.s}</p>
                </div>
                <span className="text-xs uppercase tracking-wider text-primary">
                  Incluye
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection className="mx-auto mt-32 max-w-4xl px-6 text-center">
        <RevealText
          as="h2"
          text="Reserva el paquete de tu generación."
          className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        />
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          Estamos en Ensenada, listos para acompañarte. Escríbenos por
          WhatsApp y aseguramos tus tallas.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton
            as="a"
            href="https://wa.me/5216461305987"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp 646 130 5987
          </MagneticButton>
          <MagneticButton as="link" to="/contacto" variant="ghost">
            Ver contacto
          </MagneticButton>
        </div>
      </FadeInSection>
    </PageTransition>
  );
}
