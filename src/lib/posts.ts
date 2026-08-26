import type { Post } from '../types'
import { supabase } from './supabase'

const modules = import.meta.glob('../../content/posts/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Post>

export const localPosts: Post[] = Object.values(modules).toSorted(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
)

const mapDatabasePost = (row: Record<string, unknown>): Post => ({
  wordpressId: Number(row.wordpress_id),
  slug: String(row.slug),
  title: String(row.title),
  excerpt: String(row.excerpt),
  contentHtml: String(row.content_html),
  publishedAt: String(row.published_at),
  modifiedAt: String(row.modified_at),
  author: String(row.author),
  categories: Array.isArray(row.categories) ? row.categories.map(String) : [],
  featuredImage: String(row.featured_image),
  featuredImageAlt: String(row.featured_image_alt),
  seoTitle: String(row.seo_title),
  seoDescription: String(row.seo_description),
})

export const fetchPosts = async (): Promise<Post[]> => {
  if (!supabase) return localPosts
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error || !data?.length) return localPosts
  return data.map(mapDatabasePost)
}

export const getLocalPost = (slug: string) => localPosts.find((post) => post.slug === slug)

export const fetchPost = async (slug: string): Promise<Post | undefined> => {
  const localPost = getLocalPost(slug)
  if (!supabase) return localPost

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error || !data) return localPost
  return mapDatabasePost(data)
}
