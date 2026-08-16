import { Link } from 'react-router-dom'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

const filmSource = 'https://videos.pexels.com/video-files/5705978/5705978-hd_1920_1080_25fps.mp4'
const filmPoster = 'https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?auto=format&fit=crop&w=2000&q=86'

const cocktails = [
  {
    name: 'Golden Hour',
    note: 'Bourbon · apricot · citrus',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=88',
  },
  {
    name: 'Velvet Night',
    note: 'Gin · blackberry · rosemary',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=88',
  },
  {
    name: 'Aurelia Spritz',
    note: 'Bitter orange · bubbles · herbs',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1200&q=88',
  },
]

const marqueeItems = ['DINING', 'COCKTAILS', 'PRIVATE EVENTS', 'CATERING', 'LATE-NIGHT BAR']

function MarqueeGroup() {
  return (
    <div className="cinematic-marquee-group">
      {marqueeItems.map((item) => (
        <span key={item}>{item}<i>•</i></span>
      ))}
    </div>
  )
}

export default function CinematicFilm() {
  return (
    <>
      <section className="cinematic-film" aria-labelledby="cinematic-film-title">
        <div className="cinematic-film-media" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="metadata" poster={filmPoster}>
            <source src={filmSource} type="video/mp4" />
          </video>
          <div className="cinematic-film-shade" />
          <div className="cinematic-glow cinematic-glow-one" />
          <div className="cinematic-glow cinematic-glow-two" />
        </div>

        <div className="shell cinematic-film-content">
          <div className="cinematic-film-kicker"><Play size={15} fill="currentColor" /> The Aurelia experience</div>
          <h2 id="cinematic-film-title">Dinner becomes the beginning of the evening.</h2>
          <p>A cinematic glimpse of warm light, composed details, private moments and a bar that carries the night forward.</p>
          <div className="cinematic-film-actions">
            <Link to="/booking" className="button button-cream">Reserve a Table</Link>
            <Link to="/gallery" className="cinematic-text-link">Explore the atmosphere <ArrowRight size={18} /></Link>
          </div>
        </div>

        <div className="cinematic-marquee" aria-hidden="true">
          <div className="cinematic-marquee-track">
            <MarqueeGroup />
            <MarqueeGroup />
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </div>
      </section>

      <section className="bar-showcase">
        <div className="bar-showcase-orb bar-showcase-orb-one" aria-hidden="true" />
        <div className="bar-showcase-orb bar-showcase-orb-two" aria-hidden="true" />
        <div className="shell bar-showcase-grid">
          <div className="bar-showcase-copy">
            <p className="eyebrow"><Sparkles size={16}/> After dark</p>
            <h2>The bar has its own rhythm.</h2>
            <p>Low light, polished glassware and drinks built with the same attention as the kitchen. Come for dinner, stay for one more round.</p>
            <div className="bar-showcase-actions">
              <Link to="/menu" className="button button-gold">Explore Cocktails</Link>
              <Link to="/visiting-hours" className="text-link large">See bar hours <ArrowRight size={18}/></Link>
            </div>
          </div>

          <div className="bar-cocktail-deck">
            {cocktails.map((drink, index) => (
              <article className={`bar-cocktail-card card-${index + 1}`} key={drink.name}>
                <img src={drink.image} alt={drink.name} loading="lazy" decoding="async" />
                <div className="bar-cocktail-shine" aria-hidden="true" />
                <div className="bar-cocktail-copy">
                  <span>0{index + 1}</span>
                  <h3>{drink.name}</h3>
                  <p>{drink.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
