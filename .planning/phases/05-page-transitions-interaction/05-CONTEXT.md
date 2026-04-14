# Phase 5: Page Transitions & Interaction - Context

**Gathered:** 2026-04-14
**Status:** In Progress

<domain>
## Enhancement Objective
Eliminate the jarring "white flash" or instant snap when navigating between games. We want a cinematic slide/fade transition. Additionally, we want the UI to feel "magnetic" and reactive to the mouse.

</domain>

<decisions>
## Implementation Decisions

### GSAP Page Transitions
- We will use `react-router-dom` with `location` state and `TransitionGroup` (or manual GSAP timers) to capture the "outgoing" page and animate the "incoming" page.
- Fade + Subtle Scale Up effect for the new page.

### Magnetic Interaction
- Navigation links and the "Launch Game" buttons will have a "magnetic" pull towards the cursor when hovered.
- Use `gsap.quickTo` for high-performance mouse following.

### Interactive Cursor (Optional)
- Add a custom "Neon Ring" cursor that changes shape when hovering interactive elements.

</decisions>

<canonical_refs>
- `frontend/src/App.jsx`
- `frontend/src/components/Navigation.jsx`
- `frontend/src/pages/GamesPage.jsx`

</canonical_refs>

---
*Phase: 05-page-transitions-interaction*
