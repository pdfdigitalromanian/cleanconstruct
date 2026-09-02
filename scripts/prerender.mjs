import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const projectRoot = resolve('.')
const distDirectory = resolve(projectRoot, 'dist')
const publicDirectory = resolve(projectRoot, 'public')
const serverEntry = resolve(projectRoot, '.prerender/entry-server.js')
const { prerenderRouteGroups, prerenderRouteMetadata, prerenderRoutes, render } = await import(`${pathToFileURL(serverEntry).href}?v=${Date.now()}`)
const template = await readFile(resolve(distDirectory, 'index.html'), 'utf8')
const siteUrl = 'https://cleanconstruct.ro'

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

const escapeXml = (value) => escapeHtml(value).replaceAll("'", '&apos;')

const decodeHtml = (value) => String(value)
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replaceAll('&nbsp;', ' ')
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#x27;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')

const absoluteUrl = (href) => {
  if (/^(https?:|mailto:|tel:)/.test(href)) return href
  if (href.startsWith('#')) return `${siteUrl}/${href}`
  return new URL(href, siteUrl).href
}

const htmlToMarkdown = (html) => {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html
  return decodeHtml(main)
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '\n\n[Formular de ofertă disponibil pe pagina web.]\n\n')
    .replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, (_, alt) => alt ? `\n\nImagine: ${alt}\n\n` : '')
    .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `[${label.replace(/<[^>]+>/g, '').trim()}](${absoluteUrl(href)})`)
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<h[4-6][^>]*>([\s\S]*?)<\/h[4-6]>/gi, '\n\n#### $1\n\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1')
    .replace(/<(p|div|section|article|header|footer|aside|nav|ol|ul|details)[^>]*>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/[^>]+>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const routeSlug = (route) => route === '/' ? 'index' : route.replace(/^\/+|\/+$/g, '')
const aiPath = (route) => `/ai-content/${routeSlug(route)}.md`
const markdownDocuments = []
const routeRecords = []

for (const route of prerenderRoutes) {
  const { appHtml, seo } = render(route)
  const markdownPath = aiPath(route)
  const robots = seo.noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'
  const jsonLd = seo.schema
    ? `<script type="application/ld+json" data-prerender-schema="true">${JSON.stringify(seo.schema).replaceAll('<', '\\u003c')}</script>`
    : ''
  const head = [
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:url" content="${seo.canonicalUrl}" />`,
    `<meta property="og:image" content="${seo.absoluteImage}" />`,
    '<meta property="og:locale" content="ro_RO" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="describedby" href="${siteUrl}/llms.txt" type="text/plain" />`,
    `<link rel="alternate" href="${siteUrl}${markdownPath}" type="text/markdown" title="Versiune Markdown" />`,
    jsonLd,
  ].filter(Boolean).join('\n    ')

  const page = template
    .replace('<html lang="ro">', '<html lang="ro-RO">')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${seo.canonicalUrl}" />`)
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outputDirectory = route === '/'
    ? distDirectory
    : resolve(distDirectory, route.replace(/^\/+|\/+$/g, ''))
  await mkdir(outputDirectory, { recursive: true })
  await writeFile(resolve(outputDirectory, 'index.html'), page)

  const markdown = `# ${seo.title}\n\n> ${seo.description}\n\n- Canonical: ${seo.canonicalUrl}\n- Limbă: ro-RO\n- Sursă: STEFI CLEAN CONSTRUCT S.R.L.\n\n${htmlToMarkdown(appHtml)}\n`
  const markdownOutput = resolve(distDirectory, markdownPath.slice(1))
  const publicMarkdownOutput = resolve(publicDirectory, markdownPath.slice(1))
  await mkdir(resolve(markdownOutput, '..'), { recursive: true })
  await mkdir(resolve(publicMarkdownOutput, '..'), { recursive: true })
  await writeFile(markdownOutput, markdown)
  await writeFile(publicMarkdownOutput, markdown)
  markdownDocuments.push(markdown)
  routeRecords.push({ route, markdownPath, seo })
}

const recordsFor = (routes) => routes.map((route) => routeRecords.find((record) => record.route === route)).filter(Boolean)
const mainRoutes = recordsFor(prerenderRouteGroups.main)
const locationRoutes = recordsFor(prerenderRouteGroups.locations)
const legalRoutes = recordsFor(prerenderRouteGroups.legal)
const serviceRoutes = recordsFor(prerenderRouteGroups.services)
const postRoutes = recordsFor(prerenderRouteGroups.posts)
const conciseDescription = (value) => value.length > 170
  ? `${value.slice(0, 171).replace(/\s+\S*$/, '').trim()}…`
  : value
const formatLinks = (records) => records.map(({ markdownPath, seo }) => `- [${seo.title}](${siteUrl}${markdownPath}): ${conciseDescription(seo.description)}`).join('\n')

const llms = `# CleanConstruct\n\n> STEFI CLEAN CONSTRUCT S.R.L. oferă servicii profesionale de curățenie, curățenie după constructor, renovări, finisaje și construcții în București și Ilfov.\n\nDatele publice de contact și informațiile comerciale de mai jos sunt destinate atât utilizatorilor, cât și sistemelor de căutare și asistenților AI. Pentru conținutul integral într-un singur fișier consultați [llms-full.txt](${siteUrl}/llms-full.txt).\n\n## Pagini principale\n\n${formatLinks(mainRoutes)}\n\n## Acoperire locală\n\n${formatLinks(locationRoutes)}\n\n## Servicii\n\n${formatLinks(serviceRoutes)}\n\n## Ghiduri\n\n${formatLinks(postRoutes)}\n\n## Informații legale\n\n${formatLinks(legalRoutes)}\n\n## Date comerciale\n\n- Denumire legală: STEFI CLEAN CONSTRUCT S.R.L.\n- CUI: 43678075\n- Nr. Registrul Comerțului: J51/101/2021\n- EUID: ROONRC.J51/101/2021\n- Telefon: +40 726 631 898\n- E-mail: contact@cleanconstruct.ro\n- Arie declarată: București și Ilfov, România\n`

await writeFile(resolve(distDirectory, 'llms.txt'), llms)
await writeFile(resolve(distDirectory, 'llms-full.txt'), `${llms}\n\n---\n\n${markdownDocuments.join('\n\n---\n\n')}`)
await writeFile(resolve(publicDirectory, 'llms.txt'), llms)
await writeFile(resolve(publicDirectory, 'llms-full.txt'), `${llms}\n\n---\n\n${markdownDocuments.join('\n\n---\n\n')}`)

const sitemapEntries = prerenderRoutes.map((route) => {
  const metadata = prerenderRouteMetadata[route]
  if (!metadata) throw new Error(`Missing sitemap metadata for ${route}`)
  return `  <url>\n    <loc>${escapeXml(new URL(route, siteUrl).href)}</loc>\n    <lastmod>${metadata.lastModified}</lastmod>\n    <changefreq>${metadata.changeFrequency}</changefreq>\n    <priority>${metadata.priority}</priority>\n  </url>`
}).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
await writeFile(resolve(distDirectory, 'sitemap.xml'), sitemap)
await writeFile(resolve(publicDirectory, 'sitemap.xml'), sitemap)

const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${siteUrl}/sitemap.xml\n`
await writeFile(resolve(distDirectory, 'robots.txt'), robots)
await writeFile(resolve(publicDirectory, 'robots.txt'), robots)

console.log(`Prerendered ${prerenderRoutes.length} routes, Markdown mirrors, llms files, sitemap and robots.txt.`)
