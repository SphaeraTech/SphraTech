'use client';

import dynamic from 'next/dynamic';

/**
 * Each tool is loaded on demand. Importing all ten statically put every tool's
 * JS into every tool page's bundle; with `dynamic` a visitor to
 * /free-tools/seo-analyzer downloads only the SEO analyzer.
 */
const loading = () => (
  <div className="flex min-h-[300px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-edge border-t-brand" />
  </div>
);

const TOOLS: Record<string, React.ComponentType> = {
  'website-speed-test': dynamic(() => import('@/components/tools/WebsiteSpeedTest'), { loading }),
  'seo-analyzer': dynamic(() => import('@/components/tools/SeoAnalyzer'), { loading }),
  'meta-tag-generator': dynamic(() => import('@/components/tools/MetaTagGenerator'), { loading }),
  'robots-sitemap-checker': dynamic(() => import('@/components/tools/RobotsSitemapChecker'), { loading }),
  'keyword-difficulty-checker': dynamic(() => import('@/components/tools/KeywordDifficultyChecker'), { loading }),
  'website-cost-estimator': dynamic(() => import('@/components/tools/WebsiteCostEstimator'), { loading }),
  'mobile-friendly-test': dynamic(() => import('@/components/tools/MobileFriendlyTest'), { loading }),
  'tech-stack-detector': dynamic(() => import('@/components/tools/TechStackDetector'), { loading }),
  'color-palette-generator': dynamic(() => import('@/components/tools/ColorPaletteGenerator'), { loading }),
  'favicon-generator': dynamic(() => import('@/components/tools/FaviconGenerator'), { loading }),
};

export default function ToolRunner({ id }: { id: string }) {
  const Tool = TOOLS[id];
  if (!Tool) return <div>Tool implementation coming soon...</div>;
  return <Tool />;
}
