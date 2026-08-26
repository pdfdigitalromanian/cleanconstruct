import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cleaningServices, constructionServices } from '../data/services'

export function Footer() {
  const phone = import.meta.env.VITE_BUSINESS_PHONE || '+40 726 631 898'
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div className="footer-intro">
          <Link className="brand brand-light" to="/">
            <span className="brand-mark" aria-hidden="true"><img src="/assets/brand/logo-mark.png" alt="" /></span>
            <span className="brand-copy"><strong>STEFI CLEAN</strong><small>CONSTRUCT SRL</small></span>
          </Link>
          <p>Curățenie și construcții făcute cu grijă, pentru spații în care poți locui și lucra liniștit.</p>
          <Link className="text-link light-link" to="/contact/">Solicită o ofertă <ArrowUpRight size={17} /></Link>
        </div>
        <div>
          <h2>Curățenie</h2>
          <ul>{cleaningServices.slice(0, 5).map((service) => <li key={service.slug}><Link to={`/${service.slug}/`}>{service.shortTitle}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Construcții</h2>
          <ul>{constructionServices.slice(0, 5).map((service) => <li key={service.slug}><Link to={`/${service.slug}/`}>{service.shortTitle}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Contact</h2>
          <ul className="contact-list">
            <li><Phone size={17} /><a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a></li>
            <li><Mail size={17} /><a href="mailto:support@steficlean.com">support@steficlean.com</a></li>
            <li><MapPin size={17} /><span><Link to="/servicii-bucuresti/">București</Link> și <Link to="/servicii-ilfov/">Ilfov</Link>, România</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} STEFI CLEAN CONSTRUCT S.R.L.</span>
        <span>CUI: 43678075 · J51/101/2021 · EUID: ROONRC.J51/101/2021</span>
        <a href="https://digitalromanian.com" target="_blank" rel="noreferrer">Creat și dezvoltat de digitalromanian.com</a>
      </div>
    </footer>
  )
}
