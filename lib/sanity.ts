import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "7xwwm6ye",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function getPosts() {
  return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        body
      }
    `);
}

/** Slug + real edit date, so the sitemap reports a truthful `lastmod`. */
export async function getPostSitemapEntries(): Promise<
  { slug: string; updatedAt: string }[]
> {
  return await client.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        "slug": slug.current,
        "updatedAt": _updatedAt
      }
    `);
}

export async function getPostsSlugs() {
  return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        slug
      }
    `);
}