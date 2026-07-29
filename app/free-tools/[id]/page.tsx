import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Share2 } from 'lucide-react';
import { freeToolsData } from '@/lib/freeToolsData';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import ToolRunner from './ToolRunner';

/** Prerender every tool page — the shell is static, only the tool is dynamic. */
export function generateStaticParams() {
    return freeToolsData.map((tool) => ({ id: tool.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const tool = freeToolsData.find((t) => t.id === id);
    if (!tool) return {};

    return {
        title: tool.title,
        description: tool.description,
        alternates: { canonical: `/free-tools/${tool.id}` },
        openGraph: {
            url: `/free-tools/${tool.id}`,
            title: tool.title,
            description: tool.description,
        },
    };
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tool = freeToolsData.find((t) => t.id === id);

    if (!tool) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-12">
            <JsonLd
                schema={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: tool.title,
                        description: tool.description,
                        applicationCategory: 'WebApplication',
                        operatingSystem: 'Any',
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                    },
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Free Tools', path: '/free-tools' },
                        { name: tool.title, path: `/free-tools/${tool.id}` },
                    ]),
                ]}
            />

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
                    {/* TODO: no handler wired up — this button is inert today. */}
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-edge hover:border-brand text-ink rounded-lg transition-colors self-start md:self-center">
                        <Share2 className="w-4 h-4" />
                        Share Tool
                    </button>
                </div>

                {/* Tool Interface */}
                <div className="bg-surface border border-edge rounded-xl p-8 min-h-[400px]">
                    <ToolRunner id={tool.id} />
                </div>
            </div>
        </main>
    );
}
