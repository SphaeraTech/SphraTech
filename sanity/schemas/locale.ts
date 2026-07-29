import { defineType, defineField } from 'sanity';
import { LANGUAGES } from '../languages';

const TRANSLATIONS_FIELDSET = {
  name: 'translations',
  title: 'Translations',
  options: { collapsible: true, collapsed: true },
};

/**
 * Field-level translation: every localized field is an object with one
 * sub-field per language. English sits at the top; fr/es are tucked into a
 * collapsed "Translations" fieldset so the studio stays readable when you
 * only want to write English first. The frontend falls back to English for
 * any translation left empty (see `pick()` in lib/projects.ts).
 *
 * The three field lists are spelled out rather than generated from a `type`
 * argument — Sanity's field definitions are a discriminated union, so a
 * computed `type` widens them past what `defineField` accepts.
 */
const groupOf = (lang: (typeof LANGUAGES)[number]) =>
  lang.isDefault ? undefined : 'translations';

const stringFields = LANGUAGES.map((lang) =>
  defineField({ name: lang.id, title: lang.title, type: 'string', fieldset: groupOf(lang) })
);

const textFields = LANGUAGES.map((lang) =>
  defineField({ name: lang.id, title: lang.title, type: 'text', fieldset: groupOf(lang) })
);

const blockFields = LANGUAGES.map((lang) =>
  defineField({
    name: lang.id,
    title: lang.title,
    type: 'array',
    of: [{ type: 'block' }],
    fieldset: groupOf(lang),
  })
);

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized text',
  type: 'object',
  fieldsets: [TRANSLATIONS_FIELDSET],
  fields: stringFields,
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized paragraph',
  type: 'object',
  fieldsets: [TRANSLATIONS_FIELDSET],
  fields: textFields,
});

export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'Localized rich text',
  type: 'object',
  fieldsets: [TRANSLATIONS_FIELDSET],
  fields: blockFields,
});
