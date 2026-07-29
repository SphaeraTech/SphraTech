import type { SchemaTypeDefinition } from 'sanity';
import { localeString, localeText, localeBlock } from './locale';
import { project, metric, galleryVideo, testimonial } from './project';

/**
 * Only the types this repo owns. The existing `post` type lives in whatever
 * studio created it — Sanity merges document types by name at query time, so
 * blog posts keep working untouched.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  localeBlock,
  metric,
  galleryVideo,
  testimonial,
  project,
];
