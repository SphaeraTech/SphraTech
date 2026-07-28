'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Reveal from '@/components/motion/Reveal';

interface FAQItem {
  question: string;
  answer: string;
  category: number;
}

export default function FAQSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqItems: FAQItem[] = t.faq?.items;
  const filteredFAQs = faqItems.filter((item) => item.category === activeCategory);
  const categories: string[] =
    t.faq?.categories ?? ['General', 'Services', 'Collaboration', 'Innovation'];

  return (
    <section id="faq" className="py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="FAQ"
          title={t.faq?.title || 'Frequently asked questions'}
          lede={t.faq?.subtitle}
        />

        {/* Category tabs */}
        <Reveal className="flex flex-wrap gap-3 mb-10">
          {categories.map((label, index) => {
            const isActive = activeCategory === index;
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveCategory(index);
                  setOpenItems([]);
                }}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-[0.15em] border transition-colors ${
                  isActive
                    ? 'text-brand border-brand bg-brand/10'
                    : 'text-body border-edge hover:border-edge-strong'
                }`}
              >
                {label}
              </button>
            );
          })}
        </Reveal>

        <div className="space-y-3">
          {filteredFAQs.map((item, index) => {
            const isOpen = openItems.includes(index);
            return (
              <Reveal key={`${activeCategory}-${index}`} delay={index * 50}>
                <div
                  className={`bg-surface border rounded-xl transition-colors ${
                    isOpen ? 'border-brand/40' : 'border-edge hover:border-edge-strong'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 md:px-8 py-5 text-left flex items-center justify-between gap-4"
                  >
                    <h3 className="font-display text-base md:text-lg font-bold text-ink">
                      {item.question}
                    </h3>
                    <span className="w-8 h-8 rounded-lg border border-edge text-brand flex items-center justify-center flex-shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 md:px-8 pb-6 text-body leading-relaxed border-l-2 border-brand/40 ml-6 md:ml-8 pl-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
