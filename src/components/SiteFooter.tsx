import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              KT
            </span>
            <span className="text-lg font-semibold tracking-tight">Kinder Togas</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Togas, birretes y estolas personalizadas para preescolar, primaria y
            secundaria. Momentos que se quedan para siempre.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Visítanos
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <span>Calle Ruiz y Cuarta #410, Local 5</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-primary" />
              <span>Lun – Sáb · 10:00 – 19:00</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href="https://wa.me/5216461305987"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                646 130 5987
              </a>
            </li>
            <li>
              <Link to="/contacto" className="text-muted-foreground hover:text-foreground">
                Reservar mi paquete →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Kinder Togas. Todos los derechos reservados.</p>
          <p>Hecho con cuidado para una generación inolvidable.</p>
        </div>
      </div>
    </footer>
  );
}
