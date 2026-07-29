import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from '@/utils/constants';

/**
 * JSON-LD builders. Everything here must be a fact that is also visible on the
 * page — invented addresses, phone numbers, or review/rating markup are a
 * manual-action risk, not a ranking trick. Only claims we can back go in.
 */

const ORGANIZATION_ID = absoluteUrl('/#organization');
const WEBSITE_ID = absoluteUrl('/#website');

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: 'SphæraTech',
    url: absoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/navbar-logo.png'),
    },
    description: SITE_DESCRIPTION,
    sameAs: ['https://www.linkedin.com/company/spheradev'],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    serviceType: serviceType ?? name,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: 'Worldwide',
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** `items` are ordered root → current page; the current page links to itself. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  image,
}: {
  title: string;
  description?: string;
  path: string;
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    ...(description ? { description } : {}),
    url: absoluteUrl(path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    ...(image ? { image: [image] } : {}),
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function caseStudySchema({
  title,
  description,
  path,
  image,
  clientName,
  year,
}: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  clientName?: string;
  year?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    ...(description ? { description } : {}),
    url: absoluteUrl(path),
    ...(image ? { image: [image] } : {}),
    ...(year ? { dateCreated: String(year) } : {}),
    creator: { '@id': ORGANIZATION_ID },
    ...(clientName ? { about: { '@type': 'Organization', name: clientName } } : {}),
  };
}
