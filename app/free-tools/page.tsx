import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import FreeToolsContent from './FreeToolsContent';

export const metadata: Metadata = {
  title: 'Free Tools',
  description:
    'Free web tools from SpheraTech — speed tests, SEO analysis, meta tag and favicon generators, colour palettes, and more. No signup.',
  alternates: { canonical: '/free-tools' },
  openGraph: {
    url: '/free-tools',
    title: 'Free Tools',
    description:
      'Free web tools from SpheraTech — speed tests, SEO analysis, meta tag and favicon generators, colour palettes, and more. No signup.',
  },
};

export default function FreeToolsPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Free Tools', path: '/free-tools' },
        ])}
      />
      <FreeToolsContent />
    </>
  );
}
