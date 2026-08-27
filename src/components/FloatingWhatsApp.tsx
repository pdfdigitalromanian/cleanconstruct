import { MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const inactivityDelayMs = 8_000
const promptSeenKey = 'cleanconstruct_whatsapp_prompt_seen_v1'

export function FloatingWhatsApp({ number }: { number: string }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasShownRef = useRef(false)

  useEffect(() => {
    try {
      hasShownRef.current = window.sessionStorage.getItem(promptSeenKey) === 'true'
    } catch {
      hasShownRef.current = false
    }

    if (hasShownRef.current) return

    const showMessage = () => {
      hasShownRef.current = true
      setShowPrompt(true)
      try {
        window.sessionStorage.setItem(promptSeenKey, 'true')
      } catch {
        // The prompt still works when session storage is unavailable.
      }
    }

    const restartTimer = () => {
      if (hasShownRef.current) return
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(showMessage, inactivityDelayMs)
    }

    let lastPointerReset = 0
    const handlePointerMove = () => {
      const now = Date.now()
      if (now - lastPointerReset < 500) return
      lastPointerReset = now
      restartTimer()
    }

    const passiveOptions: AddEventListenerOptions = { passive: true }
    restartTimer()
    window.addEventListener('pointermove', handlePointerMove, passiveOptions)
    window.addEventListener('pointerdown', restartTimer, passiveOptions)
    window.addEventListener('touchstart', restartTimer, passiveOptions)
    window.addEventListener('scroll', restartTimer, passiveOptions)
    window.addEventListener('keydown', restartTimer)

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      window.removeEventListener('pointermove', handlePointerMove, passiveOptions)
      window.removeEventListener('pointerdown', restartTimer, passiveOptions)
      window.removeEventListener('touchstart', restartTimer, passiveOptions)
      window.removeEventListener('scroll', restartTimer, passiveOptions)
      window.removeEventListener('keydown', restartTimer)
    }
  }, [])

  const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent('Bună! Doresc mai multe informații despre serviciile CleanConstruct.')}`

  return (
    <div className="floating-whatsapp">
      {showPrompt ? (
        <div className="whatsapp-prompt" role="status" aria-live="polite">
          <span>Cu ce te putem ajuta?</span>
          <button type="button" onClick={() => setShowPrompt(false)} aria-label="Închide mesajul WhatsApp"><X /></button>
        </div>
      ) : null}
      <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Scrie-ne pe WhatsApp">
        <MessageCircle aria-hidden="true" />
      </a>
    </div>
  )
}
