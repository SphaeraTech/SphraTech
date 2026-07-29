import type { PortableTextBlock } from '@portabletext/react';
import { client } from './sanity';
import type { Language } from './translations';

/* -------------------------------------------------------------------------- */
/*  Localized values                                                          */
/* -------------------------------------------------------------------------- */

export type Localized<T> = Partial<Record<Language, T>>;
export type LocaleString = Localized<string>;
export type LocaleBlock = Localized<PortableTextBlock[]>;

/**
 * Resolve a localized field for the active language, falling back to English
 * when a translation hasn't been filled in yet. Blank strings count as missing
 * so a half-translated document never renders an empty heading.
 */
export function pick<T>(value: Localized<T> | undefined | null, lang: Language): T | undefined {
  if (!value) return undefined;
  const exact = value[lang];
  if (exact !== undefined && exact !== null && exact !== '') return exact;
  const fallback = value.en;
  return fallback !== undefined && fallback !== null && fallback !== '' ? fallback : undefined;
}

/** `pick` for rich text, which is missing when the array is absent or empty. */
export function pickBlocks(
  value: LocaleBlock | undefined | null,
  lang: Language
): PortableTextBlock[] | undefined {
  if (!value) return undefined;
  const exact = value[lang];
  if (exact?.length) return exact;
  return value.en?.length ? value.en : undefined;
}

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type ServiceKey = 'web' | 'saas' | 'mobile' | 'seo';

export interface SanityImage {
  _key?: string;
  alt?: string;
  caption?: LocaleString;
  wide?: boolean;
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  };
}

export interface GalleryVideo {
  _key?: string;
  _type: 'galleryVideo';
  caption?: LocaleString;
  wide?: boolean;
  poster?: SanityImage;
  file?: { asset?: { url: string } };
}

export type GalleryItem = (SanityImage & { _type: 'galleryImage' }) | GalleryVideo;

export interface Metric {
  _key?: string;
  value: string;
  label?: LocaleString;
}

export interface Testimonial {
  quote?: LocaleString;
  author?: string;
  role?: LocaleString;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  clientName?: string;
  service: ServiceKey;
  tagline?: LocaleString;
  summary?: LocaleString;
  sector?: LocaleString;
  year?: number;
  duration?: LocaleString;
  deliverables?: LocaleString[];
  techStack?: string[];
  siteLink?: string;
  challenge?: LocaleBlock;
  approach?: LocaleBlock;
  outcome?: LocaleBlock;
  metrics?: Metric[];
  testimonial?: Testimonial;
  coverImage?: SanityImage;
  gallery?: GalleryItem[];
  featured?: boolean;
  orderRank?: number;
}

/* -------------------------------------------------------------------------- */
/*  Queries                                                                   */
/* -------------------------------------------------------------------------- */

const IMAGE_FRAGMENT = `{
  alt,
  caption,
  wide,
  asset->{ _id, url, metadata { lqip, dimensions } }
}`;

/** Everything the index card needs — no rich text, no gallery. */
const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  clientName,
  service,
  tagline,
  summary,
  sector,
  year,
  techStack,
  siteLink,
  featured,
  orderRank,
  coverImage ${IMAGE_FRAGMENT}
`;

const FULL_FIELDS = `
  ${CARD_FIELDS},
  duration,
  deliverables,
  challenge,
  approach,
  outcome,
  metrics,
  testimonial,
  gallery[] {
    _key,
    _type,
    caption,
    wide,
    _type == "galleryImage" => { alt, asset->{ _id, url, metadata { lqip, dimensions } } },
    _type == "galleryVideo" => {
      poster ${IMAGE_FRAGMENT},
      file { asset->{ url } }
    }
  }
`;

/** Newest/highest-priority first. Featured projects are surfaced by the UI, not by order. */
const ORDER = `| order(orderRank asc, year desc, _createdAt desc)`;

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project" && defined(slug.current)] ${ORDER} { ${CARD_FIELDS} }`
  );
}

/** The projects a single service page shows, in the same order as the index. */
export async function getProjectsByService(service: ServiceKey): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project" && defined(slug.current) && service == $service] ${ORDER} { ${CARD_FIELDS} }`,
    { service }
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0] { ${FULL_FIELDS} }`, {
    slug,
  });
}

export async function getProjectSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "project" && defined(slug.current)] ${ORDER} .slug.current`
  );
}

/**
 * The project to offer at the end of a case study — the next one in display
 * order, wrapping to the first. Returns null when there's nothing else.
 */
export async function getNextProject(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  if (projects.length < 2) return null;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}
