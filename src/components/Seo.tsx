import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteUrl } from '../lib/seo'

export type SeoProps = {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  schema?: Record<string, unknown> | Record<string, unknown>[]
}

export type CollectedSeo = SeoProps & {
  canonicalUrl: string
  absoluteImage: string
}

export const SeoCollectorContext = createContext<((seo: CollectedSeo) => void) | null>(null)

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value))
}

const upsertLink = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector)
  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value))
}

export function Seo({
  title,
  description,
  image = '/assets/site/hero-before-after.webp',
  type = 'website',
  noIndex = false,
  schema,
}: SeoProps) {
  const { pathname } = useLocation()
  const collectSeo = useContext(SeoCollectorContext)
  const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname.replace(/\/$/, '') + '/'}`
  const absoluteImage = image.startsWith('http') ? image : `${siteUrl}${image}`
  const markdownSlug = pathname === '/' ? 'index' : pathname.replace(/^\/+|\/+$/g, '')
  const markdownUrl = `${siteUrl}/ai-content/${markdownSlug}.md`

  if (typeof document === 'undefined' && collectSeo) {
    collectSeo({ title, description, image, type, noIndex, schema, canonicalUrl, absoluteImage })
  }

  useEffect(() => {
    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large' })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteImage })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'ro_RO' })
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl })
    upsertLink('link[rel="describedby"]', { rel: 'describedby', href: `${siteUrl}/llms.txt`, type: 'text/plain' })
    upsertLink('link[rel="alternate"][type="text/markdown"]', { rel: 'alternate', href: markdownUrl, type: 'text/markdown', title: 'Versiune Markdown' })

    document.querySelectorAll('script[data-cleanconstruct-schema], script[data-prerender-schema]').forEach((element) => element.remove())
    const schemaElement = document.createElement('script')
    schemaElement.type = 'application/ld+json'
    schemaElement.dataset.cleanconstructSchema = 'true'
    schemaElement.text = JSON.stringify(schema ?? {})
    if (schema) document.head.appendChild(schemaElement)
    return () => schemaElement.remove()
  }, [absoluteImage, canonicalUrl, description, markdownUrl, noIndex, schema, title, type])

  return null
}
