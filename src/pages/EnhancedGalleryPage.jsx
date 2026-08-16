import { useEffect, useMemo, useState } from 'react'
import { X, ArrowLeft, ArrowRight, Camera, Sparkles } from 'lucide-react'
import { images } from './data'
import { SEO, PageHero } from './pages'

const galleryItems = [
  { src: images.interior, type: 'Dining', title: 'The Dining Room', caption: 'Warm lighting, layered textures and an intimate evening atmosphere.' },
  { src: images.food, type: 'Food', title: 'Seasonal Plates', caption: 'Colorful, composed plates designed around fresh ingredients.' },
  { src: images.bar, type: 'Bar', title: 'The Bar After Dark', caption: 'A moody cocktail room for drinks before dinner or one more after.' },
  { src: images.pasta, type: 'Food', title: 'House Pasta', caption: 'Comfort-driven dishes elevated with refined presentation.' },
  { src: images.banquet, type: 'Events', title: 'Private Gatherings', caption: 'Flexible spaces for celebrations, receptions and special dinners.' },
  { src: images.cocktail, type: 'Bar', title: 'Signature Cocktails', caption: 'Expressive drinks with citrus, herbs, bitters and sparkling finishes.' },
  { src: images.steak, type: 'Food', title: 'From the Grill', caption: 'Confident mains with classic technique and bold flavour.' },
  { src: images.table, type: 'Dining', title: 'At the Table', caption: 'A polished setting made for long conversations and memorable evenings.' },
  { src: images.dessert, type: 'Food', title: 'Final Course', caption: 'Elegant desserts with rich textures and a lighter finish.' },
  { src: images.chef, type: 'Kitchen', title: 'Behind the Pass', caption: 'The people and craft behind every service.' },
  { src: images.seafood, type: 'Food', title: 'Sea & Citrus', caption: 'Bright seafood dishes balancing freshness, acidity and richness.' },
  { src: images.catering, type: 'Events', title: 'Beyond Aurelia', caption: 'Catering and off-site hospitality with the same attention to detail.' },
]

const filters = ['All', 'Dining', 'Food', 'Bar', 'Events', 'Kitchen']

export default function EnhancedGalleryPage() {
  const [filter, setFilter] = useState('All')
  const [activeIndex, setActiveIndex] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((item) => item.type === filter)),
    [filter],
  )

  useEffect(() => {
    if (activeIndex === null) return undefined
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % visible.length)
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index - 1 + visible.length) % visible.length)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, visible.length])

  const active = activeIndex === null ? null : visible[activeIndex]

  const goNext = () => setActiveIndex((index) => (index + 1) % visible.length)
  const goPrev = () => setActiveIndex((index) => (index - 1 + visible.length) % visible.length)

  return (
    <>
      <SEO title="Gallery" description="Explore Aurelia through dining room, food, cocktails, private events and behind-the-scenes imagery." />

      <PageHero
        compact
        eyebrow="Gallery"
        title="An evening, in frames."
        text="A visual tour through the dining room, kitchen, bar and gatherings that shape the Aurelia experience."
        image={images.bar}
      />

      <section className="gallery-intro section">
        <div className="shell gallery-intro-grid">
          <div>
            <p className="eyebrow">Inside Aurelia</p>
            <h2>Food, atmosphere and the moments in between.</h2>
          </div>
          <div className="gallery-intro-copy glass-panel-light">
            <Camera size={22} />
            <p>
              Browse by experience, then open any image for a closer look. The gallery is intentionally visual-first and designed to feel as polished on mobile as it does on desktop.
            </p>
          </div>
        </div>
      </section>

      <section className="gallery-experience section">
        <div className="shell">
          <div className="gallery-filter-shell liquid-glass-light" role="tablist" aria-label="Gallery categories">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? 'active' : ''}
                type="button"
                onClick={() => {
                  setFilter(item)
                  setActiveIndex(null)
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="enhanced-gallery-grid">
            {visible.map((item, index) => (
              <button
                type="button"
                className={`enhanced-gallery-card gallery-card-${index % 6}`}
                key={`${item.src}-${item.title}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Open ${item.title}`}
              >
                <img src={item.src} alt={item.title} loading="lazy" />
                <span className="enhanced-gallery-shade" />
                <span className="enhanced-gallery-meta liquid-glass-dark">
                  <small>{item.type}</small>
                  <strong>{item.title}</strong>
                  <span>{item.caption}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-feature section section-dark">
        <div className="shell gallery-feature-grid">
          <div className="gallery-feature-copy">
            <p className="eyebrow light">The Aurelia mood</p>
            <h2>Designed to feel different as the evening unfolds.</h2>
            <p>
              Golden-hour dinners, late cocktails, quiet tables and full-room celebrations all share the same visual language: warmth, contrast and a little drama.
            </p>
            <div className="gallery-feature-points">
              <span><Sparkles size={17} /> Warm, layered interiors</span>
              <span><Sparkles size={17} /> Editorial food photography</span>
              <span><Sparkles size={17} /> Private-event storytelling</span>
            </div>
          </div>
          <div className="gallery-feature-collage">
            <img src={images.interior} alt="Aurelia interior" loading="lazy" />
            <img src={images.cocktail} alt="Aurelia cocktail" loading="lazy" />
            <img src={images.food} alt="Aurelia dish" loading="lazy" />
          </div>
        </div>
      </section>

      {active && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={active.title}>
          <button className="gallery-lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close gallery image">
            <X size={24} />
          </button>
          <button className="gallery-lightbox-nav previous" type="button" onClick={goPrev} aria-label="Previous image">
            <ArrowLeft size={24} />
          </button>
          <figure className="gallery-lightbox-figure">
            <img src={active.src} alt={active.title} />
            <figcaption className="liquid-glass-dark">
              <small>{active.type}</small>
              <strong>{active.title}</strong>
              <span>{active.caption}</span>
            </figcaption>
          </figure>
          <button className="gallery-lightbox-nav next" type="button" onClick={goNext} aria-label="Next image">
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </>
  )
}
