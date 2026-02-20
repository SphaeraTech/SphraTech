'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();

  const highlight = t.cta.title.match(/the idea|l'idée|la idea/)?.[0];
  const firstPart = t.cta.title.split(/the idea|l'idée|la idea/)[0];

  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[40px] overflow-hidden">

          {/* Soft outer glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF3838] to-[#FF3838] opacity-40 blur-3xl" />

          {/* Card */}
          <div className="
            relative
            bg-gradient-to-br from-[#17384d] to-[#102736]
            rounded-[40px]
            px-8 md:px-20
            py-20
            text-center
            border border-white/5
          ">

            {/* Subtle dot texture */}
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:14px_14px]" />

            <div className="relative z-10">

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                {firstPart}
                <span className="text-white/60 font-light">
                  {highlight}
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-300/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                {t.cta.desc}
              </p>

              {/* Button */}
              <a
                href="contact"
                className="
                  inline-flex items-center gap-3
                  px-8 py-4
                  rounded-full
                  bg-gradient-to-r from-[#FF3838] to-[#FF3838]
                  text-white
                  font-semibold
                  tracking-wide
                  transition-all
                  hover:scale-105
                  hover:shadow-[0_0_25px_rgba(255, 56, 56,0.5)]
                "
              >
                {t.cta.button}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

            </div>
          </div>

          {/* Bottom subtle line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-px bg-white/5" />
        </div>
      </div>
    </section>
  );
}
