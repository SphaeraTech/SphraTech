import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Check, ArrowRight, Zap, Shield, Clock, TrendingUp, Globe, Terminal, Smartphone, Code, LucideIcon } from 'lucide-react';
import { servicesData } from '@/lib/servicesData';
import { translations } from '@/lib/translations';
import CTASection from '@/components/CTASection';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import Reveal from '@/components/motion/Reveal';

const ICONS: Record<string, LucideIcon> = {
    Globe,
    Terminal,
    Smartphone,
    Code
};

const SLUG = 'saas-solutions';

export const metadata: Metadata = {
    title: 'SaaS Solutions - SpheraTech',
    description: 'We develop scalable and secure Software as a Service solutions tailored to your business needs.',
};

export default function SaaSPage() {
    const service = servicesData.find((s) => s.slug === SLUG)!;
    const Icon = ICONS[service.iconName] || Code;
    const t = translations.en;
    const serviceData = t.services.saas;

    const features = [
        {
            icon: Zap,
            title: t.servicePage.features.fast.title,
            desc: t.servicePage.features.fast.desc
        },
        {
            icon: Shield,
            title: t.servicePage.features.secure.title,
            desc: t.servicePage.features.secure.desc
        },
        {
            icon: Clock,
            title: t.servicePage.features.support.title,
            desc: t.servicePage.features.support.desc
        },
        {
            icon: TrendingUp,
            title: t.servicePage.features.scalable.title,
            desc: t.servicePage.features.scalable.desc
        }
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-faint hover:text-ink transition-colors mb-10"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {t.servicePage.backToServices}
                    </Link>

                    {/* Hero Content */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Reveal>
                            <div className="w-12 h-12 bg-brand/10 border border-brand/30 text-brand rounded-lg flex items-center justify-center mb-6">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink mb-6">
                                {serviceData.title}
                            </h1>
                            <p className="text-body text-lg leading-relaxed mb-8">
                                {serviceData.longDesc}
                            </p>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-brand hover:bg-brand-strong text-ink font-semibold rounded-lg transition-colors"
                            >
                                {t.servicePage.getStartedNow}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Reveal>

                        <Reveal delay={70}>
                            <div className="bg-surface border border-edge rounded-xl p-8 md:p-10">
                                <h2 className="font-display text-2xl font-bold tracking-tight text-ink mb-6">
                                    {t.servicePage.benefits}
                                </h2>
                                <ul className="space-y-4">
                                    {serviceData.benefits.map((benefit: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                                            <span className="text-body">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Client Projects Section */}
            {serviceData.clients && serviceData.clients.length > 0 && (
                <section className="py-20 md:py-28 px-6">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeader
                            eyebrow="Projects"
                            title={t.servicePage.ourProjects}
                            lede={t.servicePage.projectsDesc}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {serviceData.clients.map((client: any, index: number) => (
                                <Reveal key={index} delay={index * 70} className="h-full">
                                    <ProjectCard client={client} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Process Section */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        eyebrow="Process"
                        title={t.servicePage.howItWorks}
                        lede={t.servicePage.processDesc}
                    />
                    <div className="grid md:grid-cols-3 gap-5">
                        {serviceData.process.map((step: any, index: number) => (
                            <Reveal key={index} delay={index * 70} className="h-full">
                                <div className="bg-surface border border-edge hover:border-brand/40 rounded-xl p-8 h-full transition-colors">
                                    <div className="w-12 h-12 bg-brand/10 border border-brand/30 rounded-lg flex items-center justify-center mb-6">
                                        <span className="font-mono text-brand font-semibold">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <h3 className="font-display text-xl font-bold tracking-tight text-ink mb-3">{step.title}</h3>
                                    <p className="text-body text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        eyebrow="Why us"
                        title={t.servicePage.whyChooseUs}
                        lede={t.servicePage.featuresDesc}
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map((feature, index) => {
                            const FeatureIcon = feature.icon;
                            return (
                                <Reveal key={index} delay={index * 70} className="h-full">
                                    <div className="bg-surface border border-edge hover:border-brand/40 rounded-xl p-8 h-full transition-colors">
                                        <div className="w-12 h-12 bg-brand/10 border border-brand/30 text-brand rounded-lg flex items-center justify-center mb-6">
                                            <FeatureIcon className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-display text-xl font-bold tracking-tight text-ink mb-3">{feature.title}</h3>
                                        <p className="text-body text-sm leading-relaxed">{feature.desc}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        eyebrow="Stack"
                        title={t.servicePage.technologies}
                        lede={t.servicePage.technologiesDesc}
                    />
                    <Reveal>
                        <div className="flex flex-wrap gap-3">
                            {serviceData.technologies.map((tech: string, index: number) => (
                                <span
                                    key={index}
                                    className="font-mono text-sm text-body bg-surface border border-edge rounded-lg px-4 py-2 hover:border-brand/40 hover:text-ink transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader eyebrow="FAQ" title={t.servicePage.faq} />
                    <div className="space-y-4">
                        {serviceData.faqs.map((faq: any, index: number) => (
                            <Reveal key={index} delay={index * 70}>
                                <div className="bg-surface border border-edge hover:border-brand/40 rounded-xl p-8 transition-colors">
                                    <h3 className="font-display text-lg font-bold tracking-tight text-ink mb-3">{faq.question}</h3>
                                    <p className="text-body leading-relaxed">{faq.answer}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact">
                <CTASection />
            </section>
        </main>
    );
}
