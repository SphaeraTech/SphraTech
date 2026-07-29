import ServiceCard from '@/components/ui/ServiceCard';
import { servicesData } from '@/lib/servicesData';
import { translations } from '@/lib/translations';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/motion/Reveal';

export const metadata: Metadata = {
    title: 'Our Services',
    alternates: { canonical: '/services' },
    description: 'Professional web development, SEO, SaaS solutions, and mobile app development services.',
};

export default function ServicesPage() {
    const t = translations.en;

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-faint hover:text-ink transition-colors mb-10"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {t.productsPage.backToHome}
                    </Link>

                    <Reveal>
                        <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-4">
                            {'// '}Services
                        </p>
                        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-ink mb-6">
                            {t.services.title}
                        </h1>
                        <p className="text-body md:text-lg max-w-2xl leading-relaxed">
                            {t.why.subtitle}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-12 md:py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {servicesData.map((service, index) => (
                            <Reveal key={service.slug} delay={index * 70} className="h-full">
                                <ServiceCard
                                    slug={service.slug}
                                    iconName={service.iconName}
                                    titleKey={service.titleKey}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />
        </main>
    );
}
