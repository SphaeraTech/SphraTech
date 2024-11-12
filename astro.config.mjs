import sanity from '@sanity/astro'

import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sanity({
    projectId: '7xwwm6ye',
    dataset: 'production',
    // Set useCdn to false if you're building statically.
    useCdn: false,
    studioBasePath: '/admin',

  })]
});