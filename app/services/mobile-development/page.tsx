import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Check, ArrowRight, Zap, Shield, Clock, TrendingUp, Globe, Terminal, Smartphone, Code, LucideIcon } from 'lucide-react';
import { servicesData } from '@/lib/servicesData';
import { translations } from '@/lib/translations';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import ProjectCard from '@/components/ProjectCard';

const ICONS: Record<string, LucideIcon> = {
    Globe,
    Terminal,
    Smartphone,
    Code
};

const SLUG = 'mobile-development';

export const metadata: Metadata = {
    title: 'Mobile Development - SpheraTech',
    description: 'Our team specializes in developing robust and user-friendly mobile applications for iOS and Android.',
};

export default function MobileDevPage() {
    const service = servicesData.find((s) => s.slug === SLUG)!;
    const Icon = ICONS[service.iconName] || Code;
    const t = translations.en;
    const serviceData = t.services.mobile;

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
        <>
            <main className="min-h-screen bg-slate-950 text-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                                backgroundSize: '50px 50px'
                            }}
                        ></div>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Back Button */}
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            {t.servicePage.backToServices}
                        </Link>

                        {/* Hero Content */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className={`w-24 h-24 bg-gradient-to-br ${service.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                                    <Icon className="w-12 h-12" />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                    {serviceData.title}
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                                    {serviceData.longDesc}
                                </p>
                                <Link
                                    href="/contact"
                                    className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${service.iconBg} rounded-full font-bold text-lg hover:scale-105 transition-all text-white`}
                                >
                                    {t.servicePage.getStartedNow}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>

                            <div className={`relative bg-gradient-to-br ${service.gradient} backdrop-blur-sm rounded-3xl p-12 border ${service.border}`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.hoverBg} to-transparent opacity-50 rounded-3xl`}></div>
                                <div className="relative">
                                    <h3 className="text-2xl font-bold mb-6">{t.servicePage.benefits}</h3>
                                    <ul className="space-y-4">
                                        {serviceData.benefits.map((benefit: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className={`w-6 h-6 bg-gradient-to-br ${service.iconBg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white`}>
                                                    <Check className="w-4 h-4" />
                                                </div>
                                                <span className="text-slate-200">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Client Projects Section */}
                {serviceData.clients && serviceData.clients.length > 0 && (
                    <section className="py-20 px-6 bg-slate-900">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                    {t.servicePage.ourProjects}
                                </h2>
                                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                                    {t.servicePage.projectsDesc}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {serviceData.clients.map((client: any, index: number) => (
                                    <ProjectCard
                                        key={index}
                                        client={client}
                                        gradient={service.gradient}
                                        border={service.border}
                                        iconBg={service.iconBg}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Process Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                {t.servicePage.howItWorks}
                            </h2>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                                {t.servicePage.processDesc}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {serviceData.process.map((step: any, index: number) => (
                                <div key={index} className="relative">
                                    <div className={`bg-gradient-to-br ${service.gradient} backdrop-blur-sm rounded-2xl p-8 border ${service.border} h-full`}>
                                        <div className={`w-12 h-12 bg-gradient-to-br ${service.iconBg} rounded-xl flex items-center justify-center mb-6 text-2xl font-bold text-white`}>
                                            {index + 1}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-slate-300">{step.desc}</p>
                                    </div>
                                    {index < serviceData.process.length - 1 && (
                                        <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-600 to-transparent"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-6 bg-slate-900">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                {t.servicePage.whyChooseUs}
                            </h2>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                                {t.servicePage.featuresDesc}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => {
                                const FeatureIcon = feature.icon;
                                return (
                                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${service.iconBg} rounded-xl flex items-center justify-center mb-6 text-white`}>
                                            <FeatureIcon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                        <p className="text-slate-300">{feature.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Technologies Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                {t.servicePage.technologies}
                            </h2>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                                {t.servicePage.technologiesDesc}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {serviceData.technologies.map((tech: string, index: number) => (
                                <div key={index} className={`bg-gradient-to-br ${service.gradient} backdrop-blur-sm rounded-xl p-6 border ${service.border} text-center hover:scale-105 transition-all`}>
                                    <p className="font-semibold">{tech}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 px-6 bg-slate-900">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                {t.servicePage.faq}
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {serviceData.faqs.map((faq: any, index: number) => (
                                <div key={index} className={`bg-gradient-to-br ${service.gradient} backdrop-blur-sm rounded-2xl p-8 border ${service.border}`}>
                                    <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                                    <p className="text-slate-300">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="contact">
                    <CTASection />
                </section>
            </main>
        </>
    );
}
