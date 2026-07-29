import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

/**
 * Studio for the SpheraTech project catalogue, mounted at /studio.
 *
 * It only declares the types this repo owns (`project` + the locale helpers).
 * Blog posts are authored in the original studio — Sanity datasets are
 * schemaless, so both studios can point at the same dataset safely.
 */
export default defineConfig({
  name: 'spheratech',
  title: 'SpheraTech',
  basePath: '/studio',
  projectId: '7xwwm6ye',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
