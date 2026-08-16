import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChefHat,
  Clock3,
  Download,
  GlassWater,
  Heart,
  Mail,
  MapPin,
  Martini,
  ParkingCircle,
  Phone,
  Sparkles,
  Star,
  UsersRound,
  UtensilsCrossed,
  Wine,
} from 'lucide-react'
import { hours, images, menu, site, testimonials } from './data'

const extraImages = {
  plating: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=86',
  candle: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=86',
  privateDining: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=86',
  reception: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1700&q=86',
  cateringSpread: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1800&q=86',
  canapes: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=86',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=86',
  terrace: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=86',
}

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = `${title} | ${site.name}`
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', description)
  }, [title, description])
}

function Hero({ eyebrow, title, text, image, compact = false, children }) {
  return (
    <section className={`premium-hero ${compact ? 'premium-hero-compact' : ''}`} style={{ '--premium-hero-image': `url(${image})` }}>
      <div className="premium-hero-overlay" />
      <div className="premium-hero-glow" />
      <div className="shell premium-hero-inner">
        <div className="premium-hero-copy glass-dark">
          <p className="eyebrow light">{eyebrow}</p>
          <h1>{title}</h1>
          {text && <p className="premium-hero-text">{text}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ eyebrow, title, text, light = false }) {
  return (
    <div className={`premium-section-title ${light ? 'is-light' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function Picture({ src, alt, className = '' }) {
  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async" />
}

export function PremiumHome() {
  usePageMeta('Restaurant & Bar', 'Aurelia is a premium restaurant and bar experience with seasonal dining, cocktails, private events, catering and reservations.')
  const featured = [
    [...menu.Starters[0], images.food],
    [...menu.Mains[0], images.pasta],
    [...menu['Steak & Seafood'][0], images.steak],
    [...menu.Desserts[0], images.dessert],
  ]

  return (
    <>
      <section className="premium-home-hero" style={{ '--home-image': `url(${images.hero})` }}>
        <div className="premium-home-shade" />
        <div className="premium-home-orb premium-home-orb-one" />
        <div className="premium-home-orb premium-home-orb-two" />
        <div className="shell premium-home-content">
          <div className="premium-home-kicker glass-chip"><Sparkles size={14}/> Kitchen · Bar · Gatherings</div>
          <h1>{site.name}</h1>
          <p className="premium-home-tagline">Modern dining.<br/>Timeless hospitality.</p>
          <p className="premium-home-description">Season-led plates, expressive cocktails and a dining room made for evenings worth remembering.</p>
          <div className="premium-home-actions">
            <Link className="button button-gold" to="/booking">Reserve a Table</Link>
            <Link className="button button-outline-light" to="/menu">Explore the Menu</Link>
          </div>
        </div>
        <div className="shell premium-home-meta glass-dark">
          <span><Clock3 size={16}/> Dinner nightly</span>
          <span><Martini size={16}/> Late-night bar</span>
          <span><UsersRound size={16}/> Private events</span>
        </div>
      </section>

      <section className="premium-section premium-intro">
        <div className="shell premium-split premium-split-wide">
          <div className="premium-collage">
            <Picture src={images.interior} alt="Aurelia dining room" className="premium-collage-main" />
            <Picture src={images.chef} alt="Chef preparing a dish" className="premium-collage-float" />
            <div className="premium-collage-note glass-light"><ChefHat size={18}/><span>Kitchen-led dining</span></div>
          </div>
          <div>
            <SectionTitle eyebrow="Our table" title="A restaurant made to feel discovered." text="Aurelia pairs polished cooking with a warm, unhurried room. The goal is simple: make dinner feel like the best part of the day." />
            <div className="premium-feature-list">
              <span><Check/> Seasonal plates and chef-driven specials</span>
              <span><Check/> A cocktail bar that carries the evening forward</span>
              <span><Check/> Private dining, banquet and catering experiences</span>
            </div>
            <Link className="text-link large" to="/about">Discover our story <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>

      <section className="premium-section premium-dark-section">
        <div className="shell">
          <div className="premium-heading-row">
            <SectionTitle light eyebrow="Signature plates" title="What the table is talking about." text="A visual first look at a few favourites from the kitchen." />
            <Link className="button button-outline-light" to="/menu">View full menu</Link>
          </div>
          <div className="premium-dish-grid">
            {featured.map(([name, description, price, image]) => (
              <article className="premium-dish-card" key={name}>
                <div className="premium-dish-media"><Picture src={image} alt={name}/><span>{price}</span></div>
                <div className="premium-dish-copy"><h3>{name}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-dual-experience">
        <article style={{ '--experience-image': `url(${images.food})` }}><div/><div className="premium-dual-copy"><p className="eyebrow light">The kitchen</p><h2>Plates with warmth, depth and restraint.</h2><Link to="/menu">Explore dining <ArrowRight size={18}/></Link></div></article>
        <article style={{ '--experience-image': `url(${images.bar})` }}><div/><div className="premium-dual-copy"><p className="eyebrow light">The bar</p><h2>Classic pours. Modern signatures. One more round.</h2><Link to="/visiting-hours">Plan your evening <ArrowRight size={18}/></Link></div></article>
      </section>

      <section className="premium-section premium-wine-gradient">
        <div className="shell premium-split">
          <div>
            <SectionTitle eyebrow="Gather beautifully" title="Private events with restaurant-level hospitality." text="Milestone dinners, birthdays, cocktail receptions and corporate gatherings — hosted with the same attention as our dining room." />
            <div className="premium-icon-grid">
              <div className="glass-light"><UsersRound/><strong>Private dinners</strong><span>Intimate seated occasions</span></div>
              <div className="glass-light"><GlassWater/><strong>Receptions</strong><span>Cocktails, canapés and conversation</span></div>
              <div className="glass-light"><Heart/><strong>Celebrations</strong><span>Milestones made personal</span></div>
              <div className="glass-light"><UtensilsCrossed/><strong>Catering</strong><span>Aurelia beyond our doors</span></div>
            </div>
            <Link to="/banquet" className="button button-dark">Explore Private Events</Link>
          </div>
          <div className="premium-photo-stack">
            <Picture src={images.banquet} alt="Private event dining" className="premium-photo-large" />
            <Picture src={images.table} alt="Elegant table setting" className="premium-photo-small" />
          </div>
        </div>
      </section>

      <section className="premium-section premium-gallery-preview">
        <div className="shell">
          <div className="premium-heading-row">
            <SectionTitle eyebrow="A glimpse inside" title="Food, atmosphere and everything between." />
            <Link className="text-link large" to="/gallery">Open gallery <ArrowRight size={18}/></Link>
          </div>
          <div className="premium-gallery-tiles">
            {[images.interior, images.cocktail, images.pasta, images.banquet, images.steak].map((src, index) => <Picture key={src} src={src} alt={`Aurelia atmosphere ${index + 1}`} />)}
          </div>
        </div>
      </section>

      <section className="premium-section premium-hours-preview">
        <div className="shell premium-hours-shell glass-light">
          <div><p className="eyebrow">Plan your evening</p><h2>Dinner, drinks, or both.</h2><p>Restaurant and bar hours are easy to scan before you head out.</p></div>
          <div className="premium-hours-mini">{hours.map(([day, dining, bar]) => <div key={day}><strong>{day}</strong><span>Dining {dining}</span><span>Bar {bar}</span></div>)}</div>
          <Link to="/visiting-hours" className="button button-dark">Hours & Directions</Link>
        </div>
      </section>

      <section className="premium-testimonial" style={{ '--testimonial-image': `url(${images.table})` }}>
        <div className="premium-testimonial-shade" />
        <div className="shell premium-testimonial-card glass-dark"><Star/><blockquote>{testimonials[0][0]}</blockquote><p>— {testimonials[0][1]}</p><Link to="/booking" className="button button-gold">Reserve your table</Link></div>
      </section>
    </>
  )
}

export function PremiumAbout() {
  usePageMeta('About', 'Discover the story, philosophy and hospitality behind Aurelia Restaurant & Bar.')
  return (
    <>
      <Hero eyebrow="Our story" title="Built around the table." text="A dining room shaped by seasonality, warmth, conversation and the pleasure of staying a little longer." image={images.interior} compact />
      <section className="premium-section">
        <div className="shell premium-split premium-split-wide">
          <div className="premium-photo-stack premium-photo-stack-left"><Picture src={images.chef} alt="Aurelia chef" className="premium-photo-large"/><Picture src={extraImages.plating} alt="Chef plating a dish" className="premium-photo-small"/></div>
          <div><SectionTitle eyebrow="Our philosophy" title="The best restaurants feel effortless." text="Behind that feeling is intention: ingredients chosen with care, a room with energy, service that notices without hovering, and food that makes you want another bite."/>
            <div className="premium-feature-list"><span><Check/> Season-led cooking</span><span><Check/> Warm, human hospitality</span><span><Check/> Dining room and bar designed as one experience</span></div>
          </div>
        </div>
      </section>
      <section className="premium-section premium-dark-section">
        <div className="shell"><SectionTitle light eyebrow="The Aurelia way" title="Three ideas guide every evening."/>
          <div className="premium-value-cards">
            <article className="glass-dark"><span>01</span><ChefHat/><h3>Cook with clarity</h3><p>Let great ingredients lead. Technique supports flavour rather than competing with it.</p></article>
            <article className="glass-dark"><span>02</span><Wine/><h3>Create a room with energy</h3><p>Dinner can become drinks, drinks can become a celebration, and the atmosphere should evolve naturally.</p></article>
            <article className="glass-dark"><span>03</span><Heart/><h3>Make hospitality personal</h3><p>Professional, attentive service that still feels relaxed, genuine and human.</p></article>
          </div>
        </div>
      </section>
      <section className="premium-section premium-timeline-section">
        <div className="shell premium-timeline"><div><p className="eyebrow">The story</p><h2>From first pour to last plate.</h2></div><div className="premium-timeline-items">
          <article><span>01</span><div><h3>Arrive</h3><p>Settle in with a cocktail, glass of wine or something sparkling.</p></div></article>
          <article><span>02</span><div><h3>Dine</h3><p>Share starters, settle into the mains, and let the table find its rhythm.</p></div></article>
          <article><span>03</span><div><h3>Linger</h3><p>Dessert, another pour, good conversation — no need to rush the last part.</p></div></article>
        </div></div>
      </section>
      <section className="premium-wide-image" style={{ '--wide-image': `url(${images.bar})` }}><div/><div className="shell glass-dark"><p className="eyebrow light">Restaurant + bar</p><h2>Two moods. One evening.</h2><p>Come for dinner, stay for the bar, or arrive when the night is already moving.</p><Link to="/booking" className="button button-gold">Book a Table</Link></div></section>
    </>
  )
}

export function PremiumBanquet() {
  usePageMeta('Banquet Facility', 'Explore Aurelia private dining and banquet experiences for celebrations, receptions and corporate events.')
  const eventTypes = [
    [Heart, 'Celebrations', 'Birthdays, anniversaries, showers and milestones.'],
    [UsersRound, 'Corporate dinners', 'Client evenings, team dinners and private business occasions.'],
    [GlassWater, 'Cocktail receptions', 'Flexible standing events with drinks, canapés and lounge-style flow.'],
  ]
  return (
    <>
      <Hero eyebrow="Private events" title="Celebrate beautifully." text="A private dining and banquet experience designed around your guest list, your occasion and the way you want the room to feel." image={images.banquet} />
      <section className="premium-section">
        <div className="shell premium-split premium-split-wide"><div><SectionTitle eyebrow="Banquet facility" title="A room that feels special before the first course arrives." text="This demo structure is ready for final venue capacity, packages, floor plans and amenities once the restaurant details are confirmed."/>
          <div className="premium-feature-list"><span><Check/> Flexible seated and reception layouts</span><span><Check/> Custom menu and beverage options</span><span><Check/> Dedicated event planning contact</span><span><Check/> AV, décor and accessibility details can be added</span></div><Link className="button button-dark" to="/contact">Request Event Information</Link></div>
          <div className="premium-photo-stack"><Picture src={images.table} alt="Banquet tables" className="premium-photo-large"/><Picture src={extraImages.reception} alt="Private celebration" className="premium-photo-small"/></div></div>
      </section>
      <section className="premium-section premium-wine-dark"><div className="shell"><SectionTitle light eyebrow="Ways to gather" title="One space. Different kinds of nights."/>
        <div className="premium-event-cards">{eventTypes.map(([Icon, title, copy]) => <article className="glass-dark" key={title}><Icon/><h3>{title}</h3><p>{copy}</p><span>Capacity to be confirmed</span></article>)}</div></div></section>
      <section className="premium-section"><div className="shell"><SectionTitle eyebrow="The setting" title="A venue that photographs as beautifully as it hosts."/>
        <div className="premium-banquet-gallery"><Picture src={images.banquet} alt="Banquet room"/><Picture src={images.interior} alt="Dining room"/><Picture src={extraImages.candle} alt="Evening table setting"/><Picture src={images.table} alt="Table details"/></div></div></section>
      <section className="premium-cta-strip"><div className="shell glass-light"><div><p className="eyebrow">Planning something?</p><h2>Tell us what the occasion should feel like.</h2></div><Link to="/contact" className="button button-dark">Start an event inquiry</Link></div></section>
    </>
  )
}

export function PremiumCatering() {
  usePageMeta('Catering', 'Discover Aurelia catering for private events, corporate gatherings and celebrations.')
  return (
    <>
      <Hero eyebrow="Aurelia beyond our doors" title="Catering, considered." text="Restaurant-quality food, polished presentation and flexible service for occasions beyond our dining room." image={images.catering} compact />
      <section className="premium-section"><div className="shell"><SectionTitle eyebrow="What we cater" title="From boardroom lunches to milestone celebrations." text="Choose the style that fits the occasion, then shape the menu, service and presentation around it."/>
        <div className="premium-catering-cards">
          <article style={{ '--card-image': `url(${extraImages.cateringSpread})` }}><div/><div className="glass-dark"><span>01</span><h3>Corporate</h3><p>Meetings, launches and client gatherings.</p></div></article>
          <article style={{ '--card-image': `url(${images.food})` }}><div/><div className="glass-dark"><span>02</span><h3>Social</h3><p>Birthdays, showers and family celebrations.</p></div></article>
          <article style={{ '--card-image': `url(${extraImages.canapes})` }}><div/><div className="glass-dark"><span>03</span><h3>Reception</h3><p>Passed bites, grazing and cocktail-forward events.</p></div></article>
        </div></div></section>
      <section className="premium-section premium-sand-gradient"><div className="shell premium-split premium-split-wide"><div className="premium-photo-stack premium-photo-stack-left"><Picture src={extraImages.cateringSpread} alt="Catering spread" className="premium-photo-large"/><Picture src={extraImages.canapes} alt="Catering canapes" className="premium-photo-small"/></div><div><SectionTitle eyebrow="Service styles" title="Built around how you want to host." text="Use this section for real package tiers, minimums and inclusions once final catering details are supplied."/><div className="premium-service-grid"><span className="glass-light"><Check/> Drop-off catering</span><span className="glass-light"><Check/> Staffed buffet</span><span className="glass-light"><Check/> Plated dinner</span><span className="glass-light"><Check/> Cocktail reception</span></div><Link to="/contact" className="button button-dark">Start a Catering Inquiry</Link></div></div></section>
      <section className="premium-process"><div className="shell"><SectionTitle light eyebrow="Simple planning" title="From idea to service in three steps."/><div className="premium-process-grid"><article><span>1</span><h3>Tell us the occasion</h3><p>Date, guest count, setting and the feel you want.</p></article><article><span>2</span><h3>Shape the menu</h3><p>Choose service style, menu direction and dietary needs.</p></article><article><span>3</span><h3>Host beautifully</h3><p>We arrive prepared so you can stay present with your guests.</p></article></div></div></section>
    </>
  )
}

export function PremiumVisitingHours() {
  usePageMeta('Visiting Hours', 'View Aurelia dining room and bar hours, location details, directions and reservation information.')
  return (
    <>
      <Hero eyebrow="Plan your visit" title="Hours & location." text="Everything you need before you arrive — dinner hours, bar hours, directions and reservation details." image={extraImages.terrace} compact />
      <section className="premium-section premium-visit-section"><div className="shell premium-visit-layout">
        <div><SectionTitle eyebrow="When to visit" title="Dinner first. Drinks after."/>
          <div className="premium-hours-cards">{hours.map(([day, dining, bar]) => <article className="glass-light" key={day}><h3>{day}</h3><div><span>Dining room</span><strong>{dining}</strong></div><div><span>Bar</span><strong>{bar}</strong></div></article>)}</div>
          <p className="premium-demo-note">Demo schedule shown. Final hours can be replaced centrally once confirmed.</p>
        </div>
        <aside className="premium-visit-card glass-dark"><MapPin/><p className="eyebrow light">Find us</p><h2>{site.address}</h2><a href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}><Phone/> {site.phone}</a><span><ParkingCircle/> Parking details available soon</span><span><Clock3/> Reservations recommended for dinner</span><Link to="/booking" className="button button-gold">Reserve a Table</Link></aside>
      </div></section>
      <section className="premium-map-section"><div className="premium-map-visual"><MapPin/><span>Interactive map will connect to the final restaurant location.</span></div><div className="premium-map-copy glass-light"><p className="eyebrow">Getting here</p><h2>Make the journey easy.</h2><p>Add live directions, parking details, nearby landmarks and accessibility information once the final address is confirmed.</p><Link to="/contact" className="text-link large">Contact the restaurant <ArrowRight size={18}/></Link></div></section>
    </>
  )
}

export function PremiumBooking() {
  usePageMeta('Online Booking', 'Request a table at Aurelia by selecting your preferred date, time, guest count and contact information.')
  const [sent, setSent] = useState(false)
  return (
    <>
      <section className="premium-booking-hero" style={{ '--booking-image': `url(${images.table})` }}><div className="premium-booking-shade"/><div className="shell premium-booking-layout">
        <div className="premium-booking-intro glass-dark"><p className="eyebrow light">Reservations</p><h1>Your table awaits.</h1><p>Choose a preferred date, time and party size. The production site can later connect to the restaurant's booking platform.</p><div className="premium-booking-points"><span><CalendarDays/> Choose your date</span><span><UsersRound/> Tell us your party size</span><span><Wine/> Add celebration or dietary notes</span></div></div>
        <form className="premium-booking-form glass-light" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
          {sent ? <div className="premium-success"><Check/><p className="eyebrow">Request received</p><h2>We saved your preferred table.</h2><p>This is a demo confirmation. No live restaurant reservation was created.</p><button type="button" className="button button-dark" onClick={() => setSent(false)}>Make another request</button></div> : <>
            <div className="premium-form-head"><span>01</span><div><p className="eyebrow">Your details</p><h2>Who are we welcoming?</h2></div></div>
            <div className="premium-form-grid"><label>Full name<input required name="name" autoComplete="name"/></label><label>Email<input required type="email" name="email" autoComplete="email"/></label><label>Phone<input required type="tel" name="phone" autoComplete="tel"/></label><label>Guests<select name="guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7+</option></select></label><label>Date<input required type="date" name="date"/></label><label>Time<select required name="time" defaultValue=""><option value="" disabled>Select a time</option><option>5:00 PM</option><option>5:30 PM</option><option>6:00 PM</option><option>6:30 PM</option><option>7:00 PM</option><option>7:30 PM</option><option>8:00 PM</option><option>8:30 PM</option><option>9:00 PM</option></select></label><label className="premium-form-full">Special requests<textarea rows="4" name="notes" placeholder="Allergies, accessibility needs, celebration details..."/></label></div>
            <button className="button button-gold premium-submit" type="submit">Request Reservation</button><p className="premium-demo-note">Demo only — no live booking is submitted.</p>
          </>}
        </form>
      </div></section>
    </>
  )
}

export function PremiumMenuKit() {
  usePageMeta('Menu Kit', 'A polished flexible resource hub for Aurelia menus, events and catering materials.')
  const resources = [
    ['Dining Menu', 'Seasonal food menu resource', images.food],
    ['Private Events', 'Banquet and event menu resource', images.banquet],
    ['Catering', 'Catering menu and service resource', images.catering],
  ]
  return (
    <>
      <Hero eyebrow="Menu kit" title="Everything in one place." text="A polished resource page ready to become the client’s final menu kit once its exact purpose is confirmed." image={images.food} compact />
      <section className="premium-section premium-kit-section"><div className="shell"><SectionTitle eyebrow="Flexible by design" title="Menus and event resources, ready when the final brief arrives." text="For now, this page demonstrates how downloadable dining, banquet and catering resources could be presented without locking the client into the wrong functionality."/>
        <div className="premium-resource-grid">{resources.map(([title, text, image], index) => <article key={title}><Picture src={image} alt={title}/><div className="glass-light"><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><button type="button" disabled><Download/> Demo resource</button></div></article>)}</div>
        <div className="premium-kit-note glass-light"><Sparkles/><div><strong>Scope-safe demo</strong><p>No fake downloadable PDFs or complex tools have been invented. Once “Menu Kit” is clarified, this structure can become the correct final experience quickly.</p></div></div>
      </div></section>
    </>
  )
}

export function PremiumContact() {
  usePageMeta('Contact', 'Contact Aurelia Restaurant & Bar for general, banquet, catering and reservation inquiries.')
  const [sent, setSent] = useState(false)
  return (
    <>
      <Hero eyebrow="Get in touch" title="We’d love to hear from you." text="Questions, events, catering or general inquiries — start here." image={images.interior} compact />
      <section className="premium-section premium-contact-section"><div className="shell premium-contact-layout">
        <div><SectionTitle eyebrow="Visit & connect" title="Dinner plans, event ideas, or a simple question."/>
          <div className="premium-contact-cards"><a className="glass-light" href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}><Phone/><span><small>Call us</small><strong>{site.phone}</strong></span></a><a className="glass-light" href={`mailto:${site.email}`}><Mail/><span><small>Email</small><strong>{site.email}</strong></span></a><div className="glass-light"><MapPin/><span><small>Visit</small><strong>{site.address}</strong></span></div></div>
          <div className="premium-contact-image"><Picture src={images.bar} alt="Aurelia bar"/><div className="glass-dark"><p className="eyebrow light">Tonight at Aurelia</p><h3>Dinner, drinks and a room worth staying in.</h3></div></div>
        </div>
        <form className="premium-contact-form glass-light" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>{sent ? <div className="premium-success"><Check/><p className="eyebrow">Message captured</p><h2>Thanks for reaching out.</h2><p>This is a demo confirmation. Connect the production form endpoint before launch.</p></div> : <><p className="eyebrow">Send an inquiry</p><h2>Tell us how we can help.</h2><label>Name<input required name="name" autoComplete="name"/></label><label>Email<input required type="email" name="email" autoComplete="email"/></label><label>Inquiry type<select name="type"><option>General inquiry</option><option>Banquet / private event</option><option>Catering</option><option>Reservation question</option></select></label><label>Message<textarea required rows="6" name="message"/></label><button type="submit" className="button button-dark">Send Inquiry</button></>}</form>
      </div></section>
    </>
  )
}
