'use client';

import { Menu, X, Languages, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showMobileProductsMenu, setShowMobileProductsMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const link = 'text-body hover:text-ink transition-colors';

  return (
    <nav className="fixed top-0 w-full z-50 bg-base/85 backdrop-blur-lg border-b border-edge">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/navbar-logo.png" alt="SpheraTech logo" className="w-10 h-auto" />
          <span className="font-display text-xl font-bold text-ink">SpheraTech</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={link}>{t.nav.home}</Link>
          <Link href="/services" className={link}>{t.nav.services}</Link>

          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProductsMenu(!showProductsMenu)}
              className={`flex items-center gap-1 ${link}`}
            >
              {t.nav.products}
              <ChevronDown className={`w-4 h-4 transition-transform ${showProductsMenu ? 'rotate-180' : ''}`} />
            </button>
            {showProductsMenu && (
              <div className="absolute top-full mt-2 bg-surface rounded-lg border border-edge overflow-hidden shadow-xl min-w-[180px]">
                <Link
                  href="/free-tools"
                  className="block px-4 py-3 text-left text-body hover:text-ink hover:bg-surface-2 transition-colors"
                  onClick={() => setShowProductsMenu(false)}
                >
                  {t.nav.freeTools}
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className={link}>{t.nav.blog}</Link>
          <Link href="/about" className={link}>{t.nav.about}</Link>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className={`flex items-center gap-2 ${link}`}
            >
              <Languages className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-[0.15em]">{language}</span>
            </button>
            {showLangMenu && (
              <div className="absolute top-full mt-2 bg-surface rounded-lg border border-edge overflow-hidden shadow-xl min-w-[140px]">
                {([['en', 'English'], ['fr', 'Français'], ['es', 'Español']] as const).map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => { setLanguage(code); setShowLangMenu(false); }}
                    className="block w-full px-4 py-2 text-left text-body hover:text-ink hover:bg-surface-2 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="px-5 py-2 bg-brand hover:bg-brand-strong text-ink font-semibold rounded-lg transition-colors"
          >
            {t.nav.contact}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-ink"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-edge">
          <div className="flex flex-col gap-4 px-6 py-4">
            <Link href="/" className={link} onClick={() => setIsMenuOpen(false)}>{t.nav.home}</Link>
            <Link href="/services" className={link} onClick={() => setIsMenuOpen(false)}>{t.nav.services}</Link>

            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={() => setShowMobileProductsMenu(!showMobileProductsMenu)}
                className={`flex items-center justify-between w-full ${link}`}
              >
                <span>{t.nav.products}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showMobileProductsMenu ? 'rotate-180' : ''}`} />
              </button>
              {showMobileProductsMenu && (
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-edge pl-4">
                  <Link
                    href="/free-tools"
                    className={`block ${link}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.nav.freeTools}
                  </Link>
                </div>
              )}
            </div>

            <Link href="/blog" className={link} onClick={() => setIsMenuOpen(false)}>{t.nav.blog}</Link>
            <Link href="/about" className={link} onClick={() => setIsMenuOpen(false)}>{t.nav.about}</Link>

            {/* Mobile Language Selector */}
            <div className="flex gap-2 pt-2 border-t border-edge">
              {(['en', 'fr', 'es'] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`px-3 py-1 rounded-lg font-mono text-xs uppercase tracking-[0.15em] border transition-colors ${
                    language === code
                      ? 'text-brand border-brand bg-brand/10'
                      : 'text-body border-edge'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="px-5 py-2.5 bg-brand hover:bg-brand-strong text-ink font-semibold rounded-lg transition-colors text-center"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
