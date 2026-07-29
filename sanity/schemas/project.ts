import { defineType, defineField, defineArrayMember } from 'sanity';

/** Matches the service pages under app/services/* so a project can be surfaced there too. */
export const SERVICE_OPTIONS = [
  { title: 'Web development', value: 'web' },
  { title: 'SaaS platform', value: 'saas' },
  { title: 'Mobile app', value: 'mobile' },
  { title: 'SEO', value: 'seo' },
];

export const metric = defineType({
  name: 'metric',
  title: 'Result',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The headline number, e.g. "+180%", "0.9s", "12k". Keep it short — it renders large.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString',
      description: 'What the number measures, e.g. "Faster load time".',
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label.en' },
  },
});

export const galleryVideo = defineType({
  name: 'galleryVideo',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'file',
      title: 'Video file',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster image',
      type: 'image',
      description: 'Shown before the video loads. Strongly recommended.',
      options: { hotspot: true },
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'localeString' }),
    defineField({
      name: 'wide',
      title: 'Full width',
      type: 'boolean',
      description: 'Span both columns in the gallery.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'caption.en', media: 'poster' },
    prepare: ({ title, media }) => ({ title: title || 'Video', media }),
  },
});

export const testimonial = defineType({
  name: 'projectTestimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'localeText' }),
    defineField({ name: 'author', title: 'Author name', type: 'string' }),
    defineField({ name: 'role', title: 'Author role', type: 'localeString' }),
  ],
});

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'story', title: 'Case study' },
    { name: 'media', title: 'Media' },
    { name: 'meta', title: 'Settings' },
  ],
  fields: [
    // ---- Overview -------------------------------------------------------
    defineField({
      name: 'title',
      title: 'Project name',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client',
      type: 'string',
      group: 'overview',
      description: 'The company the work was for.',
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      group: 'overview',
      options: { list: SERVICE_OPTIONS, layout: 'radio' },
      initialValue: 'web',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'localeString',
      group: 'overview',
      description: 'One line under the title. What the project is, in plain words.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'localeText',
      group: 'overview',
      description: 'Two or three sentences. Used on the index card and as the page meta description.',
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'localeString',
      group: 'overview',
      description: 'The client’s industry, e.g. "Logistics", "Automotive parts".',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'overview',
      validation: (rule) => rule.min(2000).max(2100),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'localeString',
      group: 'overview',
      description: 'e.g. "6 weeks", "3 months".',
    }),
    defineField({
      name: 'deliverables',
      title: 'What we delivered',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({ type: 'localeString' })],
      description: 'Short chips, e.g. "UI design", "Frontend", "Quote calculator".',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech stack',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      description: 'Product names are not translated — one list for all languages.',
    }),
    defineField({
      name: 'siteLink',
      title: 'Live site URL',
      type: 'url',
      group: 'overview',
    }),

    // ---- Case study -----------------------------------------------------
    defineField({
      name: 'challenge',
      title: 'The challenge',
      type: 'localeBlock',
      group: 'story',
      description: 'What the client was up against before the project.',
    }),
    defineField({
      name: 'approach',
      title: 'What we built',
      type: 'localeBlock',
      group: 'story',
      description: 'The work itself — decisions, architecture, notable features.',
    }),
    defineField({
      name: 'outcome',
      title: 'The outcome',
      type: 'localeBlock',
      group: 'story',
      description: 'What changed for the client after launch.',
    }),
    defineField({
      name: 'metrics',
      title: 'Results',
      type: 'array',
      group: 'story',
      of: [defineArrayMember({ type: 'metric' })],
      description: 'Up to four. Rendered as a large number row — leave empty if you have no real figures.',
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'projectTestimonial',
      group: 'story',
    }),

    // ---- Media ----------------------------------------------------------
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'The hero shot. Used on the index card and at the top of the case study.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          name: 'galleryImage',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Caption', type: 'localeString' }),
            defineField({
              name: 'wide',
              title: 'Full width',
              type: 'boolean',
              description: 'Span both columns.',
              initialValue: false,
            }),
          ],
        }),
        defineArrayMember({ type: 'galleryVideo' }),
      ],
    }),

    // ---- Settings -------------------------------------------------------
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      description: 'Featured projects render as a full-width row at the top of the index.',
      initialValue: false,
    }),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      group: 'meta',
      description: 'Lower numbers come first. Ties fall back to newest year.',
      initialValue: 100,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      name: 'displayOrder',
      title: 'Display order',
      by: [
        { field: 'orderRank', direction: 'asc' },
        { field: 'year', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'clientName', media: 'coverImage', service: 'service' },
    prepare: ({ title, subtitle, media, service }) => ({
      title,
      subtitle: [SERVICE_OPTIONS.find((o) => o.value === service)?.title, subtitle]
        .filter(Boolean)
        .join(' · '),
      media,
    }),
  },
});
