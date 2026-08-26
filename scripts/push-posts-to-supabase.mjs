import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before importing posts.')
}

const directory = resolve('content/posts')
const files = (await readdir(directory)).filter((file) => file.endsWith('.json'))
const posts = await Promise.all(files.map(async (file) => JSON.parse(await readFile(resolve(directory, file), 'utf8'))))
const rows = posts.map((post) => ({
  wordpress_id: post.wordpressId,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  content_html: post.contentHtml,
  published_at: post.publishedAt,
  modified_at: post.modifiedAt,
  author: post.author,
  categories: post.categories,
  featured_image: post.featuredImage,
  featured_image_alt: post.featuredImageAlt,
  seo_title: post.seoTitle,
  seo_description: post.seoDescription,
  status: 'published',
}))

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})
const { error } = await supabase.from('posts').upsert(rows, { onConflict: 'slug' })
if (error) throw error
console.log(`Imported ${rows.length} posts into Supabase.`)
