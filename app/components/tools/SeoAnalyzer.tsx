'use client';

import { useState } from 'react';
import { Search, Globe, CheckCircle2, AlertCircle, XCircle, Loader2, Share2, Download, ExternalLink } from 'lucide-react';

type AuditStatus = 'pass' | 'warning' | 'fail';

interface AuditItem {
    title: string;
    score: number;
    status: AuditStatus;
    description: string;
}

export default function SeoAnalyzer() {
    const [url, setUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState<null | any>(null);

    const startAnalysis = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsAnalyzing(true);
        setProgress(0);
        setResults(null);

        // Simulate progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    finishAnalysis();
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    const finishAnalysis = () => {
        setIsAnalyzing(false);
        setResults({
            scores: {
                seo: 92,
                performance: 78,
                accessibility: 85,
                bestPractices: 88,
            },
            audits: [
                { title: 'Meta Title', status: 'pass', description: 'Your page has a meta title of optimal length.' },
                { title: 'Meta Description', status: 'pass', description: 'Meta description is present and descriptive.' },
                { title: 'H1 Headings', status: 'pass', description: 'Proper H1 heading hierarchy detected.' },
                { title: 'Image Alt Text', status: 'warning', description: '3 images are missing descriptive alt text.' },
                { title: 'Page Load Speed', status: 'fail', description: 'Initial page load time exceeds 2.5 seconds.' },
                { title: 'Mobile Optimization', status: 'pass', description: 'Page is fully responsive and mobile-friendly.' },
            ]
        });
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
                <form onSubmit={startAnalysis} className="flex gap-4 p-2 bg-slate-800/50 border border-slate-700 rounded-2xl focus-within:border-indigo-500 transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Globe className="w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="https://yourwebsite.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 py-2"
                            disabled={isAnalyzing}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isAnalyzing || !url}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 rounded-xl font-semibold transition-colors flex items-center gap-2"
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
            </div>

            {isAnalyzing && (
                <div className="max-w-xl mx-auto text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-slate-400 font-medium">Scanning for SEO issues... {progress}%</p>
                </div>
            )}

            {results && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Scores Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Object.entries(results.scores).map(([key, score]: [string, any]) => (
                            <div key={key} className="bg-slate-800/30 border border-slate-800 p-6 rounded-2xl text-center flex flex-col items-center">
                                <div className="relative w-24 h-24 flex items-center justify-center mb-4">
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
                                        />
                                    </svg>
                                    <span className="absolute text-2xl font-bold">{score}</span>
                                </div>
                                <span className="text-slate-400 text-sm font-medium capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Audit List */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-800">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Search className="w-5 h-5 text-indigo-400" />
                                    SEO Analysis Report
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-800">
                                {results.audits.map((audit: any, idx: number) => (
                                    <div key={idx} className="p-6 flex items-start gap-4 hover:bg-slate-800/30 transition-colors">
                                        <div className="mt-1">{getStatusIcon(audit.status)}</div>
                                        <div>
                                            <h4 className="font-semibold mb-1">{audit.title}</h4>
                                            <p className="text-sm text-slate-400">{audit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="space-y-6">
                            <div className="bg-indigo-600 rounded-2xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 transform translate-x-1/4 -translate-y-1/4 rotate-12 opacity-10 group-hover:scale-110 transition-transform">
                                    <ExternalLink className="w-32 h-32" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 relative z-10">Want us to fix these issues?</h3>
                                <p className="text-indigo-100 mb-6 relative z-10">
                                    Our professional SEO services can help you fix all performance and optimization issues to reach #1 on Google.
                                </p>
                                <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors relative z-10">
                                    Get Free Consultation
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700">
                                    <Download className="w-5 h-5" />
                                    Download PDF
                                </button>
                                <button className="flex items-center justify-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700">
                                    <Share2 className="w-5 h-5" />
                                    Share results
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
