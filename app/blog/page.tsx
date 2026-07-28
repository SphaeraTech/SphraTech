import React from 'react';
import { Metadata } from 'next';
import { SanityPost } from '@/types/blog';
import { getPosts } from '@/lib/sanity';
import BlogPostCard from '@/components/BlogPostCard';
import Reveal from '@/components/motion/Reveal';

export const metadata: Metadata = {
    title: 'Blog - SpheraTech',
    description: 'Latest insights, news, and updates from SpheraTech',
};

export const revalidate = 60; // revalidate every 60 seconds

export default async function BlogPage() {
    const posts = await getPosts();
    return (
        <main className="min-h-screen">
            {/* Header */}
            <section className="pt-32 pb-12 md:pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <p className="font-mono text-brand text-xs uppercase tracking-[0.25em] mb-4">
                            {'// '}Blog
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink">
                            Our Blog
                        </h1>
                        <p className="mt-4 max-w-2xl text-body md:text-lg">
                            Exploring the future of technology, innovation and digital transformation
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: SanityPost, index: number) => (
                        <Reveal key={post._id} delay={index * 70} className="h-full">
                            <BlogPostCard post={post} />
                        </Reveal>
                    ))}
                </div>

                {posts.length >= 12 && (
                    <div className="text-center mt-12">
                        <button className="px-6 py-3 border border-edge text-ink hover:border-brand rounded-lg transition-colors">
                            Load More Posts
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
