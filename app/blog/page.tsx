import React from 'react';
import Navigation from '@/app/components/Navigation';
import BlogPostCard from '@/app/components/BlogPostCard';
import { Metadata } from 'next';
import { WordPressPost } from '@/types/blog';
import { getPosts } from '../lib/sanity';

export const metadata: Metadata = {
    title: 'Blog - SphaeraTech',
    description: 'Latest insights, news, and updates from SphaeraTech',
};



export default async function BlogPage() {
    const posts = await getPosts();
    console.log(posts)
    return (
        <div className="min-h-screen bg-slate-950" >
            <Navigation />

            <main className="text-white">
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Our Blog
                            </h1>
                            <p className="text-xl text-slate-400">
                                Exploring the future of technology, innovation, and digital transformation
                            </p>
                        </div>
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <BlogPostCard key={post._id} post={post} />
                            ))}
                        </div>

                        {posts.length >= 12 && (
                            <div className="text-center mt-12">
                                <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700">
                                    Load More Posts
                                </button>
                            </div>
                        )}
                    </>
                </section>
            </main>
        </div >
    );
}