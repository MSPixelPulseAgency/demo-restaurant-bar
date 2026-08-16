# AGENTS.md

Before changing this repository, read this file and `PROJECT_CONTEXT.md` completely, then read the specialist files in `/agents`.

## Stack
- React + Vite
- React Router
- Lucide React
- Vanilla CSS

## Agent team
- `agents/00-TEAM-LEAD.md` — final architecture and quality gate
- `agents/10-UI-UX-DESIGN.md` — hospitality UX and visual system
- `agents/20-FRONTEND-ENGINEER.md` — React/Vite implementation
- `agents/30-RESPONSIVE-QA.md` — device/browser QA
- `agents/40-PERFORMANCE-SEO.md` — performance, accessibility and technical SEO

## MSPixelPulse reference repositories
When a future task asks to match the agency's established quality, inspect relevant patterns from these existing MSPixelPulseAgency projects before redesigning from scratch:
- `MSPixelPulseAgency/nexus-website`
- `MSPixelPulseAgency/mspixelpulse-demo-yemi-hair-affordables`
- `MSPixelPulseAgency/unity-hope-home-care`
- `MSPixelPulseAgency/mspixelpulse-demo-wellness-studio`

Borrow principles such as reusable React structure, strong responsive behavior, visual hierarchy, media-rich storytelling and production discipline. Do not copy another project's branding or business-specific content.

## Rules
- Preserve the existing visual direction and responsive behavior.
- Keep the site premium, editorial, warm, restaurant-specific, and image-led.
- Do not add ecommerce, cart, checkout, customer accounts, payment, or food ordering.
- Keep client-specific demo content centralized and easy to replace.
- Maintain semantic HTML, keyboard access, visible focus states, alt text, and clear heading hierarchy.
- Test desktop, tablet and mobile before finishing.
- Avoid heavy dependencies unless necessary.
- Prefer CSS/native browser features for motion and media.
- Video must use `muted`, `playsInline`, a poster/fallback and non-blocking preload behavior.
- Run `npm run build` after meaningful changes.
- Never commit secrets.
- Do not force-push or rewrite history.

## Required routes
`/`, `/about`, `/menu`, `/banquet`, `/catering`, `/gallery`, `/visiting-hours`, `/booking`, `/menu-kit`, `/contact`

## Design direction
- near-black / charcoal foundation
- warm cream surfaces
- muted gold / bronze accents
- elegant serif display typography
- clean sans-serif UI typography
- large photography and cinematic media
- generous spacing
- subtle transform/opacity motion
- restrained glass effects only where useful

## Mobile
Mobile is a deliberate layout, not a shrunk desktop. Keep reservation easy to reach and preserve the bottom Call / Directions / Reserve action bar.
