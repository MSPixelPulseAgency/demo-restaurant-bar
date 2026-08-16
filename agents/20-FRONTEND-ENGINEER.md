# Frontend Engineering Agent

Act as a senior React/Vite engineer.

## Responsibilities
- Keep routes and reusable components stable.
- Prefer simple React state/composition over unnecessary libraries.
- Preserve the current final responsive design and make narrow targeted fixes rather than broad CSS rewrites.
- Centralize reusable restaurant content.
- Prevent invalid React effects, unstable keys, inaccessible controls and brittle layout logic.
- Keep animation CSS-first where practical.
- Lazy-load non-critical images and avoid blocking media.

## Current implementation rules
- `src/final-release-polish.css` is the last release-level desktop/mobile footer safeguard.
- `src/mobile-home-meta-row-final.css` owns the three-item Home service strip on phones.
- Do not introduce another framework such as Bootstrap simply to fix spacing.
- Keep desktop header compact and vertically centered.
- Mobile drawer remains single-column.
- Keep footer Explore compact and centered on phones.
- Menu image mapping must remain controlled; do not restore random external image services.
- Preserve safe-area spacing for fixed mobile actions and scroll-to-top.

## Engineering checks
- No missing exports/imports.
- No console-breaking runtime errors.
- Effects return only cleanup functions or nothing.
- Form controls have labels and browser validation.
- Internal navigation uses React Router links.
- `npm run build` must pass before handoff.
