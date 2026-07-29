'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/tailwind';
import { pick, type Project } from '@/lib/projects';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ProjectRowProps {
  project: Project;
  index: number;
  /** Mirror the layout so consecutive rows alternate image side. */
  reversed?: boolean;
  onNavigate: (href: string) => void;
  registerRef: (slug: string, el: HTMLElement | null) => void;
}

export default function ProjectRow({
  project,
  index,
  reversed,
  onNavigate,
  registerRef,
}: ProjectRowProps) {
  const { t, language } = useLanguage();
  const r = t.realisations;
  const href = `/realisations/${project.slug}`;

  const serviceLabel = {
    web: r.filterWeb,
    saas: r.filterSaas,
    mobile: r.filterMobile,
    seo: r.filterSeo,
  }[project.service];

  const tagline = pick(project.tagline, language) ?? pick(project.summary, language);
  const cover = project.coverImage;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Let the browser own modifier-clicks, middle-clicks and new-tab intent.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onNavigate(href);
  }

  return (
    <article
      ref={(el) => registerRef(project.slug, el)}
      className="group relative border-t border-edge"
    >
      {/* Circuit trace: draws across the top edge on hover, ending in a node. */}
      <span
        aria-hidden
        className="absolute -top-px left-0 h-px w-0 bg-brand transition-[width] duration-700 ease-out group-hover:w-full"
      />
      <span
        aria-hidden
        className="absolute -top-[3px] right-0 w-1.5 h-1.5 rounded-full border border-brand bg-base opacity-0 scale-0 transition-all duration-300 delay-500 group-hover:opacity-100 group-hover:scale-100"
      />

      <Link
        href={href}
        onClick={handleClick}
        className="block py-10 md:py-16 focus-visible:outline-none focus-visible:ring-0"
      >
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Media */}
          <div className={cn('md:col-span-7', reversed && 'md:order-2')}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-edge bg-surface-2 transition-colors duration-300 group-hover:border-brand/40">
              {cover?.asset ? (
                /* The screenshot is taller than its frame and scrolls upward on
                   hover — you see more of the actual site, which beats a zoom. */
                <div className="absolute inset-0">
                  <div className="relative w-full h-[150%] transition-transform duration-[1400ms] ease-out group-hover:-translate-y-1/3">
                    <Image
                      src={cover.asset.url}
                      alt={cover.alt ?? project.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 58vw"
                      placeholder={cover.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={cover.asset.metadata?.lqip}
                      priority={index < 2}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 rounded-xl border border-brand/30 bg-brand/10" />
                </div>
              )}
            </div>
          </div>

          {/* Copy */}
          <div className={cn('md:col-span-5', reversed && 'md:order-1')}>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-faint mb-5">
              <span className="text-brand">{String(index + 1).padStart(2, '0')}</span>
              <span aria-hidden className="w-8 h-px bg-edge-strong" />
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

            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink">
              {project.title}
            </h2>

            {tagline && <p className="mt-4 text-body leading-relaxed max-w-md">{tagline}</p>}

            {project.techStack && project.techStack.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.techStack.slice(0, 5).map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint border border-edge rounded-lg px-2.5 py-1"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-ink">
              <span className="relative">
                {r.openCaseStudy}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-[width] duration-500 ease-out group-hover:w-full"
                />
              </span>
              <ArrowRight className="w-4 h-4 text-brand transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
