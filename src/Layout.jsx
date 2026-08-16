import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, Phone, MapPin, CalendarDays } from 'lucide-react'
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

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, path]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
        </nav>
        <Link className="button button-gold header-cta" to="/booking">Book a Table</Link>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={27}/> : <Menu size={29}/>}</button>
      </div>
      <div className={`mobile-panel ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
          <NavLink className="mobile-book" to="/booking">Reserve a Table</NavLink>
        </nav>
        <div className="mobile-panel-meta"><a href={`tel:${site.phone.replace(/[^0-9+]/g, '')}`}><Phone size={17}/> {site.phone}</a><span><MapPin size={17}/> {site.address}</span></div>
      </div>
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

export default function Layout() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }, [location.pathname])
  const isHome = location.pathname === '/'
  return <><ScrollEffects/><Header/><main><Outlet/>{isHome && <><CinematicFilm/><HomeRoyalExtras/></>}</main><Footer/><MobileActions/></>
}
