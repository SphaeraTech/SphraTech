/**
 * The languages the site ships in. Kept in sync with `Language` in
 * lib/translations.ts — adding one here adds a field to every localized
 * document field in the studio.
 */
export const LANGUAGES = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'fr', title: 'Français', isDefault: false },
  { id: 'es', title: 'Español', isDefault: false },
] as const;

export const DEFAULT_LANGUAGE = 'en';
