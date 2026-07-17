# active-stack-landing

Landing page de [Active Stack](https://github.com/Group-Active-IA/active-stack) — instalador methodology-first para agentes de IA.

Construida con [Astro](https://astro.build) (sitio estático, sin framework de UI). Bilingüe ES/EN y tema claro/oscuro, ambos con toggle en el header. Ver `DESIGN-BRIEF.md` para el brief de diseño original.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve el build de dist/
```

## Estructura

```
src/
  components/   # Header, Hero, PlatformTabs, WhatIs, OpsxCycle, Catalog, Agents, Faq, Footer
  i18n/          # content.js — diccionario ES/EN + links del producto
  layouts/       # Layout.astro (head, theme init, fuentes del sistema)
  scripts/       # main.js — toggle de idioma/tema + copy-to-clipboard
  styles/        # global.css — design tokens (paleta, tipografía, radii, sombras)
public/          # favicon
```

Deploy target: Vercel.
