'use client';

import { useState } from 'react';
import { Search, Globe, CheckCircle2, AlertCircle, XCircle, Loader2, Share2, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type AuditStatus = 'pass' | 'warning' | 'fail';

export default function SeoAnalyzer() {
    const [url, setUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState<null | any>(null);
    const [error, setError] = useState<string | null>(null);

    const startAnalysis = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsAnalyzing(true);
        setProgress(0);
        setResults(null);
        setError(null);

        // Progress simulation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(interval);
                    return 95;
                }
                return prev + (prev < 50 ? 5 : 2);
            });
        }, 300);

        try {
            const response = await fetch('/api/tools/seo-analyzer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze SEO');
            }

            clearInterval(interval);
            setProgress(100);

            // Small delay to show 100% completion
            setTimeout(() => {
                setResults(data);
                setIsAnalyzing(false);
            }, 500);

        } catch (err: any) {
            clearInterval(interval);
            console.error('Analysis error:', err);
            setError(err.message || 'Something went wrong during analysis.');
            setIsAnalyzing(false);
        }
    };

    const getStatusIcon = (status: AuditStatus) => {
        switch (status) {
            case 'pass': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            case 'warning': return <AlertCircle className="w-5 h-5 text-amber-500" />;
            case 'fail': return <XCircle className="w-5 h-5 text-rose-500" />;
        }
    };

    return (
        <div className="space-y-12">
            {/* URL Input */}
            <div className="max-w-3xl mx-auto text-center">
                <form onSubmit={startAnalysis} className="flex gap-4 p-2 bg-slate-900 border border-slate-800 rounded-2xl focus-within:border-red-500 transition-all shadow-lg">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Globe className="w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="https://yourwebsite.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 py-3"
                            disabled={isAnalyzing}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isAnalyzing || !url}
                        className="px-8 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 rounded-xl font-bold transition-all flex items-center gap-2"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            'Analyze Now'
                        )}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-4 text-left">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}
            </div>

            {isAnalyzing && (
                <div className="max-w-xl mx-auto text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-500 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-slate-400 font-medium">Scanning for SEO issues... {progress}%</p>
                    <p className="text-xs text-slate-600">Running PageSpeed Insights and Lighthouse audit</p>
                </div>
            )}

            {results && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Scores Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Object.entries(results.scores).map(([key, score]: [string, any]) => (
                            <div key={key} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-center flex flex-col items-center shadow-xl hover:border-red-500/30 transition-colors group">
                                <div className="relative w-24 h-24 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-slate-800"
                                        />
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={251.2}
                                            strokeDashoffset={251.2 - (251.2 * score) / 100}
                                            className={score >= 90 ? 'text-emerald-500' : score >= 70 ? 'text-amber-500' : 'text-rose-500'}
                                            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                                        />
                                    </svg>
                                    <span className="absolute text-2xl font-bold">{score}</span>
                                </div>
                                <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Audit List */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                                    <Search className="w-5 h-5 text-red-400" />
                                    SEO Analysis Report
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-800">
                                {results.audits.map((audit: any, idx: number) => (
                                    <div key={idx} className="p-6 flex items-start gap-4 hover:bg-slate-800/20 transition-colors group">
                                        <div className="mt-1 flex-shrink-0 transform group-hover:scale-110 transition-transform">{getStatusIcon(audit.status)}</div>
                                        <div>
                                            <h4 className="font-bold mb-1 text-slate-200">{audit.title}</h4>
                                            <p className="text-sm text-slate-400 leading-relaxed">{audit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="space-y-6">
                            <div className="bg-red-600 rounded-3xl p-10 relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 transform translate-x-1/4 -translate-y-1/4 rotate-12 opacity-10 group-hover:scale-110 transition-transform">
                                    <ExternalLink className="w-32 h-32" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 relative z-10 text-white">Want us to fix these issues?</h3>
                                <p className="text-red-100 mb-8 relative z-10 text-lg leading-relaxed">
                                    Our professional SEO services can help you fix all performance and optimization issues to reach #1 on Google.
                                </p>
                                <button className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all hover:scale-105 relative z-10">
                                    <Link href="/contact">Get Free Consultation</Link>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 p-5 bg-slate-900 hover:bg-slate-800 rounded-2xl transition-all border border-slate-800 hover:border-slate-700 shadow-xl group">
                                    <Download className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold">Download PDF</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 p-5 bg-slate-900 hover:bg-slate-800 rounded-2xl transition-all border border-slate-800 hover:border-slate-700 shadow-xl group">
                                    <Share2 className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold">Share results</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
