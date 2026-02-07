'use client';

import { useState } from 'react';
import { Search, Globe, Box, Server, CreditCard, BarChart3, ShieldCheck, ChevronRight, Activity, Cpu } from 'lucide-react';

export default function TechStackDetector() {
    const [url, setUrl] = useState('');
    const [isDetecting, setIsDetecting] = useState(false);
    const [results, setResults] = useState<any>(null);

    const handleDetect = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        setIsDetecting(true);
        setResults(null);

        // Simulate detection
        setTimeout(() => {
            setIsDetecting(false);
            setResults({
                url: url,
                categories: [
                    {
                        name: 'Framework & Frontend',
                        icon: <Box className="w-5 h-5 text-indigo-400" />,
                        techs: [
                            { name: 'Next.js', version: '14.1.0', confidence: 99, icon: '⚡' },
                            { name: 'React', version: '18.2.0', confidence: 100, icon: '⚛️' },
                            { name: 'Tailwind CSS', version: '3.4.1', confidence: 95, icon: '🎨' },
                        ]
                    },
                    {
                        name: 'Infrastructure & Hosting',
                        icon: <Server className="w-5 h-5 text-emerald-400" />,
                        techs: [
                            { name: 'Vercel', type: 'Hosting', confidence: 92, icon: '▲' },
                            { name: 'Cloudflare', type: 'DNS/CDN', confidence: 100, icon: '☁️' },
                        ]
                    },
                    {
                        name: 'Analytics & Tracking',
                        icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
                        techs: [
                            { name: 'Google Analytics', type: 'GA4', confidence: 100, icon: '📊' },
                            { name: 'PostHog', type: 'Product Analytics', confidence: 85, icon: '🦔' },
                        ]
                    },
                    {
                        name: 'Security & Tools',
                        icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
                        techs: [
                            { name: 'Stripe', type: 'Payments', confidence: 98, icon: '💳' },
                            { name: 'Sentry', type: 'Error Tracking', confidence: 90, icon: '🛠️' },
                        ]
                    }
                ]
            });
        }, 2500);
    };

    return (
        <div className="space-y-12">
            <div className="max-w-3xl mx-auto text-center">
                <form onSubmit={handleDetect} className="flex gap-4 p-2 bg-slate-900 border border-slate-800 rounded-2xl focus-within:border-indigo-500 transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Search className="w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Enter URL (e.g., vercel.com)"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 py-3"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isDetecting || !url}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-8 rounded-xl font-bold transition-all flex items-center gap-2"
                    >
                        {isDetecting ? <Activity className="w-5 h-5 animate-spin" /> : <Box className="w-5 h-5" />}
                        Detect Stack
                    </button>
                </form>
                <p className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-2">
                    <Cpu className="w-3 h-3" />
                    Analyzing headers, scripts, and meta data
                </p>
            </div>

            {isDetecting && (
                <div className="flex flex-col items-center justify-center py-12 animate-pulse">
                    <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-4">
                        <Box className="w-8 h-8 text-indigo-500 animate-bounce" />
                    </div>
                    <p className="text-slate-400 font-medium">Identifying technologies...</p>
                </div>
            )}

            {results && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {results.categories.map((cat: any, i: number) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                                <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center gap-3">
                                    <div className="p-2 bg-slate-800 rounded-lg">{cat.icon}</div>
                                    <h3 className="font-bold">{cat.name}</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    {cat.techs.map((tech: any, j: number) => (
                                        <div key={j} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl group-hover:bg-slate-700 transition-colors">
                                                    {tech.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-200">{tech.name}</h4>
                                                    <p className="text-xs text-slate-500">{tech.version || tech.type}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-1">Confidence</span>
                                                <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${tech.confidence}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-indigo-600 rounded-3xl p-10 flex flex-col items-center text-center space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 to-transparent"></div>
                        <h3 className="text-3xl font-bold relative z-10">Is your tech stack holding you back?</h3>
                        <p className="text-indigo-100 max-w-2xl relative z-10">
                            Outdated frameworks and slow hosting can kill your conversion rates. We specialize in migrating legacy sites to modern, high-performance stacks like Next.js and Headless CMS.
                        </p>
                        <div className="flex gap-4 relative z-10">
                            <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all">
                                Consultation
                            </button>
                            <button className="bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold border border-indigo-400/50 hover:bg-indigo-400 transition-all flex items-center gap-2">
                                View Our Portfolio
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
