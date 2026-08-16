# Aurelia Restaurant & Bar — MSPixelPulse Demo

Premium responsive restaurant + bar website concept built with React and Vite.

## Live demo
https://aurelia-restaurant-bar.vercel.app

## Included pages
- Home
- About
- Menu
- Banquet Facility
- Catering
- Gallery
- Visiting Hours
- Online Booking
- Blog + article pages
- Menu Kit
- Contact

## Stack
- React
- Vite
- React Router
- Lucide React
- React Icons
- Vanilla CSS

## Current design system
- Near-black / espresso foundation with warm ivory surfaces
- Bronze / champagne accents with restrained burgundy warmth
- Editorial serif display typography with clean sans-serif UI type
- Cinematic food, bar, interior and event imagery
- Selective liquid-glass surfaces for navigation, quick actions and functional overlays
- Culinary line illustrations used decoratively without covering important subjects
- Rounded editorial cards, soft shadows and restrained hover motion

## Responsive behavior
- Desktop header is a compact single glass/navigation band with no duplicate separator line
- Mobile header uses a compact Aurelia brand + circular hamburger control
- Mobile navigation is a single-column glass drawer
- Home hero is intentionally centered and compact on phones
- Home hero service strip keeps Dinner Nightly / Late-Night Bar / Private Events in one row
- Fixed mobile Call / Directions / Reserve actions use safe-area spacing
- Global minimal scroll-to-top control sits above mobile quick actions
- Footer is centered on mobile with compact Explore, Visit and Follow sections
- Menu categories remain touch-scrollable on phones
- Menu cards collapse to image-first single-column layouts
- Important photo subjects must not be obscured by illustrations or overlays

## Menu + Menu Kit
The menu is extensive across food and beverage categories and uses controlled, relevant image mappings rather than random image services.

Menu Kit includes downloadable demo PDFs for dining, private events and catering. The PDFs are generated as part of the dev/build workflow.

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Deployment
The GitHub `main` branch is connected to Vercel. A successful push to `main` triggers a production deployment automatically.

Vite outputs hashed production assets, so normal redeploys invalidate changed CSS/JS asset URLs. If a local browser still shows an older visual after pulling, use a hard refresh or clear that browser's site cache; repository code cannot remotely clear a user's browser cache.

## Agent team
Before coding, read `AGENTS.md`, `PROJECT_CONTEXT.md`, and all specialist guidance in `/agents`.

Current release rule: preserve the finished responsive behavior. Make targeted fixes instead of introducing another competing CSS system.

## Important
This is a demo website. Aurelia branding, menu/pricing, contact information, hours, testimonials and event details are replaceable placeholders until final client content is supplied.

Created by MSPixelPulse.
