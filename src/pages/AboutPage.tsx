import { ArrowUpRight, CheckCircle2, HardHat, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { businessSchema, siteUrl } from '../lib/seo'

const values = [
  { icon: ShieldCheck, title: 'Responsabilitate', text: 'Stabilim de la început ce facem, ce este inclus și cum verificăm rezultatul.' },
  { icon: HardHat, title: 'Lucru bine organizat', text: 'Ordinea etapelor, protecția spațiului și comunicarea contează la fel de mult ca execuția.' },
  { icon: Sparkles, title: 'Grijă pentru detalii', text: 'Tratăm materialele și suprafețele în funcție de starea și rolul lor.' },
]

export function AboutPage() {
  const schema = [businessSchema, {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Despre CleanConstruct',
    url: `${siteUrl}/despre-noi/`,
    about: { '@id': `${siteUrl}/#business` },
  }]

  return (
    <>
      <Seo title="Despre CleanConstruct | Curățenie și construcții București" description="Cunoaște compania STEFI CLEAN CONSTRUCT S.R.L., valorile, modul de lucru și serviciile de curățenie, construcții și renovare." schema={schema} />
      <PageHero eyebrow="Despre noi" title="Angajați pentru calitate. Motivați de un rezultat bun." description="Suntem o companie de curățenie și construcții dedicată serviciilor fiabile pentru locuințe și companii." image="/assets/site/team-cleaning.jpg" imageAlt="Membri ai unei echipe profesionale de curățenie" />

      <section className="section-pad">
        <div className="shell about-story">
          <div className="story-image"><img src="/assets/site/team-cleaning.jpg" alt="Echipă pregătită pentru o intervenție de curățenie" loading="lazy" /></div>
          <div>
            <SectionHeading eyebrow="Povestea CleanConstruct" title="Un partener pentru lucrare și pentru spațiul care rămâne în urmă" />
            <div className="rich-copy">
              <p className="lead">Ajutăm proprietarii și companiile să mențină spații curate și să ducă la capăt lucrări de construcție, renovare și finisare.</p>
              <p>Ne place un proces în care lucrurile sunt spuse clar: ce trebuie făcut, ce materiale și operațiuni sunt potrivite, care sunt etapele și cum arată rezultatul la predare.</p>
              <p>Experiența relevantă este cea a echipei care intră în proiect. Pentru fiecare solicitare stabilim oamenii și echipamentele potrivite, fără să afișăm contoare sau cifre care nu pot fi susținute.</p>
            </div>
            <Link className="text-link" to="/contact/">Discută cu echipa <ArrowUpRight /></Link>
          </div>
        </div>
      </section>

      <section className="values-section section-pad pale-section">
        <div className="shell">
          <SectionHeading eyebrow="Cum lucrăm" title="Principii simple, aplicate în fiecare proiect" align="center" />
          <div className="highlight-grid">{values.map(({ icon: Icon, title, text }) => <article key={title}><span className="feature-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="company-info section-pad">
        <div className="shell company-info-grid">
          <div>
            <SectionHeading eyebrow="Datele companiei" title="O identitate comercială clară" description="Informațiile oficiale sunt afișate transparent pentru clienți și parteneri." />
          </div>
          <dl>
            <div><dt>Denumire legală</dt><dd>STEFI CLEAN CONSTRUCT S.R.L.</dd></div>
            <div><dt>CUI</dt><dd>43678075</dd></div>
            <div><dt>Nr. Registrul Comerțului</dt><dd>J51/101/2021</dd></div>
            <div><dt>EUID</dt><dd>ROONRC.J51/101/2021</dd></div>
          </dl>
        </div>
      </section>

      <section className="proof-strip">
        <div className="shell"><CheckCircle2 /><p>Ai un proiect în București sau Ilfov? Verificăm disponibilitatea și îți spunem concret cum putem ajuta.</p><Link className="button button-light" to="/contact/#oferta">Solicită ofertă <ArrowUpRight /></Link></div>
      </section>
    </>
  )
}
