import ProductCard from '@/components/ProductCard';
import { productsData } from '@/lib/productsData';
import { translations } from '@/lib/translations';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products - SpheraTech',
  description: 'Explore our range of innovative software products and solutions',
};

export default function ProductsPage() {
  const t = translations.en;

  return (
    <>
      
      <main className="min-h-screen bg-slate-950 text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900">
            <div 
              className="absolute inset-0 opacity-30" 
              style={{
                backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Back Button */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {t.productsPage.backToHome}
            </Link>

            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {t.productsPage.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
                {t.productsPage.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsData.map((product) => (
                <div key={product.slug} className="transform hover:scale-105 transition-transform">
                  <ProductCard
                    iconName={product.iconName}
                    titleKey={product.titleKey}
                    descKey={product.descKey}
                    gradient={product.gradient}
                    border={product.border}
                    iconBg={product.iconBg}
                    hoverBg={product.hoverBg}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              We can build custom products tailored to your specific business needs
            </p>
            <Link
              href="/#about"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-bold text-lg hover:scale-105 transition-all"
            >
              Contact Us
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        </section>
      </main>

    </>
  );
}