import { MessageCircle, Phone } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { Header } from './Header'

export function Layout() {
  const { pathname } = useLocation()
  const phone = import.meta.env.VITE_BUSINESS_PHONE || '+40 726 631 898'
  const whatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER || phone).replace(/\D/g, '')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">Sari la conținut</a>
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <FloatingWhatsApp number={whatsapp} />
      <nav className="mobile-contact-bar" aria-label="Contact rapid">
        <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}><Phone />Sună</a>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a>
        <Link to="/contact/#oferta"><MessageCircle />Ofertă</Link>
      </nav>
    </>
  )
}
