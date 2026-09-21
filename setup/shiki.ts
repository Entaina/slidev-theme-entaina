import { defineShikiSetup } from '@slidev/types'

// Dark token theme on both schemes: code sits in the brand navy box
// (--code-bg) whatever the deck's color scheme, per the Entaina look.
export default defineShikiSetup(() => ({
  themes: {
    dark: 'one-dark-pro',
    light: 'one-dark-pro',
  },
}))
