'use client';

import { Fragment, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { createTimeline, stagger } from 'animejs';
import { pick, pickBlocks, type Project } from '@/lib/projects';
import { useLanguage } from '@/app/contexts/LanguageContext';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/motion/Reveal';
import CircuitTrace from '@/components/motion/CircuitTrace';
import MediaReveal from '@/components/motion/MediaReveal';
import CountUp from '@/components/motion/CountUp';
import ProjectGallery from './ProjectGallery';

const PROSE =
  'prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-p:text-body prose-p:leading-relaxed prose-li:text-body prose-strong:text-ink prose-a:text-brand hover:prose-a:text-brand-strong prose-blockquote:border-brand prose-blockquote:text-body prose-code:text-ink prose-hr:border-edge';

/** A story section: sticky mono label on the left, prose on the right. */
function StorySection({ label, blocks }: { label: string; blocks?: PortableTextBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <Reveal className="grid md:grid-cols-12 gap-6 md:gap-12 py-10 border-t border-edge">
      <div className="md:col-span-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand md:sticky md:top-28">
          {'// '}
          {label}
        </h2>
      </div>
      <div className={`md:col-span-8 ${PROSE}`}>
        <PortableText value={blocks} />
      </div>
    </Reveal>
  );
}

function MetaCell({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint mb-2">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}

interface CaseStudyProps {
  project: Project;
  nextProject: Project | null;
}

export default function CaseStudy({ project, nextProject }: CaseStudyProps) {
  const { t, language } = useLanguage();
  const r = t.realisations;
  const heroRef = useRef<HTMLDivElement>(null);

  const tagline = pick(project.tagline, language);
  const summary = pick(project.summary, language);
  const sector = pick(project.sector, language);
  const duration = pick(project.duration, language);
  const deliverables = (project.deliverables ?? [])
    .map((item) => pick(item, language))
    .filter(Boolean) as string[];

  const serviceLabel = {
    web: r.filterWeb,
    saas: r.filterSaas,
    mobile: r.filterMobile,
    seo: r.filterSeo,
  }[project.service];

  // One orchestrated entrance, continuing the shutter that closed over the
  // index page. Elements carry data-reveal so they stay visible without JS.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const eyebrow = hero.querySelector('[data-hero="eyebrow"]');
    const words = hero.querySelectorAll('[data-hero="word"]');
    const lede = hero.querySelector('[data-hero="lede"]');
    const actions = hero.querySelector('[data-hero="actions"]');

    const timeline = createTimeline({
      defaults: { ease: 'outCubic', duration: 600 },
    });

    if (eyebrow) timeline.add(eyebrow, { opacity: [0, 1], translateY: [10, 0] }, 0);
    if (words.length) {
      timeline.add(
        words,
        { opacity: [0, 1], translateY: [26, 0], duration: 720, delay: stagger(55) },
        150
      );
    }
    if (lede) timeline.add(lede, { opacity: [0, 1], translateY: [12, 0] }, 420);
    if (actions) timeline.add(actions, { opacity: [0, 1], translateY: [12, 0] }, 540);

    return () => {
      timeline.revert();
    };
  }, [project.slug]);

  const cover = project.coverImage;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/realisations"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-faint hover:text-ink transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {r.backToWork}
          </Link>

          <p
            data-hero="eyebrow"
            data-reveal
            className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-5"
          >
            {'// '}
            {r.caseStudy}
            {sector ? ` · ${sector}` : ''}
          </p>

          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
            {/* Real space text nodes between the spans, so the heading still
                reads and copies as "BS Move" rather than "BSMove". */}
            {project.title.split(' ').map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                {index > 0 && ' '}
                <span data-hero="word" data-reveal className="inline-block">
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>

          {(tagline || summary) && (
            <p
              data-hero="lede"
              data-reveal
              className="mt-6 text-body md:text-lg leading-relaxed max-w-2xl"
            >
              {tagline ?? summary}
            </p>
          )}

          <div data-hero="actions" data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            {project.siteLink && (
              <a
                href={project.siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand hover:bg-brand-strong text-ink rounded-lg font-mono text-xs uppercase tracking-[0.15em] transition-colors"
              >
                {r.visitSite}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-faint">
              {serviceLabel}
              {project.year ? ` / ${project.year}` : ''}
            </span>
          </div>

          <div className="mt-10 text-brand/50">
            <CircuitTrace className="w-56 h-4" delay={700} />
          </div>
        </div>
      </section>

      {/* Cover */}
      {cover?.asset && (
        <section className="px-6">
          <div className="max-w-7xl mx-auto">
            <MediaReveal className="rounded-xl border border-edge bg-surface-2 aspect-[16/9]">
              <Image
                src={cover.asset.url}
                alt={cover.alt ?? project.title}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 1280px"
                placeholder={cover.asset.metadata?.lqip ? 'blur' : 'empty'}
                blurDataURL={cover.asset.metadata?.lqip}
              />
            </MediaReveal>
          </div>
        </section>
      )}

      {/* Facts */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-edge pt-8">
              <MetaCell label={r.client} value={project.clientName} />
              <MetaCell label={r.sector} value={sector} />
              <MetaCell label={r.year} value={project.year} />
              <MetaCell label={r.duration} value={duration} />
            </dl>
          </Reveal>

          {deliverables.length > 0 && (
            <Reveal className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint mb-3">
                {r.delivered}
              </p>
              <ul className="flex flex-wrap gap-2">
                {deliverables.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-xs uppercase tracking-[0.1em] text-body border border-edge rounded-lg px-3 py-1.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* Results */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="pb-4 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-8">
                {'// '}
                {r.results}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                {project.metrics.map((metric, index) => (
                  <div key={metric._key ?? index} className="border-l border-edge pl-5">
                    <CountUp
                      value={metric.value}
                      delay={index * 120}
                      className="block font-display text-4xl md:text-5xl font-bold tracking-tight text-ink tabular-nums"
                    />
                    {pick(metric.label, language) && (
                      <p className="mt-2 text-sm text-faint leading-snug">
                        {pick(metric.label, language)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Story */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <StorySection label={r.challenge} blocks={pickBlocks(project.challenge, language)} />
          <StorySection label={r.approach} blocks={pickBlocks(project.approach, language)} />
          <StorySection label={r.outcome} blocks={pickBlocks(project.outcome, language)} />

          {project.techStack && project.techStack.length > 0 && (
            <Reveal className="grid md:grid-cols-12 gap-6 md:gap-12 py-10 border-t border-edge">
              <div className="md:col-span-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
                  {'// '}
                  {r.techStack}
                </h2>
              </div>
              <ul className="md:col-span-8 flex flex-wrap gap-2 h-fit">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-xs text-body border border-edge rounded-lg px-3 py-1.5 hover:border-brand/40 transition-colors"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-16 md:pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
                {'// '}
                {r.gallery}
              </p>
            </Reveal>
            <ProjectGallery items={project.gallery} />
          </div>
        </section>
      )}

      {/* Testimonial */}
      {pick(project.testimonial?.quote, language) && (
        <section className="pb-16 md:pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <figure className="border border-edge rounded-xl p-8 md:p-12 bg-surface">
                <CircuitTrace className="w-32 h-4 text-brand/60 mb-6" />
                <blockquote className="font-display text-xl md:text-2xl text-ink leading-relaxed tracking-tight">
                  “{pick(project.testimonial?.quote, language)}”
                </blockquote>
                {project.testimonial?.author && (
                  <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-faint">
                    {project.testimonial.author}
                    {pick(project.testimonial?.role, language)
                      ? ` · ${pick(project.testimonial?.role, language)}`
                      : ''}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      {/* Next project */}
      {nextProject && (
        <section className="pb-20 md:pb-28 px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/realisations/${nextProject.slug}`}
              className="group block border-t border-edge pt-8 relative"
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-px w-0 bg-brand transition-[width] duration-700 ease-out group-hover:w-full"
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint mb-3">
                {r.nextProject}
              </p>
              <div className="flex items-center justify-between gap-6">
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-ink">
                  {nextProject.title}
                </h2>
                <ArrowRight className="w-6 h-6 text-brand flex-shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </Link>
          </div>
        </section>
      )}

      <CTASection />
    </main>
  );
}
