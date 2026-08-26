import { ArrowUpRight, Check, ChevronDown } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { getService, services } from '../data/services'
import { getGuidesForService } from '../lib/internalLinks'
import { businessSchema, siteUrl } from '../lib/seo'
import { NotFoundPage } from './NotFoundPage'

export function ServiceDetailPage({ slug }: { slug?: string } = {}) {
  const { serviceSlug = '' } = useParams()
  const service = getService(slug ?? serviceSlug)
  if (!service) return <NotFoundPage />

  const related = services.filter((item) => item.group === service.group && item.slug !== service.slug).slice(0, 3)
  const guides = getGuidesForService(service)
  const schema = [businessSchema, {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    url: `${siteUrl}/${service.slug}/`,
    provider: { '@id': `${siteUrl}/#business` },
    areaServed: ['București', 'Ilfov'],
    serviceType: service.shortTitle,
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Servicii', item: `${siteUrl}/servicii/` },
      { '@type': 'ListItem', position: 3, name: service.shortTitle, item: `${siteUrl}/${service.slug}/` },
    ],
  }, {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  }]

  return (
    <>
      <Seo title={service.seoTitle} description={service.seoDescription} image={service.image} schema={schema} />
      <PageHero eyebrow={service.eyebrow} title={service.title} description={service.description} image={service.image} imageAlt={service.imageAlt} />

      <section className="service-detail-intro section-pad">
        <div className="shell narrow-grid">
          <SectionHeading eyebrow="Despre serviciu" title="O intervenție construită în jurul spațiului tău" />
          <div className="rich-copy"><p className="lead">{service.longDescription}</p><p>Înainte de confirmare stabilim clar operațiunile, condițiile de acces, intervalul și responsabilitățile fiecărei părți.</p></div>
        </div>
      </section>

      <section className="included-section section-pad pale-section">
        <div className="shell included-layout">
          <div>
            <SectionHeading eyebrow="Ce include" title={`Serviciul de ${service.shortTitle.toLowerCase()}`} />
            <ul className="large-check-list">{service.includes.map((item) => <li key={item}><Check />{item}</li>)}</ul>
          </div>
          <div className="ideal-card">
            <span className="eyebrow">Potrivit pentru</span>
            <ul>{service.idealFor.map((item) => <li key={item}>{item}<ArrowUpRight /></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading eyebrow="Procesul nostru" title="Simplu, clar, verificabil" align="center" />
          <ol className="steps-grid">{service.process.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="shell faq-layout">
          <SectionHeading eyebrow="Întrebări frecvente" title="Ce e bine să știi înainte" description="Dacă proiectul tău are condiții speciale, scrie-ne și le discutăm în evaluare." />
          <div className="faq-list">{service.faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<ChevronDown /></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      {guides.length ? <section className="service-guides section-pad pale-section">
        <div className="shell">
          <SectionHeading eyebrow="Ghiduri utile" title={`Pregătește mai bine proiectul de ${service.shortTitle.toLowerCase()}`} description="Informații practice din biblioteca CleanConstruct, selectate pentru acest serviciu." />
          <div className="context-link-grid">
            {guides.map((post) => <Link to={`/${post.slug}/`} key={post.slug}><span>{post.categories.join(' · ')}</span><h3>{post.title}</h3><p>{post.seoDescription}</p><strong>Citește ghidul <ArrowUpRight /></strong></Link>)}
          </div>
        </div>
      </section> : null}

      <section className="simple-cta">
        <div className="shell"><div><span className="eyebrow">Ofertă personalizată</span><h2>Spune-ne ce ai nevoie pentru {service.shortTitle.toLowerCase()}.</h2></div><Link className="button button-light" to={`/contact/?serviciu=${service.slug}#oferta`}><ArrowUpRight /> Solicită o ofertă</Link></div>
      </section>

      <section className="related-services section-pad">
        <div className="shell"><SectionHeading eyebrow="Servicii conexe" title="Poate te interesează și" /><div className="related-grid">{related.map((item) => <Link to={`/${item.slug}/`} key={item.slug}><img src={item.image} alt="" loading="lazy" /><span>{item.shortTitle}<ArrowUpRight /></span></Link>)}</div></div>
      </section>
    </>
  )
}
