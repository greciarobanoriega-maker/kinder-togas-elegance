
# Kinder Togas — Premium Minimalist Site

A K-Minimalism / Apple-inspired multi-page site for a graduation regalia service, built on the existing TanStack Start + Tailwind stack with Framer Motion for cinematic interactions.

## Design system
- **Palette**: Bone White `#FAFAFA` background, Pure White `#FFFFFF` cards, Oxford Grey `#1D1D1F` text, Cobalt Blue `#003366` primary actions, soft warm grey for borders.
- **Typography**: Inter (display + body) loaded from Google Fonts; tight tracking on display sizes, generous line-height on body.
- **Shape language**: 24–32px rounded corners, generous whitespace, 12-column grid, soft layered shadows.
- **Glassmorphism nav**: floating top bar with `backdrop-blur`, subtle border, shrinks on scroll.

## Site structure (multi-page routes)
- `/` — Home: hero, levels preview, package teaser, CTA
- `/niveles` — Educational Levels (Preescolar / Primaria / Secundaria with prices)
- `/paquete` — What's included: Toga (rented), Birrete (rented), Estola (gifted keepsake)
- `/estolas` — Stole customization gallery (designs + color swatches)
- `/accesorios` — Borlitas Recuerdo 2026, Medallas de Acrílico, Peluches, Camisetas
- `/contacto` — Address, WhatsApp CTA, map placeholder, hours

Each route gets its own `head()` metadata (title, description, og:title, og:description) for SEO and shareability.

## Hero
- Full-viewport hero with display title **"Momentos que se quedan para siempre"** revealed word-by-word with staggered fade-up.
- Subtle parallax background image (graduation moment) behind the title.
- Cobalt primary CTA "Ver niveles" + ghost CTA "Conocer el paquete".
- Soft scroll-cue indicator at bottom.

## Educational Levels grid
Three large interactive cards with hover lift + cobalt accent reveal:
- **Preescolar** — Diseño infantil y colorido — **$450 MXN**
- **Primaria** — Diseño escolar formal — **$450 MXN**
- **Secundaria** — Diseño sobrio y elegante — **$550 MXN**

## The Package section
Three-column visual breakdown:
- **Toga** (rentada) — returnable gown
- **Birrete** (rentado) — returnable cap
- **Estola** (de regalo) — personalized keepsake the student keeps
Highlighted with a soft "Incluye" badge and an emphasis on the gifted stole.

## Stole customization
- Design options: **Crayola**, **Multicolor**, **Lápiz (Pencil)** shown as elegant cards.
- Color swatches row: Plata, Oro, Negro, Rojo, Azul Rey, and more — circular swatches with name on hover.
- Magnetic "Personalizar mi estola" CTA.

## Accessories grid
Clean 4-card grid:
- Borlitas Recuerdo 2026
- Medallas de Acrílico
- Peluches de Graduación
- Camisetas

## Footer / Contact
- Address: **Calle Ruiz y Cuarta #410, Local 5**
- WhatsApp prominent button: **646 130 5987** (opens wa.me link)
- Schedule placeholder, social row, fine-print legal line.

## Animation system (Framer Motion)
- **Fade-in-up + scale** on every section as it enters the viewport (`whileInView`, once).
- **Staggered text reveal** word-by-word for all major headings.
- **Curtain wipe** left → right transition layer between major sections (cobalt overlay sweeping out).
- **Parallax** on product imagery using `useScroll` + `useTransform` for differential speed.
- **Magnetic buttons** that translate toward cursor within a radius (desktop only).
- **Custom cursor**: small dot + expanding ring that grows over interactive elements; auto-hidden on touch devices.
- **Mobile**: cursor/magnet effects disabled; replaced with subtle press-scale (`whileTap`) feedback for tactile feel.

## Imagery
Generate elegant, on-brand placeholder images via Lovable AI (Nano Banana) for: hero, three educational levels, package items (toga/birrete/estola), stole designs, and the four accessories. Stored in `src/assets/` and imported with Vite.

## Technical implementation
- Stack: TanStack Start (React 19) + Tailwind v4 + Framer Motion.
- Shared `<SiteHeader>` (glass nav) and `<SiteFooter>` mounted in `__root.tsx`.
- Reusable primitives: `<MagneticButton>`, `<CustomCursor>`, `<RevealText>`, `<FadeInSection>`, `<ParallaxImage>`, `<CurtainTransition>`.
- Update `src/styles.css` with the new color tokens (oklch equivalents) and Inter font import.
- Fully responsive, mobile-first; nav collapses to a clean sheet menu on small screens.

## Out of scope (can be added later)
- CMS / admin to edit catalog
- Online ordering / checkout
- Real catalog photography (using AI placeholders for now)
