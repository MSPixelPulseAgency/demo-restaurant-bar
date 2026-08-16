import { Download, FileText, Sparkles } from 'lucide-react'
import { images } from './data'

const resources = [
  {
    title: 'Dining & Bar Menu',
    text: 'A four-page illustrated menu with seasonal dining, signature cocktails, cellar selections and restaurant details.',
    image: images.food,
    href: '/menus/aurelia-dining-menu.pdf',
    meta: '4-page illustrated PDF',
  },
  {
    title: 'Private Events Menu',
    text: 'An image-rich private-events guide with sample formats, cocktail reception ideas and planning notes.',
    image: images.banquet,
    href: '/menus/aurelia-private-events-menu.pdf',
    meta: '3-page illustrated PDF',
  },
  {
    title: 'Catering Menu',
    text: 'A styled catering guide with service formats, sample packages, selections and hospitality notes.',
    image: images.catering,
    href: '/menus/aurelia-catering-menu.pdf',
    meta: '3-page illustrated PDF',
  },
]

export default function MenuKitDownloads() {
  return (
    <>
      <section className="premium-hero premium-hero-compact menukit-premium-hero" style={{ '--premium-hero-image': `url(${images.table})` }}>
        <div className="premium-hero-overlay" />
        <div className="premium-hero-glow" />
        <div className="shell premium-hero-inner">
          <div className="premium-hero-copy glass-dark">
            <p className="eyebrow light">Menu kit</p>
            <h1>Menus ready to share.</h1>
            <p className="premium-hero-text">Download polished, illustrated Aurelia PDFs for dining, private events and catering. Each document is styled to match the website and can later be replaced with the restaurant&apos;s final approved content.</p>
          </div>
        </div>
      </section>

      <section className="menukit-section">
        <div className="shell">
          <div className="menukit-heading">
            <div>
              <p className="eyebrow">Aurelia resources</p>
              <h2>Choose a menu.</h2>
            </div>
            <p>Real downloadable menu PDFs with restaurant photography, editorial typography, warm Aurelia colors and subtle culinary illustrations.</p>
          </div>

          <div className="menukit-grid">
            {resources.map((item, index) => (
              <article className="menukit-card" key={item.title}>
                <div className="menukit-media">
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="menukit-card-copy">
                  <div className="menukit-card-meta"><FileText size={16}/>{item.meta}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="menukit-actions">
                    <a className="button button-gold" href={item.href} download><Download size={17}/> Download PDF</a>
                    <a className="menukit-open" href={item.href} target="_blank" rel="noreferrer">Open menu</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="menukit-note glass-panel-light">
            <Sparkles size={20}/>
            <div><strong>Designed to stay consistent with the website.</strong><p>The PDFs are regenerated as part of local development and production builds, keeping the downloadable Menu Kit available on Vercel while the real client menu can be swapped in later.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}
