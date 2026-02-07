'use client';

import { useState } from 'react';
import { Gauge, Zap, Clock, Smartphone, Monitor, ChevronRight, RefreshCw, BarChart3, AlertTriangle } from 'lucide-react';

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
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            Analyze Page Performance
                        </h3>
                        <div className="flex bg-slate-800 p-1 rounded-xl">
                            <button
                                onClick={() => setDevice('mobile')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${device === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                            >
                                <Smartphone className="w-4 h-4" />
                                Mobile
                            </button>
                            <button
                                onClick={() => setDevice('desktop')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${device === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
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
                            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-colors text-lg"
                            disabled={isTesting}
                        />
                        <button
                            type="submit"
                            disabled={isTesting || !url}
                            className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 min-w-[180px]"
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
                        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
                            <div className="relative w-40 h-40 mb-6 group">
                                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>
                                <svg className="w-full h-full transform -rotate-90 relative z-10">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className="text-slate-800"
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
                                    <span className="text-5xl font-black">{testResult.score}</span>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Score</span>
                                </div>
                            </div>
                            <h4 className="text-2xl font-bold mb-2">Performance Score</h4>
                            <p className="text-slate-400">Your page is {testResult.score >= 90 ? 'faster than 92%' : 'slower than average'} of audited websites.</p>
                        </div>

                        {/* Metrics List */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {testResult.metrics.map((metric: any, idx: number) => (
                                <div key={idx} className="bg-slate-800/20 border border-slate-700/50 p-6 rounded-2xl flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-400 mb-1">{metric.name}</span>
                                        <span className="text-2xl font-bold">{metric.value}</span>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${metric.status === 'pass' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]'}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Opportunities */}
                        <div className="bg-slate-900 shadow-xl border border-slate-800 rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                                <h3 className="font-bold flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-indigo-400" />
                                    Optimization Opportunities
                                </h3>
                                <span className="text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded">Estimated Savings</span>
                            </div>
                            <div className="divide-y divide-slate-800">
                                {testResult.opportunities.map((opp: any, idx: number) => (
                                    <div key={idx} className="p-6 flex items-center justify-between group hover:bg-slate-800/50 transition-all cursor-pointer">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                                                <AlertTriangle className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{opp.title}</h4>
                                                <span className="text-xs text-slate-500 uppercase tracking-tighter">{opp.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-orange-400 font-mono font-bold">
                                            {opp.impact}
                                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lab Recommendations */}
                        <div className="bg-slate-900 shadow-xl border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center">
                                <Zap className="w-10 h-10 text-indigo-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Slow loading? We can fix that.</h3>
                                <p className="text-slate-400 mb-8">
                                    Our performance experts can optimize your code, images, and server infrastructure to achieve lightning-fast load times.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <button className="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all transform hover:-translate-y-1">
                                        Book Speed Audit
                                    </button>
                                    <button className="flex-1 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all border border-slate-700">
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
