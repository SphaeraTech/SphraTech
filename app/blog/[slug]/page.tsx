import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/helpers'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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
      author->{
        name,
        image
      }
    }
  `

  return client.fetch(query, { slug })
}
const components = {
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full h-[400px] my-10 rounded-xl overflow-hidden">
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
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold my-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg leading-relaxed mb-4 text-slate-300">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
  },
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
    <article className="max-w-4xl mx-auto px-6 pt-32 pb-12">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-8 text-slate-400">
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
          <p>{post.author?.name}</p>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>

      </div>

      {/* Main Image */}
      {post.mainImage && (
        <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-invert prose-slate max-w-none">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  )
}
