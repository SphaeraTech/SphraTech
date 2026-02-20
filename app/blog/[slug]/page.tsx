import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { WordPressPost } from '@/types/blog';
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        slug: string;
    };
}

async function getPost(slug: string): Promise<WordPressPost | null> {
    try {
        const res = await fetch(
            `https://spheratechcms.xo.je/wp-json/wp/v2/posts?_embed&slug=${slug}`,
            { next: { revalidate: 3600 } }
        );
        
        if (!res.ok) {
            return null;
        }
        
        const posts = await res.json();
        return posts[0] || null;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = await getPost(params.slug);
    
    if (!post) {
        return {
            title: 'Post Not Found - SphaeraTech',
            description: 'The requested blog post could not be found.',
        };
    }
    
    const cleanTitle = post.title.rendered.replace(/<[^>]*>/g, '');
    const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160);
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    
    return {
        title: `${cleanTitle} - SphaeraTech Blog`,
        description: cleanExcerpt,
        openGraph: {
            title: cleanTitle,
            description: cleanExcerpt,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.modified,
            images: featuredImage ? [featuredImage] : [],
        },
    };
}

export default async function SinglePostPage({ params }: PageProps) {
    const post = await getPost(params.slug);
    
    if (!post) {
        notFound();
    }
    
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const author = post._embedded?.author?.[0];
    const categories = post._embedded?.['wp:term']?.flat().filter(term => term.taxonomy === 'category') || [];
    const tags = post._embedded?.['wp:term']?.flat().filter(term => term.taxonomy === 'post_tag') || [];
    
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-slate-950">
            
            <main className="text-white">
                {/* Hero Section with Featured Image */}
                <section className="relative h-[50vh] min-h-[400px] max-h-[600px]">
                    {featuredImage ? (
                        <>
                            <Image
                                src={featuredImage.source_url}
                                alt={featuredImage.alt_text || post.title.rendered}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30" />
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        {/* Categories */}
                        {categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {categories.map((category) => (
                                    <span
                                        key={category.id}
                                        className="text-sm px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30"
                                    >
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        {/* Title */}
                        <h1 
                            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="flex items-center gap-2">
                                {author?.avatar_urls && (
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                        <Image
                                            src={author.avatar_urls['96']}
                                            alt={author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <span>{author?.name || 'SphaeraTech'}</span>
                            </div>
                            <span>•</span>
                            <time dateTime={post.date}>{formattedDate}</time>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div 
                        className="prose prose-invert prose-lg max-w-none
                            prose-headings:text-white prose-headings:font-bold
                            prose-p:text-slate-300 prose-p:leading-relaxed
                            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
                            prose-strong:text-white
                            prose-ul:text-slate-300 prose-ol:text-slate-300
                            prose-li:marker:text-slate-500
                            prose-blockquote:border-l-blue-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                            prose-img:rounded-xl prose-img:shadow-2xl
                            prose-hr:border-slate-800"
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    />

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-800">
                            <h2 className="text-sm font-semibold text-slate-400 mb-3">TAGS</h2>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="text-sm px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back to Blog */}
                    <div className="mt-12">
                        <Link 
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </article>
            </main>
        </div>
    );
}