import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Pause, Play } from 'lucide-react'

// Background media is optional: local posters remain visible for failed media,
// reduced motion, data-saving connections, and browsers that block autoplay.
export default function DecorativeFilm({ src, poster, label }) {
  const container = useRef(null)
  const video = useRef(null)
  const [visible, setVisible] = useState(false)
  const [allowMotion, setAllowMotion] = useState(false)
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState(false)
  const [controlHost, setControlHost] = useState(null)

  useEffect(() => {
    setControlHost(container.current.closest('section'))
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setAllowMotion(!preference.matches && !navigator.connection?.saveData)
    update()
    preference.addEventListener('change', update)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' })
    observer.observe(container.current)
    return () => { preference.removeEventListener('change', update); observer.disconnect() }
  }, [])

  useEffect(() => {
    if (!video.current) return
    if (visible && allowMotion && !paused && !failed) {
      video.current.play().catch((error) => { if (error.name !== 'AbortError') setPaused(true) })
    } else video.current.pause()
  }, [visible, allowMotion, paused, failed])

  return (
    <>
      <div className="decorative-film" ref={container}>
      <img className="decorative-film-poster" src={poster} alt="" loading="lazy" decoding="async" aria-hidden="true" />
      {allowMotion && !failed && (
        <video ref={video} muted loop playsInline preload="none" poster={poster} aria-hidden="true" onError={() => setFailed(true)}>
          <source src={src.replace(/\.mp4$/, '.webm')} type="video/webm" />
          <source src={src} type="video/mp4" />
        </video>
      )}
      </div>
      {allowMotion && !failed && controlHost && createPortal(<button type="button" className="decorative-film-control" onClick={() => setPaused((value) => !value)} aria-label={`${paused ? 'Play' : 'Pause'} ${label} background video`}>
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>, controlHost)}
    </>
  )
}
