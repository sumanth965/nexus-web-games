# Plan 3: Final Polish & Launch

## Phase Goal
Finalize the UI and ensure a premium user experience.

## Frontmatter
wave: 1
depends_on: []
files_modified:
  - frontend/src/pages/ProfilePage.jsx
  - frontend/src/pages/LeaderboardPage.jsx
  - frontend/src/pages/SettingsPage.jsx
  - frontend/src/index.css
autonomous: true

## Tasks

<task>
<read_first>
- frontend/src/pages/ProfilePage.jsx
</read_first>
<action>
Polish the Profile page.
- Add a "Gaming Level" progress bar with a neon cyan glow.
- Display "Game Statistics" in a more structured grid.
- Ensure 2D (avatar + username) section looks premium.
</action>
<acceptance_criteria>
- Profile page looks modern and professional.
- Level progress bar is visually appealing.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/pages/LeaderboardPage.jsx
</read_first>
<action>
Polish the Leaderboard page.
- Add "Rank" badges (1st, 2nd, 3rd) with distinctive colors.
- Ensure the table/list is responsive and scrollable on mobile.
- Use the `glass-effect` class.
</action>
<acceptance_criteria>
- Leaderboard is clearly readable and visually hierarchical.
- Responsive on all devices.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/pages/SettingsPage.jsx
</read_first>
<action>
Polish the Settings page.
- Use high-quality toggles and input fields.
- Group settings into "Audio" and "General".
- Add a "Clear All Data" button in a "Danger Zone".
</action>
<acceptance_criteria>
- Settings are easy to interact with.
- Danger Zone is clearly marked.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/index.css
</read_first>
<action>
Global UX enhancements.
- Add a custom scrollbar that matches the dark/neon theme.
- Ensure selection colors are customized (`selection:bg-cyan-500/30`).
</action>
<acceptance_criteria>
- Scrollbar is subtle and matches the theme.
- Overall UI feels cohesive.
</acceptance_criteria>
</task>

## Verification
- [ ] Inspect every page on mobile and desktop.
- [ ] Verify that "Clear Data" works.
- [ ] Check if level progress bar reflects the actual score correctly.

## must_haves
- All pages must be 100% responsive.
- Dark mode must be consistent.
- No remaining "default" styling from browser.
