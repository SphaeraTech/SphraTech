/**
 * Canonical origin, never with a trailing slash — every consumer builds URLs as
 * `${SITE_URL}/path`, so a trailing slash here yields `https://host//path`,
 * which search engines treat as a separate (and broken) URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.spheratech.org'
).replace(/\/+$/, '');

/** Absolute URL for a site-relative path, safe to hand to canonical/OG tags. */
export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export const SITE_NAME = 'SpheraTech';

export const SITE_DESCRIPTION =
  'Web development agency focused on SaaS, custom applications, and scalable digital platforms built for performance and growth.';
