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
    <article className="h-full flex flex-col bg-surface border border-edge rounded-xl overflow-hidden hover:border-brand/40 hover:-translate-y-0.5 transition-all">

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
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}

      <div className="p-6 flex-1 flex flex-col">

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={category._id}
                className="font-mono text-xs uppercase tracking-[0.15em] text-brand"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug.current}`}>
          <h2 className="font-display text-xl font-bold tracking-tight text-ink mb-3 hover:text-brand transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-body mb-4 line-clamp-3 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto flex items-center justify-between font-mono text-xs text-faint border-t border-edge pt-4">
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
            <span>{post.author?.name || "SpheraTech"}</span>
          </div>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
