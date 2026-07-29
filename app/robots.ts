import type { MetadataRoute } from 'next'
import { SITE_URL, absoluteUrl } from '@/utils/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The embedded studio and the tool endpoints are application surface,
        // not content — crawling them wastes budget and indexes nothing useful.
        disallow: ['/studio', '/studio/', '/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  }
}
