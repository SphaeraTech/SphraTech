import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { url, strategy = 'desktop' } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Normalize URL
        let targetUrl = url.trim();
        if (!targetUrl.startsWith('http')) {
            targetUrl = `https://${targetUrl}`;
        }

        // PageSpeed Insights API Endpoint
        const apiKey = process.env.PAGESPEED_API_KEY;
        const psiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=${strategy}&category=performance${apiKey ? `&key=${apiKey}` : ''}`;

        const response = await fetch(psiEndpoint);

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.error?.message || 'Failed to fetch PageSpeed data' }, { status: response.status });
        }

        const data = await response.json();
        const lighthouse = data.lighthouseResult;
        const audits = lighthouse.audits;

        // Helper to get metric values and status
        const getMetric = (id: string, name: string) => {
            const audit = audits[id];
            return {
                name,
                value: audit.displayValue || `${(audit.numericValue / 1000).toFixed(1)}s`,
                status: audit.score >= 0.9 ? 'pass' : audit.score >= 0.5 ? 'warning' : 'fail'
            };
        };

        // Extract opportunities (audits with high potential savings)
        const opportunities = Object.values(audits)
            .filter((a: any) => a.details?.type === 'opportunity' && a.details.overallSavingsMs > 0)
            .sort((a: any, b: any) => b.details.overallSavingsMs - a.details.overallSavingsMs)
            .slice(0, 3)
            .map((a: any) => ({
                title: a.title,
                impact: `${(a.details.overallSavingsMs / 1000).toFixed(2)}s`,
                category: a.id.includes('image') ? 'Images' : a.id.includes('server') ? 'Backend' : 'Assets'
            }));

        return NextResponse.json({
            score: Math.round(lighthouse.categories.performance.score * 100),
            metrics: [
                getMetric('first-contentful-paint', 'First Contentful Paint'),
                getMetric('speed-index', 'Speed Index'),
                getMetric('largest-contentful-paint', 'Largest Contentful Paint'),
                getMetric('interactive', 'Time to Interactive'),
                getMetric('total-blocking-time', 'Total Blocking Time'),
                getMetric('cumulative-layout-shift', 'Cumulative Layout Shift'),
            ],
            opportunities: opportunities.length > 0 ? opportunities : [
                { title: 'No major optimization opportunities found!', impact: '0s', category: 'Perfect' }
            ]
        });

    } catch (error) {
        console.error('Error in speed-test API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
