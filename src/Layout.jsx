import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, Phone, MapPin, CalendarDays, ChevronUp } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaPinterestP, FaYelp } from 'react-icons/fa'
import { nav, site } from './data'
import CinematicFilm from './CinematicFilm'
import HomeRoyalExtras from './HomeRoyalExtras'
import ScrollEffects from './ScrollEffects'

function Brand({ footer = false }) {
  return (
    <Link to="/" className={`brand ${footer ? 'footer-logo' : ''}`} aria-label="Aurelia home">
      <span className="brand-mark brand-mark-logo" aria-hidden="true"><img src="/aurelia-mark.svg" alt="" /></span>
      <span className="brand-copy"><strong>{site.name}</strong><small>Kitchen · Bar · Gatherings</small></span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className={`site-header ${open ? 'menu-open' : ''}`}>
      <div className="header-inner shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, path]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
        </nav>
        <Link className="button button-gold header-cta" to="/booking">Book a Table</Link>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={24}/> : <Menu size={25}/>} 
        </button>
      </div>

      <button className={`mobile-menu-backdrop ${open ? 'open' : ''}`} type="button" aria-label="Close navigation" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} />

      <aside id="mobile-navigation" className={`mobile-panel ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobile-panel-head">
          <span>Explore Aurelia</span>
          <small>Dining · Bar · Gatherings</small>
        </div>
        <nav aria-label="Mobile navigation" className="mobile-nav-grid">
          {nav.map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''}>
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink className="mobile-book" to="/booking"><CalendarDays size={17}/> Reserve a Table</NavLink>
        <div className="mobile-panel-meta">
          <a href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}><Phone size={16}/> {site.phone}</a>
          <span><MapPin size={16}/> {site.address}</span>
        </div>
      </aside>
    </header>
  )
}

const socials = [['Instagram', FaInstagram], ['Facebook', FaFacebookF], ['Pinterest', FaPinterestP], ['Yelp', FaYelp]]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-sketch footer-sketch-left" aria-hidden="true" /><div className="footer-sketch footer-sketch-right" aria-hidden="true" />
      <div className="shell footer-grid">
        <div className="footer-brand"><Brand footer /><p>A modern dining room and late-night bar designed around food, conversation, and memorable occasions.</p></div>
        <div><p className="footer-label">Explore</p><div className="footer-links">{nav.slice(1, 8).map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</div></div>
        <div><p className="footer-label">Visit</p><p>{site.address}</p><a href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}>{site.phone}</a><br/><a href={`mailto:${site.email}`}>{site.email}</a></div>
        <div><p className="footer-label">Follow</p><div className="socials social-icon-row">{socials.map(([label, Icon]) => <a key={label} href="#" className="social-icon" aria-label={`${label} demo link`} title={label}><Icon aria-hidden="true" /></a>)}</div><Link to="/booking" className="text-link">Make a reservation →</Link></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} {site.name}. Demo website.</span><span>Designed by MSPixelPulse</span></div>
    </footer>
  )
}

function MobileActions() {
  return <div className="mobile-actions" aria-label="Quick actions"><a href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}><Phone size={18}/><span>Call</span></a><Link to="/contact"><MapPin size={18}/><span>Directions</span></Link><Link to="/booking"><CalendarDays size={18}/><span>Reserve</span></Link></div>
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`scroll-top ${visible ? 'is-visible' : ''}`}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ChevronUp size={19} strokeWidth={2.2}/>
    </button>
  )
}

export default function Layout() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }, [location.pathname])
  const isHome = location.pathname === '/'
  return <><ScrollEffects/><Header/><main className={isHome ? 'page-main page-home' : 'page-main'}><Outlet/>{isHome && <><CinematicFilm/><HomeRoyalExtras/></>}</main><Footer/><ScrollToTop/><MobileActions/></>
}
