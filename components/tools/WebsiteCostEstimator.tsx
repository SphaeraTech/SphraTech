'use client';

import { useState, useMemo } from 'react';
import { Calculator, Layout, ShoppingCart, Rocket, Monitor, Zap, Search, Globe, ChevronRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

type WebsiteType = 'landing' | 'corporate' | 'ecommerce' | 'saas';

interface Feature {
    id: string;
    name: string;
    price: number;
    description: string;
}

export default function WebsiteCostEstimator() {
    const [type, setType] = useState<WebsiteType>('corporate');
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['seo', 'responsive']);

    const basePrices: Record<WebsiteType, number> = {
        landing: 1500,
        corporate: 3500,
        ecommerce: 6500,
        saas: 12000,
    };

    const features: Feature[] = [
        { id: 'seo', name: 'SEO Optimization', price: 800, description: 'Basic on-page SEO setup' },
        { id: 'responsive', name: 'Ultra Responsive', price: 500, description: 'Pefect on all devices' },
        { id: 'cms', name: 'Content Management', price: 1200, description: 'Manage site content yourself' },
        { id: 'animation', name: 'Advanced Animations', price: 1500, description: 'GSAP/Framer Motion magic' },
        { id: 'auth', name: 'User Authentication', price: 2500, description: 'Login/Register system' },
        { id: 'payment', name: 'Payment Integration', price: 1800, description: 'Stripe/PayPal setup' },
        { id: 'i18n', name: 'Multi-language (i18n)', price: 1000, description: 'Reach global audience' },
    ];

    const totalPrice = useMemo(() => {
        const base = basePrices[type];
        const addons = selectedFeatures.reduce((acc, featId) => {
            const feat = features.find(f => f.id === featId);
            return acc + (feat?.price || 0);
        }, 0);
        return base + addons;
    }, [type, selectedFeatures]);

    const toggleFeature = (id: string) => {
        setSelectedFeatures(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const getWebsiteTypeIcon = (t: WebsiteType) => {
        switch (t) {
            case 'landing': return <Rocket className="w-6 h-6" />;
            case 'corporate': return <Monitor className="w-6 h-6" />;
            case 'ecommerce': return <ShoppingCart className="w-6 h-6" />;
            case 'saas': return <Layout className="w-6 h-6" />;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Configuration Section */}
            <div className="lg:col-span-2 space-y-10">
                <section>
                    <h3 className="font-display text-xl font-bold text-ink mb-6 flex items-center gap-2">
                        <Layout className="w-5 h-5 text-brand" />
                        1. Select Project Type
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(Object.keys(basePrices) as WebsiteType[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setType(t)}
                                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 text-center ${type === t
                                    ? 'bg-brand/10 border-brand'
                                    : 'bg-surface border-edge hover:border-edge-strong'
                                    }`}
                            >
                                <div className={`${type === t ? 'text-brand' : 'text-faint'}`}>
                                    {getWebsiteTypeIcon(t)}
                                </div>
                                <div>
                                    <div className="font-bold capitalize text-ink">{t}</div>
                                    <div className="font-mono text-[10px] text-faint mt-1 uppercase tracking-[0.15em]">Starting at ${basePrices[t]}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="font-display text-xl font-bold text-ink mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-brand" />
                        2. Add Custom Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feat) => (
                            <button
                                key={feat.id}
                                onClick={() => toggleFeature(feat.id)}
                                className={`p-5 rounded-xl border transition-all flex items-center justify-between text-left group ${selectedFeatures.includes(feat.id)
                                    ? 'bg-brand/5 border-brand/50'
                                    : 'bg-surface border-edge hover:border-edge-strong'
                                    }`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-ink">{feat.name}</span>
                                        <span className="text-xs bg-brand/10 text-brand px-1.5 py-0.5 rounded">+${feat.price}</span>
                                    </div>
                                    <p className="text-xs text-faint mt-1">{feat.description}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedFeatures.includes(feat.id) ? 'bg-brand border-brand' : 'border-edge-strong'
                                    }`}>
                                    {selectedFeatures.includes(feat.id) && <CheckCircle className="w-4 h-4 text-ink" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* Summary Section */}
            <div className="space-y-6">
                <div className="bg-surface border border-edge rounded-xl p-8 sticky top-32">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-display font-bold text-lg text-ink">Project Summary</h3>
                        <Calculator className="w-5 h-5 text-brand" />
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm py-2 border-b border-edge">
                            <span className="text-body capitalize">{type} Website (Base)</span>
                            <span className="font-mono text-ink">${basePrices[type]}</span>
                        </div>
                        {selectedFeatures.map((featId) => {
                            const feat = features.find(f => f.id === featId);
                            return (
                                <div key={featId} className="flex justify-between text-sm animate-in fade-in slide-in-from-right-2">
                                    <span className="text-body">{feat?.name}</span>
                                    <span className="font-mono text-brand">+${feat?.price}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-6 border-t border-edge mb-8">
                        <div className="flex justify-between items-end">
                            <span className="text-body font-bold">Estimated Cost</span>
                            <div className="text-right">
                                <div className="font-display text-4xl font-black text-brand">
                                    ${totalPrice.toLocaleString()}
                                </div>
                                <p className="font-mono text-[10px] text-faint mt-1 uppercase tracking-[0.15em]">*Final price may vary</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link href="/contact" className="w-full bg-brand hover:bg-brand-strong py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-ink">
                            <MessageSquare className="w-5 h-5" />
                            Get Detailed Quote
                        </Link>
                        <button className="w-full py-4 rounded-lg font-bold transition-all border border-edge hover:border-brand text-ink">
                            Save Configuration
                        </button>
                    </div>

                    <div className="mt-8 p-4 bg-brand/10 border border-brand/20 rounded-xl flex items-start gap-3">
                        <div className="p-1.5 bg-brand/20 rounded-lg shrink-0">
                            <CheckCircle className="w-4 h-4 text-brand" />
                        </div>
                        <p className="text-[11px] text-body leading-normal">
                            <strong className="text-brand block mb-0.5">Special Offer!</strong>
                            Book today and get <span className="text-ink font-bold">Free 1 Year Maintenance</span> plus Cloud Hosting.
                        </p>
                    </div>
                </div>

                <div className="bg-surface border border-edge rounded-xl p-6 text-center">
                    <p className="text-sm text-body italic">"SpheraTech built our SaaS in record time and they actually stayed within the estimated budget. Highly recommended!"</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-surface-2"></div>
                        <span className="text-xs font-bold text-ink">Alex R., Founder of DevFlow</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CheckCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}
