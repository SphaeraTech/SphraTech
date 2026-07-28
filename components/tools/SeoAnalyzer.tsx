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
                <form onSubmit={startAnalysis} className="flex gap-4 p-2 bg-surface border border-edge rounded-xl focus-within:border-brand transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Globe className="w-5 h-5 text-faint" />
                        <input
                            type="text"
                            placeholder="https://yourwebsite.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-ink placeholder:text-faint py-3"
                            disabled={isAnalyzing}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isAnalyzing || !url}
                        className="px-8 py-3 bg-brand hover:bg-brand-strong text-ink disabled:opacity-50 rounded-lg font-bold transition-all flex items-center gap-2"
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
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-4 text-left">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}
            </div>

            {isAnalyzing && (
                <div className="max-w-xl mx-auto text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-body font-medium">Scanning for SEO issues... {progress}%</p>
                    <p className="text-xs text-faint">Running PageSpeed Insights and Lighthouse audit</p>
                </div>
            )}

            {results && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Scores Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Object.entries(results.scores).map(([key, score]: [string, any]) => (
                            <div key={key} className="bg-surface border border-edge p-6 rounded-xl text-center flex flex-col items-center hover:border-brand/40 transition-colors group">
                                <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-surface-2"
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
                                    <span className="absolute font-display text-2xl font-bold text-ink">{score}</span>
                                </div>
                                <span className="font-mono text-xs uppercase tracking-[0.15em] text-faint">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Audit List */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-surface border border-edge rounded-xl overflow-hidden">
                            <div className="p-6 border-b border-edge bg-surface-2">
                                <h3 className="font-display text-lg font-bold flex items-center gap-2 text-ink">
                                    <Search className="w-5 h-5 text-brand" />
                                    SEO Analysis Report
                                </h3>
                            </div>
                            <div className="divide-y divide-edge">
                                {results.audits.map((audit: any, idx: number) => (
                                    <div key={idx} className="p-6 flex items-start gap-4 hover:bg-surface-2 transition-colors group">
                                        <div className="mt-1 flex-shrink-0">{getStatusIcon(audit.status)}</div>
                                        <div>
                                            <h4 className="font-bold mb-1 text-ink">{audit.title}</h4>
                                            <p className="text-sm text-body leading-relaxed">{audit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="space-y-6">
                            <div className="bg-brand rounded-xl p-10 relative overflow-hidden group text-ink">
                                <div className="absolute top-0 right-0 p-8 transform translate-x-1/4 -translate-y-1/4 rotate-12 opacity-10">
                                    <ExternalLink className="w-32 h-32" />
                                </div>
                                <h3 className="font-display text-3xl font-bold mb-4 relative z-10">Want us to fix these issues?</h3>
                                <p className="text-ink/80 mb-8 relative z-10 text-lg leading-relaxed">
                                    Our professional SEO services can help you fix all performance and optimization issues to reach #1 on Google.
                                </p>
                                <button className="bg-ink text-brand px-8 py-4 rounded-lg font-bold hover:bg-ink/90 transition-all relative z-10">
                                    <Link href="/contact">Get Free Consultation</Link>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 p-5 bg-surface rounded-lg transition-all border border-edge hover:border-brand group">
                                    <Download className="w-5 h-5 text-brand" />
                                    <span className="font-bold text-ink">Download PDF</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 p-5 bg-surface rounded-lg transition-all border border-edge hover:border-brand group">
                                    <Share2 className="w-5 h-5 text-brand" />
                                    <span className="font-bold text-ink">Share results</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
