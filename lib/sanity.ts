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

export async function getPostsSlugs() {
  return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        slug
      }
    `);
}