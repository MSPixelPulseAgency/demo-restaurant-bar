import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

const filmSource = 'https://videos.pexels.com/video-files/5705978/5705978-hd_1920_1080_25fps.mp4'
const filmPoster = 'https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?auto=format&fit=crop&w=2000&q=86'

export default function CinematicFilm() {
  return (
    <section className="cinematic-film" aria-labelledby="cinematic-film-title">
      <div className="cinematic-film-media" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={filmPoster}
        >
          <source src={filmSource} type="video/mp4" />
        </video>
        <div className="cinematic-film-shade" />
      </div>

      <div className="shell cinematic-film-content">
        <div className="cinematic-film-kicker"><Play size={15} fill="currentColor" /> The Aurelia experience</div>
        <h2 id="cinematic-film-title">Dinner becomes the beginning of the evening.</h2>
        <p>
          A cinematic glimpse of the atmosphere we are designing around Aurelia — warm light,
          composed details, private moments and a bar that carries the night forward.
        </p>
        <div className="cinematic-film-actions">
          <Link to="/booking" className="button button-cream">Reserve a Table</Link>
          <Link to="/gallery" className="cinematic-text-link">Explore the atmosphere <ArrowRight size={18} /></Link>
        </div>
      </div>

      <div className="cinematic-marquee" aria-hidden="true">
        <div>
          <span>DINING</span><i>•</i><span>COCKTAILS</span><i>•</i><span>PRIVATE EVENTS</span><i>•</i><span>CATERING</span><i>•</i>
          <span>DINING</span><i>•</i><span>COCKTAILS</span><i>•</i><span>PRIVATE EVENTS</span><i>•</i><span>CATERING</span><i>•</i>
        </div>
      </div>
    </section>
  )
}
