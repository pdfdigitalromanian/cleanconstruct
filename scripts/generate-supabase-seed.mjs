import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const sourceDirectory = resolve('content/posts')
const outputPath = resolve('supabase/sql/03_seed_posts.sql')
const files = (await readdir(sourceDirectory)).filter((file) => file.endsWith('.json')).sort()
const posts = await Promise.all(files.map(async (file) => JSON.parse(await readFile(resolve(sourceDirectory, file), 'utf8'))))
const literal = (value) => value === null || value === undefined ? 'null' : `'${String(value).replaceAll("'", "''")}'`
const arrayLiteral = (values) => `array[${values.map(literal).join(', ')}]::text[]`

const rows = posts.map((post) => `(
  ${Number(post.wordpressId)},
  ${literal(post.slug)},
  ${literal(post.title)},
  ${literal(post.excerpt)},
  ${literal(post.contentHtml)},
  ${literal(post.publishedAt)}::timestamptz,
  ${literal(post.modifiedAt)}::timestamptz,
  ${literal(post.author)},
  ${arrayLiteral(post.categories)},
  ${literal(post.featuredImage)},
  ${literal(post.featuredImageAlt)},
  ${literal(post.seoTitle)},
  ${literal(post.seoDescription)},
  'published'
)`)

const sql = `-- CleanConstruct post seed\n-- Paste this file third, after 01_schema.sql. Safe to run again.\n\ninsert into public.posts (\n  wordpress_id, slug, title, excerpt, content_html, published_at, modified_at, author,\n  categories, featured_image, featured_image_alt, seo_title, seo_description, status\n) values\n${rows.join(',\n')}\non conflict (slug) do update set\n  wordpress_id = excluded.wordpress_id,\n  title = excluded.title,\n  excerpt = excluded.excerpt,\n  content_html = excluded.content_html,\n  published_at = excluded.published_at,\n  modified_at = excluded.modified_at,\n  author = excluded.author,\n  categories = excluded.categories,\n  featured_image = excluded.featured_image,\n  featured_image_alt = excluded.featured_image_alt,\n  seo_title = excluded.seo_title,\n  seo_description = excluded.seo_description,\n  status = excluded.status;\n`

await mkdir(resolve('supabase/sql'), { recursive: true })
await writeFile(outputPath, sql)
console.log(`Generated ${outputPath} with ${posts.length} posts.`)
