import type { MetadataRoute } from 'next'
import { SITE_URL, absoluteUrl } from '@/utils/constants'
import { getPostSitemapEntries } from '@/lib/sanity'
import { getProjectSitemapEntries } from '@/lib/projects'
import { freeToolsData } from '@/lib/freeToolsData'

export const revalidate = 3600

/**
 * Only real, indexable URLs belong here — no fragments (`/#services` is the
 * home page to a crawler, not a separate document), no /studio, no /api.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, projects] = await Promise.all([
        getPostSitemapEntries(),
        getProjectSitemapEntries(),
    ])

    const now = new Date()

    const staticPages: MetadataRoute.Sitemap = (
        [
            // Bare origin, matching the canonical Next emits for the home page.
            { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
            { url: absoluteUrl('/services'), changeFrequency: 'monthly', priority: 0.9 },
            { url: absoluteUrl('/services/saas-solutions'), changeFrequency: 'monthly', priority: 0.9 },
            { url: absoluteUrl('/services/web-development'), changeFrequency: 'monthly', priority: 0.9 },
            { url: absoluteUrl('/services/mobile-development'), changeFrequency: 'monthly', priority: 0.8 },
            { url: absoluteUrl('/services/seo-services'), changeFrequency: 'monthly', priority: 0.8 },
            { url: absoluteUrl('/realisations'), changeFrequency: 'weekly', priority: 0.8 },
            { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.8 },
            { url: absoluteUrl('/about'), changeFrequency: 'yearly', priority: 0.7 },
            { url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.7 },
            { url: absoluteUrl('/products'), changeFrequency: 'monthly', priority: 0.7 },
            { url: absoluteUrl('/free-tools'), changeFrequency: 'monthly', priority: 0.7 },
        ] as const
    ).map((page) => ({ ...page, lastModified: now }))

    const toolPages: MetadataRoute.Sitemap = freeToolsData.map((tool) => ({
        url: absoluteUrl(`/free-tools/${tool.id}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    const projectPages: MetadataRoute.Sitemap = projects.map(({ slug, updatedAt }) => ({
        url: absoluteUrl(`/realisations/${slug}`),
        lastModified: new Date(updatedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    const blogPages: MetadataRoute.Sitemap = posts.map(({ slug, updatedAt }) => ({
        url: absoluteUrl(`/blog/${slug}`),
        lastModified: new Date(updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticPages, ...toolPages, ...projectPages, ...blogPages]
}
