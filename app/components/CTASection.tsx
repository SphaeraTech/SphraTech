'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-[#1a3d52] to-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#22577A] to-[#2d6a94] rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative bg-gradient-to-br from-[#22577A]/40 to-[#2d6a94]/40 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-[#22577A]/20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.cta.title.split(/the idea|l'idée|la idea/)[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3a8fba] to-[#5ba3c7]">
                {t.cta.title.match(/the idea|l'idée|la idea/)?.[0]}
              </span>
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              {t.cta.desc}
            </p>
            <button className="group px-10 py-4 bg-gradient-to-r from-[#22577A] to-[#2d6a94] rounded-full font-bold text-lg hover:from-[#2d6a94] hover:to-[#3a8fba] transition-all flex items-center gap-3 mx-auto hover:scale-105">
              {t.cta.button}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}