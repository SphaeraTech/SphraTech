'use client';

import { useState } from 'react';
import { Upload, Download, Eye, FileImage, ShieldCheck, Monitor, Smartphone, Globe, Info, RefreshCcw, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FaviconGenerator() {
    const [file, setFile] = useState<File | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const generateFavicons = () => {
        if (!file) return;
        setIsGenerating(true);

        // Simulate generation
        setTimeout(() => {
            setIsGenerating(false);
            setResult({
                packages: [
                    { name: 'favicon.ico (Standard)', size: '16x16, 32x32', count: 1 },
                    { name: 'apple-touch-icon.png', size: '180x180', count: 1 },
                    { name: 'android-chrome.png', size: '192x192, 512x512', count: 2 },
                    { name: 'safari-pinned-tab.svg', size: 'Vector', count: 1 },
                ]
            });
        }, 2000);
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Upload Column */}
                <div className="space-y-8">
                    <div className="bg-slate-900 border-2 border-dashed border-slate-800 rounded-[2rem] p-12 text-center group hover:border-red-500/50 transition-all cursor-pointer relative overflow-hidden">
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <div className="relative z-0 flex flex-col items-center">
                            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Upload your logo</h3>
                            <p className="text-slate-500 text-sm max-w-xs mb-8">
                                SVG recommended for best quality. We also support PNG, JPG, and WebP.
                            </p>
                            {file && (
                                <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 animate-in zoom-in">
                                    <FileImage className="w-4 h-4" />
                                    {file.name}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={generateFavicons}
                        disabled={!file || isGenerating}
                        className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-red-600/20 transition-all flex items-center justify-center gap-3"
                    >
                        {isGenerating ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                        {isGenerating ? 'Generating Assets...' : 'Generate Favicon Package'}
                    </button>

                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <Info className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-slate-500 leading-relaxed">
                                By using our tool, we automatically create all the necessary sizes and formats required for modern browsers, mobile devices (iOS/Android), and OS-level integrations.
                            </p>
                        </div>
                        <Link href="/contact" className="text-sm font-bold text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors">
                            Need a custom logo design? Contact us
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Preview Column */}
                <div className="space-y-8">
                    {/* Browser Tab Mockup */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="ml-4 flex-1 bg-slate-900/50 rounded-lg h-7 flex items-center px-3">
                                <div className="w-3 h-3 bg-red-500/20 rounded-sm mr-2 flex items-center justify-center">
                                    {file ? <img src={URL.createObjectURL(file)} className="w-2.5 h-2.5 object-contain" /> : <Globe className="w-2 h-2 text-red-400" />}
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono">https://yoursite.com</span>
                            </div>
                        </div>
                        <div className="p-12 text-center h-[200px] flex flex-col items-center justify-center">
                            <div className="flex items-center gap-2 text-slate-600 font-bold uppercase tracking-widest text-xs mb-4">
                                <Eye className="w-4 h-4" />
                                Browser Tab Preview
                            </div>
                            <div className="flex bg-slate-800 border-2 border-slate-700 px-4 py-2 rounded-lg items-center gap-3">
                                <div className="w-5 h-5 bg-slate-900 rounded flex items-center justify-center">
                                    {file ? <img src={URL.createObjectURL(file)} className="w-4 h-4 object-contain" /> : <div className="w-3 h-3 bg-red-500/40 rounded-sm"></div>}
                                </div>
                                <span className="text-sm font-medium text-slate-300">Your Site Title</span>
                                <div className="w-4 h-4 text-slate-600 ml-4">×</div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Preview */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center gap-4">
                            <Smartphone className="w-5 h-5 text-slate-500" />
                            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border border-white/5">
                                {file ? <img src={URL.createObjectURL(file)} className="w-10 h-10 object-contain" /> : <div className="w-8 h-8 bg-red-500/20 rounded-lg"></div>}
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">iOS Homescreen</span>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center gap-4">
                            <Monitor className="w-5 h-5 text-slate-500" />
                            <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden shadow-xl border border-white/5">
                                {file ? <img src={URL.createObjectURL(file)} className="w-10 h-10 object-contain" /> : <div className="w-8 h-8 bg-red-500/20 rounded-lg"></div>}
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">OS Taskbar</span>
                        </div>
                    </div>

                    {result && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                <h4 className="font-bold text-emerald-400">Favicon Package Ready</h4>
                            </div>
                            <div className="space-y-3">
                                {result.packages.map((pkg: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-emerald-500/10 last:border-0">
                                        <span className="text-slate-300">{pkg.name}</span>
                                        <span className="text-slate-500 font-mono text-[10px]">{pkg.size}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
