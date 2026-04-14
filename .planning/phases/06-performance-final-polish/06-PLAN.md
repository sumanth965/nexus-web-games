# Plan 6: Performance & Final Polish

## Phase Goal
Finalize the "premium" experience with environmental effects and custom interaction layers.

## Frontmatter
wave: 1
depends_on: ["Phase 5"]
files_modified:
  - frontend/src/App.jsx
  - frontend/src/index.css
  - frontend/src/pages/GamesPage.jsx
  - frontend/src/pages/HomePage.jsx
autonomous: true

## Tasks

<task>
<read_first>
- frontend/src/index.css
</read_first>
<action>
Implement Environmental Overlays.
- Add a `.noise` overlay class in CSS using a base64 or SVG data URI.
- Add "Glint" animation keyframes.
</action>
<acceptance_criteria>
- Subtle cinematic grain is visible across the UI.
</acceptance_criteria>
</task>

<task>
<action>
Create `CustomCursor` component.
- Build a dual-ring cursor (dot + outer ring).
- Animate its size on "interactive" hovers.
</action>
<acceptance_criteria>
- Custom cursor follows mouse smoothly.
- Cursor reacts to buttons/links.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/App.jsx
</read_first>
<action>
Integrate `CustomCursor` and `Noise` globally.
</action>
<acceptance_criteria>
- Global UI feels unified and high-fidelity.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/pages/GamesPage.jsx
</read_first>
<action>
Apply "Glint" effect to game card gradients.
</action>
<acceptance_criteria>
- Cards look more dynamic with periodic light sweeps.
</acceptance_criteria>
</task>

## Verification
- [ ] Measure FPS during high-stagger animations.
- [ ] Ensure custom cursor doesn't break drag-and-drop or mobile view.
