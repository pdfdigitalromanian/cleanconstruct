import { ArrowLeft, ArrowUpRight, CalendarDays, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { fetchPost, getLocalPost, localPosts } from '../lib/posts'
import { getServicesForPost } from '../lib/internalLinks'
import { siteUrl } from '../lib/seo'
import type { Post } from '../types'
import { NotFoundPage } from './NotFoundPage'

export function PostPage({ slug }: { slug?: string } = {}) {
  const params = useParams()
  const requestedSlug = slug ?? params.postSlug ?? ''
  const [post, setPost] = useState<Post | undefined>(() => getLocalPost(requestedSlug))
  const [loading, setLoading] = useState(() => !getLocalPost(requestedSlug))

  useEffect(() => {
    let cancelled = false
    const localPost = getLocalPost(requestedSlug)
    setPost(localPost)
    setLoading(!localPost)
    fetchPost(requestedSlug).then((result) => {
      if (!cancelled) {
        setPost(result)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [requestedSlug])

  if (loading) return <div className="page-loading" role="status">Se încarcă articolul…</div>
  if (!post) return <NotFoundPage />
  const related = localPosts.filter((item) => item.slug !== post.slug && item.categories.some((category) => post.categories.includes(category))).slice(0, 2)
  const relevantServices = getServicesForPost(post)
  const formattedDate = new Intl.DateTimeFormat('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(post.publishedAt))
  const schema = [{
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    image: `${siteUrl}${post.featuredImage}`,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    inLanguage: 'ro-RO',
    author: { '@type': 'Organization', name: post.author, url: siteUrl },
    publisher: { '@id': `${siteUrl}/#business` },
    mainEntityOfPage: `${siteUrl}/${post.slug}/`,
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/${post.slug}/` },
    ],
  }]

  return (
    <>
      <Seo title={post.seoTitle} description={post.seoDescription} image={post.featuredImage} type="article" schema={schema} />
      <article className="single-post">
        <header className="post-header">
          <div className="shell post-header-inner">
            <Link className="back-link" to="/blog/"><ArrowLeft /> Înapoi la blog</Link>
            <span className="eyebrow">{post.categories.join(' · ')}</span>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <div className="post-byline"><span><CalendarDays />{formattedDate}</span><span><UserRound />{post.author}</span></div>
          </div>
        </header>
        <div className="shell post-cover"><img src={post.featuredImage} alt={post.featuredImageAlt} /></div>
        <div className="shell article-layout">
          <aside><span>În acest articol</span><p>{post.categories.join(', ')}</p><Link className="text-link" to="/contact/#oferta">Cere o ofertă <ArrowUpRight /></Link></aside>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </article>
      <section className="context-links section-pad">
        <div className="shell">
          <span className="eyebrow">Servicii relevante</span>
          <h2>Ai nevoie de ajutor pentru proiectul tău?</h2>
          <div className="context-link-grid">
            {relevantServices.map((service) => (
              <Link to={`/${service.slug}/`} key={service.slug}>
                <span>{service.eyebrow}</span>
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
                <strong>Vezi serviciul <ArrowUpRight /></strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {related.length ? <section className="related-posts section-pad pale-section"><div className="shell"><h2>Articole conexe</h2><div className="post-grid">{related.map((item) => <article className="post-card" key={item.slug}><Link className="post-image" to={`/${item.slug}/`}><img src={item.featuredImage} alt={item.featuredImageAlt} loading="lazy" /></Link><h3><Link to={`/${item.slug}/`}>{item.title}</Link></h3></article>)}</div></div></section> : null}
    </>
  )
}
