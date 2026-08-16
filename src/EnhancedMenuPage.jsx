import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Utensils, Wine } from 'lucide-react'
import { images, menu, site } from './data'
import { menuImageForItem } from './menu-image-map'

const drinkAdditions = {
  Cocktails: [
    ['French 75', 'Gin, lemon, sparkling wine, sugar', '$17'],
    ['Paper Plane', 'Bourbon, amaro, aperitivo, lemon', '$18'],
    ['Mezcal Negroni', 'Mezcal, sweet vermouth, bitter orange', '$18'],
    ['Lychee Martini', 'Vodka, lychee, citrus, dry vermouth', '$17'],
  ],
  'Zero Proof': [
    ['Garden Tonic', 'Cucumber, basil, lime, premium tonic', '$12'],
    ['Blood Orange Fizz', 'Blood orange, rosemary, lemon, soda', '$12'],
    ['Pear & Ginger Cooler', 'Pear, ginger, lemon, sparkling water', '$12'],
    ['No-Groni', 'Botanical aperitif, bitter orange, zero-proof vermouth', '$13'],
    ['Pineapple Mint Highball', 'Pineapple, mint, lime, soda', '$12'],
    ['Blackberry Sage Smash', 'Blackberry, sage, lemon, sparkling tea', '$13'],
    ['Citrus Spritz', 'Grapefruit, orange blossom, tonic', '$12'],
    ['Espresso Tonic', 'Espresso, tonic, orange peel', '$10'],
  ],
  Wine: [
    ['Champagne Reserve', 'Citrus, brioche, chalky mineral finish', '$22 / $110'],
    ['Sancerre', 'Lemon, white flowers, flint', '$19 / $78'],
    ['Chablis', 'Green apple, citrus, oyster-shell minerality', '$20 / $82'],
    ['Barolo', 'Rose, cherry, tobacco, firm tannin', '$24 / $104'],
  ],
  'Beer & Cider': [
    ['Aurelia House Lager', 'Crisp, floral, clean finish', '$9'],
    ['Italian Pilsner', 'Dry, herbal, bright bitterness', '$10'],
    ['Hazy IPA', 'Citrus, tropical fruit, soft bitterness', '$10'],
    ['Dry Stout', 'Roasted malt, cocoa, smooth finish', '$10'],
    ['Belgian Witbier', 'Coriander, orange peel, wheat', '$10'],
    ['Amber Ale', 'Toffee malt, toasted grain, gentle hops', '$10'],
    ['Pear Cider', 'Dry pear, floral aromatics, fine bubbles', '$11'],
    ['Apple Cider', 'Crisp orchard fruit, dry finish', '$10'],
  ],
  Spirits: [
    ['Bourbon Flight', 'Three curated American whiskey pours', '$24'],
    ['Single Malt Flight', 'Three rotating Scotch regions', '$28'],
    ['Japanese Whisky', 'Delicate smoke, orchard fruit, oak', '$22'],
    ['Aged Rum', 'Caramel, banana, baking spice', '$18'],
    ['Reposado Tequila', 'Agave, vanilla, toasted oak', '$19'],
    ['Mezcal', 'Smoke, roasted agave, citrus peel', '$19'],
    ['Small-Batch Gin', 'Juniper, citrus, fresh herbs', '$17'],
    ['Cognac XO', 'Dried fruit, spice, long oak finish', '$28'],
  ],
  'After Dinner': [
    ['Irish Coffee', 'Irish whiskey, coffee, brown sugar, cream', '$14'],
    ['Espresso Martini Flight', 'Classic, mocha and salted caramel', '$22'],
  ],
}

const expandedMenu = {
  ...menu,
  Cocktails: [...(menu.Cocktails || []), ...drinkAdditions.Cocktails],
  'Zero Proof': drinkAdditions['Zero Proof'],
  Wine: [...(menu.Wine || []), ...drinkAdditions.Wine],
  'Beer & Cider': drinkAdditions['Beer & Cider'],
  Spirits: drinkAdditions.Spirits,
  'After Dinner': [...(menu['After Dinner'] || []), ...drinkAdditions['After Dinner']],
}

const categoryCopy = {
  Starters: 'Bright, shareable beginnings designed to wake up the table.',
  'Raw Bar': 'Cold, clean and luxurious — oysters, crudo and seafood served with precision.',
  Pasta: 'Hand-finished pastas, silky sauces and rich seasonal flavours.',
  Mains: 'Comforting, expressive plates built around seasonality and depth.',
  'Steak & Seafood': 'Fire, char, clean seafood and generous evening plates.',
  'Bar Bites': 'Late-night favourites made for cocktails, conversation and another round.',
  Sides: 'Small plates and accompaniments made for sharing across the table.',
  Desserts: 'A polished final note — rich, light, and made for lingering.',
  Cocktails: 'Signature cocktails, modern classics and expressive seasonal pours.',
  'Zero Proof': 'Layered, grown-up alcohol-free drinks with the same attention as the cocktail list.',
  Wine: 'A deeper cellar of bubbles, bright whites, elegant reds and special pours.',
  'Beer & Cider': 'Cold, crisp and easy-drinking selections for the bar, dining room and late night.',
  Spirits: 'Whisky, agave, rum, gin and cognac — neat, on a rock or explored as a flight.',
  'After Dinner': 'Coffee, digestifs and slow pours for the final chapter of the night.',
}

const drinkCategories = new Set(['Cocktails', 'Zero Proof', 'Wine', 'Beer & Cider', 'Spirits', 'After Dinner'])

export default function EnhancedMenuPage() {
  const [active, setActive] = useState('Starters')
  const categories = Object.keys(expandedMenu)
  const activeItems = useMemo(() => expandedMenu[active] || [], [active])
  const drinksCategory = drinkCategories.has(active)

  useEffect(() => {
    document.title = `Menu | ${site.name}`
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', 'Explore Aurelia’s extensive restaurant and bar menu with raw bar, pasta, mains, steak, seafood, cocktails, zero-proof drinks, wine, beer, cider, spirits and after-dinner pours.')
  }, [])

  return (
    <>
      <section className="menu-visual-hero" style={{ '--menu-hero': `url(${drinksCategory ? images.bar : images.food})` }}>
        <div className="menu-visual-overlay" />
        <div className="shell menu-visual-content">
          <p className="eyebrow light">Eat · drink · linger</p>
          <h1>The menu.</h1>
          <p>A generous restaurant menu and a full bar program — designed for dinner, a quick drink, celebrations and long evenings.</p>
          <div className="menu-hero-badges">
            <span><Sparkles size={15}/> Seasonal</span>
            <span><Utensils size={15}/> Kitchen-led</span>
            <span><Wine size={15}/> Full bar & cellar</span>
          </div>
        </div>
      </section>

      <section className={`menu-modern-section ${drinksCategory ? 'menu-drinks-active' : ''}`}>
        <div className="shell">
          <div className="menu-category-glass" role="tablist" aria-label="Menu categories">
            {categories.map((category) => (
              <button key={category} type="button" role="tab" aria-selected={active === category} className={active === category ? 'active' : ''} onClick={() => setActive(category)}>{category}</button>
            ))}
          </div>

          <div className="menu-category-intro">
            <div><p className="eyebrow">Currently serving</p><h2>{active}</h2></div>
            <div className="menu-category-summary">
              <p>{categoryCopy[active]}</p>
              <span>{activeItems.length} selections</span>
            </div>
          </div>

          {drinksCategory && (
            <div className="menu-drink-notes" aria-label="Bar menu highlights">
              <span>Made to order</span><span>Premium glassware</span><span>Zero-proof options</span><span>Ask about off-menu pours</span>
            </div>
          )}

          <div className="menu-photo-grid menu-photo-grid-extensive">
            {activeItems.map(([name, description, price], index) => (
              <article className="menu-photo-card" key={`${active}-${name}`}>
                <div className="menu-photo-media">
                  <img src={menuImageForItem(name, active, index)} alt={`${name} — ${active}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                  <span className="menu-price-pill">{price}</span>
                </div>
                <div className="menu-photo-copy">
                  <div><p className="menu-item-number">{String(index + 1).padStart(2, '0')}</p><h3>{name}</h3></div>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="menu-category-footer menu-category-footer-refined glass-panel-light">
            <div>
              <p className="eyebrow">Good to know</p>
              <h3>{drinksCategory ? 'The bar list evolves with the season.' : 'Seasonal availability may change.'}</h3>
              <p>{drinksCategory ? 'Ask the bar team about reserve bottles, off-menu classics, zero-proof adaptations and featured pours. Final brands, vintages and pricing can be replaced with the client’s real beverage program before launch.' : 'This is demo menu content for the concept site. Final dishes, pricing, dietary labels and availability can be replaced with the client’s actual menu before launch.'}</p>
            </div>
            <div className="menu-footer-actions">
              {drinksCategory && <Link to="/visiting-hours" className="text-link">See bar hours <ArrowRight size={16}/></Link>}
              <Link to="/booking" className="button button-gold">Reserve a Table</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="chef-feature" style={{ '--chef-bg': `url(${drinksCategory ? images.cocktail : images.pasta})` }}>
        <div className="chef-feature-shade" />
        <div className="shell chef-feature-content glass-panel">
          <p className="eyebrow light">{drinksCategory ? 'From the bar' : 'Chef’s selection'}</p>
          <h2>{drinksCategory ? 'Raise a glass to the evening.' : 'A table should feel abundant.'}</h2>
          <p>{drinksCategory ? 'Signature pours, classics with polish, cellar favourites and a bar made for one more round.' : 'Seasonal ingredients, confident technique and plates designed for sharing, tasting and returning to.'}</p>
          <div className="chef-feature-actions">
            <Link to="/booking" className="button button-gold">Reserve a Table</Link>
            <Link to="/contact" className="text-link light-link">Ask us a question <ArrowRight size={17}/></Link>
          </div>
        </div>
      </section>
    </>
  )
}
