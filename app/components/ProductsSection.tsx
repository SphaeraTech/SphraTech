'use client';

import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from './ProductCard';
import { productsData } from '../lib/productsData';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProductsSection() {
  const { t } = useLanguage();

  return (
    <section id="products" className="min-h-screen py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.products.title}</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            {t.products.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {productsData.map((product) => (
            <ProductCard
              key={product.slug}
              iconName={product.iconName}
              titleKey={product.titleKey}
              descKey={product.descKey}
              gradient={product.gradient}
              border={product.border}
              iconBg={product.iconBg}
              hoverBg={product.hoverBg}
            />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-600 to-red-600 rounded-full font-bold text-lg hover:from-red-500 hover:to-red-500 transition-all hover:scale-105"
          >
            {t.products.viewAll}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}