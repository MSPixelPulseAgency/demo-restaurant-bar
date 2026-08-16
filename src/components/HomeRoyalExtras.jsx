import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgePercent, CalendarDays, Clock3, Crown, Martini, Sparkles, Wine } from 'lucide-react'
import { images } from './data'

const offers = [
  { icon: Crown, eyebrow: 'Opening celebration', title: 'The Aurelia First Pour', text: 'Complimentary welcome pour with dinner during opening week.', note: 'Demo offer · replace before launch' },
  { icon: BadgePercent, eyebrow: 'Wednesday evenings', title: 'Half-Price Cellar Night', text: 'Selected bottles at half price with a full dinner reservation.', note: 'Demo promotion' },
  { icon: Martini, eyebrow: 'Late night', title: 'Golden Hour at the Bar', text: 'Signature cocktails and bar bites from 9 PM until close.', note: 'Demo promotion' },
]

const barMoments = [
  { image: images.barNight, eyebrow: 'After dark', title: 'The room changes with the night.', text: 'Low light, warm timber and a bar designed for lingering.' },
  { image: images.cocktailClose, eyebrow: 'Signature cocktails', title: 'Built with the same care as the kitchen.', text: 'Classics, seasonal signatures and expressive late-night pours.' },
  { image: images.winePour, eyebrow: 'The cellar', title: 'A bottle for the table. A glass for the moment.', text: 'A rotating selection of sparkling, white and red wines.' },
  { image: images.bar, eyebrow: 'Late-night atmosphere', title: 'Dinner can become one more round.', text: 'A relaxed second act with bar bites, music and polished hospitality.' },
]

export default function HomeRoyalExtras() {
  const [activeMoment, setActiveMoment] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveMoment((current) => (current + 1) % barMoments.length)
    }, 4800)
    return () => window.clearInterval(timer)
  }, [])

  const moment = barMoments[activeMoment]

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

      <section className="royal-bar-section royal-bar-single">
        <div className="royal-bar-video" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="metadata" poster={images.bar}>
            <source src="https://videos.pexels.com/video-files/5495781/5495781-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="royal-bar-video-shade" />
        </div>

        <div className="shell royal-bar-single-inner">
          <div className="royal-bar-copy royal-bar-single-copy">
            <div className="royal-bar-chip"><Sparkles size={14}/> After dinner, stay awhile</div>
            <p className="eyebrow light">Aurelia Bar</p>
            <h2>Dark glass, warm light, unforgettable pours.</h2>
            <p>The bar is designed as the second act of the evening — cocktails, cellar pours, bar bites and a room that becomes richer after dark.</p>
            <div className="royal-bar-meta">
              <span><Clock3 size={16}/> Late-night service</span>
              <span><Wine size={16}/> Curated cellar</span>
              <span><Martini size={16}/> Signature cocktails</span>
            </div>
            <Link to="/menu" className="button button-gold">Explore Cocktails</Link>
          </div>

          <div className="royal-bar-carousel" aria-label="Aurelia bar highlights">
            <figure className="royal-bar-slide" key={activeMoment}>
              <img src={moment.image} alt={moment.eyebrow} loading="eager" decoding="async" />
              <div className="royal-bar-slide-shade" />
              <figcaption className="royal-bar-slide-caption">
                <span>{moment.eyebrow}</span>
                <strong>{moment.title}</strong>
                <p>{moment.text}</p>
              </figcaption>
            </figure>

            <div className="royal-bar-carousel-nav" aria-label="Choose bar image">
              {barMoments.map((item, index) => (
                <button
                  type="button"
                  key={item.eyebrow}
                  className={index === activeMoment ? 'active' : ''}
                  onClick={() => setActiveMoment(index)}
                  aria-label={`Show ${item.eyebrow}`}
                  aria-current={index === activeMoment ? 'true' : undefined}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>{item.eyebrow}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
