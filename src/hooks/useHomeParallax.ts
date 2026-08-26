import { useEffect } from 'react'

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum)

export function useHomeParallax() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 901px)')
    const hero = document.querySelector<HTMLElement>('.home-hero')
    const heroImage = document.querySelector<HTMLElement>('.hero-image')
    const heroCard = document.querySelector<HTMLElement>('.hero-card')
    const cards = Array.from(document.querySelectorAll<HTMLElement>('#servicii .service-card'))
    if (!hero || !heroImage || !heroCard || !cards.length) return

    let animationFrame = 0

    const reset = () => {
      heroImage.style.setProperty('--hero-parallax-y', '0px')
      heroCard.style.setProperty('--hero-card-parallax-y', '0px')
      cards.forEach((card) => card.style.setProperty('--card-parallax-y', '0px'))
    }

    const update = () => {
      animationFrame = 0
      if (reducedMotion.matches || !desktop.matches) {
        reset()
        return
      }

      const heroDistance = clamp(window.scrollY, 0, hero.offsetHeight)
      heroImage.style.setProperty('--hero-parallax-y', `${Math.min(heroDistance * 0.16, hero.offsetHeight * 0.1).toFixed(2)}px`)
      heroCard.style.setProperty('--hero-card-parallax-y', `${(heroDistance * 0.07).toFixed(2)}px`)

      const viewportMiddle = window.innerHeight / 2
      const depthPattern = [1, -0.62, 0.78, -0.72, 0.58, -0.9]
      cards.forEach((card, index) => {
        const bounds = card.getBoundingClientRect()
        if (bounds.bottom < -80 || bounds.top > window.innerHeight + 80) return
        const cardMiddle = bounds.top + bounds.height / 2
        const progress = (viewportMiddle - cardMiddle) / window.innerHeight
        const offset = clamp(progress * 54 * depthPattern[index % depthPattern.length], -26, 26)
        card.style.setProperty('--card-parallax-y', `${offset.toFixed(2)}px`)
      })
    }

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    reducedMotion.addEventListener('change', requestUpdate)
    desktop.addEventListener('change', requestUpdate)
    update()

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      reducedMotion.removeEventListener('change', requestUpdate)
      desktop.removeEventListener('change', requestUpdate)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      reset()
    }
  }, [])
}
