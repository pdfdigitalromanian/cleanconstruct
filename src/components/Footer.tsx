import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cleaningServices, constructionServices } from '../data/services'
import { openCookieSettings } from './CookieConsent'

type SocialPlatform = 'facebook' | 'twitter' | 'youtube'

const socialLinks: { label: string; platform: SocialPlatform; href: string }[] = [
  { label: 'Facebook', platform: 'facebook', href: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com' },
  { label: 'Twitter', platform: 'twitter', href: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com' },
  { label: 'YouTube', platform: 'youtube', href: import.meta.env.VITE_YOUTUBE_URL || 'https://youtube.com' },
]

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === 'facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.5-.1-1.5-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.5V13h2.8v8h3.4Z" /></svg>
  }
  if (platform === 'twitter') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.7 3h3.1l-6.7 7.7L23 21h-6.2l-4.9-6.4L6.3 21H3.2l7.2-8.2L2.8 3h6.4l4.4 5.8L18.7 3Zm-1.1 16h1.7L8.2 4.9H6.4L17.6 19Z" /></svg>
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.3V8.7l5.8 3.3-5.8 3.3Z" /></svg>
}

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
          <nav className="footer-social" aria-label="Rețele sociale">
            <span>Urmărește-ne</span>
            <div>
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={`CleanConstruct pe ${social.label}`} title={social.label} key={social.platform}>
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </nav>
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
            <li><Mail size={17} /><a href="mailto:contact@cleanconstruct.ro">contact@cleanconstruct.ro</a></li>
            <li><MapPin size={17} /><span><Link to="/servicii-bucuresti/">București</Link> și <Link to="/servicii-ilfov/">Ilfov</Link>, România</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} STEFI CLEAN CONSTRUCT S.R.L.</span>
        <span>CUI: 43678075 · J51/101/2021 · EUID: ROONRC.J51/101/2021</span>
        <nav className="footer-legal-links" aria-label="Confidențialitate">
          <Link to="/politica-de-cookies/">Politica de cookie-uri</Link>
          <button type="button" onClick={openCookieSettings}>Setări cookie</button>
        </nav>
        <a href="https://digitalromanian.com" target="_blank" rel="noreferrer">Creat și dezvoltat de digitalromanian.com</a>
      </div>
    </footer>
  )
}
