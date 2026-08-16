# AGENTS.md

Before changing this repository, read this file and `PROJECT_CONTEXT.md` completely, then read the specialist files in `/agents`.

## Stack
- React + Vite
- React Router
- Lucide React
- React Icons
- Vanilla CSS

## Agent team
- `agents/00-TEAM-LEAD.md` — final architecture and quality gate
- `agents/10-UI-UX-DESIGN.md` — hospitality UX and visual system
- `agents/20-FRONTEND-ENGINEER.md` — React/Vite implementation
- `agents/30-RESPONSIVE-QA.md` — device/browser QA
- `agents/40-PERFORMANCE-SEO.md` — performance, accessibility and technical SEO

## MSPixelPulse reference repositories
When a future task asks to match the agency's established quality, inspect relevant patterns from existing MSPixelPulseAgency projects before redesigning from scratch. Borrow principles, not branding.

## Current release design — preserve this
- Premium restaurant/bar editorial direction; not SaaS UI.
- Near-black/espresso base, warm ivory surfaces, champagne/bronze accents and restrained wine tones.
- Serif display typography + clean sans-serif UI typography.
- Cinematic food, bar, interior and event imagery.
- Selective liquid-glass effects for header, mobile actions, service strip, overlays and utility controls.
- Desktop header is compact and minimal with no duplicate bottom separator.
- Mobile header is spacious but compact, with Aurelia brand and circular hamburger.
- Mobile drawer is a single-column navigation list.
- Home phone hero is centered and balanced, never oversized or vertically empty.
- Home service strip keeps Dinner Nightly / Late-Night Bar / Private Events in one horizontal row at phone widths.
- Fixed Call / Directions / Reserve dock stays centered and respects safe areas.
- Scroll-to-top remains minimal and sits above the mobile dock.
- Mobile footer content is centered; Explore must be compact and must not become a giant card.
- Decorative culinary illustrations may never cover faces or key food subjects.
- Menu imagery must be controlled and relevant to the named item; no random image services.

## Rules
- Preserve existing visual direction and responsive behavior unless fixing a demonstrated defect.
- Prefer targeted overrides/refactors over adding another broad competing styling system.
- Do not add ecommerce, cart, checkout, accounts, payment or food ordering.
- Maintain semantic HTML, keyboard access, visible focus states, alt text and heading hierarchy.
- Avoid heavy dependencies unless necessary.
- Prefer CSS/native browser features for motion and media.
- Video must use `muted`, `playsInline`, poster/fallback and non-blocking preload behavior.
- Run `npm run build` after meaningful changes.
- Never commit secrets.
- Do not force-push or rewrite history.

## Required routes
`/`, `/about`, `/menu`, `/banquet`, `/catering`, `/gallery`, `/visiting-hours`, `/booking`, `/blog`, `/menu-kit`, `/contact`

## Responsive release matrix
Check at least: 1440, 1280, 1024, 768, 480, 440, 430, 414, 402, 390, 375, 360 and 320px, plus phone landscape where practical.

## Deployment
`main` is connected to Vercel. Successful commits deploy automatically. Vite hashes changed production assets; browser cache itself cannot be remotely cleared from repository code.
