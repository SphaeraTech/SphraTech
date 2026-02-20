import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost } from '@/types/blog';

interface BlogPostCardProps {
    post: WordPressPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const author = post._embedded?.author?.[0];
    const categories = post._embedded?.['wp:term']?.flat().filter(term => term.taxonomy === 'category') || [];
    
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <article className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
            {/* Featured Image */}
            {featuredImage && (
                <Link href={`/blog/${post.slug}`} className="block relative h-48 w-full overflow-hidden">
                    <Image
                        src={featuredImage.source_url}
                        alt={featuredImage.alt_text || post.title.rendered}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>
            )}
            
            <div className="p-6">
                {/* Categories */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {categories.slice(0, 2).map((category) => (
                            <span
                                key={category.id}
                                className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                )}
                
                {/* Title */}
                <Link href={`/blog/${post.slug}`}>
                    <h2 
                        className="text-xl font-bold mb-3 hover:text-blue-400 transition-colors line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                </Link>
                
                {/* Excerpt */}
                <div 
                    className="text-slate-400 mb-4 line-clamp-3 text-sm"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-2">
                        {author?.avatar_urls && (
                            <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                <Image
                                    src={author.avatar_urls['48']}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <span>{author?.name || 'SphaeraTech'}</span>
                    </div>
                    <time dateTime={post.date}>{formattedDate}</time>
                </div>
            </div>
        </article>
    );
};

export default BlogPostCard;