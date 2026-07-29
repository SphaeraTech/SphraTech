'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { animate, stagger, utils } from 'animejs';
import { cn } from '@/utils/tailwind';
import type { Project, ServiceKey } from '@/lib/projects';
import { useLanguage } from '@/app/contexts/LanguageContext';
import ProjectRow from './ProjectRow';

const FILTER_ORDER: ServiceKey[] = ['web', 'saas', 'mobile', 'seo'];

interface ProjectIndexProps {
  projects: Project[];
}

export default function ProjectIndex({ projects }: ProjectIndexProps) {
  const { t } = useLanguage();
  const r = t.realisations;
  const router = useRouter();

  const [filter, setFilter] = useState<ServiceKey | 'all'>('all');
  /** The href we're transitioning to; also gates the shutter into the DOM. */
  const [leavingTo, setLeavingTo] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string, HTMLElement>());

  const registerRef = useCallback((slug: string, el: HTMLElement | null) => {
    if (el) rowRefs.current.set(slug, el);
    else rowRefs.current.delete(slug);
  }, []);

  /** Only offer filters that actually have projects behind them. */
  const availableFilters = useMemo(() => {
    const present = new Set(projects.map((p) => p.service));
    return FILTER_ORDER.filter((key) => present.has(key));
  }, [projects]);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.service === filter)),
    [projects, filter]
  );

  // Re-stagger the list whenever the filter changes so the set feels re-dealt
  // rather than swapped. Skipped on first paint — Reveal already handles that.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rows = Array.from(list.children) as HTMLElement[];
    if (!rows.length) return;
    animate(rows, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 480,
      ease: 'outCubic',
      delay: stagger(60),
    });
  }, [filter]);

  /**
   * The exit sequence. Unselected rows drop away, the chosen one holds a beat
   * longer, then a shutter rises over the page and we navigate underneath it.
   * The case study plays its own entrance, so the two read as one movement.
   */
  const handleNavigate = useCallback(
    (href: string) => {
      if (leavingTo) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href);
        return;
      }
      setLeavingTo(href);
    },
    [leavingTo, router]
  );

  // Runs once the shutter is in the DOM, so it can be measured and moved
  // before the browser paints it in its resting position.
  useLayoutEffect(() => {
    if (!leavingTo) return;
    const overlay = overlayRef.current;
    if (!overlay) {
      router.push(leavingTo);
      return;
    }

    const slug = leavingTo.split('/').pop() ?? '';
    const others = Array.from(rowRefs.current.entries())
      .filter(([s]) => s !== slug)
      .map(([, el]) => el);
    const target = rowRefs.current.get(slug);

    if (others.length) {
      animate(others, {
        opacity: 0,
        translateY: 14,
        duration: 320,
        ease: 'outQuad',
        delay: stagger(45),
      });
    }
    if (target) {
      animate(target, { opacity: 0, duration: 360, ease: 'outQuad', delay: 240 });
    }

    utils.set(overlay, { translateY: '100%' });
    animate(overlay, {
      translateY: '0%',
      duration: 520,
      ease: 'inOutQuart',
      delay: 180,
      onComplete: () => router.push(leavingTo),
    });
  }, [leavingTo, router]);

  // Coming back via the browser's back button can restore this page from
  // bfcache mid-transition — drop the shutter so the list is usable again.
  useEffect(() => {
    const reset = () => setLeavingTo(null);
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);

  if (projects.length === 0) {
    return (
      <p className="font-mono text-sm text-faint border border-edge rounded-xl p-8 text-center">
        {r.empty}
      </p>
    );
  }

  return (
    <>
      {availableFilters.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {(['all', ...availableFilters] as const).map((key) => {
            const label =
              key === 'all'
                ? r.filterAll
                : { web: r.filterWeb, saas: r.filterSaas, mobile: r.filterMobile, seo: r.filterSeo }[
                    key
                  ];
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={active}
                className={cn(
                  'font-mono text-xs uppercase tracking-[0.15em] rounded-lg border px-4 py-2 transition-colors',
                  active
                    ? 'border-brand text-ink'
                    : 'border-edge text-faint hover:border-edge-strong hover:text-body'
                )}
              >
                {label}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-xs tracking-[0.15em] text-faint tabular-nums">
            {String(visible.length).padStart(2, '0')}
            <span className="text-edge-strong"> / </span>
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      )}

      <div ref={listRef}>
        {visible.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={index}
            reversed={index % 2 === 1}
            onNavigate={handleNavigate}
            registerRef={registerRef}
          />
        ))}
      </div>
      <div className="border-t border-edge" />

      {/* Page shutter — rises over the nav (z-50) as we leave. */}
      {leavingTo && (
        <div ref={overlayRef} aria-hidden className="fixed inset-0 z-[60] bg-base">
          <span className="absolute top-0 left-0 w-full h-px bg-brand" />
        </div>
      )}
    </>
  );
}
