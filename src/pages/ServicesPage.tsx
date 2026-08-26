import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { ServiceCard } from '../components/ServiceCard'
import { cleaningServices, constructionServices, services } from '../data/services'
import { businessSchema, siteUrl } from '../lib/seo'

export function ServicesPage() {
  const schema = [businessSchema, {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Servicii de curățenie și construcții CleanConstruct',
    description: 'Servicii de curățenie, construcții, renovări și finisaje în București și Ilfov.',
    url: `${siteUrl}/servicii/`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.shortTitle,
        url: `${siteUrl}/${service.slug}/`,
      })),
    },
  }]

  return (
    <>
      <Seo title="Servicii de curățenie și construcții București | CleanConstruct" description="Curățenie rezidențială, birouri, spații comerciale, curățenie după constructor, construcții, renovări și finisaje în București și Ilfov." schema={schema} />
      <PageHero eyebrow="Servicii" title="Curățenie și construcții, de la prima etapă la predarea finală" description="Alege serviciul potrivit și vezi exact ce include, cum lucrăm și cum poți primi o ofertă." image="/assets/site/team-cleaning.jpg" imageAlt="Echipă de curățenie într-un spațiu modern" />

      <section className="section-pad">
        <div className="shell">
          <SectionHeading eyebrow="Servicii de curățenie" title="Spații curate, pregătite pentru oameni" description="Intervenții punctuale sau recurente pentru locuințe și companii." />
          <div className="service-grid service-grid-page">{cleaningServices.map((service, index) => <ServiceCard service={service} index={index} key={service.slug} />)}</div>
        </div>
      </section>

      <section className="section-pad pale-section">
        <div className="shell">
          <SectionHeading eyebrow="Construcții și renovări" title="Lucrări organizate și finisaje atent executate" description="Pentru proiecte noi, renovări complete sau îmbunătățiri punctuale." />
          <div className="service-grid service-grid-page">{constructionServices.map((service, index) => <ServiceCard service={service} index={index} key={service.slug} />)}</div>
        </div>
      </section>

      <section className="simple-cta">
        <div className="shell"><div><span className="eyebrow">Nu știi ce să alegi?</span><h2>Descrie-ne proiectul și îți recomandăm următorul pas.</h2></div><Link className="button button-light" to="/contact/#oferta"><ArrowUpRight /> Solicită o ofertă</Link></div>
      </section>
    </>
  )
}
