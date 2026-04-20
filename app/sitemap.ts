import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/utils/constants'
import { getPostsSlugs } from '@/lib/sanity'


export default async function sitemap(): MetadataRoute.Sitemap {
    const blogPostsSlugs = await getPostsSlugs()
    const blogPages = blogPostsSlugs.map((slug) => {
        return {
            url: `${SITE_URL}/blog/${slug.slug.current}`,
            lastModified: new Date(),
            priority: 0.8,
        }  
    })
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
    ]


    return [...staticPages, ...blogPages]
}
