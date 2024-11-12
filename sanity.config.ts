// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { schemaTypes } from 'src/schemaTypes'

export default defineConfig({
  name: 'spheratech',
  title: 'SpheraTech',
  projectId: '7xwwm6ye',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})