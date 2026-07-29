import ProductCard from '@/components/ProductCard';
import { productsData } from '@/lib/productsData';
import { translations } from '@/lib/translations';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Reveal from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Our Products',
  alternates: { canonical: '/products' },
  description: 'Explore our range of innovative software products and solutions',
};

export default function ProductsPage() {
  const t = translations.en;

  return (
    <>

      <main className="min-h-screen">
        {/* Header */}
        <section className="pt-32 pb-12 md:pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-faint hover:text-ink transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {t.productsPage.backToHome}
            </Link>

            <Reveal>
              <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-4">
                {'// '}Products
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink">
                {t.productsPage.title}
              </h1>
              <p className="mt-4 max-w-2xl text-body md:text-lg">
                {t.productsPage.subtitle}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-20 md:pb-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsData.map((product, index) => (
                <Reveal key={product.slug} delay={index * 70} className="h-full">
                  <ProductCard
                    iconName={product.iconName}
                    titleKey={product.titleKey}
                    descKey={product.descKey}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-20 md:pb-28 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="relative bg-surface border border-edge rounded-xl px-8 md:px-20 py-16 md:py-20 text-center overflow-hidden">
                {/* Thin red rule — the card's only accent */}
                <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-brand" />

                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink mb-6">
                  Need a custom solution?
                </h2>
                <p className="text-body text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                  We can build custom products tailored to your specific business needs
                </p>
                <Link
                  href="/#about"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-strong text-ink font-semibold rounded-lg transition-colors"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

    </>
  );
}
