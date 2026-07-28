'use client';

import { useState } from 'react';
import { Gauge, Zap, Clock, Smartphone, Monitor, ChevronRight, RefreshCw, BarChart3, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function WebsiteSpeedTest() {
    const [url, setUrl] = useState('');
    const [device, setDevice] = useState<'mobile' | 'desktop'>('desktop');
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState<any>(null);

    const runTest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        setIsTesting(true);
        setTestResult(null);

        try {
            const response = await fetch('/api/tools/speed-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, strategy: device }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to run test');
            }

            const data = await response.json();
            setTestResult(data);
        } catch (error: any) {
            console.error('Speed test error:', error);
            alert(error.message || 'Failed to analyze speed. The target URL might be blocking automated checks or the service is temporarily unavailable.');
        } finally {
            setIsTesting(false);
        }
    };
    return (
        <div className="space-y-12">
            {/* Search Header */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-surface border border-edge p-8 rounded-xl">
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                        <h3 className="font-display text-xl font-bold text-ink flex items-center gap-2">
                            <Zap className="w-5 h-5 text-brand" />
                            Analyze Page Performance
                        </h3>
                        <div className="flex bg-surface-2 p-1 rounded-lg">
                            <button
                                onClick={() => setDevice('mobile')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${device === 'mobile' ? 'bg-brand text-ink' : 'text-body'}`}
                            >
                                <Smartphone className="w-4 h-4" />
                                Mobile
                            </button>
                            <button
                                onClick={() => setDevice('desktop')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${device === 'desktop' ? 'bg-brand text-ink' : 'text-body'}`}
                            >
                                <Monitor className="w-4 h-4" />
                                Desktop
                            </button>
                        </div>
                    </div>

                    <form onSubmit={runTest} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-surface-2 border border-edge rounded-lg px-6 py-4 text-ink placeholder:text-faint focus:outline-none focus:border-brand transition-colors text-lg"
                            disabled={isTesting}
                        />
                        <button
                            type="submit"
                            disabled={isTesting || !url}
                            className="bg-brand hover:bg-brand-strong text-ink px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-3 min-w-[180px]"
                        >
                            {isTesting ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Testing...
                                </>
                            ) : (
                                <>
                                    <Gauge className="w-5 h-5" />
                                    Test Speed
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {testResult && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Performance Score */}
                        <div className="bg-surface border border-edge p-8 rounded-xl flex flex-col items-center justify-center text-center">
                            <div className="relative w-40 h-40 mb-6 group">
                                <svg className="w-full h-full transform -rotate-90 relative z-10">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className="text-surface-2"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray={439.8}
                                        strokeDashoffset={439.8 - (439.8 * testResult.score) / 100}
                                        className={testResult.score >= 90 ? 'text-emerald-500' : testResult.score >= 70 ? 'text-amber-500' : 'text-rose-500'}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center relative z-10">
                                    <span className="font-display text-5xl font-black text-ink">{testResult.score}</span>
                                    <span className="font-mono text-xs text-faint uppercase tracking-[0.15em]">Score</span>
                                </div>
                            </div>
                            <h4 className="font-display text-2xl font-bold text-ink mb-2">Performance Score</h4>
                            <p className="text-body">Your page is {testResult.score >= 90 ? 'faster than 92%' : 'slower than average'} of audited websites.</p>
                        </div>

                        {/* Metrics List */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {testResult.metrics.map((metric: any, idx: number) => (
                                <div key={idx} className="bg-surface border border-edge p-6 rounded-xl flex items-center justify-between hover:bg-surface-2 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-body mb-1">{metric.name}</span>
                                        <span className="font-display text-2xl font-bold text-ink">{metric.value}</span>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${metric.status === 'pass' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Opportunities */}
                        <div className="bg-surface border border-edge rounded-xl overflow-hidden">
                            <div className="p-6 border-b border-edge bg-surface-2 flex items-center justify-between">
                                <h3 className="font-display font-bold text-ink flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-brand" />
                                    Optimization Opportunities
                                </h3>
                                <span className="text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded">Estimated Savings</span>
                            </div>
                            <div className="divide-y divide-edge">
                                {testResult.opportunities.map((opp: any, idx: number) => (
                                    <div key={idx} className="p-6 flex items-center justify-between group hover:bg-surface-2 transition-all cursor-pointer">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 p-2 bg-surface-2 rounded-lg text-body group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                                                <AlertTriangle className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-body group-hover:text-ink transition-colors">{opp.title}</h4>
                                                <span className="font-mono text-xs text-faint uppercase tracking-[0.15em]">{opp.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-orange-400 font-mono font-bold">
                                            {opp.impact}
                                            <ChevronRight className="w-4 h-4 text-faint group-hover:text-body" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lab Recommendations */}
                        <div className="bg-surface border border-edge rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center">
                                <Zap className="w-10 h-10 text-brand" />
                            </div>
                            <div>
                                <h3 className="font-display text-2xl font-bold text-ink mb-4">Slow loading? We can fix that.</h3>
                                <p className="text-body mb-8">
                                    Our performance experts can optimize your code, images, and server infrastructure to achieve lightning-fast load times.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <Link href="/contact" className="flex-1 px-6 py-4 bg-brand hover:bg-brand-strong text-ink rounded-lg font-bold transition-all text-center">
                                        Book Speed Audit
                                    </Link>
                                    <button className="flex-1 px-6 py-4 rounded-lg font-bold transition-all border border-edge hover:border-brand text-ink text-center">
                                        Learn about Core Web Vitals
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
