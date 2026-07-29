'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { pick, type Project } from '@/lib/projects';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ProjectCardCompactProps {
  project: Project;
  index: number;
}

/**
 * The service-page counterpart to `ProjectRow`: same voice — mono meta line,
 * screenshot that scrolls inside its frame, arrow nudge — packed into a grid
 * card instead of a full-width row. Links straight to the case study; none of
 * the index's page-shutter machinery applies here.
 */
export default function ProjectCardCompact({ project, index }: ProjectCardCompactProps) {
  const { t, language } = useLanguage();
  const r = t.realisations;

  const serviceLabel = {
    web: r.filterWeb,
    saas: r.filterSaas,
    mobile: r.filterMobile,
    seo: r.filterSeo,
  }[project.service];

  const tagline = pick(project.tagline, language) ?? pick(project.summary, language);
  const cover = project.coverImage;

  return (
    <Link
      href={`/realisations/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-edge bg-surface transition-colors hover:border-brand/40"
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-edge bg-surface-2">
        {cover?.asset ? (
          /* Taller than its frame and scrolling upward on hover — you see more
             of the actual site, which beats a zoom. */
          <div className="absolute inset-0">
            <div className="relative h-[150%] w-full transition-transform duration-[1400ms] ease-out group-hover:-translate-y-1/3">
              <Image
                src={cover.asset.url}
                alt={cover.alt ?? project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder={cover.asset.metadata?.lqip ? 'blur' : 'empty'}
                blurDataURL={cover.asset.metadata?.lqip}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-20 w-20 rounded-xl border border-brand/30 bg-brand/10" />
          </div>
        )}
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
          <span className="text-brand">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden className="h-px w-8 bg-edge-strong" />
          <span>{serviceLabel}</span>
          {project.year && (
            <>
              <span aria-hidden className="text-edge-strong">
                /
              </span>
              <span>{project.year}</span>
            </>
          )}
        </div>

        <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
          {project.title}
        </h3>

        {tagline && <p className="mt-3 text-sm leading-relaxed text-body">{tagline}</p>}

        {project.techStack && project.techStack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-edge px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-faint"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-xs uppercase tracking-[0.15em] text-ink">
          <span className="relative">
            {r.openCaseStudy}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-[width] duration-500 ease-out group-hover:w-full"
            />
          </span>
          <ArrowRight className="h-4 w-4 text-brand transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
