import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/utils/constants'
import { getPostsSlugs } from '@/lib/sanity'
import { getProjectSlugs } from '@/lib/projects'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [blogPostsSlugs, projectSlugs] = await Promise.all([
        getPostsSlugs(),
        getProjectSlugs(),
    ])
    const blogPages = blogPostsSlugs.map((slug: { slug: { current: string } }) => {
        return {
            url: `${SITE_URL}/blog/${slug.slug.current}`,
            lastModified: new Date(),
            priority: 0.8,
        }
    })
    const projectPages = projectSlugs.map((slug) => ({
        url: `${SITE_URL}/realisations/${slug}`,
        lastModified: new Date(),
        priority: 0.8,
    }))
    const staticPages = [
        {
            url: `${SITE_URL}`,
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: `${SITE_URL}/#services`,
            lastModified: new Date(),
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/services/saas-solutions`,
            lastModified: new Date(),
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/services/web-development`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services/mobile-development`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services/seo-services`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/realisations`,
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/free-tools`,
            lastModified: new Date(),
            priority: 0.7,
        },
    ]


    return [...staticPages, ...projectPages, ...blogPages]
}
