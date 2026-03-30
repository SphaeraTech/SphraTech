'use client';
import CTASection from '@/components/CTASection';
import { Target, Eye, Heart, Zap, Shield, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  const stats = [
    { value: a.stat1Value, label: a.stat1Label },
    { value: a.stat2Value, label: a.stat2Label },
    { value: a.stat3Value, label: a.stat3Label },
    { value: a.stat4Value, label: a.stat4Label },
  ];

  const values = [
    {
      icon: Heart,
      title: a.value1Title,
      desc: a.value1Desc,
      gradient: 'from-red-500/10 to-orange-500/10',
      border: 'border-red-500/20',
      iconBg: 'from-red-500 to-orange-500'
    },
    {
      icon: Zap,
      title: a.value2Title,
      desc: a.value2Desc,
      gradient: 'from-amber-500/10 to-yellow-500/10',
      border: 'border-amber-500/20',
      iconBg: 'from-amber-500 to-yellow-500'
    },
    {
      icon: Shield,
      title: a.value3Title,
      desc: a.value3Desc,
      gradient: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-500/20',
      iconBg: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: a.value4Title,
      desc: a.value4Desc,
      gradient: 'from-violet-500/10 to-fuchsia-500/10',
      border: 'border-violet-500/20',
      iconBg: 'from-violet-500 to-fuchsia-500'
    }
  ];

  const founderSkills = ['Next.js', 'TypeScript', 'UI/UX', 'SEO', 'Node.js', 'search engines'];
  const marketingSkills = ['Social Media', 'SEO', 'Content Strategy', 'Email Marketing', 'Paid Ads', 'Brand Strategy', 'Copywriting'];

  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white">

        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="relative pt-36 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm mb-8">
              <Heart className="w-4 h-4" />
              {a.heroBadge}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {a.heroTitle1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                {a.heroTitle2}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              {a.heroSubtitle}
            </p>
          </div>
        </section>

    
        {/* ── TEAM ───────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900" id='team'>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{a.teamTitle}</h2>
              <p className="text-xl text-slate-300">{a.teamSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">

              {/* ── Founder Card ───────────────────────────── */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-10 border border-slate-700 h-full">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-500/20 flex-shrink-0">
                      S
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">The Founder</h3>
                      <p className="text-red-400 font-medium text-sm">{a.founderRole}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic mb-8 text-sm">
                    {a.founderQuote}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {founderSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Marketing Lead Card ────────────────────── */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-10 border border-slate-700 h-full">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg shadow-fuchsia-500/20 flex-shrink-0">
                      M
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{a.marketingName}</h3>
                      <p className="text-fuchsia-400 font-medium text-sm">{a.marketingRole}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic mb-8 text-sm">
                    {a.marketingQuote}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {marketingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full text-xs text-fuchsia-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STORY ──────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-slate-900">
          <div className="max-w-7xl mx-auto">
               {/* Text */}
               <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  {a.storyTitle1}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    {a.storyHighlight}
                  </span>{' '}
                  {a.storyTitle2}
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">{a.storyP1}</p>
                <p className="text-lg text-slate-300 leading-relaxed">{a.storyP2}</p>
                <p className="text-lg text-slate-300 leading-relaxed">{a.storyP3}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full font-bold text-lg hover:scale-105 transition-all group"
                >
                  {a.storyCta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
          </div>
        </section>

        {/* ── MISSION & VISION ───────────────────────────────── */}
        <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{a.mvTitle}</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">{a.mvSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm rounded-3xl p-10 border border-red-800/30 hover:border-red-600/50 transition-all h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{a.missionTitle}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">{a.missionDesc}</p>
                </div>
              </div>

              {/* Vision */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-3xl p-10 border border-blue-800/30 hover:border-blue-600/50 transition-all h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{a.visionTitle}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">{a.visionDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ─────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{a.valuesTitle}</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">{a.valuesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <div
                    key={i}
                    className={`group relative bg-gradient-to-br ${value.gradient} backdrop-blur-sm rounded-2xl p-8 border ${value.border} hover:scale-105 transition-all duration-300`}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${value.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <CTASection />
      </main>

    </>
  );
}