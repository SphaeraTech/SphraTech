'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const link = 'text-body hover:text-ink transition-colors';

  return (
    <footer className="bg-base border-t border-edge py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint mb-4">
              {t.footer.company}
            </h3>
            <ul className="space-y-3">
              <li><a href="/about" className={link}>{t.footer.aboutUs}</a></li>
              <li><a href="/about#team" className={link}>{t.footer.team}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint mb-4">
              {t.footer.services}
            </h3>
            <ul className="space-y-3">
              <li><a href="/services/saas-solutions" className={link}>{t.footer.saas}</a></li>
              <li><a href="/services/web-development" className={link}>{t.footer.webDev}</a></li>
              <li><a href="/services/mobile-development" className={link}>{t.footer.mobileDev}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint mb-4">
              {t.footer.resources}
            </h3>
            <ul className="space-y-3">
              <li><a href="/blog" className={link}>{t.footer.blog}</a></li>
              <li><a href="/free-tools" className={link}>{t.nav.freeTools}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint mb-4">
              {t.footer.follow}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/company/spheradev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-edge">
          <div className="flex items-center gap-3">
            <img src="/navbar-logo.png" alt="SpheraTech logo" className="w-10 h-auto" />
            <span className="font-display font-bold text-ink text-lg">SpheraTech</span>
          </div>

          <div className="text-faint text-sm text-center sm:text-right">
            <p>&copy; {new Date().getFullYear()} SpheraTech. {t.footer.rights || 'All rights reserved.'}</p>
            <p className="mt-1">
              <a href="/privacy" className="hover:text-body transition-colors mx-2">Privacy Policy</a>
              |
              <a href="/terms" className="hover:text-body transition-colors mx-2">Terms of Service</a>
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToTop}
            className="group px-5 py-2.5 border border-edge hover:border-brand text-body hover:text-brand rounded-lg transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]"
            aria-label="Scroll to top"
          >
            <svg
              className="w-4 h-4 transform transition-transform group-hover:-translate-y-0.5"
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
