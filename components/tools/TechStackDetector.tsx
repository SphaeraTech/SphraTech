'use client';

import { useState } from 'react';
import { Search, Box, Server, BarChart3, ShieldCheck, ChevronRight, Activity, Cpu, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Help helper to map string names to icons
const getCategoryIcon = (name: string) => {
    switch (name) {
        case 'Framework & Frontend': return <Box className="w-5 h-5 text-brand" />;
        case 'Infrastructure & Hosting': return <Server className="w-5 h-5 text-brand" />;
        case 'Analytics & Tracking': return <BarChart3 className="w-5 h-5 text-brand" />;
        case 'Security & Tools': return <ShieldCheck className="w-5 h-5 text-brand" />;
        default: return <Box className="w-5 h-5 text-faint" />;
    }
};

export default function TechStackDetector() {
    const [url, setUrl] = useState('');
    const [isDetecting, setIsDetecting] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDetect = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsDetecting(true);
        setResults(null);
        setError(null);

        try {
            const response = await fetch('/api/tools/tech-stack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to detect tech stack');
            }

            setResults(data);
        } catch (err: any) {
            console.error('Detection error:', err);
            setError(err.message || 'Something went wrong while analyzing the site.');
        } finally {
            setIsDetecting(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="max-w-3xl mx-auto text-center">
                <form onSubmit={handleDetect} className="flex gap-4 p-2 bg-surface border border-edge rounded-xl focus-within:border-brand transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Search className="w-5 h-5 text-faint" />
                        <input
                            type="text"
                            placeholder="Enter URL (e.g., vercel.com)"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-ink placeholder:text-faint py-3"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isDetecting || !url}
                        className="bg-brand hover:bg-brand-strong text-ink disabled:opacity-50 px-8 rounded-lg font-bold transition-all flex items-center gap-2"
                    >
                        {isDetecting ? <Activity className="w-5 h-5 animate-spin" /> : <Box className="w-5 h-5" />}
                        Detect Stack
                    </button>
                </form>
                <p className="mt-4 text-xs text-faint flex items-center justify-center gap-2">
                    <Cpu className="w-3 h-3" />
                    Analyzing headers, scripts, and meta data
                </p>

                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-4">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}
            </div>

            {isDetecting && (
                <div className="flex flex-col items-center justify-center py-12 animate-pulse">
                    <div className="w-16 h-16 bg-brand/20 rounded-xl flex items-center justify-center mb-4">
                        <Box className="w-8 h-8 text-brand animate-bounce" />
                    </div>
                    <p className="text-body font-medium">Identifying technologies...</p>
                    <p className="text-xs text-faint mt-2">Checking headers and source code</p>
                </div>
            )}

            {results && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {results.categories.map((cat: any, i: number) => (
                            <div key={i} className="bg-surface border border-edge rounded-xl overflow-hidden hover:border-edge-strong transition-colors">
                                <div className="p-6 border-b border-edge bg-surface-2 flex items-center gap-3">
                                    <div className="p-2 bg-brand/10 rounded-lg">
                                        {getCategoryIcon(cat.name)}
                                    </div>
                                    <h3 className="font-display font-bold text-ink">{cat.name}</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    {cat.techs.map((tech: any, j: number) => (
                                        <div key={j} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-surface-2 rounded-lg flex items-center justify-center text-xl transition-colors">
                                                    {tech.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-ink">{tech.name}</h4>
                                                    <p className="text-xs text-faint">{tech.version || tech.type}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="font-mono text-[10px] text-faint uppercase tracking-[0.15em] mb-1">Confidence</span>
                                                <div className="w-16 h-1 bg-surface-2 rounded-full overflow-hidden">
                                                    <div className="h-full bg-brand" style={{ width: `${tech.confidence}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-brand rounded-xl p-10 flex flex-col items-center text-center space-y-6 relative overflow-hidden group text-ink">
                        <h3 className="font-display text-3xl font-bold relative z-10">Is your tech stack holding you back?</h3>
                        <p className="text-ink/80 max-w-2xl relative z-10">
                            Outdated frameworks and slow hosting can kill your conversion rates. We specialize in migrating legacy sites to modern, high-performance stacks like Next.js and Headless CMS.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                            <Link href="/contact" className="bg-ink text-brand px-8 py-4 rounded-lg font-bold hover:bg-ink/90 transition-all">
                                Consultation
                            </Link>
                            <Link href="/realisations" className="bg-brand-strong text-ink px-8 py-4 rounded-lg font-bold border border-ink/20 hover:border-ink/40 transition-all flex items-center gap-2">
                                View Our Portfolio
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
