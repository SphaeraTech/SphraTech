import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNextProject, getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import CaseStudy from '@/components/projects/CaseStudy';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, caseStudySchema } from '@/lib/schema';

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
    alternates: { canonical: `/realisations/${slug}` },
    openGraph: {
      title: project.title,
      description,
      type: 'article',
      url: `/realisations/${slug}`,
      images: cover ? [{ url: `${cover}?w=1200&h=630&fit=crop&auto=format` }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
      images: cover ? [`${cover}?w=1200&h=630&fit=crop&auto=format`] : undefined,
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

  return (
    <>
      <JsonLd
        schema={[
          caseStudySchema({
            title: project.title,
            description: project.summary?.en ?? project.tagline?.en,
            path: `/realisations/${slug}`,
            image: project.coverImage?.asset?.url,
            clientName: project.clientName,
            year: project.year,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our Work', path: '/realisations' },
            { name: project.title, path: `/realisations/${slug}` },
          ]),
        ]}
      />
      <CaseStudy project={project} nextProject={nextProject} />
    </>
  );
}
