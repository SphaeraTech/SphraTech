'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { FlipWords } from "@/app/components/ui/FlipWords";
import { ArrowRight, PlayCircle, CheckCircle, Users, Rocket, Award, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { t } = useLanguage();
  const words1 = ["Vision", "Dream", "Idea", "Goal"];
  const words2 = ["Reality", "Success", "Achievement", "Result"];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
     

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-12">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t.hero.title1}
            <span className="bg-clip-text bg-gradient-to-r text-red-500">
              <FlipWords words={words1} />
            </span>{' '}
            {t.hero.title3}
            <br />
            <span className="bg-clip-text bg-gradient-to-r text-red-500">
              <FlipWords words={words2} />
            </span>{' '}
            {t.hero.title5}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-full font-semibold hover:from-red-500 hover:to-red-400 transition-all flex items-center gap-2 hover:gap-4 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
            >
              <a href="contact"> {t.hero.ctaBtn}</a>


              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>


          </div>

          {/* Social Proof Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-red-500/30 transition-all">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-red-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">150+</div>
                <div className="text-sm text-slate-400">Happy Clients</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-red-500/30 transition-all">
                <div className="flex items-center justify-center mb-2">
                  <Rocket className="w-8 h-8 text-red-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">300+</div>
                <div className="text-sm text-slate-400">Projects Done</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-red-500/30 transition-all">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-8 h-8 text-red-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-red-500/30 transition-all">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-red-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">5+</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </div>
            </div>
          </div> */}

          {/* Trust Indicators */}
          {/* <div className="flex flex-wrap justify-center items-center gap-8 mb-8 opacity-60">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-slate-300">Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-slate-300">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-slate-300">Fast Delivery</span>
            </div>
          </div> */}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom--10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"
          >
            <span className="text-sm">{t.hero.scrollBtn}</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}