import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollEffects() {
  const location = useLocation()

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    if (!targets.length) return undefined

    const observer = new IntersectionObserver(
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
    return () => observer.disconnect()
  }, [location.pathname])

  return null
}
