import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { enhanceDrinkPhotos } from './drink-photo-map'

export default function ScrollEffects() {
  const location = useLocation()

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    let observer

    if (targets.length) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
      )

      targets.forEach((target) => observer.observe(target))
    }

    enhanceDrinkPhotos(document)

    const photoObserver = new MutationObserver((mutations) => {
      const shouldRefresh = mutations.some((mutation) => mutation.addedNodes.length > 0)
      if (shouldRefresh) enhanceDrinkPhotos(document)
    })

    photoObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer?.disconnect()
      photoObserver.disconnect()
    }
  }, [location.pathname])

  return null
}
