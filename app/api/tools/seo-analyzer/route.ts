import { NextRequest, NextResponse } from 'next/server';

interface Audit {
    title: string;
    status: 'pass' | 'warning' | 'fail';
    description: string;
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

        const startTime = Date.now();
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch the website: ${response.statusText}` }, { status: response.status });
        }

        const html = await response.text();
        const responseTime = Date.now() - startTime;
        const headers = Object.fromEntries(response.headers.entries());

        const audits: Audit[] = [];
        let seoScore = 100;
        let accessibilityScore = 100;
        let bestPracticesScore = 100;
        let performanceScore = 100;

        // --- SEO AUDITS ---

        // 1. Title Tag
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : '';
        if (!title) {
            audits.push({ title: 'Meta Title', status: 'fail', description: 'Missing <title> tag. This is critical for SEO.' });
            seoScore -= 40;
        } else if (title.length < 30 || title.length > 60) {
            audits.push({ title: 'Meta Title', status: 'warning', description: `Title length is ${title.length} chars. Optimal is 30-60.` });
            seoScore -= 10;
        } else {
            audits.push({ title: 'Meta Title', status: 'pass', description: 'Your page has a meta title of optimal length.' });
        }

        // 2. Meta Description
        const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
        const description = descMatch ? descMatch[1] : '';
        if (!description) {
            audits.push({ title: 'Meta Description', status: 'fail', description: 'Missing meta description. Search engines use this for snippets.' });
            seoScore -= 30;
        } else if (description.length < 120 || description.length > 160) {
            audits.push({ title: 'Meta Description', status: 'warning', description: `Description length is ${description.length} chars. Optimal is 120-160.` });
            seoScore -= 10;
        } else {
            audits.push({ title: 'Meta Description', status: 'pass', description: 'Meta description is present and descriptive.' });
        }

        // 3. H1 Headings
        const h1Count = (html.match(/<h1/gi) || []).length;
        if (h1Count === 0) {
            audits.push({ title: 'H1 Headings', status: 'fail', description: 'No H1 heading found. Every page should have exactly one H1.' });
            seoScore -= 20;
        } else if (h1Count > 1) {
            audits.push({ title: 'H1 Headings', status: 'warning', description: `Detected ${h1Count} H1 tags. Using more than one can confuse search engines.` });
            seoScore -= 10;
        } else {
            audits.push({ title: 'H1 Headings', status: 'pass', description: 'Proper H1 heading hierarchy detected.' });
        }

        // 4. Canonical Tag
        const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
        if (!canonicalMatch) {
            audits.push({ title: 'Canonical Tag', status: 'warning', description: 'Missing canonical tag. This helps prevent duplicate content issues.' });
            seoScore -= 10;
        } else {
            audits.push({ title: 'Canonical Tag', status: 'pass', description: 'Canonical tag is correctly implemented.' });
        }

        // --- ACCESSIBILITY AUDITS ---

        // 5. Image Alt Text
        const imgTags = html.match(/<img[^>]+>/gi) || [];
        const imgsWithoutAlt = imgTags.filter(img => !img.match(/alt=["'](.*?)["']/i) || img.match(/alt=["']["']/i)).length;
        if (imgTags.length > 0 && imgsWithoutAlt > 0) {
            audits.push({ title: 'Image Alt Text', status: 'warning', description: `${imgsWithoutAlt} images are missing descriptive alt text.` });
            accessibilityScore -= Math.min(imgsWithoutAlt * 10, 40);
        } else if (imgTags.length > 0) {
            audits.push({ title: 'Image Alt Text', status: 'pass', description: 'All images have descriptive alt text.' });
        }

        // --- BEST PRACTICES AUDITS ---

        // 6. HTTPS Security
        if (!targetUrl.startsWith('https')) {
            audits.push({ title: 'HTTPS Security', status: 'fail', description: 'Site is not using HTTPS. This is a major security and SEO risk.' });
            bestPracticesScore -= 50;
        } else {
            audits.push({ title: 'HTTPS Security', status: 'pass', description: 'Site is securely served over HTTPS.' });
        }

        // 7. Mobile Viewport
        const viewportMatch = html.match(/<meta\s+name=["']viewport["']\s+content=["'](.*?)["']/i);
        if (!viewportMatch) {
            audits.push({ title: 'Mobile Optimization', status: 'fail', description: 'Missing viewport meta tag. Site may not be mobile-friendly.' });
            bestPracticesScore -= 30;
        } else {
            audits.push({ title: 'Mobile Optimization', status: 'pass', description: 'Page is mobile-friendly and viewport is configured.' });
        }

        // --- PERFORMANCE AUDITS (ESTIMATED) ---

        // 8. Page Load Speed (Response time)
        if (responseTime > 1000) {
            audits.push({ title: 'Page Load Speed', status: 'fail', description: `Server response time is slow (${responseTime}ms).` });
            performanceScore -= 40;
        } else if (responseTime > 500) {
            audits.push({ title: 'Page Load Speed', status: 'warning', description: `Server response time is average (${responseTime}ms).` });
            performanceScore -= 20;
        } else {
            audits.push({ title: 'Page Load Speed', status: 'pass', description: `Fast server response time (${responseTime}ms).` });
        }

        // --- FINAL SCORE CALCULATION ---
        seoScore = Math.max(seoScore, 0);
        accessibilityScore = Math.max(accessibilityScore, 0);
        bestPracticesScore = Math.max(bestPracticesScore, 0);
        performanceScore = Math.max(performanceScore, 0);

        return NextResponse.json({
            scores: {
                seo: seoScore,
                performance: performanceScore,
                accessibility: accessibilityScore,
                bestPractices: bestPracticesScore,
            },
            audits: audits
        });

    } catch (error) {
        console.error('Error in seo-analyzer API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
