import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChefHat, Flame, Heart, Leaf, Sparkles, Wine } from 'lucide-react'
import { images, site } from './data'

const aboutImages = {
  plating: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=88',
  herbs: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1500&q=88',
  service: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1700&q=88',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1500&q=88',
  dining: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1700&q=88',
}

export default function EnhancedAboutPage() {
  useEffect(() => {
    document.title = `About | ${site.name}`
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', 'Discover the food, people, atmosphere and hospitality philosophy behind Aurelia Restaurant & Bar.')
  }, [])

  return (
    <>
      <section className="about-wow-hero" style={{ '--about-hero': `url(${images.interior})` }}>
        <div className="about-wow-shade" />
        <div className="about-wow-sketch about-wow-sketch-one" />
        <div className="about-wow-sketch about-wow-sketch-two" />
        <div className="shell about-wow-content" data-reveal>
          <p className="about-script">Our story</p>
          <h1>A restaurant built around the table.</h1>
          <p>Warm hospitality, expressive food, a lively bar and the kind of room that makes staying for one more course feel natural.</p>
          <div className="about-wow-actions">
            <Link to="/booking" className="button button-gold">Reserve a Table</Link>
            <Link to="/menu" className="button button-outline-light">Explore the Menu</Link>
          </div>
        </div>
      </section>

      <section className="about-story-section">
        <div className="shell about-story-grid">
          <div className="about-story-collage" data-reveal>
            <img src={images.chef} alt="Aurelia chef at work" className="about-story-main" />
            <img src={aboutImages.plating} alt="Fine dining plate being prepared" className="about-story-float top" />
            <img src={aboutImages.herbs} alt="Fresh herbs and ingredients" className="about-story-float bottom" />
            <div className="about-story-badge glass-light"><ChefHat size={18}/><span>Kitchen-led since day one</span></div>
          </div>
          <div className="about-story-copy" data-reveal>
            <p className="about-script">Honest, flavourful food</p>
            <h2>We believe the best restaurants feel effortless.</h2>
            <p>The room should have energy without feeling loud. The food should feel polished without losing warmth. Service should notice what you need before you have to ask.</p>
            <p>Aurelia brings those ideas together in one evening — from the first cocktail to the final spoonful of dessert.</p>
            <div className="about-pillar-list">
              <span><Leaf/> Seasonal ingredients</span>
              <span><Flame/> Confident technique</span>
              <span><Heart/> Human hospitality</span>
              <span><Wine/> Restaurant + bar flow</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mood-strip">
        <div className="about-mood-grid shell">
          <article className="about-mood-card large" data-reveal>
            <img src={aboutImages.service} alt="Aurelia dining service" />
            <div className="about-mood-overlay"><span>01</span><h3>Arrive curious.</h3><p>Begin with a drink and let the evening find its own pace.</p></div>
          </article>
          <article className="about-mood-card" data-reveal>
            <img src={images.food} alt="Aurelia seasonal dish" />
            <div className="about-mood-overlay"><span>02</span><h3>Eat generously.</h3><p>Share, taste, order another plate.</p></div>
          </article>
          <article className="about-mood-card" data-reveal>
            <img src={aboutImages.wine} alt="Wine being poured" />
            <div className="about-mood-overlay"><span>03</span><h3>Linger longer.</h3><p>The bar carries dinner into the night.</p></div>
          </article>
        </div>
      </section>

      <section className="about-values-section">
        <div className="shell">
          <div className="about-section-heading" data-reveal>
            <p className="about-script">The Aurelia way</p>
            <h2>Four things guide every service.</h2>
          </div>
          <div className="about-values-grid">
            <article data-reveal><div className="about-value-icon"><Leaf/></div><span>01</span><h3>Season first</h3><p>Ingredients shape the menu instead of being forced into it.</p></article>
            <article data-reveal><div className="about-value-icon"><Sparkles/></div><span>02</span><h3>Details matter</h3><p>Lighting, music, plating and pacing all belong to the same experience.</p></article>
            <article data-reveal><div className="about-value-icon"><Wine/></div><span>03</span><h3>Keep the night moving</h3><p>The dining room and bar should feel like one continuous evening.</p></article>
            <article data-reveal><div className="about-value-icon"><Heart/></div><span>04</span><h3>Hospitality stays human</h3><p>Professional without becoming formal, attentive without hovering.</p></article>
          </div>
        </div>
      </section>

      <section className="about-feature-image" style={{ '--about-feature': `url(${aboutImages.dining})` }}>
        <div className="about-feature-shade" />
        <div className="shell about-feature-copy glass-dark" data-reveal>
          <p className="about-script light">The atmosphere</p>
          <h2>Good food is only half the reason people stay.</h2>
          <p>Warm lighting, polished details, a soundtrack with energy and a bar that keeps the room alive after dinner.</p>
          <Link to="/gallery" className="text-link light-link">See the atmosphere <ArrowRight size={18}/></Link>
        </div>
      </section>

      <section className="about-chef-note">
        <div className="shell about-chef-note-grid">
          <div className="about-chef-portrait" data-reveal>
            <img src={images.chef} alt="Chef in the Aurelia kitchen" />
            <div className="about-chef-sketch" />
          </div>
          <div className="about-chef-copy" data-reveal>
            <p className="about-script">From the kitchen</p>
            <blockquote>“The plate should look beautiful, but the first thing you remember should always be the flavour.”</blockquote>
            <p className="about-chef-signoff">Chef’s philosophy · Aurelia</p>
            <Link to="/menu" className="button button-dark">Explore the Menu</Link>
          </div>
        </div>
      </section>

      <section className="about-final-cta" style={{ '--about-final': `url(${images.bar})` }}>
        <div className="about-final-shade" />
        <div className="shell about-final-inner" data-reveal>
          <div>
            <p className="about-script light">Meet us at the table</p>
            <h2>Come for dinner. Stay for the evening.</h2>
          </div>
          <Link to="/booking" className="button button-gold">Reserve Your Table</Link>
        </div>
      </section>
    </>
  )
}
