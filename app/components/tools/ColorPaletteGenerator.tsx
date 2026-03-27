'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check, Lock, Unlock, Download, Share2, Layout, Palette } from 'lucide-react';
import Link from 'next/link';

export default function ColorPaletteGenerator() {
    const [colors, setColors] = useState<string[]>([]);
    const [locked, setLocked] = useState<boolean[]>([false, false, false, false, false]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    };

    const generatePalette = () => {
        const newColors = colors.length === 0
            ? Array(5).fill('').map(() => generateRandomColor())
            : colors.map((color, i) => locked[i] ? color : generateRandomColor());
        setColors(newColors);
    };

    useEffect(() => {
        generatePalette();
    }, []);

    const toggleLock = (index: number) => {
        const newLocked = [...locked];
        newLocked[index] = !newLocked[index];
        setLocked(newLocked);
    };

    const copyColor = (color: string, index: number) => {
        navigator.clipboard.writeText(color);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    return (
        <div className="space-y-12">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex gap-4">
                    <button
                        onClick={generatePalette}
                        className="bg-red-600 hover:bg-red-500 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all transform active:scale-95"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Generate New (Space)
                    </button>
                    <div className="bg-slate-900 border border-slate-800 p-1 rounded-2xl flex">
                        <button className="p-3 text-slate-400 hover:text-white transition-colors"><Download className="w-5 h-5" /></button>
                        <button className="p-3 text-slate-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
                    </div>
                </div>

                <p className="text-sm text-slate-500 flex items-center gap-2">
                    <span className="p-1.5 bg-slate-800 rounded text-[10px] font-mono border border-slate-700 text-slate-300">SPACE</span>
                    to refresh,
                    <span className="p-1.5 bg-slate-800 rounded text-[10px] font-mono border border-slate-700 text-slate-300">CLICK</span>
                    hex to copy
                </p>
            </div>

            {/* Palette Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 h-[400px] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800">
                {colors.map((color, idx) => (
                    <div
                        key={idx}
                        className="relative group transition-all duration-300 hover:flex-[1.5]"
                        style={{ backgroundColor: color }}
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-end p-8 gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent">
                            <button
                                onClick={() => toggleLock(idx)}
                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-all text-white"
                            >
                                {locked[idx] ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={() => copyColor(color, idx)}
                                className="font-mono font-bold text-lg bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl text-white hover:bg-black/40 transition-all flex items-center gap-2"
                            >
                                {color}
                                {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 opacity-50" />}
                            </button>
                        </div>

                        {/* Visual indicator for locked */}
                        {locked[idx] && (
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
                                <Lock className="w-3 h-3" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Preview Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-red-500/10 rounded-2xl">
                        <Layout className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Live UI Preview</h3>
                        <p className="text-slate-500">See how this palette looks in a modern interface.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Card Preview */}
                    <div className="p-8 rounded-[2rem] border transition-all duration-500" style={{ backgroundColor: colors[0], borderColor: colors[1] + '40' }}>
                        <div className="w-12 h-12 rounded-xl mb-6 shadow-xl" style={{ backgroundColor: colors[2] }}></div>
                        <h4 className="text-3xl font-black mb-4 leading-tight" style={{ color: colors[4] }}>The Art of Visual Consistency.</h4>
                        <p className="mb-8 font-medium opacity-80" style={{ color: colors[4] }}>
                            Colors are the silent language of your brand. They evoke emotion, build trust, and guide your users toward action.
                        </p>
                        <button className="px-8 py-4 rounded-xl font-bold shadow-xl transition-all" style={{ backgroundColor: colors[3], color: colors[0] }}>
                            Explorer Now
                        </button>
                    </div>

                    {/* Component Previews */}
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-1 p-6 rounded-2xl border" style={{ backgroundColor: colors[1] + '10', borderColor: colors[1] + '30' }}>
                                <p className="text-xs uppercase font-bold tracking-widest mb-2 opacity-50" style={{ color: colors[1] }}>Primary Metric</p>
                                <p className="text-4xl font-black" style={{ color: colors[1] }}>84%</p>
                            </div>
                            <div className="flex-1 p-6 rounded-2xl border" style={{ backgroundColor: colors[2] + '10', borderColor: colors[2] + '30' }}>
                                <p className="text-xs uppercase font-bold tracking-widest mb-2 opacity-50" style={{ color: colors[2] }}>Growth</p>
                                <p className="text-4xl font-black" style={{ color: colors[2] }}>+12k</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: colors[4] + '05', borderColor: colors[4] + '20' }}>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors[0] }}></div>
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors[1] }}></div>
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors[2] }}></div>
                            </div>
                            <p className="text-sm font-bold opacity-60" style={{ color: colors[4] }}>SpheraDesign System v2.0</p>
                        </div>

                        <div className="bg-red-600 rounded-2xl p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="font-bold text-lg mb-2">Love these colors?</h4>
                                <p className="text-red-100 text-sm mb-6">We can create a complete custom design system for your brand that stands out from the competition.</p>
                                <Link href="/contact" className="bg-white text-red-600 px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all text-center inline-block">
                                    Work With Us
                                </Link>
                            </div>
                            <Palette className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
