'use client';
import CTASection from '@/components/CTASection';
import SectionHeader from '@/components/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import { Target, Eye, Heart, Zap, Shield, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  const values = [
    { icon: Heart, title: a.value1Title, desc: a.value1Desc },
    { icon: Zap, title: a.value2Title, desc: a.value2Desc },
    { icon: Shield, title: a.value3Title, desc: a.value3Desc },
    { icon: Users, title: a.value4Title, desc: a.value4Desc },
  ];

  const founderSkills = ['Next.js', 'TypeScript', 'UI/UX', 'SEO', 'Node.js'];
  const marketingSkills = ['Social Media', 'SEO', 'Content Strategy', 'Email Marketing', 'Paid Ads', 'Brand Strategy', 'Copywriting'];

  const card = 'bg-surface border border-edge hover:border-brand/40 rounded-xl transition-colors';

  return (
    <main className="min-h-screen">
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-4">
              {'// '}{a.heroBadge}
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-ink mb-6">
              {a.heroTitle1} <span className="text-brand">{a.heroTitle2}</span>
            </h1>
            <p className="text-lg md:text-xl text-body leading-relaxed max-w-3xl">
              {a.heroSubtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TEAM ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6" id="team">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Team" title={a.teamTitle} lede={a.teamSubtitle} />

          <div className="grid md:grid-cols-2 gap-5">
            {/* Founder */}
            <Reveal>
              <div className={`${card} p-8 md:p-10 h-full`}>
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-brand/10 border border-brand/30 text-brand rounded-lg flex items-center justify-center font-display text-2xl font-bold flex-shrink-0">
                    S
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">The Founder</h3>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand mt-1">
                      {a.founderRole}
                    </p>
                  </div>
                </div>
                <p className="text-body leading-relaxed italic mb-8">{a.founderQuote}</p>
                <div className="flex flex-wrap gap-2">
                  {founderSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-surface-2 border border-edge rounded-lg font-mono text-xs text-body"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Marketing Lead */}
            <Reveal delay={70}>
              <div className={`${card} p-8 md:p-10 h-full`}>
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-brand/10 border border-brand/30 text-brand rounded-lg flex items-center justify-center font-display text-2xl font-bold flex-shrink-0">
                    M
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">{a.marketingName}</h3>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand mt-1">
                      {a.marketingRole}
                    </p>
                  </div>
                </div>
                <p className="text-body leading-relaxed italic mb-8">{a.marketingQuote}</p>
                <div className="flex flex-wrap gap-2">
                  {marketingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-surface-2 border border-edge rounded-lg font-mono text-xs text-body"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-4">
              {'// '}Story
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink mb-8">
              {a.storyTitle1} <span className="text-brand">{a.storyHighlight}</span> {a.storyTitle2}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="max-w-3xl space-y-6">
              <p className="text-lg text-body leading-relaxed">{a.storyP1}</p>
              <p className="text-lg text-body leading-relaxed">{a.storyP2}</p>
              <p className="text-lg text-body leading-relaxed">{a.storyP3}</p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-strong text-ink font-semibold rounded-lg transition-colors"
              >
                {a.storyCta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MISSION & VISION ───────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Mission &amp; vision" title={a.mvTitle} lede={a.mvSubtitle} />

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Target, title: a.missionTitle, desc: a.missionDesc },
              { icon: Eye, title: a.visionTitle, desc: a.visionDesc },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className={`${card} p-8 md:p-10 h-full`}>
                  <div className="w-12 h-12 bg-brand/10 border border-brand/30 text-brand rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink mb-4">{title}</h3>
                  <p className="text-body text-lg leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Values" title={a.valuesTitle} lede={a.valuesSubtitle} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={i} delay={i * 70}>
                  <div className={`${card} p-8 h-full`}>
                    <div className="w-12 h-12 bg-brand/10 border border-brand/30 text-brand rounded-lg flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink mb-3">{value.title}</h3>
                    <p className="text-body text-sm leading-relaxed">{value.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <CTASection />
    </main>
  );
}
