'use client';

import { useParams, notFound } from 'next/navigation';
import { freeToolsData } from '../../lib/freeToolsData';
import { ChevronLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

// Import tool components (placeholders for now)
import WebsiteSpeedTest from '../../components/tools/WebsiteSpeedTest';
import SeoAnalyzer from '../../components/tools/SeoAnalyzer';
import MetaTagGenerator from '../../components/tools/MetaTagGenerator';
import RobotsSitemapChecker from '../../components/tools/RobotsSitemapChecker';
import KeywordDifficultyChecker from '../../components/tools/KeywordDifficultyChecker';
import WebsiteCostEstimator from '../../components/tools/WebsiteCostEstimator';
import MobileFriendlyTest from '../../components/tools/MobileFriendlyTest';
import TechStackDetector from '../../components/tools/TechStackDetector';
import ColorPaletteGenerator from '../../components/tools/ColorPaletteGenerator';
import FaviconGenerator from '../../components/tools/FaviconGenerator';

const toolComponents: { [key: string]: React.ComponentType } = {
    'website-speed-test': WebsiteSpeedTest,
    'seo-analyzer': SeoAnalyzer,
    'meta-tag-generator': MetaTagGenerator,
    'robots-sitemap-checker': RobotsSitemapChecker,
    'keyword-difficulty-checker': KeywordDifficultyChecker,
    'website-cost-estimator': WebsiteCostEstimator,
    'mobile-friendly-test': MobileFriendlyTest,
    'tech-stack-detector': TechStackDetector,
    'color-palette-generator': ColorPaletteGenerator,
    'favicon-generator': FaviconGenerator,
};

export default function ToolPage() {
    const params = useParams();
    const id = params.id as string;

    const tool = freeToolsData.find((t) => t.id === id);

    if (!tool) {
        notFound();
    }

    const ToolComponent = toolComponents[id] || (() => <div>Tool implementation coming soon...</div>);

    return (
        <main className="min-h-screen bg-slate-950 text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-slate-400 text-sm mb-8">
                    <Link href="/free-tools" className="hover:text-white transition-colors flex items-center gap-1">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Tools
                    </Link>
                    <span>/</span>
                    <span className="text-slate-200">{tool.title}</span>
                </nav>

                {/* Tool Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 bg-gradient-to-r ${tool.gradient} text-white`}>
                            {tool.categoryLabel}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text">
                            {tool.title}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl">
                            {tool.description}
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors self-start md:self-center">
                        <Share2 className="w-5 h-5" />
                        Share Tool
                    </button>
                </div>

                {/* Tool Interface */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 min-h-[400px]">
                    <ToolComponent />
                </div>
            </div>
        </main>
    );
}
