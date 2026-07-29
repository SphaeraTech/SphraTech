import type { Metadata } from 'next';
import RealisationsContent from './RealisationsContent';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Real projects shipped for real clients — websites, platforms, and SaaS products built by SpheraTech.',
};

export default function RealisationsPage() {
  return <RealisationsContent />;
}
