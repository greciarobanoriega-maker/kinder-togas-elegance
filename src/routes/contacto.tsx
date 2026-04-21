import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

import { RevealText } from "@/components/RevealText";
import { FadeInSection } from "@/components/FadeInSection";
import { MagneticButton } from "@/components/MagneticButton";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Kinder Togas" },
      {
        name: "description",
        content:
          "Visítanos en Calle Ruiz y Cuarta #410, Local 5. WhatsApp 646 130 5987. Lun a Sáb de 10:00 a 19:00.",
      },
      { property: "og:title", content: "Contacto — Kinder Togas" },
      {
        property: "og:description",
        content: "Estamos en Ensenada y respondemos por WhatsApp al instante.",
      },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <PageTransition>
      <FadeInSection className="mx-auto max-w-6xl px-6 pt-12">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Contacto
          </p>
          <RevealText
            as="h1"
            text="Hablemos de tu generación."
            className="mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
          />
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground">
            Visítanos en nuestro local o escríbenos por WhatsApp para reservar
            tu paquete y resolver dudas.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-[32px] border border-border bg-card p-10 shadow-[var(--shadow-soft)]">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Información
            </h2>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Dirección
                  </p>
                  <p className="text-base text-foreground">
                    Calle Ruiz y Cuarta #410, Local 5
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/5216461305987"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-foreground hover:text-primary"
                  >
                    646 130 5987
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Horario
                  </p>
                  <p className="text-base text-foreground">
                    Lun – Sáb · 10:00 – 19:00
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Pedidos institucionales
                  </p>
                  <p className="text-base text-foreground">
                    Atención personalizada para escuelas
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href="https://wa.me/5216461305987"
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribir por WhatsApp
              </MagneticButton>
              <MagneticButton
                as="a"
                href="https://maps.google.com/?q=Calle+Ruiz+y+Cuarta+410+Local+5"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                Cómo llegar
              </MagneticButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-border bg-muted shadow-[var(--shadow-soft)]">
            <div className="relative h-full min-h-[420px] w-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.95_0.025_257)_0%,oklch(0.985_0_0)_60%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]">
                  <MapPin className="h-6 w-6" />
                </span>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Encuéntranos
                </p>
                <p className="max-w-xs text-balance text-lg font-medium text-foreground">
                  Calle Ruiz y Cuarta #410, Local 5
                </p>
                <a
                  href="https://maps.google.com/?q=Calle+Ruiz+y+Cuarta+410+Local+5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Abrir en Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </PageTransition>
  );
}
