'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-gradient-to-br ">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            ></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {t.contact.hero.title.replace('{amazing}', '')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  {t.contact.hero.amazing}
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                {t.contact.hero.subtitle}
              </p>
            </div>

            {/* Contact Form Component */}
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
