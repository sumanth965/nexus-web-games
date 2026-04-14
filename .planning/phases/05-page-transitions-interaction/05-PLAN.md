# Plan 5: Page Transitions & Interaction

## Phase Goal
Implement cinematic route transitions and interactive "magnetic" UI elements.

## Frontmatter
wave: 1
depends_on: ["Phase 4"]
files_modified:
  - frontend/src/App.jsx
  - frontend/src/components/Navigation.jsx
  - frontend/src/pages/HomePage.jsx
  - frontend/src/pages/GamesPage.jsx
autonomous: true

## Tasks

<task>
<read_first>
- frontend/src/App.jsx
</read_first>
<action>
Implement Route Transitions.
- Use a wrapper component with GSAP to animate page entrance on route change.
- Sync Lenis with route changes (scroll to top).
</action>
<acceptance_criteria>
- Navigation between pages is smooth (fade + scale).
- Scroll position resets to top on new page.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/components/Navigation.jsx
</read_first>
<action>
Implement Magnetic Navigation.
- Navigation buttons should "pull" towards the cursor on hover.
</action>
<acceptance_criteria>
- Subtle but premium magnetic effect on nav links.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/pages/GamesPage.jsx
</read_first>
<action>
Magnetic "Launch Game" Buttons.
- Apply the magnetic effect to the primary action buttons in the game cards.
</action>
<acceptance_criteria>
- Game cards feel "sticky" and interactive.
</acceptance_criteria>
</task>

## Verification
- [ ] Test navigation speed; ensure transitions aren't too long (max 0.6s).
- [ ] Verify magnetic behavior on mobile (should disable or be touch-friendly).
