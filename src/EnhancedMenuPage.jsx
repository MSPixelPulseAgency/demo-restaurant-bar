import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Utensils, Wine } from 'lucide-react'
import { images, menu, site } from './data'

const categoryImages = {
  Starters: [images.food, images.seafood, images.plated, images.table, images.catering, images.interior],
  Mains: [images.pasta, images.food, images.seafood, images.plated, images.chef, images.table],
  'Steak & Seafood': [images.steak, images.seafood, images.plated, images.food, images.table, images.chef],
  Sides: [images.food, images.plated, images.table, images.pasta, images.catering],
  Desserts: [images.dessert, images.table, images.champagne, images.plated],
  Cocktails: [images.cocktail, images.cocktailClose, images.bar, images.barNight, images.lounge, images.champagne],
  Wine: [images.winePour, images.champagne, images.barNight, images.lounge, images.table],
}

const categoryCopy = {
  Starters: 'Bright, shareable beginnings designed to wake up the table.',
  Mains: 'Comforting, expressive plates built around seasonality and depth.',
  'Steak & Seafood': 'Fire, char, clean seafood and generous evening plates.',
  Sides: 'Small plates and accompaniments made for sharing across the table.',
  Desserts: 'A polished final note — rich, light, and made for lingering.',
  Cocktails: 'Classic technique, modern signatures and late-night energy.',
  Wine: 'A curated cellar spanning bubbles, bright whites, elegant reds and easy pours.',
}

export default function EnhancedMenuPage() {
  const [active, setActive] = useState('Starters')
  const categories = Object.keys(menu)
  const activeItems = useMemo(() => menu[active] || [], [active])

  useEffect(() => {
    document.title = `Menu | ${site.name}`
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', 'Explore Aurelia’s extensive restaurant and bar menu with starters, mains, steak, seafood, sides, desserts, cocktails and wine.')
  }, [])

  const imageForItem = (category, index) => {
    const pool = categoryImages[category] || [images.food]
    return pool[index % pool.length]
  }

  return (
    <>
      <section className="menu-visual-hero" style={{ '--menu-hero': `url(${active === 'Cocktails' || active === 'Wine' ? images.bar : images.food})` }}>
        <div className="menu-visual-overlay" />
        <div className="shell menu-visual-content">
          <p className="eyebrow light">Eat · drink · linger</p>
          <h1>The menu.</h1>
          <p>Season-led cooking, crafted cocktails, thoughtful wines and a dining room built for evenings that unfold slowly.</p>
          <div className="menu-hero-badges">
            <span><Sparkles size={15}/> Seasonal</span>
            <span><Utensils size={15}/> Kitchen-led</span>
            <span><Wine size={15}/> Full bar & cellar</span>
          </div>
        </div>
      </section>

      <section className="menu-modern-section">
        <div className="shell">
          <div className="menu-category-glass" role="tablist" aria-label="Menu categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={active === category ? 'active' : ''}
                onClick={() => setActive(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="menu-category-intro">
            <div>
              <p className="eyebrow">Currently serving</p>
              <h2>{active}</h2>
            </div>
            <p>{categoryCopy[active]}</p>
          </div>

          <div className="menu-photo-grid">
            {activeItems.map(([name, description, price], index) => (
              <article className="menu-photo-card" key={name}>
                <div className="menu-photo-media">
                  <img src={imageForItem(active, index)} alt={name} loading="lazy" decoding="async" />
                  <span className="menu-price-pill">{price}</span>
                </div>
                <div className="menu-photo-copy">
                  <div>
                    <p className="menu-item-number">{String(index + 1).padStart(2, '0')}</p>
                    <h3>{name}</h3>
                  </div>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="menu-category-footer glass-panel-light">
            <div>
              <p className="eyebrow">Good to know</p>
              <h3>Seasonal availability may change.</h3>
              <p>This is demo menu content for the concept site. Final dishes, pricing, dietary labels and wine vintages can be replaced with the client’s real menu before launch.</p>
            </div>
            <Link to="/booking" className="button button-gold">Reserve a Table</Link>
          </div>
        </div>
      </section>

      <section className="chef-feature" style={{ '--chef-bg': `url(${active === 'Cocktails' || active === 'Wine' ? images.cocktail : images.pasta})` }}>
        <div className="chef-feature-shade" />
        <div className="shell chef-feature-content glass-panel">
          <p className="eyebrow light">Chef’s selection</p>
          <h2>{active === 'Cocktails' || active === 'Wine' ? 'Raise a glass to the evening.' : 'A table should feel abundant.'}</h2>
          <p>{active === 'Cocktails' || active === 'Wine' ? 'Signature pours, classics with polish, cellar favourites and a bar made for one more round.' : 'Seasonal ingredients, confident technique and plates designed for sharing, tasting and returning to.'}</p>
          <div className="chef-feature-actions">
            <Link to="/booking" className="button button-gold">Reserve a Table</Link>
            <Link to="/contact" className="text-link light-link">Ask about dietary needs <ArrowRight size={17}/></Link>
          </div>
        </div>
      </section>
    </>
  )
}
