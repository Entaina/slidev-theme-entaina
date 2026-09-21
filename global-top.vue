<!--
  slidev-theme-entaina — deck navigation chrome: top progress bar, right-hand
  slide dots that expand on hover to show slide titles, prev/next arrows
  (bottom left) and a counter with reading percent (bottom right). Hidden in
  print/export and presenter mode. Styled through the theme tokens.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const nav = useNav()
const current = computed(() => nav.currentPage.value)
const total = computed(() => nav.total.value)
const pct = computed(() => Math.round((current.value / total.value) * 100))
const hidden = computed(() => nav.isPrintMode.value || (nav as any).isPresenter?.value)
const titles = computed(() =>
  nav.slides.value.map((s: any, i: number) => {
    const raw = s?.meta?.slide?.title || `Diapositiva ${i + 1}`
    const clean = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    return clean.length > 46 ? `${clean.slice(0, 45)}…` : clean
  }),
)
</script>

<template>
  <div v-if="!hidden" class="deck-chrome">
    <div class="deck-progress" :style="{ width: pct + '%' }" />
    <nav class="deck-dots" aria-label="Navegación por diapositivas">
      <button
        v-for="(t, i) in titles"
        :key="i"
        type="button"
        class="deck-dot"
        :aria-current="current === i + 1 ? 'true' : 'false'"
        :aria-label="`Ir a ${t}`"
        @click="nav.go(i + 1)"
      >
        <span class="deck-dot-label">{{ t }}</span>
      </button>
    </nav>
    <div class="deck-arrows">
      <button type="button" class="deck-arrow" :disabled="current <= 1" aria-label="Anterior" @click="nav.prev()">←</button>
      <button type="button" class="deck-arrow" :disabled="current >= total" aria-label="Siguiente" @click="nav.next()">→</button>
    </div>
    <div class="deck-counter">{{ current }} / {{ total }} · {{ pct }}%</div>
  </div>
</template>

<style scoped>
.deck-chrome {
  font-family: var(--font-mono);
  inset: 0;
  pointer-events: none;
  position: fixed;
  z-index: 60;
}
.deck-progress {
  background: var(--accent);
  height: 4px;
  left: 0;
  position: absolute;
  top: 0;
  transition: width 0.3s ease;
}
.deck-dots {
  backdrop-filter: blur(5px);
  background: color-mix(in srgb, var(--bg) 70%, transparent);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 70dvh;
  overflow: hidden auto;
  padding: 7px;
  pointer-events: auto;
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  transition: width 0.2s;
  width: 34px;
}
.deck-dots:hover,
.deck-dots:focus-within {
  border-radius: 16px;
  width: min(240px, 40vw);
}
.deck-dot {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 15px;
  color: var(--text-dim);
  cursor: pointer;
  display: grid;
  font: 500 11px var(--font-mono);
  gap: 0;
  grid-template-columns: 8px minmax(0, 1fr);
  min-height: 24px;
  padding: 6px;
  text-align: left;
}
.deck-dot::before {
  background: currentColor;
  border-radius: 50%;
  content: '';
  height: 8px;
  width: 8px;
}
.deck-dot-label {
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.deck-dots:hover .deck-dot,
.deck-dots:focus-within .deck-dot { gap: 9px; }
.deck-dots:hover .deck-dot-label,
.deck-dots:focus-within .deck-dot-label { max-width: 200px; opacity: 1; }
.deck-dot[aria-current='true'] { background: var(--accent-dim); color: var(--accent); }
.deck-dot:focus-visible,
.deck-arrow:focus-visible { outline: 3px solid var(--node-b); outline-offset: 2px; }

.deck-arrows {
  bottom: 12px;
  display: flex;
  gap: 6px;
  left: 20px;
  pointer-events: auto;
  position: absolute;
}
.deck-arrow {
  background: color-mix(in srgb, var(--surface-elevated) 80%, transparent);
  border: 1px solid var(--border-bright);
  border-radius: 50%;
  color: var(--accent-dark, var(--accent));
  cursor: pointer;
  display: grid;
  font-size: 14px;
  height: 30px;
  place-items: center;
  width: 30px;
}
.deck-arrow:hover:not(:disabled) { background: var(--accent-dim); }
.deck-arrow:disabled { cursor: default; opacity: 0.35; }

.deck-counter {
  bottom: 16px;
  color: var(--text-dim);
  font-size: 11px;
  font-weight: 500;
  position: absolute;
  right: 20px;
  text-shadow: 0 1px 3px color-mix(in srgb, var(--bg) 60%, transparent);
}
</style>
