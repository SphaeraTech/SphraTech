export interface SanityPost {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: any;
    excerpt?: string;
    publishedAt: string;
    author?: {
      name: string;
      image?: any;
    };
    categories?: {
      _id: string;
      title: string;
    }[];
  }
  