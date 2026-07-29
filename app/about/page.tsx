import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The people and the principles behind SpheraTech — a small team building fast, honest, well-engineered software for growing businesses.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About SpheraTech',
    description:
      'The people and the principles behind SpheraTech — a small team building fast, honest, well-engineered software for growing businesses.',
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <AboutContent />
    </>
  );
}
