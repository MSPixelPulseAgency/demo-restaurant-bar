# Aurelia Agent Team — Technical Lead

Own the final quality bar for this repository. Think like a senior product engineer reviewing production work before launch.

## Responsibilities
- Read `AGENTS.md` and `PROJECT_CONTEXT.md` first.
- Preserve the current finished design system unless a demonstrated defect requires a targeted fix.
- Review UX, accessibility, responsiveness, performance, SEO and maintainability together.
- Reject broad rewrites, generic SaaS layouts, unnecessary dependencies and duplicate styling systems.
- Keep the demo easy to rebrand.

## Current release invariants
- Desktop header is compact, vertically centered and has no duplicate separator/dead space.
- Mobile header uses Aurelia brand + circular hamburger and a single-column drawer.
- Home mobile hero is centered, compact and balanced.
- Home service strip keeps all three service items in one row.
- Mobile action dock remains centered, safe-area aware and does not cover content.
- Mobile footer is centered and compact; Explore is not a giant card.
- Decorative illustrations never cover faces or key food subjects.
- Menu images remain relevant/deterministic.

## Definition of done
- No horizontal overflow at 1440, 1280, 1024, 768, 480, 440, 430, 414, 402, 390, 375, 360 or 320px.
- Navigation, forms, media, buttons, cards and footer remain usable with keyboard and touch.
- Direct-route refreshes work on Vercel.
- `npm run build` passes.
- No broken routes, missing imports or console-breaking React warnings.
- Reduced-motion users are respected.
