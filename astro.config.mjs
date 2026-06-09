// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://jin821551407.github.io',
  base: '/',
  integrations: [react()],
});