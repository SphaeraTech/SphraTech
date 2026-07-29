'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { Project } from '@/lib/projects';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/motion/Reveal';
import CircuitTrace from '@/components/motion/CircuitTrace';
import ProjectIndex from '@/components/projects/ProjectIndex';

export default function RealisationsContent({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      {/* Page header */}
      <section className="pt-32 pb-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-faint hover:text-ink transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t.productsPage.backToHome}
          </Link>

          <Reveal>
            <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-4">
              {'// '}Portfolio
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-ink mb-6">
              {t.realisations.title}
            </h1>
            <p className="text-body md:text-lg max-w-2xl leading-relaxed">
              {t.realisations.subtitle}
            </p>
          </Reveal>

          <div className="mt-10 text-brand/50">
            <CircuitTrace className="w-56 h-4" />
          </div>
        </div>
      </section>

      {/* The work */}
      <section className="pt-8 pb-20 md:pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <ProjectIndex projects={projects} />
        </div>
      </section>

      <CTASection />
    </main>
  );
}
