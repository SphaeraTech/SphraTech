'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Company Links */}
          <div>
            <h3 className="font-bold text-white mb-4">{t.footer.company}</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t.footer.aboutUs}
                </a>
              </li>
              <li>
                <a
                  href="/about#team"
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t.footer.team}
                </a>
              </li>
              {/*
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t.footer.careers}
                </a>
              </li>
              */}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-white mb-4">{t.footer.services}</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a
                  href="/services/saas-solutions"
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t.footer.saas}
                </a>
              </li>
              <li>
                <a
                  href="/services/web-development"
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t.footer.webDev}
                </a>
              </li>
              <li>
                <a
                  href="/services/mobile-development"
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t.footer.mobileDev}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-white mb-4">{t.footer.resources}</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a
                  href="/blog"
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t.footer.blog}
                </a>
              </li>
              {
                /*  <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t.footer.caseStudy}
                </a>
              </li>  */
              }

              {
                /*  <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {t.footer.testimonials}
                </a>
              </li>  */
              }

            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-white mb-4">{t.footer.follow}</h3>
            <ul className="space-y-3 text-slate-400">
              
              <li>
                <a
                  href="https://www.linkedin.com/company/spheradev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-2"
                >
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo and Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative">
            <img src="/navbar-logo.png" alt="SphæraTech Logo" width="64px" />

            </div>
            <span className="font-bold text-white text-lg">SpheraTech</span>
          </div>

          <div className="text-slate-400 text-sm text-center sm:text-right">
            <p>&copy; {new Date().getFullYear()} SpheraTech. {t.footer.rights || 'All rights reserved.'}</p>
            <p className="mt-1">
              <a href="/privacy" className="hover:text-white transition-colors mx-2">
                Privacy Policy
              </a>
              |
              <a href="/terms" className="hover:text-white transition-colors mx-2">
                Terms of Service
              </a>
            </p>
          </div>
        </div>

        {/* Go to Top Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToTop}
            className="px-6 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 active:scale-95 flex items-center gap-2 group"
            aria-label="Scroll to top"
          >
            <svg
              className="w-5 h-5 transform transition-transform group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {t.footer.goTop}
          </button>
        </div>
      </div>
    </footer>
  );
}