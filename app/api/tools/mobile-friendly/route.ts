import { NextRequest, NextResponse } from 'next/server';

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

        // PageSpeed Insights API Endpoint (Mobile Strategy)
        const apiKey = process.env.PAGESPEED_API_KEY;
        const psiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile&category=seo&category=performance${apiKey ? `&key=${apiKey}` : ''}`;

        const response = await fetch(psiEndpoint);

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.error?.message || 'Failed to fetch Mobile Friendly data' }, { status: response.status });
        }

        const data = await response.json();
        const lighthouse = data.lighthouseResult;
        const audits = lighthouse.audits;

        const getAuditStatus = (id: string) => {
            const audit = audits[id];
            if (!audit) return 'pass'; // Default to pass if not found (some audits might be missing)
            return audit.score >= 0.9 ? 'pass' : audit.score >= 0.5 ? 'warning' : 'fail';
        };

        const issues = [
            { title: 'Viewport configured', status: getAuditStatus('viewport') },
            { title: 'Font size readability', status: getAuditStatus('font-size') },
            { title: 'Tap targets spacing', status: getAuditStatus('tap-targets') },
            { title: 'Content fits screen', status: getAuditStatus('content-width') },
            { title: 'Mobile-only assets', status: getAuditStatus('is-on-https') ? 'pass' : 'warning' }, // Using HTTPS as a proxy for modern mobile assets
        ];

        const isFriendly = issues.every(i => i.status !== 'fail');
        const score = Math.round(lighthouse.categories.performance.score * 100);

        return NextResponse.json({
            isFriendly,
            score,
            issues
        });

    } catch (error) {
        console.error('Error in mobile-friendly API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
