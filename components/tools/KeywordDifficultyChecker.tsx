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
                    <div className="absolute inset-0 bg-red-500/20 blur-xl group-focus-within:bg-red-500/30 transition-all rounded-full"></div>
                    <div className="relative flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl focus-within:border-red-500 transition-all">
                        <div className="flex-1 flex items-center px-4">
                            <Search className="w-5 h-5 text-slate-500 mr-3" />
                            <input
                                type="text"
                                placeholder="Enter a keyword to analyze..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 py-3 text-white placeholder-slate-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching || !keyword}
                            className="bg-red-600 hover:bg-red-500 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20"
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
                        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Difficulty</p>
                                <div className="flex items-end gap-2">
                                    <span className={`text-5xl font-black ${getDifficultyColor(result.difficulty)}`}>{result.difficulty}</span>
                                    <span className="text-slate-500 font-bold mb-1">/100</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full mt-4 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${result.difficulty < 30 ? 'bg-emerald-500' : result.difficulty < 60 ? 'bg-amber-500' : 'bg-rose-500'
                                            }`}
                                        style={{ width: `${result.difficulty}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Monthly Volume</p>
                            <div className="flex items-center gap-3">
                                <BarChart className="w-8 h-8 text-red-400" />
                                <span className="text-4xl font-bold">{result.volume}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                Growth: +12% this month
                            </p>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Search Intent</p>
                            <div className="flex items-center gap-3">
                                <Target className="w-8 h-8 text-purple-400" />
                                <span className="text-3xl font-bold">{result.intent}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-4">Users are looking for information.</p>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Estimated CPC</p>
                            <div className="flex items-center gap-3">
                                <Key className="w-8 h-8 text-amber-400" />
                                <span className="text-4xl font-bold">{result.cpc}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 underline underline-offset-4 cursor-help">Based on Google Ads data</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Trend Graph Placeholder */}
                        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-xl flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-red-400" />
                                    Search Interest Trend
                                </h3>
                                <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full uppercase font-bold">Past 12 Months</span>
                            </div>
                            <div className="h-48 flex items-end justify-between gap-2 px-2">
                                {result.trend.map((val: number, i: number) => (
                                    <div key={i} className="flex-1 group relative">
                                        <div
                                            className="w-full bg-red-500/20 group-hover:bg-red-500/40 transition-all rounded-t-sm"
                                            style={{ height: `${val}%` }}
                                        ></div>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {val}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 px-2">
                                {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
                                    <span key={m} className="text-[10px] text-slate-600 font-bold uppercase">{m}</span>
                                ))}
                            </div>
                        </div>

                        {/* Related Keywords */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col">
                            <div className="p-6 border-b border-slate-800">
                                <h3 className="font-bold">Related Keywords</h3>
                            </div>
                            <div className="flex-1 divide-y divide-slate-800">
                                {result.related.map((k: any, idx: number) => (
                                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                        <div>
                                            <h4 className="font-medium text-slate-200 group-hover:text-white">{k.word}</h4>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Vol: {k.volume}</p>
                                        </div>
                                        <div className={`text-sm font-bold ${getDifficultyColor(k.difficulty)}`}>
                                            KD: {k.difficulty}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="p-4 text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
                                View all ideas
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-red-900/40 to-slate-900 p-10 rounded-3xl border border-red-500/20 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-bold mb-6">
                            <CheckCircle className="w-4 h-4" />
                            Dominate your niche
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Struggling to rank for this keyword?</h3>
                        <p className="text-slate-400 max-w-2xl mb-8">
                            Difficulty {result.difficulty} is {result.difficulty > 60 ? 'high' : 'moderate'}. We specialize in high-authority backlink building and content strategies that beat even the toughest competition.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/contact" className="bg-red-600 hover:bg-red-500 px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 text-center">
                                Check Backlinks
                            </Link>
                            <Link href="/contact" className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-xl font-bold transition-all text-center">
                                Get SEO Strategy
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
