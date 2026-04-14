# Plan 1: Dashboard & Core Navigation

## Phase Goal
Setup React Router and implement the main dashboard for game selection.

## Frontmatter
wave: 1
depends_on: []
files_modified:
  - frontend/src/main.jsx
  - frontend/src/App.jsx
  - frontend/src/pages/HomePage.jsx
  - frontend/src/components/GameCard.jsx
autonomous: true

## Tasks

<task>
<read_first>
- frontend/src/main.jsx
- frontend/src/App.jsx
</read_first>
<action>
Install `react-router-dom` and set up the `BrowserRouter` in `main.jsx`.
</action>
<acceptance_criteria>
- `package.json` contains `react-router-dom`.
- `main.jsx` wraps `App` in `BrowserRouter`.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/App.jsx
</read_first>
<action>
Replace manual state-based page switching in `App.jsx` with `Routes` and `Route` from `react-router-dom`.
- `/` -> `HomePage`
- `/games` -> `GamesPage`
- `/leaderboard` -> `LeaderboardPage`
- `/profile` -> `ProfilePage`
- `/settings` -> `SettingsPage`
- `/game/:id` -> Dynamic game route
</action>
<acceptance_criteria>
- `App.jsx` uses `<Routes>` instead of `renderPage()`.
- Navigation works via URL changes.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/pages/HomePage.jsx
</read_first>
<action>
Refactor `HomePage` to be a vibrant landing page that leads to the games list.
</action>
<acceptance_criteria>
- `HomePage` displays a "Play Now" button linking to `/games`.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/pages/GamesPage.jsx
</read_first>
<action>
Create/Refactor `GamesPage` to display a grid of `GameCard` components.
Each card should link to `/game/:id`.
</action>
<acceptance_criteria>
- `GamesPage` renders all existing games (2048, Snake, etc.).
- Clicking a card navigates to the game route.
</acceptance_criteria>
</task>

## Verification
- [ ] Navigate through all top-level routes via the URL.
- [ ] Verify Dashboard links correctly to game pages.
- [ ] Verify existing games still load correctly in the new route.

## must_haves
- Functional React Router setup.
- Visual Grid of games on the Dashboard.
- Unified "Back" button on all game pages.
