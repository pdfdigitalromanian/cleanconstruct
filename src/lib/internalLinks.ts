import { services } from '../data/services'
import type { Post, Service } from '../types'
import { localPosts } from './posts'

const serviceMap = new Map(services.map((service) => [service.slug, service]))

const servicesForTopic: Array<{ matches: string[]; slugs: string[] }> = [
  { matches: ['post-constructie', 'dupa-lucrari'], slugs: ['curatenie-dupa-constructor', 'curatenie-dupa-renovare', 'curatenie-generala'] },
  { matches: ['rezidentiala', 'organizarea-spatiului'], slugs: ['curatenie-rezidentiala', 'curatenie-generala', 'curatenie-dupa-renovare'] },
  { matches: ['finisaj'], slugs: ['vopsire-finisaje', 'renovari', 'remodelare'] },
  { matches: ['acoperis'], slugs: ['constructii-case', 'constructii-cladiri', 'renovari'] },
  { matches: ['renovarile-structurale'], slugs: ['renovari', 'constructii-cladiri', 'constructii-case'] },
]

export const getServicesForPost = (post: Post): Service[] => {
  const match = servicesForTopic.find((topic) => topic.matches.some((keyword) => post.slug.includes(keyword)))
  const fallback = post.categories.includes('Curățenie')
    ? ['curatenie-rezidentiala', 'curatenie-generala', 'curatenie-dupa-constructor']
    : ['renovari', 'vopsire-finisaje', 'constructii-cladiri']
  return (match?.slugs ?? fallback).flatMap((slug) => {
    const service = serviceMap.get(slug)
    return service ? [service] : []
  })
}

const guideScore = (service: Service, post: Post) => {
  const text = `${post.slug} ${post.categories.join(' ')}`.toLowerCase()
  let score = 0
  if (service.group === 'curatenie' && text.includes('curaten')) score += 4
  if (service.group === 'constructii' && (text.includes('construct') || text.includes('renov') || text.includes('finisaj') || text.includes('acoperis'))) score += 3
  if (service.slug.includes('dupa-') && (text.includes('post-constructie') || text.includes('dupa-lucrari'))) score += 6
  if (service.slug.includes('rezidentiala') && text.includes('rezidentiala')) score += 6
  if ((service.slug.includes('renov') || service.slug === 'remodelare') && text.includes('renov')) score += 6
  if (service.slug.includes('finisaje') && text.includes('finisaj')) score += 7
  if (service.slug.includes('constructii') && text.includes('acoperis')) score += 4
  return score
}

const guideCache = new Map<string, Post[]>()

export const getGuidesForService = (service: Service): Post[] => {
  const cached = guideCache.get(service.slug)
  if (cached) return cached

  const guides = localPosts
    .map((post) => ({ post, score: guideScore(service, post) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime())
    .slice(0, 3)
    .map(({ post }) => post)
  guideCache.set(service.slug, guides)
  return guides
}
