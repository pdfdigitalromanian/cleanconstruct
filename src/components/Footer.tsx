import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cleaningServices, constructionServices } from '../data/services'
import { openCookieSettings } from './CookieConsent'

type SocialPlatform = 'facebook' | 'instagram' | 'tiktok'

const socialLinks: { label: string; platform: SocialPlatform; href: string }[] = [
  { label: 'Facebook', platform: 'facebook', href: import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61573669424226' },
  { label: 'Instagram', platform: 'instagram', href: import.meta.env.VITE_INSTAGRAM_URL || '#' },
  { label: 'TikTok', platform: 'tiktok', href: import.meta.env.VITE_TIKTOK_URL || '#' },
]

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === 'facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.5-.1-1.5-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.5V13h2.8v8h3.4Z" /></svg>
  }
  if (platform === 'instagram') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.2 2A3 3 0 0 0 4 7v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.3 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg>
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 2c.3 2.4 1.7 3.8 4.1 4v3.1a8.2 8.2 0 0 1-4-1v6.1a6.2 6.2 0 1 1-5.4-6.1v3.2a3.1 3.1 0 1 0 2.2 3V2h3.1Z" /></svg>
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
                <a
                  href={social.href}
                  target={social.href === '#' ? undefined : '_blank'}
                  rel={social.href === '#' ? undefined : 'noreferrer'}
                  aria-label={social.href === '#' ? `${social.label} — în curând` : `CleanConstruct pe ${social.label}`}
                  aria-disabled={social.href === '#' ? true : undefined}
                  title={social.href === '#' ? `${social.label} — în curând` : social.label}
                  onClick={social.href === '#' ? (event) => event.preventDefault() : undefined}
                  key={social.platform}
                >
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
