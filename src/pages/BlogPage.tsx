import { ArrowUpRight, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { fetchPosts, localPosts } from '../lib/posts'
import { siteUrl } from '../lib/seo'
import type { Post } from '../types'

const formatDate = (date: string) => new Intl.DateTimeFormat('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date))

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(localPosts)
  const [query, setQuery] = useState('')

  useEffect(() => {
    void fetchPosts().then(setPosts)
  }, [])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ro')
    if (!normalized) return posts
    return posts.filter((post) => `${post.title} ${post.excerpt} ${post.categories.join(' ')}`.toLocaleLowerCase('ro').includes(normalized))
  }, [posts, query])
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Ghiduri CleanConstruct',
    description: 'Ghiduri despre curățenie, construcții, renovări și finisaje.',
    url: `${siteUrl}/blog/`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: localPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `${siteUrl}/${post.slug}/`,
      })),
    },
  }

  return (
    <>
      <Seo title="Blog curățenie, construcții și renovări | CleanConstruct" description="Ghiduri în limba română despre curățenie după constructor, curățenie rezidențială, renovări, finisaje și construcții." schema={schema} />
      <PageHero eyebrow="Blog" title="Ghiduri pentru spații curate și proiecte bine planificate" description="Răspunsuri clare la întrebările care apar înainte, în timpul și după o lucrare." image="/assets/posts/blog-post-1-60-1200x780.png.webp" imageAlt="Exemplu de acoperiș și lucrare exterioară" />

      <section className="blog-index section-pad">
        <div className="shell">
          <div className="blog-tools">
            <p><strong>{filtered.length}</strong> articole publicate</p>
            <label className="search-field"><Search /><span className="sr-only">Caută articole</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Caută în ghiduri" /></label>
          </div>
          <div className="post-grid post-grid-all">
            {filtered.map((post) => (
              <article className="post-card" key={post.slug}>
                <Link className="post-image" to={`/${post.slug}/`}><img src={post.featuredImage} alt={post.featuredImageAlt} loading="lazy" /></Link>
                <div className="post-meta"><span>{post.categories[0]}</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div>
                <h2><Link to={`/${post.slug}/`}>{post.title}</Link></h2>
                <p>{post.excerpt}</p>
                <Link className="text-link" to={`/${post.slug}/`}>Citește articolul <ArrowUpRight /></Link>
              </article>
            ))}
          </div>
          {!filtered.length ? <p className="empty-state">Nu am găsit articole pentru „{query}”. Încearcă un termen mai scurt.</p> : null}
        </div>
      </section>
    </>
  )
}
