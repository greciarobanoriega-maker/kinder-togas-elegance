import preescolar from "@/assets/level-preescolar.jpg";
import primaria from "@/assets/level-primaria.jpg";
import secundaria from "@/assets/level-secundaria.jpg";

export interface Level {
  slug: "preescolar" | "primaria" | "secundaria";
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
}

export const LEVELS: Level[] = [
  {
    slug: "preescolar",
    name: "Preescolar",
    tagline: "Diseño infantil y colorido",
    description:
      "Una toga ligera con detalles cálidos y vivos, pensada para los más pequeños en su primer gran momento.",
    price: 450,
    image: preescolar,
  },
  {
    slug: "primaria",
    name: "Primaria",
    tagline: "Diseño escolar formal",
    description:
      "Toga clásica en tonos sobrios con un toque escolar. Para celebrar el cierre de una etapa fundamental.",
    price: 450,
    image: primaria,
  },
  {
    slug: "secundaria",
    name: "Secundaria",
    tagline: "Diseño sobrio y elegante",
    description:
      "Línea limpia, color profundo y caída impecable. Una toga que acompaña la madurez de la generación.",
    price: 550,
    image: secundaria,
  },
];

export function formatPrice(p: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(p);
}
