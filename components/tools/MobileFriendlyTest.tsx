'use client';

import { useState } from 'react';
import { Smartphone, CheckCircle2, AlertCircle, XCircle, Globe, RefreshCw, Eye, Laptop, Tablet, Search, Monitor, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MobileFriendlyTest() {
    const [url, setUrl] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

    const handleTest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        setIsTesting(true);
        setResult(null);

        try {
            const response = await fetch('/api/tools/mobile-friendly', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to run test');
            }

            const data = await response.json();
            setResult(data);
        } catch (error: any) {
            console.error('Mobile test error:', error);
            alert(error.message || 'Failed to analyze mobile friendliness. The target URL might be blocking automated checks or the service is temporarily unavailable.');
        } finally {
            setIsTesting(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleTest} className="flex gap-4 p-2 bg-slate-900 border border-slate-800 rounded-2xl focus-within:border-red-500 transition-all">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <Globe className="w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 py-3"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isTesting || !url}
                        className="bg-red-600 hover:bg-red-500 px-8 rounded-xl font-bold transition-all flex items-center gap-2"
                    >
                        {isTesting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Smartphone className="w-5 h-5" />}
                        Test URL
                    </button>
                </form>
            </div>

            {result && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Mockup Preview */}
                    <div className="flex flex-col items-center">
                        <div className="flex bg-slate-800 p-1 rounded-xl mb-8">
                            {(['mobile', 'tablet', 'desktop'] as const).map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setActiveDevice(d)}
                                    className={`p-2 px-4 rounded-lg transition-all ${activeDevice === d ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-400'}`}
                                >
                                    {d === 'mobile' && <Smartphone className="w-5 h-5" />}
                                    {d === 'tablet' && <Tablet className="w-5 h-5" />}
                                    {d === 'desktop' && <Laptop className="w-5 h-5" />}
                                </button>
                            ))}
                        </div>

                        <div className={`relative bg-slate-900 border-[8px] border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 ${activeDevice === 'mobile' ? 'w-[320px] h-[600px]' :
                            activeDevice === 'tablet' ? 'w-[500px] h-[600px]' :
                                'w-[100%] max-w-[800px] h-[500px]'
                            }`}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-800 rounded-b-3xl z-20"></div>
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">
                                <div className="flex flex-col items-center gap-4">
                                    <Eye className="w-12 h-12 opacity-20" />
                                    <span className="text-sm font-medium">Site Preview Loaded</span>
                                    <span className="text-[10px] uppercase tracking-widest bg-slate-700/50 px-3 py-1 rounded-full">{url}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Audit Data */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-4 rounded-2xl ${result.isFriendly ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                    {result.isFriendly ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{result.isFriendly ? 'Mobile Friendly' : 'Issues Found'}</h3>
                                    <p className="text-slate-400">Page is {result.isFriendly ? 'well-optimized' : 'poorly optimized'} for mobile users.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {result.issues.map((issue: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-800/50">
                                        <span className="font-medium text-slate-300">{issue.title}</span>
                                        {issue.status === 'pass' ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-amber-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-red-600 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
                                <Monitor className="w-48 h-48" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Mobile traffic is over 60%.</h3>
                            <p className="text-red-100 mb-8 max-w-md">
                                Don't lose customers because your site is slow or hard to use on phones. We create mobile-first experiences that convert.
                            </p>
                            <Link href="/contact" className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all flex items-center gap-2">
                                Audit My Entire Site
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
