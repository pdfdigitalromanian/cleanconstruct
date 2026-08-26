import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { constructionServices, cleaningServices } from '../data/services'

const mainLinks = [
  { to: '/', label: 'Acasă' },
  { to: '/despre-noi/', label: 'Despre noi' },
  { to: '/servicii/', label: 'Servicii' },
  { to: '/blog/', label: 'Blog' },
  { to: '/contact/', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const phone = import.meta.env.VITE_BUSINESS_PHONE || '+40 726 631 898'

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link className="brand" to="/" aria-label="CleanConstruct - Acasă" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/assets/brand/logo-mark.png" alt="" />
          </span>
          <span className="brand-copy"><strong>STEFI CLEAN</strong><small>CONSTRUCT SRL</small></span>
        </Link>

        <button className="menu-toggle" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? 'Închide meniul' : 'Deschide meniul'}>
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`site-nav ${open ? 'is-open' : ''}`} id="site-navigation" aria-label="Navigație principală">
          {mainLinks.map((link) => link.label === 'Servicii' ? (
            <div className="nav-dropdown" key={link.to}>
              <NavLink to={link.to} onClick={closeMenu}>Servicii <ChevronDown size={15} aria-hidden="true" /></NavLink>
              <div className="mega-menu">
                <div>
                  <span className="mega-title">Curățenie</span>
                  {cleaningServices.slice(0, 5).map((service) => <Link to={`/${service.slug}/`} onClick={closeMenu} key={service.slug}>{service.shortTitle}</Link>)}
                </div>
                <div>
                  <span className="mega-title">Construcții</span>
                  {constructionServices.slice(0, 5).map((service) => <Link to={`/${service.slug}/`} onClick={closeMenu} key={service.slug}>{service.shortTitle}</Link>)}
                </div>
              </div>
            </div>
          ) : (
            <NavLink key={link.to} to={link.to} onClick={closeMenu}>{link.label}</NavLink>
          ))}
        </nav>

        <a className="header-phone" href={`tel:${phone.replace(/[^+\d]/g, '')}`} aria-label={`Sună CleanConstruct la ${phone}`}>
          <Phone size={17} aria-hidden="true" />
          <span>{phone}</span>
        </a>
      </div>
    </header>
  )
}
