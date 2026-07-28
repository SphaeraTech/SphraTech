'use client';

import { useParams, notFound } from 'next/navigation';
import { freeToolsData } from '@/lib/freeToolsData';
import { ChevronLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

// Import tool components (placeholders for now)
import WebsiteSpeedTest from '@/components/tools/WebsiteSpeedTest';
import SeoAnalyzer from '@/components/tools/SeoAnalyzer';
import MetaTagGenerator from '@/components/tools/MetaTagGenerator';
import RobotsSitemapChecker from '@/components/tools/RobotsSitemapChecker';
import KeywordDifficultyChecker from '@/components/tools/KeywordDifficultyChecker';
import WebsiteCostEstimator from '@/components/tools/WebsiteCostEstimator';
import MobileFriendlyTest from '@/components/tools/MobileFriendlyTest';
import TechStackDetector from '@/components/tools/TechStackDetector';
import ColorPaletteGenerator from '@/components/tools/ColorPaletteGenerator';
import FaviconGenerator from '@/components/tools/FaviconGenerator';

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
        <main className="min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-faint text-sm mb-8 font-mono">
                    <Link href="/free-tools" className="hover:text-ink transition-colors flex items-center gap-1">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Tools
                    </Link>
                    <span>/</span>
                    <span className="text-body">{tool.title}</span>
                </nav>

                {/* Tool Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-4">
                            {'// '}{tool.categoryLabel}
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
                            {tool.title}
                        </h1>
                        <p className="text-lg text-body max-w-2xl">
                            {tool.description}
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-edge hover:border-brand text-ink rounded-lg transition-colors self-start md:self-center">
                        <Share2 className="w-4 h-4" />
                        Share Tool
                    </button>
                </div>

                {/* Tool Interface */}
                <div className="bg-surface border border-edge rounded-xl p-8 min-h-[400px]">
                    <ToolComponent />
                </div>
            </div>
        </main>
    );
}
