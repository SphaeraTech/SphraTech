'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import SectionHeader from '@/components/SectionHeader';
import Reveal from '@/components/motion/Reveal';

const IconWorkspacePremium = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 1L9.5 6.5 3 7.27l4.5 4.38L6.18 18 12 14.77 17.82 18l-1.32-6.35L21 7.27l-6.5-.77z" />
  </svg>
);

const IconPayments = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </svg>
);

const IconSearchInsights = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const IconDraw = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96a1 1 0 0 0 0-1.41L18.37.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
);

const IconPersonCelebrate = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    <circle cx="18" cy="5" r="1.5" />
  </svg>
);

const IconVerifiedGhost = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-36 h-36">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-12 h-12 bg-brand/10 border border-brand/30 text-brand rounded-lg flex items-center justify-center flex-shrink-0">
      {children}
    </div>
  );
}

export default function WhyChooseUsSection() {
  const { t } = useLanguage();
  const w = t.why;
  const c = w.cards;

  const card =
    'bg-surface border border-edge hover:border-brand/40 rounded-xl p-6 md:p-8 transition-colors';

  return (
    <section id="about" className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Why us"
          title={w.title.replace('\n', ' ')}
          lede={w.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Quality — tall featured card */}
          <Reveal className="lg:col-span-4 lg:row-span-2">
            <div className={`${card} relative overflow-hidden h-full flex flex-col justify-between`}>
              <div aria-hidden="true" className="absolute top-4 right-4 text-brand opacity-[0.06] pointer-events-none">
                <IconVerifiedGhost />
              </div>
              <div>
                <div className="mb-8">
                  <IconBox>
                    <IconWorkspacePremium />
                  </IconBox>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink mb-4">{c.quality.title}</h3>
                <p className="text-body leading-relaxed">{c.quality.desc}</p>
              </div>
              <div className="mt-12 flex items-center gap-3 font-mono text-brand text-[0.7rem] uppercase tracking-[0.2em]">
                {c.quality.tag}
                <span className="h-px w-12 bg-brand/50" />
              </div>
            </div>
          </Reveal>

          {/* Price */}
          <Reveal delay={70} className="lg:col-span-8">
            <div className={`${card} h-full flex flex-col sm:flex-row gap-6 sm:items-center`}>
              <IconBox>
                <IconPayments />
              </IconBox>
              <div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">{c.price.title}</h3>
                <p className="text-body leading-relaxed">{c.price.desc}</p>
              </div>
            </div>
          </Reveal>

          {/* Personalized */}
          <Reveal delay={140} className="lg:col-span-8">
            <div className={`${card} h-full flex flex-col sm:flex-row gap-6 sm:items-start`}>
              <IconBox>
                <IconPersonCelebrate />
              </IconBox>
              <div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">{c.personal.title}</h3>
                <p className="text-body leading-relaxed">{c.personal.desc}</p>
              </div>
            </div>
          </Reveal>

          {/* SEO */}
          <Reveal className="lg:col-span-4">
            <div className={`${card} h-full`}>
              <div className="mb-6">
                <IconBox>
                  <IconSearchInsights />
                </IconBox>
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">{c.seo.title}</h3>
              <p className="text-body leading-relaxed">{c.seo.desc}</p>
            </div>
          </Reveal>

          {/* Design */}
          <Reveal delay={70} className="lg:col-span-4">
            <div className={`${card} h-full`}>
              <div className="mb-6">
                <IconBox>
                  <IconDraw />
                </IconBox>
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">{c.design.title}</h3>
              <p className="text-body leading-relaxed">{c.design.desc}</p>
            </div>
          </Reveal>

          {/* Fast — the one solid-red accent card */}
          <Reveal delay={140} className="lg:col-span-4">
            <div className="h-full bg-brand rounded-xl p-6 md:p-8 flex flex-col justify-between text-ink">
              <div className="mb-6">
                <IconBolt />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-2">{c.fast.title}</h3>
                <p className="text-ink/85 text-sm leading-relaxed">{c.fast.desc}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
