import ServiceCard from '@/components/ui/ServiceCard';
import { servicesData } from '@/lib/servicesData';
import { translations } from '@/lib/translations';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Our Services - SphaeraTech',
    description: 'Professional web development, SEO, SaaS solutions, and mobile app development services.',
};

export default function ServicesPage() {
    const t = translations.en;

    return (
        <>
            <main className="min-h-screen bg-slate-950 text-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-950/10 to-slate-900">
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
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
                                {t.services.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
                                {t.why.subtitle}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {servicesData.map((service) => (
                                <div key={service.slug} className="transform hover:scale-105 transition-transform h-full">
                                    <ServiceCard
                                        slug={service.slug}
                                        iconName={service.iconName}
                                        titleKey={service.titleKey}
                                        descKey={service.descKey}
                                        gradient={service.gradient}
                                        border={service.border}
                                        iconBg={service.iconBg}
                                        hoverBg={service.hoverBg}
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
                            {t.cta.title}
                        </h2>
                        <p className="text-xl text-slate-300 mb-8">
                            {t.cta.desc}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-600 to-red-600 rounded-full font-bold text-lg hover:scale-105 transition-all text-white"
                        >
                            {t.cta.button}
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
