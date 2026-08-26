import { Analytics } from '@vercel/analytics/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CookieConsent } from './components/CookieConsent'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { ContactPage } from './pages/ContactPage'
import { ContentPage } from './pages/ContentPage'
import { CookiePolicyPage } from './pages/CookiePolicyPage'
import { HomePage } from './pages/HomePage'
import { LocationPage } from './pages/LocationPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ServicesPage } from './pages/ServicesPage'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home-2" element={<Navigate to="/" replace />} />
          <Route path="despre-noi" element={<AboutPage />} />
          <Route path="about" element={<Navigate to="/despre-noi/" replace />} />
          <Route path="servicii" element={<ServicesPage />} />
          <Route path="service" element={<Navigate to="/servicii/" replace />} />
          <Route path="servicii-curatenie" element={<ServicesPage />} />
          <Route path="constructii" element={<ServicesPage />} />
          <Route path="servicii-bucuresti" element={<LocationPage area="București" />} />
          <Route path="servicii-ilfov" element={<LocationPage area="Ilfov" />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="politica-de-cookies" element={<CookiePolicyPage />} />
          <Route path=":slug" element={<ContentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <CookieConsent />
      <Analytics />
    </>
  )
}
