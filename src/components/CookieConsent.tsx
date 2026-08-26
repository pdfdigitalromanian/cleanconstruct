import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type ConsentPreference = 'analytics' | 'necessary' | null

const googleAnalyticsId = 'G-FEWRDX9CWL'
const storageKey = 'cleanconstruct_privacy_preferences_v2'
const previousStorageKey = 'cleanconstruct_privacy_preferences_v1'
const openSettingsEvent = 'cleanconstruct:open-cookie-settings'

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...args: unknown[]) => void
  }
}

const readPreference = (): ConsentPreference => {
  try {
    const stored = window.localStorage.getItem(storageKey)
    if (!stored) return null
    const parsed = JSON.parse(stored) as { version?: number; analytics?: boolean }
    if (parsed.version !== 2) return null
    return parsed.analytics ? 'analytics' : 'necessary'
  } catch {
    return null
  }
}

const initializeGoogleAnalytics = () => {
  if (document.getElementById('google-analytics-tag')) return

  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args)
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('consent', 'update', { analytics_storage: 'granted' })
  window.gtag('js', new Date())
  window.gtag('config', googleAnalyticsId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    send_page_view: false,
  })

  const script = document.createElement('script')
  script.id = 'google-analytics-tag'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
  document.head.appendChild(script)
}

const deleteGoogleAnalyticsCookies = () => {
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim())
    .filter((name): name is string => Boolean(name) && /^_(ga|gid|gat|gac_)/.test(name))

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.cleanconstruct.ro; SameSite=Lax`
  })
}

export const openCookieSettings = () => {
  window.dispatchEvent(new Event(openSettingsEvent))
}

export function CookieConsent() {
  const { pathname, search } = useLocation()
  const [ready, setReady] = useState(false)
  const [preference, setPreference] = useState<ConsentPreference>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const storedPreference = readPreference()
    setPreference(storedPreference)
    setOpen(storedPreference === null)
    setReady(true)

    try {
      window.localStorage.removeItem(previousStorageKey)
    } catch {
      // The banner remains usable when browser storage is unavailable.
    }

    const showSettings = () => setOpen(true)
    window.addEventListener(openSettingsEvent, showSettings)
    return () => window.removeEventListener(openSettingsEvent, showSettings)
  }, [])

  useEffect(() => {
    if (preference !== 'analytics') return

    initializeGoogleAnalytics()
    window.gtag?.('event', 'page_view', {
      page_location: window.location.href,
      page_path: `${pathname}${search}`,
      page_title: document.title,
    })
  }, [pathname, preference, search])

  const savePreference = (nextPreference: Exclude<ConsentPreference, null>) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        version: 2,
        analytics: nextPreference === 'analytics',
        updatedAt: new Date().toISOString(),
      }))
    } catch {
      // Continue for this browsing session even if persistent storage is blocked.
    }

    if (preference === 'analytics' && nextPreference === 'necessary') {
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
      deleteGoogleAnalyticsCookies()
      window.location.reload()
      return
    }

    setPreference(nextPreference)
    setOpen(false)
  }

  const closeSettings = () => {
    if (preference === null) {
      savePreference('necessary')
      return
    }
    setOpen(false)
  }

  if (!ready) return null

  return (
    <>
      {open ? (
        <aside className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-description">
          <button className="cookie-close" type="button" onClick={closeSettings} aria-label="Închide setările cookie"><X /></button>
          <div>
            <span className="eyebrow">Preferințe de confidențialitate</span>
            <h2 id="cookie-title">Tu alegi dacă ne ajuți cu statisticile.</h2>
            <p id="cookie-description">Google Analytics se încarcă numai dacă accepți. Vercel Web Analytics rămâne activ pentru statistici agregate și nu folosește cookie-uri.</p>
            <Link to="/politica-de-cookies/">Vezi politica de cookie-uri</Link>
          </div>
          <div className="cookie-actions">
            <button className="button button-ghost" type="button" onClick={() => savePreference('necessary')}>Doar necesare</button>
            <button className="button" type="button" onClick={() => savePreference('analytics')}>Accept statistici</button>
          </div>
        </aside>
      ) : null}
    </>
  )
}
