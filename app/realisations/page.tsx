import type { Metadata } from 'next';
import { getProjects } from '@/lib/projects';
import RealisationsContent from './RealisationsContent';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Work',
  alternates: { canonical: '/realisations' },
  description:
    'Real projects shipped for real clients — websites, platforms, and SaaS products built by SpheraTech.',
};

export default async function RealisationsPage() {
  const projects = await getProjects();
  return <RealisationsContent projects={projects} />;
}
