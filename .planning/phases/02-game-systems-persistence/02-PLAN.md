# Plan 2: Game Systems & Persistence

## Phase Goal
Implement local score persistence and build the Tic Tac Toe game.

## Frontmatter
wave: 1
depends_on: []
files_modified:
  - frontend/src/App.jsx
  - frontend/src/games/TicTacToe.jsx
  - frontend/src/components/GameContainer.jsx
  - frontend/src/pages/GamesPage.jsx
autonomous: true

## Tasks

<task>
<read_first>
- frontend/src/App.jsx
</read_first>
<action>
Implement LocalStorage sync in `App.jsx`.
- Update `useEffect` (on mount) to read `nexus_game_stats` and `nexus_user_data` from LocalStorage.
- Add a new `useEffect` that watches `gameStats` and `user` state and writes them to LocalStorage when they change.
</action>
<acceptance_criteria>
- Game scores persist after a page refresh.
- User data (username, level) persists after a page refresh.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/games/SnakeGame.jsx (for pattern)
</read_first>
<action>
Create `src/games/TicTacToe.jsx`.
- Implement 3x3 grid.
- State for `board`, `isXNext`, `winner`.
- Win logic (8 possible lines).
- Design: Neon cyan for 'X', Purple/Pink for 'O'.
- Call `updateGameStats('tictactoe', score)` when someone wins (e.g., 100 points per win).
</action>
<acceptance_criteria>
- Game is playable with two players locally.
- Win/Draw conditions are correctly detected and displayed.
- "Restart" button works.
- Wins update the platform stats.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/components/GameContainer.jsx
- frontend/src/pages/GamesPage.jsx
</read_first>
<action>
Register Tic Tac Toe in the game list.
- Add `tictactoe` to `games` object in `GameContainer.jsx`.
- Add Tic Tac Toe card to `GamesPage.jsx`.
</action>
<acceptance_criteria>
- Tic Tac Toe appears in the Games Dashboard.
- Navigating to `/game/tictactoe` loads the game.
</acceptance_criteria>
</task>

<task>
<read_first>
- frontend/src/App.jsx
</read_first>
<action>
Add basic page transitions.
- Use a CSS transition on the `<main>` tag or wrap routes in an `AnimatePresence` (if framer-motion is used, but for now CSS fade is safer).
</action>
<acceptance_criteria>
- Switching between pages has a subtle fade-in effect.
</acceptance_criteria>
</task>

## Verification
- [ ] Play a game of Snake, refresh, check if score remains in stats.
- [ ] Play Tic Tac Toe to a win and verify score update.
- [ ] Verify responsive layout of Tic Tac Toe.

## must_haves
- Reliable local persistence.
- Fully functional Tic Tac Toe.
- Tic Tac Toe visible in the dashboard.
