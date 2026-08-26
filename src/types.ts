export type Post = {
  wordpressId: number
  slug: string
  title: string
  excerpt: string
  contentHtml: string
  publishedAt: string
  modifiedAt: string
  author: string
  categories: string[]
  featuredImage: string
  featuredImageAlt: string
  seoTitle: string
  seoDescription: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type Service = {
  slug: string
  group: 'curatenie' | 'constructii'
  title: string
  shortTitle: string
  eyebrow: string
  description: string
  longDescription: string
  image: string
  imageAlt: string
  includes: string[]
  idealFor: string[]
  process: string[]
  faqs: ServiceFaq[]
  seoTitle: string
  seoDescription: string
}
