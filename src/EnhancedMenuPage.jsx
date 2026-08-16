import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Utensils, Wine } from 'lucide-react'
import { images, menu, site } from './data'

const categoryImages = {
  Starters: [images.food, images.seafood, images.interior],
  Mains: [images.pasta, images.food, images.seafood],
  'Steak & Seafood': [images.steak, images.seafood, images.food],
  Desserts: [images.dessert, images.dessert, images.dessert],
  Cocktails: [images.cocktail, images.bar, images.cocktail],
}

const categoryCopy = {
  Starters: 'Bright, shareable beginnings designed to wake up the table.',
  Mains: 'Comforting, expressive plates built around seasonality and depth.',
  'Steak & Seafood': 'Fire, char, clean seafood and generous evening plates.',
  Desserts: 'A polished final note — rich, light, and made for lingering.',
  Cocktails: 'Classic technique, modern signatures and late-night energy.',
}

export default function EnhancedMenuPage() {
  const [active, setActive] = useState('Starters')
  const categories = Object.keys(menu)
  const activeItems = useMemo(() => menu[active] || [], [active])

  useEffect(() => {
    document.title = `Menu | ${site.name}`
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', 'Explore Aurelia’s premium restaurant and bar menu with starters, mains, steak, seafood, desserts and cocktails.')
  }, [])

  return (
    <>
      <section className="menu-visual-hero" style={{ '--menu-hero': `url(${active === 'Cocktails' ? images.bar : images.food})` }}>
        <div className="menu-visual-overlay" />
        <div className="shell menu-visual-content">
          <p className="eyebrow light">Eat · drink · linger</p>
          <h1>The menu.</h1>
          <p>Season-led cooking, crafted cocktails, and a dining room built for evenings that unfold slowly.</p>
          <div className="menu-hero-badges">
            <span><Sparkles size={15}/> Seasonal</span>
            <span><Utensils size={15}/> Kitchen-led</span>
            <span><Wine size={15}/> Bar programme</span>
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
                  <img src={categoryImages[active]?.[index] || images.food} alt={name} loading="lazy" />
                  <span className="menu-price-pill">{price}</span>
                </div>
                <div className="menu-photo-copy">
                  <div>
                    <p className="menu-item-number">0{index + 1}</p>
                    <h3>{name}</h3>
                  </div>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chef-feature" style={{ '--chef-bg': `url(${active === 'Cocktails' ? images.cocktail : images.pasta})` }}>
        <div className="chef-feature-shade" />
        <div className="shell chef-feature-content glass-panel">
          <p className="eyebrow light">Chef’s selection</p>
          <h2>{active === 'Cocktails' ? 'Raise a glass to the evening.' : 'A table should feel abundant.'}</h2>
          <p>{active === 'Cocktails' ? 'Signature pours, classics with polish, and a bar made for one more round.' : 'Seasonal ingredients, confident technique and plates designed for sharing, tasting and returning to.'}</p>
          <div className="chef-feature-actions">
            <Link to="/booking" className="button button-gold">Reserve a Table</Link>
            <Link to="/contact" className="text-link light-link">Ask about dietary needs <ArrowRight size={17}/></Link>
          </div>
        </div>
      </section>
    </>
  )
}
