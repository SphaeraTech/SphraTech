import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SanityPost } from "@/types/blog";
import { urlFor } from "@/lib/helpers"; // your image helper

interface BlogPostCardProps {
  post: SanityPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
      
      {/* Featured Image */}
      {post.mainImage && (
        <Link
          href={`/blog/${post.slug.current}`}
          className="block relative h-48 w-full overflow-hidden"
        >
          <Image
            src={urlFor(post.mainImage).width(800).height(500).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}

      <div className="p-6">
        
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={category._id}
                className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug.current}`}>
          <h2 className="text-xl font-bold mb-3 hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-slate-400 mb-4 line-clamp-3 text-sm">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2">
            {post.author?.image && (
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={urlFor(post.author.image).width(100).height(100).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span>{post.author?.name || "SphaeraTech"}</span>
          </div>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
