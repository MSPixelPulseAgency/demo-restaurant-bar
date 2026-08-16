import { Link } from 'react-router-dom'
import { ArrowRight, BadgePercent, CalendarDays, Clock3, Crown, Martini, Sparkles, Wine } from 'lucide-react'
import { images } from './data'

const offers = [
  { icon: Crown, eyebrow: 'Opening celebration', title: 'The Aurelia First Pour', text: 'Complimentary welcome pour with dinner during opening week.', note: 'Demo offer · replace before launch' },
  { icon: BadgePercent, eyebrow: 'Wednesday evenings', title: 'Half-Price Cellar Night', text: 'Selected bottles at half price with a full dinner reservation.', note: 'Demo promotion' },
  { icon: Martini, eyebrow: 'Late night', title: 'Golden Hour at the Bar', text: 'Signature cocktails and bar bites from 9 PM until close.', note: 'Demo promotion' },
]

const barMoments = [
  [images.cocktailClose, 'Signature cocktails'],
  [images.barNight, 'The bar after dark'],
  [images.winePour, 'Cellar pours'],
  [images.bar, 'Late-night atmosphere'],
]

export default function HomeRoyalExtras() {
  return (
    <>
      <section className="royal-offers-section">
        <div className="royal-offer-glow royal-offer-glow-one" />
        <div className="royal-offer-glow royal-offer-glow-two" />
        <div className="shell">
          <div className="royal-section-heading">
            <p className="eyebrow">Opening season</p>
            <h2>A few reasons to arrive early.</h2>
            <p>Promotional concepts for the demo — designed to show how opening offers, happy hours and seasonal campaigns can live on the final site.</p>
          </div>
          <div className="royal-offer-grid">
            {offers.map(({ icon: Icon, eyebrow, title, text, note }) => (
              <article className="royal-offer-card interactive-card" tabIndex="0" key={title}>
                <div className="royal-offer-icon"><Icon size={22}/></div>
                <p>{eyebrow}</p>
                <h3>{title}</h3>
                <span>{text}</span>
                <small>{note}</small>
              </article>
            ))}
          </div>
          <div className="royal-offer-actions">
            <Link to="/booking" className="button button-gold"><CalendarDays size={17}/> Reserve for opening week</Link>
            <Link to="/visiting-hours" className="text-link large">See hours <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>

      <section className="royal-bar-section royal-bar-clean">
        <div className="royal-bar-video" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="metadata" poster={images.bar}>
            <source src="https://videos.pexels.com/video-files/5495781/5495781-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="royal-bar-video-shade" />
        </div>

        <div className="shell royal-bar-clean-grid">
          <div className="royal-bar-copy royal-bar-copy-clean">
            <div className="royal-bar-chip"><Sparkles size={14}/> After dinner, stay awhile</div>
            <p className="eyebrow light">Aurelia Bar</p>
            <h2>Dark glass, warm light, unforgettable pours.</h2>
            <p>The bar is designed as the second act of the evening — cocktails, cellar pours, bar bites and a room that becomes richer after dark.</p>
            <div className="royal-bar-meta"><span><Clock3 size={16}/> Late-night service</span><span><Wine size={16}/> Curated cellar</span><span><Martini size={16}/> Signature cocktails</span></div>
            <Link to="/menu" className="button button-gold">Explore Cocktails</Link>
          </div>

          <figure className="royal-bar-feature-media">
            <img src={images.barNight} alt="Aurelia bar at night" loading="lazy" decoding="async" />
            <figcaption className="royal-bar-feature-caption">
              <span>After dark</span>
              <strong>The room changes with the night.</strong>
            </figcaption>
          </figure>
        </div>

        <div className="shell royal-bar-photo-strip" aria-label="Aurelia bar moments">
          {barMoments.map(([image, label]) => (
            <figure className="royal-bar-photo interactive-card" key={label}>
              <img src={image} alt={label} loading="lazy" decoding="async" />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}
