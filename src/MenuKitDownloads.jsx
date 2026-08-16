import { Download, FileText, Sparkles } from 'lucide-react'
import { images } from './data'

const resources = [
  {
    title: 'Dining & Bar Menu',
    text: 'Seasonal dining, signature cocktails and selected bar favourites.',
    image: images.food,
    href: '/menus/aurelia-dining-menu.pdf',
    meta: '3-page PDF',
  },
  {
    title: 'Private Events Menu',
    text: 'Sample seated dinner, canape and beverage packages for private events.',
    image: images.banquet,
    href: '/menus/aurelia-private-events-menu.pdf',
    meta: '2-page PDF',
  },
  {
    title: 'Catering Menu',
    text: 'Sample grazing, buffet, dessert and service options for off-site catering.',
    image: images.catering,
    href: '/menus/aurelia-catering-menu.pdf',
    meta: '2-page PDF',
  },
]

export default function MenuKitDownloads() {
  return (
    <>
      <section className="menukit-hero" style={{ '--menukit-bg': `url(${images.table})` }}>
        <div className="menukit-hero-shade" />
        <div className="shell menukit-hero-inner">
          <div className="menukit-hero-copy glass-dark">
            <p className="eyebrow light">Menu kit</p>
            <h1>Menus ready to share.</h1>
            <p>Download polished demo PDFs for dining, private events and catering. Every file can be replaced with William's final approved menus before launch.</p>
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
            <p>These are working demo PDFs, not placeholder buttons. Open them in a new tab or download them directly.</p>
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
            <div><strong>Demo-ready, client-ready structure.</strong><p>These PDFs use Aurelia demo content and pricing. Once the client supplies the real menus, the same downloadable experience can stay in place while the documents are replaced.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}
