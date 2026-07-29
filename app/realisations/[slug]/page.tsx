import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNextProject, getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import CaseStudy from '@/components/projects/CaseStudy';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };

  // Metadata is rendered once per URL, so it uses the default language.
  const description = project.summary?.en ?? project.tagline?.en;
  const cover = project.coverImage?.asset?.url;

  return {
    title:
      project.clientName && project.clientName !== project.title
        ? `${project.title} — ${project.clientName}`
        : project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: 'article',
      images: cover ? [{ url: `${cover}?w=1200&h=630&fit=crop&auto=format` }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, nextProject] = await Promise.all([
    getProjectBySlug(slug),
    getNextProject(slug),
  ]);

  if (!project) notFound();

  return <CaseStudy project={project} nextProject={nextProject} />;
}
