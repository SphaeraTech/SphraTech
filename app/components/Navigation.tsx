'use client';

import { Globe, Menu, X, Languages, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showMobileProductsMenu, setShowMobileProductsMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br rounded-lg transform -rotate-12 flex items-center justify-center">
            <a href="/">
              <img src="/navbar-logo.png" alt="SphæraTech Logo" width="64px" />
            </a>
          </div>
          <span className="ml-5 text-xl font-bold">
            <a href="/">SphaeraTech</a>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/#home" className="hover:text-red-400 transition">{t.nav.home}</a>
          <a href="/#services" className="hover:text-red-400 transition">{t.nav.services}</a>
          
          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProductsMenu(!showProductsMenu)}
              onMouseEnter={() => setShowProductsMenu(true)}
              onMouseLeave={() => setShowProductsMenu(false)}
              className="flex items-center gap-1 hover:text-red-400 transition"
            >
              {t.nav.products}
              <ChevronDown className={`w-4 h-4 transition-transform ${showProductsMenu ? 'rotate-180' : ''}`} />
            </button>
            {showProductsMenu && (
              <div 
                className="absolute top-full mt-2 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden shadow-xl min-w-[180px]"
                onMouseEnter={() => setShowProductsMenu(true)}
                onMouseLeave={() => setShowProductsMenu(false)}
              >
              
                <Link
                  href="/free-tools"
                  className="block px-4 py-3 text-left hover:bg-slate-700 transition"
                  onClick={() => setShowProductsMenu(false)}
                >
                  {t.nav.freeTools}
                </Link>
              </div>
            )}
          </div>

          <a href="/blog" className="hover:text-red-400 transition">{t.nav.blog}</a>
          <a href="/about" className="hover:text-red-400 transition">{t.nav.about}</a>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 hover:text-red-400 transition"
            >
              <Languages className="w-5 h-5" />
              <span className="uppercase">{language}</span>
            </button>
            {showLangMenu && (
              <div className="absolute top-full mt-2 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden shadow-xl min-w-[140px]">
                <button
                  onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                  className="block w-full px-4 py-2 text-left hover:bg-slate-700 transition"
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage('fr'); setShowLangMenu(false); }}
                  className="block w-full px-4 py-2 text-left hover:bg-slate-700 transition"
                >
                  Français
                </button>
                <button
                  onClick={() => { setLanguage('es'); setShowLangMenu(false); }}
                  className="block w-full px-4 py-2 text-left hover:bg-slate-700 transition"
                >
                  Español
                </button>
              </div>
            )}
          </div>

          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-slate-950 transition">
            <a href="contact"> {t.nav.contact}</a>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="flex flex-col gap-4 px-6 py-4">
            <a href="/#home" className="hover:text-red-400 transition">{t.nav.home}</a>
            <a href="/#services" className="hover:text-red-400 transition">{t.nav.services}</a>
            
            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={() => setShowMobileProductsMenu(!showMobileProductsMenu)}
                className="flex items-center justify-between w-full hover:text-red-400 transition"
              >
                <span>{t.nav.products}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showMobileProductsMenu ? 'rotate-180' : ''}`} />
              </button>
              {showMobileProductsMenu && (
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-slate-700 pl-4">
                
                  <Link
                    href="/free-tools"
                    className="block hover:text-red-400 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.nav.freeTools}
                  </Link>
                </div>
              )}
            </div>

            <a href="/blog" className="hover:text-red-400 transition">{t.nav.blog}</a>
            <a href="/about" className="hover:text-red-400 transition">{t.nav.about}</a>

            {/* Mobile Language Selector */}
            <div className="flex gap-2 pt-2 border-t border-slate-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded ${language === 'en' ? 'bg-red-500' : 'bg-slate-700'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 rounded ${language === 'fr' ? 'bg-red-500' : 'bg-slate-700'}`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 rounded ${language === 'es' ? 'bg-red-500' : 'bg-slate-700'}`}
              >
                ES
              </button>
            </div>

            <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-slate-950 transition w-full">
              {t.nav.contact}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}