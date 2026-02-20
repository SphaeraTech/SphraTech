import React from 'react';
import Navigation from '@/app/components/Navigation';
import BlogPostCard from '@/app/components/BlogPostCard';
import { Metadata } from 'next';
import { WordPressPost } from '@/types/blog';

export const metadata: Metadata = {
    title: 'Blog - SphaeraTech',
    description: 'Latest insights, news, and updates from SphaeraTech',
};

async function getPosts(): Promise<{ posts: WordPressPost[]; error?: string }> {
    try {
        const res = await fetch(
            'https://spheratechcms.xo.je/wp-json/wp/v2/posts?_embed&per_page=12&i=1',
            { 
                next: { revalidate: 3600 },
                // Add headers to help with CORS and request type
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        );
        
        // Check if the response is HTML (likely login page)
        const jsoncontent = await res.text()
        console.log(jsoncontent)
        const contentType = res.headers.get('content-type');
        if (contentType?.includes('text/html')) {
            console.error('Received HTML instead of JSON - API may be protected');
            return { 
                posts: [], 
                error: 'The blog API requires authentication. This appears to be a private WordPress site.' 
            };
        }
        
        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        return { posts: data };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { 
            posts: [], 
            error: error instanceof Error ? error.message : 'Failed to load blog posts' 
        };
    }
}

export default async function BlogPage() {
    const { posts, error } = await getPosts();

    return (
        <div className="min-h-screen bg-slate-950">
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
                    {error ? (
                        <div className="text-center py-20 max-w-2xl mx-auto">
                            <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
                                <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <h3 className="text-2xl font-semibold mb-3 text-slate-300">
                                    Blog Content Protected
                                </h3>
                                <p className="text-slate-400 mb-4">
                                    {error}
                                </p>
                                <p className="text-sm text-slate-500">
                                    This appears to be a private WordPress site that requires authentication. 
                                    You'll need to either:
                                </p>
                                <ul className="text-sm text-slate-500 mt-3 space-y-2">
                                    <li>• Make the WordPress REST API public</li>
                                    <li>• Use WordPress application passwords for authentication</li>
                                    <li>• Install a REST API authentication plugin</li>
                                </ul>
                            </div>
                        </div>
                    ) : posts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <BlogPostCard key={post.id} post={post} />
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
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-semibold mb-4">No posts found</h3>
                            <p className="text-slate-400">Check back later for new content</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}