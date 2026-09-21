# slidev-theme-entaina

Tema de marca Entaina para [Slidev](https://sli.dev): look dirigido por tokens (mapeados del design system oficial), chrome de navegación propio y las tres variantes de pilar. Light-only por diseño.

## Uso

```bash
npm i -D slidev-theme-entaina
# o, mientras no esté publicado en npm:
npm i -D github:Entaina/slidev-theme-entaina
```

```yaml
---
theme: slidev-theme-entaina
---
```

Las fuentes (Lato, Comfortaa, JetBrains Mono, pesos 300–700) llegan como defaults del tema; el deck no necesita bloque `fonts:`.

## Qué incluye

- **`styles/tokens.css`** — la paleta Entaina como defaults en `:root`, más las variantes de pilar: `htmlAttrs: { data-theme: technology | innovation | people }` en el headmatter del deck.
- **`styles/base.css`** — el look, 100% sobre tokens: atmósfera por layout, escala display, kickers `.eyebrow`/`.cover-kicker`, cover/section/quote estilizados, splits a sangre con `.panel .panel-before/.panel-after`, tablas, la portada oscura `layout: cover` + `class: bleed` (con `.bleed-note`), y el reveal de entrada escalonado (respeta `prefers-reduced-motion` y print).
- **`global-top.vue`** — chrome de navegación: barra de progreso, bolitas laterales que se expanden al hover mostrando títulos, flechas anterior/siguiente y contador `n / total · %`. Se oculta en export y en modo presentador. Teclado, transiciones, overview (`o`) y export siguen siendo de Slidev.
- **Componentes** (clases sobre HTML plano en las slides):
  - KPI dashboard: `<div class="kpi-grid"><div class="kpi"><b>247</b><span>etiqueta</span></div>…</div>` — cifras display con rotación de colores de pilar, etiquetas mono; valores hero breves (≤6 caracteres).
  - Código: los bloques fenced van en caja navy de marca con tokens oscuros (`setup/shiki.ts`, one-dark-pro en ambos esquemas) y soportan el resaltado de líneas de Slidev (` ```ts {2-3} `). Chip de fichero flotante: `<div class="code-file">worker.ts</div>` justo antes del fence.
  - Kickers semánticos opt-in: `.eyebrow.success` / `.danger` / `.warning` — solo cuando el contenido afirma un estado.

## Personalización

El contrato son 27 tokens CSS (ver `styles/tokens.css` y `test/contract.test.mjs`). Para otra paleta, redefine los tokens en el `style.css` del proyecto — las variables cascadan, no hay que tocar el tema:

```css
/* style.css del deck: ejemplo de paleta alternativa */
:root {
  --bg: #ffffff;
  --accent: #2563eb;
  /* …resto del contrato… */
}
```

Reglas propias del deck: en su `style.css`, en rem ajustado al lienzo 980×552 de Slidev (nunca vw/vh — el lienzo escala con un transform y las unidades de viewport se escalan doble).

## Notas

- Dos internals de Slidev ya resueltos por el CSS: `layout: two-cols` renderiza la clase `.two-columns` (slots en `.col-left`/`.col-right`) y `layout: cover` envuelve el contenido en un `div.my-auto`.
- Las bolitas toman los títulos del primer heading de cada slide; si el heading va dentro de HTML crudo, añade `title:` al frontmatter de esa slide.
- Export: el reveal de entrada anima al montar; si `slidev export` captura a medias, añade `--wait 1000`.

## Desarrollo

```bash
npm install
npm run dev     # example.md con theme: ./
npm test        # contrato de tokens (node --test, sin dependencias)
```
