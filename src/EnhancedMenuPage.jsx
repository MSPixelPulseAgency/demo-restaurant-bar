import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Utensils, Wine } from 'lucide-react'
import { images, menu, site } from './data'

const photo = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=86`

const categoryImages = {
  Starters: [
    photo('photo-1547592180-85f173990554'), photo('photo-1504674900247-0877df9cc836'), photo('photo-1541544741938-0af808871cc0'), photo('photo-1515003197210-e0cd71810b5f'),
    photo('photo-1569058242253-92a9c755a0ec'), photo('photo-1559339352-11d035aa65de'), photo('photo-1562565652-a0d8f0c59eb4'), photo('photo-1512621776951-a57141f2eefd'),
  ],
  'Raw Bar': [
    photo('photo-1565680018434-b513d5e5fd47'), photo('photo-1559339352-11d035aa65de'), photo('photo-1563379926898-05f4575a45d8'), photo('photo-1551248429-40975aa4de74'),
    photo('photo-1515003197210-e0cd71810b5f'), photo('photo-1547592180-85f173990554'),
  ],
  Pasta: [
    photo('photo-1473093295043-cdd812d0e601'), photo('photo-1556761223-4c4282c73f77'), photo('photo-1563379926898-05f4575a45d8'), photo('photo-1473093226795-af9932fe5856'),
    photo('photo-1608897013039-887f21d8c804'), photo('photo-1621996346565-e3dbc646d9a9'), photo('photo-1556761175-b413da4baf72'), photo('photo-1572449043416-55f4685c9bb7'),
  ],
  Mains: [
    photo('photo-1504674900247-0877df9cc836'), photo('photo-1541544741938-0af808871cc0'), photo('photo-1533777857889-4be7c70b33f7'), photo('photo-1414235077428-338989a2e8c0'),
    photo('photo-1559339352-11d035aa65de'), photo('photo-1547592180-85f173990554'), photo('photo-1476224203421-9ac39bcb3327'), photo('photo-1543353071-873f17a7a088'),
  ],
  'Steak & Seafood': [
    photo('photo-1544025162-d76694265947'), photo('photo-1563379926898-05f4575a45d8'), photo('photo-1551248429-40975aa4de74'), photo('photo-1547592180-85f173990554'),
    photo('photo-1558030006-450675393462'), photo('photo-1515003197210-e0cd71810b5f'), photo('photo-1547592166-23ac45744acd'), photo('photo-1559339352-11d035aa65de'),
  ],
  'Bar Bites': [
    photo('photo-1568901346375-23c9450c58cd'), photo('photo-1547592180-85f173990554'), photo('photo-1528735602780-2552fd46c7af'), photo('photo-1571091718767-18b5b1457add'),
    photo('photo-1565299507177-b0ac66763828'), photo('photo-1476224203421-9ac39bcb3327'),
  ],
  Sides: [
    photo('photo-1573080496219-bb080dd4f877'), photo('photo-1547592180-85f173990554'), photo('photo-1512621776951-a57141f2eefd'), photo('photo-1543353071-873f17a7a088'),
    photo('photo-1551183053-bf91a1d81141'), photo('photo-1504674900247-0877df9cc836'),
  ],
  Desserts: [
    photo('photo-1551024601-bec78aea704b'), photo('photo-1571877227200-a0d98ea607e9'), photo('photo-1563729784474-d77dbb933a9e'), photo('photo-1578985545062-69928b1d9587'),
    photo('photo-1551024506-0bccd828d307'), photo('photo-1571115177098-24ec42ed204d'), photo('photo-1488477181946-6428a0291777'), photo('photo-1565958011703-44f9829ba187'),
  ],
  Cocktails: [
    photo('photo-1513558161293-cdaf765ed2fd'), photo('photo-1551024709-8f23befc6f87'), photo('photo-1551538827-9c037cb4f32a'), photo('photo-1572116469696-31de0f17cc34'),
    photo('photo-1566417713940-fe7c737a9ef2'), photo('photo-1547595628-c61a29f496f0'), photo('photo-1510812431401-41d2bd2722f3'), photo('photo-1551538827-9c037cb4f32a'),
    photo('photo-1551024709-8f23befc6f87'), photo('photo-1513558161293-cdaf765ed2fd'), photo('photo-1536935338788-846bb9981813'), photo('photo-1530062845289-9109b2c9c868'),
    photo('photo-1556881261-e41e8db21055'), photo('photo-1470337458703-46ad1756a187'),
  ],
  'Zero Proof': [
    photo('photo-1551538827-9c037cb4f32a'), photo('photo-1513558161293-cdaf765ed2fd'), photo('photo-1551024709-8f23befc6f87'), photo('photo-1544145945-f90425340c7e'),
    photo('photo-1523677011781-c91d1bbe2f9d'), photo('photo-1497534446932-c925b458314e'), photo('photo-1551538827-9c037cb4f32a'), photo('photo-1513558161293-cdaf765ed2fd'),
  ],
  Wine: [
    photo('photo-1510812431401-41d2bd2722f3'), photo('photo-1474722883778-792e7990302f'), photo('photo-1528823872057-9c018a7a7553'), photo('photo-1506377247377-2a5b3b417ebb'),
    photo('photo-1553361371-9b22f78e8b1d'), photo('photo-1516594915697-87eb3b1c14ea'), photo('photo-1547595628-c61a29f496f0'), photo('photo-1498579809087-ef1e558fd1da'),
    photo('photo-1510812431401-41d2bd2722f3'), photo('photo-1506377247377-2a5b3b417ebb'), photo('photo-1553361371-9b22f78e8b1d'), photo('photo-1516594915697-87eb3b1c14ea'),
  ],
  'Beer & Cider': [
    photo('photo-1515003197210-e0cd71810b5f'), photo('photo-1513152717235-8b293ab5b665'), photo('photo-1535958636474-b021ee887b13'), photo('photo-1505075106905-fb052892c116'),
    photo('photo-1515003197210-e0cd71810b5f'), photo('photo-1535958636474-b021ee887b13'), photo('photo-1505075106905-fb052892c116'), photo('photo-1513152717235-8b293ab5b665'),
  ],
  Spirits: [
    photo('photo-1527281400683-1aae777175f8'), photo('photo-1569529465841-dfecdab7503b'), photo('photo-1510812431401-41d2bd2722f3'), photo('photo-1470337458703-46ad1756a187'),
    photo('photo-1569529465841-dfecdab7503b'), photo('photo-1527281400683-1aae777175f8'), photo('photo-1470337458703-46ad1756a187'), photo('photo-1510812431401-41d2bd2722f3'),
  ],
  'After Dinner': [
    photo('photo-1495474472287-4d71bcdd2085'), photo('photo-1512568400610-62da28bc8a13'), photo('photo-1509042239860-f550ce710b93'), photo('photo-1511081692775-05d0f180a065'),
    photo('photo-1527281400683-1aae777175f8'), photo('photo-1470337458703-46ad1756a187'), photo('photo-1511081692775-05d0f180a065'), photo('photo-1527281400683-1aae777175f8'),
  ],
}

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

  useEffect(() => {
    document.title = `Menu | ${site.name}`
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', 'Explore Aurelia’s extensive restaurant and bar menu with raw bar, pasta, mains, steak, seafood, cocktails, zero-proof drinks, wine, beer, cider, spirits and after-dinner pours.')
  }, [])

  const imageForItem = (category, index) => {
    const pool = categoryImages[category] || [images.food]
    return pool[index % pool.length]
  }

  const drinksCategory = drinkCategories.has(active)

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
              <button key={category} type="button" className={active === category ? 'active' : ''} onClick={() => setActive(category)}>{category}</button>
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
              <span>Made to order</span>
              <span>Premium glassware</span>
              <span>Zero-proof options</span>
              <span>Ask about off-menu pours</span>
            </div>
          )}

          <div className="menu-photo-grid menu-photo-grid-extensive">
            {activeItems.map(([name, description, price], index) => (
              <article className="menu-photo-card" key={`${active}-${name}`}>
                <div className="menu-photo-media">
                  <img src={imageForItem(active, index)} alt={name} loading="lazy" decoding="async" />
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
