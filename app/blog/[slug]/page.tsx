import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/helpers'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
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
export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug)

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
    <article className="max-w-4xl mx-auto px-6 py-12">
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
      <div className="prose prose-invert max-w-none">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}
