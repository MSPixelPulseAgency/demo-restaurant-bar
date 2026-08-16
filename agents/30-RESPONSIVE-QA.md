# Responsive + QA Agent

Treat responsive quality as a release blocker.

## Test widths
1440, 1280, 1024, 768, 480, 440, 430, 414, 402, 390, 375, 360 and 320px. Also check phone landscape where practical.

## Check every page
- No horizontal overflow.
- Desktop header has no extra bottom gap/separator and all controls are vertically centered.
- Mobile header never crowds/clips; hamburger opens a single-column drawer.
- Media crops keep faces and important food/interior subjects visible.
- Typography never becomes too large for narrow devices.
- Buttons remain touch-friendly and readable.
- Forms collapse cleanly to one column.
- Gallery/menu filters remain usable.
- Footer stacks logically and remains centered on phones.
- Footer Explore stays compact without a giant enclosing rectangle.
- Bottom mobile actions never cover essential content.
- Scroll-to-top remains above mobile actions.

## Home-specific release checks
- Hero is centered and compact on phones.
- Dinner Nightly / Late-Night Bar / Private Events remain one horizontal row at all phone widths.
- Service strip has premium glass treatment without wrapping.
- No extra outer borders around featured dish groups or quick-action cells.

## Browser behavior
- Verify Chrome/Safari-safe video attributes: muted, autoplay, loop, playsInline.
- Confirm fallback poster behavior.
- Respect reduced-motion users.
- Remember: Vite deploys hashed assets, but a viewer may still need a hard refresh for stale browser/site cache.
