import { ArrowUpRight, Check, ChevronDown, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { ServiceCard } from '../components/ServiceCard'
import { services } from '../data/services'
import { businessSchema, siteUrl } from '../lib/seo'

type Area = 'București' | 'Ilfov'

const areaCopy: Record<Area, { slug: string; title: string; description: string; detail: string }> = {
  București: {
    slug: 'servicii-bucuresti',
    title: 'Servicii de curățenie și construcții în București',
    description: 'Curățenie profesională, renovări, finisaje și lucrări de construcție pentru locuințe și companii din București.',
    detail: 'Lucrăm cu apartamente, case, birouri și spații comerciale din București. Înainte de confirmare stabilim sectorul, accesul, parcarea, suprafața și intervalul potrivit proiectului.',
  },
  Ilfov: {
    slug: 'servicii-ilfov',
    title: 'Servicii de curățenie și construcții în Ilfov',
    description: 'Echipă pentru curățenie, renovări, finisaje și proiecte de construcție în localitățile eligibile din județul Ilfov.',
    detail: 'Pentru proiectele din Ilfov confirmăm disponibilitatea după localitate, amploarea lucrării și acces. Oferta include condițiile de deplasare atunci când acestea se aplică.',
  },
}

const faqs = (area: Area) => [
  { question: `În ce zone din ${area} vă deplasați?`, answer: area === 'București' ? 'Evaluăm solicitări din toate sectoarele. Disponibilitatea se confirmă în funcție de serviciu, adresă și interval.' : 'Acoperirea depinde de localitate și tipul proiectului. Trimite-ne adresa pentru o confirmare exactă.' },
  { question: 'Evaluarea și oferta sunt gratuite?', answer: 'Discuția inițială și oferta sunt fără obligații. Dacă proiectul impune o evaluare specială la locație, condițiile sunt comunicate înainte.' },
  { question: 'Puteți combina lucrările cu o curățenie finală?', answer: 'Da. Putem include renovarea sau finisajele și curățenia post-construcție în aceeași propunere, cu etapele clar delimitate.' },
]

export function LocationPage({ area }: { area: Area }) {
  const copy = areaCopy[area]
  const pageUrl = `${siteUrl}/${copy.slug}/`
  const questions = faqs(area)
  const schema = [businessSchema, {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: copy.title,
    description: copy.description,
    url: pageUrl,
    about: { '@id': `${siteUrl}/#business` },
  }, {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: copy.title, item: pageUrl },
    ],
  }]

  return (
    <>
      <Seo title={`${copy.title} | CleanConstruct`} description={copy.description} schema={schema} />
      <PageHero eyebrow={`CleanConstruct · ${area}`} title={copy.title} description={copy.description} image="/assets/site/team-cleaning.jpg" imageAlt={`Echipă CleanConstruct disponibilă pentru proiecte în ${area}`} />

      <section className="section-pad">
        <div className="shell narrow-grid">
          <SectionHeading eyebrow="Acoperire locală" title={`Un singur partener pentru proiectul tău din ${area}`} />
          <div className="rich-copy">
            <p className="lead">{copy.detail}</p>
            <ul className="check-list location-checks"><li><Check /> Discuție clară înainte de programare</li><li><Check /> Ofertă adaptată spațiului</li><li><Check /> Curățenie finală disponibilă după lucrări</li></ul>
          </div>
        </div>
      </section>

      <section className="section-pad pale-section">
        <div className="shell">
          <SectionHeading eyebrow={`Servicii în ${area}`} title="Curățenie, renovări și construcții" description="Alege serviciul pentru a vedea ce include și cum se desfășoară." />
          <div className="service-grid service-grid-page">{services.slice(0, 6).map((service, index) => <ServiceCard service={service} index={index} key={service.slug} />)}</div>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="shell faq-layout">
          <div><MapPin className="location-icon" aria-hidden="true" /><SectionHeading eyebrow="Întrebări locale" title={`Înainte de o programare în ${area}`} /></div>
          <div className="faq-list">{questions.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<ChevronDown /></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="simple-cta">
        <div className="shell"><div><span className="eyebrow">Verifică disponibilitatea</span><h2>Spune-ne localitatea și ce vrei să realizăm.</h2></div><Link className="button button-light" to={`/contact/?zona=${encodeURIComponent(area)}#oferta`}><ArrowUpRight /> Solicită o ofertă</Link></div>
      </section>
    </>
  )
}
