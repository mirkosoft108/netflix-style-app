import { quasar } from '@quasar/vite-plugin';
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  ssr: false,

  css: [
    'quasar/src/css/index.sass',
    '@quasar/extras/material-icons/material-icons.css',
  ],

  vite: {
    plugins: [
      quasar({
        sassVariables: fileURLToPath(
          new URL('./assets/quasar-variables.sass', import.meta.url)
        ),
      }),
    ],
  },

  modules: [
    '@pinia/nuxt', 
  ],

  compatibilityDate: '2025-01-16',
});
