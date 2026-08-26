import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'

const postsPath = process.argv[2] || '/tmp/cleanconstruct-posts.json'
const mediaPath = process.argv[3] || '/tmp/cleanconstruct-media.json'
const outputDirectory = resolve('content/posts')

const [posts, media] = await Promise.all([
  JSON.parse(await readFile(postsPath, 'utf8')),
  JSON.parse(await readFile(mediaPath, 'utf8')),
])

const mediaById = new Map(media.map((item) => [item.id, item]))
const stripHtml = (value = '') => value
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&#8211;/g, '–')
  .replace(/&#8217;/g, '’')
  .replace(/\s*\[(?:&hellip;|&#8230;|…)\]\s*/gi, '…')
  .replace(/&hellip;|&#8230;/gi, '…')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim()

const truncateAtWord = (value, limit) => {
  if (value.length <= limit) return value
  const shortened = value.slice(0, limit + 1).replace(/\s+\S*$/, '').trim()
  return `${shortened}…`
}

const categories = (title) => {
  const normalized = title.toLowerCase()
  if (normalized.includes('curăț')) return ['Curățenie']
  if (normalized.includes('finisaj')) return ['Finisaje']
  if (normalized.includes('acoperiș')) return ['Construcții']
  if (normalized.includes('renov')) return ['Renovări']
  return ['Sfaturi']
}

await mkdir(outputDirectory, { recursive: true })

for (const post of posts) {
  const featured = mediaById.get(post.featured_media)
  const imageName = featured?.source_url ? basename(new URL(featured.source_url).pathname) : ''
  const optimizedImageName = imageName
    ? `${imageName.replace(/-scaled\.png$/i, '').replace(/\.png$/i, '')}-1200x780.png.webp`
    : ''
  const title = stripHtml(post.title.rendered)
  const excerpt = truncateAtWord(stripHtml(post.excerpt.rendered) || stripHtml(post.content.rendered), 260)
  const exported = {
    wordpressId: post.id,
    slug: post.slug,
    title,
    excerpt,
    contentHtml: post.content.rendered,
    publishedAt: post.date,
    modifiedAt: post.modified,
    author: 'CleanConstruct',
    categories: categories(title),
    featuredImage: optimizedImageName ? `/assets/posts/${optimizedImageName}` : '/assets/site/hero-before-after.webp',
    featuredImageAlt: featured?.alt_text || title,
    seoTitle: `${title} | CleanConstruct`,
    seoDescription: truncateAtWord(excerpt, 158),
  }
  await writeFile(
    resolve(outputDirectory, `${post.slug}.json`),
    `${JSON.stringify(exported, null, 2)}\n`,
  )
}

console.log(`Exported ${posts.length} posts to ${outputDirectory}`)
