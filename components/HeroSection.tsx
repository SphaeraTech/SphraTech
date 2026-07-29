'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { animate, createTimeline, svg, utils } from 'animejs';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const steps = root.querySelectorAll<HTMLElement>('[data-hero]');
    const traces = root.querySelectorAll<SVGPathElement>('[data-hero-trace]');
    const nodes = root.querySelectorAll<SVGCircleElement>('[data-hero-node]');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      utils.set([...steps, ...traces, ...nodes], { opacity: 1 });
      return;
    }

    utils.set(nodes, { opacity: 0 });
    const tl = createTimeline({ defaults: { ease: 'outCubic' } });
    tl.add(steps, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      delay: (_: unknown, i: number = 0) => i * 130,
    });

    traces.forEach((trace, i) => {
      const [drawable] = svg.createDrawable(trace);
      utils.set(trace, { opacity: 1 });
      tl.add(drawable, { draw: '0 1', duration: 900, ease: 'inOutQuad' }, 450 + i * 150);
    });
    nodes.forEach((node, i) => {
      tl.add(node, { opacity: [0, 1], scale: [0, 1], duration: 300, ease: 'outBack' }, 1250 + i * 150);
    });
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden"
    >
      {/* The site's single gradient: one quiet red wash behind the headline. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 38%, rgba(236,50,52,0.09) 0%, transparent 70%)',
        }}
      />
      {/* Faint engineering grid, contained to the hero and faded out at the edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 30%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p
          data-hero
          data-reveal
          className="font-mono text-brand text-xs md:text-sm uppercase tracking-[0.3em] mb-6"
        >
          {'// '}Web · SaaS · Mobile · SEO
        </p>

        <h1
          data-hero
          data-reveal
          className="font-display text-5xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05] mb-8"
        >
          {t.hero.title1} <span className="text-brand">{t.hero.title2}</span> {t.hero.title3}{' '}
          <span className="text-brand">{t.hero.title4}</span> {t.hero.title5}
        </h1>

        <p data-hero data-reveal className="text-lg md:text-xl text-body max-w-2xl mx-auto mb-10">
          {t.hero.subtitle}
        </p>

        <div
          data-hero
          data-reveal
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-strong text-ink font-semibold rounded-lg transition-colors"
          >
            {t.hero.ctaBtn}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-edge hover:border-brand text-ink font-semibold rounded-lg transition-colors"
          >
            {t.hero.seeWorkBtn}
          </Link>
        </div>

        {/* Signature: circuit traces drawn from the logo's own detailing. */}
        <div aria-hidden="true" className="mt-16 flex items-center justify-center gap-6 text-brand/70">
          <svg viewBox="0 0 320 24" fill="none" preserveAspectRatio="xMaxYMid meet" className="h-5 w-16 sm:w-40 md:w-64 shrink-0" style={{ transform: 'scaleX(-1)' }}>
            <path data-hero-trace d="M0 20 H176 L192 6 H298" stroke="currentColor" strokeWidth="1.5" opacity="0" />
            <circle data-hero-node cx="306" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" style={{ transformOrigin: '306px 6px' }} />
          </svg>
          <span data-hero data-reveal className="font-mono text-faint text-xs uppercase tracking-[0.25em]">
            {t.hero.scrollBtn}
          </span>
          <svg viewBox="0 0 320 24" fill="none" preserveAspectRatio="xMinYMid meet" className="h-5 w-16 sm:w-40 md:w-64 shrink-0">
            <path data-hero-trace d="M0 20 H176 L192 6 H298" stroke="currentColor" strokeWidth="1.5" opacity="0" />
            <circle data-hero-node cx="306" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" style={{ transformOrigin: '306px 6px' }} />
          </svg>
        </div>
      </div>
    </section>
  );
}
