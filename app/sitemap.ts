import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/utils/constants'


export default function sitemap(): MetadataRoute.Sitemap {
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
        }, {
            url: `${SITE_URL}/services/mobile-development`,
            lastModified: new Date(),
            priority: 0.8,
        }, {
            url: `${SITE_URL}/services/seo-services`,
            lastModified: new Date(),
            priority: 0.8,
        }, {
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


    return [...staticPages]
}
