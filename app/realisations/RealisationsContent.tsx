'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import ProjectCard from '@/components/ProjectCard';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/motion/Reveal';
import CircuitTrace from '@/components/motion/CircuitTrace';

interface Client {
  name: string;
  description: string;
  pictures: string[];
  siteLink?: string;
}

export default function RealisationsContent() {
  const { t } = useLanguage();
  const webClients: Client[] = (t.services.webDev as { clients?: Client[] }).clients ?? [];
  const saasClients: Client[] = (t.services.saas as { clients?: Client[] }).clients ?? [];

  return (
    <main className="min-h-screen">
      {/* Page header */}
      <section className="pt-32 pb-8 px-6">
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

      {/* Websites & platforms */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
              {t.realisations.webTitle}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {webClients.map((client, index) => (
              <Reveal key={client.name} delay={index * 70} className="h-full">
                <ProjectCard client={{ siteLink: '', ...client }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS products */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
              {t.realisations.saasTitle}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {saasClients.map((client, index) => (
              <Reveal key={client.name} delay={index * 70} className="h-full">
                <ProjectCard client={{ siteLink: '', ...client }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
