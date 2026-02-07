'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { FlipWords } from "@/app/components/ui/FlipWords";

export default function HeroSection() {
  const { t } = useLanguage();
  const words1 = ["Vision", "Dream", "Idea", "Goal"];
  const words2 = ["Reality", "Success", "Achievement", "Result"];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-custom-blue-900 via-custom-blue-950 to-slate-900">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>0

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {t.hero.title1}
          <span className=" bg-clip-text bg-gradient-to-r text-red-500">
            <FlipWords words={words1} />
          </span>{' '}
          {t.hero.title3}
          <br />
          <span className=" bg-clip-text bg-gradient-to-r text-red-500 ">
            <FlipWords words={words2} />
          </span>{' '}
          {t.hero.title5}
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  );
}