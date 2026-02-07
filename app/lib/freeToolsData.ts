export interface FreeTool {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  image: string;
  featured: boolean;
  link: string;
  gradient: string;
}

export const categories = [
  { id: 'extensions', name: 'Extensions' },
  { id: 'webapps', name: 'Web apps' },
  { id: 'devtools', name: 'Devtools' },
  { id: 'analytics', name: 'Analytics' },
  { id: 'seo', name: 'SEO' },
  { id: 'utilities', name: 'Utilities' },
  { id: 'productivity', name: 'Productivity' },
];

export const freeToolsData: FreeTool[] = [
  {
    id: 'website-speed-test',
    title: 'Website Speed Test',
    description: 'Analyze page performance, Core Web Vitals, and loading issues.',
    category: 'analytics',
    categoryLabel: 'ANALYTICS',
    image: '/tools/speed-test.svg',
    featured: true,
    link: '/free-tools/website-speed-test',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'seo-analyzer',
    title: 'SEO Analyzer',
    description: 'Check on-page SEO issues, meta tags, headings, and indexing.',
    category: 'seo',
    categoryLabel: 'SEO',
    image: '/tools/seo-analyzer.svg',
    featured: true,
    link: '/free-tools/seo-analyzer',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'meta-tag-generator',
    title: 'Meta Tag Generator',
    description: 'Generate SEO-friendly title and meta description previews.',
    category: 'seo',
    categoryLabel: 'SEO',
    image: '/tools/meta-generator.svg',
    featured: false,
    link: '/free-tools/meta-tag-generator',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'robots-sitemap-checker',
    title: 'Robots & Sitemap Checker',
    description: 'Validate robots.txt and sitemap.xml for crawl issues.',
    category: 'seo',
    categoryLabel: 'SEO',
    image: '/tools/robots-sitemap.svg',
    featured: false,
    link: '/free-tools/robots-sitemap-checker',
    gradient: 'from-red-500 to-rose-500'
  },
  {
    id: 'keyword-difficulty-checker',
    title: 'Keyword Difficulty Checker',
    description: 'Estimate keyword difficulty and search intent quickly.',
    category: 'seo',
    categoryLabel: 'SEO',
    image: '/tools/keyword-checker.svg',
    featured: false,
    link: '/free-tools/keyword-difficulty-checker',
    gradient: 'from-orange-400 to-red-600'
  },
  {
    id: 'website-cost-estimator',
    title: 'Website Cost Estimator',
    description: 'Estimate the cost of building your website or SaaS product.',
    category: 'utilities',
    categoryLabel: 'UTILITIES',
    image: '/tools/cost-estimator.svg',
    featured: true,
    link: '/free-tools/website-cost-estimator',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'mobile-friendly-test',
    title: 'Mobile Friendly Test',
    description: 'Check how well your website performs on mobile devices.',
    category: 'analytics',
    categoryLabel: 'ANALYTICS',
    image: '/tools/mobile-test.svg',
    featured: false,
    link: '/free-tools/mobile-friendly-test',
    gradient: 'from-sky-500 to-blue-500'
  },
  {
    id: 'tech-stack-detector',
    title: 'Tech Stack Detector',
    description: 'Detect frameworks, CMS, hosting, and analytics tools used.',
    category: 'devtools',
    categoryLabel: 'DEVTOOLS',
    image: '/tools/tech-stack.svg',
    featured: false,
    link: '/free-tools/tech-stack-detector',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'color-palette-generator',
    title: 'Color Palette Generator',
    description: 'Generate modern color palettes for websites and apps.',
    category: 'utilities',
    categoryLabel: 'UTILITIES',
    image: '/tools/color-palette.svg',
    featured: false,
    link: '/free-tools/color-palette-generator',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'favicon-generator',
    title: 'Favicon Generator',
    description: 'Create favicons instantly for all devices and browsers.',
    category: 'utilities',
    categoryLabel: 'UTILITIES',
    image: '/tools/favicon.svg',
    featured: false,
    link: '/free-tools/favicon-generator',
    gradient: 'from-purple-500 to-fuchsia-500'
  }
];


//   Website Speed Test ⚡

// Tests site performance
// Shows issues (that you can fix!)
// Direct lead generation: "Want us to fix these issues?"


// SEO Analyzer 🔍

// Checks basic SEO
// Shows problems
// CTA: "Get professional SEO services"


// Color Palette Generator 🎨

// Simple, useful for designers
// Shows your design taste
// Low maintenance


// Favicon Generator 🖼️

// Super simple
// Everyone needs it
// Quick win


// Meta Tag Generator 📝

// Helps with SEO
// Educational
// Positions you as SEO expert