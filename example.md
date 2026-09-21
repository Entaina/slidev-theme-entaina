---
theme: ./
title: Entaina · Slidev theme
mdc: true
---

<div class="cover-kicker">SLIDEV-THEME-ENTAINA</div>

# El tema Entaina<br>para Slidev

<div class="cover-line">Look dirigido por tokens, chrome de navegación y las tres variantes de pilar.</div>

<div class="cover-orbit" aria-hidden="true"><span>tokens</span><i></i><span>layouts</span><i></i><b>chrome</b></div>

<!--
Duración estimada: 30 s.
Portada: kicker mono, display Comfortaa, órbita decorativa.
-->

---
layout: section
---

# Todo sale<br>de los tokens

Cambiar de paleta es redefinir variables — nada más.

<!--
Duración estimada: 20 s.
Divisoria con barra de acento.
-->

---
layout: two-cols
layoutClass: gap-0
title: Split a sangre
---

<div class="panel panel-before">
  <div class="eyebrow">Antes</div>
  <h1>Estilos<br>por deck</h1>
  <p>Cada presentación reinventaba su look y su navegación.</p>
</div>

::right::

<div class="panel panel-after">
  <div class="eyebrow success">Ahora</div>
  <h1>Un theme<br>versionado</h1>
  <p>Un paquete lo aporta todo; el deck solo trae contenido.</p>
</div>

<!--
Duración estimada: 40 s.
Split edge-to-edge con .panel; el eyebrow del panel derecho va en verde.
-->

---
title: Tabla y eyebrow
---

<div class="eyebrow">Contrato</div>

# Qué aporta el theme

| Pieza | Dónde vive |
|---|---|
| Paleta + variantes de pilar | `styles/tokens.css` |
| Look base (layouts, tablas, bleed) | `styles/base.css` |
| Chrome de navegación | `global-top.vue` |
| Fuentes por defecto | `package.json` → `slidev.defaults` |

<!--
Duración estimada: 40 s.
Tabla estilizada por el theme: cabecera acento, zebra.
-->

---
title: Dashboard KPI
---

<div class="eyebrow">Dashboard</div>

# Los valores hero, breves

<div class="kpi-grid">
  <div class="kpi"><b>6</b><span>KPIs máximo</span></div>
  <div class="kpi"><b>≤6</b><span>caracteres hero</span></div>
  <div class="kpi"><b>3</b><span>colores de pilar</span></div>
  <div class="kpi"><b>scan</b><span>no lectura lineal</span></div>
  <div class="kpi"><b>1</b><span>heading</span></div>
  <div class="kpi"><b>100%</b><span>desde tokens</span></div>
</div>

<!--
Duración estimada: 30 s.
Dashboard: cifras display con rotación de pilares, etiquetas mono.
-->

---
title: Snippet de código
---

<div class="eyebrow">Code</div>

# Un punto de código, con foco

<div class="code-file">slide.ts</div>

```ts {2-3}
export function slide(content: Content): Slide {
  const focal = content.mainIdea()      // una sola idea
  return compose(focal, content.supports.slice(0, 6))
}
```

<!--
Duración estimada: 30 s.
Caja navy de marca con chip de fichero flotante; tokens Shiki oscuros del theme.
-->

---
layout: quote
---

# El deck trae el contenido; el theme, todo lo demás.

Principio del tema

<!--
Duración estimada: 20 s.
Cita con comilla gigante; sin comillas literales en el texto.
-->

---
layout: cover
class: bleed
---

<div class="cover-kicker">Cierre</div>

# Un activo de marca,<br>con ciclo de versión propio

<div class="bleed-note">npm i -D slidev-theme-entaina · <strong>theme: slidev-theme-entaina</strong></div>

<!--
Duración estimada: 30 s.
Full-bleed oscuro con rejilla en perspectiva y nota mono.
-->
