import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  markdown: {
    // Puedes usar otro resaltador de sintaxis o eliminar la opción
    syntaxHighlight: 'prism', // O cualquier otro resaltador que desees usar
  },
  integrations: [react()],
});
