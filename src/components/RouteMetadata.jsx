import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { blogPosts } from '../data/blogData.js'

const origin = 'https://bar.mspixelpulse.com'
const routes = {
  '/': ['Aurelia Restaurant & Bar', 'A fictional restaurant and bar website demo by MSPixelPulse. Explore dining, menus, gatherings and demonstration reservations.'],
  '/menu': ['Dining & Drinks Menu', 'Explore Aurelia’s illustrative dining and drinks menu. Prices, availability and venue details are demo content.'],
  '/about': ['Our Story', 'Discover the story and atmosphere of Aurelia, a fictional restaurant and bar concept by MSPixelPulse.'],
  '/banquet': ['Private Gatherings', 'Explore demonstration private gatherings and banquet options at the fictional Aurelia Restaurant & Bar.'],
  '/catering': ['Catering', 'Explore illustrative catering menus and gathering ideas from the Aurelia hospitality website demo.'],
  '/gallery': ['Gallery', 'View the visual atmosphere of Aurelia, a fictional restaurant and bar website demonstration.'],
  '/visiting-hours': ['Visiting Hours', 'Illustrative opening hours and visitor information for the Aurelia Restaurant & Bar demo.'],
  '/booking': ['Reserve a Table', 'Try the transparent demonstration reservation request flow. No real table or service is booked.'],
  '/blog': ['Journal', 'Dining inspiration and editorial stories from the fictional Aurelia Restaurant & Bar concept.'],
  '/menu-kit': ['Menu Downloads', 'Download illustrative dining, private gathering and catering menu kits from the Aurelia demo.'],
  '/contact': ['Contact', 'Demo contact and venue information for Aurelia Restaurant & Bar, created by MSPixelPulse.'],
}

function meta(attribute, key, value) {
  let node = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute(attribute, key)
    document.head.appendChild(node)
  }
  node.content = value
}

export default function RouteMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    const post = blogPosts.find((item) => `/blog/${item.slug}` === pathname)
    const route = routes[pathname] || (post ? [post.title, post.excerpt] : null)
    const [label, description] = route || ['Page Not Found', 'This Aurelia demo page could not be found. Explore our menu and restaurant story.']
    const title = pathname === '/' ? label : `${label} | Aurelia Restaurant & Bar`
    const url = origin + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''))
    document.title = title
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = url
    meta('name', 'description', description)
    meta('name', 'robots', route ? 'index, follow' : 'noindex, follow')
    meta('property', 'og:title', title)
    meta('property', 'og:description', description)
    meta('property', 'og:type', 'website')
    meta('property', 'og:url', url)
  }, [pathname])
  return null
}
