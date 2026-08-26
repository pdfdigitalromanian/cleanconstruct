import { ArrowDown, ArrowRight, ArrowUpRight, Check, ShieldCheck, Sparkles, TimerReset } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QuoteForm } from '../components/QuoteForm'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { ServiceCard } from '../components/ServiceCard'
import { services } from '../data/services'
import { useHomeParallax } from '../hooks/useHomeParallax'
import { businessSchema } from '../lib/seo'
import { localPosts } from '../lib/posts'

const highlights = [
  { icon: ShieldCheck, title: 'Echipă instruită', text: 'Oameni pregătiți și un proces clar pentru fiecare tip de lucrare.' },
  { icon: Sparkles, title: 'Echipamente moderne', text: 'Metode și unelte alese în funcție de spațiu și suprafețe.' },
  { icon: TimerReset, title: 'Ofertă fără obligații', text: 'Discutăm proiectul și îți trimitem o estimare înainte de începere.' },
]

const featuredServiceDefinitions = [
  { slug: 'curatenie-rezidentiala', shortTitle: 'Curățenie rezidențială' },
  { slug: 'curatenie-birouri', shortTitle: 'Curățenie birouri și spații comerciale' },
  { slug: 'curatenie-dupa-constructor', shortTitle: 'Curățenie post-construcție' },
  { slug: 'constructii-cladiri', shortTitle: 'Construcții de clădiri' },
  { slug: 'renovari', shortTitle: 'Renovare și remodelare' },
  { slug: 'vopsire-finisaje', shortTitle: 'Vopsire și finisare' },
]

const featuredServices = featuredServiceDefinitions.flatMap(({ slug, shortTitle }) => {
  const service = services.find((item) => item.slug === slug)
  return service ? [{ ...service, shortTitle }] : []
})

const schema = [businessSchema, {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://cleanconstruct.ro/#website',
  url: 'https://cleanconstruct.ro/',
  name: 'CleanConstruct',
  inLanguage: 'ro-RO',
  publisher: { '@id': 'https://cleanconstruct.ro/#business' },
}]

export function HomePage() {
  useHomeParallax()

  return (
    <>
      <Seo title="Firmă de curățenie și construcții București | CleanConstruct" description="CleanConstruct oferă servicii profesionale de curățenie, curățenie după constructor, renovare și construcții pentru locuințe, birouri și spații comerciale din București și Ilfov." schema={schema} />

      <section className="home-hero">
        <div className="hero-image" role="img" aria-label="Interior înainte și după lucrări de renovare și curățenie" />
        <div className="shell hero-overlay">
          <div className="hero-card">
            <span className="eyebrow">Curățenie · Construcții · Renovări</span>
            <h1>Servicii de curățenie și construcții pe care te poți baza</h1>
            <p>De la locuințe curate la lucrări bine făcute — livrăm siguranță, calitate și lipsă de griji.</p>
            <div className="hero-actions">
              <Link className="button" to="/contact/#oferta"><ArrowUpRight /> Scrie-ne</Link>
              <a className="text-link" href="#servicii">Vezi serviciile <ArrowDown /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="about-preview section-pad">
        <div className="shell about-preview-grid">
          <div className="about-copy">
            <SectionHeading eyebrow="Despre noi" title={<>Companie de curățenie și construcții în care poți avea <em>încredere</em></>} description="Cu o echipă bine pregătită și echipamente moderne, ajutăm familiile și firmele să păstreze spațiile curate și să construiască structuri rezistente, care țin în timp." />
            <Link className="text-link" to="/despre-noi/">Mai multe despre companie <ArrowUpRight /></Link>
          </div>
          <div className="about-photo tall"><img src="/assets/site/about-cleaner.jpg" alt="Specialist CleanConstruct în timpul unei intervenții de curățenie" loading="lazy" /></div>
          <div className="about-photo offset"><img src="/assets/site/about-builder.jpg" alt="Specialist CleanConstruct în timpul unei lucrări" loading="lazy" /></div>
          <div className="trust-note">
            <strong>Un singur partener</strong>
            <span>de la lucrare până la curățenia finală</span>
          </div>
        </div>
      </section>

      <section className="service-showcase" id="servicii">
        <div className="service-parallax">
          <div className="shell service-parallax-inner">
            <div className="section-title-row">
              <SectionHeading eyebrow="Serviciile noastre" title={<>Modelăm visul de <em>mâine</em></>} description="Soluții pentru spații rezidențiale, birouri, spații comerciale și proiecte de construcție." />
              <Link className="button button-light" to="/servicii/">Toate serviciile <ArrowRight /></Link>
            </div>
          </div>
        </div>
        <div className="service-showcase-cards">
          <div className="shell">
            <div className="service-grid">
              {featuredServices.map((service, index) => <ServiceCard service={service} index={index} key={service.slug} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="why-us section-pad">
        <div className="shell">
          <SectionHeading eyebrow="De ce CleanConstruct" title="Un proces simplu. Un rezultat atent verificat." align="center" />
          <div className="highlight-grid">
            {highlights.map(({ icon: Icon, title, text }) => (
              <article key={title}><span className="feature-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="shell process-layout">
          <div>
            <SectionHeading eyebrow="Cum funcționează" title="De la primul mesaj la spațiul gata de folosit" description="Știi ce urmează și ce este inclus înainte să începem." />
            <Link className="text-link light-link" to="/contact/">Povestește-ne despre proiect <ArrowUpRight /></Link>
          </div>
          <ol className="process-list">
            <li><span>01</span><div><h3>Ne contactezi</h3><p>Spune-ne ce spațiu ai, ce serviciu dorești și în ce localitate.</p></div></li>
            <li><span>02</span><div><h3>Primești oferta</h3><p>Clarificăm suprafața, operațiunile și intervalul, apoi primești estimarea.</p></div></li>
            <li><span>03</span><div><h3>Ne apucăm de treabă</h3><p>Echipa execută lucrările și verifică rezultatul înainte de predare.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="quote-section section-pad" id="oferta">
        <div className="shell quote-layout">
          <div className="quote-copy">
            <span className="eyebrow">Ofertă gratuită</span>
            <h2>Gata pentru un spațiu curat sau un proiect bine făcut?</h2>
            <p>Completează câteva detalii. Fotografiile ne ajută să înțelegem mai repede amploarea lucrării.</p>
            <ul className="check-list"><li><Check /> Răspuns rapid</li><li><Check /> Fără obligații</li><li><Check /> Ofertă adaptată proiectului</li></ul>
          </div>
          <QuoteForm compact />
        </div>
      </section>

      <section className="blog-preview section-pad">
        <div className="shell">
          <div className="section-title-row">
            <SectionHeading eyebrow="Ghiduri CleanConstruct" title="Informații utile înainte să începi" />
            <Link className="text-link" to="/blog/">Toate articolele <ArrowUpRight /></Link>
          </div>
          <div className="post-grid">
            {localPosts.slice(0, 3).map((post) => (
              <article className="post-card" key={post.slug}>
                <Link className="post-image" to={`/${post.slug}/`}><img src={post.featuredImage} alt={post.featuredImageAlt} loading="lazy" /></Link>
                <div className="post-meta"><span>{post.categories[0]}</span><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(post.publishedAt))}</time></div>
                <h3><Link to={`/${post.slug}/`}>{post.title}</Link></h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
