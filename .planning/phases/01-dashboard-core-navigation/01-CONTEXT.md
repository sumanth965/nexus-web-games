# Phase 1: Dashboard & Core Navigation - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary
This phase delivers a functional game selection dashboard using React Router to navigate between existing games and the dashboard.

</domain>

<decisions>
## Implementation Decisions

### Navigation
- Use React Router for navigation.
- Dashboard should be the root route `/`.
- Each game should have its own route (e.g., `/game/2048`).
- All games must have a "Back to Menu" button.

### Styling
- Use Tailwind CSS.
- Modern dark theme with game cards.
- Hover effects on cards showing thumbnails or game info.

### Claude's Discretion
- Card design and layout (grid).
- Animation for transitions (subtle fades).

</decisions>

<canonical_refs>
## Canonical References
- `frontend/src/App.jsx` — Existing router and app shell.
- `frontend/src/games/` — Existing game components.

</canonical_refs>

---
*Phase: 01-dashboard-core-navigation*
