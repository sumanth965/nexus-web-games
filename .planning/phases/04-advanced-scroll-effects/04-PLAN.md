# Plan 4: Advanced Scroll Effects

## Phase Goal
Implement deep scroll-based interactions and smooth scrolling.

## Frontmatter
wave: 1
depends_on: []
files_modified:
  - frontend/src/App.jsx
  - frontend/src/pages/HomePage.jsx
  - frontend/src/pages/GamesPage.jsx
  - frontend/src/index.css
autonomous: true

## Tasks

<task>
<read_first>
- frontend/package.json
</read_first>
<action>
Install Lenis for smooth scrolling.
</action>
<acceptance_criteria>
- `lenis` is added to package.json.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/App.jsx
</read_first>
<action>
Initialize Lenis smooth scroll globally.
Configure GSAP ScrollTrigger defaults.
</action>
<acceptance_criteria>
- Smooth scroll is active on the site.
- ScrollTrigger is registered.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/pages/HomePage.jsx
</read_first>
<action>
Implement ScrollTrigger Parallax.
- Add "Floating Orbs" in the background that move on scroll.
- Section reveal: Experience card slides in from the left/right on scroll.
</action>
<acceptance_criteria>
- Parallax effect is noticeable and smooth.
- Sections reveal gracefully as they come into view.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/pages/GamesPage.jsx
</read_first>
<action>
Implement 3D Card Reveal.
- Game cards should have a subtle 3D tilt/skew reveal using ScrollTrigger.
</action>
<acceptance_criteria>
- Grid reveals look cinematic on scroll.
</acceptance_criteria>
</task>

## Verification
- [ ] Scroll through the whole site and check for performance lag.
- [ ] Verify ScrollTrigger markers (testing) then remove them.
- [ ] Ensure smooth scroll doesn't break fixed navigation.
