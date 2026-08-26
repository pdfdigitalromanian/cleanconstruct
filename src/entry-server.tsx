import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { SeoCollectorContext, type CollectedSeo } from './components/Seo'
import { services } from './data/services'
import { localPosts } from './lib/posts'

const coreRoutes = [
  '/',
  '/despre-noi/',
  '/servicii/',
  '/servicii-bucuresti/',
  '/servicii-ilfov/',
  '/contact/',
  '/blog/',
]

const locationRoutes = ['/servicii-bucuresti/', '/servicii-ilfov/']
const legalRoutes = ['/politica-de-cookies/']
const serviceRoutes = services.map((service) => `/${service.slug}/`)
const postRoutes = localPosts.map((post) => `/${post.slug}/`)

export const prerenderRoutes = [
  ...coreRoutes,
  ...legalRoutes,
  ...serviceRoutes,
  ...postRoutes,
]

export const prerenderRouteGroups = {
  main: coreRoutes.filter((route) => !locationRoutes.includes(route)),
  locations: locationRoutes,
  legal: legalRoutes,
  services: serviceRoutes,
  posts: postRoutes,
}

const currentContentDate = '2026-08-26'

export const prerenderRouteMetadata = Object.fromEntries([
  ...coreRoutes.map((route) => [route, {
    lastModified: currentContentDate,
    changeFrequency: route === '/' || route === '/blog/' ? 'weekly' : 'monthly',
    priority: route === '/' ? '1.0' : route === '/servicii/' ? '0.9' : '0.8',
  }]),
  ...serviceRoutes.map((route) => [route, {
    lastModified: currentContentDate,
    changeFrequency: 'monthly',
    priority: '0.9',
  }]),
  ...legalRoutes.map((route) => [route, {
    lastModified: currentContentDate,
    changeFrequency: 'yearly',
    priority: '0.3',
  }]),
  ...localPosts.map((post) => [`/${post.slug}/`, {
    lastModified: post.modifiedAt.slice(0, 10),
    changeFrequency: 'yearly',
    priority: '0.6',
  }]),
])

export function render(url: string) {
  let seo: CollectedSeo | undefined
  const appHtml = renderToString(
    <StrictMode>
      <SeoCollectorContext.Provider value={(value) => { seo = value }}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SeoCollectorContext.Provider>
    </StrictMode>,
  )

  if (!seo) throw new Error(`Missing SEO metadata for ${url}`)
  return { appHtml, seo }
}
