import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/helpers'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'

export const revalidate = 60; // revalidate every 60 seconds

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      body,
      publishedAt,
      _updatedAt,
      excerpt,
      author->{
        name,
        image
      }
    }
  `

  return client.fetch(query, { slug })
}

/** Falls back to the first paragraph when a post has no explicit excerpt. */
function summarize(post: any): string | undefined {
  if (post?.excerpt) return post.excerpt
  const block = post?.body?.find(
    (b: any) => b?._type === 'block' && b?.children?.some((c: any) => c?.text?.trim())
  )
  if (!block) return undefined
  const text = block.children.map((c: any) => c.text ?? '').join('').trim()
  if (!text) return undefined
  return text.length > 155 ? `${text.slice(0, 152).trimEnd()}…` : text
}
const components = {
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full h-[400px] my-10 rounded-xl overflow-hidden border border-edge">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Blog Image'}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="font-display text-4xl font-bold tracking-tight text-ink my-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="font-display text-3xl font-bold tracking-tight text-ink my-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-display text-2xl font-bold tracking-tight text-ink my-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg leading-relaxed mb-4 text-body">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-4 space-y-2 text-body">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-4 space-y-2 text-body">{children}</ol>,
  },
}
/** Per-post metadata — a shared static title left every post with the same
 *  SERP entry and no post name at all. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const description = summarize(post)
  const image = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined

  return {
    title: post.title,
    ...(description ? { description } : {}),
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      url: `/blog/${slug}`,
      title: post.title,
      ...(description ? { description } : {}),
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post._updatedAt ? { modifiedTime: post._updatedAt } : {}),
      ...(post.author?.name ? { authors: [post.author.name] } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return notFound()

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <article className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <JsonLd
        schema={[
          articleSchema({
            title: post.title,
            description: summarize(post),
            path: `/blog/${slug}`,
            publishedAt: post.publishedAt,
            updatedAt: post._updatedAt,
            image: post.mainImage
              ? urlFor(post.mainImage).width(1200).height(630).url()
              : undefined,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      {/* Title */}
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink mb-6">{post.title}</h1>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-8">
        {post.author?.image && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={urlFor(post.author.image).width(100).height(100).url()}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="text-ink text-sm font-medium">{post.author?.name}</p>
          <time dateTime={post.publishedAt} className="font-mono text-xs text-faint">{formattedDate}</time>
        </div>

      </div>

      {/* Main Image */}
      {post.mainImage && (
        <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden border border-edge">
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-p:text-body prose-li:text-body prose-strong:text-ink prose-a:text-brand hover:prose-a:text-brand-strong prose-blockquote:border-brand prose-blockquote:text-body prose-code:text-ink prose-pre:bg-surface prose-pre:border prose-pre:border-edge prose-hr:border-edge">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  )
}
