'use client';

import { useState } from 'react';
import { FileText, Map, CheckCircle2, XCircle, AlertCircle, Search, Globe, ChevronRight } from 'lucide-react';

export default function RobotsSitemapChecker() {
    const [url, setUrl] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [results, setResults] = useState<any>(null);

    const handleValidate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        setIsValidating(true);
        setResults(null);

        try {
            const response = await fetch('/api/tools/robots-sitemap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error('Failed to validate');
            }

            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Validation error:', error);
            // Fallback or error state
            alert('Failed to validate the URL. Please check the URL and try again.');
        } finally {
            setIsValidating(false);
        }
    };

    const StatusIcon = ({ status }: { status: string }) => {
        if (status === 'pass') return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
        if (status === 'warning') return <AlertCircle className="w-5 h-5 text-amber-500" />;
        return <XCircle className="w-5 h-5 text-rose-500" />;
    };

    return (
        <div className="space-y-12">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleValidate} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Enter your domain (e.g., example.com)"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isValidating || !url}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                        {isValidating ? 'Validating...' : 'Check Files'}
                    </button>
                </form>
            </div>

            {results && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Robots.txt Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/10 rounded-lg">
                                    <FileText className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold">robots.txt</h3>
                                    <span className="text-xs text-slate-500 font-mono">{results.robots.url}</span>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${results.robots.status === 'pass' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                }`}>
                                {results.robots.status}
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            {results.robots.audits.map((audit: any, idx: number) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1"><StatusIcon status={audit.status} /></div>
                                    <div>
                                        <h4 className="font-semibold text-slate-200">{audit.title}</h4>
                                        <p className="text-sm text-slate-400">{audit.msg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sitemap.xml Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <Map className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold">sitemap.xml</h3>
                                    <span className="text-xs text-slate-500 font-mono">{results.sitemap.url}</span>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${results.sitemap.status === 'pass' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                }`}>
                                {results.sitemap.status}
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            {results.sitemap.audits.map((audit: any, idx: number) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1"><StatusIcon status={audit.status} /></div>
                                    <div>
                                        <h4 className="font-semibold text-slate-200">{audit.title}</h4>
                                        <p className="text-sm text-slate-400">{audit.msg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">Improve Your Site's Crawlability</h3>
                            <p className="text-slate-400 max-w-xl">
                                Technical SEO issues in your robots.txt or sitemap can prevent search engines from indexing your most important pages.
                            </p>
                        </div>
                        <button className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-50 text-white hover:text-indigo-600 px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 group">
                            Fix My Technical SEO
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
