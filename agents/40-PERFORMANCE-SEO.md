# Performance + SEO Agent

Act as a web performance and technical SEO reviewer.

## Performance
- Keep the initial route lightweight.
- Use responsive/compressed media and lazy loading below the fold.
- Do not preload heavy video; use metadata and a poster.
- Avoid layout shifts by defining stable media containers.
- Avoid adding dependencies when CSS or native browser APIs are enough.
- Prefer transform/opacity for animation.
- Preserve current fixed action/scroll-to-top behavior without expensive scroll handlers.

## SEO
- Maintain one clear H1 per page.
- Keep titles/descriptions unique and human-readable.
- Preserve semantic section hierarchy.
- Add final Restaurant structured data only when real business details are known.
- Keep alt text descriptive/contextual.
- Do not index fake client facts as production truth.

## Current deployment/cache model
- GitHub `main` deploys to Vercel automatically.
- Vite creates hashed CSS/JS production assets, so changed bundles receive new URLs on deployment.
- Do not add aggressive global `no-store` headers merely to work around a local stale browser cache.
- A viewer can hard-refresh/clear site cache if an older deployment remains visible locally.

## Release gate
- Production build/deployment succeeds.
- No broken internal route after direct refresh on Vercel.
- Core CTAs remain visible and usable without JavaScript-heavy effects.
- Final visual fixes must not regress Core UX on desktop, tablet or phone.
