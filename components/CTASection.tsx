'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Reveal from '@/components/motion/Reveal';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="relative bg-surface border border-edge rounded-xl px-8 md:px-20 py-16 md:py-20 text-center overflow-hidden">
            {/* Thin red rule — the card's only accent */}
            <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-brand" />

            <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-6">
              {'// '}Contact
            </p>

            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink mb-6">
              {t.cta.title}
            </h2>

            <p className="text-body text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              {t.cta.desc}
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-strong text-ink font-semibold rounded-lg transition-colors"
            >
              {t.cta.button}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
