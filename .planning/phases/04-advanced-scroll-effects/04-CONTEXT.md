# Phase 4: Advanced Scroll Effects - Context

**Gathered:** 2026-04-14
**Status:** In Progress

<domain>
## Enhancement Objective
Move beyond simple entrance animations. We want sections to "awake" as the user scrolls down, and use parallax to create depth.

</domain>

<decisions>
## Implementation Decisions

### ScrollTrigger Registration
- Must register `ScrollTrigger` and `ScrollToPlugin` globally.
- Use `useGSAP` for all scroll-based hooks.

### Smooth Scrolling (Lenis)
- Since `ScrollSmoother` is a paid plugin, we will use **Lenis** (open source) for the buttery smooth scroll feeling unless the user confirms license.
- Integration will be in `App.jsx` to wrap the whole layout.

### Landing Page Parallax
- Floating geometric shapes in the background moving at different speeds.
- Text that "slides in" on scroll.

### Game Cards Reveal
- Cards should reveal with a 3D rotate/skew effect as they enter the viewport.

</decisions>

<canonical_refs>
- `frontend/src/pages/HomePage.jsx`
- `frontend/src/pages/GamesPage.jsx`
- `frontend/src/App.jsx`

</canonical_refs>

---
*Phase: 04-advanced-scroll-effects*
