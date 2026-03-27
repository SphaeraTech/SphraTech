import { NextRequest, NextResponse } from 'next/server';

interface Tech {
    name: string;
    version?: string;
    type?: string;
    confidence: number;
    icon: string;
}

interface Category {
    name: string;
    techs: Tech[];
}

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Normalize URL
        let targetUrl = url.trim();
        if (!targetUrl.startsWith('http')) {
            targetUrl = `https://${targetUrl}`;
        }

        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch the website: ${response.statusText}` }, { status: response.status });
        }

        const html = await response.text();
        const headers = Object.fromEntries(response.headers.entries());

        const detected: Category[] = [
            { name: 'Framework & Frontend', techs: [] },
            { name: 'Infrastructure & Hosting', techs: [] },
            { name: 'Analytics & Tracking', techs: [] },
            { name: 'Security & Tools', techs: [] }
        ];

        const addTech = (categoryName: string, tech: Tech) => {
            const category = detected.find(c => c.name === categoryName);
            if (category && !category.techs.some(t => t.name === tech.name)) {
                category.techs.push(tech);
            }
        };

        // --- DETECTION RULES ---

        // 1. Framework & Frontend
        if (html.includes('_next/static') || headers['x-powered-by']?.includes('Next.js')) {
            addTech('Framework & Frontend', { name: 'Next.js', confidence: 100, icon: '⚡', type: 'Framework' });
        }
        if (html.includes('react.production.min.js') || html.includes('react-dom') || html.includes('__REACT_DEVTOOLS_GLOBAL_HOOK__')) {
            addTech('Framework & Frontend', { name: 'React', confidence: 95, icon: '⚛️', type: 'Library' });
        }
        if (html.includes('vue.js') || html.includes('vue.min.js') || html.includes('v-bind') || html.includes('__VUE__')) {
            addTech('Framework & Frontend', { name: 'Vue.js', confidence: 95, icon: '🖖', type: 'Framework' });
        }
        if (html.includes('nuxt')) {
            addTech('Framework & Frontend', { name: 'Nuxt.js', confidence: 100, icon: '💚', type: 'Framework' });
        }
        if (html.includes('tailwindcss') || html.includes('tailwind.min.css') || html.includes('tw-')) {
            addTech('Framework & Frontend', { name: 'Tailwind CSS', confidence: 90, icon: '🎨', type: 'CSS Framework' });
        }
        if (html.includes('bootstrap.min.css') || html.includes('bootstrap.bundle.min.js')) {
            addTech('Framework & Frontend', { name: 'Bootstrap', confidence: 95, icon: '🅱️', type: 'CSS Framework' });
        }
        if (html.includes('wp-content') || html.includes('wp-includes') || html.includes('wordpress')) {
            addTech('Framework & Frontend', { name: 'WordPress', confidence: 100, icon: 'Ⓜ️', type: 'CMS' });
        }
        if (html.includes('cdn.shopify.com')) {
            addTech('Framework & Frontend', { name: 'Shopify', confidence: 100, icon: '🛍️', type: 'E-commerce' });
        }

        // 2. Infrastructure & Hosting
        if (headers['server']?.toLowerCase().includes('cloudflare')) {
            addTech('Infrastructure & Hosting', { name: 'Cloudflare', confidence: 100, icon: '☁️', type: 'DNS/CDN' });
        }
        if (headers['x-vercel-id'] || headers['server']?.toLowerCase().includes('vercel')) {
            addTech('Infrastructure & Hosting', { name: 'Vercel', confidence: 100, icon: '▲', type: 'Hosting' });
        }
        if (headers['x-nf-request-id'] || headers['server']?.toLowerCase().includes('netlify')) {
            addTech('Infrastructure & Hosting', { name: 'Netlify', confidence: 100, icon: '◈', type: 'Hosting' });
        }
        if (headers['server']?.toLowerCase().includes('nginx')) {
            addTech('Infrastructure & Hosting', { name: 'Nginx', confidence: 90, icon: '⚙️', type: 'Web Server' });
        }
        if (headers['server']?.toLowerCase().includes('apache')) {
            addTech('Infrastructure & Hosting', { name: 'Apache', confidence: 90, icon: '🦅', type: 'Web Server' });
        }

        // 3. Analytics & Tracking
        if (html.includes('googletagmanager.com/gtm.js') || html.includes('gtag')) {
            addTech('Analytics & Tracking', { name: 'Google Tag Manager', confidence: 100, icon: '🏷️', type: 'Tag Management' });
        }
        if (html.includes('google-analytics.com/analytics.js') || html.includes('ga.js') || html.includes('GA4')) {
            addTech('Analytics & Tracking', { name: 'Google Analytics', confidence: 100, icon: '📊', type: 'Analytics' });
        }
        if (html.includes('hotjar.js')) {
            addTech('Analytics & Tracking', { name: 'Hotjar', confidence: 100, icon: '🔥', type: 'Heatmaps' });
        }
        if (html.includes('posthog')) {
            addTech('Analytics & Tracking', { name: 'PostHog', confidence: 100, icon: '🦔', type: 'Product Analytics' });
        }

        // 4. Security & Tools
        if (html.includes('js.stripe.com')) {
            addTech('Security & Tools', { name: 'Stripe', confidence: 100, icon: '💳', type: 'Payments' });
        }
        if (html.includes('sentry.io') || html.includes('Sentry.init')) {
            addTech('Security & Tools', { name: 'Sentry', confidence: 100, icon: '🛠️', type: 'Error Tracking' });
        }
        if (html.includes('intercomcdn.com') || html.includes('Intercom')) {
            addTech('Security & Tools', { name: 'Intercom', confidence: 100, icon: '💬', type: 'Customer Support' });
        }
        if (html.includes('hubspot.com')) {
            addTech('Security & Tools', { name: 'HubSpot', confidence: 100, icon: '🧡', type: 'Marketing' });
        }

        // Filter out empty categories
        const filteredResults = detected.filter(cat => cat.techs.length > 0);

        // If no tech detected, add a default fallback or keep it empty
        if (filteredResults.length === 0) {
            // We could add a "Generic" category or just return empty
        }

        return NextResponse.json({
            url: targetUrl,
            categories: filteredResults.length > 0 ? filteredResults : [
                {
                    name: 'Detected Technologies',
                    techs: [{ name: 'Custom/Unknown', type: 'The site uses a custom stack or hides its technology.', confidence: 70, icon: '❓' }]
                }
            ]
        });

    } catch (error) {
        console.error('Error in tech-stack API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
