import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Normalize URL
        let baseUrl = url.trim();
        if (!baseUrl.startsWith('http')) {
            baseUrl = `https://${baseUrl}`;
        }
        baseUrl = baseUrl.replace(/\/$/, '');

        const robotsUrl = `${baseUrl}/robots.txt`;
        const sitemapUrl = `${baseUrl}/sitemap.xml`;

        const fetchWithTimeout = async (target: string) => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);
                const response = await fetch(target, { signal: controller.signal });
                clearTimeout(timeoutId);
                return response;
            } catch (e) {
                return null;
            }
        };

        const [robotsRes, sitemapRes] = await Promise.all([
            fetchWithTimeout(robotsUrl),
            fetchWithTimeout(sitemapUrl)
        ]);

        const robotsData = {
            status: 'fail',
            found: false,
            url: robotsUrl,
            audits: [] as any[]
        };

        const sitemapData = {
            status: 'fail',
            found: false,
            url: sitemapUrl,
            audits: [] as any[]
        };

        // Analyze Robots.txt
        if (robotsRes && robotsRes.ok) {
            robotsData.found = true;
            const content = await robotsRes.text();
            robotsData.audits.push({ title: 'File Reachability', status: 'pass', msg: 'robots.txt found and accessible.' });

            const hasSitemap = content.toLowerCase().includes('sitemap:');
            robotsData.audits.push({
                title: 'Sitemap Link',
                status: hasSitemap ? 'pass' : 'warning',
                msg: hasSitemap ? 'Sitemap reference found in robots.txt.' : 'No sitemap link found in robots.txt.'
            });

            const isDisallowedAll = content.toLowerCase().includes('disallow: /') && !content.toLowerCase().includes('allow: /');
            robotsData.audits.push({
                title: 'Crawlability',
                status: isDisallowedAll ? 'fail' : 'pass',
                msg: isDisallowedAll ? 'Main search engines might be blocked.' : 'Major search engines are allowed to crawl.'
            });

            robotsData.status = hasSitemap && !isDisallowedAll ? 'pass' : 'warning';
            if (!isDisallowedAll && !hasSitemap) robotsData.status = 'warning';
        } else {
            robotsData.audits.push({ title: 'File Reachability', status: 'fail', msg: 'robots.txt not found (404) or inaccessible.' });
        }

        // Analyze Sitemap.xml
        if (sitemapRes && sitemapRes.ok) {
            sitemapData.found = true;
            const content = await sitemapRes.text();
            sitemapData.audits.push({ title: 'File Reachability', status: 'pass', msg: 'sitemap.xml found and accessible.' });

            const isXml = content.trim().startsWith('<?xml') || content.includes('<urlset');
            sitemapData.audits.push({
                title: 'XML Format',
                status: isXml ? 'pass' : 'fail',
                msg: isXml ? 'Valid XML structure detected.' : 'The file does not appear to be a valid XML sitemap.'
            });

            const urlCount = (content.match(/<url>/g) || []).length;
            sitemapData.audits.push({
                title: 'URL Count',
                status: urlCount > 0 ? 'pass' : 'warning',
                msg: urlCount > 0 ? `${urlCount} URLs discovered in the sitemap.` : 'No URLs found in the sitemap.'
            });

            sitemapData.status = isXml && urlCount > 0 ? 'pass' : 'fail';
        } else {
            sitemapData.audits.push({ title: 'File Reachability', status: 'fail', msg: 'sitemap.xml not found (404) or inaccessible.' });
        }

        return NextResponse.json({ robots: robotsData, sitemap: sitemapData });
    } catch (error) {
        console.error('Error in robots-sitemap API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
