'use client';

import { useState } from 'react';
import { Search, Key, TrendingUp, BarChart, Target, Info, CheckCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function KeywordDifficultyChecker() {
    const [keyword, setKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyword) return;
        setIsSearching(true);
        setResult(null);

        // Simulate search
        setTimeout(() => {
            setIsSearching(false);
            setResult({
                keyword: keyword,
                difficulty: 64,
                volume: '15.4K',
                intent: 'Informational',
                cpc: '$2.45',
                trend: [40, 45, 30, 50, 65, 80, 75, 90, 85, 95, 100, 92],
                related: [
                    { word: `${keyword} guide`, difficulty: 42, volume: '2.1K' },
                    { word: `best ${keyword} tool`, difficulty: 78, volume: '850' },
                    { word: `${keyword} examples`, difficulty: 35, volume: '5.6K' },
                ]
            });
        }, 1500);
    };

    const getDifficultyColor = (score: number) => {
        if (score < 30) return 'text-emerald-500';
        if (score < 60) return 'text-amber-500';
        return 'text-rose-500';
    };

    return (
        <div className="space-y-10">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSearch} className="relative group">
                    <div className="relative flex p-1.5 bg-surface border border-edge rounded-xl focus-within:border-brand transition-all">
                        <div className="flex-1 flex items-center px-4">
                            <Search className="w-5 h-5 text-faint mr-3" />
                            <input
                                type="text"
                                placeholder="Enter a keyword to analyze..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 py-3 text-ink placeholder:text-faint"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching || !keyword}
                            className="bg-brand hover:bg-brand-strong text-ink px-8 py-3 rounded-lg font-bold transition-all"
                        >
                            Check Difficulty
                        </button>
                    </div>
                </form>
            </div>

            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-8">
                    {/* Main Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-surface border border-edge p-8 rounded-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="font-mono text-xs uppercase tracking-[0.15em] text-faint mb-2">Difficulty</p>
                                <div className="flex items-end gap-2">
                                    <span className={`font-display text-5xl font-black ${getDifficultyColor(result.difficulty)}`}>{result.difficulty}</span>
                                    <span className="text-faint font-bold mb-1">/100</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface-2 rounded-full mt-4 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${result.difficulty < 30 ? 'bg-emerald-500' : result.difficulty < 60 ? 'bg-amber-500' : 'bg-rose-500'
                                            }`}
                                        style={{ width: `${result.difficulty}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface border border-edge p-8 rounded-xl">
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-faint mb-2">Monthly Volume</p>
                            <div className="flex items-center gap-3">
                                <BarChart className="w-8 h-8 text-brand" />
                                <span className="font-display text-4xl font-bold text-ink">{result.volume}</span>
                            </div>
                            <p className="text-xs text-faint mt-4 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                Growth: +12% this month
                            </p>
                        </div>

                        <div className="bg-surface border border-edge p-8 rounded-xl">
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-faint mb-2">Search Intent</p>
                            <div className="flex items-center gap-3">
                                <Target className="w-8 h-8 text-brand" />
                                <span className="font-display text-3xl font-bold text-ink">{result.intent}</span>
                            </div>
                            <p className="text-xs text-faint mt-4">Users are looking for information.</p>
                        </div>

                        <div className="bg-surface border border-edge p-8 rounded-xl">
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-faint mb-2">Estimated CPC</p>
                            <div className="flex items-center gap-3">
                                <Key className="w-8 h-8 text-brand" />
                                <span className="font-display text-4xl font-bold text-ink">{result.cpc}</span>
                            </div>
                            <p className="text-xs text-faint mt-4 underline underline-offset-4 cursor-help">Based on Google Ads data</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Trend Graph Placeholder */}
                        <div className="lg:col-span-2 bg-surface border border-edge p-8 rounded-xl">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-display font-bold text-xl text-ink flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-brand" />
                                    Search Interest Trend
                                </h3>
                                <span className="font-mono text-xs text-faint bg-surface-2 px-3 py-1 rounded-lg uppercase tracking-[0.15em]">Past 12 Months</span>
                            </div>
                            <div className="h-48 flex items-end justify-between gap-2 px-2">
                                {result.trend.map((val: number, i: number) => (
                                    <div key={i} className="flex-1 group relative">
                                        <div
                                            className="w-full bg-brand/20 group-hover:bg-brand/40 transition-all rounded-t-sm"
                                            style={{ height: `${val}%` }}
                                        ></div>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-2 text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {val}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 px-2">
                                {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
                                    <span key={m} className="font-mono text-[10px] text-faint uppercase">{m}</span>
                                ))}
                            </div>
                        </div>

                        {/* Related Keywords */}
                        <div className="bg-surface border border-edge rounded-xl overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-edge">
                                <h3 className="font-display font-bold text-ink">Related Keywords</h3>
                            </div>
                            <div className="flex-1 divide-y divide-edge">
                                {result.related.map((k: any, idx: number) => (
                                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-surface-2 transition-colors cursor-pointer group">
                                        <div>
                                            <h4 className="font-medium text-body group-hover:text-ink">{k.word}</h4>
                                            <p className="font-mono text-[10px] text-faint uppercase tracking-[0.15em]">Vol: {k.volume}</p>
                                        </div>
                                        <div className={`text-sm font-bold ${getDifficultyColor(k.difficulty)}`}>
                                            KD: {k.difficulty}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="p-4 text-sm font-bold text-brand hover:bg-brand/10 transition-colors flex items-center justify-center gap-2">
                                View all ideas
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-surface p-10 rounded-xl border border-edge flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/30 rounded-lg text-brand text-xs font-bold mb-6">
                            <CheckCircle className="w-4 h-4" />
                            Dominate your niche
                        </div>
                        <h3 className="font-display text-3xl font-bold text-ink mb-4">Struggling to rank for this keyword?</h3>
                        <p className="text-body max-w-2xl mb-8">
                            Difficulty {result.difficulty} is {result.difficulty > 60 ? 'high' : 'moderate'}. We specialize in high-authority backlink building and content strategies that beat even the toughest competition.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/contact" className="bg-brand hover:bg-brand-strong text-ink px-8 py-3 rounded-lg font-bold transition-all text-center">
                                Check Backlinks
                            </Link>
                            <Link href="/contact" className="border border-edge hover:border-brand text-ink px-8 py-3 rounded-lg font-bold transition-all text-center">
                                Get SEO Strategy
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
