'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { freeToolsData, categories } from '@/lib/freeToolsData';
import FreeToolCard from '@/components/FreeToolCard';
import Reveal from '@/components/motion/Reveal';

export default function FreeToolsContent() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = freeToolsData.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const tabClass = (isActive: boolean) =>
    `px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-[0.15em] border transition-colors ${
      isActive
        ? 'text-brand border-brand bg-brand/10'
        : 'text-body border-edge hover:border-edge-strong'
    }`;

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <Reveal className="mb-12">
          <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-4">
            {'// '}Free tools
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink">
            {t.freeTools?.title || 'Free tools'}
          </h1>
          <p className="mt-4 max-w-2xl text-body md:text-lg">
            {t.freeTools?.subtitle || 'Tools to help you work faster and more efficiently.'}
          </p>
        </Reveal>

        {/* Categories and Search */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={() => setSelectedCategory('all')} className={tabClass(selectedCategory === 'all')}>
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={tabClass(selectedCategory === category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
            <input
              type="text"
              placeholder={t.freeTools?.searchPlaceholder || 'Search tools'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-2 border border-edge rounded-lg text-ink placeholder-faint focus:outline-none focus:border-brand transition-colors"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool, index) => (
            <Reveal key={tool.id} delay={(index % 3) * 70}>
              <FreeToolCard tool={tool} />
            </Reveal>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-xl font-bold text-ink mb-2">
              {t.freeTools?.noResults || 'No tools found'}
            </p>
            <p className="text-body">
              {t.freeTools?.noResultsDesc || 'Try adjusting your search or filters'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
