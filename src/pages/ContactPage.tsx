import { Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { QuoteForm } from '../components/QuoteForm'
import { Seo } from '../components/Seo'
import { businessSchema, siteUrl } from '../lib/seo'

export function ContactPage() {
  const [params] = useSearchParams()
  const defaultService = params.get('serviciu') ?? ''
  const defaultLocality = params.get('zona') ?? ''
  const phone = import.meta.env.VITE_BUSINESS_PHONE || '+40 726 631 898'
  const schema = [businessSchema, {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact CleanConstruct',
    url: `${siteUrl}/contact/`,
    about: { '@id': `${siteUrl}/#business` },
  }]

  return (
    <>
      <Seo title="Contact și ofertă gratuită | CleanConstruct București" description="Contactează CleanConstruct pentru curățenie, construcții, renovări și finisaje în București și Ilfov. Solicită o ofertă fără obligații." schema={schema} />
      <PageHero eyebrow="Contact" title="Spune-ne de ce are nevoie spațiul tău" description="Completează formularul sau contactează-ne direct. Îți cerem doar informațiile necesare pentru o estimare relevantă." />

      <section className="contact-section section-pad" id="oferta">
        <div className="shell contact-layout">
          <div className="contact-sidebar">
            <span className="eyebrow">Suntem aici să ajutăm</span>
            <h2>Ai întrebări înainte de ofertă?</h2>
            <p>Trimite-ne câteva detalii despre serviciu, localitate, suprafață și interval. Fotografiile sunt binevenite.</p>
            <ul>
              <li><span><Phone /></span><div><small>Telefon</small><a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a></div></li>
              <li><span><Mail /></span><div><small>E-mail</small><a href="mailto:support@steficlean.com">support@steficlean.com</a></div></li>
              <li><span><MapPin /></span><div><small>Zonă de servicii</small><strong>București și Ilfov</strong></div></li>
              <li><span><Clock3 /></span><div><small>Program contact</small><strong>Luni – Vineri, 08:00 – 21:00</strong></div></li>
            </ul>
          </div>
          <div className="contact-form-card"><h2>Solicită o ofertă gratuită</h2><QuoteForm defaultService={defaultService} defaultLocality={defaultLocality} /></div>
        </div>
      </section>
    </>
  )
}
