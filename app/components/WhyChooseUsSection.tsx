'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function WhyChooseUsSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-br from-red-950/30 via-slate-900 to-red-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-12 border border-red-500/20">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 transform rotate-6">
                <div className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center transform -rotate-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="h-2 bg-red-600/30 rounded flex-1"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="h-2 bg-red-600/30 rounded flex-1 w-3/4"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="h-2 bg-red-600/30 rounded flex-1 w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t.why.title.split(/choose us|nous choisir|elegirnos/)[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-400">
                {t.why.title.match(/choose us|nous choisir|elegirnos/)?.[0]}
              </span>
              ?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {t.why.desc}
            </p>
            <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-600 rounded-full font-semibold hover:from-red-500 hover:to-red-500 transition-all flex items-center gap-2 hover:gap-4">
              {t.why.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}